describe("My Account - Profile", () => {

  beforeEach(() => {
    cy.login('customer@practicesoftwaretesting.com', 'welcome01');
    cy.get('[data-test="nav-menu"]').click();
    cy.get('[data-test="nav-profile"]').click();
    cy.url().should('include', '/account/profile');
  });

  
  // PROFILE SECTION
  

  it("1. should pre-fill existing profile fields with current data", () => {
    cy.get('[data-test="first-name"]').should('not.have.value', '');
    cy.get('[data-test="last-name"]').should('not.have.value', '');
    cy.get('[data-test="email"]').should('not.have.value', '');
    cy.get('[data-test="street"]').should('not.have.value', '');
    cy.get('[data-test="city"]').should('not.have.value', '');
    cy.get('[data-test="country"]').should('not.have.value', '');
  });

  it("2. should show a success message after updating a field and clicking Update Profile", () => {
    cy.get('[data-test="phone"]').clear().type('9812345678'); //verify
    cy.get('[data-test="update-profile-submit"]').click();

    cy.get('[data-test="profile-update-success"]').should('be.visible'); //verify
  });

  it("3. should reject updating profile with an invalid email format", () => {
    cy.get('[data-test="email"]').clear().type('invalid-email-format');
    cy.get('[data-test="update-profile-submit"]').click();

    cy.get('[data-test="email-error"]').should('be.visible'); //verify
  });

  it("4. should not allow required fields to be cleared and saved blank", () => {
    cy.get('[data-test="first-name"]').clear();
    cy.get('[data-test="last-name"]').clear();
    cy.get('[data-test="email"]').clear();
    cy.get('[data-test="update-profile-submit"]').click();

    cy.get('[data-test="first-name-error"]').should('be.visible'); 
    cy.get('[data-test="last-name-error"]').should('be.visible');  
    cy.get('[data-test="email-error"]').should('be.visible');     
  });


  // PASSWORD SECTION


  it("5. should display the password requirements list", () => {
    cy.get('[data-test="password-requirements"]').should('be.visible'); 
    cy.get('[data-test="password-requirements"]')
      .should('contain', '8')
      .and('contain', 'uppercase')
      .and('contain', 'lowercase')
      .and('contain', 'number')
      .and('contain', 'special');
  });

  it("6. should toggle visibility of New Password and Confirm New Password independently", () => {
    cy.get('[data-test="new-password"]').type('Test@1234');
    cy.get('[data-test="new-password-confirmation"]').type('Test@1234'); 

    cy.get('[data-test="new-password"]').should('have.attr', 'type', 'password');
    cy.get('[data-test="toggle-new-password"]').click(); 
    cy.get('[data-test="new-password"]').should('have.attr', 'type', 'text');

    cy.get('[data-test="new-password-confirmation"]').should('have.attr', 'type', 'password');
    cy.get('[data-test="toggle-new-password-confirmation"]').click(); //  verify
    cy.get('[data-test="new-password-confirmation"]').should('have.attr', 'type', 'text');
  });

  it("7. should show 'Weak' on the strength meter for a weak password", () => {
    cy.get('[data-test="new-password"]').type('weak');
    cy.get('[data-test="password-strength"]').should('contain', 'Weak'); //  verify
  });

  it("8. should show 'Very Strong'/'Excellent' on the strength meter for a strong password", () => {
    cy.get('[data-test="new-password"]').type('Str0ng!Pass#2026');
    cy.get('[data-test="password-strength"]').should('contain', 'Strong'); //  verify
  });

  it("9. should show a validation error when New Password and Confirm New Password do not match", () => {
    cy.get('[data-test="new-password"]').type('Str0ng!Pass1');
    cy.get('[data-test="new-password-confirmation"]').type('Different!Pass2'); // verify
    cy.get('[data-test="change-password-submit"]').click();

    cy.get('[data-test="password-match-error"]').should('be.visible'); // verify
  });

  it("10. should reject changing password when Current Password is incorrect", () => {
    cy.get('[data-test="current-password"]').type('WrongCurrentPass1!');
    cy.get('[data-test="new-password"]').type('Str0ng!Pass1');
    cy.get('[data-test="new-password-confirmation"]').type('Str0ng!Pass1'); //  verify
    cy.get('[data-test="change-password-submit"]').click();

    cy.get('[data-test="current-password-error"]').should('be.visible'); // verify
  });

  it("11. should show a success message on successful password change", () => {
    cy.get('[data-test="current-password"]').type('welcome01');
    cy.get('[data-test="new-password"]').type('Welcome01!');
    cy.get('[data-test="new-password-confirmation"]').type('Welcome01!'); //  verify
    cy.get('[data-test="change-password-submit"]').click();

    cy.get('[data-test="password-update-success"]').should('be.visible'); //  verify
  });

  
  // TWO-FACTOR AUTHENTICATION SECTION
 

  it("12. should show 'Access denied' message for this shared demo account when configuring TOTP", () => {
    cy.get('[data-test="totp-setup"]').click(); // assumed locator, verify
    cy.get('[data-test="totp-access-denied"]').should('be.visible').and('contain', 'Access denied'); verify
  });

});