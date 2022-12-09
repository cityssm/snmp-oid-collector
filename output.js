import papaparse from "papaparse";
import fs from "node:fs";
const resultsToArray = (results) => {
    const array = [];
    for (const [ip, oids] of Object.entries(results)) {
        const ipResults = {
            ip: ip
        };
        for (const [oid, oidValue] of Object.entries(oids)) {
            ipResults[oid] = oidValue;
        }
        array.push(ipResults);
    }
    return array;
};
export const toConsole = (results) => {
    console.log("Data collected: " + new Date());
    console.table(results);
};
export const toCSV = (results) => {
    const fileName = "output.csv";
    const csv = papaparse.unparse(resultsToArray(results));
    fs.writeFileSync(fileName, csv);
    console.log("Data written to " + fileName);
};
