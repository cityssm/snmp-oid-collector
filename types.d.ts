export interface Config {
    communityString?: string;
    ips: string[];
    oids: string[];
}
export interface Results {
    [ip: string]: {
        [oid: string]: string;
    };
}
