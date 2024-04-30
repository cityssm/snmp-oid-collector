const oids = new Map();
oids.set('1.3.6.1.4.1.1602.1.2.1.4.0', 'Canon SN');
oids.set('1.3.6.1.4.1.1602.1.11.1.3.1.4.101', '101 : Total 1');
oids.set('1.3.6.1.4.1.1602.1.11.1.3.1.4.108', '108 : Total (Black & White 1)');
export function getOidName(oid) {
    return oids.get(oid) ?? oid;
}
