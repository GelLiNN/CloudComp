// Uses glassdoor API, getting errors
var Glassdoor = require('machinepack-glassdoor');

// Get company information
Glassdoor.getCompany({
    partnerId: '114236',
    partnerKey: 'j1ERnurd9SI',
    userIp: '0.0.0.0',
    userAgent: '',
    q: 'Microsoft',
    l: 'Seattle, WA, United States',
}).exec({
    // An unexpected error occurred.
    error: function (err) {
        console.log('failure');
        console.log(err);
    },
    // OK.
    success: function () {
        console.log('success');
    },
});
