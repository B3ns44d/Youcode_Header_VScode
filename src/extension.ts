// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { basename } from "path";
import moment = require("moment");
import {
  ExtensionContext,
  TextEdit,
  TextEditorEdit,
  TextDocument,
  Position,
  Range,
} from "vscode";
import {
  YoucodeHeaderInfo,
  configHeader,
  gettingHeader,
  languagesSupported,
  gettingHeaderInfo,
} from "./youcode/header";
import { youcodeLanguage } from "./youcode/lang/youcodeLang";

// get the current username from vscode or ENV file if didn't find any name will type my name by default
const getUserCurrent = () =>
  vscode.workspace.getConfiguration().get("Youcode.username") ||
  process.env["USER"] ||
  "Abdessamad";

// get current user email from vscode
const getUserCurrentEmail = () =>
  vscode.workspace.getConfiguration().get("Youcode.email") ||
  `${getUserCurrent()}@student.youcode.ma`;

// Update HeaderInfo with the latest update author and date, and update the file name

const newHeaderInfo = (
  document: TextDocument,
  headerInfo?: YoucodeHeaderInfo
) => {
  const user = getUserCurrent();
  const mail = getUserCurrentEmail();
  return Object.assign(
    {},
    // This will be overwritten if headerInfo is not null
    {
      createdAt: moment(),
      createdBy: user,
    },
    headerInfo,
    {
      filename: basename(document.fileName),
      author: `${user} <${mail}>`,
      updatedBy: user,
      updatedAt: moment(),
    }
  );
};
// done here

// COnfig the insert Header ...
const insertYoucodeHeader = () => {
  const { activeTextEditor } = vscode.window;
  const { document } = activeTextEditor;
  if (languagesSupported(document.languageId)) {
    activeTextEditor.edit((editor) => {
      const currentHeader = gettingHeader(document.getText());

      if (currentHeader) {
        editor.replace(
          new Range(0, 0, 12, 0),
          configHeader(
            document.languageId,
            newHeaderInfo(document, gettingHeaderInfo(currentHeader))
          )
        );
      } else {
        editor.insert(
          new Position(0, 0),
          configHeader(document.languageId, newHeaderInfo(document))
        );
      }
    });
  } else {
    vscode.window.showInformationMessage(
      `I don't thin we use this language ${document.languageId} in our school`
    );
  }
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {
// Use the console to output diagnostic information (console.log) and errors (console.error)
// This line of code will only be executed once when your extension is activated
//   console.log(
//     'Congratulations, your extension "youcode-header" is now active!'
//   );

// The command has been defined in the package.json file
// Now provide the implementation of the command with registerCommand
// The commandId parameter must match the command field in package.json

//   let disposable = vscode.commands.registerTextEditorCommand(
//     "youcode-header.helloWorld",
//     () => {
// The code you place here will be executed every time your command is executed

// Display a message box to the user
//       vscode.window.showInformationMessage(
//         `${getUserCurrent()}@student.youcode.ma`
//       );
//     }
//   );

//   context.subscriptions.push(disposable);
// }

// this method is called when your extension is deactivated
// export function deactivate() {}

const startUpdateOnSaveWatcher = (subscriptions: vscode.Disposable[]) =>
  vscode.workspace.onWillSaveTextDocument(
    (event) => {
      const document = event.document;
      const currentHeader = gettingHeader(document.getText());

      event.waitUntil(
        Promise.resolve(
          languagesSupported(document.languageId) && currentHeader
            ? [
                TextEdit.replace(
                  new Range(0, 0, 12, 0),
                  configHeader(
                    document.languageId,
                    newHeaderInfo(document, gettingHeaderInfo(currentHeader))
                  )
                ),
              ]
            : [] // in case theirs no text to apply
        )
      );
    },
    null,
    subscriptions
  );

export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands
    .registerTextEditorCommand('youcodeheader.insertHeader', insertYoucodeHeader);

  context.subscriptions.push(disposable);
  startUpdateOnSaveWatcher(context.subscriptions);
};