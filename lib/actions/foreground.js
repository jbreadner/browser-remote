const CDP = require('chrome-remote-interface');

async function foreground(reStr, opts) {
  console.log('foreground opts: ', opts)
  const re = new RegExp(reStr);
  const list = await CDP.List({ port: opts?.port });
  const match = list.filter(x => x.type == 'page' && re.test(x.url))[0];
  if ( match ) return CDP.Activate({ id: match.id, port: opts?.port });
  if ( opts?.new ) return CDP.New({ url: opts.new, port: opts?.port });
  console.log(`No match found for '/${reStr.replace(/\//g, '\\/')}/'`);
}

module.exports = foreground;
