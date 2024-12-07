const https = require('https');
const { google } = require('googleapis');
const firebaseConfig = require('../config/firebaseConfig');

const getAccessToken = () => {
    return new Promise(function (resolve, reject) {
      const key = require('../placeholders/service-account.json');
      const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        firebaseConfig.SCOPES,
        null
      );
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
      });
    });
  }

exports.sendFcmMessage = (fcmMessage) => {
    return getAccessToken().then(function (accessToken) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: firebaseConfig.HOST,
                path: firebaseConfig.PATH,
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
            };
  
            const request = https.request(options, function (resp) {
                resp.setEncoding('utf8');
                let responseBody = '';
    
                resp.on('data', function (data) {
                    responseBody += data;
                });
    
                resp.on('end', function () {
                    resolve(responseBody);
                });
            });
    
            request.on('error', function (err) {
                reject(err);
            });
    
            request.write(JSON.stringify(fcmMessage));
            request.end();
        });
    });
}
