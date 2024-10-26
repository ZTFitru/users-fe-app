describe('game creation spec', () => {
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
    cy.get('.login-email-input').type('seth@turing.com');
    cy.get('.login-password-input').type('zrocks');
    cy.get('.submit-button').click();
    cy.get('.hamburger-menu').click();
    cy.get(':nth-child(2) > a').click();
  })

  it('Should be able to challenge mike to a game of chess', () => {
    cy.intercept('POST', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/start_game', {
      statusCode: 200,
      fixture: 'game_1'
    }).as('INTERCEPT GAME 1 WITH MIKE');

    cy.get(':nth-child(1) > .start-game-popup-click').click();
    cy.get('.start-game-modal');
    cy.get('.start-game-content').contains('Start game with mike?');
    cy.get('.start-game-button-wrapper > :nth-child(1)').contains('Ok');
    cy.get('.start-game-button-wrapper > :nth-child(2)').contains('Cancel');

    cy.get('.start-game-button-wrapper > :nth-child(1)').click();
    cy.get('.game-area-user').should('be.visible')
  });

  it('Should be able to chose not to challenge a mike to a game of chess', () => {
    cy.intercept('POST', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/start_game', {
      statusCode: 200,
      fixture: 'game_1'
    }).as('INTERCEPT GAME 1 WITH MIKE');

    cy.get(':nth-child(1) > .start-game-popup-click').click();
    cy.get('.start-game-modal');
    cy.get('.start-game-content').contains('Start game with mike?');

    cy.get('.start-game-button-wrapper > :nth-child(2)').click();
  })

  it('Should be able to challenge joe to a game of chess', () => {
    cy.intercept('POST', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/start_game', {
      statusCode: 200,
      fixture: 'game_2'
    }).as('INTERCEPT GAME 2 WITH Joe');

    cy.get(':nth-child(2) > .start-game-popup-click').click();
    cy.get('.start-game-modal');
    cy.get('.start-game-content').contains('Start game with joe?');
    cy.get('.start-game-button-wrapper > :nth-child(1)').contains('Ok');
    cy.get('.start-game-button-wrapper > :nth-child(2)').contains('Cancel');

    cy.get('.start-game-button-wrapper > :nth-child(1)').click();
    cy.get('.game-area-user').should('be.visible')
  })

  it.only('Should be able to chose not to challenge a joe to a game of chess', () => {
    cy.intercept('POST', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/start_game', {
      statusCode: 200,
      fixture: 'game_2'
    }).as('INTERCEPT GAME 2 WITH Joe');

    cy.get(':nth-child(2) > .start-game-popup-click').click();
    cy.get('.start-game-modal');
    cy.get('.start-game-content').contains('Start game with joe?');

    cy.get('.start-game-button-wrapper > :nth-child(2)').click();
  })

})
