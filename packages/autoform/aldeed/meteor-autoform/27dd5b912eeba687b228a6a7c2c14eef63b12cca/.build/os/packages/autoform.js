(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/autoform/autoform-common.js                              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
// Extend the schema options allowed by SimpleSchema                 // 1
SimpleSchema.extendOptions({                                         // 2
  autoform: Match.Optional(Object)                                   // 3
});                                                                  // 4
///////////////////////////////////////////////////////////////////////

}).call(this);
