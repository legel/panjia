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
var Template = Package.templating.Template;
var _ = Package.underscore._;
var Random = Package.random.Random;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Meetup;

(function () {

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/meetup/template.meetup_configure.js                                     //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
                                                                                    // 1
Template.__define__("configureLoginServiceDialogForMeetup", (function() {           // 2
  var self = this;                                                                  // 3
  var template = this;                                                              // 4
  return [ HTML.Raw("<p>\n    First, you'll need to get a Meetup Client ID. Follow these steps:\n  </p>\n  "), HTML.OL(HTML.Raw('\n    <li>\n      Visit <a href="http://www.meetup.com/meetup_api/oauth_consumers/create/" target="blank">http://www.meetup.com/meetup_api/oauth_consumers/create/</a>\n    </li>\n    <li>\n      Set the Consumer name to the name of your application.\n    </li>\n    <li>\n      Optionally set the Application Website to the URL of your\n      website.  You can leave this blank.\n    </li>\n    '), HTML.LI(HTML.Raw("\n      Set the <b>Redirect URI</b> to: "), HTML.SPAN({
    "class": "url"                                                                  // 6
  }, function() {                                                                   // 7
    return Spacebars.mustache(self.lookup("siteUrl"));                              // 8
  }), "  (Do not append a path to this URL.)\n    "), "\n  ") ];                    // 9
}));                                                                                // 10
                                                                                    // 11
//////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/meetup/meetup_configure.js                                              //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
Template.configureLoginServiceDialogForMeetup.siteUrl = function () {               // 1
  return Meteor.absoluteUrl();                                                      // 2
};                                                                                  // 3
                                                                                    // 4
Template.configureLoginServiceDialogForMeetup.fields = function () {                // 5
  return [                                                                          // 6
    {property: 'clientId', label: 'Key'},                                           // 7
    {property: 'secret', label: 'Secret'}                                           // 8
  ];                                                                                // 9
};                                                                                  // 10
//////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/meetup/meetup_client.js                                                 //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
Meetup = {};                                                                        // 1
// Request Meetup credentials for the user                                          // 2
// @param options {optional}                                                        // 3
// @param credentialRequestCompleteCallback {Function} Callback function to call on // 4
//   completion. Takes one argument, credentialToken on success, or Error on        // 5
//   error.                                                                         // 6
Meetup.requestCredential = function (options, credentialRequestCompleteCallback) {  // 7
  // support both (options, callback) and (callback).                               // 8
  if (!credentialRequestCompleteCallback && typeof options === 'function') {        // 9
    credentialRequestCompleteCallback = options;                                    // 10
    options = {};                                                                   // 11
  }                                                                                 // 12
                                                                                    // 13
  var config = ServiceConfiguration.configurations.findOne({service: 'meetup'});    // 14
  if (!config) {                                                                    // 15
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(         // 16
      new ServiceConfiguration.ConfigError());                                      // 17
    return;                                                                         // 18
  }                                                                                 // 19
                                                                                    // 20
  // For some reason, meetup converts underscores to spaces in the state            // 21
  // parameter when redirecting back to the client, so we use                       // 22
  // `Random.id()` here (alphanumerics) instead of `Random.secret()`                // 23
  // (base 64 characters).                                                          // 24
  var credentialToken = Random.id();                                                // 25
                                                                                    // 26
  var scope = (options && options.requestPermissions) || [];                        // 27
  var flatScope = _.map(scope, encodeURIComponent).join('+');                       // 28
                                                                                    // 29
  var loginUrl =                                                                    // 30
        'https://secure.meetup.com/oauth2/authorize' +                              // 31
        '?client_id=' + config.clientId +                                           // 32
        '&response_type=code' +                                                     // 33
        '&scope=' + flatScope +                                                     // 34
        '&redirect_uri=' + Meteor.absoluteUrl('_oauth/meetup?close') +              // 35
        '&state=' + credentialToken;                                                // 36
                                                                                    // 37
  // meetup box gets taller when permissions requested.                             // 38
  var height = 620;                                                                 // 39
  if (_.without(scope, 'basic').length)                                             // 40
    height += 130;                                                                  // 41
                                                                                    // 42
  OAuth.showPopup(                                                                  // 43
    loginUrl,                                                                       // 44
    _.bind(credentialRequestCompleteCallback, null, credentialToken),               // 45
    {width: 900, height: height}                                                    // 46
  );                                                                                // 47
};                                                                                  // 48
                                                                                    // 49
//////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.meetup = {
  Meetup: Meetup
};

})();

//# sourceMappingURL=57a9f1e04a483b80961cef210a923de0cf925435.map
