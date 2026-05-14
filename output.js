import fs from 'node:fs';
import clipboard from 'clipboardy';
import papaparse from 'papaparse';
import { tablemark } from 'tablemark';
function resultsToArray(results) {
    const array = [];
    for (const [ip, oids] of Object.entries(results)) {
        const ipResults = {
            ip
        };
        for (const [oid, oidValue] of Object.entries(oids)) {
            ipResults[oid] = oidValue;
        }
        array.push(ipResults);
    }
    return array;
}
export function outputToConsole(results) {
    console.log(`Data collected: ${new Date().toLocaleString()}`);
    console.table(results);
}
export function outputToCSV(results) {
    const fileName = 'output.csv';
    const csv = papaparse.unparse(resultsToArray(results));
    fs.writeFileSync(fileName, csv);
    console.log(`Data written to ${fileName}`);
}
export function outputToMarkdown(results) {
    const fileName = 'output.md';
    const markdown = tablemark(resultsToArray(results));
    fs.writeFileSync(fileName, markdown);
    let copiedToClipboard = false;
    try {
        clipboard.writeSync(markdown);
        copiedToClipboard = true;
    }
    catch (error) {
        console.error('Error copying to clipboard:', error);
    }
    console.log(`Data written to ${fileName}${copiedToClipboard ? ', and copied to clipboard.' : ''}`);
}
