
describe('contact form', () => {
  before(() => {
    // Code to run only once,before the tests

    // For example, you can visit a web page
   // cy.visit('https://example.com');
  
});
beforeEach(() => {
  // Code to run before each test
  cy.visit('/about'); 
  // For example, you can visit a web page before each test
 // cy.visit('https://example.com');

  
});

afterEach(() => {
  // This block is empty, and no code will be executed after each test
});

after(() => {
  // Code to run after all tests in the entire test suite
  // This block is executed once after all test cases have finished
});


  it('should submit the form', () => {
   
    //cy.visit('/about'); 

    cy.getById('contact-input-message').type('Hello world!');
    cy.getById('contact-input-name').type('Sazzad Hossen');
    cy.getById('contact-btn-submit').then((el) => {
      expect(el.attr('disabled')).to.be.undefined;
      expect(el.text()).to.eq('Send Message');
    });
    cy.screenshot();
    cy.getById('contact-input-email').type('test@example.com');
    //cy.get('form button [type="submitForm"]').click();
    cy.submitForm()

    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .should('not.have.attr', 'disabled');
    cy.screenshot();
    cy.getById('contact-btn-submit').as('submitBtn');
    // cy.get('@submitBtn').click();
    cy.get('@submitBtn').contains('Sending...');
    cy.get('@submitBtn').should('have.attr', 'disabled');
  });

  it('should validate the form input', () => {
    //cy.visit('/about'); //http://127.0.0.1:5174/about
    //cy.get('form button [type="submitForm"]').click();
    cy.submitForm()
    cy.getById('contact-btn-submit').then((el) => {
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.equal('Sending...');
    });
    cy.getById('contact-btn-submit').contains('Send Message');
    cy.getById('contact-input-message').as('msgInput');
    cy.get('@msgInput').focus().blur();
    cy.get('@msgInput')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })

    cy.getById('contact-input-name').focus().blur();
    cy.getById('contact-input-name')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })

    cy.getById('contact-input-email').focus().blur();
    cy.getById('contact-input-email')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })
  });
});
