/**
 * An object representing different methods for interacting with modals.
 */
export const Modals = {
  /**
   * Gets the warning modal.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The warning modal.
   */
  get warning() {
    return cy.get('.ant-modal.ant-modal-confirm-warning');
  },

  /**
   * Checks if the warning modal contains certain text.
   * @param {string} text - The text to check for in the modal.
   */
  hasWarning(text: string) {
    this.warning.should('be.visible');
    this.warning.contains('Warning').should('be.visible');
    this.warning.contains(text).should('be.visible');
    this.warning.contains('OK').should('be.visible');
  },

  /**
   * Checks that there are no warning modals.
   */
  hasNoWarnings() {
    this.warning.should('not.exist');
  },

  /**
   * Closes the warning modal.
   */
  closeWarning() {
    this.warning.find('.ant-modal-confirm-btns .ant-btn').contains('OK').click();
  },
};
