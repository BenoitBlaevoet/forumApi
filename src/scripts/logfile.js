const fs = require('fs')
const util = require('util')
const path = require('path')
const moment = require('moment')

module.exports = function (d, filename) {
  const logFilePath = path.join(__dirname, '../../logs/' + filename + '.json')
  const logFile = fs.createWriteStream(logFilePath, { flags: 'a+' })
  const logStdout = process.stdout
  let time = moment.now()
  time = moment(time).format('DD/MM/YYY - h:mm:ss')
  try {
    logFile.write(JSON.stringify({ time, message: d }) + ',\n')
    logStdout.write(util.format(time + ' ' + d) + '\n')
  } catch (e) {
    console.log([e, logFilePath])
  }
}
