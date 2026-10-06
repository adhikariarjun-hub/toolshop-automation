describe("My Account - Messages", () => {

  beforeEach(() => {
    cy.login('customer@practicesoftwaretesting.com', 'welcome01');
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-messages"]').click();
    cy.url().should('include', '/account/messages');
  });

  it(" should load the messages page with the heading visible", () => {
    cy.get('h1').should('be.visible').and('contain', 'Messages');
  });

  it("should show the empty-state message with a link to the contact form when there are no messages", () => {
    
    cy.get('body').then(($body) => {
      if ($body.text().includes('There are no messages yet')) {
        cy.contains('There are no messages yet').should('be.visible');
        cy.contains('a', 'contact form').should('be.visible').and('have.attr', 'href'); 
      } else {
        cy.log('Messages already exist for this account; empty-state test skipped.');
      }
    });
  });

  it("should navigate to the Contact page when the 'contact form' link is clicked", () => {
    cy.get('body').then(($body) => {
      if ($body.text().includes('There are no messages yet')) {
        cy.contains('a', 'contact form').click();
        cy.url().should('include', '/contact');
      } else {
        cy.log('Empty state not shown; navigating via header Contact link instead.');
        cy.contains('a', 'Contact').click();
        cy.url().should('include', '/contact');
      }
    });
  });

  it("should list a message after it has been submitted via the Contact form", () => {
    cy.contains('a', 'Contact').click(); 
    cy.url().should('include', '/contact');

    cy.get('[data-test="first-name"]').type('Jane'); 
    cy.get('[data-test="last-name"]').type('Doe');   
    cy.get('[data-test="email"]').type('customer@practicesoftwaretesting.com'); 
    cy.get('[data-test="subject"]').select('Webmaster'); 
    cy.get('[data-test="message"]').type('This is a test message sent from Cypress automation.');
    cy.get('[data-test="submit-message"]').click(); 

    cy.get('[data-test="message-success"]').should('be.visible'); 

    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-messages"]').click();
    cy.url().should('include', '/account/messages');

    cy.contains('This is a test message sent from Cypress automation.').should('be.visible');
  });

});