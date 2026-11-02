# rosi-vscode README

VLC Language Support for Rosi

## Features

- Syntax Highlighting for the Rosi language


## Future Features (Pending Development Funding)

We are seeking funding to develop the following additional features. If you are interested in funding this project, please place cash in a letter-sized manila envelope and duct tape it to the door of room 1, Jessup Hall, The University of Iowa.

- Semantic Highlighting
- Language Server Protocol (LSP) Support

## Publishing the Extension

Follow the instructions [here](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token) to create a Personal Access Token

To set the PAT or overwrite the old one, run

```shell
npx vsce login clc-iowa
```

```shell
npm run publish-ext
```

## Requirements

- See `package.json` for minimum required VSCode version.

### Optional

- `Unicode Latex` extension to allow insertion of Unicode symbols.
  -- add `"rosi"` to the `"unicode-latex.extensions"` array in settings.
    ```json
    "unicode-latex.extensions": ["plaintext", "markdown", "coq", "rosi"]
    ```


## Release Notes

### 0.3.0

Migrate extension to TypeScript, based on `yeoman` template.
