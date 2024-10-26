describe('users spec', () => {
  beforeEach(()=> {
    cy.intercept('POST', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/sessions', {
      statusCode: 200,
      fixture: 'login'
    }).as('INTERCEPT LOGIN')

    cy.intercept('GET', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/my_games', {
      statusCode: 200,
      fixture: 'my_games'
    }).as('INTERCEPT GET MY GAMES')

    cy.intercept('GET', 'https://chess-game-be-fmpc.onrender.com/games/1', {
      statusCode: 200,
      fixture: 'game_1'
    }).as('INTERCEPT GET GAME 1')

    cy.intercept('GET', 'https://chess-game-be-fmpc.onrender.com/games/2', {
      statusCode: 200,
      fixture: 'game_2'
    }).as('INTERCEPT GET GAME 2')

    cy.intercept('GET', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1', {
      statusCode: 200,
      fixture: 'login'
    }).as('INTERCEPT GET USER')

    cy.intercept('GET', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/index', {
      statusCode: 200,
      fixture: 'users'
    }).as('INTERCEPT GET ALL USERS')
    
    cy.visit('http://localhost:5173/')
    cy.get('.login-email-input').type('seth@turing.com')
    cy.get('.login-password-label').contains('Password')
    cy.get('.login-password-input').type('zrocks')
    cy.get('.submit-button').click()
  })
  it('User can log in and navigate to all users', () => {
    cy.get('.hamburger-menu').click()
    cy.get('.header-link > :nth-child(1) > a').click()
    cy.get('.users-h2').contains('Search New Frien-EMIES')
    cy.get('.users-instructions').contains('Click the + to add a friend')
    cy.get('#\\33 ').should('be.visible')
    cy.get('#\\34 ').should('be.visible')
    cy.get('#\\35 ').should('be.visible')
    cy.get('.user-cards-container').children().should('have.length', 3);
  })

  it('User can search for other users', () => {
    cy.get('.hamburger-menu').click()
    cy.get('.header-link > :nth-child(1) > a').click()
    cy.get('.search-users-input').type('Mike')
    cy.get('#\\33 ').should('be.visible')
    cy.get('#\\34 ').should('not.exist')
    cy.get('.user-cards-container').children().should('have.length', 1);
    cy.get('.search-users-input').clear()
    cy.get('#\\33 ').should('be.visible')
    cy.get('#\\34 ').should('be.visible')
    cy.get('#\\35 ').should('be.visible')
    cy.get('#\\36 ').should('not.exist')
    cy.get('.search-users-input').type('Seth')
    cy.get('.user-cards-container').children().should('have.length', 0);
    cy.get('.user-cards-container').children().should('not.have.length', 3);
    cy.get('.search-users-input').clear()
    cy.get('.user-cards-container').children().should('have.length', 3);
  })

  it('user can log out', () => {
    cy.get('.hamburger-menu').click()
    cy.get('.header-link > :nth-child(4)').should('be.visible')
    cy.get('button').click()
    cy.url().should('include', '/')
  })
})