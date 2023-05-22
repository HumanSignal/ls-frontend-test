import { FF_DEV_2007 } from '../../feature-flags';
import { LabelStudio } from './LabelStudio';

class CTaxonomy {
  private get _baseRootSelector() {
    return '.taxonomy';
  }

  private _rootSelector: string
  constructor(rootSelector) {
    this._rootSelector = rootSelector.replace(/^\&/, this._baseRootSelector);
  }

  get root() {
    return cy.get(this._rootSelector);
  }

  get input() {
    return this.root
      .find('.htx-taxonomy');
  }
  get dropdown() {
    return this.root
      .find('[class^=taxonomy__dropdown]');
  }
  findItem(text) {
    return this.dropdown
      .find('[class^=taxonomy__item]')
      .contains(text)
      .scrollIntoView();
  }
  open() {
    this.input
      .filter(':not([class=taxonomy_open--])')
      .click();
  }
  close() {
    this.input
      .filter('[class=taxonomy_open--]')
      .click();
  }
}

const Taxonomy = new CTaxonomy('&:eq(0)');
const useTaxonomy = (rootSelector: string) => {
  return new CTaxonomy(rootSelector);
};

export {
  Taxonomy,
  useTaxonomy
};
