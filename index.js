// Made with ❤️ by Demon Martin#0193! Btw. I am not a good coder at all, so please correct and report any bugs found at https://github.com/Dojnaz/PteroTools/issues

//PACKAGES
const { prompt } = require('enquirer');
const axios = require("axios").default
const fs = require("fs")
//JSON
if (!fs.existsSync(`./config.json`)) {
    console.log("Missing config.json! Downloading template.")
    axios.get(`https://raw.githubusercontent.com/Dojnaz/PteroTools/main/config.json`)
        .then((res) => {
            fs.writeFileSync(`./config.json`, JSON.stringify(res.data, null, 2))
            console.log("Succesfully downloaded config.json! Please fill the missing information and credentials in config.json")
        }).catch((err) => {
            //console.log(`Detected error while trying to download missing config.json!\n`+err)
            console.log(err)
        })
    return;
}
let config = JSON.parse(fs.readFileSync(`./config.json`))

console.log(config)