import { CURRENT_FLAGS } from '../../feature-flags';

before(() => {
  cy.window().then(win => {
    Object.assign(win, {
      APP_SETTINGS: {
        ...(win.APP_SETTINGS ?? {}),
        feature_flags: CURRENT_FLAGS,
      },
    });
    cy.log('Default Feature Flags set');
    cy.log(JSON.stringify(win.APP_SETTINGS.feature_flags, null, '  '));
  });
});
