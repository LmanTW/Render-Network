const path = require('path')
const fs = require('fs')

const defaultOption = require('./DefaultOptions.json')

if (!fs.existsSync(path.resolve(__dirname, './Options.json')) || fs.statSync(path.resolve(__dirname, './Options.json')).isDirectory()) fs.writeFileSync(path.resolve(__dirname, './Options.json'), JSON.stringify(defaultOption, null, 2))

if (!fs.existsSync(path.resolve(__dirname, './Project')) || fs.statSync(path.resolve(__dirname, './Project')).isFile()) fs.mkdirSync(path.resolve(__dirname, './Project'))
if (!fs.existsSync(path.resolve(__dirname, './Output')) || fs.statSync(path.resolve(__dirname, './Project')).isFile()) fs.mkdirSync(path.resolve(__dirname, './Output'))

require('./HttpServer')()
