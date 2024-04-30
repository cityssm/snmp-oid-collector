const oids = new Map<string, string>()

oids.set('1.3.6.1.4.1.1602.1.2.1.4.0', 'Canon SN')
oids.set('1.3.6.1.4.1.1602.1.11.1.3.1.4.101', '101 : Total 1')
oids.set('1.3.6.1.4.1.1602.1.11.1.3.1.4.108', '108 : Total (Black & White 1)')

/**
 * Returns a readable OID name if one is available.
 * @param {string} oid - An OID
 * @returns {string} - A readable OID name, or the OID itself if no name is available.
 */
export function getOidName(oid: string): string {
  return oids.get(oid) ?? oid
}
