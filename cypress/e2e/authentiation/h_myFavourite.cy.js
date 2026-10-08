describe("My Favorites", () => {

  beforeEach(() => {
    cy.login('customer@practicesoftwaretesting.com', 'welcome01');
    // cy.get('[data-test="nav-menu"]').click();
    // cy.url().should('include', '/account');
    // cy.get('[data-test="nav-menu"]').click();

  });

  it("should show a success message when adding a product to favourites", () => {
    cy.get('[data-test="nav-home"]').click()
    
   cy.get('[data-test="product-01M462DEXMJJE8N82M4MBXR68F"]', { timeout: 6000 }).should('contain', 'Combination Pliers').click();

    cy.get('[data-test="add-to-favorites"]', {timeout : 6000}).click();

    cy.get('[role="alert"]', {timeout : 5000}).should('be.visible').and('contain', 'Product added to your favorites list.');
  });

  it("should show the added product in the My Favorites list", () => {
   cy.get('[data-test="nav-home"]').click()
    cy.get('[data-test="product-name"]', {timeout : 6000}).contains('Pliers').click();
    cy.get('[data-test="add-to-favorites"]').click();

    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-my-favorites"]').click();

    cy.contains('[data-test="product-name"]', 'Pliers').should('be.visible');
  });

  it("should remove a product from the favourites list", () => {
     cy.get('[data-test="nav-home"]').click()
    cy.get('[data-test="product-name"]').contains('Bolt Cutters').click();
    cy.get('[data-test="add-to-favorites"]').click();

    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-my-favorites"]').click();

    cy.get('[data-test="delete"]', {timeout : 5000}).first().click();

    cy.contains('[data-test="product-name"]', 'Bolt Cutters').should('not.exist');
  });

  it("should show an empty state message when no favourites exist", () => {
    cy.visit("https://practicesoftwaretesting.com/account/favorites");

    cy.get('body').then(($body) => {
      if ($body.find('[data-test="delete"]').length > 0) {
        cy.get('[data-test="delete"]').each(($btn) => {
          cy.wrap($btn).click();
        });
      }
    });

    cy.contains('There are no favorites yet. In order to add favorites, please go to the product listing and mark some products as your favorite.').should('be.visible');
  });

  it("should show an error when attempting to add the same product to favourites twice", () => {
     cy.get('[data-test="nav-home"]').click()
    cy.get('[data-test="product-name"]').contains('Pliers').click();

    cy.get('[data-test="add-to-favorites"]').click();
    cy.get('[role="alert"]', {timeout : 5000}).should('be.visible').and('contain', 'Product added to your favorites list.');

    cy.get('[data-test="add-to-favorites"]').click();

    cy.get('[role="alert"]', {timeout : 5000}).should('be.visible').and('contain', 'Product already in your favorites list.');
    cy.get()
  });

});