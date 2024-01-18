const path = require('path')
const http = require('http')
const url = require('url')
const fs = require('fs')

const options = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'Options.json')))

// Start Http Server
module.exports = () => {
  let server = http.createServer((req, res) => {
    let reqPath = url.parse(req.url).pathname.split('/')
    reqPath.splice(0, 1)

    if (reqPath[0] === 'Connect') res.end(JSON.stringify({ blenderVersion: options.blenderVersion }))
    else if (reqPath[0] === 'GetProject') res.end(getProject())
  })

  server.listen(options.port, () => console.log(`Http Server Listening On ${options.port}`))
}

const { getProject, getWork } = require('./Project')
