
class MortgageCalculator {

    loanProgramLabel = "//label[text()='Loan program']";
    interestRateLabel = "//label[text()='Interest rate']";
    advancedButton = "//button[text()='Advanced']";
    moreInfoButton = "//button/span[contains(text(),'Interest rate')]";
    seeCurrentRateButton = "//a[text()='See current rates']";
    rateInputField = "input[name='rate']";
    moreInfoPopup = "//section//h4[text()='Interest rate']"
    moreInfoClose = "button[class^='CloseButton']"
    invalidMessage = "//p[contains(text(),'not a valid number')]";
    pIvalue = "(//*[@class='arc-label-value'])";

    visit() {
        cy.visit("https://www.zillow.com/mortgage-calculator/");
    }

    checkTooltipForInterestRate() {
        // check info button is visible and click it
        cy.xpath(this.moreInfoButton)
        .scrollIntoView()
        .should('be.visible')
        .click({force: true});

        //check the pop up appears and then close it.
        cy.xpath(this.moreInfoPopup).should('be.visible');
        cy.get(this.moreInfoClose).click();
        cy.xpath(this.moreInfoPopup).should('not.exist');
    };

    clickCurrentRateButton(currentUrl, rateUrl) {
        //check current rate button is visible and click it
        cy.xpath(this.seeCurrentRateButton)
        .should('be.visible')
        .click();

        // Intercept the link that opens in a new tab
        // click the first link since there are multiple
        cy.get('a[target="_blank"]').first().then($link => {

        // Get the href attribute of the link
        const url = $link.prop('href');

        // Remove target attribute to open in the same tab
        cy.wrap($link).invoke('removeAttr', 'target').click();

        // Verify the new URL
        cy.url().should('eq', rateUrl);

        // Go back to the main page
        cy.go('back');

        // Verify we are back on the main page
        cy.url().should('eq', currentUrl);
        });
    };

    verifyInvalidInputValues(value) {

        // locate field, clear it, type special characters, 
        // click outside field, verify invalid message.
        cy.get(this.rateInputField)
        .should('be.visible')
        .clear()
        .should('have.value','')
        .type(value).tab()
        cy.xpath(this.invalidMessage).should('be.visible');      
    };

    verifyValidInputValues() {

        // Get the value from the input field and verify it exists
        cy.get(this.rateInputField).invoke('val').then((interestRateValue) => {
            cy.xpath(this.pIvalue).invoke('text').then((initialPrincipalInterestValue) => {
            expect(interestRateValue).to.exist;
            expect(interestRateValue).to.not.be.empty;

            // Clear the input field and verify
            cy.get(this.rateInputField).clear().tab();
            cy.get(this.rateInputField).should('have.value', '');

            // Input a different value and wait so the value updates.
            cy.get(this.rateInputField).type('4.25').tab();
            cy.wait(2000);

            // Check that the new value
            cy.get(this.rateInputField).should('have.value', '4.25');

                // Verify that the principal & interest field updates
                cy.xpath(this.pIvalue).invoke('text').then((updatedPrincipalInterestValue) => {

                // Assert the updated values are as expected
                expect(updatedPrincipalInterestValue).to.not.equal(initialPrincipalInterestValue);
                });
            });
        });
    }
}

export default MortgageCalculator;
