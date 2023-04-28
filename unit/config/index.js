import jestConfig from './jest.config';

export function configure(configModifier) {
  const mergedConfig = configModifier ? configModifier(jestConfig) : jestConfig;

  return mergedConfig;
}

