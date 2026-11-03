# rosi-vscode README

VLC Language Support for Rosi

## Features

- Syntax Highlighting for the Rosi language
- Unicode symbol insertion supported via [Unicode Latex](https://marketplace.visualstudio.com/items?itemName=oijaz.unicode-latex) extension


## Future Features (Pending Development Funding)

We are seeking funding to develop the following additional features. If you are interested in funding this project, please place cash in a letter-sized manila envelope and duct tape it to the door of room 1, Jessup Hall, The University of Iowa.

- Semantic Highlighting
- Language Server Protocol (LSP) Support

## Enabling Unicode Support

To allow the user to insert Unicode symbols by typing latex identifiers (e.g. to replace `\Pi` with `Π`), follow these steps:

  1. Install the [Unicode Latex](https://marketplace.visualstudio.com/items?itemName=oijaz.unicode-latex) extension. (id = `unicode-latex`)
  2. Run the command `Rosi: Enable Unicode Support` to enable the extension in Rosi files.
  
  *Note: The command adds `"rosi"` to the array `"unicode-latex.extensions"` in your user settings. If you only want to add it for a single workspace, edit the settings for that workspace manually.*

## Publishing the Extension

Follow the instructions [here](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token) to create a Personal Access Token

To set the PAT or overwrite the old one, run

```shell
npx vsce login clc-iowa
```

```shell
npm run publish-ext
```


## Release Notes

### 0.3.0

- Migrate extension to TypeScript, based on `yeoman` template.
- Prompt user to install [Unicode Latex](https://marketplace.visualstudio.com/items?itemName=oijaz.unicode-latex) or to enable unicode input, if already installed.

