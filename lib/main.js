const program = require('commander');
const validateAppName = require('./utils/validateAppName');

let appName;

program
.action((name) => { //deal with all the arguments passed
    appName = name;
});

program.parse(process.argv); // parse the arguments

function createApp(){
    /**
     * validate application name
     */
    validateAppName(appName);

    /**
     * clone socially from github
     */
}

createApp();

// program.name() return the executable filename by default
// clibinary ** executable file name
