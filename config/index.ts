import { config as devConfig } from './env.dev';
import { config as testConfig } from './env.test';
import { config as uatConfig } from './env.uat';
import { config as betaConfig } from './env.beta';
import { config as prodConfig } from './env.prod';

const env = import.meta.env.MODE as
  | 'development'
  | 'test'
  | 'uat'
  | 'beta'
  | 'production';

const configs = {
  development: devConfig,
  test: testConfig,
  uat: uatConfig,
  beta: betaConfig,
  production: prodConfig,
};

export const config = configs[env] || devConfig;
