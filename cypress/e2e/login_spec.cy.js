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

  it('Should be able to login', () => {
    cy.get('h1').contains('Chess with Frien-EMIES');
    cy.get('.login-chess-logo').should('be.visible');

    cy.get('h2').contains('Sign In');

    cy.get('.login-email-label').contains('Email');
    cy.get('.login-email-input').type('seth@turing.com');

    cy.get('.login-password-label').contains('Password');
    cy.get('.login-password-input').type('zrocks');
    cy.get('.login-password-input').should('have.attr', 'type', 'password');

    cy.get('.eyeball-hidden').should('be.visible');
    cy.get('.eyeball-visiblity').should('not.exist');

    cy.get('.eyeball-hidden').click();

    cy.get('.eyeball-visiblity').should('be.visible');
    cy.get('.login-password-input').should('have.attr', 'type', 'text');
    cy.get('.login-password-input').should('have.value', 'zrocks');

    cy.get('.eyeball-visiblity').click();
    cy.get('eyeball-visiblity').should('not.exist');
    cy.get('.login-password-input').should('have.attr', 'type', 'password');

    cy.get('.submit-button').should('be.visible');
    cy.get('.submit-button').click();

    cy.request('https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/1/my_games');
  });

  it('Should display an error message if the email is incorrect', () => {
    cy.intercept('POST', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/sessions', {
      statusCode: 400,
      fixture: 'login'
    }).as('INTERCEPT LOGIN');

    cy.get('.login-email-label').contains('Email');
    cy.get('.login-email-input').type('wrong@turing.com');

    cy.get('.login-password-label').contains('Password');
    cy.get('.login-password-input').type('zrocks');

    cy.get('.submit-button').click();

    cy.get('form > :nth-child(1)').should('be.visible').contains('Login failed. Please try again.');
  });

  it('Should display an error message if the password is incorrect', () => {
    cy.intercept('POST', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/sessions', {
      statusCode: 400,
      fixture: 'login'
    }).as('INTERCEPT LOGIN');

    cy.get('.login-email-label').contains('Email');
    cy.get('.login-email-input').type('seth@turing.com');

    cy.get('.login-password-label').contains('Password');
    cy.get('.login-password-input').type('wrong');

    cy.get('.submit-button').click();

    cy.get('form > :nth-child(1)').should('be.visible').contains('Login failed. Please try again.');
  });

  it('Should be able to log out', () => {
    cy.intercept('POST', 'https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/sessions', {
      statusCode: 200,
      fixture: 'login'
    }).as('INTERCEPT LOGIN');

    cy.get('.login-email-input').type('seth@turing.com');
    cy.get('.login-password-input').type('zrocks');
    cy.get('.submit-button').click();

    cy.get('.hamburger-menu').should('be.visible').click();

    cy.get('.header-link > :nth-child(4) > button').should('be.visible').contains('Sign Out').click();

    cy.get('.login-section').should('be.visible');
    cy.get('.login-email-input').should('have.value', '');
    cy.get('.login-password-input').should('have.value', '');
  })
})
