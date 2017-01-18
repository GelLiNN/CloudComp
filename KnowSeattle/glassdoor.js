/**
* using http module to access glassdoor API
* docs https://www.glassdoor.com/developer/index.htm
* COMMAND LINE ARGS: "glassdoor.js -c <company_name>"
*/
var http = require('http');

//parse command line args
var company = "";
if (process.argv.indexOf("-c") != -1){ //does our flag exist?
    company = process.argv[process.argv.indexOf("-c") + 1]; //grab the next item
} else {
    throw new Error('No company passed to glassdoor module');
}

var encodedPath = encodeURI('/api/api.htm?'
    + 't.p=114236&t.k=j1ERnurd9SI'
    + '&userip=0.0.0.0&useragent=&format=json&v=1'
    + '&action=employers'
    + '&city=seattle&state=WA'
    + '&q=' + company);

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
        console.log(company + " Details:")
        var JSONObject = JSON.parse(str);

        //get employers array from JSON and find best match
        var employersArray = JSONObject.response.employers;
        var bestMatchObj = employersArray[0]; // already sorted by best match

        console.log("    Exact Match: " + bestMatchObj.exactMatch);
        console.log("    Industry: " + bestMatchObj.industryName);
        console.log("    Total Ratings: " + bestMatchObj.numberOfRatings);
        console.log("    Overall Rating: " + bestMatchObj.overallRating + " "
            + bestMatchObj.ratingDescription);
    });
}

http.request(options, callback).end();
