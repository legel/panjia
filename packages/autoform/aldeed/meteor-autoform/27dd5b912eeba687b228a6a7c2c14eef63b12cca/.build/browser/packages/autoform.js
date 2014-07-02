(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/autoform-common.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Extend the schema options allowed by SimpleSchema                                                                   // 1
SimpleSchema.extendOptions({                                                                                           // 2
  autoform: Match.Optional(Object)                                                                                     // 3
});                                                                                                                    // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/bootstrap3/template.bootstrap3.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__define__("quickForm_bootstrap3", (function() {                                                              // 2
  var self = this;                                                                                                     // 3
  var template = this;                                                                                                 // 4
  return Spacebars.TemplateWith(function() {                                                                           // 5
    return Spacebars.call(Spacebars.dot(self.lookup("."), "qfAutoFormContext"));                                       // 6
  }, UI.block(function() {                                                                                             // 7
    var self = this;                                                                                                   // 8
    return Spacebars.include(self.lookupTemplate("autoForm"), UI.block(function() {                                    // 9
      var self = this;                                                                                                 // 10
      return [ "\n    ", UI.Each(function() {                                                                          // 11
        return Spacebars.dataMustache(self.lookup("afFieldNames"), Spacebars.kw({                                      // 12
          fields: Spacebars.dot(self.lookup(".."), "atts", "fields"),                                                  // 13
          omitFields: Spacebars.dot(self.lookup(".."), "atts", "omitFields")                                           // 14
        }));                                                                                                           // 15
      }, UI.block(function() {                                                                                         // 16
        var self = this;                                                                                               // 17
        return [ "\n      ", Spacebars.TemplateWith(function() {                                                       // 18
          return {                                                                                                     // 19
            name: Spacebars.call(self.lookup(".")),                                                                    // 20
            options: Spacebars.call("auto"),                                                                           // 21
            fields: Spacebars.call(Spacebars.dot(self.lookup("..."), "atts", "fields")),                               // 22
            omitFields: Spacebars.call(Spacebars.dot(self.lookup("..."), "atts", "omitFields"))                        // 23
          };                                                                                                           // 24
        }, UI.block(function() {                                                                                       // 25
          var self = this;                                                                                             // 26
          return Spacebars.include(self.lookupTemplate("afQuickField"));                                               // 27
        })), "\n    " ];                                                                                               // 28
      })), "\n    ", UI.If(function() {                                                                                // 29
        return Spacebars.call(self.lookup("qfNeedsButton"));                                                           // 30
      }, UI.block(function() {                                                                                         // 31
        var self = this;                                                                                               // 32
        return [ "\n    ", HTML.DIV("\n      ", HTML.BUTTON({                                                          // 33
          $dynamic: [ function() {                                                                                     // 34
            return Spacebars.attrMustache(self.lookup("submitButtonAtts"));                                            // 35
          } ]                                                                                                          // 36
        }, "\n      ", Spacebars.With(function() {                                                                     // 37
          return Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "buttonContent"));                            // 38
        }, UI.block(function() {                                                                                       // 39
          var self = this;                                                                                             // 40
          return [ "\n      ", function() {                                                                            // 41
            return Spacebars.mustache(self.lookup("."));                                                               // 42
          }, "\n      " ];                                                                                             // 43
        }), UI.block(function() {                                                                                      // 44
          var self = this;                                                                                             // 45
          return "\n      Submit\n      ";                                                                             // 46
        })), "\n      "), "\n    "), "\n    " ];                                                                       // 47
      })), "\n  " ];                                                                                                   // 48
    }));                                                                                                               // 49
  }));                                                                                                                 // 50
}));                                                                                                                   // 51
                                                                                                                       // 52
Template.__define__("afFieldLabel_bootstrap3", (function() {                                                           // 53
  var self = this;                                                                                                     // 54
  var template = this;                                                                                                 // 55
  return HTML.LABEL({                                                                                                  // 56
    $dynamic: [ function() {                                                                                           // 57
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 58
    } ]                                                                                                                // 59
  }, function() {                                                                                                      // 60
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 61
      name: Spacebars.dot(self.lookup("."), "atts", "name")                                                            // 62
    }));                                                                                                               // 63
  });                                                                                                                  // 64
}));                                                                                                                   // 65
                                                                                                                       // 66
Template.__define__("afCheckbox_bootstrap3", (function() {                                                             // 67
  var self = this;                                                                                                     // 68
  var template = this;                                                                                                 // 69
  return HTML.DIV({                                                                                                    // 70
    "class": "checkbox"                                                                                                // 71
  }, "\n    ", HTML.LABEL("\n      ", HTML.INPUT({                                                                     // 72
    type: "checkbox",                                                                                                  // 73
    value: function() {                                                                                                // 74
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                             // 75
    },                                                                                                                 // 76
    $dynamic: [ function() {                                                                                           // 77
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 78
    } ]                                                                                                                // 79
  }), "\n      ", function() {                                                                                         // 80
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 81
      name: Spacebars.dot(self.lookup("."), "name")                                                                    // 82
    }));                                                                                                               // 83
  }, "\n    "), "\n  ");                                                                                               // 84
}));                                                                                                                   // 85
                                                                                                                       // 86
Template.__define__("afCheckboxGroup_bootstrap3", (function() {                                                        // 87
  var self = this;                                                                                                     // 88
  var template = this;                                                                                                 // 89
  return UI.Each(function() {                                                                                          // 90
    return Spacebars.call(Spacebars.dot(self.lookup("."), "items"));                                                   // 91
  }, UI.block(function() {                                                                                             // 92
    var self = this;                                                                                                   // 93
    return [ "\n    ", HTML.DIV({                                                                                      // 94
      "class": "checkbox"                                                                                              // 95
    }, "\n      ", HTML.LABEL("\n        ", HTML.INPUT({                                                               // 96
      type: "checkbox",                                                                                                // 97
      value: function() {                                                                                              // 98
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                           // 99
      },                                                                                                               // 100
      $dynamic: [ function() {                                                                                         // 101
        return Spacebars.attrMustache(self.lookup("atts"));                                                            // 102
      } ]                                                                                                              // 103
    }), "\n        ", function() {                                                                                     // 104
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "label"));                                             // 105
    }, "\n      "), "\n    "), "\n  " ];                                                                               // 106
  }));                                                                                                                 // 107
}));                                                                                                                   // 108
                                                                                                                       // 109
Template.__define__("afRadio_bootstrap3", (function() {                                                                // 110
  var self = this;                                                                                                     // 111
  var template = this;                                                                                                 // 112
  return HTML.DIV({                                                                                                    // 113
    "class": "radio"                                                                                                   // 114
  }, "\n    ", HTML.LABEL("\n      ", HTML.INPUT({                                                                     // 115
    type: "radio",                                                                                                     // 116
    value: function() {                                                                                                // 117
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                             // 118
    },                                                                                                                 // 119
    $dynamic: [ function() {                                                                                           // 120
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 121
    } ]                                                                                                                // 122
  }), "\n      ", function() {                                                                                         // 123
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 124
      name: Spacebars.dot(self.lookup("."), "name")                                                                    // 125
    }));                                                                                                               // 126
  }, "\n    "), "\n  ");                                                                                               // 127
}));                                                                                                                   // 128
                                                                                                                       // 129
Template.__define__("afRadioGroup_bootstrap3", (function() {                                                           // 130
  var self = this;                                                                                                     // 131
  var template = this;                                                                                                 // 132
  return UI.Each(function() {                                                                                          // 133
    return Spacebars.call(Spacebars.dot(self.lookup("."), "items"));                                                   // 134
  }, UI.block(function() {                                                                                             // 135
    var self = this;                                                                                                   // 136
    return [ "\n    ", HTML.DIV({                                                                                      // 137
      "class": "radio"                                                                                                 // 138
    }, "\n      ", HTML.LABEL("\n        ", HTML.INPUT({                                                               // 139
      type: "radio",                                                                                                   // 140
      value: function() {                                                                                              // 141
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                           // 142
      },                                                                                                               // 143
      $dynamic: [ function() {                                                                                         // 144
        return Spacebars.attrMustache(self.lookup("atts"));                                                            // 145
      } ]                                                                                                              // 146
    }), "\n        ", function() {                                                                                     // 147
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "label"));                                             // 148
    }, "\n      "), "\n    "), "\n  " ];                                                                               // 149
  }));                                                                                                                 // 150
}));                                                                                                                   // 151
                                                                                                                       // 152
Template.__define__("afContenteditable_bootstrap3", (function() {                                                      // 153
  var self = this;                                                                                                     // 154
  var template = this;                                                                                                 // 155
  return Spacebars.include(self.lookupTemplate("afContenteditable_plain"));                                            // 156
}));                                                                                                                   // 157
                                                                                                                       // 158
Template.__define__("afFieldSelect_bootstrap3", (function() {                                                          // 159
  var self = this;                                                                                                     // 160
  var template = this;                                                                                                 // 161
  return HTML.SELECT({                                                                                                 // 162
    $dynamic: [ function() {                                                                                           // 163
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 164
    } ]                                                                                                                // 165
  }, "\n    ", Spacebars.include(function() {                                                                          // 166
    return Spacebars.dot(self.lookup("."), "contentBlock");                                                            // 167
  }), "\n  ");                                                                                                         // 168
}));                                                                                                                   // 169
                                                                                                                       // 170
Template.__define__("afSelect_bootstrap3", (function() {                                                               // 171
  var self = this;                                                                                                     // 172
  var template = this;                                                                                                 // 173
  return HTML.SELECT({                                                                                                 // 174
    $dynamic: [ function() {                                                                                           // 175
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 176
    } ]                                                                                                                // 177
  }, "\n    ", UI.Each(function() {                                                                                    // 178
    return Spacebars.call(Spacebars.dot(self.lookup("."), "items"));                                                   // 179
  }, UI.block(function() {                                                                                             // 180
    var self = this;                                                                                                   // 181
    return [ "\n      ", HTML.OPTION({                                                                                 // 182
      $dynamic: [ function() {                                                                                         // 183
        return Spacebars.attrMustache(self.lookup("optionAtts"));                                                      // 184
      } ]                                                                                                              // 185
    }, function() {                                                                                                    // 186
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "label"));                                             // 187
    }), "\n    " ];                                                                                                    // 188
  })), "\n  ");                                                                                                        // 189
}));                                                                                                                   // 190
                                                                                                                       // 191
Template.__define__("afTextarea_bootstrap3", (function() {                                                             // 192
  var self = this;                                                                                                     // 193
  var template = this;                                                                                                 // 194
  return HTML.TEXTAREA({                                                                                               // 195
    $dynamic: [ function() {                                                                                           // 196
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 197
    } ]                                                                                                                // 198
  }, function() {                                                                                                      // 199
    return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                               // 200
  });                                                                                                                  // 201
}));                                                                                                                   // 202
                                                                                                                       // 203
Template.__define__("afInput_bootstrap3", (function() {                                                                // 204
  var self = this;                                                                                                     // 205
  var template = this;                                                                                                 // 206
  return HTML.INPUT({                                                                                                  // 207
    type: function() {                                                                                                 // 208
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "type"));                                              // 209
    },                                                                                                                 // 210
    value: function() {                                                                                                // 211
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                             // 212
    },                                                                                                                 // 213
    $dynamic: [ function() {                                                                                           // 214
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 215
    } ]                                                                                                                // 216
  });                                                                                                                  // 217
}));                                                                                                                   // 218
                                                                                                                       // 219
Template.__define__("afDeleteButton_bootstrap3", (function() {                                                         // 220
  var self = this;                                                                                                     // 221
  var template = this;                                                                                                 // 222
  return Spacebars.TemplateWith(function() {                                                                           // 223
    return {                                                                                                           // 224
      collection: Spacebars.call(Spacebars.dot(self.lookup("."), "collection")),                                       // 225
      type: Spacebars.call("remove"),                                                                                  // 226
      doc: Spacebars.call(Spacebars.dot(self.lookup("."), "doc")),                                                     // 227
      id: Spacebars.call(Spacebars.dot(self.lookup("."), "id"))                                                        // 228
    };                                                                                                                 // 229
  }, UI.block(function() {                                                                                             // 230
    var self = this;                                                                                                   // 231
    return Spacebars.include(self.lookupTemplate("autoForm"), UI.block(function() {                                    // 232
      var self = this;                                                                                                 // 233
      return [ "\n  ", HTML.BUTTON({                                                                                   // 234
        type: "submit",                                                                                                // 235
        $dynamic: [ function() {                                                                                       // 236
          return Spacebars.attrMustache(self.lookup("atts"));                                                          // 237
        } ]                                                                                                            // 238
      }, UI.If(function() {                                                                                            // 239
        return Spacebars.call(Spacebars.dot(self.lookup(".."), "contentBlock"));                                       // 240
      }, UI.block(function() {                                                                                         // 241
        var self = this;                                                                                               // 242
        return Spacebars.include(function() {                                                                          // 243
          return Spacebars.dot(self.lookup(".."), "contentBlock");                                                     // 244
        });                                                                                                            // 245
      }), UI.block(function() {                                                                                        // 246
        var self = this;                                                                                               // 247
        return "Delete";                                                                                               // 248
      }))), "\n  " ];                                                                                                  // 249
    }));                                                                                                               // 250
  }));                                                                                                                 // 251
}));                                                                                                                   // 252
                                                                                                                       // 253
Template.__define__("afQuickField_bootstrap3", (function() {                                                           // 254
  var self = this;                                                                                                     // 255
  var template = this;                                                                                                 // 256
  return HTML.DIV({                                                                                                    // 257
    "class": [ "form-group ", UI.If(function() {                                                                       // 258
      return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({                                    // 259
        name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                         // 260
        autoform: Spacebars.dot(self.lookup("."), "atts", "autoform")                                                  // 261
      }));                                                                                                             // 262
    }, UI.block(function() {                                                                                           // 263
      var self = this;                                                                                                 // 264
      return "has-error";                                                                                              // 265
    })) ]                                                                                                              // 266
  }, "\n    ", UI.Unless(function() {                                                                                  // 267
    return Spacebars.call(Spacebars.dot(self.lookup("."), "skipLabel"));                                               // 268
  }, UI.block(function() {                                                                                             // 269
    var self = this;                                                                                                   // 270
    return [ "\n    ", Spacebars.TemplateWith(function() {                                                             // 271
      return Spacebars.call(Spacebars.dot(self.lookup("."), "afFieldLabelAtts"));                                      // 272
    }, UI.block(function() {                                                                                           // 273
      var self = this;                                                                                                 // 274
      return Spacebars.include(self.lookupTemplate("afFieldLabel"));                                                   // 275
    })), "\n    " ];                                                                                                   // 276
  })), "\n    ", Spacebars.TemplateWith(function() {                                                                   // 277
    return Spacebars.call(Spacebars.dot(self.lookup("."), "afFieldInputAtts"));                                        // 278
  }, UI.block(function() {                                                                                             // 279
    var self = this;                                                                                                   // 280
    return Spacebars.include(self.lookupTemplate("afFieldInput"));                                                     // 281
  })), "\n    ", HTML.SPAN({                                                                                           // 282
    "class": "help-block"                                                                                              // 283
  }, function() {                                                                                                      // 284
    return Spacebars.makeRaw(Spacebars.mustache(self.lookup("afFieldMessage"), Spacebars.kw({                          // 285
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 286
      autoform: Spacebars.dot(self.lookup("."), "atts", "autoform")                                                    // 287
    })));                                                                                                              // 288
  }), "\n  ");                                                                                                         // 289
}));                                                                                                                   // 290
                                                                                                                       // 291
Template.__define__("afObjectField_bootstrap3", (function() {                                                          // 292
  var self = this;                                                                                                     // 293
  var template = this;                                                                                                 // 294
  return HTML.DIV({                                                                                                    // 295
    "class": "panel panel-default"                                                                                     // 296
  }, "\n    ", HTML.DIV({                                                                                              // 297
    "class": "panel-heading"                                                                                           // 298
  }, "\n      ", HTML.H3({                                                                                             // 299
    "class": "panel-title"                                                                                             // 300
  }, function() {                                                                                                      // 301
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 302
      name: Spacebars.dot(self.lookup("."), "atts", "name")                                                            // 303
    }));                                                                                                               // 304
  }), "\n    "), "\n    ", HTML.DIV({                                                                                  // 305
    "class": "panel-body"                                                                                              // 306
  }, "\n      ", UI.If(function() {                                                                                    // 307
    return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({                                      // 308
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 309
      autoform: Spacebars.dot(self.lookup("."), "autoform")                                                            // 310
    }));                                                                                                               // 311
  }, UI.block(function() {                                                                                             // 312
    var self = this;                                                                                                   // 313
    return [ "\n      ", HTML.SPAN({                                                                                   // 314
      "class": "help-block"                                                                                            // 315
    }, function() {                                                                                                    // 316
      return Spacebars.makeRaw(Spacebars.mustache(self.lookup("afFieldMessage"), Spacebars.kw({                        // 317
        name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                         // 318
        autoform: Spacebars.dot(self.lookup("."), "autoform")                                                          // 319
      })));                                                                                                            // 320
    }), "\n      " ];                                                                                                  // 321
  })), "\n      ", UI.Each(function() {                                                                                // 322
    return Spacebars.dataMustache(self.lookup("afFieldNames"), Spacebars.kw({                                          // 323
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 324
      fields: Spacebars.dot(self.lookup("."), "atts", "fields"),                                                       // 325
      omitFields: Spacebars.dot(self.lookup("."), "atts", "omitFields")                                                // 326
    }));                                                                                                               // 327
  }, UI.block(function() {                                                                                             // 328
    var self = this;                                                                                                   // 329
    return [ "\n        ", Spacebars.TemplateWith(function() {                                                         // 330
      return {                                                                                                         // 331
        name: Spacebars.call(self.lookup(".")),                                                                        // 332
        options: Spacebars.call("auto"),                                                                               // 333
        fields: Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "fields")),                                    // 334
        omitFields: Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "omitFields"))                             // 335
      };                                                                                                               // 336
    }, UI.block(function() {                                                                                           // 337
      var self = this;                                                                                                 // 338
      return Spacebars.include(self.lookupTemplate("afQuickField"));                                                   // 339
    })), "\n      " ];                                                                                                 // 340
  })), "\n    "), "\n  ");                                                                                             // 341
}));                                                                                                                   // 342
                                                                                                                       // 343
Template.__define__("afArrayField_bootstrap3", (function() {                                                           // 344
  var self = this;                                                                                                     // 345
  var template = this;                                                                                                 // 346
  return HTML.DIV({                                                                                                    // 347
    "class": "panel panel-default"                                                                                     // 348
  }, "\n    ", HTML.DIV({                                                                                              // 349
    "class": "panel-heading"                                                                                           // 350
  }, function() {                                                                                                      // 351
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 352
      name: Spacebars.dot(self.lookup("."), "atts", "name")                                                            // 353
    }));                                                                                                               // 354
  }), "\n    ", UI.If(function() {                                                                                     // 355
    return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({                                      // 356
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 357
      autoform: Spacebars.dot(self.lookup("."), "autoform")                                                            // 358
    }));                                                                                                               // 359
  }, UI.block(function() {                                                                                             // 360
    var self = this;                                                                                                   // 361
    return [ "\n    ", HTML.DIV({                                                                                      // 362
      "class": "panel-body has-error"                                                                                  // 363
    }, "\n      ", HTML.SPAN({                                                                                         // 364
      "class": "help-block"                                                                                            // 365
    }, function() {                                                                                                    // 366
      return Spacebars.makeRaw(Spacebars.mustache(self.lookup("afFieldMessage"), Spacebars.kw({                        // 367
        name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                         // 368
        autoform: Spacebars.dot(self.lookup("."), "autoform")                                                          // 369
      })));                                                                                                            // 370
    }), "\n    "), "\n    " ];                                                                                         // 371
  })), "\n    ", HTML.UL({                                                                                             // 372
    "class": "list-group"                                                                                              // 373
  }, "\n      ", Spacebars.TemplateWith(function() {                                                                   // 374
    return {                                                                                                           // 375
      name: Spacebars.call(Spacebars.dot(self.lookup("."), "atts", "name")),                                           // 376
      minCount: Spacebars.call(Spacebars.dot(self.lookup("."), "atts", "minCount")),                                   // 377
      maxCount: Spacebars.call(Spacebars.dot(self.lookup("."), "atts", "maxCount"))                                    // 378
    };                                                                                                                 // 379
  }, UI.block(function() {                                                                                             // 380
    var self = this;                                                                                                   // 381
    return Spacebars.include(self.lookupTemplate("afEachArrayItem"), UI.block(function() {                             // 382
      var self = this;                                                                                                 // 383
      return [ "\n      ", HTML.LI({                                                                                   // 384
        "class": "list-group-item autoform-array-item"                                                                 // 385
      }, "\n        ", HTML.DIV({                                                                                      // 386
        "class": "media"                                                                                               // 387
      }, "\n          ", UI.If(function() {                                                                            // 388
        return Spacebars.dataMustache(self.lookup("afArrayFieldHasMoreThanMinimum"), Spacebars.kw({                    // 389
          name: Spacebars.dot(self.lookup(".."), "atts", "name"),                                                      // 390
          autoform: Spacebars.dot(self.lookup(".."), "autoform"),                                                      // 391
          minCount: Spacebars.dot(self.lookup(".."), "atts", "minCount"),                                              // 392
          maxCount: Spacebars.dot(self.lookup(".."), "atts", "maxCount")                                               // 393
        }));                                                                                                           // 394
      }, UI.block(function() {                                                                                         // 395
        var self = this;                                                                                               // 396
        return [ "\n          ", HTML.BUTTON({                                                                         // 397
          "class": "btn btn-primary autoform-remove-item pull-left"                                                    // 398
        }, HTML.SPAN({                                                                                                 // 399
          "class": "glyphicon glyphicon-minus"                                                                         // 400
        })), "\n          " ];                                                                                         // 401
      })), "\n          ", HTML.DIV({                                                                                  // 402
        "class": "media-body"                                                                                          // 403
      }, "\n            ", Spacebars.TemplateWith(function() {                                                         // 404
        return {                                                                                                       // 405
          name: Spacebars.call(Spacebars.dot(self.lookup("."), "name")),                                               // 406
          label: Spacebars.call(false),                                                                                // 407
          options: Spacebars.call("auto"),                                                                             // 408
          fields: Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "fields")),                                  // 409
          omitFields: Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "omitFields"))                           // 410
        };                                                                                                             // 411
      }, UI.block(function() {                                                                                         // 412
        var self = this;                                                                                               // 413
        return Spacebars.include(self.lookupTemplate("afQuickField"));                                                 // 414
      })), "\n          "), "\n        "), "\n      "), "\n      " ];                                                  // 415
    }));                                                                                                               // 416
  })), "\n      ", UI.If(function() {                                                                                  // 417
    return Spacebars.dataMustache(self.lookup("afArrayFieldHasLessThanMaximum"), Spacebars.kw({                        // 418
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 419
      autoform: Spacebars.dot(self.lookup("."), "autoform"),                                                           // 420
      minCount: Spacebars.dot(self.lookup("."), "atts", "minCount"),                                                   // 421
      maxCount: Spacebars.dot(self.lookup("."), "atts", "maxCount")                                                    // 422
    }));                                                                                                               // 423
  }, UI.block(function() {                                                                                             // 424
    var self = this;                                                                                                   // 425
    return [ "\n      ", HTML.LI({                                                                                     // 426
      "class": "list-group-item"                                                                                       // 427
    }, "\n        ", HTML.BUTTON({                                                                                     // 428
      "class": "btn btn-primary autoform-add-item",                                                                    // 429
      "data-autoform-field": function() {                                                                              // 430
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "atts", "name"));                                    // 431
      },                                                                                                               // 432
      "data-autoform-mincount": function() {                                                                           // 433
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "atts", "minCount"));                                // 434
      },                                                                                                               // 435
      "data-autoform-maxcount": function() {                                                                           // 436
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "atts", "maxCount"));                                // 437
      }                                                                                                                // 438
    }, HTML.SPAN({                                                                                                     // 439
      "class": "glyphicon glyphicon-plus"                                                                              // 440
    })), "\n      "), "\n      " ];                                                                                    // 441
  })), "\n    "), "\n  ");                                                                                             // 442
}));                                                                                                                   // 443
                                                                                                                       // 444
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/bootstrap3/bootstrap3.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
 * Template helpers for "bootstrap3" template                                                                          // 2
 */                                                                                                                    // 3
                                                                                                                       // 4
Template['afFieldLabel_bootstrap3'].atts = function bsFieldLabelAtts() {                                               // 5
  var atts = (this || {}).atts;                                                                                        // 6
  var labelAtts = _.omit(atts, 'name', 'autoform', 'template');                                                        // 7
  // Add bootstrap class if necessary                                                                                  // 8
  if (typeof labelAtts['class'] === "string") {                                                                        // 9
    labelAtts['class'] += " control-label"; //might be added twice but that shouldn't hurt anything                    // 10
  } else {                                                                                                             // 11
    labelAtts['class'] = "control-label";                                                                              // 12
  }                                                                                                                    // 13
  // Add "for" attribute if missing                                                                                    // 14
  labelAtts['for'] = labelAtts['for'] || atts['name'];                                                                 // 15
  return labelAtts;                                                                                                    // 16
};                                                                                                                     // 17
                                                                                                                       // 18
Template['afDeleteButton_bootstrap3'].atts = function bsDeleteButtonAtts() {                                           // 19
  var atts = this || {};                                                                                               // 20
  var buttonAtts = _.omit(atts, '_af', 'collection', 'doc', 'contentBlock', 'type', 'id');                             // 21
  // Add bootstrap class if necessary                                                                                  // 22
  if (typeof buttonAtts['class'] === "string") {                                                                       // 23
    buttonAtts['class'] += " btn btn-danger"; //might be added twice but that shouldn't hurt anything                  // 24
  } else {                                                                                                             // 25
    buttonAtts['class'] = "btn btn-danger";                                                                            // 26
  }                                                                                                                    // 27
  return buttonAtts;                                                                                                   // 28
};                                                                                                                     // 29
                                                                                                                       // 30
Template['quickForm_bootstrap3'].submitButtonAtts = function bsQuickFormSubmitButtonAtts() {                           // 31
  var qfAtts = this.atts;                                                                                              // 32
  var atts = {type: "submit"};                                                                                         // 33
  atts['class'] = 'btn btn-primary';                                                                                   // 34
  if (typeof qfAtts.buttonClasses === "string") {                                                                      // 35
    atts['class'] += ' ' + qfAtts.buttonClasses;                                                                       // 36
  }                                                                                                                    // 37
  return atts;                                                                                                         // 38
};                                                                                                                     // 39
                                                                                                                       // 40
Template['quickForm_bootstrap3'].qfNeedsButton = function bsQuickFormNeedsButton() {                                   // 41
  var submitType = this._af.submitType;                                                                                // 42
  return (submitType !== "readonly" && submitType !== "disabled");                                                     // 43
};                                                                                                                     // 44
                                                                                                                       // 45
function addFormControlAtts() {                                                                                        // 46
  var atts = _.clone(this.atts);                                                                                       // 47
  if (typeof atts["class"] === "string") {                                                                             // 48
    atts["class"] += " form-control";                                                                                  // 49
  } else {                                                                                                             // 50
    atts["class"] = "form-control";                                                                                    // 51
  }                                                                                                                    // 52
  return atts;                                                                                                         // 53
}                                                                                                                      // 54
                                                                                                                       // 55
Template["afFieldSelect_bootstrap3"].atts = addFormControlAtts;                                                        // 56
Template["afSelect_bootstrap3"].atts = addFormControlAtts;                                                             // 57
Template["afTextarea_bootstrap3"].atts = addFormControlAtts;                                                           // 58
Template["afInput_bootstrap3"].atts = addFormControlAtts;                                                              // 59
                                                                                                                       // 60
Template["afCheckbox_bootstrap3"].atts =                                                                               // 61
Template["afRadio_bootstrap3"].atts =                                                                                  // 62
Template["afCheckboxGroup_bootstrap3"].atts =                                                                          // 63
Template["afRadioGroup_bootstrap3"].atts = function () {                                                               // 64
  var atts = _.clone(this.atts);                                                                                       // 65
  if (this.selected) {                                                                                                 // 66
    atts.checked = "";                                                                                                 // 67
  }                                                                                                                    // 68
  return atts;                                                                                                         // 69
};                                                                                                                     // 70
                                                                                                                       // 71
Template["afSelect_bootstrap3"].optionAtts = function () {                                                             // 72
  var item = this                                                                                                      // 73
  var atts = {                                                                                                         // 74
    value: item.value                                                                                                  // 75
  };                                                                                                                   // 76
  if (item.selected) {                                                                                                 // 77
    atts.selected = "";                                                                                                // 78
  }                                                                                                                    // 79
  return atts;                                                                                                         // 80
};                                                                                                                     // 81
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/bootstrap3-span/template.bootstrap3-span.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__define__("afFieldLabel_bootstrap3-span", (function() {                                                      // 2
  var self = this;                                                                                                     // 3
  var template = this;                                                                                                 // 4
  return HTML.SPAN({                                                                                                   // 5
    $dynamic: [ function() {                                                                                           // 6
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 7
    } ]                                                                                                                // 8
  }, function() {                                                                                                      // 9
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 10
      name: Spacebars.dot(self.lookup("."), "atts", "name")                                                            // 11
    }));                                                                                                               // 12
  });                                                                                                                  // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/bootstrap3-span/bootstrap3-span.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
 * Template helpers for "bootstrap3-span" template                                                                     // 2
 */                                                                                                                    // 3
                                                                                                                       // 4
Template['afFieldLabel_bootstrap3-span'].atts = function() {                                                           // 5
  var atts = (_.clone(this || {})).atts;                                                                               // 6
  var spanAtts = _.omit(atts, 'name', 'autoform', 'template');                                                         // 7
  // Add bootstrap class if necessary; TODO use custom templates                                                       // 8
  if (typeof spanAtts['class'] === "string") {                                                                         // 9
    spanAtts['class'] += " control-label"; //might be added twice but that shouldn't hurt anything                     // 10
  } else {                                                                                                             // 11
    spanAtts['class'] = "control-label";                                                                               // 12
  }                                                                                                                    // 13
  return spanAtts;                                                                                                     // 14
};                                                                                                                     // 15
                                                                                                                       // 16
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/bootstrap3-horizontal/template.bootstrap3-horizontal.js                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__define__("quickForm_bootstrap3-horizontal", (function() {                                                   // 2
  var self = this;                                                                                                     // 3
  var template = this;                                                                                                 // 4
  return Spacebars.TemplateWith(function() {                                                                           // 5
    return Spacebars.call(self.lookup("qfAutoFormContext"));                                                           // 6
  }, UI.block(function() {                                                                                             // 7
    var self = this;                                                                                                   // 8
    return Spacebars.include(self.lookupTemplate("autoForm"), UI.block(function() {                                    // 9
      var self = this;                                                                                                 // 10
      return [ "\n    ", Spacebars.With(function() {                                                                   // 11
        return Spacebars.dataMustache(self.lookup("qfClasses"), self.lookup(".."));                                    // 12
      }, UI.block(function() {                                                                                         // 13
        var self = this;                                                                                               // 14
        return [ "\n    ", UI.Each(function() {                                                                        // 15
          return Spacebars.dataMustache(self.lookup("afFieldNames"), Spacebars.kw({                                    // 16
            fields: Spacebars.dot(self.lookup("..."), "atts", "fields"),                                               // 17
            omitFields: Spacebars.dot(self.lookup("..."), "atts", "omitFields"),                                       // 18
            autoform: self.lookup("..")                                                                                // 19
          }));                                                                                                         // 20
        }, UI.block(function() {                                                                                       // 21
          var self = this;                                                                                             // 22
          return [ "\n      ", Spacebars.TemplateWith(function() {                                                     // 23
            return {                                                                                                   // 24
              name: Spacebars.call(self.lookup(".")),                                                                  // 25
              options: Spacebars.call("auto"),                                                                         // 26
              template: Spacebars.call("bootstrap3-horizontal"),                                                       // 27
              "input-col-class": Spacebars.call(Spacebars.dot(self.lookup(".."), "inputClass")),                       // 28
              "label-class": Spacebars.call(Spacebars.dot(self.lookup(".."), "labelClass")),                           // 29
              fields: Spacebars.call(Spacebars.dot(self.lookup("...."), "atts", "fields")),                            // 30
              omitFields: Spacebars.call(Spacebars.dot(self.lookup("...."), "atts", "omitFields"))                     // 31
            };                                                                                                         // 32
          }, UI.block(function() {                                                                                     // 33
            var self = this;                                                                                           // 34
            return Spacebars.include(self.lookupTemplate("afQuickField"));                                             // 35
          })), "\n    " ];                                                                                             // 36
        })), "\n    " ];                                                                                               // 37
      })), "\n    ", UI.If(function() {                                                                                // 38
        return Spacebars.call(self.lookup("qfNeedsButton"));                                                           // 39
      }, UI.block(function() {                                                                                         // 40
        var self = this;                                                                                               // 41
        return [ "\n    ", Spacebars.With(function() {                                                                 // 42
          return Spacebars.dataMustache(self.lookup("qfClasses"), self.lookup(".."));                                  // 43
        }, UI.block(function() {                                                                                       // 44
          var self = this;                                                                                             // 45
          return [ "\n    ", HTML.DIV({                                                                                // 46
            "class": "form-group"                                                                                      // 47
          }, "\n      ", HTML.DIV({                                                                                    // 48
            "class": function() {                                                                                      // 49
              return Spacebars.mustache(self.lookup("labelClass"));                                                    // 50
            }                                                                                                          // 51
          }), "\n      ", HTML.DIV({                                                                                   // 52
            "class": function() {                                                                                      // 53
              return Spacebars.mustache(self.lookup("inputClass"));                                                    // 54
            }                                                                                                          // 55
          }, "\n        ", HTML.BUTTON({                                                                               // 56
            $dynamic: [ function() {                                                                                   // 57
              return Spacebars.attrMustache(self.lookup("submitButtonAtts"), self.lookup("..."));                      // 58
            } ]                                                                                                        // 59
          }, "\n        ", Spacebars.With(function() {                                                                 // 60
            return Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "buttonContent"));                          // 61
          }, UI.block(function() {                                                                                     // 62
            var self = this;                                                                                           // 63
            return [ "\n        ", function() {                                                                        // 64
              return Spacebars.mustache(self.lookup("."));                                                             // 65
            }, "\n        " ];                                                                                         // 66
          }), UI.block(function() {                                                                                    // 67
            var self = this;                                                                                           // 68
            return "\n        Submit\n        ";                                                                       // 69
          })), "\n        "), "\n      "), "\n    "), "\n    " ];                                                      // 70
        })), "\n    " ];                                                                                               // 71
      })), "\n  " ];                                                                                                   // 72
    }));                                                                                                               // 73
  }));                                                                                                                 // 74
}));                                                                                                                   // 75
                                                                                                                       // 76
Template.__define__("afQuickField_bootstrap3-horizontal", (function() {                                                // 77
  var self = this;                                                                                                     // 78
  var template = this;                                                                                                 // 79
  return HTML.DIV({                                                                                                    // 80
    "class": [ "form-group ", UI.If(function() {                                                                       // 81
      return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({                                    // 82
        name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                         // 83
        autoform: Spacebars.dot(self.lookup("."), "atts", "autoform")                                                  // 84
      }));                                                                                                             // 85
    }, UI.block(function() {                                                                                           // 86
      var self = this;                                                                                                 // 87
      return "has-error";                                                                                              // 88
    })) ]                                                                                                              // 89
  }, "\n    ", UI.If(function() {                                                                                      // 90
    return Spacebars.call(Spacebars.dot(self.lookup("."), "skipLabel"));                                               // 91
  }, UI.block(function() {                                                                                             // 92
    var self = this;                                                                                                   // 93
    return [ "\n    \n    ", HTML.LABEL({                                                                              // 94
      $dynamic: [ function() {                                                                                         // 95
        return Spacebars.attrMustache(self.lookup("afEmptyFieldLabelAtts"));                                           // 96
      } ]                                                                                                              // 97
    }), "\n    " ];                                                                                                    // 98
  }), UI.block(function() {                                                                                            // 99
    var self = this;                                                                                                   // 100
    return [ "\n    ", Spacebars.TemplateWith(function() {                                                             // 101
      return Spacebars.call(self.lookup("afFieldLabelAtts"));                                                          // 102
    }, UI.block(function() {                                                                                           // 103
      var self = this;                                                                                                 // 104
      return Spacebars.include(self.lookupTemplate("afFieldLabel"));                                                   // 105
    })), "\n    " ];                                                                                                   // 106
  })), "\n    ", HTML.DIV({                                                                                            // 107
    "class": function() {                                                                                              // 108
      return Spacebars.mustache(self.lookup("rightColumnClass"));                                                      // 109
    }                                                                                                                  // 110
  }, "\n        ", Spacebars.TemplateWith(function() {                                                                 // 111
    return Spacebars.call(self.lookup("afFieldInputAtts"));                                                            // 112
  }, UI.block(function() {                                                                                             // 113
    var self = this;                                                                                                   // 114
    return Spacebars.include(self.lookupTemplate("afFieldInput"));                                                     // 115
  })), "\n        ", HTML.SPAN({                                                                                       // 116
    "class": "help-block"                                                                                              // 117
  }, function() {                                                                                                      // 118
    return Spacebars.makeRaw(Spacebars.mustache(self.lookup("afFieldMessage"), Spacebars.kw({                          // 119
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 120
      autoform: Spacebars.dot(self.lookup("."), "atts", "autoform")                                                    // 121
    })));                                                                                                              // 122
  }), "\n    "), "\n  ");                                                                                              // 123
}));                                                                                                                   // 124
                                                                                                                       // 125
Template.__define__("afObjectField_bootstrap3-horizontal", (function() {                                               // 126
  var self = this;                                                                                                     // 127
  var template = this;                                                                                                 // 128
  return HTML.DIV({                                                                                                    // 129
    "class": [ "form-group ", UI.If(function() {                                                                       // 130
      return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({                                    // 131
        name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                         // 132
        autoform: Spacebars.dot(self.lookup("."), "atts", "autoform")                                                  // 133
      }));                                                                                                             // 134
    }, UI.block(function() {                                                                                           // 135
      var self = this;                                                                                                 // 136
      return "has-error";                                                                                              // 137
    })) ]                                                                                                              // 138
  }, "\n    ", Spacebars.TemplateWith(function() {                                                                     // 139
    return Spacebars.call(self.lookup("afFieldLabelAtts"));                                                            // 140
  }, UI.block(function() {                                                                                             // 141
    var self = this;                                                                                                   // 142
    return Spacebars.include(self.lookupTemplate("afFieldLabel"));                                                     // 143
  })), "\n    ", HTML.DIV({                                                                                            // 144
    "class": function() {                                                                                              // 145
      return Spacebars.mustache(self.lookup("rightColumnClass"));                                                      // 146
    }                                                                                                                  // 147
  }, "\n      ", HTML.DIV({                                                                                            // 148
    "class": "panel panel-default autoform-padding-fix"                                                                // 149
  }, "\n        ", HTML.DIV({                                                                                          // 150
    "class": "panel-body"                                                                                              // 151
  }, "\n        ", UI.Each(function() {                                                                                // 152
    return Spacebars.dataMustache(self.lookup("afFieldNames"), Spacebars.kw({                                          // 153
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 154
      fields: Spacebars.dot(self.lookup("."), "atts", "fields"),                                                       // 155
      omitFields: Spacebars.dot(self.lookup("."), "atts", "omitFields")                                                // 156
    }));                                                                                                               // 157
  }, UI.block(function() {                                                                                             // 158
    var self = this;                                                                                                   // 159
    return [ "\n          ", Spacebars.TemplateWith(function() {                                                       // 160
      return {                                                                                                         // 161
        name: Spacebars.call(self.lookup(".")),                                                                        // 162
        options: Spacebars.call("auto"),                                                                               // 163
        fields: Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "fields")),                                    // 164
        omitFields: Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "omitFields")),                            // 165
        template: Spacebars.call("bootstrap3")                                                                         // 166
      };                                                                                                               // 167
    }, UI.block(function() {                                                                                           // 168
      var self = this;                                                                                                 // 169
      return Spacebars.include(self.lookupTemplate("afQuickField"));                                                   // 170
    })), "\n        " ];                                                                                               // 171
  })), "\n        "), "\n      "), "\n    "), "\n  ");                                                                 // 172
}));                                                                                                                   // 173
                                                                                                                       // 174
Template.__define__("afArrayField_bootstrap3-horizontal", (function() {                                                // 175
  var self = this;                                                                                                     // 176
  var template = this;                                                                                                 // 177
  return HTML.DIV({                                                                                                    // 178
    "class": [ "form-group ", UI.If(function() {                                                                       // 179
      return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({                                    // 180
        name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                         // 181
        autoform: Spacebars.dot(self.lookup("."), "autoform")                                                          // 182
      }));                                                                                                             // 183
    }, UI.block(function() {                                                                                           // 184
      var self = this;                                                                                                 // 185
      return "has-error";                                                                                              // 186
    })) ]                                                                                                              // 187
  }, "\n    ", Spacebars.TemplateWith(function() {                                                                     // 188
    return Spacebars.call(self.lookup("afFieldLabelAtts"));                                                            // 189
  }, UI.block(function() {                                                                                             // 190
    var self = this;                                                                                                   // 191
    return Spacebars.include(self.lookupTemplate("afFieldLabel"));                                                     // 192
  })), "\n    ", HTML.DIV({                                                                                            // 193
    "class": function() {                                                                                              // 194
      return Spacebars.mustache(self.lookup("rightColumnClass"));                                                      // 195
    }                                                                                                                  // 196
  }, "\n      ", HTML.DIV({                                                                                            // 197
    "class": "panel panel-default autoform-padding-fix"                                                                // 198
  }, "\n        ", UI.If(function() {                                                                                  // 199
    return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({                                      // 200
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 201
      autoform: Spacebars.dot(self.lookup("."), "autoform")                                                            // 202
    }));                                                                                                               // 203
  }, UI.block(function() {                                                                                             // 204
    var self = this;                                                                                                   // 205
    return [ "\n        ", HTML.DIV({                                                                                  // 206
      "class": "panel-body has-error"                                                                                  // 207
    }, "\n          ", HTML.SPAN({                                                                                     // 208
      "class": "help-block"                                                                                            // 209
    }, function() {                                                                                                    // 210
      return Spacebars.makeRaw(Spacebars.mustache(self.lookup("afFieldMessage"), Spacebars.kw({                        // 211
        name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                         // 212
        autoform: Spacebars.dot(self.lookup("."), "autoform")                                                          // 213
      })));                                                                                                            // 214
    }), "\n        "), "\n        " ];                                                                                 // 215
  })), "\n        ", HTML.UL({                                                                                         // 216
    "class": "list-group"                                                                                              // 217
  }, "\n          ", Spacebars.TemplateWith(function() {                                                               // 218
    return {                                                                                                           // 219
      name: Spacebars.call(Spacebars.dot(self.lookup("."), "atts", "name")),                                           // 220
      minCount: Spacebars.call(Spacebars.dot(self.lookup("."), "atts", "minCount")),                                   // 221
      maxCount: Spacebars.call(Spacebars.dot(self.lookup("."), "atts", "maxCount"))                                    // 222
    };                                                                                                                 // 223
  }, UI.block(function() {                                                                                             // 224
    var self = this;                                                                                                   // 225
    return Spacebars.include(self.lookupTemplate("afEachArrayItem"), UI.block(function() {                             // 226
      var self = this;                                                                                                 // 227
      return [ "\n          ", HTML.LI({                                                                               // 228
        "class": "list-group-item autoform-array-item"                                                                 // 229
      }, "\n            ", HTML.DIV({                                                                                  // 230
        "class": "media"                                                                                               // 231
      }, "\n              ", UI.If(function() {                                                                        // 232
        return Spacebars.dataMustache(self.lookup("afArrayFieldHasMoreThanMinimum"), Spacebars.kw({                    // 233
          name: Spacebars.dot(self.lookup(".."), "atts", "name"),                                                      // 234
          autoform: Spacebars.dot(self.lookup(".."), "autoform"),                                                      // 235
          minCount: Spacebars.dot(self.lookup(".."), "atts", "minCount"),                                              // 236
          maxCount: Spacebars.dot(self.lookup(".."), "atts", "maxCount")                                               // 237
        }));                                                                                                           // 238
      }, UI.block(function() {                                                                                         // 239
        var self = this;                                                                                               // 240
        return [ "\n              ", HTML.BUTTON({                                                                     // 241
          "class": "btn btn-primary autoform-remove-item pull-left"                                                    // 242
        }, HTML.SPAN({                                                                                                 // 243
          "class": "glyphicon glyphicon-minus"                                                                         // 244
        })), "\n              " ];                                                                                     // 245
      })), "\n              ", HTML.DIV({                                                                              // 246
        "class": "media-body"                                                                                          // 247
      }, "\n                ", Spacebars.TemplateWith(function() {                                                     // 248
        return {                                                                                                       // 249
          name: Spacebars.call(Spacebars.dot(self.lookup("."), "name")),                                               // 250
          label: Spacebars.call(false)                                                                                 // 251
        };                                                                                                             // 252
      }, UI.block(function() {                                                                                         // 253
        var self = this;                                                                                               // 254
        return Spacebars.include(self.lookupTemplate("afQuickField"));                                                 // 255
      })), "\n              "), "\n            "), "\n          "), "\n          " ];                                  // 256
    }));                                                                                                               // 257
  })), "\n          ", UI.If(function() {                                                                              // 258
    return Spacebars.dataMustache(self.lookup("afArrayFieldHasLessThanMaximum"), Spacebars.kw({                        // 259
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 260
      autoform: Spacebars.dot(self.lookup("."), "autoform"),                                                           // 261
      minCount: Spacebars.dot(self.lookup("."), "atts", "minCount"),                                                   // 262
      maxCount: Spacebars.dot(self.lookup("."), "atts", "maxCount")                                                    // 263
    }));                                                                                                               // 264
  }, UI.block(function() {                                                                                             // 265
    var self = this;                                                                                                   // 266
    return [ "\n          ", HTML.LI({                                                                                 // 267
      "class": "list-group-item"                                                                                       // 268
    }, "\n            ", HTML.BUTTON({                                                                                 // 269
      "class": "btn btn-primary autoform-add-item",                                                                    // 270
      "data-autoform-field": function() {                                                                              // 271
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "atts", "name"));                                    // 272
      },                                                                                                               // 273
      "data-autoform-mincount": function() {                                                                           // 274
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "atts", "minCount"));                                // 275
      },                                                                                                               // 276
      "data-autoform-maxcount": function() {                                                                           // 277
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "atts", "maxCount"));                                // 278
      }                                                                                                                // 279
    }, HTML.SPAN({                                                                                                     // 280
      "class": "glyphicon glyphicon-plus"                                                                              // 281
    })), "\n          "), "\n          " ];                                                                            // 282
  })), "\n        "), "\n      "), "\n    "), "\n  ");                                                                 // 283
}));                                                                                                                   // 284
                                                                                                                       // 285
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/bootstrap3-horizontal/bootstrap3-horizontal.js                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template["quickForm_bootstrap3-horizontal"].qfAutoFormContext = function () {                                          // 1
  var ctx = _.clone(this.qfAutoFormContext || {});                                                                     // 2
  if (typeof ctx["class"] === "string") {                                                                              // 3
    ctx["class"] += " form-horizontal";                                                                                // 4
  } else {                                                                                                             // 5
    ctx["class"] = "form-horizontal";                                                                                  // 6
  }                                                                                                                    // 7
  if (ctx["input-col-class"])                                                                                          // 8
    delete ctx["input-col-class"];                                                                                     // 9
  if (ctx["label-class"])                                                                                              // 10
    delete ctx["label-class"];                                                                                         // 11
  return ctx;                                                                                                          // 12
};                                                                                                                     // 13
                                                                                                                       // 14
Template['quickForm_bootstrap3-horizontal'].submitButtonAtts = function bsQuickFormSubmitButtonAtts(qfContext) {       // 15
  var qfAtts = qfContext.atts;                                                                                         // 16
  var atts = {type: "submit"};                                                                                         // 17
  atts['class'] = 'btn btn-primary';                                                                                   // 18
  if (typeof qfAtts.buttonClasses === "string") {                                                                      // 19
    atts['class'] += ' ' + qfAtts.buttonClasses;                                                                       // 20
  }                                                                                                                    // 21
  return atts;                                                                                                         // 22
};                                                                                                                     // 23
                                                                                                                       // 24
Template['quickForm_bootstrap3-horizontal'].qfNeedsButton = function bsQuickFormNeedsButton() {                        // 25
  var submitType = this._af.submitType;                                                                                // 26
  return (submitType !== "readonly" && submitType !== "disabled");                                                     // 27
};                                                                                                                     // 28
                                                                                                                       // 29
Template['quickForm_bootstrap3-horizontal'].qfClasses = function bsQuickFormClasses(qfContext) {                       // 30
  // This helper is a workaround for the fact that it does not                                                         // 31
  // seem to work currently to do input-col-class=../atts.input-col-class                                              // 32
  // in the template because dashes in the attribute value cause problems.                                             // 33
  return {                                                                                                             // 34
    inputClass: qfContext.atts["input-col-class"],                                                                     // 35
    labelClass: qfContext.atts["label-class"]                                                                          // 36
  };                                                                                                                   // 37
};                                                                                                                     // 38
                                                                                                                       // 39
Template["afQuickField_bootstrap3-horizontal"].afFieldInputAtts = function () {                                        // 40
  var atts = _.clone(this.afFieldInputAtts || {});                                                                     // 41
  if ('input-col-class' in atts) {                                                                                     // 42
    delete atts['input-col-class'];                                                                                    // 43
  }                                                                                                                    // 44
  atts.template = "bootstrap3";                                                                                        // 45
  return atts;                                                                                                         // 46
};                                                                                                                     // 47
                                                                                                                       // 48
Template["afQuickField_bootstrap3-horizontal"].afFieldLabelAtts = function () {                                        // 49
  var atts = _.clone(this.afFieldLabelAtts || {});                                                                     // 50
  atts.template = "bootstrap3";                                                                                        // 51
  return atts;                                                                                                         // 52
};                                                                                                                     // 53
                                                                                                                       // 54
Template["afQuickField_bootstrap3-horizontal"].afEmptyFieldLabelAtts = function () {                                   // 55
  var atts = _.clone(this.afFieldLabelAtts || {});                                                                     // 56
  var labelAtts = _.omit(atts, 'name', 'autoform', 'template');                                                        // 57
  // Add bootstrap class if necessary                                                                                  // 58
  if (typeof labelAtts['class'] === "string") {                                                                        // 59
    labelAtts['class'] += " control-label"; //might be added twice but that shouldn't hurt anything                    // 60
  } else {                                                                                                             // 61
    labelAtts['class'] = "control-label";                                                                              // 62
  }                                                                                                                    // 63
  return labelAtts;                                                                                                    // 64
};                                                                                                                     // 65
                                                                                                                       // 66
Template["afQuickField_bootstrap3-horizontal"].rightColumnClass = function () {                                        // 67
  var atts = this.afFieldInputAtts || {};                                                                              // 68
  return atts['input-col-class'] || "";                                                                                // 69
};                                                                                                                     // 70
                                                                                                                       // 71
Template["afObjectField_bootstrap3-horizontal"].rightColumnClass = function () {                                       // 72
  var atts = this.atts || {};                                                                                          // 73
  return atts['input-col-class'] || "";                                                                                // 74
};                                                                                                                     // 75
                                                                                                                       // 76
Template["afObjectField_bootstrap3-horizontal"].afFieldLabelAtts = function () {                                       // 77
  var atts = this.atts;                                                                                                // 78
  return {                                                                                                             // 79
    template: "bootstrap3",                                                                                            // 80
    "class": atts["label-class"],                                                                                      // 81
    "name": atts.name                                                                                                  // 82
  };                                                                                                                   // 83
};                                                                                                                     // 84
                                                                                                                       // 85
Template["afArrayField_bootstrap3-horizontal"].rightColumnClass = function () {                                        // 86
  var atts = this.atts || {};                                                                                          // 87
  return atts['input-col-class'] || "";                                                                                // 88
};                                                                                                                     // 89
                                                                                                                       // 90
Template["afArrayField_bootstrap3-horizontal"].afFieldLabelAtts = function () {                                        // 91
  var atts = this.atts || {};                                                                                          // 92
  return {                                                                                                             // 93
    template: "bootstrap3",                                                                                            // 94
    "class": atts["label-class"],                                                                                      // 95
    "name": atts.name                                                                                                  // 96
  };                                                                                                                   // 97
};                                                                                                                     // 98
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/plain/template.plain.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__define__("quickForm_plain", (function() {                                                                   // 2
  var self = this;                                                                                                     // 3
  var template = this;                                                                                                 // 4
  return Spacebars.TemplateWith(function() {                                                                           // 5
    return Spacebars.call(Spacebars.dot(self.lookup("."), "qfAutoFormContext"));                                       // 6
  }, UI.block(function() {                                                                                             // 7
    var self = this;                                                                                                   // 8
    return Spacebars.include(self.lookupTemplate("autoForm"), UI.block(function() {                                    // 9
      var self = this;                                                                                                 // 10
      return [ "\n    ", UI.Each(function() {                                                                          // 11
        return Spacebars.dataMustache(self.lookup("afFieldNames"), Spacebars.kw({                                      // 12
          fields: Spacebars.dot(self.lookup(".."), "atts", "fields"),                                                  // 13
          omitFields: Spacebars.dot(self.lookup(".."), "atts", "omitFields")                                           // 14
        }));                                                                                                           // 15
      }, UI.block(function() {                                                                                         // 16
        var self = this;                                                                                               // 17
        return [ "\n      ", Spacebars.TemplateWith(function() {                                                       // 18
          return {                                                                                                     // 19
            name: Spacebars.call(self.lookup(".")),                                                                    // 20
            options: Spacebars.call("auto"),                                                                           // 21
            fields: Spacebars.call(Spacebars.dot(self.lookup("..."), "atts", "fields")),                               // 22
            omitFields: Spacebars.call(Spacebars.dot(self.lookup("..."), "atts", "omitFields"))                        // 23
          };                                                                                                           // 24
        }, UI.block(function() {                                                                                       // 25
          var self = this;                                                                                             // 26
          return Spacebars.include(self.lookupTemplate("afQuickField"));                                               // 27
        })), "\n    " ];                                                                                               // 28
      })), "\n    ", UI.If(function() {                                                                                // 29
        return Spacebars.call(self.lookup("qfNeedsButton"));                                                           // 30
      }, UI.block(function() {                                                                                         // 31
        var self = this;                                                                                               // 32
        return [ "\n    ", HTML.DIV("\n      ", HTML.BUTTON({                                                          // 33
          $dynamic: [ function() {                                                                                     // 34
            return Spacebars.attrMustache(self.lookup("submitButtonAtts"));                                            // 35
          } ]                                                                                                          // 36
        }, "\n      ", Spacebars.With(function() {                                                                     // 37
          return Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "buttonContent"));                            // 38
        }, UI.block(function() {                                                                                       // 39
          var self = this;                                                                                             // 40
          return [ "\n      ", function() {                                                                            // 41
            return Spacebars.mustache(self.lookup("."));                                                               // 42
          }, "\n      " ];                                                                                             // 43
        }), UI.block(function() {                                                                                      // 44
          var self = this;                                                                                             // 45
          return "\n      Submit\n      ";                                                                             // 46
        })), "\n      "), "\n    "), "\n    " ];                                                                       // 47
      })), "\n  " ];                                                                                                   // 48
    }));                                                                                                               // 49
  }));                                                                                                                 // 50
}));                                                                                                                   // 51
                                                                                                                       // 52
Template.__define__("afFieldLabel_plain", (function() {                                                                // 53
  var self = this;                                                                                                     // 54
  var template = this;                                                                                                 // 55
  return HTML.LABEL({                                                                                                  // 56
    $dynamic: [ function() {                                                                                           // 57
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 58
    } ]                                                                                                                // 59
  }, function() {                                                                                                      // 60
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 61
      name: Spacebars.dot(self.lookup("."), "atts", "name")                                                            // 62
    }));                                                                                                               // 63
  });                                                                                                                  // 64
}));                                                                                                                   // 65
                                                                                                                       // 66
Template.__define__("afCheckbox_plain", (function() {                                                                  // 67
  var self = this;                                                                                                     // 68
  var template = this;                                                                                                 // 69
  return HTML.DIV(HTML.INPUT({                                                                                         // 70
    type: "checkbox",                                                                                                  // 71
    value: function() {                                                                                                // 72
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                             // 73
    },                                                                                                                 // 74
    $dynamic: [ function() {                                                                                           // 75
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 76
    } ]                                                                                                                // 77
  }), " ", HTML.LABEL({                                                                                                // 78
    "for": function() {                                                                                                // 79
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "name"));                                              // 80
    }                                                                                                                  // 81
  }, function() {                                                                                                      // 82
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 83
      name: Spacebars.dot(self.lookup("."), "name")                                                                    // 84
    }));                                                                                                               // 85
  }));                                                                                                                 // 86
}));                                                                                                                   // 87
                                                                                                                       // 88
Template.__define__("afCheckboxGroup_plain", (function() {                                                             // 89
  var self = this;                                                                                                     // 90
  var template = this;                                                                                                 // 91
  return UI.Each(function() {                                                                                          // 92
    return Spacebars.call(Spacebars.dot(self.lookup("."), "items"));                                                   // 93
  }, UI.block(function() {                                                                                             // 94
    var self = this;                                                                                                   // 95
    return [ "\n    ", HTML.DIV(HTML.INPUT({                                                                           // 96
      type: "checkbox",                                                                                                // 97
      value: function() {                                                                                              // 98
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                           // 99
      },                                                                                                               // 100
      $dynamic: [ function() {                                                                                         // 101
        return Spacebars.attrMustache(self.lookup("atts"));                                                            // 102
      } ]                                                                                                              // 103
    }), " ", HTML.LABEL({                                                                                              // 104
      "for": function() {                                                                                              // 105
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "name"));                                            // 106
      }                                                                                                                // 107
    }, function() {                                                                                                    // 108
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "label"));                                             // 109
    })), "\n  " ];                                                                                                     // 110
  }));                                                                                                                 // 111
}));                                                                                                                   // 112
                                                                                                                       // 113
Template.__define__("afRadio_plain", (function() {                                                                     // 114
  var self = this;                                                                                                     // 115
  var template = this;                                                                                                 // 116
  return HTML.DIV(HTML.INPUT({                                                                                         // 117
    type: "checkbox",                                                                                                  // 118
    value: function() {                                                                                                // 119
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                             // 120
    },                                                                                                                 // 121
    $dynamic: [ function() {                                                                                           // 122
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 123
    } ]                                                                                                                // 124
  }), " ", HTML.LABEL({                                                                                                // 125
    "for": function() {                                                                                                // 126
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "name"));                                              // 127
    }                                                                                                                  // 128
  }, function() {                                                                                                      // 129
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 130
      name: Spacebars.dot(self.lookup("."), "name")                                                                    // 131
    }));                                                                                                               // 132
  }));                                                                                                                 // 133
}));                                                                                                                   // 134
                                                                                                                       // 135
Template.__define__("afRadioGroup_plain", (function() {                                                                // 136
  var self = this;                                                                                                     // 137
  var template = this;                                                                                                 // 138
  return UI.Each(function() {                                                                                          // 139
    return Spacebars.call(Spacebars.dot(self.lookup("."), "items"));                                                   // 140
  }, UI.block(function() {                                                                                             // 141
    var self = this;                                                                                                   // 142
    return [ "\n    ", HTML.DIV(HTML.INPUT({                                                                           // 143
      type: "checkbox",                                                                                                // 144
      value: function() {                                                                                              // 145
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                           // 146
      },                                                                                                               // 147
      $dynamic: [ function() {                                                                                         // 148
        return Spacebars.attrMustache(self.lookup("atts"));                                                            // 149
      } ]                                                                                                              // 150
    }), " ", HTML.LABEL({                                                                                              // 151
      "for": function() {                                                                                              // 152
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "name"));                                            // 153
      }                                                                                                                // 154
    }, function() {                                                                                                    // 155
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "label"));                                             // 156
    })), "\n  " ];                                                                                                     // 157
  }));                                                                                                                 // 158
}));                                                                                                                   // 159
                                                                                                                       // 160
Template.__define__("afContenteditable_plain", (function() {                                                           // 161
  var self = this;                                                                                                     // 162
  var template = this;                                                                                                 // 163
  return HTML.DIV({                                                                                                    // 164
    contenteditable: "true",                                                                                           // 165
    $dynamic: [ function() {                                                                                           // 166
      return Spacebars.attrMustache(Spacebars.dot(self.lookup("."), "atts"));                                          // 167
    } ]                                                                                                                // 168
  }, function() {                                                                                                      // 169
    return Spacebars.makeRaw(Spacebars.mustache(Spacebars.dot(self.lookup("."), "value")));                            // 170
  });                                                                                                                  // 171
}));                                                                                                                   // 172
                                                                                                                       // 173
Template.__define__("afFieldSelect_plain", (function() {                                                               // 174
  var self = this;                                                                                                     // 175
  var template = this;                                                                                                 // 176
  return HTML.SELECT({                                                                                                 // 177
    $dynamic: [ function() {                                                                                           // 178
      return Spacebars.attrMustache(Spacebars.dot(self.lookup("."), "atts"));                                          // 179
    } ]                                                                                                                // 180
  }, "\n    ", Spacebars.include(self.lookupTemplate("contentBlock")), "\n  ");                                        // 181
}));                                                                                                                   // 182
                                                                                                                       // 183
Template.__define__("afSelect_plain", (function() {                                                                    // 184
  var self = this;                                                                                                     // 185
  var template = this;                                                                                                 // 186
  return HTML.SELECT({                                                                                                 // 187
    $dynamic: [ function() {                                                                                           // 188
      return Spacebars.attrMustache(Spacebars.dot(self.lookup("."), "atts"));                                          // 189
    } ]                                                                                                                // 190
  }, "\n    ", UI.Each(function() {                                                                                    // 191
    return Spacebars.call(Spacebars.dot(self.lookup("."), "items"));                                                   // 192
  }, UI.block(function() {                                                                                             // 193
    var self = this;                                                                                                   // 194
    return [ "\n    ", HTML.OPTION({                                                                                   // 195
      $dynamic: [ function() {                                                                                         // 196
        return Spacebars.attrMustache(self.lookup("optionAtts"));                                                      // 197
      } ]                                                                                                              // 198
    }, function() {                                                                                                    // 199
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "label"));                                             // 200
    }), "\n    " ];                                                                                                    // 201
  })), "\n  ");                                                                                                        // 202
}));                                                                                                                   // 203
                                                                                                                       // 204
Template.__define__("afTextarea_plain", (function() {                                                                  // 205
  var self = this;                                                                                                     // 206
  var template = this;                                                                                                 // 207
  return HTML.TEXTAREA({                                                                                               // 208
    $dynamic: [ function() {                                                                                           // 209
      return Spacebars.attrMustache(Spacebars.dot(self.lookup("."), "atts"));                                          // 210
    } ]                                                                                                                // 211
  }, function() {                                                                                                      // 212
    return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                               // 213
  });                                                                                                                  // 214
}));                                                                                                                   // 215
                                                                                                                       // 216
Template.__define__("afInput_plain", (function() {                                                                     // 217
  var self = this;                                                                                                     // 218
  var template = this;                                                                                                 // 219
  return HTML.INPUT({                                                                                                  // 220
    type: function() {                                                                                                 // 221
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "type"));                                              // 222
    },                                                                                                                 // 223
    value: function() {                                                                                                // 224
      return Spacebars.mustache(Spacebars.dot(self.lookup("."), "value"));                                             // 225
    },                                                                                                                 // 226
    $dynamic: [ function() {                                                                                           // 227
      return Spacebars.attrMustache(Spacebars.dot(self.lookup("."), "atts"));                                          // 228
    } ]                                                                                                                // 229
  });                                                                                                                  // 230
}));                                                                                                                   // 231
                                                                                                                       // 232
Template.__define__("afDeleteButton_plain", (function() {                                                              // 233
  var self = this;                                                                                                     // 234
  var template = this;                                                                                                 // 235
  return Spacebars.TemplateWith(function() {                                                                           // 236
    return {                                                                                                           // 237
      collection: Spacebars.call(Spacebars.dot(self.lookup("."), "collection")),                                       // 238
      type: Spacebars.call("remove"),                                                                                  // 239
      doc: Spacebars.call(Spacebars.dot(self.lookup("."), "doc")),                                                     // 240
      id: Spacebars.call(Spacebars.dot(self.lookup("."), "id"))                                                        // 241
    };                                                                                                                 // 242
  }, UI.block(function() {                                                                                             // 243
    var self = this;                                                                                                   // 244
    return Spacebars.include(self.lookupTemplate("autoForm"), UI.block(function() {                                    // 245
      var self = this;                                                                                                 // 246
      return [ "\n  ", HTML.BUTTON({                                                                                   // 247
        type: "submit",                                                                                                // 248
        $dynamic: [ function() {                                                                                       // 249
          return Spacebars.attrMustache(self.lookup("atts"));                                                          // 250
        } ]                                                                                                            // 251
      }, UI.If(function() {                                                                                            // 252
        return Spacebars.call(Spacebars.dot(self.lookup(".."), "contentBlock"));                                       // 253
      }, UI.block(function() {                                                                                         // 254
        var self = this;                                                                                               // 255
        return Spacebars.include(function() {                                                                          // 256
          return Spacebars.dot(self.lookup(".."), "contentBlock");                                                     // 257
        });                                                                                                            // 258
      }), UI.block(function() {                                                                                        // 259
        var self = this;                                                                                               // 260
        return "Delete";                                                                                               // 261
      }))), "\n  " ];                                                                                                  // 262
    }));                                                                                                               // 263
  }));                                                                                                                 // 264
}));                                                                                                                   // 265
                                                                                                                       // 266
Template.__define__("afQuickField_plain", (function() {                                                                // 267
  var self = this;                                                                                                     // 268
  var template = this;                                                                                                 // 269
  return HTML.DIV({                                                                                                    // 270
    "class": UI.If(function() {                                                                                        // 271
      return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({                                    // 272
        name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                         // 273
        autoform: Spacebars.dot(self.lookup("."), "atts", "autoform")                                                  // 274
      }));                                                                                                             // 275
    }, UI.block(function() {                                                                                           // 276
      var self = this;                                                                                                 // 277
      return "has-error";                                                                                              // 278
    }))                                                                                                                // 279
  }, "\n    ", UI.Unless(function() {                                                                                  // 280
    return Spacebars.call(Spacebars.dot(self.lookup("."), "skipLabel"));                                               // 281
  }, UI.block(function() {                                                                                             // 282
    var self = this;                                                                                                   // 283
    return [ "\n    ", Spacebars.TemplateWith(function() {                                                             // 284
      return Spacebars.call(Spacebars.dot(self.lookup("."), "afFieldLabelAtts"));                                      // 285
    }, UI.block(function() {                                                                                           // 286
      var self = this;                                                                                                 // 287
      return Spacebars.include(self.lookupTemplate("afFieldLabel"));                                                   // 288
    })), "\n    " ];                                                                                                   // 289
  })), "\n    ", Spacebars.TemplateWith(function() {                                                                   // 290
    return Spacebars.call(Spacebars.dot(self.lookup("."), "afFieldInputAtts"));                                        // 291
  }, UI.block(function() {                                                                                             // 292
    var self = this;                                                                                                   // 293
    return Spacebars.include(self.lookupTemplate("afFieldInput"));                                                     // 294
  })), "\n    ", HTML.SPAN(function() {                                                                                // 295
    return Spacebars.makeRaw(Spacebars.mustache(self.lookup("afFieldMessage"), Spacebars.kw({                          // 296
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 297
      autoform: Spacebars.dot(self.lookup("."), "atts", "autoform")                                                    // 298
    })));                                                                                                              // 299
  }), "\n  ");                                                                                                         // 300
}));                                                                                                                   // 301
                                                                                                                       // 302
Template.__define__("afObjectField_plain", (function() {                                                               // 303
  var self = this;                                                                                                     // 304
  var template = this;                                                                                                 // 305
  return HTML.FIELDSET("\n    ", HTML.LEGEND(function() {                                                              // 306
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 307
      name: Spacebars.dot(self.lookup("."), "atts", "name")                                                            // 308
    }));                                                                                                               // 309
  }), "\n    ", UI.Each(function() {                                                                                   // 310
    return Spacebars.dataMustache(self.lookup("afFieldNames"), Spacebars.kw({                                          // 311
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 312
      fields: Spacebars.dot(self.lookup("."), "atts", "fields"),                                                       // 313
      omitFields: Spacebars.dot(self.lookup("."), "atts", "omitFields")                                                // 314
    }));                                                                                                               // 315
  }, UI.block(function() {                                                                                             // 316
    var self = this;                                                                                                   // 317
    return [ "\n      ", Spacebars.TemplateWith(function() {                                                           // 318
      return {                                                                                                         // 319
        name: Spacebars.call(self.lookup(".")),                                                                        // 320
        options: Spacebars.call("auto"),                                                                               // 321
        fields: Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "fields")),                                    // 322
        omitFields: Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "omitFields"))                             // 323
      };                                                                                                               // 324
    }, UI.block(function() {                                                                                           // 325
      var self = this;                                                                                                 // 326
      return Spacebars.include(self.lookupTemplate("afQuickField"));                                                   // 327
    })), "\n    " ];                                                                                                   // 328
  })), "\n  ");                                                                                                        // 329
}));                                                                                                                   // 330
                                                                                                                       // 331
Template.__define__("afArrayField_plain", (function() {                                                                // 332
  var self = this;                                                                                                     // 333
  var template = this;                                                                                                 // 334
  return HTML.FIELDSET("\n    ", HTML.LEGEND(function() {                                                              // 335
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 336
      name: Spacebars.dot(self.lookup("."), "atts", "name")                                                            // 337
    }));                                                                                                               // 338
  }), "\n    ", UI.If(function() {                                                                                     // 339
    return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({                                      // 340
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 341
      autoform: Spacebars.dot(self.lookup("."), "autoform")                                                            // 342
    }));                                                                                                               // 343
  }, UI.block(function() {                                                                                             // 344
    var self = this;                                                                                                   // 345
    return [ "\n    ", HTML.DIV({                                                                                      // 346
      "class": "autoform-array-field-error"                                                                            // 347
    }, "\n      ", function() {                                                                                        // 348
      return Spacebars.makeRaw(Spacebars.mustache(self.lookup("afFieldMessage"), Spacebars.kw({                        // 349
        name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                         // 350
        autoform: Spacebars.dot(self.lookup("."), "autoform")                                                          // 351
      })));                                                                                                            // 352
    }, "\n    "), "\n    " ];                                                                                          // 353
  })), "\n    ", Spacebars.TemplateWith(function() {                                                                   // 354
    return {                                                                                                           // 355
      name: Spacebars.call(Spacebars.dot(self.lookup("."), "atts", "name")),                                           // 356
      minCount: Spacebars.call(Spacebars.dot(self.lookup("."), "atts", "minCount")),                                   // 357
      maxCount: Spacebars.call(Spacebars.dot(self.lookup("."), "atts", "maxCount"))                                    // 358
    };                                                                                                                 // 359
  }, UI.block(function() {                                                                                             // 360
    var self = this;                                                                                                   // 361
    return Spacebars.include(self.lookupTemplate("afEachArrayItem"), UI.block(function() {                             // 362
      var self = this;                                                                                                 // 363
      return [ "\n    ", HTML.DIV({                                                                                    // 364
        "class": "autoform-array-item"                                                                                 // 365
      }, "\n      ", Spacebars.TemplateWith(function() {                                                               // 366
        return {                                                                                                       // 367
          name: Spacebars.call(Spacebars.dot(self.lookup("."), "name")),                                               // 368
          label: Spacebars.call(false)                                                                                 // 369
        };                                                                                                             // 370
      }, UI.block(function() {                                                                                         // 371
        var self = this;                                                                                               // 372
        return Spacebars.include(self.lookupTemplate("afQuickField"));                                                 // 373
      })), "\n      ", UI.If(function() {                                                                              // 374
        return Spacebars.dataMustache(self.lookup("afArrayFieldHasMoreThanMinimum"), Spacebars.kw({                    // 375
          name: Spacebars.dot(self.lookup(".."), "atts", "name"),                                                      // 376
          autoform: Spacebars.dot(self.lookup(".."), "autoform"),                                                      // 377
          minCount: Spacebars.dot(self.lookup(".."), "atts", "minCount"),                                              // 378
          maxCount: Spacebars.dot(self.lookup(".."), "atts", "maxCount")                                               // 379
        }));                                                                                                           // 380
      }, UI.block(function() {                                                                                         // 381
        var self = this;                                                                                               // 382
        return [ "\n      ", HTML.BUTTON({                                                                             // 383
          "class": "autoform-remove-item"                                                                              // 384
        }, "Remove"), "\n      " ];                                                                                    // 385
      })), "\n    "), "\n    " ];                                                                                      // 386
    }));                                                                                                               // 387
  })), "\n    ", UI.If(function() {                                                                                    // 388
    return Spacebars.dataMustache(self.lookup("afArrayFieldHasLessThanMaximum"), Spacebars.kw({                        // 389
      name: Spacebars.dot(self.lookup("."), "atts", "name"),                                                           // 390
      autoform: Spacebars.dot(self.lookup("."), "autoform"),                                                           // 391
      minCount: Spacebars.dot(self.lookup("."), "atts", "minCount"),                                                   // 392
      maxCount: Spacebars.dot(self.lookup("."), "atts", "maxCount")                                                    // 393
    }));                                                                                                               // 394
  }, UI.block(function() {                                                                                             // 395
    var self = this;                                                                                                   // 396
    return [ "\n    ", HTML.DIV({                                                                                      // 397
      style: "margin-top: 20px;"                                                                                       // 398
    }, "\n      ", HTML.BUTTON({                                                                                       // 399
      "class": "autoform-add-item",                                                                                    // 400
      "data-autoform-field": function() {                                                                              // 401
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "atts", "name"));                                    // 402
      },                                                                                                               // 403
      "data-autoform-mincount": function() {                                                                           // 404
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "atts", "minCount"));                                // 405
      },                                                                                                               // 406
      "data-autoform-maxcount": function() {                                                                           // 407
        return Spacebars.mustache(Spacebars.dot(self.lookup("."), "atts", "maxCount"));                                // 408
      }                                                                                                                // 409
    }, "Add"), "\n    "), "\n    " ];                                                                                  // 410
  })), "\n  ");                                                                                                        // 411
}));                                                                                                                   // 412
                                                                                                                       // 413
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/plain/plain.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
 * Template helpers for "plain" template                                                                               // 2
 */                                                                                                                    // 3
                                                                                                                       // 4
Template['afFieldLabel_plain'].atts = function plFieldLabelAtts() {                                                    // 5
  var atts = (_.clone(this || {})).atts;                                                                               // 6
  var labelAtts = _.omit(atts, 'name', 'autoform', 'template');                                                        // 7
  // Add "for" attribute if missing                                                                                    // 8
  labelAtts['for'] = labelAtts['for'] || atts['name'];                                                                 // 9
  return labelAtts;                                                                                                    // 10
};                                                                                                                     // 11
                                                                                                                       // 12
Template['afDeleteButton_plain'].atts = function plDeleteButtonAtts() {                                                // 13
  var atts = this || {};                                                                                               // 14
  return _.omit(atts, '_af', 'collection', 'doc', 'contentBlock', 'type', 'id');                                       // 15
};                                                                                                                     // 16
                                                                                                                       // 17
Template['quickForm_plain'].submitButtonAtts = function plQuickFormSubmitButtonAtts() {                                // 18
  var qfAtts = this.atts;                                                                                              // 19
  var atts = {type: "submit"};                                                                                         // 20
  if (typeof qfAtts.buttonClasses === "string") {                                                                      // 21
    atts['class'] = qfAtts.buttonClasses;                                                                              // 22
  }                                                                                                                    // 23
  return atts;                                                                                                         // 24
};                                                                                                                     // 25
                                                                                                                       // 26
Template['quickForm_plain'].qfNeedsButton = function plQuickFormNeedsButton() {                                        // 27
  var submitType = this._af.submitType;                                                                                // 28
  return (submitType !== "readonly" && submitType !== "disabled");                                                     // 29
};                                                                                                                     // 30
                                                                                                                       // 31
Template["afCheckbox_plain"].atts =                                                                                    // 32
Template["afRadio_plain"].atts = function () {                                                                         // 33
  var atts = _.clone(this.atts);                                                                                       // 34
  atts.checked = this.selected;                                                                                        // 35
  return atts;                                                                                                         // 36
};                                                                                                                     // 37
                                                                                                                       // 38
Template["afSelect_plain"].optionAtts = function () {                                                                  // 39
  var item = this                                                                                                      // 40
  var atts = {                                                                                                         // 41
    value: item.value                                                                                                  // 42
  };                                                                                                                   // 43
  if (item.selected) {                                                                                                 // 44
    atts.selected = "";                                                                                                // 45
  }                                                                                                                    // 46
  return atts;                                                                                                         // 47
};                                                                                                                     // 48
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/plain-fieldset/template.plain-fieldset.js                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__define__("quickForm_plain-fieldset", (function() {                                                          // 2
  var self = this;                                                                                                     // 3
  var template = this;                                                                                                 // 4
  return Spacebars.TemplateWith(function() {                                                                           // 5
    return Spacebars.call(Spacebars.dot(self.lookup("."), "qfAutoFormContext"));                                       // 6
  }, UI.block(function() {                                                                                             // 7
    var self = this;                                                                                                   // 8
    return Spacebars.include(self.lookupTemplate("autoForm"), UI.block(function() {                                    // 9
      var self = this;                                                                                                 // 10
      return [ "\n    ", HTML.FIELDSET("\n      ", Spacebars.With(function() {                                         // 11
        return Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "legend"));                                     // 12
      }, UI.block(function() {                                                                                         // 13
        var self = this;                                                                                               // 14
        return [ "\n      ", HTML.LEGEND(function() {                                                                  // 15
          return Spacebars.mustache(self.lookup("."));                                                                 // 16
        }), "\n      " ];                                                                                              // 17
      })), "\n      ", UI.Each(function() {                                                                            // 18
        return Spacebars.dataMustache(self.lookup("afFieldNames"), Spacebars.kw({                                      // 19
          fields: Spacebars.dot(self.lookup(".."), "atts", "fields"),                                                  // 20
          omitFields: Spacebars.dot(self.lookup(".."), "atts", "omitFields")                                           // 21
        }));                                                                                                           // 22
      }, UI.block(function() {                                                                                         // 23
        var self = this;                                                                                               // 24
        return [ "\n        ", Spacebars.TemplateWith(function() {                                                     // 25
          return {                                                                                                     // 26
            name: Spacebars.call(self.lookup(".")),                                                                    // 27
            options: Spacebars.call("auto"),                                                                           // 28
            fields: Spacebars.call(Spacebars.dot(self.lookup("..."), "atts", "fields")),                               // 29
            omitFields: Spacebars.call(Spacebars.dot(self.lookup("..."), "atts", "omitFields"))                        // 30
          };                                                                                                           // 31
        }, UI.block(function() {                                                                                       // 32
          var self = this;                                                                                             // 33
          return Spacebars.include(self.lookupTemplate("afQuickField"));                                               // 34
        })), "\n      " ];                                                                                             // 35
      })), "\n    "), "\n    ", UI.If(function() {                                                                     // 36
        return Spacebars.call(self.lookup("qfNeedsButton"));                                                           // 37
      }, UI.block(function() {                                                                                         // 38
        var self = this;                                                                                               // 39
        return [ "\n    ", HTML.DIV("\n      ", HTML.BUTTON({                                                          // 40
          $dynamic: [ function() {                                                                                     // 41
            return Spacebars.attrMustache(self.lookup("submitButtonAtts"));                                            // 42
          } ]                                                                                                          // 43
        }, "\n        ", Spacebars.With(function() {                                                                   // 44
          return Spacebars.call(Spacebars.dot(self.lookup(".."), "atts", "buttonContent"));                            // 45
        }, UI.block(function() {                                                                                       // 46
          var self = this;                                                                                             // 47
          return [ "\n        ", function() {                                                                          // 48
            return Spacebars.mustache(self.lookup("."));                                                               // 49
          }, "\n        " ];                                                                                           // 50
        }), UI.block(function() {                                                                                      // 51
          var self = this;                                                                                             // 52
          return "\n        Submit\n        ";                                                                         // 53
        })), "\n      "), "\n    "), "\n    " ];                                                                       // 54
      })), "\n  " ];                                                                                                   // 55
    }));                                                                                                               // 56
  }));                                                                                                                 // 57
}));                                                                                                                   // 58
                                                                                                                       // 59
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/plain-fieldset/plain-fieldset.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template['quickForm_plain-fieldset'].submitButtonAtts = function plfsQuickFormSubmitButtonAtts() {                     // 1
  var qfAtts = this.atts;                                                                                              // 2
  var atts = {type: "submit"};                                                                                         // 3
  if (typeof qfAtts.buttonClasses === "string") {                                                                      // 4
    atts['class'] = qfAtts.buttonClasses;                                                                              // 5
  }                                                                                                                    // 6
  return atts;                                                                                                         // 7
};                                                                                                                     // 8
                                                                                                                       // 9
Template['quickForm_plain-fieldset'].qfNeedsButton = function plfsQuickFormNeedsButton() {                             // 10
  var submitType = this._af.submitType;                                                                                // 11
  return (submitType !== "readonly" && submitType !== "disabled");                                                     // 12
};                                                                                                                     // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/plain-span/template.plain-span.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__define__("afFieldLabel_plain-span", (function() {                                                           // 2
  var self = this;                                                                                                     // 3
  var template = this;                                                                                                 // 4
  return HTML.SPAN({                                                                                                   // 5
    $dynamic: [ function() {                                                                                           // 6
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 7
    } ]                                                                                                                // 8
  }, function() {                                                                                                      // 9
    return Spacebars.mustache(self.lookup("afFieldLabelText"), Spacebars.kw({                                          // 10
      name: Spacebars.dot(self.lookup("."), "atts", "name")                                                            // 11
    }));                                                                                                               // 12
  });                                                                                                                  // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/templates/plain-span/plain-span.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
 * Template helpers for "plain-span" template                                                                          // 2
 */                                                                                                                    // 3
                                                                                                                       // 4
Template['afFieldLabel_plain-span'].atts = function() {                                                                // 5
  var atts = (this || {}).atts;                                                                                        // 6
  return _.omit(atts, 'name', 'autoform', 'template');                                                                 // 7
};                                                                                                                     // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/template.autoform.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__define__("autoForm", (function() {                                                                          // 2
  var self = this;                                                                                                     // 3
  var template = this;                                                                                                 // 4
  return HTML.FORM({                                                                                                   // 5
    $dynamic: [ function() {                                                                                           // 6
      return Spacebars.attrMustache(self.lookup("atts"));                                                              // 7
    } ]                                                                                                                // 8
  }, "\n  	", Spacebars.With(function() {                                                                              // 9
    return Spacebars.dataMustache(self.lookup("innerContext"), self.lookup(".."));                                     // 10
  }, UI.block(function() {                                                                                             // 11
    var self = this;                                                                                                   // 12
    return [ "\n    ", UI.InTemplateScope(template, Spacebars.TemplateWith(function() {                                // 13
      return Spacebars.call(self.lookup("."));                                                                         // 14
    }, UI.block(function() {                                                                                           // 15
      var self = this;                                                                                                 // 16
      return Spacebars.include(function() {                                                                            // 17
        return template.__content;                                                                                     // 18
      });                                                                                                              // 19
    }))), "\n    " ];                                                                                                  // 20
  })), "\n  ");                                                                                                        // 21
}));                                                                                                                   // 22
                                                                                                                       // 23
Template.__define__("quickForm", (function() {                                                                         // 24
  var self = this;                                                                                                     // 25
  var template = this;                                                                                                 // 26
  return Spacebars.With(function() {                                                                                   // 27
    return Spacebars.dataMustache(self.lookup("getTemplate"), "quickForm", Spacebars.dot(self.lookup("."), "template"));
  }, UI.block(function() {                                                                                             // 29
    var self = this;                                                                                                   // 30
    return [ "\n    ", Spacebars.With(function() {                                                                     // 31
      return Spacebars.dataMustache(self.lookup("innerContext"), self.lookup(".."));                                   // 32
    }, UI.block(function() {                                                                                           // 33
      var self = this;                                                                                                 // 34
      return [ "\n      ", Spacebars.include(self.lookupTemplate("..")), "\n    " ];                                   // 35
    })), "\n  " ];                                                                                                     // 36
  }));                                                                                                                 // 37
}));                                                                                                                   // 38
                                                                                                                       // 39
Template.__define__("afDeleteButton", (function() {                                                                    // 40
  var self = this;                                                                                                     // 41
  var template = this;                                                                                                 // 42
  return Spacebars.With(function() {                                                                                   // 43
    return Spacebars.dataMustache(self.lookup("getTemplate"), "afDeleteButton", Spacebars.dot(self.lookup("."), "template"));
  }, UI.block(function() {                                                                                             // 45
    var self = this;                                                                                                   // 46
    return [ "\n    ", Spacebars.With(function() {                                                                     // 47
      return Spacebars.dataMustache(self.lookup("innerContext"), self.lookup(".."), template.__content);               // 48
    }, UI.block(function() {                                                                                           // 49
      var self = this;                                                                                                 // 50
      return [ "\n      ", Spacebars.include(self.lookupTemplate("..")), "\n    " ];                                   // 51
    })), "\n  " ];                                                                                                     // 52
  }));                                                                                                                 // 53
}));                                                                                                                   // 54
                                                                                                                       // 55
Template.__define__("afQuickField", (function() {                                                                      // 56
  var self = this;                                                                                                     // 57
  var template = this;                                                                                                 // 58
  return [ "\n  ", Spacebars.With(function() {                                                                         // 59
    return Spacebars.dataMustache(self.lookup("_af_findAutoForm"), "afQuickField", self.lookup(".."), self.lookup("..."), self.lookup("...."), self.lookup("....."), self.lookup("......"));
  }, UI.block(function() {                                                                                             // 61
    var self = this;                                                                                                   // 62
    return [ "\n    ", UI.If(function() {                                                                              // 63
      return Spacebars.dataMustache(self.lookup("isGroup"), Spacebars.kw({                                             // 64
        autoform: self.lookup("."),                                                                                    // 65
        atts: self.lookup("..")                                                                                        // 66
      }));                                                                                                             // 67
    }, UI.block(function() {                                                                                           // 68
      var self = this;                                                                                                 // 69
      return [ "\n      ", Spacebars.TemplateWith(function() {                                                         // 70
        return Spacebars.call(self.lookup(".."));                                                                      // 71
      }, UI.block(function() {                                                                                         // 72
        var self = this;                                                                                               // 73
        return Spacebars.include(self.lookupTemplate("afObjectField"));                                                // 74
      })), "\n    " ];                                                                                                 // 75
    }), UI.block(function() {                                                                                          // 76
      var self = this;                                                                                                 // 77
      return [ "\n      ", UI.If(function() {                                                                          // 78
        return Spacebars.dataMustache(self.lookup("isFieldArray"), Spacebars.kw({                                      // 79
          autoform: self.lookup("."),                                                                                  // 80
          atts: self.lookup("..")                                                                                      // 81
        }));                                                                                                           // 82
      }, UI.block(function() {                                                                                         // 83
        var self = this;                                                                                               // 84
        return [ "\n        ", Spacebars.TemplateWith(function() {                                                     // 85
          return Spacebars.call(self.lookup(".."));                                                                    // 86
        }, UI.block(function() {                                                                                       // 87
          var self = this;                                                                                             // 88
          return Spacebars.include(self.lookupTemplate("afArrayField"));                                               // 89
        })), "\n      " ];                                                                                             // 90
      }), UI.block(function() {                                                                                        // 91
        var self = this;                                                                                               // 92
        return [ "\n        ", Spacebars.With(function() {                                                             // 93
          return Spacebars.dataMustache(self.lookup("innerContext"), Spacebars.kw({                                    // 94
            autoform: self.lookup("."),                                                                                // 95
            atts: self.lookup("..")                                                                                    // 96
          }));                                                                                                         // 97
        }, UI.block(function() {                                                                                       // 98
          var self = this;                                                                                             // 99
          return [ "\n          ", Spacebars.With(function() {                                                         // 100
            return Spacebars.dataMustache(self.lookup("getTemplate"), "afQuickField", Spacebars.dot(self.lookup("..."), "template"), Spacebars.dot(self.lookup("..."), "name"), self.lookup(".."));
          }, UI.block(function() {                                                                                     // 102
            var self = this;                                                                                           // 103
            return [ "\n            ", Spacebars.With(function() {                                                     // 104
              return Spacebars.call(self.lookup(".."));                                                                // 105
            }, UI.block(function() {                                                                                   // 106
              var self = this;                                                                                         // 107
              return [ "\n            ", Spacebars.include(self.lookupTemplate("..")), "\n            " ];             // 108
            })), "\n          " ];                                                                                     // 109
          })), "\n        " ];                                                                                         // 110
        })), "\n      " ];                                                                                             // 111
      })), "\n    " ];                                                                                                 // 112
    })), "\n  " ];                                                                                                     // 113
  })) ];                                                                                                               // 114
}));                                                                                                                   // 115
                                                                                                                       // 116
Template.__define__("afObjectField", (function() {                                                                     // 117
  var self = this;                                                                                                     // 118
  var template = this;                                                                                                 // 119
  return [ "\n  ", Spacebars.With(function() {                                                                         // 120
    return Spacebars.dataMustache(self.lookup("_af_findAutoForm"), "afObjectField", self.lookup(".."), self.lookup("..."), self.lookup("...."), self.lookup("....."), self.lookup("......"));
  }, UI.block(function() {                                                                                             // 122
    var self = this;                                                                                                   // 123
    return [ "\n    ", Spacebars.With(function() {                                                                     // 124
      return Spacebars.dataMustache(self.lookup("getTemplate"), "afObjectField", Spacebars.dot(self.lookup(".."), "template"), Spacebars.dot(self.lookup(".."), "name"), self.lookup("."));
    }, UI.block(function() {                                                                                           // 126
      var self = this;                                                                                                 // 127
      return [ "\n      ", Spacebars.With(function() {                                                                 // 128
        return {                                                                                                       // 129
          autoform: Spacebars.call(self.lookup("..")),                                                                 // 130
          atts: Spacebars.call(self.lookup("..."))                                                                     // 131
        };                                                                                                             // 132
      }, UI.block(function() {                                                                                         // 133
        var self = this;                                                                                               // 134
        return [ "\n        ", Spacebars.include(self.lookupTemplate("..")), "\n      " ];                             // 135
      })), "\n    " ];                                                                                                 // 136
    })), "\n  " ];                                                                                                     // 137
  })) ];                                                                                                               // 138
}));                                                                                                                   // 139
                                                                                                                       // 140
Template.__define__("afArrayField", (function() {                                                                      // 141
  var self = this;                                                                                                     // 142
  var template = this;                                                                                                 // 143
  return [ "\n  ", Spacebars.With(function() {                                                                         // 144
    return Spacebars.dataMustache(self.lookup("_af_findAutoForm"), "afArrayField", self.lookup(".."), self.lookup("..."), self.lookup("...."), self.lookup("....."), self.lookup("......"));
  }, UI.block(function() {                                                                                             // 146
    var self = this;                                                                                                   // 147
    return [ "\n    ", Spacebars.With(function() {                                                                     // 148
      return Spacebars.dataMustache(self.lookup("getTemplate"), "afArrayField", Spacebars.dot(self.lookup(".."), "template"), Spacebars.dot(self.lookup(".."), "name"), self.lookup("."));
    }, UI.block(function() {                                                                                           // 150
      var self = this;                                                                                                 // 151
      return [ "\n      ", Spacebars.With(function() {                                                                 // 152
        return Spacebars.dataMustache(self.lookup("innerContext"), Spacebars.kw({                                      // 153
          autoform: self.lookup(".."),                                                                                 // 154
          atts: self.lookup("...")                                                                                     // 155
        }));                                                                                                           // 156
      }, UI.block(function() {                                                                                         // 157
        var self = this;                                                                                               // 158
        return [ "\n        ", Spacebars.include(self.lookupTemplate("..")), "\n      " ];                             // 159
      })), "\n    " ];                                                                                                 // 160
    })), "\n  " ];                                                                                                     // 161
  })) ];                                                                                                               // 162
}));                                                                                                                   // 163
                                                                                                                       // 164
Template.__define__("afFieldInput", (function() {                                                                      // 165
  var self = this;                                                                                                     // 166
  var template = this;                                                                                                 // 167
  return [ "\n  ", Spacebars.With(function() {                                                                         // 168
    return Spacebars.dataMustache(self.lookup("_af_findAutoForm"), "afFieldInput", self.lookup(".."), self.lookup("..."), self.lookup("...."), self.lookup("....."), self.lookup("......"));
  }, UI.block(function() {                                                                                             // 170
    var self = this;                                                                                                   // 171
    return [ "\n	  ", Spacebars.With(function() {                                                                      // 172
      return Spacebars.dataMustache(self.lookup("innerContext"), Spacebars.kw({                                        // 173
        autoform: self.lookup("."),                                                                                    // 174
        atts: self.lookup("..")                                                                                        // 175
      }));                                                                                                             // 176
    }, UI.block(function() {                                                                                           // 177
      var self = this;                                                                                                 // 178
      return [ "\n	    ", Spacebars.With(function() {                                                                  // 179
        return Spacebars.dataMustache(self.lookup("getTemplate"), self.lookup("getTemplateType"), Spacebars.dot(self.lookup("..."), "template"), Spacebars.dot(self.lookup("..."), "name"), self.lookup(".."));
      }, UI.block(function() {                                                                                         // 181
        var self = this;                                                                                               // 182
        return [ "\n        ", Spacebars.With(function() {                                                             // 183
          return Spacebars.call(self.lookup(".."));                                                                    // 184
        }, UI.block(function() {                                                                                       // 185
          var self = this;                                                                                             // 186
          return [ "\n        ", Spacebars.include(self.lookupTemplate("..")), "\n        " ];                         // 187
        })), "\n	    " ];                                                                                              // 188
      })), "\n	  " ];                                                                                                  // 189
    })), "\n  " ];                                                                                                     // 190
  })) ];                                                                                                               // 191
}));                                                                                                                   // 192
                                                                                                                       // 193
Template.__define__("afFieldSelect", (function() {                                                                     // 194
  var self = this;                                                                                                     // 195
  var template = this;                                                                                                 // 196
  return [ "\n  ", Spacebars.With(function() {                                                                         // 197
    return Spacebars.dataMustache(self.lookup("_af_findAutoForm"), "afFieldSelect", self.lookup(".."), self.lookup("..."), self.lookup("...."), self.lookup("....."), self.lookup("......"));
  }, UI.block(function() {                                                                                             // 199
    var self = this;                                                                                                   // 200
    return [ "\n	  ", Spacebars.With(function() {                                                                      // 201
      return Spacebars.dataMustache(self.lookup("innerContext"), Spacebars.kw({                                        // 202
        autoform: self.lookup("."),                                                                                    // 203
        atts: self.lookup(".."),                                                                                       // 204
        contentBlock: template.__content                                                                               // 205
      }));                                                                                                             // 206
    }, UI.block(function() {                                                                                           // 207
      var self = this;                                                                                                 // 208
      return [ "\n	    ", Spacebars.With(function() {                                                                  // 209
        return Spacebars.dataMustache(self.lookup("getTemplate"), "afFieldSelect", Spacebars.dot(self.lookup("..."), "template"), Spacebars.dot(self.lookup("..."), "name"), self.lookup(".."));
      }, UI.block(function() {                                                                                         // 211
        var self = this;                                                                                               // 212
        return [ "\n	      ", Spacebars.With(function() {                                                              // 213
          return Spacebars.call(self.lookup(".."));                                                                    // 214
        }, UI.block(function() {                                                                                       // 215
          var self = this;                                                                                             // 216
          return [ "\n        ", Spacebars.include(self.lookupTemplate("..")), "\n        " ];                         // 217
        })), "\n	    " ];                                                                                              // 218
      })), "\n	  " ];                                                                                                  // 219
    })), "\n  " ];                                                                                                     // 220
  })) ];                                                                                                               // 221
}));                                                                                                                   // 222
                                                                                                                       // 223
Template.__define__("afFieldLabel", (function() {                                                                      // 224
  var self = this;                                                                                                     // 225
  var template = this;                                                                                                 // 226
  return [ "\n  ", Spacebars.With(function() {                                                                         // 227
    return Spacebars.dataMustache(self.lookup("_af_findAutoForm"), "afFieldLabel", self.lookup(".."), self.lookup("..."), self.lookup("...."), self.lookup("....."), self.lookup("......"));
  }, UI.block(function() {                                                                                             // 229
    var self = this;                                                                                                   // 230
    return [ "\n    ", Spacebars.With(function() {                                                                     // 231
      return Spacebars.dataMustache(self.lookup("getTemplate"), "afFieldLabel", Spacebars.dot(self.lookup(".."), "template"), Spacebars.dot(self.lookup(".."), "name"), self.lookup("."));
    }, UI.block(function() {                                                                                           // 233
      var self = this;                                                                                                 // 234
      return [ "\n      ", Spacebars.With(function() {                                                                 // 235
        return {                                                                                                       // 236
          autoform: Spacebars.call(self.lookup("..")),                                                                 // 237
          atts: Spacebars.call(self.lookup("..."))                                                                     // 238
        };                                                                                                             // 239
      }, UI.block(function() {                                                                                         // 240
        var self = this;                                                                                               // 241
        return [ "\n        ", Spacebars.include(self.lookupTemplate("..")), "\n      " ];                             // 242
      })), "\n    " ];                                                                                                 // 243
    })), "\n  " ];                                                                                                     // 244
  })) ];                                                                                                               // 245
}));                                                                                                                   // 246
                                                                                                                       // 247
Template.__define__("afEachArrayItem", (function() {                                                                   // 248
  var self = this;                                                                                                     // 249
  var template = this;                                                                                                 // 250
  return [ "\n  \n  ", Spacebars.With(function() {                                                                     // 251
    return Spacebars.dataMustache(self.lookup("_af_findAutoForm"), "afEachArrayItem", self.lookup(".."), self.lookup("..."), self.lookup("...."), self.lookup("....."), self.lookup("......"));
  }, UI.block(function() {                                                                                             // 253
    var self = this;                                                                                                   // 254
    return [ "\n    ", Spacebars.With(function() {                                                                     // 255
      return Spacebars.dataMustache(self.lookup("innerContext"), Spacebars.kw({                                        // 256
        autoform: self.lookup("."),                                                                                    // 257
        atts: self.lookup("..")                                                                                        // 258
      }));                                                                                                             // 259
    }, UI.block(function() {                                                                                           // 260
      var self = this;                                                                                                 // 261
      return [ "\n      ", UI.Each(function() {                                                                        // 262
        return Spacebars.call(self.lookup("."));                                                                       // 263
      }, UI.block(function() {                                                                                         // 264
        var self = this;                                                                                               // 265
        return [ "\n      ", UI.If(function() {                                                                        // 266
          return Spacebars.call(Spacebars.dot(self.lookup("."), "removed"));                                           // 267
        }, UI.block(function() {                                                                                       // 268
          var self = this;                                                                                             // 269
          return [ "\n      ", HTML.INPUT({                                                                            // 270
            type: "hidden",                                                                                            // 271
            name: function() {                                                                                         // 272
              return Spacebars.mustache(Spacebars.dot(self.lookup("."), "name"));                                      // 273
            },                                                                                                         // 274
            "data-schema-key": function() {                                                                            // 275
              return Spacebars.mustache(Spacebars.dot(self.lookup("."), "name"));                                      // 276
            },                                                                                                         // 277
            "data-null-value": "true",                                                                                 // 278
            value: ""                                                                                                  // 279
          }), "\n      " ];                                                                                            // 280
        }), UI.block(function() {                                                                                      // 281
          var self = this;                                                                                             // 282
          return [ "\n      ", UI.InTemplateScope(template, Spacebars.TemplateWith(function() {                        // 283
            return Spacebars.call(self.lookup("."));                                                                   // 284
          }, UI.block(function() {                                                                                     // 285
            var self = this;                                                                                           // 286
            return Spacebars.include(function() {                                                                      // 287
              return template.__content;                                                                               // 288
            });                                                                                                        // 289
          }))), "\n      " ];                                                                                          // 290
        })), "\n      " ];                                                                                             // 291
      })), "\n    " ];                                                                                                 // 292
    })), "\n  " ];                                                                                                     // 293
  })) ];                                                                                                               // 294
}));                                                                                                                   // 295
                                                                                                                       // 296
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/utility.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Utility = {                                                                                                            // 1
  /**                                                                                                                  // 2
   * @method Utility.cleanNulls                                                                                        // 3
   * @private                                                                                                          // 4
   * @param {Object} doc - Source object                                                                               // 5
   * @returns {Object}                                                                                                 // 6
   *                                                                                                                   // 7
   * Returns an object in which all properties with null, undefined, or empty                                          // 8
   * string values have been removed, recursively.                                                                     // 9
   */                                                                                                                  // 10
  cleanNulls: function cleanNulls(doc, isArray) {                                                                      // 11
    var newDoc = isArray ? [] : {};                                                                                    // 12
    _.each(doc, function(val, key) {                                                                                   // 13
      if (!_.isArray(val) && !(val instanceof Date) && _.isObject(val)) {                                              // 14
        val = cleanNulls(val, false); //recurse into objects                                                           // 15
        if (!_.isEmpty(val)) {                                                                                         // 16
          newDoc[key] = val;                                                                                           // 17
        }                                                                                                              // 18
      } else if (_.isArray(val)) {                                                                                     // 19
        val = cleanNulls(val, true); //recurse into arrays                                                             // 20
        if (!_.isEmpty(val)) {                                                                                         // 21
          newDoc[key] = val;                                                                                           // 22
        }                                                                                                              // 23
      } else if (!Utility.isNullUndefinedOrEmptyString(val)) {                                                         // 24
        newDoc[key] = val;                                                                                             // 25
      }                                                                                                                // 26
    });                                                                                                                // 27
    return newDoc;                                                                                                     // 28
  },                                                                                                                   // 29
  /**                                                                                                                  // 30
   * @method Utility.reportNulls                                                                                       // 31
   * @private                                                                                                          // 32
   * @param {Object} flatDoc - An object with no properties that are also objects.                                     // 33
   * @returns {Object} An object in which the keys represent the keys in the                                           // 34
   * original object that were null, undefined, or empty strings, and the value                                        // 35
   * of each key is "".                                                                                                // 36
   */                                                                                                                  // 37
  reportNulls: function reportNulls(flatDoc) {                                                                         // 38
    var nulls = {};                                                                                                    // 39
    // Loop through the flat doc                                                                                       // 40
    _.each(flatDoc, function(val, key) {                                                                               // 41
      // If value is undefined, null, or an empty string, report this as null so it will be unset                      // 42
      if (Utility.isNullUndefinedOrEmptyString(val)) {                                                                 // 43
        nulls[key] = "";                                                                                               // 44
      }                                                                                                                // 45
      // If value is an array in which all the values recursively are undefined, null, or an empty string, report this as null so it will be unset
      else if (_.isArray(val) && Utility.cleanNulls(val, true).length === 0) {                                         // 47
        nulls[key] = "";                                                                                               // 48
      }                                                                                                                // 49
    });                                                                                                                // 50
    return nulls;                                                                                                      // 51
  },                                                                                                                   // 52
  /**                                                                                                                  // 53
   * @method Utility.docToModifier                                                                                     // 54
   * @private                                                                                                          // 55
   * @param {Object} doc - An object to be converted into a MongoDB modifier                                           // 56
   * @returns {Object} A MongoDB modifier.                                                                             // 57
   *                                                                                                                   // 58
   * Converts an object into a modifier by flattening it, putting keys with                                            // 59
   * null, undefined, and empty string values into `modifier.$unset`, and                                              // 60
   * putting the rest of the keys into `modifier.$set`.                                                                // 61
   */                                                                                                                  // 62
  docToModifier: function docToModifier(doc) {                                                                         // 63
    var modifier = {};                                                                                                 // 64
                                                                                                                       // 65
    // Flatten doc                                                                                                     // 66
    var mDoc = new MongoObject(doc);                                                                                   // 67
    var flatDoc = mDoc.getFlatObject({keepArrays: true});                                                              // 68
    mDoc = null;                                                                                                       // 69
    // Get a list of null, undefined, and empty string values so we can unset them instead                             // 70
    var nulls = Utility.reportNulls(flatDoc);                                                                          // 71
    flatDoc = Utility.cleanNulls(flatDoc);                                                                             // 72
                                                                                                                       // 73
    if (!_.isEmpty(flatDoc)) {                                                                                         // 74
      modifier.$set = flatDoc;                                                                                         // 75
    }                                                                                                                  // 76
    if (!_.isEmpty(nulls)) {                                                                                           // 77
      modifier.$unset = nulls;                                                                                         // 78
    }                                                                                                                  // 79
    return modifier;                                                                                                   // 80
  },                                                                                                                   // 81
  /**                                                                                                                  // 82
   * @method Utility.getSelectValues                                                                                   // 83
   * @private                                                                                                          // 84
   * @param {Element} select - DOM Element from which to get current values                                            // 85
   * @returns {string[]}                                                                                               // 86
   *                                                                                                                   // 87
   * Gets a string array of all the selected values in a given `select` DOM element.                                   // 88
   */                                                                                                                  // 89
  getSelectValues: function getSelectValues(select) {                                                                  // 90
    var result = [];                                                                                                   // 91
    var options = select && select.options || [];                                                                      // 92
    var opt;                                                                                                           // 93
                                                                                                                       // 94
    for (var i = 0, ln = options.length; i < ln; i++) {                                                                // 95
      opt = options[i];                                                                                                // 96
                                                                                                                       // 97
      if (opt.selected) {                                                                                              // 98
        result.push(opt.value || opt.text);                                                                            // 99
      }                                                                                                                // 100
    }                                                                                                                  // 101
    return result;                                                                                                     // 102
  },                                                                                                                   // 103
  /**                                                                                                                  // 104
   * @method Utility.maybeNum                                                                                          // 105
   * @private                                                                                                          // 106
   * @param {string} val                                                                                               // 107
   * @returns {String|Number}                                                                                          // 108
   *                                                                                                                   // 109
   * If the given string can be converted to a number, returns the number.                                             // 110
   * Otherwise returns the string.                                                                                     // 111
   */                                                                                                                  // 112
  maybeNum: function maybeNum(val) {                                                                                   // 113
    // Convert val to a number if possible; otherwise, just use the value                                              // 114
    var floatVal = parseFloat(val);                                                                                    // 115
    if (!isNaN(floatVal)) {                                                                                            // 116
      return floatVal;                                                                                                 // 117
    } else {                                                                                                           // 118
      return val;                                                                                                      // 119
    }                                                                                                                  // 120
  },                                                                                                                   // 121
  /**                                                                                                                  // 122
   * @method Utility.lookup                                                                                            // 123
   * @private                                                                                                          // 124
   * @param {Any} obj                                                                                                  // 125
   * @returns {Any}                                                                                                    // 126
   *                                                                                                                   // 127
   * If `obj` is a string, returns the value of the property with that                                                 // 128
   * name on the `window` object. Otherwise returns `obj`.                                                             // 129
   */                                                                                                                  // 130
  lookup: function lookup(obj) {                                                                                       // 131
    if (typeof obj === "string") {                                                                                     // 132
      if (!window || !window[obj]) {                                                                                   // 133
        throw new Error(obj + " is not in the window scope");                                                          // 134
      }                                                                                                                // 135
      return window[obj];                                                                                              // 136
    }                                                                                                                  // 137
    return obj;                                                                                                        // 138
  },                                                                                                                   // 139
  /**                                                                                                                  // 140
   * @method Utility.getDefs                                                                                           // 141
   * @private                                                                                                          // 142
   * @param {SimpleSchema} ss                                                                                          // 143
   * @param {String} name                                                                                              // 144
   * @return {Object} Schema definitions object                                                                        // 145
   *                                                                                                                   // 146
   * Returns the schema definitions object from a SimpleSchema instance. Equivalent to calling                         // 147
   * `ss.schema(name)` but handles throwing errors if `name` is not a string or is not a valid                         // 148
   * field name for this SimpleSchema instance.                                                                        // 149
   */                                                                                                                  // 150
  getDefs: function getDefs(ss, name) {                                                                                // 151
    if (typeof name !== "string") {                                                                                    // 152
      throw new Error("Invalid field name: (not a string)");                                                           // 153
    }                                                                                                                  // 154
                                                                                                                       // 155
    var defs = ss.schema(name);                                                                                        // 156
    if (!defs)                                                                                                         // 157
      throw new Error("Invalid field name: " + name);                                                                  // 158
    return defs;                                                                                                       // 159
  },                                                                                                                   // 160
  /**                                                                                                                  // 161
   * @method Utility.objAffectsKey                                                                                     // 162
   * @private                                                                                                          // 163
   * @param  {Object} obj                                                                                              // 164
   * @param  {String} key                                                                                              // 165
   * @return {Boolean}                                                                                                 // 166
   * @todo should make this a static method in MongoObject                                                             // 167
   */                                                                                                                  // 168
  objAffectsKey: function objAffectsKey(obj, key) {                                                                    // 169
    var mDoc = new MongoObject(obj);                                                                                   // 170
    return mDoc.affectsKey(key);                                                                                       // 171
  },                                                                                                                   // 172
  /**                                                                                                                  // 173
   * @method Utility.expandObj                                                                                         // 174
   * @private                                                                                                          // 175
   * @param  {Object} doc                                                                                              // 176
   * @return {Object}                                                                                                  // 177
   *                                                                                                                   // 178
   * Takes a flat object and returns an expanded version of it.                                                        // 179
   */                                                                                                                  // 180
  expandObj: function expandObj(doc) {                                                                                 // 181
    var newDoc = {}, subkeys, subkey, subkeylen, nextPiece, current;                                                   // 182
    _.each(doc, function(val, key) {                                                                                   // 183
      subkeys = key.split(".");                                                                                        // 184
      subkeylen = subkeys.length;                                                                                      // 185
      current = newDoc;                                                                                                // 186
      for (var i = 0; i < subkeylen; i++) {                                                                            // 187
        subkey = subkeys[i];                                                                                           // 188
        if (typeof current[subkey] !== "undefined" && !_.isObject(current[subkey])) {                                  // 189
          break; //already set for some reason; leave it alone                                                         // 190
        }                                                                                                              // 191
        if (i === subkeylen - 1) {                                                                                     // 192
          //last iteration; time to set the value                                                                      // 193
          current[subkey] = val;                                                                                       // 194
        } else {                                                                                                       // 195
          //see if the next piece is a number                                                                          // 196
          nextPiece = subkeys[i + 1];                                                                                  // 197
          nextPiece = parseInt(nextPiece, 10);                                                                         // 198
          if (isNaN(nextPiece) && !_.isObject(current[subkey])) {                                                      // 199
            current[subkey] = {};                                                                                      // 200
          } else if (!isNaN(nextPiece) && !_.isArray(current[subkey])) {                                               // 201
            current[subkey] = [];                                                                                      // 202
          }                                                                                                            // 203
        }                                                                                                              // 204
        current = current[subkey];                                                                                     // 205
      }                                                                                                                // 206
    });                                                                                                                // 207
    return newDoc;                                                                                                     // 208
  },                                                                                                                   // 209
  /**                                                                                                                  // 210
   * @method Utility.compactArrays                                                                                     // 211
   * @private                                                                                                          // 212
   * @param  {Object} obj                                                                                              // 213
   * @return {undefined}                                                                                               // 214
   *                                                                                                                   // 215
   * Edits the object by reference, compacting any arrays at any level recursively.                                    // 216
   */                                                                                                                  // 217
  compactArrays: function compactArrays(obj) {                                                                         // 218
    if (_.isObject(obj)) {                                                                                             // 219
      _.each(obj, function (val, key) {                                                                                // 220
        if (_.isArray(val)) {                                                                                          // 221
          obj[key] = _.without(val, void 0, null);                                                                     // 222
          _.each(obj[key], function (arrayItem) {                                                                      // 223
            compactArrays(arrayItem);                                                                                  // 224
          });                                                                                                          // 225
        } else if (!(val instanceof Date) && _.isObject(val)) {                                                        // 226
          //recurse into objects                                                                                       // 227
          compactArrays(val);                                                                                          // 228
        }                                                                                                              // 229
      });                                                                                                              // 230
    }                                                                                                                  // 231
  },                                                                                                                   // 232
  /**                                                                                                                  // 233
   * @method Utility.getSimpleSchemaFromContext                                                                        // 234
   * @private                                                                                                          // 235
   * @param  {Object} context                                                                                          // 236
   * @return {SimpleSchema}                                                                                            // 237
   *                                                                                                                   // 238
   * Given a context object that may or may not have schema and collection properties,                                 // 239
   * returns a SimpleSchema instance or throws an error if one cannot be obtained.                                     // 240
   */                                                                                                                  // 241
  getSimpleSchemaFromContext: function getSimpleSchemaFromContext(context, formId) {                                   // 242
    // If schema attribute, use that                                                                                   // 243
    var ss = Utility.lookup(context.schema);                                                                           // 244
    if (ss) {                                                                                                          // 245
      if (ss instanceof SimpleSchema) {                                                                                // 246
        return ss;                                                                                                     // 247
      } else {                                                                                                         // 248
        throw new Error('AutoForm: schema attribute for form with id "' + formId + '" is not a SimpleSchema instance');
      }                                                                                                                // 250
    }                                                                                                                  // 251
    // If no schema attribute, use the schema attached to the collection                                               // 252
    var collection = Utility.lookup(context.collection);                                                               // 253
    if (collection) {                                                                                                  // 254
      if (collection instanceof Meteor.Collection) {                                                                   // 255
        if (typeof collection.simpleSchema === 'function') {                                                           // 256
          return collection.simpleSchema();                                                                            // 257
        } else {                                                                                                       // 258
          throw new Error('AutoForm: collection attribute for form with id "' + formId + '" refers to a collection that does not have a schema. You might have forgotten to attach a schema to the collection or you might need to add the collection2 package to your app.');
        }                                                                                                              // 260
      } else {                                                                                                         // 261
        throw new Error('AutoForm: collection attribute for form with id "' + formId + '" is not a Meteor.Collection instance');
      }                                                                                                                // 263
    }                                                                                                                  // 264
    // If we got this far, we have no schema so throw an error                                                         // 265
    throw new Error('AutoForm: form with id "' + formId + '" needs either "schema" or "collection" attribute');        // 266
  },                                                                                                                   // 267
  /**                                                                                                                  // 268
   * @method Utility.isNullUndefinedOrEmptyString                                                                      // 269
   * @private                                                                                                          // 270
   * @param  {Any} val                                                                                                 // 271
   * @return {Boolean}                                                                                                 // 272
   *                                                                                                                   // 273
   * Returns `true` if the value is null, undefined, or an empty string                                                // 274
   */                                                                                                                  // 275
  isNullUndefinedOrEmptyString: function isNullUndefinedOrEmptyString(val) {                                           // 276
    return (val === void 0 || val === null || (typeof val === "string" && val.length === 0));                          // 277
  },                                                                                                                   // 278
  /**                                                                                                                  // 279
   * @method Utility.isValidDateString                                                                                 // 280
   * @private                                                                                                          // 281
   * @param  {String}  dateString                                                                                      // 282
   * @return {Boolean}                                                                                                 // 283
   *                                                                                                                   // 284
   * Returns `true` if dateString is a "valid date string"                                                             // 285
   */                                                                                                                  // 286
  isValidDateString: function isValidDateString(dateString) {                                                          // 287
    var m = moment(dateString, 'YYYY-MM-DD', true);                                                                    // 288
    return m && m.isValid();                                                                                           // 289
  },                                                                                                                   // 290
  /**                                                                                                                  // 291
   * @method Utility.isValidTimeString                                                                                 // 292
   * @private                                                                                                          // 293
   * @param  {String}  timeString                                                                                      // 294
   * @return {Boolean}                                                                                                 // 295
   *                                                                                                                   // 296
   * Returns `true` if timeString is a "valid time string"                                                             // 297
   */                                                                                                                  // 298
  isValidTimeString: function isValidTimeString(timeString) {                                                          // 299
    if (typeof timeString !== "string")                                                                                // 300
      return false;                                                                                                    // 301
                                                                                                                       // 302
    //this reg ex actually allows a few invalid hours/minutes/seconds, but                                             // 303
    //we can catch that when parsing                                                                                   // 304
    var regEx = /^[0-2][0-9]:[0-5][0-9](:[0-5][0-9](\.[0-9]{1,3})?)?$/;                                                // 305
    return regEx.test(timeString);                                                                                     // 306
  },                                                                                                                   // 307
  /**                                                                                                                  // 308
   * @method  Utility.dateToDateString                                                                                 // 309
   * @private                                                                                                          // 310
   * @param  {Date} date                                                                                               // 311
   * @return {String}                                                                                                  // 312
   *                                                                                                                   // 313
   * Returns a "valid date string" representing the local date.                                                        // 314
   */                                                                                                                  // 315
  dateToDateString: function dateToDateString(date) {                                                                  // 316
    var m = (date.getMonth() + 1);                                                                                     // 317
    if (m < 10) {                                                                                                      // 318
      m = "0" + m;                                                                                                     // 319
    }                                                                                                                  // 320
    var d = date.getDate();                                                                                            // 321
    if (d < 10) {                                                                                                      // 322
      d = "0" + d;                                                                                                     // 323
    }                                                                                                                  // 324
    return date.getFullYear() + '-' + m + '-' + d;                                                                     // 325
  },                                                                                                                   // 326
  /**                                                                                                                  // 327
   * @method  Utility.dateToDateStringUTC                                                                              // 328
   * @private                                                                                                          // 329
   * @param  {Date} date                                                                                               // 330
   * @return {String}                                                                                                  // 331
   *                                                                                                                   // 332
   * Returns a "valid date string" representing the date converted to the UTC time zone.                               // 333
   */                                                                                                                  // 334
  dateToDateStringUTC: function dateToDateStringUTC(date) {                                                            // 335
    var m = (date.getUTCMonth() + 1);                                                                                  // 336
    if (m < 10) {                                                                                                      // 337
      m = "0" + m;                                                                                                     // 338
    }                                                                                                                  // 339
    var d = date.getUTCDate();                                                                                         // 340
    if (d < 10) {                                                                                                      // 341
      d = "0" + d;                                                                                                     // 342
    }                                                                                                                  // 343
    return date.getUTCFullYear() + '-' + m + '-' + d;                                                                  // 344
  },                                                                                                                   // 345
  /**                                                                                                                  // 346
   * @method  Utility.dateToNormalizedForcedUtcGlobalDateAndTimeString                                                 // 347
   * @private                                                                                                          // 348
   * @param  {Date} date                                                                                               // 349
   * @return {String}                                                                                                  // 350
   *                                                                                                                   // 351
   * Returns a "valid normalized forced-UTC global date and time string" representing the time                         // 352
   * converted to the UTC time zone and expressed as the shortest possible string for the given                        // 353
   * time (e.g. omitting the seconds component entirely if the given time is zero seconds past the minute).            // 354
   *                                                                                                                   // 355
   * http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#date-and-time-state-(type=datetime)
   * http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#valid-normalized-forced-utc-global-date-and-time-string
   */                                                                                                                  // 358
  dateToNormalizedForcedUtcGlobalDateAndTimeString: function dateToNormalizedForcedUtcGlobalDateAndTimeString(date) {  // 359
    return moment(date).utc().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");                                                  // 360
  },                                                                                                                   // 361
  /**                                                                                                                  // 362
   * @method  Utility.isValidNormalizedForcedUtcGlobalDateAndTimeString                                                // 363
   * @private                                                                                                          // 364
   * @param  {String} dateString                                                                                       // 365
   * @return {Boolean}                                                                                                 // 366
   *                                                                                                                   // 367
   * Returns true if dateString is a "valid normalized forced-UTC global date and time string"                         // 368
   */                                                                                                                  // 369
  isValidNormalizedForcedUtcGlobalDateAndTimeString: function isValidNormalizedForcedUtcGlobalDateAndTimeString(dateString) {
    if (typeof dateString !== "string")                                                                                // 371
      return false;                                                                                                    // 372
                                                                                                                       // 373
    var datePart = dateString.substring(0, 10);                                                                        // 374
    var tPart = dateString.substring(10, 11);                                                                          // 375
    var timePart = dateString.substring(11, dateString.length - 1);                                                    // 376
    var zPart = dateString.substring(dateString.length - 1);                                                           // 377
    return Utility.isValidDateString(datePart) && tPart === "T" && Utility.isValidTimeString(timePart) && zPart === "Z";
  },                                                                                                                   // 379
  /**                                                                                                                  // 380
   * @method Utility.dateToNormalizedLocalDateAndTimeString                                                            // 381
   * @private                                                                                                          // 382
   * @param {Date} date                                                                                                // 383
   * @param {String} offset A valid offset string (to pass to moment.zone)                                             // 384
   * @return {String}                                                                                                  // 385
   *                                                                                                                   // 386
   * Returns a "valid normalized local date and time string".                                                          // 387
   */                                                                                                                  // 388
  dateToNormalizedLocalDateAndTimeString: function dateToNormalizedLocalDateAndTimeString(date, offset) {              // 389
    var m = moment(date);                                                                                              // 390
    m.zone(offset);                                                                                                    // 391
    return m.format("YYYY-MM-DD[T]hh:mm:ss.SSS");                                                                      // 392
  },                                                                                                                   // 393
  /**                                                                                                                  // 394
   * @method  Utility.isValidNormalizedLocalDateAndTimeString                                                          // 395
   * @private                                                                                                          // 396
   * @param  {String} dtString                                                                                         // 397
   * @return {Boolean}                                                                                                 // 398
   *                                                                                                                   // 399
   * Returns true if dtString is a "valid normalized local date and time string"                                       // 400
   */                                                                                                                  // 401
  isValidNormalizedLocalDateAndTimeString: function isValidNormalizedLocalDateAndTimeString(dtString) {                // 402
    if (typeof dtString !== "string")                                                                                  // 403
      return false;                                                                                                    // 404
                                                                                                                       // 405
    var datePart = dtString.substring(0, 10);                                                                          // 406
    var tPart = dtString.substring(10, 11);                                                                            // 407
    var timePart = dtString.substring(11, dtString.length);                                                            // 408
    return Utility.isValidDateString(datePart) && tPart === "T" && Utility.isValidTimeString(timePart);                // 409
  },                                                                                                                   // 410
  /**                                                                                                                  // 411
   * @method Utility.normalizeContext                                                                                  // 412
   * @private                                                                                                          // 413
   * @param  {Object} context A context object, potentially with an `atts` or `autoform` property.                     // 414
   * @param {String} name The name of the helper or component we're calling from, for in a potential error message.    // 415
   * @return {Object} Normalized context object                                                                        // 416
   *                                                                                                                   // 417
   * Returns an object with `afc`, `af`, and `atts` properties, normalized from whatever object is passed in.          // 418
   * This helps deal with the fact that we have to pass the ancestor autoform's context to different                   // 419
   * helpers and components in different ways, but in all cases we want to get access to it and throw                  // 420
   * an error if we can't find an autoform context.                                                                    // 421
   */                                                                                                                  // 422
  normalizeContext: function autoFormNormalizeContext(context, name) {                                                 // 423
    context = context || {};                                                                                           // 424
    var atts = context.atts || context;                                                                                // 425
    var afContext = atts.autoform || context.autoform;                                                                 // 426
    if (!afContext || !afContext._af) {                                                                                // 427
      throw new Error(name + " must be used within an autoForm block");                                                // 428
    }                                                                                                                  // 429
                                                                                                                       // 430
    var defs = Utility.getDefs(afContext._af.ss, atts.name); //defs will not be undefined                              // 431
                                                                                                                       // 432
    // For array fields, `allowedValues` is on the array item definition                                               // 433
    if (defs.type === Array) {                                                                                         // 434
      var itemDefs = Utility.getDefs(afContext._af.ss, atts.name + ".$");                                              // 435
      var allowedValues = itemDefs.allowedValues;                                                                      // 436
    } else {                                                                                                           // 437
      var allowedValues = defs.allowedValues;                                                                          // 438
    }                                                                                                                  // 439
                                                                                                                       // 440
    var defaultAttributes = defs.autoform || {};                                                                       // 441
                                                                                                                       // 442
    // This is where we add default attributes specified in                                                            // 443
    // defs.autoform. We don't add them for afFieldLabel.                                                              // 444
    if (name === "afFieldLabel") {                                                                                     // 445
      if (_.has(atts, "options")) {                                                                                    // 446
        delete atts.options;                                                                                           // 447
      }                                                                                                                // 448
    } else {                                                                                                           // 449
      // If options="auto", we want to use defs.autoform.options                                                       // 450
      // if specified and otherwise fall back to "allowed"                                                             // 451
      if (defaultAttributes.options && atts.options === "auto")                                                        // 452
        delete atts.options;                                                                                           // 453
      // "autoform" option in the schema provides default atts                                                         // 454
      atts = _.extend({}, defaultAttributes, atts);                                                                    // 455
      // If still set to "auto", then there were no options in defs, so we use "allowed"                               // 456
      if (atts.options === "auto") {                                                                                   // 457
        if (allowedValues) {                                                                                           // 458
          atts.options = "allowed";                                                                                    // 459
        } else {                                                                                                       // 460
          delete atts.options;                                                                                         // 461
        }                                                                                                              // 462
      }                                                                                                                // 463
    }                                                                                                                  // 464
                                                                                                                       // 465
    return {                                                                                                           // 466
      afc: afContext,                                                                                                  // 467
      af: afContext._af,                                                                                               // 468
      atts: atts,                                                                                                      // 469
      defs: defs                                                                                                       // 470
    };                                                                                                                 // 471
  },                                                                                                                   // 472
  /**                                                                                                                  // 473
   * @method Utility.stringToArray                                                                                     // 474
   * @private                                                                                                          // 475
   * @param {String|Array} A variable that might be a string or an array.                                              // 476
   * @return {Array} The array, building it from a comma-delimited string if necessary.                                // 477
   */                                                                                                                  // 478
  stringToArray: function stringToArray(s, errorMessage) {                                                             // 479
    if (typeof s === "string") {                                                                                       // 480
      return s.replace(/ /g, '').split(',');                                                                           // 481
    } else if (!_.isArray(s)) {                                                                                        // 482
      throw new Error(errorMessage);                                                                                   // 483
    } else {                                                                                                           // 484
      return s;                                                                                                        // 485
    }                                                                                                                  // 486
  }                                                                                                                    // 487
};                                                                                                                     // 488
                                                                                                                       // 489
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/form-preserve.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * @constructor                                                                                                        // 2
 * @private                                                                                                            // 3
 * @param {String} migrationName                                                                                       // 4
 *                                                                                                                     // 5
 * Internal helper object to preserve form inputs across Hot Code Push                                                 // 6
 * and across "pages" navigation if the option is enabled.                                                             // 7
 */                                                                                                                    // 8
FormPreserve = function formPreserveConstructor(migrationName) {                                                       // 9
  var self = this;                                                                                                     // 10
  if (! _.isString(migrationName))                                                                                     // 11
    throw Error("You must define an unique migration name of type String");                                            // 12
  self.registeredForms = {};                                                                                           // 13
  self.retrievedDocuments = {};                                                                                        // 14
  if (Package.reload) {                                                                                                // 15
    var Reload = Package.reload.Reload;                                                                                // 16
    self.retrievedDocuments = Reload._migrationData(migrationName) || {};                                              // 17
    Reload._onMigrate(migrationName, function () {                                                                     // 18
      return [true, self._retrieveRegisteredDocuments()];                                                              // 19
    });                                                                                                                // 20
  }                                                                                                                    // 21
};                                                                                                                     // 22
                                                                                                                       // 23
FormPreserve.prototype.getDocument = function (formId) {                                                               // 24
  var self = this;                                                                                                     // 25
  if (! _.has(self.retrievedDocuments, formId))                                                                        // 26
    return false;                                                                                                      // 27
  else                                                                                                                 // 28
    return self.retrievedDocuments[formId];                                                                            // 29
};                                                                                                                     // 30
                                                                                                                       // 31
FormPreserve.prototype.saveDocument = function (formId) {                                                              // 32
  this.retrievedDocuments[formId] = this.registeredForms[formId]();                                                    // 33
}                                                                                                                      // 34
                                                                                                                       // 35
FormPreserve.prototype.registerForm = function (formId, retrieveFunc) {                                                // 36
  this.registeredForms[formId] = retrieveFunc;                                                                         // 37
};                                                                                                                     // 38
                                                                                                                       // 39
FormPreserve.prototype.unregisterForm = function (formId) {                                                            // 40
  delete this.registeredForms[formId];                                                                                 // 41
};                                                                                                                     // 42
                                                                                                                       // 43
FormPreserve.prototype._retrieveRegisteredDocuments = function () {                                                    // 44
  res = {};                                                                                                            // 45
  _.each(this.registeredForms, function (retrieveFunc, formId) {                                                       // 46
    res[formId] = retrieveFunc();                                                                                      // 47
  });                                                                                                                  // 48
  return res;                                                                                                          // 49
};                                                                                                                     // 50
                                                                                                                       // 51
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/autoform-hooks.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Hooks = {                                                                                                              // 1
  form: {},                                                                                                            // 2
  global: {                                                                                                            // 3
    before: {},                                                                                                        // 4
    after: {},                                                                                                         // 5
    formToDoc: [],                                                                                                     // 6
    docToForm: [],                                                                                                     // 7
    onSubmit: [],                                                                                                      // 8
    onSuccess: [],                                                                                                     // 9
    onError: [],                                                                                                       // 10
    beginSubmit: [],                                                                                                   // 11
    endSubmit: []                                                                                                      // 12
  }                                                                                                                    // 13
};                                                                                                                     // 14
                                                                                                                       // 15
Hooks.addHooksToList = function addHooksToList(hooksList, hooks, replace) {                                            // 16
  // Add before hooks                                                                                                  // 17
  hooks.before && _.each(hooks.before, function autoFormBeforeHooksEach(func, type) {                                  // 18
    if (typeof func !== "function") {                                                                                  // 19
      throw new Error("AutoForm before hook must be a function, not " + typeof func);                                  // 20
    }                                                                                                                  // 21
    hooksList.before[type] = (!replace && hooksList.before[type]) ? hooksList.before[type] : [];                       // 22
    hooksList.before[type].push(func);                                                                                 // 23
  });                                                                                                                  // 24
                                                                                                                       // 25
  // Add after hooks                                                                                                   // 26
  hooks.after && _.each(hooks.after, function autoFormAfterHooksEach(func, type) {                                     // 27
    if (typeof func !== "function") {                                                                                  // 28
      throw new Error("AutoForm after hook must be a function, not " + typeof func);                                   // 29
    }                                                                                                                  // 30
    hooksList.after[type] = (!replace && hooksList.after[type]) ? hooksList.after[type] : [];                          // 31
    hooksList.after[type].push(func);                                                                                  // 32
  });                                                                                                                  // 33
                                                                                                                       // 34
  // Add all other hooks                                                                                               // 35
  _.each(['formToDoc', 'docToForm', 'onSubmit', 'onSuccess', 'onError', 'beginSubmit', 'endSubmit'], function autoFormHooksEach(name) {
    if (hooks[name]) {                                                                                                 // 37
      if (typeof hooks[name] !== "function") {                                                                         // 38
        throw new Error("AutoForm " + name + " hook must be a function, not " + typeof hooks[name]);                   // 39
      }                                                                                                                // 40
                                                                                                                       // 41
      if(replace) {                                                                                                    // 42
          hooksList[name] = [];                                                                                        // 43
      }                                                                                                                // 44
                                                                                                                       // 45
      hooksList[name].push(hooks[name]);                                                                               // 46
    }                                                                                                                  // 47
  });                                                                                                                  // 48
};                                                                                                                     // 49
                                                                                                                       // 50
Hooks.getHooks = function getHooks(formId, type, subtype) {                                                            // 51
  var f, g;                                                                                                            // 52
  if (subtype) {                                                                                                       // 53
    f = Hooks.form[formId] && Hooks.form[formId][type] && Hooks.form[formId][type][subtype] || [];                     // 54
    g = Hooks.global[type] && Hooks.global[type][subtype] || [];                                                       // 55
  } else {                                                                                                             // 56
    f = Hooks.form[formId] && Hooks.form[formId][type] || [];                                                          // 57
    g = Hooks.global[type] || [];                                                                                      // 58
  }                                                                                                                    // 59
  return f.concat(g);                                                                                                  // 60
};                                                                                                                     // 61
                                                                                                                       // 62
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/autoform-inputs.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm = AutoForm || {};                                                                                             // 1
                                                                                                                       // 2
// Default Handlers                                                                                                    // 3
defaultInputValueHandlers = {                                                                                          // 4
	'select.autoform-boolean': function () {                                                                              // 5
		var val = this.val();                                                                                                // 6
		if (val === "true") {                                                                                                // 7
			return true;                                                                                                        // 8
		} else if (val === "false") {                                                                                        // 9
			return false;                                                                                                       // 10
		}                                                                                                                    // 11
	},                                                                                                                    // 12
	'select[multiple]': function () {                                                                                     // 13
		return Utility.getSelectValues(this[0]);                                                                             // 14
	},                                                                                                                    // 15
	'select': function () {                                                                                               // 16
		return this.val();                                                                                                   // 17
	},                                                                                                                    // 18
	'input.autoform-boolean[type=checkbox]': function () {                                                                // 19
		// boolean checkbox                                                                                                  // 20
		return this.is(":checked");                                                                                          // 21
	},                                                                                                                    // 22
	'input.autoform-array-item[type=checkbox]': function () {                                                             // 23
		// array checkbox                                                                                                    // 24
		if (this.is(":checked")) {                                                                                           // 25
			return this.val();                                                                                                  // 26
		}                                                                                                                    // 27
	},                                                                                                                    // 28
	'input.autoform-boolean[type=radio]': function () {                                                                   // 29
		//boolean radio                                                                                                      // 30
		var val = this.val();                                                                                                // 31
		if (this.is(":checked")) {                                                                                           // 32
			if (val === "true") {                                                                                               // 33
	        	return true;                                                                                                 // 34
	        } else if (val === "false") {                                                                                 // 35
	         	return false;                                                                                               // 36
	        }                                                                                                             // 37
		}                                                                                                                    // 38
	},                                                                                                                    // 39
	'input[type=radio]': function () {                                                                                    // 40
		if (this.is(":checked")) {                                                                                           // 41
			return this.val();                                                                                                  // 42
		}                                                                                                                    // 43
	},                                                                                                                    // 44
	'[type=select]': function () {                                                                                        // 45
		return Utility.maybeNum(this.val());                                                                                 // 46
	},                                                                                                                    // 47
	'input[type=date]': function () {                                                                                     // 48
		var val = this.val();                                                                                                // 49
		if (Utility.isValidDateString(val)) {                                                                                // 50
			//Date constructor will interpret val as UTC and create                                                             // 51
			//date at mignight in the morning of val date in UTC time zone                                                      // 52
			return new Date(val);                                                                                               // 53
		} else {                                                                                                             // 54
			return null;                                                                                                        // 55
		}                                                                                                                    // 56
	},                                                                                                                    // 57
	'input[type=datetime]': function () {                                                                                 // 58
		var val = this.val();                                                                                                // 59
		val = (typeof val === "string") ? val.replace(/ /g, "T") : val;                                                      // 60
		if (Utility.isValidNormalizedForcedUtcGlobalDateAndTimeString(val)) {                                                // 61
			//Date constructor will interpret val as UTC due to ending "Z"                                                      // 62
			return new Date(val);                                                                                               // 63
		} else {                                                                                                             // 64
			return null;                                                                                                        // 65
		}                                                                                                                    // 66
	},                                                                                                                    // 67
	'input[type=datetime-local]': function () {                                                                           // 68
		var val = this.val();                                                                                                // 69
		val = (typeof val === "string") ? val.replace(/ /g, "T") : val;                                                      // 70
		var offset = this.attr("data-offset") || "Z";                                                                        // 71
		if (Utility.isValidNormalizedLocalDateAndTimeString(val)) {                                                          // 72
			return new Date(val + offset);                                                                                      // 73
		} else {                                                                                                             // 74
			return null;                                                                                                        // 75
		}                                                                                                                    // 76
	},                                                                                                                    // 77
	'[contenteditable]': function () {                                                                                    // 78
		return this.html();                                                                                                  // 79
	},                                                                                                                    // 80
	'[data-null-value]': function () {                                                                                    // 81
		return null;                                                                                                         // 82
	},                                                                                                                    // 83
	'[data-schema-key]': function () {                                                                                    // 84
		// fallback                                                                                                          // 85
		return this.val();                                                                                                   // 86
	}                                                                                                                     // 87
};                                                                                                                     // 88
                                                                                                                       // 89
// Custom Handlers                                                                                                     // 90
customInputValueHandlers = {};                                                                                         // 91
                                                                                                                       // 92
AutoForm.inputValueHandlers = function afInputValueHandlers(handlers) {                                                // 93
  _.extend(customInputValueHandlers, handlers);                                                                        // 94
};                                                                                                                     // 95
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/autoform-formdata.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
FormData = function afFormData() {                                                                                     // 1
	var self = this;                                                                                                      // 2
	self.forms = {};                                                                                                      // 3
};                                                                                                                     // 4
                                                                                                                       // 5
FormData.prototype.initForm = function fdInitForm(formId) {                                                            // 6
	var self = this;                                                                                                      // 7
                                                                                                                       // 8
	if (self.forms[formId])                                                                                               // 9
		return;                                                                                                              // 10
                                                                                                                       // 11
	self.forms[formId] = {                                                                                                // 12
		sourceDoc: null,                                                                                                     // 13
		deps: {                                                                                                              // 14
			sourceDoc: new Deps.Dependency                                                                                      // 15
		}                                                                                                                    // 16
	};                                                                                                                    // 17
};                                                                                                                     // 18
                                                                                                                       // 19
FormData.prototype.sourceDoc = function fdSourceDoc(formId, sourceDoc) {                                               // 20
	var self = this;                                                                                                      // 21
	self.initForm(formId);                                                                                                // 22
                                                                                                                       // 23
	if (sourceDoc) {                                                                                                      // 24
		//setter                                                                                                             // 25
		self.forms[formId].sourceDoc = sourceDoc;                                                                            // 26
		self.forms[formId].deps.sourceDoc.changed();                                                                         // 27
	} else {                                                                                                              // 28
		//getter                                                                                                             // 29
		self.forms[formId].deps.sourceDoc.depend();                                                                          // 30
		return self.forms[formId].sourceDoc;                                                                                 // 31
	}                                                                                                                     // 32
};                                                                                                                     // 33
                                                                                                                       // 34
FormData.prototype.getDocCountForField = function fdGetDocCountForField(formId, field) {                               // 35
	var self = this;                                                                                                      // 36
	var mDoc = self.sourceDoc(formId);                                                                                    // 37
	var docCount;                                                                                                         // 38
	if (mDoc) {                                                                                                           // 39
		var keyInfo = mDoc.getInfoForKey(field);                                                                             // 40
		if (keyInfo && _.isArray(keyInfo.value)) {                                                                           // 41
			docCount = keyInfo.value.length                                                                                     // 42
		}                                                                                                                    // 43
	}                                                                                                                     // 44
	return docCount;                                                                                                      // 45
};                                                                                                                     // 46
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/autoform-arrays.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
ArrayTracker = function afArrayTracker() {                                                                             // 1
  var self = this;                                                                                                     // 2
  self.info = {};                                                                                                      // 3
};                                                                                                                     // 4
                                                                                                                       // 5
ArrayTracker.prototype.getMinMax = function atGetMinMax(ss, field, overrideMinCount, overrideMaxCount) {               // 6
  var defs = Utility.getDefs(ss, field);                                                                               // 7
                                                                                                                       // 8
  // minCount is set by the schema, but can be set higher on the field attribute                                       // 9
  overrideMinCount = overrideMinCount || 0;                                                                            // 10
  var minCount = defs.minCount || 0;                                                                                   // 11
  minCount = Math.max(overrideMinCount, minCount);                                                                     // 12
                                                                                                                       // 13
  // maxCount is set by the schema, but can be set lower on the field attribute                                        // 14
  overrideMaxCount = overrideMaxCount || Infinity;                                                                     // 15
  var maxCount = defs.maxCount || Infinity;                                                                            // 16
  maxCount = Math.min(overrideMaxCount, maxCount);                                                                     // 17
                                                                                                                       // 18
  return {minCount: minCount, maxCount: maxCount};                                                                     // 19
};                                                                                                                     // 20
                                                                                                                       // 21
ArrayTracker.prototype.initForm = function atInitForm(formId) {                                                        // 22
	var self = this;                                                                                                      // 23
                                                                                                                       // 24
	if (self.info[formId])                                                                                                // 25
		return;                                                                                                              // 26
                                                                                                                       // 27
	self.info[formId] = {};                                                                                               // 28
};                                                                                                                     // 29
                                                                                                                       // 30
ArrayTracker.prototype.getForm = function atInitForm(formId) {                                                         // 31
	var self = this;                                                                                                      // 32
	self.initForm(formId);                                                                                                // 33
	return self.info[formId];                                                                                             // 34
};                                                                                                                     // 35
                                                                                                                       // 36
ArrayTracker.prototype.ensureField = function atEnsureField(formId, field) {                                           // 37
	var self = this;                                                                                                      // 38
	self.initForm(formId);                                                                                                // 39
                                                                                                                       // 40
	if (!self.info[formId][field]) {                                                                                      // 41
		self.resetField(formId, field);                                                                                      // 42
	}                                                                                                                     // 43
};                                                                                                                     // 44
                                                                                                                       // 45
ArrayTracker.prototype.initField = function atInitField(formId, field, ss, docCount, overrideMinCount, overrideMaxCount) {
	var self = this;                                                                                                      // 47
	self.ensureField(formId, field);                                                                                      // 48
                                                                                                                       // 49
	if (self.info[formId][field].array != null)                                                                           // 50
		return;                                                                                                              // 51
                                                                                                                       // 52
	// If we have a doc: The count should be the maximum of docCount or schema minCount or field minCount or 1.           // 53
	// If we don't have a doc: The count should be the maximum of schema minCount or field minCount or 1.                 // 54
	var range = self.getMinMax(ss, field, overrideMinCount, overrideMaxCount);                                            // 55
	var arrayCount = Math.max(range.minCount, docCount || 1);                                                             // 56
                                                                                                                       // 57
	// If this is an array of objects, collect names of object props                                                      // 58
	var childKeys = [];                                                                                                   // 59
	if (ss.schema(field + '.$').type === Object) {                                                                        // 60
		childKeys = autoFormChildKeys(ss, field + '.$');                                                                     // 61
	}                                                                                                                     // 62
                                                                                                                       // 63
	var loopArray = [];                                                                                                   // 64
	for (var i = 0; i < arrayCount; i++) {                                                                                // 65
		var loopCtx = {arrayFieldName: field, name: field + '.' + i, index: i, minCount: overrideMinCount, maxCount: overrideMaxCount};
                                                                                                                       // 67
		// If this is an array of objects, add child key names under loopCtx.current[childName] = fullKeyName                // 68
		if (childKeys.length) {                                                                                              // 69
		  loopCtx.current = {};                                                                                              // 70
		  _.each(childKeys, function (k) {                                                                                   // 71
		    loopCtx.current[k] = field + '.' + i + '.' + k;                                                                  // 72
		  });                                                                                                                // 73
		}                                                                                                                    // 74
                                                                                                                       // 75
		loopArray.push(loopCtx);                                                                                             // 76
	};                                                                                                                    // 77
                                                                                                                       // 78
	self.info[formId][field].array = loopArray;                                                                           // 79
	var count = loopArray.length;                                                                                         // 80
	self.info[formId][field].count = count;                                                                               // 81
	self.info[formId][field].visibleCount = count;                                                                        // 82
	self.info[formId][field].deps.changed();                                                                              // 83
};                                                                                                                     // 84
                                                                                                                       // 85
ArrayTracker.prototype.resetField = function atResetField(formId, field) {                                             // 86
	var self = this;                                                                                                      // 87
	self.initForm(formId);                                                                                                // 88
                                                                                                                       // 89
	if (!self.info[formId][field]) {                                                                                      // 90
		self.info[formId][field] = {                                                                                         // 91
			deps: new Deps.Dependency                                                                                           // 92
		};                                                                                                                   // 93
	}                                                                                                                     // 94
                                                                                                                       // 95
	self.info[formId][field].array = null;                                                                                // 96
	self.info[formId][field].count = 0;                                                                                   // 97
	self.info[formId][field].visibleCount = 0;                                                                            // 98
	self.info[formId][field].deps.changed();                                                                              // 99
};                                                                                                                     // 100
                                                                                                                       // 101
ArrayTracker.prototype.resetForm = function atResetForm(formId) {                                                      // 102
	var self = this;                                                                                                      // 103
	_.each(self.info[formId], function (info, field) {                                                                    // 104
		self.resetField(formId, field);                                                                                      // 105
	});                                                                                                                   // 106
};                                                                                                                     // 107
                                                                                                                       // 108
ArrayTracker.prototype.untrackForm = function atUntrackForm(formId) {                                                  // 109
	var self = this;                                                                                                      // 110
	self.info[formId] = {};                                                                                               // 111
};                                                                                                                     // 112
                                                                                                                       // 113
ArrayTracker.prototype.tracksField = function atTracksField(formId, field) {                                           // 114
	var self = this;                                                                                                      // 115
	self.ensureField(formId, field);                                                                                      // 116
	self.info[formId][field].deps.depend();                                                                               // 117
	return !!self.info[formId][field].array;                                                                              // 118
};                                                                                                                     // 119
                                                                                                                       // 120
ArrayTracker.prototype.getField = function atGetField(formId, field) {                                                 // 121
	var self = this;                                                                                                      // 122
	self.ensureField(formId, field);                                                                                      // 123
	self.info[formId][field].deps.depend();                                                                               // 124
	return self.info[formId][field].array;                                                                                // 125
};                                                                                                                     // 126
                                                                                                                       // 127
ArrayTracker.prototype.getCount = function atGetCount(formId, field) {                                                 // 128
	var self = this;                                                                                                      // 129
	self.ensureField(formId, field);                                                                                      // 130
	self.info[formId][field].deps.depend();                                                                               // 131
	return self.info[formId][field].count;                                                                                // 132
};                                                                                                                     // 133
                                                                                                                       // 134
ArrayTracker.prototype.getVisibleCount = function atGetVisibleCount(formId, field) {                                   // 135
	var self = this;                                                                                                      // 136
	self.ensureField(formId, field);                                                                                      // 137
	self.info[formId][field].deps.depend();                                                                               // 138
	return self.info[formId][field].visibleCount;                                                                         // 139
};                                                                                                                     // 140
                                                                                                                       // 141
ArrayTracker.prototype.addOneToField = function atAddOneToField(formId, field, ss, overrideMinCount, overrideMaxCount) {
  var self = this;                                                                                                     // 143
  self.ensureField(formId, field);                                                                                     // 144
                                                                                                                       // 145
  if (!self.info[formId][field].array) {                                                                               // 146
  	return;                                                                                                             // 147
  }                                                                                                                    // 148
                                                                                                                       // 149
  var currentCount = self.info[formId][field].visibleCount                                                             // 150
  var maxCount = self.getMinMax(ss, field, overrideMinCount, overrideMaxCount).maxCount;                               // 151
                                                                                                                       // 152
  if (currentCount < maxCount) {                                                                                       // 153
	  var i = self.info[formId][field].array.length;                                                                      // 154
                                                                                                                       // 155
	  // If this is an array of objects, collect names of object props                                                    // 156
	  var childKeys = [];                                                                                                 // 157
	  if (ss.schema(field + '.$').type === Object) {                                                                      // 158
	    childKeys = autoFormChildKeys(ss, field + '.$');                                                                  // 159
	  }                                                                                                                   // 160
                                                                                                                       // 161
	  var loopCtx = {arrayFieldName: field, name: field + '.' + i, index: i, minCount: overrideMinCount, maxCount: overrideMaxCount};
                                                                                                                       // 163
	  // If this is an array of objects, add child key names under loopCtx.current[childName] = fullKeyName               // 164
	  if (childKeys.length) {                                                                                             // 165
	    loopCtx.current = {};                                                                                             // 166
	    _.each(childKeys, function (k) {                                                                                  // 167
	      loopCtx.current[k] = field + '.' + i + '.' + k;                                                                 // 168
	    });                                                                                                               // 169
	  }                                                                                                                   // 170
                                                                                                                       // 171
	  self.info[formId][field].array.push(loopCtx);                                                                       // 172
	  self.info[formId][field].count++;                                                                                   // 173
	  self.info[formId][field].visibleCount++;                                                                            // 174
	  self.info[formId][field].deps.changed();                                                                            // 175
  }                                                                                                                    // 176
};                                                                                                                     // 177
                                                                                                                       // 178
ArrayTracker.prototype.removeFromFieldAtIndex = function atRemoveFromFieldAtIndex(formId, field, index, ss, overrideMinCount, overrideMaxCount) {
  var self = this;                                                                                                     // 180
  self.ensureField(formId, field);                                                                                     // 181
                                                                                                                       // 182
  if (!self.info[formId][field].array) {                                                                               // 183
  	return;                                                                                                             // 184
  }                                                                                                                    // 185
                                                                                                                       // 186
  var currentCount = self.info[formId][field].visibleCount                                                             // 187
  var minCount = self.getMinMax(ss, field, overrideMinCount, overrideMaxCount).minCount;                               // 188
                                                                                                                       // 189
  if (currentCount > minCount) {                                                                                       // 190
    self.info[formId][field].array[index].removed = true;                                                              // 191
    self.info[formId][field].count--;                                                                                  // 192
    self.info[formId][field].visibleCount--;                                                                           // 193
    self.info[formId][field].deps.changed();                                                                           // 194
  }                                                                                                                    // 195
}                                                                                                                      // 196
                                                                                                                       // 197
// Returns schema keys that are direct children of the given schema key                                                // 198
// XXX this could be a method on ss                                                                                    // 199
autoFormChildKeys = function autoFormChildKeys(ss, name) {                                                             // 200
  name = SimpleSchema._makeGeneric(name);                                                                              // 201
  var prefix = name + ".";                                                                                             // 202
                                                                                                                       // 203
  var childKeys = [];                                                                                                  // 204
  _.each(ss._schemaKeys, function (key) {                                                                              // 205
    // If it's a direct child, add it to the list                                                                      // 206
    if (key.indexOf(prefix) === 0) {                                                                                   // 207
      var ending = key.slice(prefix.length);                                                                           // 208
      if (ending.indexOf('.') === -1) {                                                                                // 209
        childKeys.push(ending);                                                                                        // 210
      }                                                                                                                // 211
    }                                                                                                                  // 212
  });                                                                                                                  // 213
  return childKeys;                                                                                                    // 214
};                                                                                                                     // 215
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/autoform.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
defaultFormId = "_afGenericID";                                                                                        // 1
formPreserve = new FormPreserve("autoforms");                                                                          // 2
formData = {}; //for looking up autoform data by form ID                                                               // 3
var templatesById = {}; //keep a reference of autoForm templates by form `id` for AutoForm.getFormValues               // 4
var arrayFields = {}; //track # of array fields per form                                                               // 5
var formValues = {}; //for reactive show/hide based on current value of a field                                        // 6
var fd = new FormData();                                                                                               // 7
arrayTracker = new ArrayTracker();                                                                                     // 8
                                                                                                                       // 9
AutoForm = AutoForm || {}; //exported                                                                                  // 10
                                                                                                                       // 11
/**                                                                                                                    // 12
 * @method AutoForm.addHooks                                                                                           // 13
 * @public                                                                                                             // 14
 * @param {String[]|String|null} formIds Form `id` or array of form IDs to which these hooks apply. Specify `null` to add hooks that will run for every form.
 * @param {Object} hooks Hooks to add, where supported names are "before", "after", "formToDoc", "docToForm", "onSubmit", "onSuccess", and "onError".
 * @returns {undefined}                                                                                                // 17
 *                                                                                                                     // 18
 * Defines hooks to be used by one or more forms. Extends hooks lists if called multiple times for the same            // 19
 * form.                                                                                                               // 20
 */                                                                                                                    // 21
AutoForm.addHooks = function autoFormAddHooks(formIds, hooks, replace) {                                               // 22
  if (typeof formIds === "string") {                                                                                   // 23
    formIds = [formIds];                                                                                               // 24
  }                                                                                                                    // 25
                                                                                                                       // 26
  // If formIds is null, add global hooks                                                                              // 27
  if (!formIds) {                                                                                                      // 28
    Hooks.addHooksToList(Hooks.global, hooks, replace);                                                                // 29
  } else {                                                                                                             // 30
    _.each(formIds, function (formId) {                                                                                // 31
                                                                                                                       // 32
      // Init the hooks object if not done yet                                                                         // 33
      Hooks.form[formId] = Hooks.form[formId] || {                                                                     // 34
        before: {},                                                                                                    // 35
        after: {},                                                                                                     // 36
        formToDoc: [],                                                                                                 // 37
        docToForm: [],                                                                                                 // 38
        onSubmit: [],                                                                                                  // 39
        onSuccess: [],                                                                                                 // 40
        onError: [],                                                                                                   // 41
        beginSubmit: [],                                                                                               // 42
        endSubmit: []                                                                                                  // 43
      };                                                                                                               // 44
                                                                                                                       // 45
      Hooks.addHooksToList(Hooks.form[formId], hooks, replace);                                                        // 46
    });                                                                                                                // 47
  }                                                                                                                    // 48
};                                                                                                                     // 49
                                                                                                                       // 50
/**                                                                                                                    // 51
 * @method AutoForm.hooks                                                                                              // 52
 * @public                                                                                                             // 53
 * @param {Object} hooks                                                                                               // 54
 * @returns {undefined}                                                                                                // 55
 *                                                                                                                     // 56
 * Defines hooks by form id. Extends hooks lists if called multiple times for the same                                 // 57
 * form.                                                                                                               // 58
 */                                                                                                                    // 59
AutoForm.hooks = function autoFormHooks(hooks, replace) {                                                              // 60
  _.each(hooks, function(hooksObj, formId) {                                                                           // 61
    AutoForm.addHooks(formId, hooksObj, replace);                                                                      // 62
  });                                                                                                                  // 63
};                                                                                                                     // 64
                                                                                                                       // 65
/**                                                                                                                    // 66
 * @method AutoForm.resetForm                                                                                          // 67
 * @public                                                                                                             // 68
 * @param {String} formId                                                                                              // 69
 * @returns {undefined}                                                                                                // 70
 *                                                                                                                     // 71
 * Resets validation for an autoform.                                                                                  // 72
 */                                                                                                                    // 73
AutoForm.resetForm = function autoFormResetForm(formId) {                                                              // 74
  if (typeof formId !== "string") {                                                                                    // 75
    return;                                                                                                            // 76
  }                                                                                                                    // 77
                                                                                                                       // 78
  formPreserve.unregisterForm(formId);                                                                                 // 79
                                                                                                                       // 80
  // Reset array counts                                                                                                // 81
  arrayTracker.resetForm(formId);                                                                                      // 82
                                                                                                                       // 83
  if (formData[formId]) {                                                                                              // 84
    formData[formId].ss && formData[formId].ss.namedContext(formId).resetValidation();                                 // 85
    // If simpleSchema is undefined, we haven't yet rendered the form, and therefore                                   // 86
    // there is no need to reset validation for it. No error need be thrown.                                           // 87
  }                                                                                                                    // 88
};                                                                                                                     // 89
                                                                                                                       // 90
var deps = {};                                                                                                         // 91
                                                                                                                       // 92
var defaultTemplate = "bootstrap3";                                                                                    // 93
deps.defaultTemplate = new Deps.Dependency;                                                                            // 94
AutoForm.setDefaultTemplate = function autoFormSetDefaultTemplate(template) {                                          // 95
  defaultTemplate = template;                                                                                          // 96
  deps.defaultTemplate.changed();                                                                                      // 97
};                                                                                                                     // 98
                                                                                                                       // 99
AutoForm.getDefaultTemplate = function autoFormGetDefaultTemplate() {                                                  // 100
  deps.defaultTemplate.depend();                                                                                       // 101
  return defaultTemplate;                                                                                              // 102
};                                                                                                                     // 103
                                                                                                                       // 104
// All use global template by default                                                                                  // 105
var defaultTypeTemplates = {                                                                                           // 106
  quickForm: null,                                                                                                     // 107
  afFieldLabel: null,                                                                                                  // 108
  afFieldSelect: null,                                                                                                 // 109
  afCheckboxGroup: null,                                                                                               // 110
  afRadioGroup: null,                                                                                                  // 111
  afSelect: null,                                                                                                      // 112
  afTextarea: null,                                                                                                    // 113
  afContenteditable: null,                                                                                             // 114
  afCheckbox: null,                                                                                                    // 115
  afRadio: null,                                                                                                       // 116
  afInput: null,                                                                                                       // 117
  afDeleteButton: null,                                                                                                // 118
  afQuickField: null,                                                                                                  // 119
  afObjectField: null,                                                                                                 // 120
  afArrayField: null                                                                                                   // 121
};                                                                                                                     // 122
deps.defaultTypeTemplates = {                                                                                          // 123
  quickForm: new Deps.Dependency,                                                                                      // 124
  afFieldLabel: new Deps.Dependency,                                                                                   // 125
  afFieldSelect: new Deps.Dependency,                                                                                  // 126
  afCheckboxGroup: new Deps.Dependency,                                                                                // 127
  afRadioGroup: new Deps.Dependency,                                                                                   // 128
  afSelect: new Deps.Dependency,                                                                                       // 129
  afTextarea: new Deps.Dependency,                                                                                     // 130
  afContenteditable: new Deps.Dependency,                                                                              // 131
  afCheckbox: new Deps.Dependency,                                                                                     // 132
  afRadio: new Deps.Dependency,                                                                                        // 133
  afInput: new Deps.Dependency,                                                                                        // 134
  afDeleteButton: new Deps.Dependency,                                                                                 // 135
  afQuickField: new Deps.Dependency,                                                                                   // 136
  afObjectField: new Deps.Dependency,                                                                                  // 137
  afArrayField: new Deps.Dependency                                                                                    // 138
};                                                                                                                     // 139
                                                                                                                       // 140
/**                                                                                                                    // 141
 * @method AutoForm.setDefaultTemplateForType                                                                          // 142
 * @public                                                                                                             // 143
 * @param {String} type                                                                                                // 144
 * @param {String} template                                                                                            // 145
 */                                                                                                                    // 146
AutoForm.setDefaultTemplateForType = function autoFormSetDefaultTemplateForType(type, template) {                      // 147
  if (!deps.defaultTypeTemplates[type]) {                                                                              // 148
    throw new Error("invalid template type: " + type);                                                                 // 149
  }                                                                                                                    // 150
  if (template !== null && !Template[type + "_" + template]) {                                                         // 151
    throw new Error("setDefaultTemplateForType can't set default template to \"" + template + "\" for type \"" + type + "\" because there is no defined template with the name \"" + type + "_" + template + "\"");
  }                                                                                                                    // 153
  defaultTypeTemplates[type] = template;                                                                               // 154
  deps.defaultTypeTemplates[type].changed();                                                                           // 155
};                                                                                                                     // 156
                                                                                                                       // 157
/**                                                                                                                    // 158
 * @method AutoForm.getDefaultTemplateForType                                                                          // 159
 * @public                                                                                                             // 160
 * @param {String} type                                                                                                // 161
 * @return {String} Template name                                                                                      // 162
 *                                                                                                                     // 163
 * Reactive.                                                                                                           // 164
 */                                                                                                                    // 165
AutoForm.getDefaultTemplateForType = function autoFormGetDefaultTemplateForType(type) {                                // 166
  if (!deps.defaultTypeTemplates[type]) {                                                                              // 167
    throw new Error("invalid template type: " + type);                                                                 // 168
  }                                                                                                                    // 169
  deps.defaultTypeTemplates[type].depend();                                                                            // 170
  return defaultTypeTemplates[type];                                                                                   // 171
};                                                                                                                     // 172
                                                                                                                       // 173
/**                                                                                                                    // 174
 * @method AutoForm.getFormValues                                                                                      // 175
 * @public                                                                                                             // 176
 * @param {String} formId The `id` attribute of the `autoForm` you want current values for.                            // 177
 * @return {Object}                                                                                                    // 178
 *                                                                                                                     // 179
 * Returns an object representing the current values of all schema-based fields in the form.                           // 180
 * The returned object contains two properties, "insertDoc" and "updateDoc", which represent                           // 181
 * the field values as a normal object and as a MongoDB modifier, respectively.                                        // 182
 */                                                                                                                    // 183
AutoForm.getFormValues = function autoFormGetFormValues(formId) {                                                      // 184
  var template = templatesById[formId];                                                                                // 185
  if (!template || template._notInDOM) {                                                                               // 186
    throw new Error("getFormValues: There is currently no autoForm template rendered for the form with id " + formId); // 187
  }                                                                                                                    // 188
  // Get a reference to the SimpleSchema instance that should be used for                                              // 189
  // determining what types we want back for each field.                                                               // 190
  var context = template.data;                                                                                         // 191
  var ss = Utility.getSimpleSchemaFromContext(context, formId);                                                        // 192
  return getFormValues(template, formId, ss);                                                                          // 193
};                                                                                                                     // 194
                                                                                                                       // 195
/**                                                                                                                    // 196
 * @method AutoForm.getFieldValue                                                                                      // 197
 * @public                                                                                                             // 198
 * @param {String} formId The `id` attribute of the `autoForm` you want current values for.                            // 199
 * @param {String} fieldName The name of the field for which you want the current value.                               // 200
 * @return {Any}                                                                                                       // 201
 *                                                                                                                     // 202
 * Returns the value of the field (the value that would be used if the form were submitted right now).                 // 203
 * This is a reactive method that will rerun whenever the current value of the requested field changes.                // 204
 */                                                                                                                    // 205
AutoForm.getFieldValue = function autoFormGetFieldValue(formId, fieldName) {                                           // 206
  formValues[formId] = formValues[formId] || {};                                                                       // 207
  formValues[formId][fieldName] = formValues[formId][fieldName] || {_deps: new Deps.Dependency};                       // 208
  formValues[formId][fieldName]._deps.depend();                                                                        // 209
  return formValues[formId][fieldName]._val;                                                                           // 210
};                                                                                                                     // 211
                                                                                                                       // 212
/**                                                                                                                    // 213
 * @method AutoForm.validateField                                                                                      // 214
 * @public                                                                                                             // 215
 * @param {String} formId The `id` attribute of the `autoForm` you want to validate.                                   // 216
 * @param {String} fieldName The name of the field within the `autoForm` you want to validate.                         // 217
 * @param {Boolean} [skipEmpty=false] Set to `true` to skip validation if the field has no value. Useful for preventing `required` errors in form fields that the user has not yet filled out.
 * @return {Boolean} Is it valid?                                                                                      // 219
 *                                                                                                                     // 220
 * In addition to returning a boolean that indicates whether the field is currently valid,                             // 221
 * this method causes the reactive validation messages to appear.                                                      // 222
 */                                                                                                                    // 223
AutoForm.validateField = function autoFormValidateField(formId, fieldName, skipEmpty) {                                // 224
  var template = templatesById[formId];                                                                                // 225
  if (!template || template._notInDOM) {                                                                               // 226
    throw new Error("validateField: There is currently no autoForm template rendered for the form with id " + formId); // 227
  }                                                                                                                    // 228
                                                                                                                       // 229
  return _validateField(fieldName, template, skipEmpty, false);                                                        // 230
};                                                                                                                     // 231
                                                                                                                       // 232
/*                                                                                                                     // 233
 * Shared                                                                                                              // 234
 */                                                                                                                    // 235
                                                                                                                       // 236
UI.registerHelper('_af_findAutoForm', function afFindAutoForm(name) {                                                  // 237
  var afContext, i = 1;                                                                                                // 238
                                                                                                                       // 239
  do {                                                                                                                 // 240
    afContext = arguments[i];                                                                                          // 241
    i++;                                                                                                               // 242
  } while (afContext && !afContext._af);                                                                               // 243
                                                                                                                       // 244
  if (!afContext)                                                                                                      // 245
    throw new Error(name + " must be used within an autoForm block");                                                  // 246
                                                                                                                       // 247
  return afContext;                                                                                                    // 248
});                                                                                                                    // 249
                                                                                                                       // 250
Template.afFieldInput.getTemplate =                                                                                    // 251
Template.afFieldLabel.getTemplate =                                                                                    // 252
Template.afFieldSelect.getTemplate =                                                                                   // 253
Template.afDeleteButton.getTemplate =                                                                                  // 254
Template.afQuickField.getTemplate =                                                                                    // 255
Template.afObjectField.getTemplate =                                                                                   // 256
Template.afArrayField.getTemplate =                                                                                    // 257
Template.quickForm.getTemplate =                                                                                       // 258
function afGenericGetTemplate(templateType, templateName, fieldName, autoform) {                                       // 259
  var result;                                                                                                          // 260
                                                                                                                       // 261
  // Template may be specified in schema.                                                                              // 262
  // Skip for quickForm and afDeleteButton because they render a form                                                  // 263
  // and not a field.                                                                                                  // 264
  if (fieldName && autoform) {                                                                                         // 265
    var defs = Utility.getDefs(autoform._af.ss, fieldName); //defs will not be undefined                               // 266
    templateName = templateName || (defs.autoform && defs.autoform.template);                                          // 267
  }                                                                                                                    // 268
                                                                                                                       // 269
  var defaultTemplate = AutoForm.getDefaultTemplateForType(templateType) || AutoForm.getDefaultTemplate();             // 270
                                                                                                                       // 271
  // Determine template name                                                                                           // 272
  if (templateName) {                                                                                                  // 273
    var result = Template[templateType + '_' + templateName];                                                          // 274
    if (!result) {                                                                                                     // 275
      console.warn(templateType + ': "' + templateName + '" is not a valid template name. Falling back to default template, "' + defaultTemplate + '".');
    }                                                                                                                  // 277
  }                                                                                                                    // 278
                                                                                                                       // 279
  if (!result) {                                                                                                       // 280
    result = Template[templateType + '_' + defaultTemplate];                                                           // 281
    if (!result) {                                                                                                     // 282
      throw new Error(templateType + ': "' + defaultTemplate + '" is not a valid template name');                      // 283
    }                                                                                                                  // 284
  }                                                                                                                    // 285
                                                                                                                       // 286
  // Return the template instance that we want to use                                                                  // 287
  return result;                                                                                                       // 288
};                                                                                                                     // 289
                                                                                                                       // 290
/*                                                                                                                     // 291
 * autoForm                                                                                                            // 292
 */                                                                                                                    // 293
                                                                                                                       // 294
Template.autoForm.atts = function autoFormTplAtts() {                                                                  // 295
  var context = _.clone(this);                                                                                         // 296
                                                                                                                       // 297
  // By default, we add the `novalidate="novalidate"` attribute to our form,                                           // 298
  // unless the user passes `validation="browser"`.                                                                    // 299
  if (context.validation !== "browser" && !context.novalidate) {                                                       // 300
    context.novalidate = "novalidate";                                                                                 // 301
  }                                                                                                                    // 302
  // After removing all of the props we know about, everything else should                                             // 303
  // become a form attribute.                                                                                          // 304
  // XXX Would be better to use a whitelist of HTML attributes allowed on form elements                                // 305
  return _.omit(context, "schema", "collection", "validation", "doc", "resetOnSuccess", "type", "template");           // 306
};                                                                                                                     // 307
                                                                                                                       // 308
Template.autoForm.innerContext = function autoFormTplInnerContext(outerContext) {                                      // 309
  var context = this;                                                                                                  // 310
  var formId = context.id || defaultFormId;                                                                            // 311
  var collection = Utility.lookup(context.collection);                                                                 // 312
  var ss = Utility.getSimpleSchemaFromContext(context, formId);                                                        // 313
                                                                                                                       // 314
  // Retain doc values after a "hot code push", if possible                                                            // 315
  var retrievedDoc = formPreserve.getDocument(formId);                                                                 // 316
  if (retrievedDoc !== false) {                                                                                        // 317
    context.doc = retrievedDoc;                                                                                        // 318
  }                                                                                                                    // 319
                                                                                                                       // 320
  var mDoc;                                                                                                            // 321
  if (context.doc && !_.isEmpty(context.doc)) {                                                                        // 322
    // Clone doc                                                                                                       // 323
    var copy = _.clone(context.doc);                                                                                   // 324
    // Pass doc through docToForm hooks                                                                                // 325
    _.each(Hooks.getHooks(formId, 'docToForm'), function autoFormEachDocToForm(func) {                                 // 326
      copy = func(copy, ss, formId);                                                                                   // 327
    });                                                                                                                // 328
    // Create a "flat doc" that can be used to easily get values for corresponding                                     // 329
    // form fields.                                                                                                    // 330
    mDoc = new MongoObject(copy);                                                                                      // 331
    fd.sourceDoc(formId, mDoc);                                                                                        // 332
  } else {                                                                                                             // 333
    fd.sourceDoc(formId, null);                                                                                        // 334
  }                                                                                                                    // 335
                                                                                                                       // 336
  // Set up the context to be used for everything within the autoform.                                                 // 337
  var innerContext = {_af: {                                                                                           // 338
    formId: formId,                                                                                                    // 339
    collection: collection,                                                                                            // 340
    ss: ss,                                                                                                            // 341
    doc: context.doc,                                                                                                  // 342
    mDoc: mDoc,                                                                                                        // 343
    validationType: (typeof context.validation === "undefined" ? "submitThenKeyup" : context.validation),              // 344
    submitType: context.type,                                                                                          // 345
    resetOnSuccess: context.resetOnSuccess                                                                             // 346
  }};                                                                                                                  // 347
                                                                                                                       // 348
  // Cache context for lookup by formId                                                                                // 349
  formData[formId] = innerContext._af;                                                                                 // 350
                                                                                                                       // 351
  // When we change the form, loading a different doc, reloading the current doc, etc.,                                // 352
  // we also want to reset the array counts for the form                                                               // 353
  arrayTracker.resetForm(formId);                                                                                      // 354
                                                                                                                       // 355
  // Preserve outer context, allowing access within autoForm block without needing ..                                  // 356
  _.extend(innerContext, outerContext);                                                                                // 357
  return innerContext;                                                                                                 // 358
};                                                                                                                     // 359
                                                                                                                       // 360
Template.autoForm.created = function autoFormCreated() {                                                               // 361
  var self = this;                                                                                                     // 362
  var formId = self.data.id || defaultFormId;                                                                          // 363
  // Add to templatesById list                                                                                         // 364
  templatesById[formId] = self;                                                                                        // 365
};                                                                                                                     // 366
                                                                                                                       // 367
Template.autoForm.destroyed = function autoFormDestroyed() {                                                           // 368
  var self = this;                                                                                                     // 369
  self._notInDOM = true;                                                                                               // 370
  var formId = self.data.id || defaultFormId;                                                                          // 371
                                                                                                                       // 372
  // Remove from templatesById list                                                                                    // 373
  if (templatesById[formId]) {                                                                                         // 374
    delete templatesById[formId];                                                                                      // 375
  }                                                                                                                    // 376
                                                                                                                       // 377
  // Remove from data list                                                                                             // 378
  if (formData[formId]) {                                                                                              // 379
    delete formData[formId];                                                                                           // 380
  }                                                                                                                    // 381
                                                                                                                       // 382
  // Remove from array fields list                                                                                     // 383
  arrayTracker.untrackForm(formId);                                                                                    // 384
                                                                                                                       // 385
  // Remove from field values                                                                                          // 386
  if (formValues[formId]) {                                                                                            // 387
    delete formValues[formId];                                                                                         // 388
  }                                                                                                                    // 389
                                                                                                                       // 390
  // Unregister form preservation                                                                                      // 391
  formPreserve.unregisterForm(formId);                                                                                 // 392
};                                                                                                                     // 393
                                                                                                                       // 394
/*                                                                                                                     // 395
 * quickForm                                                                                                           // 396
 */                                                                                                                    // 397
                                                                                                                       // 398
UI.registerHelper('quickForm', function quickFormHelper() {                                                            // 399
  throw new Error('Use the new syntax {{> quickForm}} rather than {{quickForm}}');                                     // 400
});                                                                                                                    // 401
                                                                                                                       // 402
Template.quickForm.innerContext = function quickFormContext(atts) {                                                    // 403
  // Pass along quickForm context to autoForm context, minus a few                                                     // 404
  // properties that are specific to quickForms.                                                                       // 405
  var qfAutoFormContext = _.omit(atts, "buttonContent", "buttonClasses", "fields", "omitFields");                      // 406
                                                                                                                       // 407
  return {                                                                                                             // 408
    qfAutoFormContext: qfAutoFormContext,                                                                              // 409
    atts: atts                                                                                                         // 410
  };                                                                                                                   // 411
};                                                                                                                     // 412
                                                                                                                       // 413
/*                                                                                                                     // 414
 * afFieldLabel                                                                                                        // 415
 */                                                                                                                    // 416
                                                                                                                       // 417
UI.registerHelper('afFieldLabel', function afFieldLabelHelper() {                                                      // 418
  throw new Error('Use the new syntax {{> afFieldLabel name="name"}} rather than {{afFieldLabel "name"}}');            // 419
});                                                                                                                    // 420
                                                                                                                       // 421
/*                                                                                                                     // 422
 * afFieldInput                                                                                                        // 423
 */                                                                                                                    // 424
                                                                                                                       // 425
UI.registerHelper('afFieldInput', function afFieldInputHelper() {                                                      // 426
  throw new Error('Use the new syntax {{> afFieldInput name="name"}} rather than {{afFieldInput "name"}}');            // 427
});                                                                                                                    // 428
                                                                                                                       // 429
Template.afFieldInput.getTemplateType = function getTemplateType() {                                                   // 430
  return getInputTemplateType(this.type);                                                                              // 431
};                                                                                                                     // 432
                                                                                                                       // 433
Template.afFieldSelect.innerContext =                                                                                  // 434
Template.afFieldInput.innerContext = function afFieldInputInnerContext(options) {                                      // 435
  var c = Utility.normalizeContext(options.hash, "afFieldInput and afFieldSelect");                                    // 436
  var contentBlock = options.hash.contentBlock; // applies only to afFieldSelect                                       // 437
                                                                                                                       // 438
  var ss = c.af.ss;                                                                                                    // 439
  var defs = c.defs;                                                                                                   // 440
                                                                                                                       // 441
  // Adjust for array fields if necessary                                                                              // 442
  var expectsArray = false;                                                                                            // 443
  var defaultValue = defs.defaultValue; //make sure to use pre-adjustment defaultValue for arrays                      // 444
  if (defs.type === Array) {                                                                                           // 445
    defs = ss.schema(c.atts.name + ".$");                                                                              // 446
                                                                                                                       // 447
    //if the user overrides the type to anything,                                                                      // 448
    //then we won't be using a select box and                                                                          // 449
    //we won't be expecting an array for the current value                                                             // 450
    expectsArray = !c.atts.type;                                                                                       // 451
  }                                                                                                                    // 452
                                                                                                                       // 453
  // Get inputType                                                                                                     // 454
  var inputType = getInputType(c.atts, defs, expectsArray);                                                            // 455
                                                                                                                       // 456
  // Get input value                                                                                                   // 457
  var value = getInputValue(c.atts.name, c.atts, expectsArray, inputType, c.atts.value, c.af.mDoc, defaultValue);      // 458
                                                                                                                       // 459
  // Track field's value for reactive show/hide of other fields by value                                               // 460
  updateTrackedFieldValue(c.af.formId, c.atts.name, value);                                                            // 461
                                                                                                                       // 462
  // Get input data context                                                                                            // 463
  var iData = getInputData(defs, c.atts, value, inputType, ss.label(c.atts.name), expectsArray, c.af.submitType, c.af);
                                                                                                                       // 465
  // Return input data context                                                                                         // 466
  return _.extend({_af: c.af, contentBlock: contentBlock, type: inputType}, iData);                                    // 467
};                                                                                                                     // 468
                                                                                                                       // 469
/*                                                                                                                     // 470
 * afFieldSelect                                                                                                       // 471
 */                                                                                                                    // 472
                                                                                                                       // 473
UI.registerHelper('afFieldSelect', function afFieldSelectHelper() {                                                    // 474
  throw new Error('Use the new syntax {{> afFieldSelect name="name"}} rather than {{afFieldSelect "name"}}');          // 475
});                                                                                                                    // 476
                                                                                                                       // 477
/*                                                                                                                     // 478
 * afDeleteButton                                                                                                      // 479
 */                                                                                                                    // 480
                                                                                                                       // 481
UI.registerHelper('afDeleteButton', function afDeleteButtonHelper() {                                                  // 482
  throw new Error('Use the syntax {{> afDeleteButton collection=collection doc=doc}}');                                // 483
});                                                                                                                    // 484
                                                                                                                       // 485
Template.afDeleteButton.innerContext = function afDeleteButtonInnerContext(ctx, contentBlock) {                        // 486
  return _.extend(ctx, {contentBlock: contentBlock});                                                                  // 487
};                                                                                                                     // 488
                                                                                                                       // 489
/*                                                                                                                     // 490
 * afArrayField                                                                                                        // 491
 */                                                                                                                    // 492
                                                                                                                       // 493
UI.registerHelper('afArrayField', function afArrayFieldHelper() {                                                      // 494
  throw new Error('Use the syntax {{> afArrayField name="name"}} rather than {{afArrayField "name"}}');                // 495
});                                                                                                                    // 496
                                                                                                                       // 497
Template.afArrayField.innerContext = function (options) {                                                              // 498
  var c = Utility.normalizeContext(options.hash, "afArrayField");                                                      // 499
  var name = c.atts.name;                                                                                              // 500
  var fieldMinCount = c.atts.minCount || 0;                                                                            // 501
  var fieldMaxCount = c.atts.maxCount || Infinity;                                                                     // 502
  var ss = c.af.ss;                                                                                                    // 503
  var formId = c.af.formId;                                                                                            // 504
                                                                                                                       // 505
  // Init the array tracking for this field                                                                            // 506
  var docCount = fd.getDocCountForField(formId, name);                                                                 // 507
  arrayTracker.initField(formId, name, ss, docCount, fieldMinCount, fieldMaxCount);                                    // 508
                                                                                                                       // 509
  return {                                                                                                             // 510
    atts: c.atts,                                                                                                      // 511
    autoform: c.afc                                                                                                    // 512
  };                                                                                                                   // 513
};                                                                                                                     // 514
                                                                                                                       // 515
/*                                                                                                                     // 516
 * afObjectField                                                                                                       // 517
 */                                                                                                                    // 518
                                                                                                                       // 519
UI.registerHelper('afObjectField', function afObjectFieldHelper() {                                                    // 520
  throw new Error('Use the syntax {{> afObjectField name="name"}} rather than {{afObjectField "name"}}');              // 521
});                                                                                                                    // 522
                                                                                                                       // 523
/*                                                                                                                     // 524
 * afQuickField                                                                                                        // 525
 */                                                                                                                    // 526
                                                                                                                       // 527
UI.registerHelper('afQuickField', function afQuickFieldHelper() {                                                      // 528
  throw new Error('Use the new syntax {{> afQuickField name="name"}} rather than {{afQuickField "name"}}');            // 529
});                                                                                                                    // 530
                                                                                                                       // 531
function quickFieldLabelAtts(context, autoform) {                                                                      // 532
  // Remove unwanted props from the hash                                                                               // 533
  context = _.omit(context, 'label');                                                                                  // 534
                                                                                                                       // 535
  // Separate label options from input options; label items begin with "label-"                                        // 536
  var labelContext = {                                                                                                 // 537
    name: context.name,                                                                                                // 538
    template: context.template,                                                                                        // 539
    autoform: autoform                                                                                                 // 540
  };                                                                                                                   // 541
  _.each(context, function autoFormLabelContextEach(val, key) {                                                        // 542
    if (key.indexOf("label-") === 0) {                                                                                 // 543
      labelContext[key.substring(6)] = val;                                                                            // 544
    }                                                                                                                  // 545
  });                                                                                                                  // 546
                                                                                                                       // 547
  return labelContext;                                                                                                 // 548
}                                                                                                                      // 549
                                                                                                                       // 550
function quickFieldInputAtts(context, autoform) {                                                                      // 551
  // Remove unwanted props from the hash                                                                               // 552
  context = _.omit(context, 'label');                                                                                  // 553
                                                                                                                       // 554
  // Separate label options from input options; label items begin with "label-"                                        // 555
  var inputContext = {autoform: autoform};                                                                             // 556
  _.each(context, function autoFormInputContextEach(val, key) {                                                        // 557
    if (key.indexOf("label-") !== 0) {                                                                                 // 558
      inputContext[key] = val;                                                                                         // 559
    }                                                                                                                  // 560
  });                                                                                                                  // 561
                                                                                                                       // 562
  return inputContext;                                                                                                 // 563
}                                                                                                                      // 564
                                                                                                                       // 565
Template.afQuickField.innerContext = function afQuickFieldInnerContext(options) {                                      // 566
  var c = Utility.normalizeContext(options.hash, "afQuickField");                                                      // 567
  var ss = c.af.ss;                                                                                                    // 568
                                                                                                                       // 569
  var labelAtts = quickFieldLabelAtts(c.atts, c.afc);                                                                  // 570
  var inputAtts = quickFieldInputAtts(c.atts, c.afc);                                                                  // 571
                                                                                                                       // 572
  return {                                                                                                             // 573
    skipLabel: (c.atts.label === false || (c.defs.type === Boolean && !("select" in c.atts) && !("radio" in c.atts))), // 574
    afFieldLabelAtts: labelAtts,                                                                                       // 575
    afFieldInputAtts: inputAtts,                                                                                       // 576
    atts: {name: inputAtts.name, autoform: inputAtts.autoform}                                                         // 577
  };                                                                                                                   // 578
};                                                                                                                     // 579
                                                                                                                       // 580
Template.afQuickField.isGroup = function afQuickFieldIsGroup(options) {                                                // 581
  var c = Utility.normalizeContext(options.hash, "afQuickField");                                                      // 582
  // Render a group of fields if we expect an Object                                                                   // 583
  return (c.defs.type === Object);                                                                                     // 584
};                                                                                                                     // 585
                                                                                                                       // 586
Template.afQuickField.isFieldArray = function afQuickFieldIsFieldArray(options) {                                      // 587
  var c = Utility.normalizeContext(options.hash, "afQuickField");                                                      // 588
                                                                                                                       // 589
  // Render an array of fields if we expect an Array and we don't have options                                         // 590
  return (c.defs.type === Array && !c.atts.options);                                                                   // 591
};                                                                                                                     // 592
                                                                                                                       // 593
/*                                                                                                                     // 594
 * afEachArrayItem                                                                                                     // 595
 */                                                                                                                    // 596
                                                                                                                       // 597
Template.afEachArrayItem.innerContext = function afEachArrayItemInnerContext(options) {                                // 598
  var c = Utility.normalizeContext(options.hash, "afEachArrayItem");                                                   // 599
  var formId = c.af.formId;                                                                                            // 600
  var name = c.atts.name;                                                                                              // 601
  var docCount = fd.getDocCountForField(formId, name);                                                                 // 602
                                                                                                                       // 603
  arrayTracker.initField(formId, name, c.af.ss, docCount, c.atts.minCount, c.atts.maxCount);                           // 604
                                                                                                                       // 605
  return arrayTracker.getField(formId, name);                                                                          // 606
};                                                                                                                     // 607
                                                                                                                       // 608
/*                                                                                                                     // 609
 * Private Helper Functions                                                                                            // 610
 */                                                                                                                    // 611
                                                                                                                       // 612
function getFieldsValues(fields) {                                                                                     // 613
  var doc = {};                                                                                                        // 614
  fields.each(function formValuesEach() {                                                                              // 615
    var field = $(this);                                                                                               // 616
    var fieldName = field.attr("data-schema-key");                                                                     // 617
                                                                                                                       // 618
    // use custom handlers first, and then use built-in handlers                                                       // 619
    _.every([customInputValueHandlers, defaultInputValueHandlers], function (handlerList) {                            // 620
      return _.every(handlerList, function (handler, selector) {                                                       // 621
        if (field.filter(selector).length === 1) {                                                                     // 622
          // Special handling for checkboxes that create arrays                                                        // 623
          // XXX maybe there is a way to do this better                                                                // 624
          var isArrayCheckBox = (field.hasClass("autoform-array-item"));                                               // 625
          if (isArrayCheckBox) {                                                                                       // 626
            // Add empty array no matter what,                                                                         // 627
            // to ensure that unchecking all boxes                                                                     // 628
            // will empty the array.                                                                                   // 629
            if (!_.isArray(doc[fieldName])) {                                                                          // 630
              doc[fieldName] = [];                                                                                     // 631
            }                                                                                                          // 632
          }                                                                                                            // 633
          var val = handler.call(field);                                                                               // 634
          if (val !== void 0) {                                                                                        // 635
            if (isArrayCheckBox) {                                                                                     // 636
              doc[fieldName].push(val);                                                                                // 637
            } else {                                                                                                   // 638
              doc[fieldName] = val;                                                                                    // 639
            }                                                                                                          // 640
          }                                                                                                            // 641
          return false;                                                                                                // 642
        }                                                                                                              // 643
        return true;                                                                                                   // 644
      });                                                                                                              // 645
    });                                                                                                                // 646
  });                                                                                                                  // 647
                                                                                                                       // 648
  return doc;                                                                                                          // 649
}                                                                                                                      // 650
                                                                                                                       // 651
getFieldValue = function getFieldValue(template, key) {                                                                // 652
  var doc = getFieldsValues(template.$('[data-schema-key="' + key + '"], [data-schema-key^="' + key + '."]'));         // 653
  return doc && doc[key];                                                                                              // 654
};                                                                                                                     // 655
                                                                                                                       // 656
getFormValues = function getFormValues(template, formId, ss) {                                                         // 657
  var doc = getFieldsValues(template.$("[data-schema-key]").not("[disabled]"));                                        // 658
                                                                                                                       // 659
  // Expand the object                                                                                                 // 660
  doc = Utility.expandObj(doc);                                                                                        // 661
                                                                                                                       // 662
  // As array items are removed, gaps can appear in the numbering,                                                     // 663
  // which results in arrays that have undefined items. Here we                                                        // 664
  // remove any array items that are undefined.                                                                        // 665
  Utility.compactArrays(doc);                                                                                          // 666
                                                                                                                       // 667
  // Pass expanded doc through formToDoc hooks                                                                         // 668
  var transforms = Hooks.getHooks(formId, 'formToDoc');                                                                // 669
  _.each(transforms, function formValuesTransform(transform) {                                                         // 670
    doc = transform(doc, ss, formId);                                                                                  // 671
  });                                                                                                                  // 672
                                                                                                                       // 673
  // We return doc, insertDoc, and updateDoc.                                                                          // 674
  // For insertDoc, delete any properties that are null, undefined, or empty strings.                                  // 675
  // For updateDoc, convert to modifier object with $set and $unset.                                                   // 676
  // Do not add auto values to either.                                                                                 // 677
  var result = {                                                                                                       // 678
    insertDoc: ss.clean(Utility.cleanNulls(doc), {                                                                     // 679
      isModifier: false,                                                                                               // 680
      getAutoValues: false                                                                                             // 681
    }),                                                                                                                // 682
    updateDoc: ss.clean(Utility.docToModifier(doc), {                                                                  // 683
      isModifier: true,                                                                                                // 684
      getAutoValues: false                                                                                             // 685
    })                                                                                                                 // 686
  };                                                                                                                   // 687
  return result;                                                                                                       // 688
};                                                                                                                     // 689
                                                                                                                       // 690
/*                                                                                                                     // 691
 * Gets the value that should be shown/selected in the input. Returns                                                  // 692
 * a string or an array of strings. The value used,                                                                    // 693
 * in order of preference, is one of:                                                                                  // 694
 * * The `value` attribute provided                                                                                    // 695
 * * The value that is set in the `doc` provided on the containing autoForm                                            // 696
 * * The `defaultValue` from the schema                                                                                // 697
 */                                                                                                                    // 698
function getInputValue(name, atts, expectsArray, inputType, value, mDoc, defaultValue) {                               // 699
  if (typeof value === "undefined") {                                                                                  // 700
    // Get the value for this key in the current document                                                              // 701
    if (mDoc) {                                                                                                        // 702
      var valueInfo = mDoc.getInfoForKey(name);                                                                        // 703
      if (valueInfo) {                                                                                                 // 704
        value = valueInfo.value;                                                                                       // 705
      }                                                                                                                // 706
    }                                                                                                                  // 707
                                                                                                                       // 708
    // Only if there is no current document, use the schema defaultValue                                               // 709
    else if (defaultValue !== null && defaultValue !== undefined) {                                                    // 710
      value = defaultValue;                                                                                            // 711
    }                                                                                                                  // 712
  }                                                                                                                    // 713
                                                                                                                       // 714
  // Change null or undefined to an empty string                                                                       // 715
  value = (value == null) ? '' : value;                                                                                // 716
                                                                                                                       // 717
  function stringValue(val) {                                                                                          // 718
    if (val instanceof Date) {                                                                                         // 719
      //convert Dates to string value based on field inputType                                                         // 720
      if (value instanceof Date) {                                                                                     // 721
        if (inputType === "datetime") {                                                                                // 722
          return Utility.dateToNormalizedForcedUtcGlobalDateAndTimeString(val);                                        // 723
        } else if (inputType === "datetime-local") {                                                                   // 724
          var offset = atts.offset || "Z";                                                                             // 725
          // TODO switch to use timezoneId attribute instead of offset                                                 // 726
          return Utility.dateToNormalizedLocalDateAndTimeString(val, offset);                                          // 727
        } else {                                                                                                       // 728
          // This fallback will be used for type="date" as well                                                        // 729
          // as for select arrays, since it would not make much                                                        // 730
          // sense to do anything other than the date portion                                                          // 731
          // in select controls.                                                                                       // 732
          return Utility.dateToDateStringUTC(val);                                                                     // 733
        }                                                                                                              // 734
      }                                                                                                                // 735
    } else if (val.toString) {                                                                                         // 736
      return val.toString();                                                                                           // 737
    } else {                                                                                                           // 738
      return val;                                                                                                      // 739
    }                                                                                                                  // 740
  }                                                                                                                    // 741
                                                                                                                       // 742
  // If we're expecting value to be an array, and it's not, make it one                                                // 743
  if (expectsArray && !_.isArray(value)) {                                                                             // 744
    if (typeof value === "string") {                                                                                   // 745
      value = value.split(',');                                                                                        // 746
    } else {                                                                                                           // 747
      value = [value];                                                                                                 // 748
    }                                                                                                                  // 749
  }                                                                                                                    // 750
                                                                                                                       // 751
  // Convert to strings                                                                                                // 752
  if (_.isArray(value)) {                                                                                              // 753
    value = _.map(value, function (v) {                                                                                // 754
      return stringValue(v);                                                                                           // 755
    });                                                                                                                // 756
  } else {                                                                                                             // 757
    value = stringValue(value);                                                                                        // 758
  }                                                                                                                    // 759
                                                                                                                       // 760
  // We return either a string or an array of strings                                                                  // 761
  return value;                                                                                                        // 762
}                                                                                                                      // 763
                                                                                                                       // 764
function getInputData(defs, hash, value, inputType, label, expectsArray, submitType, _af) {                            // 765
  var schemaType = defs.type;                                                                                          // 766
                                                                                                                       // 767
  // We don't want to alter the original hash, so we clone it and                                                      // 768
  // remove some stuff that should not be HTML attributes                                                              // 769
  // XXX It would be better to use a whitelist of allowed attributes                                                   // 770
  var inputAtts = _.omit(hash,                                                                                         // 771
          "autoform",                                                                                                  // 772
          "value",                                                                                                     // 773
          "firstOption",                                                                                               // 774
          "radio",                                                                                                     // 775
          "select",                                                                                                    // 776
          "noselect",                                                                                                  // 777
          "trueLabel",                                                                                                 // 778
          "falseLabel",                                                                                                // 779
          "options",                                                                                                   // 780
          "offset",                                                                                                    // 781
          "timezoneId",                                                                                                // 782
          "template");                                                                                                 // 783
                                                                                                                       // 784
  // Add required to every type of element, if required                                                                // 785
  if (typeof inputAtts.required === "undefined" && !defs.optional) {                                                   // 786
    inputAtts.required = "";                                                                                           // 787
  }                                                                                                                    // 788
                                                                                                                       // 789
  // Add disabled or readonly if the form has that submit type                                                         // 790
  if (submitType === "disabled") {                                                                                     // 791
    inputAtts.disabled = "";                                                                                           // 792
  } else if (submitType === "readonly") {                                                                              // 793
    inputAtts.readonly = "";                                                                                           // 794
  }                                                                                                                    // 795
                                                                                                                       // 796
  var min = (typeof defs.min === "function") ? defs.min() : defs.min;                                                  // 797
  var max = (typeof defs.max === "function") ? defs.max() : defs.max;                                                  // 798
                                                                                                                       // 799
  if (inputType === "datetime-local") {                                                                                // 800
    // `offset` is deprecated and replaced by `timezoneId`                                                             // 801
    inputAtts["data-offset"] = hash.offset || "Z";                                                                     // 802
    inputAtts["data-timezoneId"] = hash.timezoneId || "UTC";                                                           // 803
  }                                                                                                                    // 804
                                                                                                                       // 805
  // Extract settings from hash                                                                                        // 806
  var firstOption = hash.firstOption;                                                                                  // 807
  var radio = hash.radio;                                                                                              // 808
  var select = hash.select;                                                                                            // 809
  var noselect = hash.noselect;                                                                                        // 810
  var trueLabel = hash.trueLabel || "True";                                                                            // 811
  var falseLabel = hash.falseLabel || "False";                                                                         // 812
  var selectOptions = hash.options;                                                                                    // 813
                                                                                                                       // 814
  // Handle options="allowed"                                                                                          // 815
  if (selectOptions === "allowed") {                                                                                   // 816
    selectOptions = _.map(defs.allowedValues, function(v) {                                                            // 817
      var label = v;                                                                                                   // 818
      if (hash.capitalize && v.length > 0 && schemaType === String) {                                                  // 819
        label = v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();                                                  // 820
      }                                                                                                                // 821
                                                                                                                       // 822
      return {label: label, value: v};                                                                                 // 823
    });                                                                                                                // 824
  }                                                                                                                    // 825
  // If options are specified in the schema, they may be a function                                                    // 826
  // that has not yet been evaluated.                                                                                  // 827
  else if (typeof selectOptions === "function") {                                                                      // 828
    selectOptions = selectOptions();                                                                                   // 829
  }                                                                                                                    // 830
                                                                                                                       // 831
  // Set placeholder to label from schema if requested                                                                 // 832
  if (hash.placeholder === "schemaLabel") {                                                                            // 833
    inputAtts.placeholder = label;                                                                                     // 834
  }                                                                                                                    // 835
                                                                                                                       // 836
  // To enable reactively toggling boolean attributes                                                                  // 837
  // in a simple way, we add the attributes to the HTML                                                                // 838
  // only if their value is `true`. That is, unlike in                                                                 // 839
  // HTML, their mere presence does not matter.                                                                        // 840
  _.each(["disabled", "readonly", "checked", "required", "autofocus"], function (booleanProp) {                        // 841
    if (!_.has(hash, booleanProp))                                                                                     // 842
      return;                                                                                                          // 843
                                                                                                                       // 844
    // For historical reasons, we treat the string "true" and an empty string as `true`, too.                          // 845
    // But an empty string value results in the cleanest rendered output for boolean props,                            // 846
    // so we standardize as that.                                                                                      // 847
    if (hash[booleanProp] === true || hash[booleanProp] === "true" || hash[booleanProp] === "") {                      // 848
      inputAtts[booleanProp] = "";                                                                                     // 849
    } else {                                                                                                           // 850
      // If the value is anything else, we don't render it                                                             // 851
      delete inputAtts[booleanProp];                                                                                   // 852
    }                                                                                                                  // 853
  });                                                                                                                  // 854
                                                                                                                       // 855
  // Add data-schema-key to every type of element                                                                      // 856
  inputAtts['data-schema-key'] = inputAtts['name'];                                                                    // 857
                                                                                                                       // 858
  // Determine what options to use                                                                                     // 859
  var data = {};                                                                                                       // 860
                                                                                                                       // 861
  data.name = inputAtts['name'];                                                                                       // 862
  data.expectsArray = expectsArray;                                                                                    // 863
                                                                                                                       // 864
  if (selectOptions) {                                                                                                 // 865
    // Build anything that should be a select, which is anything with options                                          // 866
    data.items = [];                                                                                                   // 867
    // For check boxes, we add the "autoform-array-item" class                                                         // 868
    if (noselect && expectsArray) {                                                                                    // 869
      inputAtts["class"] = (inputAtts["class"] || "") + " autoform-array-item";                                        // 870
    }                                                                                                                  // 871
    // If rendering a select element                                                                                   // 872
    if (!noselect) {                                                                                                   // 873
      inputAtts.autocomplete = "off"; //can fix issues with some browsers selecting the firstOption instead of the selected option
      if (expectsArray) {                                                                                              // 875
        inputAtts.multiple = "";                                                                                       // 876
      }                                                                                                                // 877
      // If a firstOption was provided, add that to the items list first                                               // 878
      if (firstOption && !expectsArray) {                                                                              // 879
        data.items.push({                                                                                              // 880
          name: data.name,                                                                                             // 881
          label: firstOption,                                                                                          // 882
          value: "",                                                                                                   // 883
          // _id must be included because it is a special property that                                                // 884
          // #each uses to track unique list items when adding and removing them                                       // 885
          // See https://github.com/meteor/meteor/issues/2174                                                          // 886
          _id: "",                                                                                                     // 887
          selected: false,                                                                                             // 888
          atts: inputAtts                                                                                              // 889
        });                                                                                                            // 890
      }                                                                                                                // 891
    }                                                                                                                  // 892
    // Add all defined options                                                                                         // 893
    _.each(selectOptions, function(opt) {                                                                              // 894
      var selected = expectsArray ? _.contains(value, opt.value.toString()) : (opt.value.toString() === value.toString());
      data.items.push({                                                                                                // 896
        name: data.name,                                                                                               // 897
        label: opt.label,                                                                                              // 898
        value: opt.value,                                                                                              // 899
        // _id must be included because it is a special property that                                                  // 900
        // #each uses to track unique list items when adding and removing them                                         // 901
        // See https://github.com/meteor/meteor/issues/2174                                                            // 902
        _id: opt.value,                                                                                                // 903
        selected: selected,                                                                                            // 904
        atts: inputAtts                                                                                                // 905
      });                                                                                                              // 906
    });                                                                                                                // 907
  } else if (inputType === "textarea") {                                                                               // 908
    if (typeof inputAtts.maxlength === "undefined" && typeof max === "number") {                                       // 909
      inputAtts.maxlength = max;                                                                                       // 910
    }                                                                                                                  // 911
    data.value = value;                                                                                                // 912
  } else if (inputType === "contenteditable") {                                                                        // 913
    if (typeof inputAtts['data-maxlength'] === "undefined" && typeof max === "number") {                               // 914
      inputAtts['data-maxlength'] = max;                                                                               // 915
    }                                                                                                                  // 916
    data.value = value;                                                                                                // 917
  } else if (inputType === "boolean-radios" || inputType === "boolean-select" || inputType === "boolean-checkbox") {   // 918
    value = (value === "true") ? true : false;                                                                         // 919
                                                                                                                       // 920
    // add autoform-boolean class, which we use when building object                                                   // 921
    // from form values later                                                                                          // 922
    inputAtts["class"] = (inputAtts["class"] || "") + " autoform-boolean";                                             // 923
                                                                                                                       // 924
    function getItems() {                                                                                              // 925
      return [                                                                                                         // 926
        {                                                                                                              // 927
          name: data.name,                                                                                             // 928
          value: "false",                                                                                              // 929
          // _id must be included because it is a special property that                                                // 930
          // #each uses to track unique list items when adding and removing them                                       // 931
          // See https://github.com/meteor/meteor/issues/2174                                                          // 932
          _id: "false",                                                                                                // 933
          selected: !value,                                                                                            // 934
          label: falseLabel,                                                                                           // 935
          atts: inputAtts                                                                                              // 936
        },                                                                                                             // 937
        {                                                                                                              // 938
          name: data.name,                                                                                             // 939
          value: "true",                                                                                               // 940
          // _id must be included because it is a special property that                                                // 941
          // #each uses to track unique list items when adding and removing them                                       // 942
          // See https://github.com/meteor/meteor/issues/2174                                                          // 943
          _id: "true",                                                                                                 // 944
          selected: value,                                                                                             // 945
          label: trueLabel,                                                                                            // 946
          atts: inputAtts                                                                                              // 947
        }                                                                                                              // 948
      ];                                                                                                               // 949
    }                                                                                                                  // 950
                                                                                                                       // 951
    if (inputType === "boolean-radios" || inputType === "boolean-select") {                                            // 952
      data.items = getItems();                                                                                         // 953
    } else {                                                                                                           // 954
      //don't add required attribute to checkboxes because some browsers assume that to mean that it must be checked, which is not what we mean by "required"
      delete inputAtts.required;                                                                                       // 956
      data.value = "true";                                                                                             // 957
      data.selected = value;                                                                                           // 958
    }                                                                                                                  // 959
  } else {                                                                                                             // 960
    // All other inputTypes                                                                                            // 961
    switch (inputType) {                                                                                               // 962
      case "number":                                                                                                   // 963
        if (typeof inputAtts.max === "undefined" && typeof max === "number") {                                         // 964
          inputAtts.max = max;                                                                                         // 965
        }                                                                                                              // 966
        if (typeof inputAtts.min === "undefined" && typeof min === "number") {                                         // 967
          inputAtts.min = min;                                                                                         // 968
        }                                                                                                              // 969
        if (typeof inputAtts.step === "undefined" && defs.decimal) {                                                   // 970
          inputAtts.step = '0.01';                                                                                     // 971
        }                                                                                                              // 972
        break;                                                                                                         // 973
      case "date":                                                                                                     // 974
        if (typeof inputAtts.max === "undefined" && max instanceof Date) {                                             // 975
          inputAtts.max = Utility.dateToDateStringUTC(max);                                                            // 976
        }                                                                                                              // 977
        if (typeof inputAtts.min === "undefined" && min instanceof Date) {                                             // 978
          inputAtts.min = Utility.dateToDateStringUTC(min);                                                            // 979
        }                                                                                                              // 980
        break;                                                                                                         // 981
      case "datetime":                                                                                                 // 982
        if (typeof inputAtts.max === "undefined" && max instanceof Date) {                                             // 983
          inputAtts.max = Utility.dateToNormalizedForcedUtcGlobalDateAndTimeString(max);                               // 984
        }                                                                                                              // 985
        if (typeof inputAtts.min === "undefined" && min instanceof Date) {                                             // 986
          inputAtts.min = Utility.dateToNormalizedForcedUtcGlobalDateAndTimeString(min);                               // 987
        }                                                                                                              // 988
        break;                                                                                                         // 989
      case "datetime-local":                                                                                           // 990
        if (typeof inputAtts.max === "undefined" && max instanceof Date) {                                             // 991
          inputAtts.max = Utility.dateToNormalizedLocalDateAndTimeString(max, inputAtts["data-offset"]);               // 992
        }                                                                                                              // 993
        if (typeof inputAtts.min === "undefined" && min instanceof Date) {                                             // 994
          inputAtts.min = Utility.dateToNormalizedLocalDateAndTimeString(min, inputAtts["data-offset"]);               // 995
        }                                                                                                              // 996
        break;                                                                                                         // 997
    }                                                                                                                  // 998
                                                                                                                       // 999
    if (typeof inputAtts.maxlength === "undefined"                                                                     // 1000
            && typeof max === "number"                                                                                 // 1001
            && _.contains(["text", "email", "search", "password", "tel", "url"], inputType)                            // 1002
            ) {                                                                                                        // 1003
      inputAtts.maxlength = max;                                                                                       // 1004
    }                                                                                                                  // 1005
                                                                                                                       // 1006
    data.type = inputType;                                                                                             // 1007
    data.value = value;                                                                                                // 1008
  }                                                                                                                    // 1009
                                                                                                                       // 1010
  // We set this one down here because some of the code paths above alter inputAtts                                    // 1011
  data.atts = inputAtts;                                                                                               // 1012
                                                                                                                       // 1013
  return data;                                                                                                         // 1014
}                                                                                                                      // 1015
                                                                                                                       // 1016
function getInputType(atts, defs, expectsArray) {                                                                      // 1017
  var schemaType = defs.type;                                                                                          // 1018
  var max = (typeof defs.max === "function") ? defs.max() : defs.max;                                                  // 1019
                                                                                                                       // 1020
  var type = "text";                                                                                                   // 1021
  if (atts.type) {                                                                                                     // 1022
    type = atts.type;                                                                                                  // 1023
  } else if (atts.options) {                                                                                           // 1024
    if (atts.noselect) {                                                                                               // 1025
      if (expectsArray) {                                                                                              // 1026
        type = "select-checkbox";                                                                                      // 1027
      } else {                                                                                                         // 1028
        type = "select-radio";                                                                                         // 1029
      }                                                                                                                // 1030
    } else {                                                                                                           // 1031
      type = "select";                                                                                                 // 1032
    }                                                                                                                  // 1033
  } else if (schemaType === String && defs.regEx === SimpleSchema.RegEx.Email) {                                       // 1034
    type = "email";                                                                                                    // 1035
  } else if (schemaType === String && defs.regEx === SimpleSchema.RegEx.Url) {                                         // 1036
    type = "url";                                                                                                      // 1037
  } else if (schemaType === String && (atts.rows || max >= 150)) {                                                     // 1038
    type = "textarea";                                                                                                 // 1039
  } else if (schemaType === Number) {                                                                                  // 1040
    type = "number";                                                                                                   // 1041
  } else if (schemaType === Date) {                                                                                    // 1042
    type = "date";                                                                                                     // 1043
  } else if (schemaType === Boolean) {                                                                                 // 1044
    if (atts.radio) {                                                                                                  // 1045
      type = "boolean-radios";                                                                                         // 1046
    } else if (atts.select) {                                                                                          // 1047
      type = "boolean-select";                                                                                         // 1048
    } else {                                                                                                           // 1049
      type = "boolean-checkbox";                                                                                       // 1050
    }                                                                                                                  // 1051
  }                                                                                                                    // 1052
  return type;                                                                                                         // 1053
}                                                                                                                      // 1054
                                                                                                                       // 1055
function getInputTemplateType(type) {                                                                                  // 1056
  // Special types                                                                                                     // 1057
  var typeMap = {                                                                                                      // 1058
    "select": "afSelect",                                                                                              // 1059
    "select-checkbox": "afCheckboxGroup",                                                                              // 1060
    "select-radio": "afRadioGroup",                                                                                    // 1061
    "textarea": "afTextarea",                                                                                          // 1062
    "contenteditable": "afContenteditable",                                                                            // 1063
    "boolean-radios": "afRadioGroup",                                                                                  // 1064
    "boolean-select": "afSelect",                                                                                      // 1065
    "boolean-checkbox": "afCheckbox",                                                                                  // 1066
  };                                                                                                                   // 1067
                                                                                                                       // 1068
  // All other input types                                                                                             // 1069
  var defaultTemplateType = "afInput";                                                                                 // 1070
                                                                                                                       // 1071
  return typeMap[type] || defaultTemplateType;                                                                         // 1072
}                                                                                                                      // 1073
                                                                                                                       // 1074
function _validateField(key, template, skipEmpty, onlyIfAlreadyInvalid) {                                              // 1075
  if (!template || template._notInDOM) {                                                                               // 1076
    return; //skip validation                                                                                          // 1077
  }                                                                                                                    // 1078
                                                                                                                       // 1079
  var context = template.data;                                                                                         // 1080
  var formId = context.id || defaultFormId;                                                                            // 1081
  var ss = Utility.getSimpleSchemaFromContext(context, formId);                                                        // 1082
                                                                                                                       // 1083
  if (onlyIfAlreadyInvalid && ss.namedContext(formId).isValid()) {                                                     // 1084
    return; //skip validation                                                                                          // 1085
  }                                                                                                                    // 1086
                                                                                                                       // 1087
  // Create a document based on all the values of all the inputs on the form                                           // 1088
  var form = getFormValues(template, formId, ss);                                                                      // 1089
                                                                                                                       // 1090
  // Clean and validate doc                                                                                            // 1091
  if (context.type === "update") {                                                                                     // 1092
    var docToValidate = form.updateDoc;                                                                                // 1093
    var isModifier = true;                                                                                             // 1094
  } else {                                                                                                             // 1095
    var docToValidate = form.insertDoc;                                                                                // 1096
    var isModifier = false;                                                                                            // 1097
  }                                                                                                                    // 1098
                                                                                                                       // 1099
  // Skip validation if skipEmpty is true and the field we're validating                                               // 1100
  // has no value.                                                                                                     // 1101
  if (skipEmpty && !Utility.objAffectsKey(docToValidate, key))                                                         // 1102
    return; //skip validation                                                                                          // 1103
                                                                                                                       // 1104
  var userId = (Meteor.userId && Meteor.userId()) || null;                                                             // 1105
                                                                                                                       // 1106
  // getFormValues did some cleaning but didn't add auto values; add them now                                          // 1107
  ss.clean(docToValidate, {                                                                                            // 1108
    isModifier: isModifier,                                                                                            // 1109
    filter: false,                                                                                                     // 1110
    autoConvert: false,                                                                                                // 1111
    extendAutoValueContext: {                                                                                          // 1112
      userId: userId,                                                                                                  // 1113
      isInsert: !isModifier,                                                                                           // 1114
      isUpdate: isModifier,                                                                                            // 1115
      isUpsert: false,                                                                                                 // 1116
      isFromTrustedCode: false                                                                                         // 1117
    }                                                                                                                  // 1118
  });                                                                                                                  // 1119
  return ss.namedContext(formId).validateOne(docToValidate, key, {                                                     // 1120
    modifier: isModifier,                                                                                              // 1121
    extendedCustomContext: {                                                                                           // 1122
      userId: userId,                                                                                                  // 1123
      isInsert: !isModifier,                                                                                           // 1124
      isUpdate: isModifier,                                                                                            // 1125
      isUpsert: false,                                                                                                 // 1126
      isFromTrustedCode: false                                                                                         // 1127
    }                                                                                                                  // 1128
  });                                                                                                                  // 1129
}                                                                                                                      // 1130
                                                                                                                       // 1131
//throttling function that calls out to _validateField                                                                 // 1132
var vok = {}, tm = {};                                                                                                 // 1133
validateField = function validateField(key, template, skipEmpty, onlyIfAlreadyInvalid) {                               // 1134
  if (vok[key] === false) {                                                                                            // 1135
    Meteor.clearTimeout(tm[key]);                                                                                      // 1136
    tm[key] = Meteor.setTimeout(function() {                                                                           // 1137
      vok[key] = true;                                                                                                 // 1138
      _validateField(key, template, skipEmpty, onlyIfAlreadyInvalid);                                                  // 1139
    }, 300);                                                                                                           // 1140
    return;                                                                                                            // 1141
  }                                                                                                                    // 1142
  vok[key] = false;                                                                                                    // 1143
  _validateField(key, template, skipEmpty, onlyIfAlreadyInvalid);                                                      // 1144
};                                                                                                                     // 1145
                                                                                                                       // 1146
updateTrackedFieldValue = function updateTrackedFieldValue(formId, key, val) {                                         // 1147
  formValues[formId] = formValues[formId] || {};                                                                       // 1148
  formValues[formId][key] = formValues[formId][key] || {_deps: new Deps.Dependency};                                   // 1149
  formValues[formId][key]._val = val;                                                                                  // 1150
  formValues[formId][key]._deps.changed();                                                                             // 1151
};                                                                                                                     // 1152
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/autoform-helpers.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
 * afFieldMessage                                                                                                      // 2
 */                                                                                                                    // 3
UI.registerHelper('afFieldMessage', function autoFormFieldMessage(options) {                                           // 4
  //help users transition from positional name arg                                                                     // 5
  if (typeof options === "string") {                                                                                   // 6
    throw new Error('Use the new syntax {{afFieldMessage name="name"}} rather than {{afFieldMessage "name"}}');        // 7
  }                                                                                                                    // 8
                                                                                                                       // 9
  options = parseOptions(options, this, 'afFieldMessage');                                                             // 10
                                                                                                                       // 11
  return options.ss.namedContext(options.formId).keyErrorMessage(options.name);                                        // 12
});                                                                                                                    // 13
                                                                                                                       // 14
/*                                                                                                                     // 15
 * afFieldIsInvalid                                                                                                    // 16
 */                                                                                                                    // 17
UI.registerHelper('afFieldIsInvalid', function autoFormFieldIsInvalid(options) {                                       // 18
  //help users transition from positional name arg                                                                     // 19
  if (typeof options === "string") {                                                                                   // 20
    throw new Error('Use the new syntax {{#if afFieldIsInvalid name="name"}} rather than {{#if afFieldIsInvalid "name"}}');
  }                                                                                                                    // 22
                                                                                                                       // 23
  options = parseOptions(options, this, 'afFieldIsInvalid');                                                           // 24
                                                                                                                       // 25
  return options.ss.namedContext(options.formId).keyIsInvalid(options.name);                                           // 26
});                                                                                                                    // 27
                                                                                                                       // 28
/*                                                                                                                     // 29
 * afArrayFieldHasMoreThanMinimum                                                                                      // 30
 */                                                                                                                    // 31
UI.registerHelper('afArrayFieldHasMoreThanMinimum', function autoFormArrayFieldHasMoreThanMinimum(options) {           // 32
  options = parseOptions(options, this, 'afArrayFieldHasMoreThanMinimum');                                             // 33
                                                                                                                       // 34
  var range = arrayTracker.getMinMax(options.ss, options.name, options.minCount, options.maxCount);                    // 35
  var visibleCount = arrayTracker.getVisibleCount(options.formId, options.name);                                       // 36
  return (visibleCount > range.minCount);                                                                              // 37
});                                                                                                                    // 38
                                                                                                                       // 39
/*                                                                                                                     // 40
 * afArrayFieldHasLessThanMaximum                                                                                      // 41
 */                                                                                                                    // 42
UI.registerHelper('afArrayFieldHasLessThanMaximum', function autoFormArrayFieldHasLessThanMaximum(options) {           // 43
  options = parseOptions(options, this, 'afArrayFieldHasLessThanMaximum');                                             // 44
                                                                                                                       // 45
  var range = arrayTracker.getMinMax(options.ss, options.name, options.minCount, options.maxCount);                    // 46
  var visibleCount = arrayTracker.getVisibleCount(options.formId, options.name);                                       // 47
  return (visibleCount < range.maxCount);                                                                              // 48
});                                                                                                                    // 49
                                                                                                                       // 50
/*                                                                                                                     // 51
 * afFieldValueIs                                                                                                      // 52
 */                                                                                                                    // 53
UI.registerHelper('afFieldValueIs', function autoFormFieldValueIs(options) {                                           // 54
  options = parseOptions(options, this, 'afFieldValueIs');                                                             // 55
                                                                                                                       // 56
  var currentValue = AutoForm.getFieldValue(options.formId, options.name);                                             // 57
  return currentValue === options.value;                                                                               // 58
});                                                                                                                    // 59
                                                                                                                       // 60
/*                                                                                                                     // 61
 * afFieldValueContains                                                                                                // 62
 */                                                                                                                    // 63
UI.registerHelper('afFieldValueContains', function autoFormFieldValueContains(options) {                               // 64
  options = parseOptions(options, this, 'afFieldValueContains');                                                       // 65
                                                                                                                       // 66
  var currentValue = AutoForm.getFieldValue(options.formId, options.name);                                             // 67
  return _.isArray(currentValue) && _.contains(currentValue, options.value);                                           // 68
});                                                                                                                    // 69
                                                                                                                       // 70
/*                                                                                                                     // 71
 * afFieldLabelText                                                                                                    // 72
 */                                                                                                                    // 73
UI.registerHelper('afFieldLabelText', function autoFormFieldLabelText(options) {                                       // 74
  options = parseOptions(options, this, 'afFieldLabelText');                                                           // 75
                                                                                                                       // 76
  return options.ss.label(options.name);                                                                               // 77
});                                                                                                                    // 78
                                                                                                                       // 79
/*                                                                                                                     // 80
 * afFieldNames                                                                                                        // 81
 */                                                                                                                    // 82
UI.registerHelper("afFieldNames", function autoFormFieldNames(options) {                                               // 83
  options = parseOptions(options, this, 'afFieldNames');                                                               // 84
  var ss = options.ss;                                                                                                 // 85
  var name = options.name;                                                                                             // 86
                                                                                                                       // 87
  // Get the list of fields we want included                                                                           // 88
  var fieldList = options.fields;                                                                                      // 89
  if (fieldList) {                                                                                                     // 90
    fieldList = Utility.stringToArray(fieldList, 'AutoForm: fields attribute must be an array or a string containing a comma-delimited list of fields');
  } else if (name) {                                                                                                   // 92
    // If we weren't given a fieldList but were given a field name, use subfields by default                           // 93
                                                                                                                       // 94
    // Get list of field names that are descendants of this field's name                                               // 95
    fieldList = autoFormChildKeys(ss, name);                                                                           // 96
                                                                                                                       // 97
    // Tack child field name on to end of parent field name. This                                                      // 98
    // ensures that we keep the desired array index for array items.                                                   // 99
    fieldList = _.map(fieldList, function (field) {                                                                    // 100
      return name + "." + field;                                                                                       // 101
    });                                                                                                                // 102
  } else {                                                                                                             // 103
    // If we weren't given a fieldList or a field name, use all first level schema keys by default                     // 104
    fieldList = ss.firstLevelSchemaKeys() || [];                                                                       // 105
  }                                                                                                                    // 106
                                                                                                                       // 107
  // If user wants to omit some fields, remove those from the array                                                    // 108
  var omitFields = options.omitFields;                                                                                 // 109
  if (omitFields) {                                                                                                    // 110
    omitFields = Utility.stringToArray(omitFields, 'AutoForm: omitFields attribute must be an array or a string containing a comma-delimited list of fields');
    fieldList = _.difference(fieldList, omitFields);                                                                   // 112
    // If omitFields contains generic field names (with $) we omit those too                                           // 113
    fieldList = _.reject(fieldList, function (f) {                                                                     // 114
      return _.contains(omitFields, SimpleSchema._makeGeneric(f));                                                     // 115
    });                                                                                                                // 116
  }                                                                                                                    // 117
                                                                                                                       // 118
  // Filter out fields we never want                                                                                   // 119
  fieldList = _.filter(fieldList, function shouldIncludeField(field) {                                                 // 120
    var fieldDefs = ss.schema(field);                                                                                  // 121
                                                                                                                       // 122
    // Don't include fields with denyInsert=true when it's an insert form                                              // 123
    if (fieldDefs.denyInsert && options.submitType === "insert")                                                       // 124
      return false;                                                                                                    // 125
                                                                                                                       // 126
    // Don't include fields with denyUpdate=true when it's an update form                                              // 127
    if (fieldDefs.denyUpdate && options.submitType === "update")                                                       // 128
      return false;                                                                                                    // 129
                                                                                                                       // 130
    return true;                                                                                                       // 131
  });                                                                                                                  // 132
                                                                                                                       // 133
  // Ensure fields are not added more than once                                                                        // 134
  fieldList = _.unique(fieldList);                                                                                     // 135
                                                                                                                       // 136
  return fieldList;                                                                                                    // 137
});                                                                                                                    // 138
                                                                                                                       // 139
/*                                                                                                                     // 140
 * PRIVATE                                                                                                             // 141
 */                                                                                                                    // 142
                                                                                                                       // 143
function parseOptions(options, self, helperName) {                                                                     // 144
  var hash = (options || {}).hash || {};                                                                               // 145
  // Find the autoform context                                                                                         // 146
  var afContext = hash.autoform && hash.autoform._af || self && self._af || self && self.autoform && self.autoform._af;
  var ss = afContext.ss;                                                                                               // 148
  if (!ss) {                                                                                                           // 149
    throw new Error(helperName + " helper must be used within an autoForm block");                                     // 150
  }                                                                                                                    // 151
                                                                                                                       // 152
  hash.name && Utility.getDefs(ss, hash.name); //for side effect of throwing errors when name is not in schema         // 153
  return _.extend({}, afContext, hash);                                                                                // 154
}                                                                                                                      // 155
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/autoform/autoform-events.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function doBefore(docId, doc, hooks, template, name) {                                                                 // 1
  // We pass the template instance in case the hook                                                                    // 2
  // needs the data context                                                                                            // 3
  _.each(hooks, function doBeforeHook(hook) {                                                                          // 4
    if (hook) {                                                                                                        // 5
      if (docId) {                                                                                                     // 6
        doc = hook(docId, doc, template);                                                                              // 7
      } else {                                                                                                         // 8
        doc = hook(doc, template);                                                                                     // 9
      }                                                                                                                // 10
      if (!_.isObject(doc)) {                                                                                          // 11
        throw new Error(name + " must return an object");                                                              // 12
      }                                                                                                                // 13
    }                                                                                                                  // 14
  });                                                                                                                  // 15
  return doc;                                                                                                          // 16
}                                                                                                                      // 17
                                                                                                                       // 18
function beginSubmit(formId, template) {                                                                               // 19
  if (!template || template._notInDOM)                                                                                 // 20
    return;                                                                                                            // 21
  // Get user-defined hooks                                                                                            // 22
  var hooks = Hooks.getHooks(formId, 'beginSubmit');                                                                   // 23
  if (hooks.length) {                                                                                                  // 24
    _.each(hooks, function beginSubmitHooks(hook) {                                                                    // 25
      hook(formId, template);                                                                                          // 26
    });                                                                                                                // 27
  } else {                                                                                                             // 28
    // If there are no user-defined hooks, by default we disable the submit button during submission                   // 29
    var submitButton = template.find("button[type=submit]") || template.find("input[type=submit]");                    // 30
    if (submitButton) {                                                                                                // 31
      submitButton.disabled = true;                                                                                    // 32
    }                                                                                                                  // 33
  }                                                                                                                    // 34
}                                                                                                                      // 35
                                                                                                                       // 36
function endSubmit(formId, template) {                                                                                 // 37
  if (!template || template._notInDOM)                                                                                 // 38
    return;                                                                                                            // 39
  // Get user-defined hooks                                                                                            // 40
  var hooks = Hooks.getHooks(formId, 'endSubmit');                                                                     // 41
  if (hooks.length) {                                                                                                  // 42
    _.each(hooks, function endSubmitHooks(hook) {                                                                      // 43
      hook(formId, template);                                                                                          // 44
    });                                                                                                                // 45
  } else {                                                                                                             // 46
    // If there are no user-defined hooks, by default we disable the submit button during submission                   // 47
    var submitButton = template.find("button[type=submit]") || template.find("input[type=submit]");                    // 48
    if (submitButton) {                                                                                                // 49
      submitButton.disabled = false;                                                                                   // 50
    }                                                                                                                  // 51
  }                                                                                                                    // 52
}                                                                                                                      // 53
                                                                                                                       // 54
Template.autoForm.events({                                                                                             // 55
  'submit form': function autoFormSubmitHandler(event, template) {                                                     // 56
    //determine what we want to do                                                                                     // 57
    var context = this;                                                                                                // 58
    var isInsert = (context.type === "insert");                                                                        // 59
    var isUpdate = (context.type === "update");                                                                        // 60
    var isRemove = (context.type === "remove");                                                                        // 61
    var isMethod = (context.type === "method");                                                                        // 62
    var isNormalSubmit = (!isInsert && !isUpdate && !isRemove && !isMethod);                                           // 63
    var method = context.meteormethod;                                                                                 // 64
                                                                                                                       // 65
    //init                                                                                                             // 66
    var validationType = context.validation || "submitThenKeyup";                                                      // 67
    var formId = context.id || defaultFormId;                                                                          // 68
    var collection = Utility.lookup(context.collection);                                                               // 69
    var schema = context.schema;                                                                                       // 70
    // ss will be the schema for the `schema` attribute if present,                                                    // 71
    // else the schema for the collection                                                                              // 72
    var ss = Utility.getSimpleSchemaFromContext(context, formId);                                                      // 73
    var currentDoc = context.doc || null;                                                                              // 74
    var docId = currentDoc ? currentDoc._id : null;                                                                    // 75
    var resetOnSuccess = context.resetOnSuccess;                                                                       // 76
                                                                                                                       // 77
    // Gather hooks                                                                                                    // 78
    var beforeInsert = Hooks.getHooks(formId, 'before', 'insert');                                                     // 79
    var beforeUpdate = Hooks.getHooks(formId, 'before', 'update');                                                     // 80
    var beforeRemove = Hooks.getHooks(formId, 'before', 'remove');                                                     // 81
    var beforeMethod = method && Hooks.getHooks(formId, 'before', method);                                             // 82
    var afterInsert = Hooks.getHooks(formId, 'after', 'insert');                                                       // 83
    var afterUpdate = Hooks.getHooks(formId, 'after', 'update');                                                       // 84
    var afterRemove = Hooks.getHooks(formId, 'after', 'remove');                                                       // 85
    var afterMethod = method && Hooks.getHooks(formId, 'after', method);                                               // 86
    var onSuccess = Hooks.getHooks(formId, 'onSuccess');                                                               // 87
    var onError = Hooks.getHooks(formId, 'onError');                                                                   // 88
    var onSubmit = Hooks.getHooks(formId, 'onSubmit');                                                                 // 89
                                                                                                                       // 90
    // Prevent browser form submission if we're planning to do our own thing                                           // 91
    if (!isNormalSubmit) {                                                                                             // 92
      event.preventDefault();                                                                                          // 93
    }                                                                                                                  // 94
                                                                                                                       // 95
    // Prep haltSubmission function                                                                                    // 96
    function haltSubmission() {                                                                                        // 97
      event.preventDefault();                                                                                          // 98
      event.stopPropagation();                                                                                         // 99
      // Run endSubmit hooks (re-enabled submit button or form, etc.)                                                  // 100
      endSubmit(formId, template);                                                                                     // 101
    }                                                                                                                  // 102
                                                                                                                       // 103
    // Prep function to select the focus the first field with an error                                                 // 104
    function selectFirstInvalidField() {                                                                               // 105
      var ctx = ss.namedContext(formId);                                                                               // 106
      if (!ctx.isValid()) {                                                                                            // 107
        _.every(template.findAll('[data-schema-key]'), function selectFirstInvalidFieldEvery(input) {                  // 108
          if (ctx.keyIsInvalid(input.getAttribute('data-schema-key'))) {                                               // 109
            input.focus();                                                                                             // 110
            return false;                                                                                              // 111
          } else {                                                                                                     // 112
            return true;                                                                                               // 113
          }                                                                                                            // 114
        });                                                                                                            // 115
      }                                                                                                                // 116
    }                                                                                                                  // 117
                                                                                                                       // 118
    // Prep reset form function                                                                                        // 119
    function autoFormDoResetForm() {                                                                                   // 120
      if (!template._notInDOM) {                                                                                       // 121
        template.find("form").reset();                                                                                 // 122
        var focusInput = template.find("[autofocus]");                                                                 // 123
        focusInput && focusInput.focus();                                                                              // 124
      }                                                                                                                // 125
    }                                                                                                                  // 126
                                                                                                                       // 127
    // Prep callback creator function                                                                                  // 128
    function makeCallback(name, afterHook) {                                                                           // 129
      return function autoFormActionCallback(error, result) {                                                          // 130
        if (error) {                                                                                                   // 131
          selectFirstInvalidField();                                                                                   // 132
          _.each(onError, function onErrorEach(hook) {                                                                 // 133
            hook(name, error, template);                                                                               // 134
          });                                                                                                          // 135
        } else {                                                                                                       // 136
          // By default, we reset form after successful submit, but                                                    // 137
          // you can opt out.                                                                                          // 138
          if (resetOnSuccess !== false) {                                                                              // 139
            autoFormDoResetForm();                                                                                     // 140
          }                                                                                                            // 141
          _.each(onSuccess, function onSuccessEach(hook) {                                                             // 142
            hook(name, result, template);                                                                              // 143
          });                                                                                                          // 144
        }                                                                                                              // 145
        _.each(afterHook, function afterHookEach(hook) {                                                               // 146
          hook(error, result, template);                                                                               // 147
        });                                                                                                            // 148
        // Run endSubmit hooks (re-enabled submit button or form, etc.)                                                // 149
        endSubmit(formId, template);                                                                                   // 150
      };                                                                                                               // 151
    }                                                                                                                  // 152
                                                                                                                       // 153
    // If type is "remove", do that right away since we don't need to gather                                           // 154
    // form values or validate.                                                                                        // 155
    if (isRemove) {                                                                                                    // 156
      // Run beginSubmit hooks (disable submit button or form, etc.)                                                   // 157
      beginSubmit(formId, template);                                                                                   // 158
                                                                                                                       // 159
      // Call beforeRemove hooks if present, and stop if any return false                                              // 160
      var shouldStop = _.any(beforeRemove, function eachBeforeRemove(hook) {                                           // 161
        return (hook(docId, template) === false);                                                                      // 162
      });                                                                                                              // 163
      if (shouldStop) {                                                                                                // 164
        return haltSubmission();                                                                                       // 165
      }                                                                                                                // 166
      if(!collection) {                                                                                                // 167
          throw new Error("AutoForm: You must specify a collection when form type is remove.");                        // 168
      }                                                                                                                // 169
      collection.remove(docId, makeCallback('remove', afterRemove));                                                   // 170
      return;                                                                                                          // 171
    }                                                                                                                  // 172
                                                                                                                       // 173
    // Gather all form values                                                                                          // 174
    var form = getFormValues(template, formId, ss);                                                                    // 175
                                                                                                                       // 176
    // Run beginSubmit hooks (disable submit button or form, etc.)                                                     // 177
    // NOTE: This needs to stay after getFormValues in case a                                                          // 178
    // beginSubmit hook disables inputs. We don't get values for                                                       // 179
    // disabled inputs, but if they are just disabling during submission,                                              // 180
    // then we actually do want the values.                                                                            // 181
    beginSubmit(formId, template);                                                                                     // 182
                                                                                                                       // 183
    // Execute some before hooks                                                                                       // 184
    var insertDoc = isInsert ? doBefore(null, form.insertDoc, beforeInsert, template, 'before.insert hook') : form.insertDoc;
    var updateDoc = isUpdate && !_.isEmpty(form.updateDoc) ? doBefore(docId, form.updateDoc, beforeUpdate, template, 'before.update hook') : form.updateDoc;
                                                                                                                       // 187
    // Get a version of the doc that has auto values to validate here. We                                              // 188
    // don't want to actually send any auto values to the server because                                               // 189
    // we ultimately want them generated on the server                                                                 // 190
    var insertDocForValidation = ss.clean(_.clone(insertDoc), {                                                        // 191
      filter: false,                                                                                                   // 192
      autoConvert: false,                                                                                              // 193
      extendAutoValueContext: {                                                                                        // 194
        userId: (Meteor.userId && Meteor.userId()) || null,                                                            // 195
        isInsert: true,                                                                                                // 196
        isUpdate: false,                                                                                               // 197
        isUpsert: false,                                                                                               // 198
        isFromTrustedCode: false                                                                                       // 199
      }                                                                                                                // 200
    });                                                                                                                // 201
                                                                                                                       // 202
    // Prep isValid function                                                                                           // 203
    var validationErrorTriggered = 0;                                                                                  // 204
    function isValid(doc, isModifier, type) {                                                                          // 205
      var result = validationType === 'none' || ss.namedContext(formId).validate(doc, {                                // 206
        modifier: isModifier,                                                                                          // 207
        extendedCustomContext: {                                                                                       // 208
          userId: (Meteor.userId && Meteor.userId()) || null,                                                          // 209
          isInsert: !isModifier,                                                                                       // 210
          isUpdate: !!isModifier,                                                                                      // 211
          isUpsert: false,                                                                                             // 212
          isFromTrustedCode: false                                                                                     // 213
        }                                                                                                              // 214
      });                                                                                                              // 215
      if (!result && !validationErrorTriggered) {                                                                      // 216
        selectFirstInvalidField();                                                                                     // 217
        _.each(onError, function onErrorEach(hook) {                                                                   // 218
          hook(type, new Error('failed validation'), template);                                                        // 219
        });                                                                                                            // 220
        validationErrorTriggered++;                                                                                    // 221
      }                                                                                                                // 222
      return result;                                                                                                   // 223
    }                                                                                                                  // 224
                                                                                                                       // 225
    // Perform validation for onSubmit call or for normal form submission                                              // 226
    if (((onSubmit.length > 0) || isNormalSubmit) && !isValid(insertDocForValidation, false, 'pre-submit validation')) {
      return haltSubmission();                                                                                         // 228
    }                                                                                                                  // 229
                                                                                                                       // 230
    // Call onSubmit                                                                                                   // 231
    if (onSubmit.length > 0) {                                                                                         // 232
      var context = {                                                                                                  // 233
        event: event,                                                                                                  // 234
        template: template,                                                                                            // 235
        resetForm: autoFormDoResetForm                                                                                 // 236
      };                                                                                                               // 237
      // Pass both types of doc to onSubmit                                                                            // 238
      var shouldStop = _.any(onSubmit, function eachOnSubmit(hook) {                                                   // 239
        return (hook.call(context, insertDoc, updateDoc, currentDoc) === false);                                       // 240
      });                                                                                                              // 241
      if (shouldStop) {                                                                                                // 242
        return haltSubmission();                                                                                       // 243
      }                                                                                                                // 244
    }                                                                                                                  // 245
                                                                                                                       // 246
    // Now we will do the requested insert, update, remove, method, or normal                                          // 247
    // browser form submission. Even though we may have already validated above                                        // 248
    // if we have an onSubmit hook, we do it again upon insert or update                                               // 249
    // because collection2 validation catches additional stuff like unique and                                         // 250
    // because our form schema need not be the same as our collection schema.                                          // 251
    if (isInsert) {                                                                                                    // 252
      if(!collection) {                                                                                                // 253
         throw new Error("AutoForm: You must specify a collection when form type is insert.");                         // 254
      }                                                                                                                // 255
      // If there is an override schema supplied, validate against that first                                          // 256
      if (schema && !isValid(insertDocForValidation, false, 'pre-submit validation')) {                                // 257
        return haltSubmission();                                                                                       // 258
      }                                                                                                                // 259
      collection.insert(insertDoc, {validationContext: formId}, makeCallback('insert', afterInsert));                  // 260
    } else if (isUpdate) {                                                                                             // 261
      var updateCallback = makeCallback('update', afterUpdate);                                                        // 262
      if (_.isEmpty(updateDoc)) {                                                                                      // 263
        // Nothing to update. Just treat it as a successful update.                                                    // 264
        updateCallback(null, 0);                                                                                       // 265
      } else {                                                                                                         // 266
        if(!collection) {                                                                                              // 267
          throw new Error("AutoForm: You must specify a collection when form type is update.");                        // 268
        }                                                                                                              // 269
        // If there is an override schema supplied, validate against that first                                        // 270
        if (schema) {                                                                                                  // 271
          // Get a version of the doc that has auto values to validate here. We                                        // 272
          // don't want to actually send any auto values to the server because                                         // 273
          // we ultimately want them generated on the server                                                           // 274
          var updateDocForValidation = ss.clean(_.clone(updateDoc), {                                                  // 275
            filter: false,                                                                                             // 276
            autoConvert: false,                                                                                        // 277
            extendAutoValueContext: {                                                                                  // 278
              userId: (Meteor.userId && Meteor.userId()) || null,                                                      // 279
              isInsert: false,                                                                                         // 280
              isUpdate: true,                                                                                          // 281
              isUpsert: false,                                                                                         // 282
              isFromTrustedCode: false                                                                                 // 283
            }                                                                                                          // 284
          });                                                                                                          // 285
          if (!isValid(updateDocForValidation, true, 'pre-submit validation')) {                                       // 286
            return haltSubmission();                                                                                   // 287
          }                                                                                                            // 288
        }                                                                                                              // 289
        collection.update(docId, updateDoc, {validationContext: formId}, updateCallback);                              // 290
      }                                                                                                                // 291
    }                                                                                                                  // 292
                                                                                                                       // 293
    // We won't do an else here so that a method could be called in                                                    // 294
    // addition to another action on the same submit                                                                   // 295
    if (method) {                                                                                                      // 296
      var methodDoc = doBefore(null, form.insertDoc, beforeMethod, template, 'before.method hook');                    // 297
      // Get a copy of the doc with auto values added to use for validation                                            // 298
      var methodDocForValidation = ss.clean(_.clone(methodDoc), {                                                      // 299
        filter: false,                                                                                                 // 300
        autoConvert: false,                                                                                            // 301
        extendAutoValueContext: {                                                                                      // 302
          userId: (Meteor.userId && Meteor.userId()) || null,                                                          // 303
          isInsert: true, //methodDoc should be treated like insertDoc                                                 // 304
          isUpdate: false,                                                                                             // 305
          isUpsert: false,                                                                                             // 306
          isFromTrustedCode: false                                                                                     // 307
        }                                                                                                              // 308
      });                                                                                                              // 309
      // Validate first                                                                                                // 310
      if (!isValid(methodDocForValidation, false, method)) {                                                           // 311
        return haltSubmission();                                                                                       // 312
      }                                                                                                                // 313
      Meteor.call(method, methodDoc, form.updateDoc, docId, makeCallback(method, afterMethod));                        // 314
    }                                                                                                                  // 315
  },                                                                                                                   // 316
  'keyup [data-schema-key]': function autoFormKeyUpHandler(event, template) {                                          // 317
    var validationType = template.data.validation || 'submitThenKeyup';                                                // 318
    var onlyIfAlreadyInvalid = (validationType === 'submitThenKeyup');                                                 // 319
    var skipEmpty = !(event.keyCode === 8 || event.keyCode === 46); //if deleting or backspacing, don't skip empty     // 320
    if ((validationType === 'keyup' || validationType === 'submitThenKeyup')) {                                        // 321
      validateField(event.currentTarget.getAttribute("data-schema-key"), template, skipEmpty, onlyIfAlreadyInvalid);   // 322
    }                                                                                                                  // 323
  },                                                                                                                   // 324
  'blur [data-schema-key]': function autoFormBlurHandler(event, template) {                                            // 325
    var validationType = template.data.validation || 'submitThenKeyup';                                                // 326
    var onlyIfAlreadyInvalid = (validationType === 'submitThenKeyup' || validationType === 'submitThenBlur');          // 327
    if (validationType === 'keyup' || validationType === 'blur' || validationType === 'submitThenKeyup' || validationType === 'submitThenBlur') {
      validateField(event.currentTarget.getAttribute("data-schema-key"), template, false, onlyIfAlreadyInvalid);       // 329
    }                                                                                                                  // 330
  },                                                                                                                   // 331
  'change form': function autoFormChangeHandler(event, template) {                                                     // 332
    var key = event.target.getAttribute("data-schema-key");                                                            // 333
    if (!key)                                                                                                          // 334
      return;                                                                                                          // 335
                                                                                                                       // 336
    var formId = this.id;                                                                                              // 337
    var data = formData[formId];                                                                                       // 338
    if (data && data.ss) {                                                                                             // 339
      var ss = data.ss;                                                                                                // 340
      formPreserve.registerForm(formId, function autoFormRegFormCallback() {                                           // 341
        return getFormValues(template, formId, ss).insertDoc;                                                          // 342
      });                                                                                                              // 343
                                                                                                                       // 344
      // Get field's value for reactive show/hide of other fields by value                                             // 345
      updateTrackedFieldValue(formId, key, getFieldValue(template, key));                                              // 346
    }                                                                                                                  // 347
    var validationType = data.validationType || 'submitThenKeyup';                                                     // 348
    var onlyIfAlreadyInvalid = (validationType === 'submitThenKeyup' || validationType === 'submitThenBlur');          // 349
    if (validationType === 'keyup' || validationType === 'blur' || validationType === 'submitThenKeyup' || validationType === 'submitThenBlur') {
      validateField(key, template, false, onlyIfAlreadyInvalid);                                                       // 351
    }                                                                                                                  // 352
  },                                                                                                                   // 353
  'reset form': function autoFormResetHandler(event, template) {                                                       // 354
    var context = this;                                                                                                // 355
    var formId = context.id || defaultFormId;                                                                          // 356
    AutoForm.resetForm(formId);                                                                                        // 357
    if (context.doc) {                                                                                                 // 358
      //reload form values from doc                                                                                    // 359
      event.preventDefault();                                                                                          // 360
      template['__component__'].render();                                                                              // 361
    }                                                                                                                  // 362
  },                                                                                                                   // 363
  'keydown .autoform-array-item input': function (event, template) {                                                   // 364
    // When enter is pressed in an array item field, default behavior                                                  // 365
    // seems to be to "click" the remove item button. This doesn't make                                                // 366
    // sense so we stop it.                                                                                            // 367
    if (event.keyCode === 13) {                                                                                        // 368
      event.preventDefault();                                                                                          // 369
    }                                                                                                                  // 370
  },                                                                                                                   // 371
  'click .autoform-remove-item': function autoFormClickRemoveItem(event, template) {                                   // 372
    var self = this; // This type of button must be used within an afEachArrayItem block, so we know the context       // 373
                                                                                                                       // 374
    event.preventDefault();                                                                                            // 375
                                                                                                                       // 376
    var name = self.arrayFieldName;                                                                                    // 377
    var minCount = self.minCount; // optional, overrides schema                                                        // 378
    var maxCount = self.maxCount; // optional, overrides schema                                                        // 379
    var index = self.index;                                                                                            // 380
    var data = template.data;                                                                                          // 381
    var formId = data && data.id || defaultFormId;                                                                     // 382
    var ss = formData[formId].ss;                                                                                      // 383
                                                                                                                       // 384
    // remove the item we clicked                                                                                      // 385
    arrayTracker.removeFromFieldAtIndex(formId, name, index, ss, minCount, maxCount);                                  // 386
  },                                                                                                                   // 387
  'click .autoform-add-item': function autoFormClickAddItem(event, template) {                                         // 388
    event.preventDefault();                                                                                            // 389
                                                                                                                       // 390
    // We pull from data attributes because the button could be manually                                               // 391
    // added anywhere, so we don't know the data context.                                                              // 392
    var btn = $(event.currentTarget);                                                                                  // 393
    var name = btn.attr("data-autoform-field");                                                                        // 394
    var minCount = btn.attr("data-autoform-minCount"); // optional, overrides schema                                   // 395
    var maxCount = btn.attr("data-autoform-maxCount"); // optional, overrides schema                                   // 396
    var data = template.data;                                                                                          // 397
    var formId = data && data.id || defaultFormId;                                                                     // 398
    var ss = formData[formId].ss;                                                                                      // 399
                                                                                                                       // 400
    arrayTracker.addOneToField(formId, name, ss, minCount, maxCount);                                                  // 401
  }                                                                                                                    // 402
});                                                                                                                    // 403
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
