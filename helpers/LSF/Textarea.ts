

class TextareaHelper {
  private get _baseRootSelector() {
    return '.lsf-text-area';
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
      .find('[aria-label="TextArea Input"]');
  }

  get rows() {
    return this.root
      .find('[class^="row--"]');
  }

  type(text: string) {
    return this.input.type(text);
  }

  hasValue(text: string) {
    this.rows.contains(text);
  }

  hasNoValue(text: string) {
    this.rows.contains(text).should('not.exist');
  }
}

const Textarea = new TextareaHelper('&:eq(0)');
const useTextarea = (rootSelector: string) => {
  return new TextareaHelper(rootSelector);
};

export {
  Textarea,
  useTextarea
};
