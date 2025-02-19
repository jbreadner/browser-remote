const { join } = require('path');
const { readFileSync } = require('fs');
const { parse } = require('yaml');
const foreground = require('./foreground');

function loadYamlFile() {
  const presetsFileName = join(__dirname, '..', '..', 'preset.yaml');
  try {
    const presetsFileContents = readFileSync(presetsFileName);
    const presetsObject = parse(presetsFileContents.toString());
    return new Map(Object.entries(presetsObject.presets));
  }
  catch(err) {
    console.log('Error loading presets.yaml');
    console.log(err);
    process.exit(1);
  }
}

async function preset(name, opts) {
  const presets = loadYamlFile();
  console.log('preset opts: ', opts)
  if ( presets.has(name) ) {
    const { check, url } = presets.get(name);
    console.log(`Starting preset "${name}"`)
    foreground(check, { ...opts, new: url });
  } else {
    console.log(`Error:  Cannot find preset "${name}"`);
    console.log(presets);
  }
}

module.exports = preset;
