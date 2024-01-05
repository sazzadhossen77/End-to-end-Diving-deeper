describe('Contacts form', () => {

  before(() => {
    // Code to run only once,before the tests

    // For example, you can visit a web page
   // cy.visit('https://example.com');
  
});
beforeEach(() => {
  // Code to run before each test

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


  it('Submit the from', () => {
    cy.visit('/about')
    cy.get('[data-cy="contact-input-message"]').type('i am learning Automation.')
    cy.get('[data-cy="contact-input-name"]').type('Sazzad Hossen')
    cy.get('[data-cy="contact-btn-submit"]').then((el)=> {
            // Assert that the button is not disabled
      expect(el.attr('disabled')).to.be.undefined;
            // Assert that the text content of the button contains 'Send Message'
      expect(el.text()).to.be.contains('Send Message')
            // Additional assertion to check if the exact text is 'Send Message'
      expect(el.text()).to.eq('Send Message')

    })
    cy.get('[data-cy="contact-input-email"]').type('sazzad@gmail.com{enter}')

    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .should('not.have.attr', 'disabled')

    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn')
    cy.get('@submitBtn').click()
    cy.get('@submitBtn').contains('Sending...')
    cy.get('@submitBtn').should('have.attr', 'disabled')  //If the button is disabled, the test will pass; if it's not disabled, the test will fail. This is commonly used in automated testing to ensure that certain buttons or elements on a web page are in the expected state


  })

  it('should validate the rom input',()=>{
    cy.visit('/about')
    cy.get('[data-cy="contact-btn-submit"]').click()
    cy.get('[data-cy="contact-btn-submit"]').contains('Send Message')

    cy.get('[data-cy="contact-btn-submit"]').then((el)=> {
            // Assert that the button does not have the "disabled" attribute using 
       expect(el).to.not.have.attr('disabled')
            // Additional assertion to check if the exact text is not 'Sending...' using 
        expect(el.text()).to.not.eq('Sending...')

    })
     //Verify that the button still contains the text 'Send Message' after assertions using
   cy.get('[data-cy="contact-btn-submit"]').contains('Send Message')
   cy.get('[data-cy="contact-input-message"]').focus().blur()
   cy.get('[data-cy="contact-input-message"]')
      .parent()  
      .then((el)=>{
    expect(el.attr('class')).to.contains('invalid')
      })

    cy.get('[data-cy="contact-input-name"]').focus().blur()
    cy.get('[data-cy="contact-input-name"]')
      .parent()  
      .then((el)=>{
      expect(el.attr('class')).to.contains('invalid')
        })

    cy.get('[data-cy="contact-input-email"]').focus().blur()
    cy.get('[data-cy="contact-input-email"]')
       .parent()  
       .then((el)=>{
       expect(el.attr('class')).to.contains('invalid')
        })
  })
})