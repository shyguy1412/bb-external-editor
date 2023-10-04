import { context } from 'esbuild';
import { glob } from 'glob';
import {BitburnerPlugin} from 'esbuild-bitburner-plugin';

const WATCH = process.argv.includes('--watch');

const ctx = await context({
  entryPoints: await glob('./servers/**/*.{js,jsx,ts,tsx}'),
  bundle: true,
  plugins: [BitburnerPlugin()],
  write: false,
  outbase: "./servers",
  minify: !WATCH,
  format: 'esm',
  platform: 'node',
  define: WATCH ? undefined : {
    'process.env.NODE_ENV': "'production'",
  },
  logLevel: 'info'
});

await ctx.rebuild();

if (WATCH) ctx.watch();
else ctx.dispose();
