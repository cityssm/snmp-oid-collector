import fs from 'node:fs'

import papaparse from 'papaparse'

import type { Results } from './types.js'

const resultsToArray = (
  results: Results
): Array<Record<string, string>> => {
  const array: Array<Record<string, string>> = []

  for (const [ip, oids] of Object.entries(results)) {
    const ipResults: Record<string, string> = {
      ip
    }

    for (const [oid, oidValue] of Object.entries(oids)) {
      ipResults[oid] = oidValue
    }

    array.push(ipResults)
  }

  return array
}

export function toConsole(results: Results): void {
  console.log(`Data collected: ${new Date().toLocaleString()}`)
  console.table(results)
}

export function toCSV(results: Results): void {
  const fileName = 'output.csv'

  const csv = papaparse.unparse(resultsToArray(results))
  fs.writeFileSync(fileName, csv)

  console.log(`Data written to ${fileName}`)
}
