# bb-external-editor

This is a template for using any external editor for Bitburner. This Template supports JSX, TS and TSX out of the box.

## How to use

1. If you dont already have it installed, install [NodeJS](https://nodejs.org)
1. Clone this repository
1. navigate to the template (`cd path/to/the/template`) inside your console
1. run `npm install` in your console to install all dependencies
1. run `npm start` in your console to start the RemoteAPI server
1. open Bitburner and navigate to the settings
1. open the tab labeled 'Remote API' and enter the port '12525'
1. press connect

Now any changes made to scripts inside the server folders will automatically be uploaded to Bitburner.

## Using React

The React and ReactDOM instance from the game can simply be imported as ESModules

```js
import React from 'react' //and
import ReactDOM from 'react-dom'
```

For more in-depth details have a look at the [plugin](https://github.com/NilsRamstoeck/esbuild-bitburner-plugin) powering this template!
