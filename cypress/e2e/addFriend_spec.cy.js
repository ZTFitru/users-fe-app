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

    cy.intercept('GET', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/friends', {
      statusCode: 200,
      fixture: 'my_friends'
    }).as('INTERCEPT GET MY FRIENDS')
    
    cy.visit('http://localhost:5173/')
    cy.get('.login-email-input').type('seth@turing.com')
    cy.get('.login-password-label').contains('Password')
    cy.get('.login-password-input').type('zrocks')
    cy.get('.submit-button').click()
    cy.get('.hamburger-menu').click()
    cy.get('.header-link > :nth-child(2) > a').click()
  })
  it('User can see all friends', () => {
    cy.get('.friends-h2').contains('Frien-EMIES')
    cy.get('.friends-instructions').contains('Click the - to remove a friend')
    cy.get('.challenge-to-game-instructions').contains('Select a frien-emie to challenge them to a game.')
    cy.get('.friends-list-container').children().should('have.length', 2);
    cy.get('.friends-list-container').children().should('not.have.length', 4);
  })

  it('User can search for a friend', () => {
    cy.get('.search-friends-input').type('Joe');
    cy.get('.friends-list-container').children().should('have.length', 1);
    cy.get('.friends-list-container').children().should('not.have.length', 4);
    cy.get('.search-friends-input').clear()
  })
})