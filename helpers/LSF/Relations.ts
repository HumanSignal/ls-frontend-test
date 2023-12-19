import Chainable = Cypress.Chainable;

const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
  BOTH: 'bi',
};

type Direction = typeof DIRECTION[keyof typeof DIRECTION];

type RelationIdxArgs = [idx: number];
type RelationFromToArgs = [from: string, to: string];
type RelationArgs = RelationIdxArgs | RelationFromToArgs;

export const Relations = {
  DIRECTION,
  /**
   * Get relation by index or by from/to labels
   * @param args
   */
  getRelation(...args: RelationArgs): Chainable<JQuery<HTMLElement>> {
    if (args.length === 1) {
      const idx: number = args[0];

      return cy.get('.lsf-relations .lsf-relations__item').eq(idx);
    } else {
      const [from, to]: RelationFromToArgs = args;

      return cy.get('.lsf-relations').contains(from).closest('.lsf-relations').contains(to);
    }
  },
  /**
   * Check number of existed relations
   * @param count
   */
  hasRelations(count: number) {
    cy.get('.lsf-details__section-head').should('have.text', `Relations (${count})`);
  },
  /**
   * Check that relation exists
   * @param relationArgs
   */
  hasRelation(...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs).should('be.visible');
  },
  /**
   * Check that relation has specific direction
   * @param direction
   * @param relationArgs
   */
  hasRelationDirection(direction: Direction, ...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs)
      .find(`[data-direction="${direction}"]`)
      .should('be.visible');
  },
  /**
   * Check that relation has specific labels
   * @param labels
   * @param relationArgs
   */
  hasRelationLabels(labels: string | string[], ...relationArgs: RelationArgs) {
    if (!Array.isArray(labels)) {
      labels = [labels];
    }

    const $selector = this.getRelation(...relationArgs)
      .find('.lsf-relation-meta .ant-select-selection-overflow');

    if (labels.length === 0) {
      // There is also input in the selector
      $selector.children().should('have.length', 1);
      return;
    }

    for (const label of labels) {
      this.getRelation(...relationArgs).find(`.ant-select-selection-item[title="${label}"]`).should('be.visible');
    }
  },
  addLabelToRelation(label: string, ...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs)
      .find('.lsf-relation-meta .ant-select-selector')
      .click()
      .find('.ant-select-selection-search-input')
      .type(label)
      .type('{enter}');
  },
  /**
   * Check that relation is hidden
   * @param relationArgs
   */
  isHiddenRelation(...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs).should('have.class', 'lsf-relations__item_hidden');
  },
  /**
   * Check that relation is not hidden
   * @param relationArgs
   */
  isNotHiddenRelation(...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs).should('not.have.class', 'lsf-relations__item_hidden');
  },
  /**
   * Hover over relation to show action buttons
   * @param relationArgs
   */
  hoverOverRelation(...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs).trigger('mouseover');
  },
  /**
   * Stop hovering over relation to hide action buttons
   * @param relationArgs
   */
  stopHoveringOverRelation(...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs).trigger('mouseout');
  },
  /**
   * Toggle relation direction
   * @param relationArgs
   */
  toggleRelationDirection(...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs)
      .find('.lsf-relations__direction')
      .parent()
      .click();
  },
  /**
   * Click delete relation button
   * @param relationArgs
   */
  clickDelete(...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs)
      .find('[aria-label="Delete Relation"]')
      .click();
  },
  /**
   * Click show relation button
   * @param relationArgs
   */
  clickShowRelation(...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs)
      .find('[aria-label="Show Relation"]')
      .click();
  },
  /**
   * Click hide relation button
   * @param relationArgs
   */
  clickHideRelation(...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs)
      .find('[aria-label="Hide Relation"]')
      .click();
  },
  /**
   * Click show relation labels button
   * @param relationArgs
   */
  clickShowRelationLabels(...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs)
      .find('[aria-label="Show Relation Labels"]')
      .click();
  },
  /**
   * Click hide relation labels button
   * @param relationArgs
   */
  clickHideRelationLabels(...relationArgs: RelationArgs) {
    this.getRelation(...relationArgs)
      .find('[aria-label="Hide Relation Labels"]')
      .click();
  },
  /**
   * Action that deletes relation without additional preparations
   * @param relationArgs
   */
  deleteRelationAction(...relationArgs: RelationArgs) {
    this.hoverOverRelation(...relationArgs);
    this.clickDelete(...relationArgs);
  },
  /**
   * Action that hides relation without additional preparations
   * @param relationArgs
   */
  hideRelationAction(...relationArgs: RelationArgs) {
    this.hoverOverRelation(...relationArgs);
    this.clickHideRelation(...relationArgs);
    this.stopHoveringOverRelation(...relationArgs);
  },
  /**
   * Action that shows relation without additional preparations
   * @param relationArgs
   */
  showRelationAction(...relationArgs: RelationArgs) {
    this.hoverOverRelation(...relationArgs);
    this.clickShowRelation(...relationArgs);
    this.stopHoveringOverRelation(...relationArgs);
  },
  /**
   * Toggle relation creation mode by button
   */
  toggleCreation() {
    cy.get('.lsf-region-actions__group_align_left > :nth-child(1) > .lsf-button__icon').click();
  },
  /**
   * Toggle relation creation mode by hotkey
   */
  toggleCreationWithHotkey() {
    // hotkey is alt + r
    cy.get('body').type('{alt}r');
  },
};
