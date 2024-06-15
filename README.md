# Mortgage Calculator Cypress Tests

This repository contains Cypress tests for the interest rate field of a mortgage calculator application for Zillow. 

## Prerequisites

Before you can run the tests, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 12 or higher)

## Installation

1. Clone the repository:
   git clone https://github.com/asaeed1104/mortgageCalculator.git
2. Install additional Cypress plugins:
   - npm install -D cypress-plugin-tab
   - npm install -D cypress-xpath

## Running the tests

In order to run the test using the cypress runner, use the following in the terminal:
   - npx cypress open
     
Alternatively, to run the tests in headless mode:
   - npx cypress run

## Other considerations

- This test could be expanded to check the graph for the mortgage calculator to verify the monthly payment is correct.
- Since rates are dynamic we should also consider that when verify interest rate and final monthly amount.
- We could expand the page object and json by adding more methods for the mortgage calculator page along with any data that can be stored in the json. 


