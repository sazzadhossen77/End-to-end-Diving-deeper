describe('Page Navigation ', () => {
  it('Should navigate between pages', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.get('[data-cy=header-about-link]').click()
    cy.location('pathname').should('eq','/about')
    cy.go('back')
    cy.location('pathname').should('eq','/')

    cy.pause('')
    cy.get('[data-cy=header-about-link]').click()
    cy.get('[data-cy=header-home-link]').click()
    cy.location('pathname').should('eq','/')



  })
})