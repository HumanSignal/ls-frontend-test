export const ToolBar = {
  /**
   * Represents the root HTML element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} Cypress object which represents the root HTML element.
   */
  get root(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.lsf-topbar');
  },
  /**
   * Represents the submit button HTML element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} Cypress object which represents the submit button HTML element.
   */
  get submitBtn(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.root
      .find('[aria-label="submit"]');
  },
  /**
   * Represents the annotations dropdown toggle HTML element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} Cypress object which represents the annotations toggle HTML element.
   */
  get annotationsToggle(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.root
      .find('.lsf-annotations-list');
  },
  /**
   * Represents the create annotation button HTML element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} Cypress object which represents the create annotation button HTML element.
   */
  get createAnnotationButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.root
      .find('.lsf-annotations-list__create');
  },
  /**
   * Represents the list of annotation HTML elements in the dropdown.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} Cypress object which represents the list of annotation HTML elements in the dropdown.
   */
  get annotationsList(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.root.find('.lsf-annotations-list__list');
  },
  /**
   * Toggles the display of the annotations list.
   */
  toggleAnnotationsList(): void {
    this.annotationsToggle.click();
  },
  /**
   * Triggers the creation of a new annotation.
   */
  createNewAnnotation(): void {
    this.createAnnotationButton.click();
  },
  /**
   * Triggers a click event on a specific annotation in the list.
   * @param annotationIndex {number} - The index of the annotation in the list.
   */
  selectAnnotation(annotationIndex: number): void {
    this.annotationsList
      .find('.lsf-annotations-list__entity')
      .eq(annotationIndex)
      .click();
  },

  clickSubmit() {
    this.submitBtn.click();
  },
};
