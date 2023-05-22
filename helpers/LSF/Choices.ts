import { FF_DEV_2007 } from '../../feature-flags';
import { LabelStudio } from './LabelStudio';

class CChoices {
  private get _baseRootSelector() {
    return '.lsf-choices';
  }
  private getСhoiceSelector() {
    return LabelStudio.getFeatureFlag(FF_DEV_2007).then(isFFDev2007 => {
      return isFFDev2007 ? '.lsf-choice__item .ant-checkbox + span' : '.ant-checkbox-wrapper';
    });
  }

  private _rootSelector: string
  constructor(rootSelector) {
    this._rootSelector = rootSelector.replace(/^\&/, this._baseRootSelector);
  }

  get root() {
    return cy.get(this._rootSelector);
  }

  get select() {
    return this.root
      .find('.ant-select');
  }

  findChoice(text: string) {
    return this.getСhoiceSelector()
      .then(choiceSelector => {
        return this.root
          .find(choiceSelector)
          .contains(text);
      });
  }

  toggleSelect() {
    this.select
      .click('right');
  }

  findOption(text: string) {
    return cy.get('.ant-select-dropdown')
      .find('.ant-select-item-option')
      .contains(text);
  }
}

const Choices = new CChoices('&:eq(0)');
const useChoices = (rootSelector: string) => {
  return new CChoices(rootSelector);
};

export {
  Choices,
  useChoices
};
