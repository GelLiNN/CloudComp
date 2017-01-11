// using http module to access glassdoor API
// docs https://www.glassdoor.com/developer/index.htm
var http = require('http');

var options = {
  host: 'api.glassdoor.com',
  path: '/api/api.htm?t.p=114236&t.k=j1ERnurd9SI&userip=0.0.0.0'
    + '&useragent=&format=json&v=1&action=jobs-stats&l=Seattle&returnEmployers=true&admLevelRequested=1'
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
    console.log(str);
  });
}

http.request(options, callback).end();
