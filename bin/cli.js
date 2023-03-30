#!/usr/bin/env node

import cypress from 'cypress';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import childProcess from 'child_process';
import { stdout } from 'process';

const defaultSettings = {
  browser: 'chrome',
};

const runner = (options, run = false) => {
  const runnerConfig = { ...defaultSettings, ...options }; 

  if (run) {
    cypress.run(runnerConfig);
  } else {
    cypress.open(runnerConfig);
  }
};

const getSettings = (args) => {
  const { help, _, ...rest } = args;

  if (help) {
    stdout.write(childProcess.execSync('yarn run cypress run --help'));
    process.exit(0);
  }

  if (_?.[1]) {
    const specFile = _[1].toString();

    if (specFile.includes('.cy')) rest.spec = specFile;
  }

  return rest;
};

yargs(hideBin(process.argv))
  .command('run', 'run', () => {}, (args) => {
    const settings = getSettings(args);

    runner(settings, true);
  })
  .command('open', 'Open UI', () => {}, (args) => {
    const settings = getSettings(args);

    runner(settings, false);
  })
  .help(false)
  .parse();

