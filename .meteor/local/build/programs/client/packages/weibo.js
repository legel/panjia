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
var Random = Package.random.Random;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Weibo;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/weibo/template.weibo_configure.js                                                   //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
                                                                                                // 1
Template.__define__("configureLoginServiceDialogForWeibo", (function() {                        // 2
  var self = this;                                                                              // 3
  var template = this;                                                                          // 4
  return [ HTML.Raw("<p>\n    First, you'll need to register your app on Weibo. Follow these steps:\n  </p>\n  "), HTML.OL(HTML.Raw('\n    <li>\n      Visit <a href="http://open.weibo.com/development" target="_blank">http://open.weibo.com/development</a> (Google Chrome\'s automatic translation works well here)\n    </li>\n    <li>\n      Click the green "创建应用" button\n    </li>\n    <li>\n      Select 网页应用在第三方网页内访问使用 (Web Applications)\n    </li>\n    <li>\n      Complete the registration process\n    </li>\n    <li>\n      Open 应用信息 (Application) -> 高级信息 (Senior Information)\n    </li>\n    '), HTML.LI("\n      Set OAuth2.0 授权回调页 (authorized callback page) to: ", HTML.SPAN({
    "class": "url"                                                                              // 6
  }, function() {                                                                               // 7
    return Spacebars.mustache(self.lookup("siteUrl"));                                          // 8
  }, "_oauth/weibo?close"), "\n    "), "\n  ") ];                                               // 9
}));                                                                                            // 10
                                                                                                // 11
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/weibo/weibo_configure.js                                                            //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
Template.configureLoginServiceDialogForWeibo.siteUrl = function () {                            // 1
  // Weibo doesn't recognize localhost as a domain                                              // 2
  return Meteor.absoluteUrl({replaceLocalhost: true});                                          // 3
};                                                                                              // 4
                                                                                                // 5
Template.configureLoginServiceDialogForWeibo.fields = function () {                             // 6
  return [                                                                                      // 7
    {property: 'clientId', label: 'App Key'},                                                   // 8
    {property: 'secret', label: 'App Secret'}                                                   // 9
  ];                                                                                            // 10
};                                                                                              // 11
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/weibo/weibo_client.js                                                               //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
Weibo = {};                                                                                     // 1
                                                                                                // 2
// Request Weibo credentials for the user                                                       // 3
// @param options {optional}                                                                    // 4
// @param credentialRequestCompleteCallback {Function} Callback function to call on             // 5
//   completion. Takes one argument, credentialToken on success, or Error on                    // 6
//   error.                                                                                     // 7
Weibo.requestCredential = function (options, credentialRequestCompleteCallback) {               // 8
  // support both (options, callback) and (callback).                                           // 9
  if (!credentialRequestCompleteCallback && typeof options === 'function') {                    // 10
    credentialRequestCompleteCallback = options;                                                // 11
    options = {};                                                                               // 12
  }                                                                                             // 13
                                                                                                // 14
  var config = ServiceConfiguration.configurations.findOne({service: 'weibo'});                 // 15
  if (!config) {                                                                                // 16
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(                     // 17
      new ServiceConfiguration.ConfigError());                                                  // 18
    return;                                                                                     // 19
  }                                                                                             // 20
                                                                                                // 21
  var credentialToken = Random.secret();                                                        // 22
  // XXX need to support configuring access_type and scope                                      // 23
  var loginUrl =                                                                                // 24
        'https://api.weibo.com/oauth2/authorize' +                                              // 25
        '?response_type=code' +                                                                 // 26
        '&client_id=' + config.clientId +                                                       // 27
        '&redirect_uri=' + Meteor.absoluteUrl('_oauth/weibo?close', {replaceLocalhost: true}) + // 28
        '&state=' + credentialToken;                                                            // 29
                                                                                                // 30
  OAuth.showPopup(                                                                              // 31
    loginUrl,                                                                                   // 32
    _.bind(credentialRequestCompleteCallback, null, credentialToken)                            // 33
  );                                                                                            // 34
};                                                                                              // 35
                                                                                                // 36
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.weibo = {
  Weibo: Weibo
};

})();

//# sourceMappingURL=cb88d4fa1257346d3892e5f2e74400ce6c4dccd0.map
