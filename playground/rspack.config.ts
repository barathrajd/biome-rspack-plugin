import { defineConfig } from '@rspack/cli';
import { BiomeRspackPlugin } from '../src';

export default defineConfig({
  plugins: [new BiomeRspackPlugin()],
});
