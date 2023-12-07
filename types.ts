export interface Config {
  communityString?: string
  ips: string[]
  oids: string[]
}

export type Results = Record<string, Record<string, string>>
