import { context } from 'esbuild';
import { glob } from 'glob';
import { BitburnerPlugin } from 'esbuild-bitburner-plugin';

const createContext = async () => await context({
  entryPoints: await glob('./servers/**/*.{js,jsx,ts,tsx}'),
  outbase: "./servers",
  outdir: "./dist",
  plugins: [BitburnerPlugin({
    port: 12525,
    types: 'NetscriptDefinitions.d.ts'
  })],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  logLevel: 'info'
});

let ctx = await createContext();
ctx.watch();
