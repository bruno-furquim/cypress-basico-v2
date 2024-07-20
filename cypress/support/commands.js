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


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    const longText = 'Teste!!!!!'
    cy.get('input[name="firstName"]').type('Bruno')
    cy.get('input[name="lastName"]').type('Furquim')
    cy.get('#email').type('bruno_furquim@msn.com')
    cy.get('textarea[id="open-text-area"]').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
})