describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the onboarding page for unauthenticated users', () => {
    cy.contains('The Forgotten Self');
    cy.get('[data-testid="skip-button"]').should('be.visible');
  });

  it('should allow users to skip the cinematic intro', () => {
    cy.get('button').contains('Skip Introduction').click();
    cy.contains('Join TAF');
  });

  it('should show sign up form', () => {
    cy.get('button').contains('Skip Introduction').click();
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button').contains('Create Account').should('be.visible');
  });

  it('should validate email format', () => {
    cy.get('button').contains('Skip Introduction').click();
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('password123');
    cy.get('button').contains('Create Account').click();
    cy.contains('Invalid email');
  });

  it('should show Google OAuth option', () => {
    cy.get('button').contains('Skip Introduction').click();
    cy.get('button').contains('Continue with Google').should('be.visible');
  });

  it('should toggle between sign in and sign up', () => {
    cy.get('button').contains('Skip Introduction').click();
    cy.contains('Already have an account? Sign in').click();
    cy.contains('Welcome Back');
    cy.contains("Don't have an account? Sign up").click();
    cy.contains('Join TAF');
  });
});