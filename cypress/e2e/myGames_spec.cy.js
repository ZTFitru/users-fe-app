describe('my games test', () => {
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

  it('should be able to display a list of games for a user, and it should be the same games if the user navigates away and back to the page.', () => {
    cy.get('h2').contains('Sign In')
    cy.get('.login-email-input').type('seth@turing.com')
    cy.get('.login-password-input').type('zrocks')
    cy.get('.submit-button').click()
    cy.get('#\\31  > h3').contains('1: Game with mike')
    cy.get('footer > [href="#/1/frien-emies"]').click()
    .get('footer > [href="#/1/my_games/"]')
    .click()
    cy.get('#\\31  > h3').contains('1: Game with mike')
  })
})