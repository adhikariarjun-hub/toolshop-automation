describe("Checkout Flow", () => {

  it("should complete a full checkout successfully with Cash on Delivery", () => {

    cy.visit("https://practicesoftwaretesting.com/");

    cy.get('[data-test="nav-home"]').click();

    cy.get('[data-test="product-name"]').contains('Combination Pliers').click();

    // increase quantity by 1, then decrease back by 1 
    cy.get('[data-test="increase-quantity"]').click();
    cy.get('[data-test="decrease-quantity"]').click();

    cy.get('[data-test="add-to-cart"]').click();

    cy.get('[data-test="nav-cart"]').should('be.visible').click();

    cy.url().should('include', '/checkout');

    cy.get('[data-test="proceed-1"]').click();

    // checkout asks to sign in again at this stage
    cy.get('[data-test="email"]').type('customer@practicesoftwaretesting.com');
    cy.get('[data-test="password"]').type('welcome01');
    cy.get('[data-test="login-submit"]').click();

    cy.get('[data-test="proceed-2"]').click();

    cy.get('[data-test="country"]').select('Nepal');
    cy.get('[data-test="postal_code"]').type('33700');
    cy.get('[data-test="house_number"]').type('337');
    cy.get('[data-test="street"]').type('Barahi Street');
    cy.get('[data-test="state"]').type('Gandaki');

    cy.get('[data-test="proceed-3"]').click();

    cy.get('[data-test="payment-method"]').select('Cash on Delivery'); // adjust selector once confirmed

    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="payment-success-message"]')
      .should('be.visible')
      .and('contain', 'Payment was successful');

    cy.get('[data-test="finish"]').click();

    cy.get('#order-confirmation')
      .should('be.visible')
      .and('contain', 'Thanks for your order! Your invoice number is');
  });

  it("should increase and decrease the quantity correctly", () => {

  cy.visit("https://practicesoftwaretesting.com/");
  cy.get('[data-test="nav-home"]').click();
  cy.get('[data-test="product-name"]').contains('Combination Pliers').click();

  cy.get('[data-test="quantity"]').should('have.value', '1'); // adjust selector for the quantity display/input

  cy.get('[data-test="increase-quantity"]').click();
  cy.get('[data-test="quantity"]').should('have.value', '2');

  cy.get('[data-test="decrease-quantity"]').click();
  cy.get('[data-test="quantity"]').should('have.value', '1');

});

it("should navigate back to homepage when clicking Continue Shopping", () => {

  cy.visit("https://practicesoftwaretesting.com/");
  cy.get('[data-test="nav-home"]').click();
  cy.get('[data-test="product-name"]').contains('Combination Pliers').click();
  cy.get('[data-test="add-to-cart"]').click();
  cy.get('[data-test="nav-cart"]').click();

  cy.get('[data-test="continue-shopping"]').click();

  cy.url().should('eq', 'https://practicesoftwaretesting.com/');
});

});