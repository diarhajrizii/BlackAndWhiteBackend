const AWS = require("aws-sdk");
AWS.config.region = process.env.AWS_REGION;
var cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const awsCognitoClientId = process.env.AWS_COGNITO_CLIENT_ID;

async function initiateAuth({ email, password }) {
  return new Promise((resolve, rejected) => {
    var params = {
      AuthFlow: "USER_PASSWORD_AUTH" /* required */,
      ClientId: awsCognitoClientId /* required */,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };
    cognitoIdentityServiceProvider.initiateAuth(params, function (err, data) {
      if (err) {
        return resolve({ status: false, err });
      } else {
        if (typeof data.ChallengeName != "undefined") {
          if (data.ChallengeName == "NEW_PASSWORD_REQUIRED") {
            return resolve({
              status: true,
              data: {
                session: data.Session,
                challange_name: data.ChallengeName,
              },
            });
          } else if (data.ChallengeName == "SOFTWARE_TOKEN_MFA") {
            return resolve({
              status: true,
              data: {
                session: data.Session,
                challange_name: data.ChallengeName,
              },
            });
          }
        } else {
          const { AccessToken, RefreshToken } = data.AuthenticationResult;
          return resolve({
            status: true,
            data: {
              access_token: AccessToken,
              refresh_token: RefreshToken,
            },
          });
        }
      }
    });
  });
}

module.exports = {
  initiateAuth,
};
