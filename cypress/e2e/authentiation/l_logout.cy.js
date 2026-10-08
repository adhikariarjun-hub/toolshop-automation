describe("Logout", () => {

  beforeEach(() => {
    cy.login('customer@practicesoftwaretesting.com', 'welcome01');
  });

  it("should log the user out and redirect to the login page", () => {
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-sign-out"]').click();

    cy.url().should('eq', 'https://practicesoftwaretesting.com/auth/login');
  });

  it("should show the login option in the nav instead of the account menu after logout", () => {
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-sign-out"]').click();

    cy.url().should('eq', 'https://practicesoftwaretesting.com/auth/login');
    cy.get('[data-test="nav-sign-in"]').should('be.visible'); 
    cy.get('[data-test="nav-menu"]').should('not.exist'); 
  });

  it("should redirect to login when a protected page is visited after logout", () => {
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-sign-out"]').click();

    cy.visit('https://practicesoftwaretesting.com/account/profile');
    cy.url().should('eq', 'https://practicesoftwaretesting.com/auth/login');
  });

  it("should require login again to access the account after logging out", () => {
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-sign-out"]').click();

    cy.url().should('eq', 'https://practicesoftwaretesting.com/auth/login');

    cy.login('customer@practicesoftwaretesting.com', 'welcome01');
    cy.url().should('include', '/account');
  });

});