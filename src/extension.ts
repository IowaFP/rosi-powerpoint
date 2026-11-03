// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

const ROSI = "rosi";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  if (!vscode.extensions.getExtension("oijaz.unicode-latex")) {
    vscode.window.showInformationMessage(installUnicodeExtensionMessage);
  } else if (
    !(
      vscode.workspace.getConfiguration("unicode-latex").get("extensions") as
        String[] | undefined
    )?.includes(ROSI)
  ) {
    promptForUnicode();
  }

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerCommand("rosi-vscode.enableUnicodeInputUser", () =>
      enableUnicodeInput(vscode.ConfigurationTarget.Global),
    ),
    vscode.commands.registerCommand(
      "rosi-vscode.enableUnicodeInputWorkspace",
      () => enableUnicodeInput(vscode.ConfigurationTarget.Workspace),
    ),
  );
}

const enableUnicodeInput = (target: vscode.ConfigurationTarget) => {
  if (!vscode.extensions.getExtension("oijaz.unicode-latex")) {
    vscode.window.showErrorMessage(installUnicodeExtensionMessage, {
      modal: true,
    });
  } else {
    const unicodeConfig = vscode.workspace.getConfiguration("unicode-latex");
    const extensions = unicodeConfig.get("extensions") as String[];
    // extensions.update()
    if (!extensions.includes("rosi")) {
      extensions.push("rosi");
    }
    unicodeConfig.update("extensions", extensions, target).then((_) => {
      vscode.window.showInformationMessage("Unicode input enabled!");
    });
  }
};

const installUnicodeExtensionMessage =
  "Install extension \"oijaz.unicode-latex\" for Unicode support.";

const promptForUnicode = () => {
  if (!vscode.extensions.getExtension("oijaz.unicode-latex")) {
    vscode.window.showErrorMessage(installUnicodeExtensionMessage, {
      modal: true,
    });
  } else {
    vscode.window
      .showInformationMessage(
        "Enable Unicode Input?",
        {
          title: "Enable Unicode (User)",
          target: vscode.ConfigurationTarget.Global,
        },
        {
          title: "Enable Unicode (Workspace)",
          target: vscode.ConfigurationTarget.Workspace,
        },
      )
      .then((choice) => {
        if (choice) {
          enableUnicodeInput(choice.target);
        }
      });
  }
};

// This method is called when your extension is deactivated
export function deactivate() {}
