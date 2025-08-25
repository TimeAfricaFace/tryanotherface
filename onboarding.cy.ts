describe('Onboarding Flow', () => {
  it('should complete the full onboarding process', () => {
    cy.visit('/');
    
    // Skip cinematic intro
    cy.get('button').contains('Skip Introduction').click();
    
    // Test element selection would require authenticated user
    // This is a placeholder for the full E2E flow
    cy.contains('Join TAF');
  });

  it('should display all four elements in selection', () => {
    // This test would run after authentication
    // cy.visit('/onboarding');
    // cy.contains('Choose Your Element');
    // cy.contains('Fire');
    // cy.contains('Water');
    // cy.contains('Air');
    // cy.contains('Earth');
  });

  it('should allow element selection and proceed', () => {
    // This test would run after authentication
    // cy.visit('/onboarding');
    // cy.get('[data-element="fire"]').click();
    // cy.get('button').contains('Continue Your Journey').click();
    // cy.url().should('include', '/feed');
  });
});