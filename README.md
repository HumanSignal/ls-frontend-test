This is pre-configured Cypress testing environment packed with helpers for each UI element that exists in Label Studio

# Install

If you want to install it to a new repo, run the following

```
mkdir __test__
cd __test__
yarn init --yes
yarn add @heartexlabs/ls-test@https://github.com/heartexlabs/ls-frontend-test.git
yarn run lstest init
```

It will init a new module package and will install everything you need.

After that just `yarn test` for console-based testing or `yarn test:ui` from Cypress UI

# Using helpers
In you spec file:

```javascript
// For LSF Specific helpers
import { LabelStudio } from '@heartexlabs/ls-test/helpers/LSF';

// Or for all available helpers
import { LSF } from '@heartexlabs/ls-test/helpers';

// Usage
describe('Test', () => {
  it("Should pass", () => {
    LSF.LabelStudio.init({
      config: '<View></View>',
      task: { annotations: [], predictions: [] }
    });
  });
});
```
