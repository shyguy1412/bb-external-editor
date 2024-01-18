# bb-external-editor

This is a template for using any external editor for Bitburner. This Template supports JS, JSX, TS and TSX out of the box.

## How to get started

1. If you dont already have it installed, install [NodeJS](https://nodejs.org) v20 or newer
1. Clone this repository
1. navigate to the template (`cd path/to/the/template`) inside your console
1. run `npm install` in your console to install all dependencies
1. run `npm start` in your console to start the RemoteAPI server
1. open Bitburner and navigate to the settings
1. open the tab labeled 'Remote API' and enter the port '12525'
1. press connect

Now any changes made to scripts inside the server folders will automatically be uploaded to Bitburner.

For more in-depth details and a full list of options have a look at the [plugin](https://github.com/shyguy1412/esbuild-bitburner-plugin) powering this template!

## Features

### esbuild

This template uses [esbuild](https://esbuild.github.io/) to bundle your scripts.

### Using React

This template allows you to use the ingame instances of `React` and `ReactDOM` simply by importing them as ESModule as you usually would.

```jsx
import React, {useState} from 'react';

export function MyComponent(){
  const [count, setCount] = useState(0);

  return <div>Count {count} <button onClick={() => setCount(count + 1)}>Add to count</button></div>;
}

```

### Developing on multiple servers

Simply create a new folder with the name of the server you want to develop on in the 'servers' directory to start developing on that server!

### Bidirectional Mirroring

You can enable mirroring like this  

```js
const createContext = async () => await context({
  entryPoints: [
    'servers/**/*.js',
    'servers/**/*.jsx',
    'servers/**/*.ts',
    'servers/**/*.tsx',
  ],
  outbase: "./servers",
  outdir: "./build",
  plugins: [BitburnerPlugin({
    port: 12525,
    types: 'NetscriptDefinitions.d.ts',
    mirror: {
      'local/path': ['home', 'and/or other servers']
    }
  })],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  logLevel: 'info'
});

let ctx = await createContext();
ctx.watch();
```

This will mirror all listed servers for a path to a specified location.
While mirroring, all changes in the game will be synced with your editor and vice versa.

### Automatic Distribution

You can specify folders with a list of servers to automatically distribute your files to these servers like this:

```js
const createContext = async () => await context({
  entryPoints: [
    'servers/**/*.js',
    'servers/**/*.jsx',
    'servers/**/*.ts',
    'servers/**/*.tsx',
  ],
  outbase: "./servers",
  outdir: "./build",
  plugins: [BitburnerPlugin({
    port: 12525,
    types: 'NetscriptDefinitions.d.ts',
    distribute: {
      'build/home/dist': ['server-1', 'server-2', 'server-3']
    }
  })],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  logLevel: 'info'
});

let ctx = await createContext();
ctx.watch();

```

In this example all files that are developed in 'servers/home/dist' will not only be uploaded to 'home' but also 'server-1', 'server-2' and 'server-3'.

### Plugin Extensions

You can provide plugin extensions with hooks that trigger before and after certain events. Within hooks that gurantee that the plugin is connected to the game, you also get full access to the remote file API. Using extensions would look something like this:

```js
import { context } from 'esbuild';
import { BitburnerPlugin } from 'esbuild-bitburner-plugin';

/** @type import('esbuild-bitburner-plugin').PluginExtension*/
const customExtension = {
  setup() { console.log('setup'); }, //Run once on plugin startup

  beforeConnect() { console.log('beforeConnect'); }, //Run once before the game connects
  afterConnect(remoteAPI) { console.log('afterConnect'); }, //Run every time after the game (re)connects

  beforeBuild() { console.log('beforeBuild'); }, //Run before every build process
  afterBuild(remoteAPI) { console.log('afterBuild'); }, //Run after build results have been uploaded into the game
};

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
      extensions: [customExtension]
    })
  ],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  logLevel: 'info'
});

let ctx = await createContext();
ctx.watch();

```
