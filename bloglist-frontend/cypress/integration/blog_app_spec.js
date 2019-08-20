describe('Blog app', function() {
  it('login page can be opened', function() {
    cy.visit('http://localhost:3000') 
    cy.contains('login')
  })

  it('user can login', function() {
    cy.get('#username')
      .type('antjuntu')
    cy.get('#password')
      .type('salasana')
    cy.contains('login')
      .click()
    cy.contains('Antti logged in')
  })

  it('blogs details page can be opened', function() {
    cy.contains('testiblogi')
      .click()
    cy.contains('www.testiblogi.fi')
  })

})