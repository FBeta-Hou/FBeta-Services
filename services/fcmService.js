const https = require('https');
const { google } = require('googleapis');
const firebaseConfig = require('../config/firebaseConfig');

const dotenv = require("dotenv");
dotenv.config();

const getAccessToken = () => {
    return new Promise(function (resolve, reject) {
      const key = {
        "type": process.env.type,
        "project_id": process.env.project_id,
        "private_key_id": process.env.private_key_id,
        "private_key": process.env.private_key,
        "client_email": process.env.client_email,
        "client_id": process.env.client_id,
        "auth_uri": process.env.auth_uri,
        "token_uri": process.env.token_uri,
        "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
        "client_x509_cert_url": process.env.client_x509_cert_url,
        "universe_domain": process.env.universe_domain
      }
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
