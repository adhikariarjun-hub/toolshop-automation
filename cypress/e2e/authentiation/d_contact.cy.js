describe("Contact Page", () => {

  beforeEach(() => {
    cy.visit("https://practicesoftwaretesting.com/");
  });

  // NAVIGATION 

it("should navigate to the Contact page from the homepage", () => {
    cy.get('[data-test="nav-contact"]').click();

    cy.url().should('include', '/contact');
    
});
  

  //  POSITIVE 

  it("should submit the form successfully with all valid required fields", () => {
   cy.get('[data-test="nav-contact"]').click();

    cy.get('[data-test="first-name"]').type('Arjun').should('have.value', 'Arjun');
    cy.get('[data-test="last-name"]').type('Adhikari').should('have.value', 'Adhikari');
    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com').should('have.value', 'mrarjunkomail@gmail.com');
    cy.get('[data-test="subject"]').select('Warranty'); // adjust to an actual option text

    const message = 'This is a test message with at least fifty characters in it for validation purposes.';
    cy.get('[data-test="message"]').type(message).should('have.value', message);

    cy.get('[data-test="contact-submit"]').click();

    cy.contains('h3', 'Contact', { timeout: 10000 }).should('be.visible');
    cy.contains('Thanks for your message! We will contact you shortly.').should('be.visible');
  });

  it("should accept a valid 0kb .txt file attachment", () => {
    cy.get('[data-test="nav-contact"]').click();

    cy.get('[data-test="first-name"]').type('Arjun');
    cy.get('[data-test="last-name"]').type('Adhikari');
    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com');
    cy.get('[data-test="subject"]').select('Warranty');

    const message = 'This is a test message with at least fifty characters in it for validation purposes.';
    cy.get('[data-test="message"]').type(message);

    cy.get('[data-test="attachment"]').selectFile('cypress/fixtures/empty-file.txt'); // must be a real 0kb .txt file in your fixtures folder

    cy.get('[data-test="contact-submit"]').click();

    cy.contains('Thanks for your message! We will contact you shortly.').should('be.visible');
  });

  //  NEGATIVE — REQUIRED FIELDS 

  it("should show an error when First name is left blank", () => {
    cy.get('[data-test="nav-contact"]').click();

    cy.get('[data-test="first-name"]').click().blur(); // focus then blur, to trigger Angular's touched state
    cy.get('[data-test="last-name"]').type('Adhikari');
    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com');
    cy.get('[data-test="subject"]').select('Warranty');
    cy.get('[data-test="message"]').type('This is a test message with at least fifty characters in it.');

    cy.get('[data-test="contact-submit"]').click();

    cy.get('[data-test="first-name-error"]').should('be.visible').and('contain', 'First name is required');
});

  it("should show an error when Last name is left blank", () => {
    cy.get('[data-test="nav-contact"]').click();

    cy.get('[data-test="first-name"]').type('Arjun');
    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com');
    cy.get('[data-test="subject"]').select('Return');
    cy.get('[data-test="message"]').type('This is a test message with at least fifty characters in it.');

    cy.get('[data-test="contact-submit"]').click();

    cy.get('[data-test="last-name-error"]').should('be.visible').and('contain', 'Last name is required');
  });

  it("should show an error when Email is left blank", () => {
    cy.get('[data-test="nav-contact"]').click();

    cy.get('[data-test="first-name"]').type('Arjun');
    cy.get('[data-test="last-name"]').type('Adhikari');
    cy.get('[data-test="subject"]').select('Warranty');
    cy.get('[data-test="message"]').type('This is a test message with at least fifty characters in it.');

    cy.get('[data-test="contact-submit"]').click();

    cy.get('[data-test="email-error"]').should('be.visible').and('contain', 'Email is required');
  });

  it("should show an error when Subject is left unselected", () => {
    cy.get('[data-test="nav-contact"]').click();

    cy.get('[data-test="first-name"]').type('Arjun');
    cy.get('[data-test="last-name"]').type('Adhikari');
    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com');
    cy.get('[data-test="message"]').type('This is a test message with at least fifty characters in it.');

    cy.get('[data-test="contact-submit"]').click();

    cy.get('[data-test="subject-error"]').should('be.visible').and('contain', 'Subject is required');
  });

  it("should show an error when Message is left blank", () => {
    cy.get('[data-test="nav-contact"]').click();

    cy.get('[data-test="first-name"]').type('Arjun');
    cy.get('[data-test="last-name"]').type('Adhikari');
    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com');
    cy.get('[data-test="subject"]').select('Warranty');

    cy.get('[data-test="contact-submit"]').click();

    cy.get('[data-test="message-error"]').should('be.visible').and('contain', 'Message must be minimal 50 characters');
  });

  it("should show all required field errors when the form is submitted blank", () => {
    cy.get('[data-test="nav-contact"]').click();

    cy.get('[data-test="contact-submit"]').click();

    cy.get('[data-test="first-name-error"]').should('have.value', 'First name is required');
    cy.get('[data-test="last-name-error"]').should('have.value', 'Last name is required');
    cy.get('[data-test="email-error"]').should('have.value', 'Email is required');
    cy.get('[data-test="subject-error"]').should('have.value', 'Subject is required');
    cy.get('[data-test="message-error"]').should('have.value', 'Message must be minimal 50 characters');
  });

  //  NEGATIVE — ATTACHMENT 

  it.only("should reject a .txt file that is not 0kb", () => {
    cy.get('[data-test="nav-contact"]').click();

    cy.get('[data-test="first-name"]').type('Arjun');
    cy.get('[data-test="last-name"]').type('Adhikari');
    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com');
    cy.get('[data-test="subject"]').select('Warranty');
    cy.get('[data-test="message"]').type('This is a test message with at least fifty characters in it.');

    cy.get('[data-test="attachment"]').selectFile('cypress/fixtures/non-empty-file.txt'); // a .txt file with actual content

    cy.get('[data-test="contact-submit"]').click();

    cy.contains('File should be empty.').should('be.visible');
  });

});