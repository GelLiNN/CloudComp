/**
* using http module to access indeed API
* publisher ID for Indeed: 9876703242051712
* DOCS: https://ads.indeed.com/jobroll/xmlfeed
* COMMAND LINE ARGS: "indeed.js -z <zipcode_goes_here>"
*/
var http = require('http');
var parseString = require('xml2js').parseString;
var commandProcess = require('child_process');
var requiredScript = './glassdoor.js';

//parse command line args for zipcode
var zipcode = "";
if (process.argv.indexOf("-z") != -1){ //does our flag exist?
    zipcode = process.argv[process.argv.indexOf("-z") + 1]; //grab the next item
} else {
    throw new Error('No zipcode passed to indeed module');
}

//query for narrowing down better results
var query = "great";

var options = {
    host: 'api.indeed.com',
    path: '/ads/apisearch?publisher=9876703242051712'
        + '&q=' + query
        + '&l=' + zipcode
        + '&sort=&radius=1&st=&jt=fulltime&start='
        + '&limit=1000'
        + '&fromage=&filter=&latlong=1&co=us'
        + '&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29'
        + '&v=2'
};

// Callback for the API request
callback = function(response) {
    var str = '';

    // another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

    // handle and print errors
    response.on('error', function(err) {
        console.log('failure accessing Indeed API');
        console.log(err);
    });

    // the whole response has been recieved,
    // so we have to convert xml to JSON then print
    response.on('end', function () {
        var xml = str;
        parseString(xml, function (err, result) {
            var JSONObject = result;
            var totalRes = JSONObject.response.totalresults[0];
            console.log("Total Jobs in zipcode " + zipcode + ": " + totalRes);

            // Iterate through Jobs array in returned JSON
            // Can also possibly show a map (data structure) of companies/openings
            var jobsArray = JSONObject.response.results[0].result;
            for(var i = 0; i < jobsArray.length; i++) {
                var jobTitle = jobsArray[i].jobtitle[0];
                var companyName = jobsArray[i].company[0];

                /* one exec method for invoking glassdoor module */
                commandProcess.exec('node ' + requiredScript
                    + ' -c \"' + companyName + '\"'
                    + ' -t \"' + jobTitle + '\"', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`execSync error: ${error}`);
                        return;
                    } else {
                        // print stdout and stderr when this callback finishes
                        console.log(`${stdout}`);
                        console.log(`${stderr}`);
                    }
                });
            }
            //print full blob
            //console.log(JSON.stringify(result));
        });
    });
}

http.request(options, callback).end();

/**
* Child process code for invoking glassdoor module
* source: http://stackoverflow.com/questions/22646996/how-do-i-run-a-node-js-script-from-within-another-node-js-script
*/
function runScript(scriptPath, companyOption, callback) {
    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;
    var process = childProcess.exec(scriptPath
        + " -c \"" + companyOption + "\"");

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });
}
