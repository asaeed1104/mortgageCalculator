
class MortgageCalculator {

    loanProgramLabel = "//label[text()='Loan program']";
    interestRateLable = "//label[text()='Interest rate']";
    advancedButton = "//button[text()='Advanced']";
    moreInfoButton = "//button/span[contains(text(),'Interest rate')]";
    seeCurrentRateButton = "//a[text()='See current rates']";
    rateInputField = "input[name='rate']";
    moreInfoPopup = "//section//h4[text()='Interest rate']"
    moreInfoClose = "button[class^='CloseButton']"
    invalidMessage = "//p[contains(text(),'not a valid number')]";

    visit() {
        cy.visit("https://www.zillow.com/mortgage-calculator/");
    }

    checkTooltipForInterestRate() {
        // check info button is visible and click it
        cy.xpath(this.moreInfoButton)
        .should('be.visible')
        .click({force: true});

        //check the pop up appears and then close it.
        cy.xpath(this.moreInfoPopup).should('be.visible');
        cy.get(this.moreInfoClose).click();
        cy.xpath(this.moreInfoPopup).should('not.exist');
    };

    clickCurrentRateButton(currentUrl,rateUrl) {
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
        .type(value).tab()
   //     .click();
        cy.xpath(this.invalidMessage).should('be.visible');      
    };

}

export default MortgageCalculator;
