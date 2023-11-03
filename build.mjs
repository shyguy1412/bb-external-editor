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
  outdir: "./dist",
  plugins: [
    BitburnerPlugin({
      port: 12525,
      types: 'NetscriptDefinitions.d.ts',
      // mirror: { //uncomment to enable file mirroring
      //   'mirror/own': ['home'],
      //   'mirror/other': ['n00dles']
      // }
    })
  ],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  logLevel: 'info'
});

let ctx = await createContext();
ctx.watch();
