// publisher ID for Indeed: 9876703242051712
// using http module to access Indeed API
// docs https://ads.indeed.com/jobroll/xmlfeed
var http = require('http');

var options = {
  host: 'api.indeed.com',
  path: '/ads/apisearch?publisher=9876703242051712'
    + '&q=java'
    + '&l=austin%2C+tx'
    + '&sort=&radius=&st=&jt=&start=&limit='
    + '&fromage=&filter=&latlong=1&co=us'
    + '&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29'
    + '&v=2'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('error', function(err) {
      console.log('failure accessing Indeed API');
      console.log(err);
  })

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();
