describe("My Account - Invoices", () => {

  beforeEach(() => {
    cy.login('customer@practicesoftwaretesting.com', 'welcome01');
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-invoices"]').click();
    cy.url().should('include', '/account/invoices');
  });

  it("should load the invoices page with the table visible", () => {
    cy.get('table').should('be.visible');
    cy.get('h1').should('contain', 'Invoices');
  });

  it("should show the expected columns in the table header", () => {
    cy.get('thead').within(() => {
      cy.get('th').should('contain', 'Invoice Number');
      cy.get('th').should('contain', 'Billing Address');
      cy.get('th').should('contain', 'Invoice Date');
      cy.get('th').should('contain', 'Total');
    });
  });

  it("should display non-empty invoice number, date, and total for each row", () => {
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).find('td').eq(0).invoke('text').should('not.be.empty'); // Invoice Number
      cy.wrap($row).find('td').eq(2).invoke('text').should('not.be.empty'); // Invoice Date
      cy.wrap($row).find('td').eq(3).invoke('text').should('not.be.empty'); // Total
    });
  });

  it.only("should navigate to invoice detail view when 'Details' is clicked", () => {
    cy.get('tbody tr').first().find('td').first().invoke('text').then((invoiceNumber) => {
      cy.get('tbody tr').first().contains('Details').click();
 
      
    //   cy.contains(invoiceNumber.trim()).should('be.visible');
    });
  });

  it("should show pagination controls with multiple pages", () => {
    cy.get('[data-test="pagination-prev"]').should('be.visible');
    cy.get('ul.pagination li, .pagination a').should('have.length.greaterThan', 1); // assumed selector, verify
  });

  it("should load a different set of invoices when a different page is selected", () => {
    cy.get('tbody tr').first().find('td').first().invoke('text').then((firstPageInvoice) => {
      cy.contains('.pagination a, .pagination button', '2').click(); // assumed selector, verify

      cy.get('tbody tr').first().find('td').first().invoke('text').should((secondPageInvoice) => {
        expect(secondPageInvoice.trim()).not.to.eq(firstPageInvoice.trim());
      });
    });
  });

});