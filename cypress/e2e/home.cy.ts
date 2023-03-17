import { BASE_URL } from '@/utils/test/constants/route';
import { Route } from '@/constants/route';

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}${Route.LOGIN}`);
  });

  it('should display validation errors for empty email and password fields', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Email is required');
    cy.contains('Password must be at least 6 characters');
  });

  it('should display validation error for invalid email', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email address');
  });

  it('should display validation error for empty password', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    cy.contains('Password must be at least 6 characters');
  });

  it('should display validation error for  wrong password', () => {
    cy.intercept('POST', '/api/auth/login', {
      fixture: 'loginError.json',
      statusCode: 400,
    }).as('loginError');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password');

    cy.get('button[type="submit"]').click();

    cy.contains('Wrong password');
  });

  it('should redirect to the dashboard page when correct email and password are provided', () => {
    cy.intercept('POST', '/api/auth/login', {
      fixture: 'login.json',
      statusCode: 201,
    }).as('loginError');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
  });
});

export {};
