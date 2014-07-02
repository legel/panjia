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
var OAuth = Package.oauth.OAuth;
var Oauth = Package.oauth.Oauth;
var _ = Package.underscore._;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Random = Package.random.Random;
var Template = Package.templating.Template;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var MeteorDeveloperAccounts, METEOR_DEVELOPER_URL;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/meteor-developer/meteor_developer_common.js                                                 //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
METEOR_DEVELOPER_URL = "https://www.meteor.com";                                                        // 1
                                                                                                        // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/meteor-developer/template.meteor_developer_configure.js                                     //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
                                                                                                        // 1
Template.__define__("configureLoginServiceDialogForMeteorDeveloper", (function() {                      // 2
  var self = this;                                                                                      // 3
  var template = this;                                                                                  // 4
  return [ HTML.Raw("<p>\n    First, you'll need to get a Meteor developer account Client ID.\n    Follow these steps:\n  </p>\n  "), HTML.OL(HTML.Raw('\n    <li> Visit <a href="https://www.meteor.com/account-settings" target="_blank">https://www.meteor.com/account-settings</a> and sign in.\n    </li>\n    <li> Click "New app" in the "Meteor developer account apps" section\n      and give your app a name.</li>\n    '), HTML.LI(" Add\n      ", HTML.SPAN({
    "class": "url"                                                                                      // 6
  }, "\n        ", function() {                                                                         // 7
    return Spacebars.mustache(self.lookup("siteUrl"));                                                  // 8
  }, "_oauth/meteor-developer?close\n      "), "\n      as an Allowed Redirect URL.\n    "), "\n  ") ]; // 9
}));                                                                                                    // 10
                                                                                                        // 11
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/meteor-developer/meteor_developer_configure.js                                              //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
Template.configureLoginServiceDialogForMeteorDeveloper.siteUrl = function () {                          // 1
  return Meteor.absoluteUrl();                                                                          // 2
};                                                                                                      // 3
                                                                                                        // 4
Template.configureLoginServiceDialogForMeteorDeveloper.fields = function () {                           // 5
  return [                                                                                              // 6
    {property: 'clientId', label: 'App ID'},                                                            // 7
    {property: 'secret', label: 'App secret'}                                                           // 8
  ];                                                                                                    // 9
};                                                                                                      // 10
                                                                                                        // 11
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/meteor-developer/meteor_developer_client.js                                                 //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
MeteorDeveloperAccounts = {};                                                                           // 1
                                                                                                        // 2
// Request Meteor developer account credentials for the user                                            // 3
// @param credentialRequestCompleteCallback {Function} Callback function to call on                     // 4
//   completion. Takes one argument, credentialToken on success, or Error on                            // 5
//   error.                                                                                             // 6
var requestCredential = function (options, credentialRequestCompleteCallback) {                         // 7
  // support a callback without options                                                                 // 8
  if (! credentialRequestCompleteCallback && typeof options === "function") {                           // 9
    credentialRequestCompleteCallback = options;                                                        // 10
    options = null;                                                                                     // 11
  }                                                                                                     // 12
                                                                                                        // 13
  var config = ServiceConfiguration.configurations.findOne({                                            // 14
    service: 'meteor-developer'                                                                         // 15
  });                                                                                                   // 16
  if (!config) {                                                                                        // 17
    credentialRequestCompleteCallback &&                                                                // 18
      credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());                        // 19
    return;                                                                                             // 20
  }                                                                                                     // 21
                                                                                                        // 22
  var credentialToken = Random.secret();                                                                // 23
                                                                                                        // 24
  var loginUrl =                                                                                        // 25
        METEOR_DEVELOPER_URL + "/oauth2/authorize?" +                                                   // 26
        "state=" + credentialToken +                                                                    // 27
        "&response_type=code&" +                                                                        // 28
        "client_id=" + config.clientId;                                                                 // 29
                                                                                                        // 30
  if (options && options.userEmail)                                                                     // 31
    loginUrl += '&user_email=' + encodeURIComponent(options.userEmail);                                 // 32
                                                                                                        // 33
  loginUrl += "&redirect_uri=" + Meteor.absoluteUrl("_oauth/meteor-developer?close");                   // 34
                                                                                                        // 35
  OAuth.showPopup(                                                                                      // 36
    loginUrl,                                                                                           // 37
    _.bind(credentialRequestCompleteCallback, null, credentialToken),                                   // 38
    {                                                                                                   // 39
      width: 470,                                                                                       // 40
      height: 420                                                                                       // 41
    }                                                                                                   // 42
  );                                                                                                    // 43
};                                                                                                      // 44
                                                                                                        // 45
MeteorDeveloperAccounts.requestCredential = requestCredential;                                          // 46
                                                                                                        // 47
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteor-developer'] = {
  MeteorDeveloperAccounts: MeteorDeveloperAccounts
};

})();

//# sourceMappingURL=40570d9f8900c2e8570495d452c4cfb002c9b45a.map
