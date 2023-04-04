declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    captureScreenshot(name: string): Chainable<JQuery<Element>>;
    compareScreenshot(name: string, assert: 'shouldChange' | 'shouldNotChange' | 'diff', treshold?: number): Chainable<JQuery<Element>>;
  }
}

