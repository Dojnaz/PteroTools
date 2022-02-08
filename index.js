// Made with ❤️ by Demon Martin#0193! Btw. I am not a good coder at all, so please correct and report any bugs found at https://github.com/Dojnaz/PteroTools/issues

//PACKAGES
const { prompt, Confirm, MultiSelect, Select } = require('enquirer');
const axios = require("axios").default
const fs = require("fs")

//VERSION CHECK
let tempconfig = [];
axios.get(`https://raw.githubusercontent.com/Dojnaz/PteroTools/main/config.json`).then((res) => {
    tempconfig = JSON.stringify(res.data, null, 2)
}).catch((err) => {
    console.log(`error while trying to get the template config (tool version)`);
    console.error(err);
    return;
})

//CHECK FOR CONFIG
if (!fs.existsSync(`./config.json`)) {
    console.log("Missing config.json! Downloading template.")
    try {
        fs.writeFileSync(`./config.json`, tempconfig)
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

//FUNCTIONS
function writelog(enabled, type, data) {
    if (enabled != "true") return;
    if (!fs.existsSync(`./logs/`)) {
        console.log("Detected no logs folder. Making one!")
        fs.mkdirSync(`./logs/`)
    }
    var curnt_date = new Date()
    fs.writeFileSync(`./logs/${curnt_date.getHours()}:${curnt_date.getMinutes}:${curnt_date.getSeconds}_${Math.random().toString(36).substr(2, 3)}_${type}`, data)
    console.log(`Logged all data in ./logs/${curnt_date.getHours()}:${curnt_date.getMinutes}:${curnt_date.getSeconds}_${Math.random().toString(36).substr(2, 3)}_${type}`)
}

//PRECHECK

if (!config) {
    console.log("Config is empty. Replacing with example!")
    try {
        fs.writeFileSync(`./config.json`, tempconfig)
    } catch (err) {
        console.log(`error while trying to replace the template config (missing config)`);
        console.error(err);
        return;
    }
    console.log("Succesfully replaced config.json! Please fill the missing information and credentials in config.json")
    return;
}

//DISABLE PRECHECK FOR DEVS
if (debug == false) {
    if (!config.ptero_api_url) {
        return console.log("Missing ptero_api_url in config.json!")
    } else if (!config.ptero_api_url.startsWith(`https://`)) {
        return console.log("ptero_api_url does not start with \"https://\" !")
    } else if (!config.ptero_api_key) {
        return console.log("Missing ptero_api_key in config.json!")
    } else if (config.ptero_api_key.length != 48) {
        return console.log("ptero_api_key length is less or more than 48 (default).")
    } else if (!config.debug) {
        return console.log("config.json does not follow the template pattern! Try downloading it from https://raw.githubusercontent.com/Dojnaz/PteroTools/main/config.json")
    } else if (!config.version) {
        return console.log("config.json does not follow the template pattern! Try downloading it from https://raw.githubusercontent.com/Dojnaz/PteroTools/main/config.json")
    }
}


//STARTUP
const startup = new Select({
    name: 'area',
    message: 'Please select where the pterodactyl api is located in.',
    choices: ["Users", "Nodes", "Locations", "Servers", "Nests"]
})
try {
    startup.run()
        .then(startup_answer => {
            const Logging = new Confirm({
                name: "logging",
                message: "Do you want to log all files (in /logs/)?"
            })
            Logging.run()
                .then(logger => {
                    switch (startup_answer) {
                        case "Users":
                            const users_quest = new Select({
                                name: "users",
                                message: "Please select what pterotools should do for you.",
                                choices: ["List all Users", "List all Users without 2FA"]
                            })
                            users_quest.run().then(users_answer => {
                                if (users_answer == "List all Users") {
                                    axios({
                                        method: 'GET',
                                        url: `${config.ptero_api_url}`,
                                        headers: {
                                            "Accept": "application/json",
                                            "Content-Type": "application/json",
                                            "Authorization": `Bearer ${config.ptero_api_key}`,
                                        },
                                    }).then((res) => {

                                    })
                                } else {
                                    console.log("The current selected method is not implemented.")
                                }
                            })

                            break;
                        case "Nodes":



                            break;
                        case "Locations":



                            break;
                        case "Servers":



                            break;
                        case "Nests":



                            break;
                        default:
                            break;
                    }
                })
        })
} catch (err) {
    console.log("Something went wrong.")
    console.error(err)
}
