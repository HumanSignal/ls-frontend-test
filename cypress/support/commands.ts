const Screenshots = new Map<string, string>();

const getName = (suffix: string) => {
  const spec = Cypress.spec.name;
  return `${spec.replace(/.([jt]s)/, '')}-${suffix}`.toLowerCase();
}
Cypress.Commands.add('captureScreenshot', {
  prevSubject: ['element'],
}, (subject, name) => {
  const log = Cypress.log({
    $el: subject,
    name: "captureScreenshot",
    displayName: "captureScreenshot",
    type: "parent",
    autoEnd: false,
  });

  const screenshotName = getName(name);

  if (Screenshots.has(screenshotName)) {
    throw new Error('Screenshot already taken. Did you forget to call `compareScreenshot`?');
  }

  const obj = cy.wrap(subject, { log: false });

  obj.scrollIntoView({ log: false });
  obj.screenshot(screenshotName + '-orig', {
    onAfterScreenshot(_el, screenshot) {
      Screenshots.set(screenshotName, screenshot.path);
    },
    log: false
  });

  log.end();
  return obj;
});

Cypress.Commands.add('compareScreenshot', {
  prevSubject: ['element'],
}, (subject, name, compare, treshold = 0.1) => {
  const screenshotName = getName(name);
  const log = Cypress.log({
    $el: subject,
    name: "compareScreenshot",
    message: "Comparing screenshots",
    autoEnd: false,
  });

  if (!Screenshots.has(screenshotName)) {
    throw new Error('Screenshot not found. Did you forget to capture it?');
  }

  const obj = cy.wrap(subject.get(0), { log: false });
  const options = {
    initialScreenshot: '',
    currentScreenshot: '',
    treshold,
    compare,
  };

  obj.scrollIntoView({ log: false });
  obj.screenshot(screenshotName + '-comp', {
    onAfterScreenshot(_el, currentScreenshot) {
      options.initialScreenshot = Screenshots.get(screenshotName);
      options.currentScreenshot = currentScreenshot.path;
    },
    log: false,
  });

  cy
    .task('compareScreenshots', options, { log: false })
    .then((result) => {
      if (!result) {
        const error = new Error("Change");
        log.error(error);
        throw error;
      }
        Screenshots.delete(screenshotName);
    });

  log.end();
  return obj;
});
