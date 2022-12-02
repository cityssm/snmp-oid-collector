import config from "./config.js";
import { getOidName } from "./oidNames.js";
import snmp from "net-snmp";
const results = {};
const community = config.communityString || "public";
let outstandingCount = 0;
for (const ip of config.ips) {
    results[ip] = {};
    let ipAddress = ip;
    if (ip.indexOf("|") !== -1) {
        const ipSplit = ip.split("|");
        ipAddress = ipSplit[0].trim();
    }
    console.log("Polling " + ip + " ...");
    outstandingCount += 1;
    const snmpSession = snmp.createSession(ipAddress, community);
    snmpSession.get(config.oids, (error, varbinds) => {
        if (error) {
            console.log(error);
        }
        else {
            for (var i = 0; i < varbinds.length; i++) {
                if (snmp.isVarbindError(varbinds[i])) {
                    console.error(snmp.varbindError(varbinds[i]));
                }
                else {
                    results[ip][getOidName(varbinds[i].oid)] = varbinds[i].value;
                }
            }
        }
        outstandingCount -= 1;
    });
}
while (outstandingCount > 0) {
    console.log("Waiting for " + outstandingCount + " servers to respond...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
}
console.log("\n\n");
console.table(results);
console.log(new Date());
