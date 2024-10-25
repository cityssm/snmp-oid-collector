// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable security/detect-object-injection */

import snmp from 'net-snmp'

import config from './config.js'
import { getOidName } from './oidNames.js'
import { outputToCSV, outputToConsole } from './output.js'
import type { Results } from './types.js'

const results: Results = {}

const community = config.communityString ?? 'public'

let outstandingCount = 0

for (const ip of config.ips) {
  results[ip] = {}

  let ipAddress = ip
  // let serverName = ip;

  if (ip.includes('|')) {
    const ipSplit = ip.split('|')
    ipAddress = ipSplit[0].trim()
    // serverName = ipSplit[1].trim();
  }

  console.log(`Polling ${ip} ...`)

  outstandingCount += 1

  const snmpSession = snmp.createSession(ipAddress, community)

  snmpSession.get(config.oids, (error, varbinds) => {
    if (error) {
      console.log(error)
    } else {
      for (const varbind of varbinds) {
        if (snmp.isVarbindError(varbind) as boolean) {
          console.error(snmp.varbindError(varbind))
        } else {
          const value = varbind.value
          results[ip][getOidName(varbind.oid)] =
            typeof value === 'number' ? value : value.toString()
        }
      }
    }

    outstandingCount -= 1
  })
}

// eslint-disable-next-line sonarjs/no-infinite-loop, no-unmodified-loop-condition
while (outstandingCount > 0) {
  console.log(`Waiting for ${outstandingCount} servers to respond...`)
  await new Promise((resolve) => setTimeout(resolve, 2000))
}

console.log('\n\n')
outputToConsole(results)

console.log('\n\n')
outputToCSV(results)
