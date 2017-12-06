const downloadStats = require('download-stats')
const npmUserPackages = require('npm-user-packages')

function getDownloadStats (packageName) {
  return new Promise((resolve, reject) => {
    downloadStats.get.lastMonth(packageName, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

module.exports = function getNpmUserDownloadStats (npmUser) {
  return npmUserPackages(npmUser)
    .then(packages => {
      return Promise.all(packages.map((pkg) => {
        return getDownloadStats(pkg.name)
      }))
    })
    .then(results => {
      results.sort((a, b) => {
        return b.downloads - a.downloads
      })
      return results
    })
}
