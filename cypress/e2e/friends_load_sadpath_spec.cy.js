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
        statusCode: 400,
      }
    ).as('FAIL GET MY FRIENDS');

    cy.intercept('GET', 'https://chess-game-be-fmpc.onrender.com/games/1', {
      statusCode: 200,
      fixture: 'game_1',
    }).as('INTERCEPT GET GAME 1');

    cy.intercept('GET', 'https://chess-game-be-fmpc.onrender.com/games/2', {
      statusCode: 200,
      fixture: 'game_2',
    }).as('INTERCEPT GET GAME 2');

    cy.visit('http://localhost:5173/');
    cy.get('.login-email-input').type('seth@turing.com');
    cy.get('.login-password-input').type('zrocks');
    cy.get('.submit-button').click();
    cy.get('.hamburger-menu').click();
    cy.get(':nth-child(2) > a').click();
  });

  it('Shows message when fails to load any friends', () => {
    cy.get('.friends-h2').should('contain', 'Frien-EMIES');
    cy.get('.friends-instructions').should(
      'contain',
      'Click the - to remove a friend'
    );
    cy.get('.challenge-to-game-instructions').should(
      'contain',
      'Select a frien-emie to challenge them to a game'
    );
    cy.get(':nth-child(5) > p').should('contain', 'You need more frien-emies');
    cy.get('.friends-list-container').should('not.exist');
  });
});
