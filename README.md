# biome-rspack-plugin

biome-rspack-plugin is a Rspack plugin to do check the format and linting error during dev serve.

<p>
  <a href="https://npmjs.com/package/biome-rspack-plugin">
   <img src="https://img.shields.io/npm/v/biome-rspack-plugin?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/biome-rspack-plugin?minimal=true"><img src="https://img.shields.io/npm/dm/rspack-plugin.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>

## Usage

Install:

```bash
npm add @biomejs/biome biome-rspack-plugin -D
```

Add plugin to your `rspack.config.ts`:

```ts
// rspack.config.ts
import { BiomeRspackPlugin } from "biome-rspack-plugin";

export default {
  plugins: [new BiomeRspackPlugin()],
};
```

## Options

TODO: Need to add the biome cli options

```js
BiomeRspackPlugin({});
```

## License

[MIT](./LICENSE).
