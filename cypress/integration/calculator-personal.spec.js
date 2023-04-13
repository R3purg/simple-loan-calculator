describe('Calculator Personal Page', () => {

	beforeEach(() => {
		cy.fixture('loan-info.json').as('loanInfoJSON');

		cy.server();

		cy.route('', '@loanInfoJSON').as('loanInfo');

		cy.visit('/');
	});

	it('should display a list of all input fields', () => {
		cy.wait('@loanInfo');

		cy.get('mat-label').should('have.length', 7);
	});

});