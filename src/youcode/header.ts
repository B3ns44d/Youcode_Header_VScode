// node.js
import moment = require("moment");
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

const mainTemplate = `Youcode logo`.substring(1);

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



