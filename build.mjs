import { context } from 'esbuild';
import { glob } from 'glob';
import {BitburnerPlugin} from 'esbuild-bitburner-plugin';


const ctx = await context({
  entryPoints: await glob('./servers/**/*.{js,jsx,ts,tsx}'),
  outbase: "./servers",
  outdir: "./dist",
  plugins: [BitburnerPlugin({
    port: 12525
  })],
  bundle: true,
  format: 'esm',
  platform: 'browser',
});

ctx.watch();
