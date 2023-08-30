// const fs = require('fs')
const FtpDeploy = require('ftp-deploy')
const path = require('path')
// const fse = require('fs-extra')

const config = require('../webpack.config')
const secretConfig = require('../secret-config')

const localDir = config.output.path


// * * * Additional files * * *

// const phpDir = path.resolve(__dirname, '../additional')
//
// try {
//   fse.copySync(phpDir, localDir)
//   console.log('Copied the files in /additional to /dist!')
// } catch (err) {
//   console.error(err)
// }


console.log(secretConfig)
console.log(localDir)

// * * * FTP * * *

var ftpDeploy = new FtpDeploy()

const ftpConfig = {
  ...secretConfig.ftpConfig,
  localRoot: localDir,
  remoteRoot: '/public-systemarchitecture-studio',
  include: ["*", "**/*"]
  // exclude: ['.git', '.idea', 'tmp/*', 'build/*']
}


ftpDeploy.deploy(ftpConfig, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Successful Deploy!')
    console.log('\n\n')
    console.log('OPEN:')
    console.log('https://systemarchitecture.studio')
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
