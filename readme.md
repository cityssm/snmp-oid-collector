# SNMP OID Collector

The main purpose of this project is to quickly collect counters from printers at City facilities.
It can however be used to poll other devices for other types of counters as well.

## Getting Started

Download a release or download this repository.

If not already installed, install [Node.js](https://nodejs.org/) version 16 or better.

Install the dependencies.

```sh
npm install
```

Create a `config.js` file like the one below.
Note that descriptive server names can be included after the `|` character.

```javascript
export const config = {
    ips: [
        "192.168.20.100",
        "192.168.21.100 | Legal Printer",
        "192.168.22.100 | Payroll Printer",
        "192.168.23.100 | HR Printer"
    ],
    communityString: "public",
    oids: [
        "1.3.6.1.4.1.1602.1.11.1.3.1.4.101",
        "1.3.6.1.4.1.1602.1.11.1.3.1.4.108"
    ]
};
export default config;
```

Run the application.

```sh
npm start
```

View the output on screen or in output.csv.

```
┌────────────────────────────────────┬───────────────┬───────────────────────────────┐
│              (index)               │ 101 : Total 1 │ 108 : Total (Black & White 1) │
├────────────────────────────────────┼───────────────┼───────────────────────────────┤
│  192.168.20.100                    │               │                               │
│  192.168.21.100 | Legal Printer    │     8468      │             7290              │
│  192.168.22.100 | Payroll Printer  │     34474     │             16620             │
│  192.168.23.100 | HR Printer       │     10908     │             9144              │
└────────────────────────────────────┴───────────────┴───────────────────────────────┘
```