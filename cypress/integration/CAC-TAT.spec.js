/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/index.html')
  })

describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!Teste!!!!!'
        cy.get('input[name="firstName"]').type('Bruno')
        cy.get('input[name="lastName"]').type('Furquim')
        cy.get('#email').type('bruno_furquim@msn.com')
        cy.get('textarea[id="open-text-area"]').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('input[name="firstName"]').type('Bruno')
        cy.get('input[name="lastName"]').type('Furquim')
        cy.get('#email').type('bruno_furquimmsn.com')
        cy.get('textarea[id="open-text-area"]').type('Teste!')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('input[id="phone"]')
            .type('heiauheiau4')
            .should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('input[name="firstName"]').type('Bruno')
        cy.get('input[name="lastName"]').type('Furquim')
        cy.get('#email').type('bruno_furqui@msn.com')
        cy.get('textarea[id="open-text-area"]').type('Teste!')
        cy.get('input[id="phone-checkbox"]')
            .check()
            .should('be.checked')
        cy.get('input[id="phone-checkbox"]').type('heiauheiau4')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.get('input[id="phone-checkbox"]').type('14997305680')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('input[name="firstName"]')
            .type('Bruno')
            .should('have.value', 'Bruno')
            .clear()
            .should('have.value', '')

        cy.get('input[name="lastName"]')
            .type('Furquim')
            .should('have.value', 'Furquim')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('bruno_furqui@msn.com')
            .should('have.value', 'bruno_furqui@msn.com')
            .clear()
            .should('have.value', '')

        cy.get('textarea[id="open-text-area"]')
            .type('Teste!!!')
            .should('have.value', 'Teste!!!')
            .clear()
            .should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu texto', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu texto', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"')
            .check()
            .should('be.checked', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('be.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')                
            })
    });
    
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[id="file-upload"]')
            .should('not.have.value')
            .selectFile("./cypress/fixtures/example.json")
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
                expect($input[0].files[0].type).to.equal('application/json')
            })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[id="file-upload"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
            expect($input[0].files[0].type).to.equal('application/json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[id="file-upload"]')
            .selectFile('@sampleFile', { action: 'drag-drop'})
        .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
            expect($input[0].files[0].type).to.equal('application/json')
        })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
            //.invoke('removeAttr', 'target')
    });

    it('testa a página da política de privacidade de forma independente', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        //cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('Talking About Testing').should('be.visible')
    });

  })
  