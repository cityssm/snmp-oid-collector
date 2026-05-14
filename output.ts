/* eslint-disable no-console */

import fs from 'node:fs'

import clipboard from 'clipboardy'
import papaparse from 'papaparse'
import { tablemark } from 'tablemark'

import type { Results } from './types.js'

function resultsToArray(results: Results): Array<Record<string, string>> {
  const array: Array<Record<string, string>> = []

  for (const [ip, oids] of Object.entries(results)) {
    const ipResults: Record<string, string> = {
      ip
    }

    for (const [oid, oidValue] of Object.entries(oids)) {
      // eslint-disable-next-line security/detect-object-injection
      ipResults[oid] = oidValue
    }

    array.push(ipResults)
  }

  return array
}

/**
 * Outputs the polling results to the console.
 * @param results - The polling results.
 */
export function outputToConsole(results: Results): void {
  console.log(`Data collected: ${new Date().toLocaleString()}`)
  console.table(results)
}

/**
 * Outputs the polling results to a CSV file.
 * @param results - The polling results.
 */
export function outputToCSV(results: Results): void {
  const fileName = 'output.csv'

  const csv = papaparse.unparse(resultsToArray(results))
  fs.writeFileSync(fileName, csv)

  console.log(`Data written to ${fileName}`)
}

/**
 * Outputs the polling results to a Markdown file.
 * @param results - The polling results.
 */
export function outputToMarkdown(results: Results): void {
  const fileName = 'output.md'

  const markdown = tablemark(resultsToArray(results))

  fs.writeFileSync(fileName, markdown)

  clipboard.writeSync(markdown)

  console.log(`Data written to ${fileName}, and copied to clipboard.`)
}
