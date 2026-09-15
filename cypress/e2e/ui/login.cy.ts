describe('Login', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login')
  })

  it('should login successfully with valid credentials', () => {
    cy.log('Enter valid username')
    cy.get('#username').type('tomsmith')

    cy.log('Enter valid password')
    cy.get('#password').type('SuperSecretPassword!')

    cy.log('Submit login form')
    cy.get('button[type="submit"]').click()

    cy.log('Validate successful login')
    cy.url().should('include', '/secure')
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'You logged into a secure area!')

    cy.log('Validate logout option')
    cy.get('a[href="/logout"]')
      .should('be.visible')
      .and('contain.text', 'Logout')
  })

  it('should display an error for an invalid username', () => {
    cy.log('Enter invalid username')
    cy.get('#username').type('invalid_user')

    cy.log('Enter password')
    cy.get('#password').type('SuperSecretPassword!')

    cy.log('Submit login form')
    cy.get('button[type="submit"]').click()

    cy.log('Validate invalid username message')
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'Your username is invalid!')
  })

  it('should display an error for an invalid password', () => {
    cy.log('Enter valid username')
    cy.get('#username').type('tomsmith')

    cy.log('Enter invalid password')
    cy.get('#password').type('invalid_password')

    cy.log('Submit login form')
    cy.get('button[type="submit"]').click()

    cy.log('Validate invalid password message')
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'Your password is invalid!')
  })
})
