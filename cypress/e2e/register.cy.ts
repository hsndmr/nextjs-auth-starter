import { BASE_URL } from '@/utils/test/constants/route';
import { Route } from '@/constants/route';

describe('RegisterForm', () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}${Route.REGISTER}`);
  });

  it('should display validation errors for empty fields when the submit button is clicked', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Name is required');
    cy.contains('Last name is required');
    cy.contains('Email is required');
    cy.contains('Password must be at least 6 characters');
  });

  it('should display validation error for invalid email', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email address');
  });

  it('should display validation error for short password', () => {
    cy.get('input[name="password"]').type('12345');
    cy.get('button[type="submit"]').click();
    cy.contains('Password must be at least 6 characters');
  });

  it('should display error when registration fails', () => {
    cy.intercept('POST', '/api/auth/register', {
      fixture: 'registerError.json',
      statusCode: 400,
    }).as('registerError');

    cy.get('input[name="name"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password');

    cy.get('button[type="submit"]').click();

    cy.contains('User already exists');
  });

  it('should redirect to the login page when registration is successful', () => {
    cy.intercept('POST', '/api/auth/register', {
      fixture: 'login.json',
      statusCode: 201,
    }).as('registerSuccess');

    cy.get('input[name="name"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', Route.LOGIN);
  });
});

export {};
