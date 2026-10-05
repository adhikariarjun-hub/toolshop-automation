describe("My Account - Dashboard", () => {

  beforeEach(() => {
    cy.login('customer@practicesoftwaretesting.com', 'welcome01');
    cy.get('[data-test="nav-menu"]').click();
  });

  it("should display the My Account page with correct title", () => {
    cy.get('[data-test="nav-my-account"]').click();
    cy.get('h1').should('be.visible').and('contain', 'My account');
  });

  it("should navigate to My Favorites when clicked", () => {
    cy.get('[data-test="nav-favorites"]').click();
    cy.url().should('include', '/account/favorites');
  });

  it("should navigate to My Profile when clicked", () => {
    cy.get('[data-test="nav-profile"]').click();
    cy.url().should('include', '/account/profile');
  });

  it("should navigate to My Invoices when clicked", () => {
    cy.get('[data-test="nav-invoices"]').click();
    cy.url().should('include', '/account/invoices');
  });

  it("should navigate to My Messages when clicked", () => {
    cy.get('[data-test="nav-messages"]').click();
    cy.url().should('include', '/account/messages');
  });

});