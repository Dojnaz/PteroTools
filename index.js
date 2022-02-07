// Made with ❤️ by Demon Martin#0193! Btw. I am not a good coder at all, so please correct and report any bugs found at https://github.com/Dojnaz/PteroTools/issues

//PACKAGES
const { prompt } = require('enquirer');
const axios = require("axios").default
const fs = require("fs")

//VERSION CHECK
let tempconfig = [];
axios.get(`https://raw.githubusercontent.com/Dojnaz/PteroTools/main/config.json`).then((res) => {
    tempconfig = res.data;
}).catch((err) => {
    console.log(`error while trying to get the template config (tool version)`);
    console.error(err);
    return;
})

//CHECK FOR CONFIG
if (!fs.existsSync(`./config.json`)) {
    console.log("Missing config.json! Downloading template.")
    try {
        fs.writeFileSync(`./config.json`, JSON.stringify(tempconfig, null, 2))
    } catch (err) {
        console.log(`error while trying to replace the template config (missing config)`);
        console.error(err);
        return;
    }
    console.log("Succesfully replaced config.json! Please fill the missing information and credentials in config.json")
    return;
}

//JSONS
let config = JSON.parse(fs.readFileSync(`./config.json`))

if (config.version < tempconfig.version) {
    console.log(`Detected outdated version. Please download a new version at https://github.com/Dojnaz/PteroTools`)
}

if (config.debug == true) console.log(config);