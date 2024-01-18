const path = require('path')
const fs = require('fs')

module.exports = { getProject, getWork }

let work = []

let files = fs.readdirSync(path.resolve(__dirname, './Project'))

if (files.length > 1) console.log(`Found Multiple Projects:\n${files.map((file) => `| ${file}`).join('\n')}\nThe Network Will Only Render "${files[0]}" And Ignore The Rest`)
else if (files.length < 1) {
  console.log('Cannot Find Any Project')

  process.exit()
}

if (path.parse(files[0]).ext !== '.blend') {
  console.log(`File "${files[0]}" Is Not A Blender Project`)

  process.exit()
}

// Get Project
function getProject () {
  return fs.readFileSync(path.resolve(__dirname, `./Project/${files[0]}`))
}

// Get Work
function getWork () {

}
