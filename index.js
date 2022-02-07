// Made with ❤️ by Demon Martin#0193! Btw. I am not a good coder at all, so please correct and report any bugs found at https://github.com/Dojnaz/PteroTools/issues

//PACKAGES
const { prompt } = require('enquirer');
const fs = require("fs")
//JSON
if(!fs.readFileSync(`./config.json`)) return
let config = JSON.parse(fs.readFileSync(`./config.json`))

console.log(config)