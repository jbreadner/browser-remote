const { program } = require('commander');
const pkg = require('../package.json');

const actForeground = require('./actions/foreground');
const actPreset = require('./actions/preset');

function setPort(p) {
  let port = parseInt(p);
  return port || 9222;
}

const main = program
  .name('browser-remote')
  .description('CLI to control some basic browser functions')
  .option('-p, --port <port>', 'The browser debug port to use', setPort)
  .version(pkg.version);

program
  .command('foreground')
  .description('Bring a specific tab to the foreground')
  .argument('<regex>', 'regex to match on the URL')
  .option('-n, --new <url>', 'If an existing page is not found, launch it using <url>')
  .action((resStr, opts) => actForeground(reStr, { ...main.opts(), ...opts }));

program
  .command('app')
  .description('Presets for specific regexes')
  .argument('<app>', 'A named preset regex to activate')
  .action((name, opts) => actPreset(name, { ...main.opts(), ...opts}));
    

program.parse();
