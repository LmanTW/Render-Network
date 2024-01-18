const { build } = require('tsup')
const path = require('path')
const fs = require('fs')

// Start Building
async function start () {
  await build({
    entry: [path.resolve(__dirname, '../../Render-Network/Server/Main.js')],

    format: 'cjs',
    minify: 'terser',

    outDir: path.resolve(__dirname, './Cache')
  })

  fs.unlinkSync(path.resolve(__dirname, '../../Assets/Server.js'))
  fs.renameSync(path.resolve(__dirname, './Cache/Main.js'), path.resolve(__dirname, '../../Assets/Server.js'))

  await build({
    entry: [path.resolve(__dirname, '../../Render-Network/Client/Main.js')],

    format: 'cjs',
    minify: false,

    outDir: path.resolve(__dirname, './Cache')
  })

  fs.unlinkSync(path.resolve(__dirname, '../../Assets/Client.js'))
  fs.renameSync(path.resolve(__dirname, './Cache/Main.js'), path.resolve(__dirname, '../../Assets/Client.js'))
}

start()
