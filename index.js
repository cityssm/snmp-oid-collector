var _a;
import snmp from 'net-snmp';
import config from './config.js';
import { getOidName } from './oidNames.js';
import * as output from './output.js';
const results = {};
const community = (_a = config.communityString) !== null && _a !== void 0 ? _a : 'public';
let outstandingCount = 0;
for (const ip of config.ips) {
    results[ip] = {};
    let ipAddress = ip;
    if (ip.includes('|')) {
        const ipSplit = ip.split('|');
        ipAddress = ipSplit[0].trim();
    }
    console.log(`Polling ${ip} ...`);
    outstandingCount += 1;
    const snmpSession = snmp.createSession(ipAddress, community);
    snmpSession.get(config.oids, (error, varbinds) => {
        if (error) {
            console.log(error);
        }
        else {
            for (const varbind of varbinds) {
                if (snmp.isVarbindError(varbind)) {
                    console.error(snmp.varbindError(varbind));
                }
                else {
                    const value = varbind.value;
                    results[ip][getOidName(varbind.oid)] =
                        typeof value === 'number' ? value : value.toString();
                }
            }
        }
        outstandingCount -= 1;
    });
}
while (outstandingCount > 0) {
    console.log(`Waiting for ${outstandingCount} servers to respond...`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
}
console.log('\n\n');
output.toConsole(results);
console.log('\n\n');
output.toCSV(results);
