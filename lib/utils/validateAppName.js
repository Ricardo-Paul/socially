// eslint disable-next-line
const validatePackageName = require('validate-npm-package-name');
const apiDependencies = require('./apiDepencies');
    
    /**
     * validate application name
     * @role1 do not accept undefined or empty name
     * @role2 check if NPM allows this name
     * @role3 make sure app name doesnt clash with dependency name
     */

     module.exports = (appName) => {
        //  commander will return an object when appName is not provided 
        if(typeof(appName) === 'object'){
            console.log(`Please provide a name for your app`);
            process.exit(1);
        };

        // handle errors or warnings from validation results
        const handleErrors = (validationResults) => {
            validationResults.forEach((errorOrWarning) => {
                console.log(`* ${errorOrWarning}`);
            });
        };

        const validationResults = validatePackageName(appName);
        if(!validationResults.validForNewPackages){
            // TODO: use chalk to color errors
            console.log(`
            We could not create a package called ${appName} due to npm naming restrictions.
            Please choose another name
            `)
            validationResults.errors && handleErrors(validationResults.errors);
            validationResults.warnings && handleErrors(validationResults.warnings);
        }

        // make sure the app name does not clash with dependency name
        // apiDependencies.indexOf(appName) >= 0
        
        if(apiDependencies.includes(appName)){
            console.log(`We could not create a project with the name ${appName}.
            Because a dependency with the same name exists
            `);
        process.exit(1);
        }
     }