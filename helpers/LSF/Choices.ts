import { FF_DEV_2007 } from '../../feature-flags';
import { LabelStudio } from './LabelStudio';

class ChoicesHelper {
  private get _baseRootSelector() {
    return '.lsf-choices';
  }
  private getСhoiceSelector() {
    return LabelStudio.getFeatureFlag(FF_DEV_2007).then(isFFDev2007 => {
      return isFFDev2007 ? '.lsf-choice__item .ant-checkbox + span' : '.ant-checkbox-wrapper';
    });
  }

  private getCheckedСhoiceSelector() {
    return LabelStudio.getFeatureFlag(FF_DEV_2007).then(isFFDev2007 => {
      return isFFDev2007 ? '.lsf-choice__item .ant-checkbox-checked + span' : '.ant-checkbox-wrapper-checked';
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
          .contains(choiceSelector, text);
      }); 
  }

  findCheckedChoice(text: string) {
    return this.getCheckedСhoiceSelector()
      .then(checkedСhoiceSelector => {
        return this.root
          .contains(checkedСhoiceSelector, text);
      });
  }

  hasCheckedChoice(text: string) {
    this.findCheckedChoice(text)
      .should('be.visible');
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

const Choices = new ChoicesHelper('&:eq(0)');
const useChoices = (rootSelector: string) => {
  return new ChoicesHelper(rootSelector);
};

export {
  Choices,
  useChoices
};
