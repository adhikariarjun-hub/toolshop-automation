describe("Nav Bar - Logged-in State", () => {

  const email = 'customer@practicesoftwaretesting.com';
  const password = 'welcome01';

  beforeEach(() => {
    cy.visit("https://practicesoftwaretesting.com/auth/login");

    cy.get('[data-test="email"]').type(email);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-submit"]').click();
  });


  it("should show 'Sign in' in the nav when logged out", () => {
    cy.visit("https://practicesoftwaretesting.com/");

    cy.get('[data-test="nav-sign-in"]').should('be.visible').and('contain', 'Sign in');

    
  });

  it("should replace 'Sign in' with the user's name after login", () => {
    

    cy.get('[data-test="nav-sign-in"]').should('not.exist');
    cy.get('[data-test="nav-menu"]').should('be.visible').and('contain', 'Jane'); 
  });

  it("should keep Home, Categories, and Contact visible after login", () => {
    

    cy.get('[data-test="nav-home"]').should('be.visible');
    cy.get('[data-test="nav-categories"]').should('be.visible');
    cy.get('[data-test="nav-contact"]').should('be.visible');
  });

  it("should show My Account, My Favorites, My Profile, My Invoices, My Messages, and Sign out in the dropdown", () => {
    

    cy.get('[data-test="nav-menu"]').click();

    cy.get('[data-test="nav-my-account"]').should('be.visible');
    cy.get('[data-test="nav-my-favorites"]').should('be.visible');
    cy.get('[data-test="nav-my-profile"]').should('be.visible');
    cy.get('[data-test="nav-my-invoices"]').should('be.visible');
    cy.get('[data-test="nav-my-messages"]').should('be.visible');
    cy.get('[data-test="nav-sign-out"]').should('be.visible');
  });

  it("should restore 'Sign in' in the nav after signing out", () => {
    

    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-sign-out"]').click();

    cy.get('[data-test="nav-sign-in"]').should('be.visible').and('contain', 'Sign in');
  });

});