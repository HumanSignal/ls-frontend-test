import { LabelStudio } from './LabelStudio';
import { FF_DEV_1170 } from '../../feature-flags';

export const Sidebar = {
  get outliner() {
    return cy.get('.lsf-outliner');
  },
  get legacySidebar() {
    return cy.get('.lsf-sidebar-tabs');
  },
  get regions() {
    if (LabelStudio.getFeatureFlag(FF_DEV_1170)) {
      return this.outliner
        .should('be.visible')
        .get('.lsf-tree-node-content-wrapper');
    }

    return this.legacySidebar
      .should('be.visible')
      .get('.lsf-region-item');
  },
  hasRegions(value: number) {
    this.regions.should('have.length', value);
  },
  hasNoRegions() {
    this.regions.should('not.exist');
  },
  hasSelectedRegions(value: number) {
    this.regions.filter('.lsf-tree-node-selected').should('have.length', value);
  },

  toggleRegionVisibility(idx) {
    this.regions
      .eq(idx)
      // Hover to see action button. (Hover will not work actually)
      // It will not show hidden elements, but it will generate correct elements in react
      .trigger('mouseover')
      .find('.lsf-outliner-item__controls')
      .find('.lsf-outliner-item__control_type_visibility button')
      .click({ force: true });
  },
};
