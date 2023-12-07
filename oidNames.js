const oids = new Map();
oids.set('1.3.6.1.4.1.1602.1.2.1.4.0', 'Canon SN');
oids.set('1.3.6.1.4.1.1602.1.11.1.3.1.4.101', '101 : Total 1');
oids.set('1.3.6.1.4.1.1602.1.11.1.3.1.4.108', '108 : Total (Black & White 1)');
export function getOidName(oid) {
    var _a;
    return (_a = oids.get(oid)) !== null && _a !== void 0 ? _a : oid;
}
