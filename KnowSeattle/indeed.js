// publisher ID for Indeed: 9876703242051712
// using http module to access Indeed API
// docs https://ads.indeed.com/jobroll/xmlfeed
var http = require('http');
var parseString = require('xml2js').parseString;
var rjsonSearch = require('rjson-search');

// Zipcode is the key param for query
var zipcode = "98105";

var options = {
    host: 'api.indeed.com',
    path: '/ads/apisearch?publisher=9876703242051712'
        + '&q='
        + '&l=' + zipcode
        + '&sort=&radius=1&st=&jt=&start='
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
            // Can also possibly show a map (data structure) of companies/openings
        });
    });
}

http.request(options, callback).end();
