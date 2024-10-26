// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.add('login', () => {
//   cy.intercept('POST', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/sessions', {
//     statusCode: 200,
//     fixture: 'login'
//   }).as('INTERCEPT LOGIN')

//   cy.intercept('GET', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1', {
//     statusCode: 200,
//     fixture: 'login'
//   }).as('INTERCEPT GET USER')

//   cy.visit('http://localhost:5173/')

//   cy.get('.login-email-input').type('seth@turing.com')
//   cy.get('.login-password-input').type('zrocks')
//   cy.get('.submit-button').click()
// });