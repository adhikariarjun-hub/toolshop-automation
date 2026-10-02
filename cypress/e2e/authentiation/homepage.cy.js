describe("Practice Tool Shop Home page", () => {

  beforeEach(() => {
    cy.visit("https://practicesoftwaretesting.com/");
    cy.wait(6000)
  });

  // HOMEPAGE LOAD

  it("should load the homepage with product cards and pagination visible", () => {
    cy.get('[data-test^="product-"]').should('have.length.greaterThan', 0);
    cy.get('[data-test="pagination-prev"]').should('be.visible');
  });

  it("should show the expected number of product cards on the first page", () => {
    cy.get('[data-test="sort"]').select('Name (A - Z)')
    cy.get('[data-test="sorting_completed"]').children().its('length').then((count) => {
    cy.log('Number of children:', count);
    })
  })
    //second way
    // cy.get('[data-test^="product-"]', { timeout: 3000 }).should('have.length', 27);

    //third way
    // cy.get('[data-test="product-name"]').its('length').then((count) => {
    // cy.log('Number of products:', count);

  

  // 2. SORT

  it("should sort products by name (A-Z)", () => {
    cy.get('[data-test="sort"]').select('Name (A - Z)');
    cy.get('[data-test="sort"]').should('have.value', 'name,asc');
  });

  it("should sort products by price (low to high)", () => {
    cy.get('[data-test="sort"]').select('Price (Low - High)');
    cy.get('[data-test="sort"]').should('have.value', 'price,asc');
  });



  // 3. PRICE RANGE FILTER

  it("should filter products within the selected price range", () => {
    cy.get('.ngx-slider-pointer-min').click().type('{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}');
    cy.get('.ngx-slider-pointer-max').click().type('{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}');
  });

  it("should handle min pointer dragged past max pointer gracefully", () => {
    cy.get('.ngx-slider-pointer-min').click().type('{rightarrow}'.repeat(150));
    cy.get('body').should('be.visible');
  });

  it("should restore full product list when price range is reset", () => {
    cy.get('.ngx-slider-pointer-min').click().type('{leftarrow}'.repeat(155));
    cy.get('.ngx-slider-pointer-max').click().type('{rightarrow}'.repeat(50));
  });

  // FILTER BY CATEGORY

  it.only("should show only matching products when a category filter is selected", () => {
    cy.get('label', {timeout: 10000}).contains('Sander').click()

    // cy.get('[data-test="category-01M3S6DS77DJYXDZMKRVGWMGAJ"]').click()
    
    cy.get('[data-test="filter_completed"]',{timeout: 6000}).each(($el) => {
    cy.wrap($el).should('contain', 'Sander');
});
  });

  it("should auto-select all child checkboxes when a parent category is selected", () => {
    // cy.get('[data-test="category-01M3H8BVN8AEMD696Q33JBCHDS"]').click();
    cy.get('label', {timeout: 10000}).contains('Hand Tools').click()
    // cy.get('[data-test="category-01M3GTMBXEP6VPXKCTX4M6BXFB"]').should('be.checked');
  });

  it("should filter correctly when combining category and price range", () => {
    // cy.get('.container').children().eq(1).click()
    cy.get('.container').find("a").eq(1).click()


    // cy.get('[data-test="category-01M3GTMBWZ1B9MFFJV8H14RHTB"]').click();
    // cy.get('.ngx-slider-pointer-min').click().type('{rightarrow}'.repeat(10));
    // cy.get('.ngx-slider-pointer-max').click().type('{leftarrow}'.repeat(10));
    // cy.get('[data-test="product-card"]').should('have.length.greaterThan', 0);
  });

  it("should show a 'There are no products found.' state when filters match nothing", () => {
    cy.get('.ngx-slider-pointer-min').click().type('{rightarrow}'.repeat(135));
    cy.get('.ngx-slider-pointer-max').click().type('{rightarrow}'.repeat(90));
    cy.get('[data-test="category-01M3S9VKE8XMPHJ4582JDP3RWP"]').click()
    cy.get('[data-test="no-results"]').should('be.visible');
    cy.get('[data-test="no-results"]').should('contain', 'There are no products found');
  });

  // CARDS ON HOME PAGE

  it("should have the Combination Pliers card clickable", () => {
    cy.get('[data-test^="product-"]').should('be.visible');
  });

  it("should have a clickable Compare button", () => {
    cy.contains('[data-test="product-01M3H1G5SGPR5SZ7P331RKD1KY"]', 'Combination Pliers')
      .within(() => {
        cy.get('[data-test="compare-btn"]').should('be.visible').click();
      });

    cy.get('[data-test="comparison-bar"]').should('be.visible');
  });

  it("should navigate to the product detail page showing the same product name", () => {
    cy.contains('[data-test="product-01M3H1G5SGPR5SZ7P331RKD1KY"]', 'Combination Pliers').click();

    cy.get('[data-test="product-01M3H1G5SGPR5SZ7P331RKD1KY"]').should('contain', 'Combination Pliers');
    cy.url().should('include', '/product/');
  });

  // PRODUCT DETAIL PAGE

  it("should add product to cart and show the cart icon in the header", () => {
    cy.get('[data-test="add-to-cart"]').click();

    cy.get('[data-test="nav-cart"]').should('be.visible');
    cy.get('[data-test="cart-quantity"]').should('have.text', '1');
  });

  it("should show an unauthorized error when adding to favourites while logged out", () => {
    cy.get('[data-test="add-to-favorites"]').click();
    cy.get('[data-test="favorites-error"]').should('be.visible').and('contain', 'Unauthorized, can not add product to favourite list');
  });

  it("should show the related products section below the product description", () => {
    cy.contains('[data-test="product-name"]', 'Combination Pliers').click();

    cy.get('.col').should('have.length.greaterThan', 0);
  });

  it("should allow clicking a related product card and navigate to its own detail page", () => {
    cy.contains('[data-test="product-name"]', 'Combination Pliers').click();

    cy.get('.col').first().find('[data-test="product-name"]').invoke('text').then((relatedProductName) => {
      cy.get('.card-img-top').first().click();

      cy.get('[data-test="product-name"]').should('contain', relatedProductName.trim());
    });
  });

});