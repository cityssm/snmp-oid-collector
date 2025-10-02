import snmp from 'net-snmp';
import config from './config.js';
import { getOidName } from './oidNames.js';
import { outputToCSV, outputToConsole } from './output.js';
const results = {};
const community = config.communityString ?? 'public';
let outstandingCount = 0;
for (const ip of config.ips) {
    results[ip] = {};
    let ipAddress = ip;
    if (ip.includes('|')) {
        const ipSplit = ip.split('|');
        ipAddress = ipSplit[0].trim();
    }
    console.log(`Polling ${ip} ...`);
    outstandingCount += config.oids.length;
    const snmpSession = snmp.createSession(ipAddress, community);
    for (const oid of config.oids) {
        snmpSession.get([oid], (error, varbinds) => {
            if (error) {
                console.log(error);
            }
            else {
                for (const varbind of varbinds ?? []) {
                    if (snmp.isVarbindError(varbind)) {
                        console.error(snmp.varbindError(varbind));
                    }
                    else {
                        const { value } = varbind;
                        results[ip][getOidName(varbind.oid)] =
                            typeof value === 'number' ? value : value.toString();
                    }
                }
            }
            outstandingCount -= 1;
        });
    }
}
while (outstandingCount > 0) {
    console.log(`Waiting for ${outstandingCount} poll(s) to respond...`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
}
console.log('\n\n');
outputToConsole(results);
console.log('\n\n');
outputToCSV(results);
