const http = require('http')

// Send Http Request
module.exports = async (url, options, body) => {
  return new Promise((resolve, reject) => {
    let request = http.request(url, options, (response) => {
      let data = Buffer.alloc(0)

      response.on('data', (chunk) => data = Buffer.concat([data, chunk]))
      response.on('end', () => resolve(data))
    })

    request.on('error', (error) => reject(error))

    if (body !== undefined) request.write(JSON.stringify(body))

    request.end()
  })
}
