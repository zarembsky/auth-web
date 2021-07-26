const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2), {
	string: ['config', 'c'],
	alias: { config: 'c' },
	default: { config: 'config/development.json' }
});
const Config = fs.readFileSync(argv.config);
const ConfigJSON = JSON.parse(Config);

module.exports = ConfigJSON;
