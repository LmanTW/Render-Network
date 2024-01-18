var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// Render-Network/Client/HttpRequest.js
var require_HttpRequest = __commonJS({
  "Render-Network/Client/HttpRequest.js"(exports2, module2) {
    var http = require("http");
    module2.exports = async (url, options2, body) => {
      return new Promise((resolve, reject) => {
        let request = http.request(url, options2, (response) => {
          let data = Buffer.alloc(0);
          response.on("data", (chunk) => data = Buffer.concat([data, chunk]));
          response.on("end", () => resolve(data));
        });
        request.on("error", (error) => reject(error));
        if (body !== void 0)
          request.write(JSON.stringify(body));
        request.end();
      });
    };
  }
});

// Render-Network/Client/DefaultOptions.json
var require_DefaultOptions = __commonJS({
  "Render-Network/Client/DefaultOptions.json"(exports2, module2) {
    module2.exports = {
      network: ""
    };
  }
});

// Render-Network/Client/Main.js
var { exec } = require("child_process");
var path = require("path");
var fs = require("fs");
var sendHttpRequest = require_HttpRequest();
var defaultOption = require_DefaultOptions();
if (!fs.existsSync(path.resolve(__dirname, "./Options.json")) || fs.statSync(path.resolve(__dirname, "./Options.json")).isDirectory())
  fs.writeFileSync(path.resolve(__dirname, "./Options.json"), JSON.stringify(defaultOption, null, 2));
var options = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./Options.json")));
async function start() {
  try {
    let info = JSON.parse(await sendHttpRequest(options.network));
    console.log(`Installing Blender "${info.blenderVersion}"`);
    let release = info.blenderVersion.split(".").slice(0, 2).join(".");
    exec(`wget https://download.blender.org/release/Blender${release}/blender-${info.blenderVersion}-linux-x64.tar.xz && tar xf blender-${info.blenderVersion}-linux-x64.tar.xz`);
  } catch (error) {
    console.log(`Network Not Found "${options.network}"`);
    process.exit();
  }
}
start();
