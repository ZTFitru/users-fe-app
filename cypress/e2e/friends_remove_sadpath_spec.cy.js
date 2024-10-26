describe('login spec', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/sessions',
      {
        statusCode: 200,
        fixture: 'login',
      }
    ).as('INTERCEPT LOGIN');

    cy.intercept(
      'GET',
      'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1',
      {
        statusCode: 200,
        fixture: 'login',
      }
    ).as('INTERCEPT GET USER');

    cy.intercept(
      'GET',
      'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/index',
      {
        statusCode: 200,
        fixture: 'users',
      }
    ).as('INTERCEPT GET ALL USERS');

    cy.intercept(
      'GET',
      'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/my_games',
      {
        statusCode: 200,
        fixture: 'my_games',
      }
    ).as('INTERCEPT GET MY GAMES');

    cy.intercept(
      'GET',
      'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/friends',
      {
        statusCode: 200,
        fixture: 'my_friends',
      }
    ).as('INTERCEPT GET MY FRIENDS');

    cy.intercept('GET', 'https://chess-game-be-fmpc.onrender.com/games/1', {
      statusCode: 200,
      fixture: 'game_1',
    }).as('INTERCEPT GET GAME 1');

    cy.intercept('GET', 'https://chess-game-be-fmpc.onrender.com/games/2', {
      statusCode: 200,
      fixture: 'game_2',
    }).as('INTERCEPT GET GAME 2');

    cy.intercept(
      'DELETE',
      'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/remove_friend',
      { statusCode: 400 }
    ).as('INTERCEPT REMOVE A FRIEND');

    cy.visit('http://localhost:5173/');
    cy.get('.login-email-input').type('seth@turing.com');
    cy.get('.login-password-input').type('zrocks');
    cy.get('.submit-button').click();
    cy.get('.hamburger-menu').click();
    cy.get(':nth-child(2) > a').click();
  });

  it('Not remove friend if response from BE is unsuccessful', () => {
    cy.get('.friends-list-container .user-card-wrapper:nth-child(1) i').click();
    cy.get(
      '.friends-list-container .user-card-wrapper:nth-child(1) .remove-friend-popup-click'
    ).click();
    cy.get('.remove-friend-button-wrapper > :nth-child(1)').click();
    cy.get('.friends-list-container .user-card-wrapper:nth-child(1)').should(
      'contain',
      'mike'
    );
  });
});
