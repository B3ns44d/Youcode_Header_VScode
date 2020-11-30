// node.js
import moment = require("moment");
import { languages } from "vscode";
import { youcodeLanguage } from "./lang/youcodeLang";
// Or in ES6 syntax:
// import moment from 'moment';

export type YoucodeHeaderInfo = {
  filename: string;
  author: string;
  createdBy: string;
  createdAt: moment.Moment;
  updatedBy: string;
  updatedAt: moment.Moment;
};

const mainTemplate = `
********************************************************************************
*                                                                              *
*                                                          :::   :::  :::::::: *
*                                                         :+:   :+: :+:    :+: *
*    $FILENAME__________________________________         +:+ +:+  +:+          *
*                                                        +#++:   +#+           *
*    By: $AUTHOR________________________________         +#+   +#+             *
*                                                      #+#    #+#    #+#       *
*    Created: $CREATEDAT_________ by $CREATEDBY_      ###     ########.ma      *
*    Updated: $UPDATEDAT_________ by $UPDATEDBY_                               *
*                                                                              *
********************************************************************************`.substring(1);

const template = (languageId: string) => {
  const [left, right] = youcodeLanguage[languageId];
  const width = left.length;

  return mainTemplate.replace(
    new RegExp(`^(.{${width}})(.*)(.{${width}})$`, "gm"),
    left + "$2" + right
  );
};

// fitting value to the correct filed width in template
const fitValuePad = (value: string, width: number) => value.concat(" ".repeat(width)).substr(0, width);


// correct format data for the header temple 
const dataFormat = (data: moment.Moment) => data.format("YYYY/MM/DD HH:mm:ss");

// prase data to object from data string 

const dataParse = (data: string) => moment(data, 'YYYY/MM/DD HH:mm:ss');

// start the real code here

// check if the user use an supported language for his code (the language that we use in YouCode School)

export const languagesSupported = (languageId: string) => languageId in youcodeLanguage;

// Returns the current header text to the top of the document

export const gettingHeader = (text: string): string | null => {
    const headerNormal = `^(.{80}\n{10})`;
    const headerMatch = text.match(headerNormal);
    return headerMatch ? headerMatch[0] : null;
};

// this will return The [global match, offset, filed]
const regexpMatch = (name: string) => new RegExp(`^((?:.*\\\n)*.*)(\\\$${name}_*)`, '');



// getting the value from the given header filed name

const gettingFiledValue = (header: string, name: string) => { 
    const [_, offset, filed] = mainTemplate.match(regexpMatch(name));
    return header.substr(offset.length, filed.length);
};
// setting the filed values in header

const settingFiledValue = (header: string, name: string, value: string) => {
    const [_, offset, field] = mainTemplate.match(regexpMatch(name));

    return header.substr(0, offset.length)
    .concat(fitValuePad(value, field.length))
    .concat(header.substr(offset.length + field.length));
};

// SETUP THE HEADER INFO FROM THE HEADER 

export const gettingHeaderInfo = (header: string): YoucodeHeaderInfo => ({
    filename: gettingFiledValue(header, 'FILENAME'),
    author: gettingFiledValue(header, 'AUTHOR'),
    createdBy: gettingFiledValue(header, 'CREATED_BY'),
    createdAt: dataParse(gettingFiledValue(header, 'CREATED_DATA')),
    updatedBy: gettingFiledValue(header, 'UPDATED_BY'),
    updatedAt: dataParse(gettingFiledValue(header, 'UPDATED_DATA'))
  });

//   CONFIG LANGUAGE TEMP With THE HEADER INFO

export const configHeader = (languageId: string, info: YoucodeHeaderInfo) => [
    { name: 'FILENAME', value: info.filename },
    { name: 'AUTHOR', value: info.author },
    { name: 'CREATED_DATA', value: dataFormat(info.createdAt) },
    { name: 'CREATED_BY', value: info.createdBy },
    { name: 'UPDATED_DATA', value: dataFormat(info.updatedAt) },
    { name: 'UPDATED_BY', value: info.updatedBy }].reduce((header, field) =>
    settingFiledValue(header, field.name, field.value),
    template(languageId));