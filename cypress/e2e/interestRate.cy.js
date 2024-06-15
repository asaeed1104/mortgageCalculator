import MortgageCalculator from "../PageObjects/MortgageCalculatorPage";

describe ('Interest rate test should',() => {
    const mortgageCalculator = new MortgageCalculator();

    beforeEach(() => {
        mortgageCalculator.visit();
    });

    it('check interest rate info button', () => {
        mortgageCalculator.checkTooltipForInterestRate();
    });

    it('check the current rate link', () => {
        cy.fixture('interestRateData').then((data) => {

        mortgageCalculator.clickCurrentRateButton(data.url,data.currentRateUrl);
    })
    })
    it('verify invalid input values', () => {
        mortgageCalculator.verifyInvalidInputValues('!$');
        mortgageCalculator.verifyInvalidInputValues('Abc');
    })
})