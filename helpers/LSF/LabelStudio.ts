import { expect } from 'chai';

export const LabelStudio = {
  /**
   * Initializes LabelStudio intance with given configuration
   */
  init(params: Record<string, any>) {
    Cypress.on('window:before:load', (win) => {
      win.LSF_CONFIG = {
        interfaces: [
          'panel',
          'update',
          'submit',
          'skip',
          'controls',
          'infobar',
          'topbar',
          'instruction',
          'side-column',
          'ground-truth',
          'annotations:tabs',
          'annotations:menu',
          'annotations:current',
          'annotations:add-new',
          'annotations:delete',
          'annotations:view-all',
          'predictions:tabs',
          'predictions:menu',
          'auto-annotation',
          'edit-history',
        ],
        ...params,
      };
    });

    cy
      .visit('/')
      .then(win => {
        cy.log(`Default feature flags set ${JSON.stringify(win.APP_SETTINGS.feature_flags, null, '  ')}`)
      });

    cy
      .window()
      .then(win => expect(win.LabelStudio.instances.size).to.be.equal(1));
  },

  /**
   * Exports current result from LabelStudio's selected annotationStore
   */
  serialize() {
    return cy
      .window()
      .then(win => {
        return win.Htx.annotationStore.selected.serializeAnnotation();
      });
  },


  /**
   * Set feature flags on navigation
   */
  setFeatureFlagsOnPageLoad(flags: Record<string, boolean>) {
    Cypress
      .on('window:before:load', win => {
        win.__FEATURE_FLAGS__ = flags
      });
  },

  /**
   * Toggle feature flags on and off
   */
  setFeatureFlags(flags: Record<string, boolean>) {
    cy.log("Setting feature flags")
    cy
      .window()
      .then(win => {
        win.APP_SETTINGS = win.APP_SETTINGS ?? {};
        win.APP_SETTINGS.feature_flags = {
          ...(win.APP_SETTINGS.feature_flags ?? {}),
          ...flags,
        }
        console.log(win.APP_SETTINGS)
      });
  },

  /**
   * Assers if the feature flag's state matches a given state
   * Checks for enabled flags by default
   */
  shouldHaveFeatureFlag(flagName: string, enabled = true) {
    return this
      .getFeatureFlag(flagName)
      .then(flagValue => {
        expect(flagValue).to.be.eq(enabled);
      });
  },

  /**
   * Returns a value of a specific feature flag
   */
  getFeatureFlag(flagName: string) {
    return cy
      .window()
      .then(win => {
        const featureFlags = (win.APP_SETTINGS?.feature_flags ?? {}) as Record<string, boolean>;

        const flagValue = (flagName in featureFlags)
          ? featureFlags[flagName]
          : window.APP_SETTINGS?.feature_flags_default_value === true;

        return flagValue;
      });
  },
};
