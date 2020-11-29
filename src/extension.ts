// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { basename } from "path";
import {
  ExtensionContext,
  TextEdit,
  TextEditorEdit,
  TextDocument,
  Position,
  Range,
} from "vscode";

// get the current username from vscode or ENV file if didn't find any name will type my name by default
const getUserCurrent = () => vscode.workspace.getConfiguration().get('Youcode.username') || process.env['USER'] || 'Abdessamad';


// get current user email from vscode
const getUserCurrentEmail = () => vscode.workspace.getConfiguration().get('Youcode.email') || `${getUserCurrent()}@student.youcode.ma`;

 
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "youcode-header" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
	
  let disposable = vscode.commands.registerTextEditorCommand(
    "youcode-header.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage(`${getUserCurrent()}@student.youcode.ma`);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
