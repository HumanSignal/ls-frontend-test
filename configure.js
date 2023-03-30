import { defineConfig } from 'cypress';
import path from 'path';
import wp from '@cypress/webpack-preprocessor';

const LSF_PORT = process.env.LSF_PORT ?? '3000';
const localPath = p => path.resolve(process.env.PWD, p);

/**
* @param {(config: Cypress.ConfigOptions<any>) => Cypress.ConfigOptions<any>} config
*/
export default function(configModifier) {
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
        const options = {
          webpackOptions: {
            resolve: {
              extensions: ['.ts', '.tsx', '.js'],
            },
            module: {
              rules: [
                {
                  test: /\.tsx?$/,
                  loader: 'ts-loader',
                  options: { transpileOnly: true },
                },
              ],
            },
          },
        };

        on('file:preprocessor', wp(options));
      },
    },
  }; 
  
  const finalConfig = configModifier
    ? configModifier(defaultConfig)
    : defaultConfig; 

  return defineConfig(finalConfig);
} 
