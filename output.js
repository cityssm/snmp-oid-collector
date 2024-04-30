import fs from 'node:fs';
import papaparse from 'papaparse';
const resultsToArray = (results) => {
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
};
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
