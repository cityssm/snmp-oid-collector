import papaparse from "papaparse";
import fs from "node:fs";

import * as types from "./types";

const resultsToArray = (results: types.Results): {}[] => {

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

export const toConsole = (results: types.Results) => {
    console.log("Data collected: " + new Date());
    console.table(results);
};

export const toCSV = (results: types.Results) => {

    const fileName = "output.csv";

    const csv = papaparse.unparse(resultsToArray(results));
    fs.writeFileSync(fileName, csv);

    console.log("Data written to " + fileName);
};