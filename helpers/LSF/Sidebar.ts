import { LabelStudio } from './LabelStudio';
import { FF_DEV_1170 } from '../../feature-flags';

export const Sidebar = {
  get outliner() {
    return cy.get('.lsf-outliner');
  },
  get legacySidebar() {
    return cy.get('.lsf-sidebar-tabs');
  },
  get toolBar() {
    return this.outliner
      .get('.lsf-view-controls');
  },
  get hideAllRegionsButton() {
    return this.toolBar
      .get('[aria-label="Hide all regions"]');
  },
  get showAllRegionsButton() {
    return this.toolBar
      .get('[aria-label="Show all regions"]');
  },
  get regions() {
    return LabelStudio.getFeatureFlag(FF_DEV_1170).then(isFFDEV1170 => {
      if (isFFDEV1170) {
        return this.outliner
          .should('be.visible')
          .get('.lsf-tree-node-content-wrapper');
      }

      return this.legacySidebar
        .should('be.visible')
        .get('.lsf-region-item');
    });
  },
  findRegion(selector: string) {
    return this.regions.filter(selector);
  },
  findRegionByIndex(idx: number) {
    return this.findRegion(`:eq(${idx})`);
  },
  get hiddenRegions() {
    return this.outliner
      .should('be.visible')
      .get('.lsf-tree__node_hidden .lsf-tree-node-content-wrapper');
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
  hasHiddenRegion(value: number) {
    this.hiddenRegions.should('have.length', value);
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
