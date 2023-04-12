import { defineConfig } from 'cypress';
import path from 'path';
import { setupTypescript } from './plugins/typescript';
import installLogsPrinter from "cypress-terminal-report/src/installLogsPrinter";
import * as tasks from './tasks';
import { disableChromeGPU } from './plugins/disable_gpu';
import cypressCoverageTask from '@cypress/code-coverage/task';

const LSF_PORT = process.env.LSF_PORT ?? '3000';
const COLLECT_COVERAGE = process.env.COLLECT_COVERAGE === 'true' || process.env.COLLECT_COVERAGE === '1';
const localPath = p => path.resolve(process.cwd(), p);

/**
* Override Cypress settings
* @param {(config: Cypress.ConfigOptions) => Cypress.ConfigOptions} configModifier
* @param {Cypress.EndToEndConfigOptions["setupNodeEvents"]?} setupNodeEvents
*/
export default function(configModifier, setupNodeEvents) {
  /** @type {Cypress.ConfigOptions<any>} */
  const defaultConfig = {
    // Assets configuration 
    supportFolder: localPath('./cypress/support/'),
    videosFolder: localPath('./output/video'),
    screenshotsFolder: localPath('./output/screenshots'),
    downloadsFolder: localPath('./output/downloads'),
    fixturesFolder: localPath('./fixtures'),
    trashAssetsBeforeRuns: true,
    videoUploadOnPasses: false,
    env: {
      coverage: COLLECT_COVERAGE,
    },
    e2e: {
      baseUrl: `http://localhost:${LSF_PORT}`,
      specPattern: './specs/**/*.cy.ts',
      viewportWidth: 1600,
      viewportHeight: 900,
      // output config
      setupNodeEvents(on, config) {
        // Allows collecting coverage
        cypressCoverageTask(on, config);
        on('task', { ...tasks });
        // Gives a step-by-step output for failed tests in headless mode
        installLogsPrinter(on, {
          outputVerbose: false
        });
        // Allows compiling TS files from node_modules (this package)
        setupTypescript(on, config);
        setupNodeEvents?.(on, config);
        // When running in headless on the CI, there's no GPU acceleration available
        disableChromeGPU(on);
        return config;
      },
    },
  };

  const finalConfig = configModifier
    ? configModifier(defaultConfig)
    : defaultConfig;

  return defineConfig(finalConfig);
} 
