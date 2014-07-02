//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Random = Package.random.Random;
var Accounts = Package['accounts-base'].Accounts;
var MeteorDeveloperAccounts = Package['meteor-developer'].MeteorDeveloperAccounts;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
// packages/accounts-meteor-developer/meteor-developer.js                                  //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////
                                                                                           //
Accounts.oauth.registerService("meteor-developer");                                        // 1
                                                                                           // 2
if (Meteor.isClient) {                                                                     // 3
  Meteor.loginWithMeteorDeveloperAccount = function (options, callback) {                  // 4
    // support a callback without options                                                  // 5
    if (! callback && typeof options === "function") {                                     // 6
      callback = options;                                                                  // 7
      options = null;                                                                      // 8
    }                                                                                      // 9
                                                                                           // 10
    var credentialRequestCompleteCallback =                                                // 11
          Accounts.oauth.credentialRequestCompleteHandler(callback);                       // 12
    MeteorDeveloperAccounts.requestCredential(options, credentialRequestCompleteCallback); // 13
  };                                                                                       // 14
} else {                                                                                   // 15
  Accounts.addAutopublishFields({                                                          // 16
    // publish all fields including access token, which can legitimately be used           // 17
    // from the client (if transmitted over ssl or on localhost).                          // 18
    forLoggedInUser: ['services.meteor-developer'],                                        // 19
    forOtherUsers: [                                                                       // 20
      'services.meteor-developer.username',                                                // 21
      'services.meteor-developer.profile',                                                 // 22
      'services.meteor-developer.id'                                                       // 23
    ]                                                                                      // 24
  });                                                                                      // 25
}                                                                                          // 26
                                                                                           // 27
/////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-meteor-developer'] = {};

})();

//# sourceMappingURL=72d3125dcd479a5aad54f1d702cca344ac0d22e9.map
