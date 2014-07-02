(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;
var HTTP = Package.http.HTTP;
var _ = Package.underscore._;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;

/* Package-scope variables */
var MeteorDeveloperAccounts, METEOR_DEVELOPER_URL;

(function () {

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/meteor-developer/meteor_developer_common.js                          //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
METEOR_DEVELOPER_URL = "https://www.meteor.com";                                 // 1
                                                                                 // 2
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/meteor-developer/meteor_developer_server.js                          //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
MeteorDeveloperAccounts = {};                                                    // 1
                                                                                 // 2
OAuth.registerService("meteor-developer", 2, null, function (query) {            // 3
  var response = getTokens(query);                                               // 4
  var accessToken = response.accessToken;                                        // 5
  var identity = getIdentity(accessToken);                                       // 6
                                                                                 // 7
  var serviceData = {                                                            // 8
    accessToken: OAuth.sealSecret(accessToken),                                  // 9
    expiresAt: (+new Date) + (1000 * response.expiresIn)                         // 10
  };                                                                             // 11
                                                                                 // 12
  _.extend(serviceData, identity);                                               // 13
                                                                                 // 14
  // only set the token in serviceData if it's there. this ensures               // 15
  // that we don't lose old ones (since we only get this on the first            // 16
  // log in attempt)                                                             // 17
  if (response.refreshToken)                                                     // 18
    serviceData.refreshToken = OAuth.sealSecret(response.refreshToken);          // 19
                                                                                 // 20
  return {                                                                       // 21
    serviceData: serviceData,                                                    // 22
    options: {profile: {name: serviceData.username}}                             // 23
    // XXX use username for name until meteor accounts has a profile with a name // 24
  };                                                                             // 25
});                                                                              // 26
                                                                                 // 27
// returns an object containing:                                                 // 28
// - accessToken                                                                 // 29
// - expiresIn: lifetime of token in seconds                                     // 30
// - refreshToken, if this is the first authorization request and we got a       // 31
//   refresh token from the server                                               // 32
var getTokens = function (query) {                                               // 33
  var config = ServiceConfiguration.configurations.findOne({                     // 34
    service: 'meteor-developer'                                                  // 35
  });                                                                            // 36
  if (!config)                                                                   // 37
    throw new ServiceConfiguration.ConfigError();                                // 38
                                                                                 // 39
  var response;                                                                  // 40
  try {                                                                          // 41
    response = HTTP.post(                                                        // 42
      METEOR_DEVELOPER_URL + "/oauth2/token", {                                  // 43
        params: {                                                                // 44
          grant_type: "authorization_code",                                      // 45
          code: query.code,                                                      // 46
          client_id: config.clientId,                                            // 47
          client_secret: OAuth.openSecret(config.secret),                        // 48
          redirect_uri: Meteor.absoluteUrl("_oauth/meteor-developer?close")      // 49
        }                                                                        // 50
      }                                                                          // 51
    );                                                                           // 52
  } catch (err) {                                                                // 53
    throw _.extend(                                                              // 54
      new Error(                                                                 // 55
        "Failed to complete OAuth handshake with Meteor developer accounts. "    // 56
          + err.message                                                          // 57
      ),                                                                         // 58
      {response: err.response}                                                   // 59
    );                                                                           // 60
  }                                                                              // 61
                                                                                 // 62
  if (! response.data || response.data.error) {                                  // 63
    // if the http response was a json object with an error attribute            // 64
    throw new Error(                                                             // 65
      "Failed to complete OAuth handshake with Meteor developer accounts. " +    // 66
        (response.data ? response.data.error :                                   // 67
         "No response data")                                                     // 68
    );                                                                           // 69
  } else {                                                                       // 70
    return {                                                                     // 71
      accessToken: response.data.access_token,                                   // 72
      refreshToken: response.data.refresh_token,                                 // 73
      expiresIn: response.data.expires_in                                        // 74
    };                                                                           // 75
  }                                                                              // 76
};                                                                               // 77
                                                                                 // 78
var getIdentity = function (accessToken) {                                       // 79
  try {                                                                          // 80
    return HTTP.get(                                                             // 81
      METEOR_DEVELOPER_URL + "/api/v1/identity",                                 // 82
      {                                                                          // 83
        headers: { Authorization: "Bearer " + accessToken }                      // 84
      }                                                                          // 85
    ).data;                                                                      // 86
  } catch (err) {                                                                // 87
    throw _.extend(                                                              // 88
      new Error("Failed to fetch identity from Meteor developer accounts. " +    // 89
                err.message),                                                    // 90
      {response: err.response}                                                   // 91
    );                                                                           // 92
  }                                                                              // 93
};                                                                               // 94
                                                                                 // 95
MeteorDeveloperAccounts.retrieveCredential = function (credentialToken,          // 96
                                                       credentialSecret) {       // 97
  return OAuth.retrieveCredential(credentialToken, credentialSecret);            // 98
};                                                                               // 99
                                                                                 // 100
///////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteor-developer'] = {
  MeteorDeveloperAccounts: MeteorDeveloperAccounts
};

})();
