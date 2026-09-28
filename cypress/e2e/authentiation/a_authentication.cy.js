describe("Practice Tool Shop Login", () => {

    beforeEach(() => {
    cy.visit("https://practicesoftwaretesting.com/auth/login");
  });

  // positive test cases
  it("should navigate to the sign-in screen", () => {

        cy.url().should('include', '/auth/login');
        cy.get('[data-test="email"]').should('be.visible');
        cy.get('[data-test="password"]').should('be.visible');
        cy.get('[data-test="login-submit"]').should('be.visible');
  });

  it("should login with valid credentails", () => {

        cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com').should('have.value', 'mrarjunkomail@gmail.com');
        cy.get('[data-test="password"]').type('@njit.Ad0708').should('have.value', '@njit.Ad0708');
        cy.get('[data-test="login-submit"]').click()

        // cy.url().should('not.include', '/auth/login');
    })

  it("should login successfully with uppercase email and valid password", () => {

    cy.get('[data-test="email"]').type('MRARJUNKOMAIL@GMAIL.COM').should('have.value', 'MRARJUNKOMAIL@GMAIL.COM');
    cy.get('[data-test="password"]').type('@njit.Ad0708').should('have.value', '@njit.Ad0708');
    cy.get('[data-test="login-submit"]').click();

    //cy.url().should('not.include', '/auth/login');
    });

  it("should trim leading and trailing spaces in email", () => {

    cy.get('[data-test="email"]').type('   mrarjunkomail@gmail.com   ').should('have.value', 'mrarjunkomail@gmail.com');
    cy.get('[data-test="password"]').type('@njit.Ad0708').should('have.value', '@njit.Ad0708');
    cy.get('[data-test="login-submit"]').click();

    //cy.url().should('not.include', '/auth/login');
    });

  it("should toggle password visibility without altering the value", () => {

    const password = '@njit.Ad0708';

    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com');
    cy.get('[data-test="password"]').type(password);

    // initially masked
    cy.get('[data-test="password"]').should('have.attr', 'type', 'password');

    // click eye icon to reveal
    cy.get('[data-test="password"]').parent().find('button').click();
    cy.get('[data-test="password"]').should('have.attr', 'type', 'text');
    cy.get('[data-test="password"]').should('have.value', password);

    // click eye icon again to re-mask
    cy.get('[data-test="password"]').parent().find('button').click();
    cy.get('[data-test="password"]').should('have.attr', 'type', 'password');
    cy.get('[data-test="password"]').should('have.value', password);
    });

// Neagtive test cases

it("should reject login with registered email wrong password following standard password format", () => {

    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com');
    cy.get('[data-test="password"]').type('Wrongp@ssword123');
    cy.get('[data-test="login-submit"]').click();

    cy.get('[data-test="login-error"]').should('be.visible').and('contain', 'Invalid email or password');
    cy.url().should('include', '/auth/login');
    });

it("should reject login with unregistered email and valid password", () => {

    cy.get('[data-test="email"]').type('notregistered@gmail.com');
    cy.get('[data-test="password"]').type('@njit.Ad0708');
    cy.get('[data-test="login-submit"]').click();

    cy.get('[data-test="login-error"]').should('be.visible').and('contain', 'Invalid email or password');
    cy.url().should('include', '/auth/login');
});

it("should show required field errors when fields are left blank", () => {

    // both blank
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="email-error"]').should('be.visible').and('contain', 'Email is required');
    cy.get('[data-test="password-error"]').should('be.visible').and('contain', 'Password is required');

    // only password filled
    cy.get('[data-test="password"]').type('@njit.Ad0708');
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="email-error"]').should('be.visible').and('contain', 'Email is required');

    // clear password, fill email only
    cy.get('[data-test="password"]').clear();
    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com');
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="password-error"]').should('be.visible').and('contain', 'Password is required');
});

it("should reject invalid email format", () => {

    cy.get('[data-test="email"]').type('not-an-email');
    cy.get('[data-test="password"]').type('@njit.Ad0708');
    cy.get('[data-test="login-submit"]').click();

    cy.get('[data-test="email-error"]').should('be.visible').and('contain', 'Email format is invalid');
});

it("should handle extremely long input without breaking", () => {

    const longEmail = 'a'.repeat(300) + '@gmail.com';
    const longPassword = 'P@ssw0rd'.repeat(50);

    cy.get('[data-test="email"]').type(longEmail);
    cy.get('[data-test="password"]').type(longPassword);
    cy.get('[data-test="login-submit"]').click();

    cy.get('body').should('be.visible');
    cy.url().should('include', '/auth/login');
});

it("should lock or restrict account after repeated failed login attempts", () => {

    for (let i = 0; i < 10; i++) {
        cy.get('[data-test="email"]').clear().type('mrarjunkomail@gmail.com');
        cy.get('[data-test="password"]').clear().type('wrongpassword' + i);
        cy.get('[data-test="login-submit"]').click();

        cy.get('[data-test="login-error"]').should('be.visible');
    }

    // after 10 failed attempts, expect some form of lockout/restriction
    //cy.get('[data-test="login-error"]').should('contain', 'account'); 
});

// FORGET PASSWORD

it("should have the forgot password link enabled and navigate correctly", () => {
    cy.get('[data-test="forgot-password-link"]').should('be.visible').and('not.be.disabled');

    cy.get('[data-test="forgot-password-link"]').click();

    cy.url().should('include', '/auth/forgot-password'); 
    cy.get('[data-test="email"]').should('be.visible');
    cy.get('[data-test="forgot-password-submit"]').should('be.visible');
  });

  it("should request password reset with a valid registered email", () => {
    cy.get('[data-test="forgot-password-link"]').click();

    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com');
    cy.get('[data-test="forgot-password-submit"]').click();

    //adjust once you confirm the actual on-screen confirmation message/element
    //cy.get('[data-test="forgot-password-success"]').should('be.visible');
  });

//Registration
//name field
});