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
  hasRegions(value: number) {
    this.regions.should('have.length', value);
  },
  hasNoRegions() {
    this.regions.should('not.exist');
  },
};
