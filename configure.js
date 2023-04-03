import { defineConfig } from 'cypress';
import path from 'path';
import { setupTypescript } from './plugins/typescript';

const LSF_PORT = process.env.LSF_PORT ?? '3000';
const localPath = p => path.resolve(process.env.PWD, p);

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
    e2e: {
      baseUrl: `http://localhost:${ LSF_PORT }`,
      specPattern: './specs/**/*.cy.ts',
      viewportWidth: 1600,
      viewportHeight: 900,
      // output config
      setupNodeEvents(on, config) {
        setupTypescript(on, config);
        setupNodeEvents?.(on, config);
      },
    },
  }; 
  
  const finalConfig = configModifier
    ? configModifier(defaultConfig)
    : defaultConfig; 

  return defineConfig(finalConfig);
} 
