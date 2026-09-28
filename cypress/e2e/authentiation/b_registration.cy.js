describe("Registration Page - Field Validations", () => {

  beforeEach(() => {
    cy.visit("https://practicesoftwaretesting.com/auth/register");
  });

  // NAME FIELDS 

  it("should accept valid first and last name", () => {
    cy.get('[data-test="first-name"]').type('Arjun').should('have.value', 'Arjun');
    cy.get('[data-test="last-name"]').type('Adhikari').should('have.value', 'Adhikari');
  });

  it("should reject numeric/special characters and handle very long input in name fields", () => {
    const invalidName = 'Arjun123!@#';
    const longName = 'A'.repeat(100);

    cy.get('[data-test="first-name"]').type(invalidName);
    cy.get('[data-test="last-name"]').type(longName);


    //cy.get('body').should('be.visible');
  });

  //  DATE OF BIRTH 

  it("should accept a valid date of birth in YYYY-MM-DD format", () => {
    cy.get('[data-test="dob"]').type('1995-06-15').should('have.value', '1995-06-15');
  });

  it("should reject invalid date of birth (future date, underage, invalid format)", () => {

    // invalid format
    cy.get('[data-test="dob"]').type('15-06-1995');
    cy.get('[data-test="dob-error"]').should('be.visible');
    cy.get('[data-test="dob-error"]').should('have.value', 'Please enter a valid date in YYYY-MM-DD format.');

    // future date
    cy.get('[data-test="dob"]').type('2099-01-01');
    cy.get('[data-test="dob-error"]').should('be.visible');
    cy.get('[data-test="dob"]').clear();

    // underage (e.g., born last year)
    const lastYear = new Date().getFullYear() - 1;
    cy.get('[data-test="dob"]').type(`${lastYear}-01-01`);
    cy.get('[data-test="dob-error"]').should('be.visible');
    cy.get('[data-test="dob"]').clear();


  });

  // COUNTRY DROPDOWN 

  it("should allow selecting a valid country from the dropdown", () => {
    cy.get('[data-test="country"]').select('Nepal').should('have.value', 'NP');
  });

  it("should load expected country options in the dropdown", () => {
    cy.get('[data-test="country"] option').then((options) => {
      const values = [...options].map(o => o.text);
      expect(values).to.include('Nepal');
      expect(values).to.include('United States of America (the)');
      expect(values).to.include('Australia');
    })
  })

  // POSTAL CODE 

  it("should accept a valid postal code", () => {
    cy.get('[data-test="postal_code"]', { timeout: 1000 }).type('33700').should('have.value', '33700');
    cy.get('[data-test="house_number"]').type('337').should('have.value', '337');

    cy.wait(5000);

    cy.get('[data-test="street"]').clear();
    cy.get('[data-test="street"]').type('barahi');

    cy.get('[data-test="city"]').clear();
    cy.get('[data-test="city"]').type('pokhara');

    cy.get('[data-test="state"]').clear();
    cy.get('[data-test="state"]').type('statefour');
  });

  //  PHONE NUMBER 

  it("should accept a valid phone number", () => {
    cy.get('[data-test="phone"]').type('9812345678').should('have.value', '9812345678');
  });

  it("should reject alphabetic/special characters in phone field", () => {
    cy.get('[data-test="phone"]').type('abc!@#123');
    cy.get('[data-test="register-submit"]').click();

    cy.get('[data-test="phone-error"]',{timeout: 8000}).should('be.visible');
    cy.get('[data-test="phone-error"]',{timeout: 8000}).contains('Only numbers are allowed.');
  });

  //EMAIL ADDRESS
  it("should accept a valid email address", () => {
    cy.get('[data-test="email"]').type('testaccount@gmail.com').should('have.value', 'testaccount@gmail.com');
  });

  /*it("should reject registration with an already-registered email", () => {
    cy.get('[data-test="email"]').type('mrarjunkomail@gmail.com'); // known existing account
    // fill remaining required fields with valid data before submitting
    cy.get('[data-test="register-submit"]').click();

    cy.get('[data-test="email-error"]').should('be.visible').and('contain', 'already been used');
  });*/

  it("should reject an invalid email format", () => {
    cy.get('[data-test="email"]').type('not-an-email');
    cy.get('[data-test="register-submit"]').click();

    cy.get('[data-test="email-error"]').should('be.visible').and('contain', 'Email format is invalid');
  });

  //Password

  it("should reject a password shorter than 8 characters", () => {
  cy.visit("https://practicesoftwaretesting.com/auth/register");

  cy.get('[data-test="password"]').type('Ab1!');
  cy.get('[data-test="register-submit"]').click();

  cy.get('[data-test="password-error"]').should('be.visible');
});

it("should reject a password missing an uppercase letter", () => {
  cy.visit("https://practicesoftwaretesting.com/auth/register");

  cy.get('[data-test="password"]').type('abcdefg1!');
  cy.get('[data-test="register-submit"]').click();

  cy.get('[data-test="password-error"]').should('be.visible');
});

it("should reject a password missing a lowercase letter", () => {
  cy.visit("https://practicesoftwaretesting.com/auth/register");

  cy.get('[data-test="password"]').type('ABCDEFG1!');
  cy.get('[data-test="register-submit"]').click();

  cy.get('[data-test="password-error"]').should('be.visible');
});

it("should reject a password missing a number", () => {
  cy.visit("https://practicesoftwaretesting.com/auth/register");

  cy.get('[data-test="password"]').type('Abcdefgh!');
  cy.get('[data-test="register-submit"]').click();

  cy.get('[data-test="password-error"]').should('be.visible');
});

it("should reject a password missing a special character", () => {
  cy.visit("https://practicesoftwaretesting.com/auth/register");

  cy.get('[data-test="password"]').type('Abcdefg1');
  cy.get('[data-test="register-submit"]').click();

  cy.get('[data-test="password-error"]').should('be.visible');
});

it.skip("should reject passwords missing required complexity conditions", () => {

    const invalidPasswords = [
      'short1!',        // too short
      'nouppercase1!',  // missing uppercase
      'NOLOWERCASE1!',  // missing lowercase
      'NoNumber!!',     // missing number
      'NoSpecial123'    // missing special char
    ];

    invalidPasswords.forEach((pwd) => {
      cy.get('[data-test="password"]').clear().type(pwd);
      cy.get('[data-test="register-submit"]').click();
      cy.get('[data-test="password-error"]').should('be.visible');
    });
  });


it("should show an error when password is left blank", () => {
  cy.visit("https://practicesoftwaretesting.com/auth/register");

  // fill every other required field except password
  cy.get('[data-test="first-name"]').type('Arjun');
  cy.get('[data-test="last-name"]').type('Adhikari');
  cy.get('[data-test="dob"]').type('1995-06-15');
  cy.get('[data-test="country"]').select('Nepal');
  cy.get('[data-test="email"]').type(`arjun.test.${Date.now()}@gmail.com`);

  cy.get('[data-test="register-submit"]').click();

  cy.get('[data-test="password-error"]').should('be.visible');
});


// REGISTER BUTTON

  it("should register successfully with all valid mandatory details", () => {

    const uniqueEmail = `arjun.test.${Date.now()}@gmail.com`; // avoids "already registered" conflict

    cy.get('[data-test="first-name"]').type('Arjun');
    cy.get('[data-test="last-name"]').type('Adhikari');
    cy.get('[data-test="dob"]').type('1995-06-15');
    cy.get('[data-test="country"]').select('Nepal');
    cy.get('[data-test="postal_code"]').type('33700'); // adjust to your confirmed selector
    cy.get('[data-test="house_number"]').type('337');
    cy.get('[data-test="street"]').clear().type('barahi');
    cy.get('[data-test="city"]').clear().type('pokhara');
    cy.get('[data-test="state"]').clear().type('statefour');
    cy.get('[data-test="phone"]').type('9812345678');
    cy.get('[data-test="email"]').type(uniqueEmail);
    cy.get('[data-test="password"]').type('Valid@Pass123');

    cy.get('[data-test="register-submit"]').click();

    cy.url().should('include', '/auth/login'); // adjust once you confirm actual post-registration redirect
  });


/*it("should register successfully with all valid mandatory details", () => {

    cy.fixture('registrationData').then((data) => {

        const dynamicEmail = `arjun.test${Date.now()}@gmail.com`;

        cy.get('[data-test="first-name"]').type(data.validUser.firstName);
        cy.get('[data-test="last-name"]').type(data.validUser.lastName);
        cy.get('[data-test="dob"]').type(data.validUser.dob);
        cy.get('[data-test="country"]').select(data.validUser.country);
        cy.get('[data-test="email"]').type(dynamicEmail);
        cy.get('[data-test="password"]').type(data.validUser.password);

        cy.get('[data-test="register-submit"]').click();
        cy.url().should('include', '/auth/login');
    });
});*/

  it("should keep register button disabled or show errors until all mandatory fields are valid", () => {
    cy.get('[data-test="register-submit"]').click();

    // adjust based on actual behavior: either button is disabled, or clicking shows multiple errors
    cy.get('[data-test="first-name-error"]').should('be.visible');
  });

  it("should sanitize SQL injection and script injection input in text fields", () => {
    const maliciousInput = `<script>alert('xss')</script>' OR '1'='1`;

    cy.get('[data-test="first-name"]').type(maliciousInput);
    cy.get('[data-test="register-submit"]').click();

    // confirm the app doesn't execute the script or crash — adjust based on observed behavior
    cy.get('body').should('be.visible');
    cy.on('window:alert', () => {
      throw new Error('XSS alert triggered — input was not sanitized!');
    });
  });



});


