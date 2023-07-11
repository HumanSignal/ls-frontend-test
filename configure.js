import { defineConfig } from "cypress";
import path from "path";
import lockfile from "proper-lockfile";
import { setupTypescript } from "./plugins/typescript";
import installLogsPrinter from "cypress-terminal-report/src/installLogsPrinter";
import * as customTasks from "./tasks";
import { disableChromeGPU } from "./plugins/disable_gpu";
import cypressCoverageTask from "@cypress/code-coverage/task";
import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin";

const LSF_PORT = process.env.LSF_PORT ?? "3000";
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
    trashAssetsBeforeRuns: false, // Kills ability to run in parallel, must be off
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
        on('before:browser:launch', (browser = null, launchOptions) => {
          if (browser.name === 'chrome') {
            // Force sRGB color profile to prevent color mismatch in CI vs local runs
            launchOptions.args.push('--force-color-profile=srgb');
            return launchOptions;
          }
        });

        addMatchImageSnapshotPlugin(on, config);

        // Allows collecting coverage
        cypressCoverageTask((_, tasks) => {
          // Have to lock the files to prevent errors from occurring when running in parallel
          // @source https://github.com/tnicola/cypress-parallel/issues/126#issuecomment-1258377888
          const parallelTasks = {
            ...tasks,
            ...customTasks,
            combineCoverage: async (sentCoverage) => {
              const release = await lockfile.lock('/tmp/cypressCombineCoverage.lock', {
                realpath: false, // allows following symlinks and creating the file
                retries: {
                  retries: 10,
                  factor: 2,
                  minTimeout: 100,
                  maxTimeout: 1000,
                  randomize: true,
                },
              });
              const ret = await tasks.combineCoverage(sentCoverage);
              await release();
              return ret;
            },
            coverageReport: async () => {
              const release = await lockfile.lock('/tmp/cypressCoverageReport.lock', {
                realpath: false, // allows following symlinks and creating the file
                retries: {
                  retries: 10,
                  factor: 2,
                  minTimeout: 100,
                  maxTimeout: 1000,
                  randomize: true,
                },
              });
              const ret = await tasks.coverageReport();
              await release();
              return ret;
            },
          };
          on('task', parallelTasks);
        }, config)

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
