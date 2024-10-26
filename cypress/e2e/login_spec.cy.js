describe('login spec', () => {
  beforeEach(()=> {
    cy.intercept('POST', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/sessions', {
      statusCode: 200,
      fixture: 'login'
    }).as('INTERCEPT LOGIN')

    cy.intercept('GET', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1', {
      statusCode: 200,
      fixture: 'login'
    }).as('INTERCEPT GET USER')

    cy.intercept('GET', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/index', {
      statusCode: 200,
      fixture: 'users'
    }).as('INTERCEPT GET ALL USERS')

    cy.intercept('GET', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/my_games', {
      statusCode: 200,
      fixture: 'my_games'
    }).as('INTERCEPT GET MY GAMES')

    cy.intercept('GET', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/friends', {
      statusCode: 200,
      fixture: 'my_friends'
    }).as('INTERCEPT GET MY FRIENDS')

    cy.intercept('GET', 'https://chess-game-be-fmpc.onrender.com/games/1', {
      statusCode: 200,
      fixture: 'game_1'
    }).as('INTERCEPT GET GAME 1')

    cy.intercept('GET', 'https://chess-game-be-fmpc.onrender.com/games/2', {
      statusCode: 200,
      fixture: 'game_2'
    }).as('INTERCEPT GET GAME 2')
    
    cy.visit('http://localhost:5173/')
  })

  it('Logs in our user', () => {
    cy.get('h2').contains('Sign In')
    cy.get('.login-email-label').contains('Email')
    
    cy.get('.login-email-input').type('seth@turing.com')
    cy.get('.login-password-label').contains('Password')
    cy.get('.login-password-input').type('zrocks')

    // cy.get('.eyeball-hidden').should('be.visible');
    // cy.get('.eyeball-visiblity').should('not.be.visible');

    // cy.get('[data-cy="fa-eye"]').click();

    // cy.get('[data-cy="fa-eye-slash"]').should('be.visible');
    // cy.get('[data-cy="fa-eye"]').should('not.be.visible');

    // cy.get('.submit-button').should('be.visible')
    cy.get('.submit-button').click()
    // cy.visit('https://example.cypress.io')
  })
})

// post https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/sessions