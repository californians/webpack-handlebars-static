const fs = require('fs')
const ghpages = require('gh-pages')
const config = require('../webpack.config')
const privateConfig = require('../secret-config')

const distDir = config.output.path
const cname = 'maistorgrei.com'


// Prepare for GitHub pages
fs.renameSync(distDir + '/index.html', distDir + '/404.html');

fs.writeFileSync(distDir + '/CNAME', cname)

// Publish to GitHub
const ghOptions = {
  ...privateConfig.ghPagesOptions,
  branch: 'master',
}

ghpages.publish(distDir, ghOptions, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Successful Deploy!')
    console.log('\n\n')
    console.log('OPEN:')
    console.log(cname)
    console.log('\n\n')
    console.log(': )')
    console.log('\n\n\n\n')
  }
});
