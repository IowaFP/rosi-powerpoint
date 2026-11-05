// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

const UNICODE_LATEX_EXTENSION_ID = "oijaz.unicode-latex";
const INSTALL_UNICODE_MESSAGE =
  'Install extension "oijaz.unicode-latex" for Unicode support.';

const isUnicodeLatexInstalled = (): boolean => {
  return !!vscode.extensions.getExtension(UNICODE_LATEX_EXTENSION_ID);
}

type NotificationItem = vscode.MessageItem &
  (
    | { type: "EnableUnicode"; target: vscode.ConfigurationTarget }
    | { type: "SuppressNotification" }
    | { type: "GetExtension" }
  );

const handleChoice = (choice?: NotificationItem): Thenable<void> => {
  switch (choice?.type) {
    case "GetExtension": {
      return getExtension();
    }
    case "SuppressNotification": {
      return suppressNotification();
    }
    case "EnableUnicode": {
      return enableUnicodeInput(choice.target);
    }
    default: {
      return Promise.resolve();
    }
  }
};

const GetExtension: NotificationItem = {
  title: "Get Unicode Latex extension",
  type: "GetExtension",
};
const getExtension = (): Thenable<void> =>
  vscode.commands.executeCommand("extension.open", UNICODE_LATEX_EXTENSION_ID);

const SuppressNotification: NotificationItem = {
  title: "Don't show again",
  type: "SuppressNotification",
};
const suppressNotification = (): Thenable<void> =>
  vscode.workspace
    .getConfiguration("rosi")
    .update("promptToEnableUnicodeLatex", false, vscode.ConfigurationTarget.Global);

const EnableUnicodeUser: NotificationItem = {
  title: "User",
  target: vscode.ConfigurationTarget.Global,
  type: "EnableUnicode",
};
const EnableUnicodeWorkspace: NotificationItem = {
  title: "Workspace",
  target: vscode.ConfigurationTarget.Workspace,
  type: "EnableUnicode",
};
const enableUnicodeInput = (
  target: vscode.ConfigurationTarget,
): Thenable<void> => {
  // This case should only ever be reached if the user runs the command directly,
  // so we use a modal to make sure they see the error.
  if (!isUnicodeLatexInstalled()) {
    return vscode.window
      .showErrorMessage(
        INSTALL_UNICODE_MESSAGE,
        {
          modal: true,
        },
        GetExtension,
      )
      .then(handleChoice);
  } else {
    const unicodeConfig = vscode.workspace.getConfiguration("unicode-latex");
    const extensions = unicodeConfig.get("extensions") as String[];
    // extensions.update()
    if (!extensions.includes("rosi")) {
      extensions.push("rosi");
    }
    return unicodeConfig
      .update("extensions", extensions, target)
      .then(
        (_) =>
          void vscode.window
            .showInformationMessage("Unicode input enabled!")
            .then(() => {}),
      );
  }
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const rosiConfig = vscode.workspace.getConfiguration("rosi");
  if (
    rosiConfig.get("promptToEnableUnicodeLatex")) {
    void promptToEnableUnicodeLatex().then(handleChoice);
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

const promptToEnableUnicodeLatex = (): Thenable<NotificationItem | undefined> => {
  if (!vscode.extensions.getExtension("oijaz.unicode-latex")) {
    return vscode.window
      .showInformationMessage<NotificationItem>(
        INSTALL_UNICODE_MESSAGE,
        GetExtension,
        SuppressNotification,
      )
  } else if (!vscode.workspace.getConfiguration("unicode-latex").get<String[]>("extensions")?.includes('rosi')) {
    return vscode.window
      .showInformationMessage<NotificationItem>(
        "Enable Unicode Input?",
        EnableUnicodeUser,
        EnableUnicodeWorkspace,
        SuppressNotification,
      )
  } else {
    return Promise.resolve(undefined);
  }
};

// This method is called when your extension is deactivated
export function deactivate() {}
