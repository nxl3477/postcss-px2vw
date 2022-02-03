const postcss = require('postcss')
const path = require('path')
const fs = require('fs')
const pluginFile = require('../src/index.js')
fs.readFile(path.join(__dirname, './demo.css'), (err, css) => {
  postcss((pluginFile)
  ({ 
    screen: 375, 
    toFixed: 2,
    identifier: '%'
  }))
    .process(css, { from: path.join(__dirname, './demo.css') , to: path.join(__dirname, './output.css') })
    .then(result => {
      fs.writeFile(path.join(__dirname, './output.css'), result.css, () => true)
      if (result.map) {
        fs.writeFile(path.join(__dirname, './output.map'), result.map, () => true)
      }
    })
})