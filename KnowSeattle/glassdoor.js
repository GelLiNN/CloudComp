/**
* using http module to access glassdoor API
* DOCS: https://www.glassdoor.com/developer/index.htm
* COMMAND LINE EXAMPLE:
* "glassdoor.js -c <company_name_goes_here> -t <job_title_goes_here>"
*/
var http = require('http');

//parse command line args
var company = "";
var title = "";
// check if our flags exist
if (process.argv.indexOf("-c") != -1 && process.argv.indexOf("-t") != -1) {
    company = process.argv[process.argv.indexOf("-c") + 1];
    title = process.argv[process.argv.indexOf("-t") + 1];
} else {
    throw new Error('No company and/or title passed to glassdoor module...');
}

var path = '/api/api.htm?'
    + 't.p=114236&t.k=j1ERnurd9SI'
    + '&userip=0.0.0.0&useragent=&format=json&v=1'
    + '&action=employers'
    + '&city=seattle&state=WA'
    + '&q=' + company;

var encodedPath = encodeURI(path);
var options = {
    host: 'api.glassdoor.com',
    path: encodedPath
};

callback = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('error', function(err) {
        console.log('failure accessing Glassdoor API');
        console.log(err);
    })

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
        console.log("Job Title: " + title);
        console.log(company + " Details:");
        var JSONObject = JSON.parse(str);

        //get employers array from JSON and find best match
        var employersArray = JSONObject.response.employers;
        var bestMatchObj = employersArray[0]; // already sorted by best match
        //try/catch for error handling
        try {
            console.log("    Exact Match: " + bestMatchObj.exactMatch);
            console.log("    Industry: " + bestMatchObj.industryName);
            console.log("    Total Ratings: " + bestMatchObj.numberOfRatings);
            console.log("    Overall Rating: " + bestMatchObj.overallRating + " "
                + bestMatchObj.ratingDescription);
        } catch (err) {
            console.log('ERROR getting company details for ' + company + ':\n');
            console.error(err);
            console.log('JSON blob:\n' + str + '\n'
                + 'Query: ' + path
                + '\n==== E N D ==== E R R O R ==========');
        }
    });
}

http.request(options, callback).end();
