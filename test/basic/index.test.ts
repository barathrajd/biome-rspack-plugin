import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from '@playwright/test';
import { rspack } from '@rspack/core';
import { BiomeRspackPlugin } from '../../src';
import { getRandomPort } from '../helper';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('should render page as expected', async () => {
  rspack([
    {
      context: __dirname,
      plugins: [new BiomeRspackPlugin()],
      devServer: {
        port: getRandomPort(),
      },
    },
  ]);
});
