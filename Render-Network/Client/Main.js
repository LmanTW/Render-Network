const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

const sendHttpRequest = require('./HttpRequest')

const defaultOption = require('./DefaultOptions.json')

if (!fs.existsSync(path.resolve(__dirname, './Options.json')) || fs.statSync(path.resolve(__dirname, './Options.json')).isDirectory()) fs.writeFileSync(path.resolve(__dirname, './Options.json'), JSON.stringify(defaultOption, null, 2))

const options = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Options.json')))

// Start The Connection
async function start () {
  try {
    let info = JSON.parse(await sendHttpRequest(options.network))

    console.log(`Installing Blender "${info.blenderVersion}"`)

    let release = info.blenderVersion.split('.').slice(0, 2).join('.')

    exec(`wget https://download.blender.org/release/Blender${release}/blender-${info.blenderVersion}-linux-x64.tar.xz && tar xf blender-${info.blenderVersion}-linux-x64.tar.xz`)
  } catch (error) {
    console.log(`Network Not Found "${options.network}"`)

    process.exit()
  }
}

start()
