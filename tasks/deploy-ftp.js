// const fs = require('fs')
const FtpDeploy = require('ftp-deploy')
const path = require('path')
// const fse = require('fs-extra')

const config = require('../webpack.config')
const privateConfig = require('../private-config')

const distDir = config.output.path
const cname = 'http://brandidentity.valexiev.com/'


// * * * Additional files * * *

// const phpDir = path.resolve(__dirname, '../additional')
//
// try {
//   fse.copySync(phpDir, distDir)
//   console.log('Copied the files in /additional to /dist!')
// } catch (err) {
//   console.error(err)
// }


// * * * FTP * * *

var ftpDeploy = new FtpDeploy()

const ftpDeployConfig = {
  ...privateConfig.ftpDeployConfig,
  localRoot: distDir,
  remoteRoot: '/',
  include: ["*", "**/*"]
  // exclude: ['.git', '.idea', 'tmp/*', 'build/*']
}


ftpDeploy.deploy(ftpDeployConfig, function(err) {
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
})

ftpDeploy.on('uploading', function(data) {
    data.totalFileCount       // total file count being transferred
    data.transferredFileCount // number of files transferred
    data.percentComplete      // percent as a number 1 - 100
    data.filename             // partial path with filename being uploaded
})

ftpDeploy.on('uploaded', function(data) {
    console.log(data) // same data as uploading event
})

ftpDeploy.on('upload-error', function (data) {
    console.log(data.err) // data will also include filename, relativePath, and other goodies
})
