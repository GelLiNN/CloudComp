var unirest = require('unirest');
// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get("https://indeed-indeed.p.mashape.com/apigetjobs?publisher=9876703242051712&format=json&jobkeys=<required>&v=2")
    .header("X-Mashape-Key", "Gxi2KVML7HmshwqdoBMWQE1ilrgWp19pNfvjsnHRzVXCkjgeYC")
    .header("Accept", "application/json")
    .end(function (result) {
        console.log(result.status, result.headers, result.body);
    });
