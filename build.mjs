import { context } from 'esbuild';
import { BitburnerPlugin } from 'esbuild-bitburner-plugin';

const createContext = async () => await context({
  entryPoints: [
    'servers/**/*.js',
    'servers/**/*.jsx',
    'servers/**/*.ts',
    'servers/**/*.tsx',
  ],
  outbase: "./servers",
  outdir: "./build",
  plugins: [
    BitburnerPlugin({
      port: 12525,
      types: 'NetscriptDefinitions.d.ts',
      mirror: {
      },
      distribute: {
      }
    })
  ],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  logLevel: 'debug'
});

const ctx = await createContext();
ctx.watch();
