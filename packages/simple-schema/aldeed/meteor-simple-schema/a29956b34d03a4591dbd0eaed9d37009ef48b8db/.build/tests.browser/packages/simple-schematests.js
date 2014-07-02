(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/simple-schema/simple-schema-tests.js                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/*                                                                                                                  // 1
 * BEGIN SETUP FOR TESTS                                                                                            // 2
 */                                                                                                                 // 3
                                                                                                                    // 4
//SimpleSchema.debug = true;                                                                                        // 5
                                                                                                                    // 6
// Custom type for custom type checking                                                                             // 7
Address = function(city, state) {                                                                                   // 8
  this.city = city;                                                                                                 // 9
  this.state = state;                                                                                               // 10
};                                                                                                                  // 11
                                                                                                                    // 12
Address.prototype = {                                                                                               // 13
  constructor: Address,                                                                                             // 14
  toString: function() {                                                                                            // 15
    return this.city + ', ' + this.state;                                                                           // 16
  },                                                                                                                // 17
  clone: function() {                                                                                               // 18
    return new Address(this.city, this.state);                                                                      // 19
  },                                                                                                                // 20
  equals: function(other) {                                                                                         // 21
    if (!(other instanceof Address))                                                                                // 22
      return false;                                                                                                 // 23
    return EJSON.stringify(this) === EJSON.stringify(other);                                                        // 24
  },                                                                                                                // 25
  typeName: function() {                                                                                            // 26
    return "Address";                                                                                               // 27
  },                                                                                                                // 28
  toJSONValue: function() {                                                                                         // 29
    return {                                                                                                        // 30
      city: this.city,                                                                                              // 31
      state: this.state                                                                                             // 32
    };                                                                                                              // 33
  }                                                                                                                 // 34
};                                                                                                                  // 35
                                                                                                                    // 36
var ssr = new SimpleSchema({                                                                                        // 37
  requiredString: {                                                                                                 // 38
    type: String                                                                                                    // 39
  },                                                                                                                // 40
  requiredBoolean: {                                                                                                // 41
    type: Boolean                                                                                                   // 42
  },                                                                                                                // 43
  requiredNumber: {                                                                                                 // 44
    type: Number                                                                                                    // 45
  },                                                                                                                // 46
  requiredDate: {                                                                                                   // 47
    type: Date                                                                                                      // 48
  },                                                                                                                // 49
  requiredEmail: {                                                                                                  // 50
    type: String,                                                                                                   // 51
    regEx: SchemaRegEx.Email                                                                                        // 52
  },                                                                                                                // 53
  requiredUrl: {                                                                                                    // 54
    type: String,                                                                                                   // 55
    regEx: SchemaRegEx.Url                                                                                          // 56
  },                                                                                                                // 57
  requiredObject: {                                                                                                 // 58
    type: Object                                                                                                    // 59
  },                                                                                                                // 60
  'requiredObject.requiredNumber': {                                                                                // 61
    type: Number                                                                                                    // 62
  },                                                                                                                // 63
  optionalObject: {                                                                                                 // 64
    type: Object,                                                                                                   // 65
    optional: true                                                                                                  // 66
  },                                                                                                                // 67
  'optionalObject.requiredString': {                                                                                // 68
    type: String                                                                                                    // 69
  },                                                                                                                // 70
  anOptionalOne: {                                                                                                  // 71
    type: String,                                                                                                   // 72
    optional: true,                                                                                                 // 73
    min: 20                                                                                                         // 74
  }                                                                                                                 // 75
});                                                                                                                 // 76
                                                                                                                    // 77
ssr.messages({                                                                                                      // 78
  "regEx requiredEmail": "[label] is not a valid e-mail address",                                                   // 79
  "regEx requiredUrl": "[label] is not a valid URL"                                                                 // 80
});                                                                                                                 // 81
                                                                                                                    // 82
var ss = new SimpleSchema({                                                                                         // 83
  string: {                                                                                                         // 84
    type: String,                                                                                                   // 85
    optional: true                                                                                                  // 86
  },                                                                                                                // 87
  minMaxString: {                                                                                                   // 88
    type: String,                                                                                                   // 89
    optional: true,                                                                                                 // 90
    min: 10,                                                                                                        // 91
    max: 20,                                                                                                        // 92
    regEx: /^[a-z0-9_]+$/                                                                                           // 93
  },                                                                                                                // 94
  minMaxStringArray: {                                                                                              // 95
    type: [String],                                                                                                 // 96
    optional: true,                                                                                                 // 97
    min: 10,                                                                                                        // 98
    max: 20,                                                                                                        // 99
    minCount: 1,                                                                                                    // 100
    maxCount: 2                                                                                                     // 101
  },                                                                                                                // 102
  allowedStrings: {                                                                                                 // 103
    type: String,                                                                                                   // 104
    optional: true,                                                                                                 // 105
    allowedValues: ["tuna", "fish", "salad"]                                                                        // 106
  },                                                                                                                // 107
  valueIsAllowedString: {                                                                                           // 108
    type: String,                                                                                                   // 109
    optional: true,                                                                                                 // 110
    valueIsAllowed: function(val) {                                                                                 // 111
      return val === void 0 || val === null || val === "pumpkin";                                                   // 112
    }                                                                                                               // 113
  },                                                                                                                // 114
  allowedStringsArray: {                                                                                            // 115
    type: [String],                                                                                                 // 116
    optional: true,                                                                                                 // 117
    allowedValues: ["tuna", "fish", "salad"]                                                                        // 118
  },                                                                                                                // 119
  boolean: {                                                                                                        // 120
    type: Boolean,                                                                                                  // 121
    optional: true                                                                                                  // 122
  },                                                                                                                // 123
  booleanArray: {                                                                                                   // 124
    type: [Boolean],                                                                                                // 125
    optional: true                                                                                                  // 126
  },                                                                                                                // 127
  number: {                                                                                                         // 128
    type: Number,                                                                                                   // 129
    optional: true                                                                                                  // 130
  },                                                                                                                // 131
  'sub.number': {                                                                                                   // 132
    type: Number,                                                                                                   // 133
    optional: true                                                                                                  // 134
  },                                                                                                                // 135
  minMaxNumber: {                                                                                                   // 136
    type: Number,                                                                                                   // 137
    optional: true,                                                                                                 // 138
    min: 10,                                                                                                        // 139
    max: 20                                                                                                         // 140
  },                                                                                                                // 141
  minZero: {                                                                                                        // 142
    type: Number,                                                                                                   // 143
    optional: true,                                                                                                 // 144
    min: 0                                                                                                          // 145
  },                                                                                                                // 146
  maxZero: {                                                                                                        // 147
    type: Number,                                                                                                   // 148
    optional: true,                                                                                                 // 149
    max: 0                                                                                                          // 150
  },                                                                                                                // 151
  minMaxNumberCalculated: {                                                                                         // 152
    type: Number,                                                                                                   // 153
    optional: true,                                                                                                 // 154
    min: function() {                                                                                               // 155
      return 10;                                                                                                    // 156
    },                                                                                                              // 157
    max: function() {                                                                                               // 158
      return 20;                                                                                                    // 159
    }                                                                                                               // 160
  },                                                                                                                // 161
  allowedNumbers: {                                                                                                 // 162
    type: Number,                                                                                                   // 163
    optional: true,                                                                                                 // 164
    allowedValues: [1, 2, 3]                                                                                        // 165
  },                                                                                                                // 166
  valueIsAllowedNumber: {                                                                                           // 167
    type: Number,                                                                                                   // 168
    optional: true,                                                                                                 // 169
    valueIsAllowed: function(val) {                                                                                 // 170
      return val === void 0 || val === null || val === 1;                                                           // 171
    }                                                                                                               // 172
  },                                                                                                                // 173
  allowedNumbersArray: {                                                                                            // 174
    type: [Number],                                                                                                 // 175
    optional: true,                                                                                                 // 176
    allowedValues: [1, 2, 3]                                                                                        // 177
  },                                                                                                                // 178
  decimal: {                                                                                                        // 179
    type: Number,                                                                                                   // 180
    optional: true,                                                                                                 // 181
    decimal: true                                                                                                   // 182
  },                                                                                                                // 183
  date: {                                                                                                           // 184
    type: Date,                                                                                                     // 185
    optional: true                                                                                                  // 186
  },                                                                                                                // 187
  dateArray: {                                                                                                      // 188
    type: [Date],                                                                                                   // 189
    optional: true                                                                                                  // 190
  },                                                                                                                // 191
  minMaxDate: {                                                                                                     // 192
    type: Date,                                                                                                     // 193
    optional: true,                                                                                                 // 194
    min: (new Date(Date.UTC(2013, 0, 1))),                                                                          // 195
    max: (new Date(Date.UTC(2013, 11, 31)))                                                                         // 196
  },                                                                                                                // 197
  minMaxDateCalculated: {                                                                                           // 198
    type: Date,                                                                                                     // 199
    optional: true,                                                                                                 // 200
    min: function() {                                                                                               // 201
      return (new Date(Date.UTC(2013, 0, 1)));                                                                      // 202
    },                                                                                                              // 203
    max: function() {                                                                                               // 204
      return (new Date(Date.UTC(2013, 11, 31)));                                                                    // 205
    }                                                                                                               // 206
  },                                                                                                                // 207
  email: {                                                                                                          // 208
    type: String,                                                                                                   // 209
    regEx: SchemaRegEx.Email,                                                                                       // 210
    optional: true                                                                                                  // 211
  },                                                                                                                // 212
  url: {                                                                                                            // 213
    type: String,                                                                                                   // 214
    regEx: SchemaRegEx.Url,                                                                                         // 215
    optional: true                                                                                                  // 216
  },                                                                                                                // 217
  customObject: {                                                                                                   // 218
    type: Address,                                                                                                  // 219
    optional: true,                                                                                                 // 220
    blackbox: true                                                                                                  // 221
  },                                                                                                                // 222
  blackBoxObject: {                                                                                                 // 223
    type: Object,                                                                                                   // 224
    optional: true,                                                                                                 // 225
    blackbox: true                                                                                                  // 226
  }                                                                                                                 // 227
});                                                                                                                 // 228
                                                                                                                    // 229
ss.messages({                                                                                                       // 230
  minCount: "blah",                                                                                                 // 231
  "regEx email": "[label] is not a valid e-mail address",                                                           // 232
  "regEx url": "[label] is not a valid URL"                                                                         // 233
});                                                                                                                 // 234
                                                                                                                    // 235
var pss = new SimpleSchema({                                                                                        // 236
  password: {                                                                                                       // 237
    type: String                                                                                                    // 238
  },                                                                                                                // 239
  confirmPassword: {                                                                                                // 240
    type: String,                                                                                                   // 241
    custom: function() {                                                                                            // 242
      if (this.value !== this.field('password').value) {                                                            // 243
        return "passwordMismatch";                                                                                  // 244
      }                                                                                                             // 245
    }                                                                                                               // 246
  }                                                                                                                 // 247
});                                                                                                                 // 248
                                                                                                                    // 249
var friends = new SimpleSchema({                                                                                    // 250
  name: {                                                                                                           // 251
    type: String,                                                                                                   // 252
    optional: true                                                                                                  // 253
  },                                                                                                                // 254
  friends: {                                                                                                        // 255
    type: [Object],                                                                                                 // 256
    minCount: 1                                                                                                     // 257
  },                                                                                                                // 258
  'friends.$.name': {                                                                                               // 259
    type: String,                                                                                                   // 260
    max: 3                                                                                                          // 261
  },                                                                                                                // 262
  'friends.$.type': {                                                                                               // 263
    type: String,                                                                                                   // 264
    allowedValues: ["best", "good", "bad"]                                                                          // 265
  },                                                                                                                // 266
  'friends.$.a.b': {                                                                                                // 267
    type: Number,                                                                                                   // 268
    optional: true                                                                                                  // 269
  },                                                                                                                // 270
  enemies: {                                                                                                        // 271
    type: [Object]                                                                                                  // 272
  },                                                                                                                // 273
  'enemies.$.name': {                                                                                               // 274
    type: String                                                                                                    // 275
  },                                                                                                                // 276
  'enemies.$.traits': {                                                                                             // 277
    type: [Object],                                                                                                 // 278
    optional: true                                                                                                  // 279
  },                                                                                                                // 280
  'enemies.$.traits.$.name': {                                                                                      // 281
    type: String                                                                                                    // 282
  },                                                                                                                // 283
  'enemies.$.traits.$.weight': {                                                                                    // 284
    type: Number,                                                                                                   // 285
    decimal: true                                                                                                   // 286
  }                                                                                                                 // 287
});                                                                                                                 // 288
                                                                                                                    // 289
var autoValues = new SimpleSchema({                                                                                 // 290
  name: {                                                                                                           // 291
    type: String                                                                                                    // 292
  },                                                                                                                // 293
  someDefault: {                                                                                                    // 294
    type: Number,                                                                                                   // 295
    autoValue: function() {                                                                                         // 296
      if (!this.isSet) {                                                                                            // 297
        return 5;                                                                                                   // 298
      }                                                                                                             // 299
    }                                                                                                               // 300
  },                                                                                                                // 301
  updateCount: {                                                                                                    // 302
    type: Number,                                                                                                   // 303
    autoValue: function() {                                                                                         // 304
      if (!this.operator) {                                                                                         // 305
        return 0;                                                                                                   // 306
      } else {                                                                                                      // 307
        return {$inc: 1};                                                                                           // 308
      }                                                                                                             // 309
    }                                                                                                               // 310
  },                                                                                                                // 311
  content: {                                                                                                        // 312
    type: String,                                                                                                   // 313
    optional: true                                                                                                  // 314
  },                                                                                                                // 315
  firstWord: {                                                                                                      // 316
    type: String,                                                                                                   // 317
    optional: true,                                                                                                 // 318
    autoValue: function() {                                                                                         // 319
      var content = this.field("content");                                                                          // 320
      if (content.isSet) {                                                                                          // 321
        return content.value.split(' ')[0];                                                                         // 322
      } else {                                                                                                      // 323
        this.unset();                                                                                               // 324
      }                                                                                                             // 325
    }                                                                                                               // 326
  },                                                                                                                // 327
  updatesHistory: {                                                                                                 // 328
    type: [Object],                                                                                                 // 329
    optional: true,                                                                                                 // 330
    autoValue: function() {                                                                                         // 331
      var content = this.field("content");                                                                          // 332
      if (content.isSet) {                                                                                          // 333
        if (!this.operator) {                                                                                       // 334
          return [{                                                                                                 // 335
              date: new Date,                                                                                       // 336
              content: content.value                                                                                // 337
            }];                                                                                                     // 338
        } else {                                                                                                    // 339
          return {                                                                                                  // 340
            $push: {                                                                                                // 341
              date: new Date,                                                                                       // 342
              content: content.value                                                                                // 343
            }                                                                                                       // 344
          };                                                                                                        // 345
        }                                                                                                           // 346
      }                                                                                                             // 347
    }                                                                                                               // 348
  },                                                                                                                // 349
  'updatesHistory.$.date': {                                                                                        // 350
    type: Date,                                                                                                     // 351
    optional: true                                                                                                  // 352
  },                                                                                                                // 353
  'updatesHistory.$.content': {                                                                                     // 354
    type: String,                                                                                                   // 355
    optional: true                                                                                                  // 356
  },                                                                                                                // 357
  avArrayOfObjects: {                                                                                               // 358
    type: [Object],                                                                                                 // 359
    optional: true                                                                                                  // 360
  },                                                                                                                // 361
  'avArrayOfObjects.$.a': {                                                                                         // 362
    type: String                                                                                                    // 363
  },                                                                                                                // 364
  'avArrayOfObjects.$.foo': {                                                                                       // 365
    type: String,                                                                                                   // 366
    autoValue: function () {                                                                                        // 367
      return "bar";                                                                                                 // 368
    }                                                                                                               // 369
  }                                                                                                                 // 370
});                                                                                                                 // 371
                                                                                                                    // 372
var defaultValues = new SimpleSchema({                                                                              // 373
  name: {                                                                                                           // 374
    type: String,                                                                                                   // 375
    defaultValue: "Test",                                                                                           // 376
    optional: true                                                                                                  // 377
  },                                                                                                                // 378
  'a.b': {                                                                                                          // 379
    type: String,                                                                                                   // 380
    defaultValue: "Test",                                                                                           // 381
    optional: true                                                                                                  // 382
  },                                                                                                                // 383
  'b.$.a': {                                                                                                        // 384
    type: String,                                                                                                   // 385
    defaultValue: "Test",                                                                                           // 386
    optional: true                                                                                                  // 387
  },                                                                                                                // 388
  strVals: {                                                                                                        // 389
    type: [String],                                                                                                 // 390
    defaultValue: [],                                                                                               // 391
    optional: true                                                                                                  // 392
  }                                                                                                                 // 393
});                                                                                                                 // 394
                                                                                                                    // 395
var optCust = new SimpleSchema({                                                                                    // 396
  foo: {                                                                                                            // 397
    type: String,                                                                                                   // 398
    optional: true,                                                                                                 // 399
    custom: function() {                                                                                            // 400
      return "custom";                                                                                              // 401
    }                                                                                                               // 402
  }                                                                                                                 // 403
});                                                                                                                 // 404
                                                                                                                    // 405
var reqCust = new SimpleSchema({                                                                                    // 406
  a: {                                                                                                              // 407
    type: [Object],                                                                                                 // 408
    custom: function () {                                                                                           // 409
      // Just adding custom to trigger extra validation                                                             // 410
    }                                                                                                               // 411
  },                                                                                                                // 412
  b: {                                                                                                              // 413
    type: [Object],                                                                                                 // 414
    custom: function () {                                                                                           // 415
      // Just adding custom to trigger extra validation                                                             // 416
    }                                                                                                               // 417
  }                                                                                                                 // 418
});                                                                                                                 // 419
                                                                                                                    // 420
/*                                                                                                                  // 421
 * END SETUP FOR TESTS                                                                                              // 422
 */                                                                                                                 // 423
                                                                                                                    // 424
/*                                                                                                                  // 425
 * BEGIN HELPER METHODS                                                                                             // 426
 */                                                                                                                 // 427
                                                                                                                    // 428
function validate(ss, doc, isModifier, isUpsert, skipClean) {                                                       // 429
  //we will filter, type convert, and validate everything                                                           // 430
  //so that we can be sure the filtering and type converting are not invalidating                                   // 431
  //documents that should be valid                                                                                  // 432
  if (!skipClean) {                                                                                                 // 433
    doc = ss.clean(doc);                                                                                            // 434
  }                                                                                                                 // 435
                                                                                                                    // 436
  var context = ss.newContext();                                                                                    // 437
  context.validate(doc, {modifier: isModifier, upsert: isUpsert});                                                  // 438
  return context;                                                                                                   // 439
}                                                                                                                   // 440
                                                                                                                    // 441
function validateNoClean(ss, doc, isModifier, isUpsert) {                                                           // 442
  return validate(ss, doc, isModifier, isUpsert, true);                                                             // 443
}                                                                                                                   // 444
                                                                                                                    // 445
/*                                                                                                                  // 446
 * END HELPER METHODS                                                                                               // 447
 */                                                                                                                 // 448
                                                                                                                    // 449
/*                                                                                                                  // 450
 * BEGIN TESTS                                                                                                      // 451
 */                                                                                                                 // 452
                                                                                                                    // 453
Tinytest.add("SimpleSchema - Required Checks - Insert - Valid", function(test) {                                    // 454
  var sc = validate(ssr, {                                                                                          // 455
    requiredString: "test",                                                                                         // 456
    requiredBoolean: true,                                                                                          // 457
    requiredNumber: 1,                                                                                              // 458
    requiredDate: (new Date()),                                                                                     // 459
    requiredEmail: "test123@sub.example.edu",                                                                       // 460
    requiredUrl: "http://google.com",                                                                               // 461
    requiredObject: {                                                                                               // 462
      requiredNumber: 1                                                                                             // 463
    },                                                                                                              // 464
    optionalObject: {                                                                                               // 465
      requiredString: "test"                                                                                        // 466
    }                                                                                                               // 467
  });                                                                                                               // 468
  test.equal(sc.invalidKeys(), []);                                                                                 // 469
                                                                                                                    // 470
  var sc = validate(ssr, {                                                                                          // 471
    requiredString: "test",                                                                                         // 472
    requiredBoolean: true,                                                                                          // 473
    requiredNumber: 1,                                                                                              // 474
    requiredDate: (new Date()),                                                                                     // 475
    requiredEmail: "test123@sub.example.edu",                                                                       // 476
    requiredUrl: "http://google.com",                                                                               // 477
    requiredObject: {                                                                                               // 478
      requiredNumber: 1                                                                                             // 479
    },                                                                                                              // 480
  });                                                                                                               // 481
  test.equal(sc.invalidKeys(), []);                                                                                 // 482
});                                                                                                                 // 483
                                                                                                                    // 484
Tinytest.add("SimpleSchema - Required Checks - Insert - Invalid", function(test) {                                  // 485
  var sc = validate(ssr, {});                                                                                       // 486
  test.length(sc.invalidKeys(), 8);                                                                                 // 487
                                                                                                                    // 488
  sc = validate(ssr, {                                                                                              // 489
    requiredString: null,                                                                                           // 490
    requiredBoolean: null,                                                                                          // 491
    requiredNumber: null,                                                                                           // 492
    requiredDate: null,                                                                                             // 493
    requiredEmail: null,                                                                                            // 494
    requiredUrl: null,                                                                                              // 495
    requiredObject: null,                                                                                           // 496
    optionalObject: {                                                                                               // 497
      requiredString: null                                                                                          // 498
    }                                                                                                               // 499
  });                                                                                                               // 500
  test.length(sc.invalidKeys(), 9);                                                                                 // 501
                                                                                                                    // 502
  sc = validate(ssr, {                                                                                              // 503
    requiredString: null,                                                                                           // 504
    requiredBoolean: null,                                                                                          // 505
    requiredNumber: null,                                                                                           // 506
    requiredDate: null,                                                                                             // 507
    requiredEmail: null,                                                                                            // 508
    requiredUrl: null,                                                                                              // 509
    requiredObject: null,                                                                                           // 510
    optionalObject: {}                                                                                              // 511
  });                                                                                                               // 512
  test.length(sc.invalidKeys(), 9);                                                                                 // 513
                                                                                                                    // 514
  sc = validate(ssr, {                                                                                              // 515
    requiredString: null,                                                                                           // 516
    requiredBoolean: null,                                                                                          // 517
    requiredNumber: null,                                                                                           // 518
    requiredDate: null,                                                                                             // 519
    requiredEmail: null,                                                                                            // 520
    requiredUrl: null,                                                                                              // 521
    requiredObject: null,                                                                                           // 522
    optionalObject: null                                                                                            // 523
  });                                                                                                               // 524
  test.length(sc.invalidKeys(), 8);                                                                                 // 525
                                                                                                                    // 526
  sc = validate(ssr, {                                                                                              // 527
    requiredString: void 0,                                                                                         // 528
    requiredBoolean: void 0,                                                                                        // 529
    requiredNumber: void 0,                                                                                         // 530
    requiredDate: void 0,                                                                                           // 531
    requiredEmail: void 0,                                                                                          // 532
    requiredUrl: void 0,                                                                                            // 533
    requiredObject: void 0,                                                                                         // 534
    optionalObject: {                                                                                               // 535
      requiredString: void 0                                                                                        // 536
    }                                                                                                               // 537
  });                                                                                                               // 538
  test.length(sc.invalidKeys(), 9);                                                                                 // 539
                                                                                                                    // 540
  sc = validate(ssr, {                                                                                              // 541
    requiredString: "",                                                                                             // 542
    requiredBoolean: null,                                                                                          // 543
    requiredNumber: null,                                                                                           // 544
    requiredDate: null,                                                                                             // 545
    requiredEmail: null,                                                                                            // 546
    requiredUrl: null,                                                                                              // 547
    requiredObject: null,                                                                                           // 548
    optionalObject: {                                                                                               // 549
      requiredString: ""                                                                                            // 550
    }                                                                                                               // 551
  });                                                                                                               // 552
  test.length(sc.invalidKeys(), 9);                                                                                 // 553
                                                                                                                    // 554
  sc = validate(ssr, {                                                                                              // 555
    requiredString: "   ",                                                                                          // 556
    requiredBoolean: null,                                                                                          // 557
    requiredNumber: null,                                                                                           // 558
    requiredDate: null,                                                                                             // 559
    requiredEmail: null,                                                                                            // 560
    requiredUrl: null,                                                                                              // 561
    requiredObject: null,                                                                                           // 562
    optionalObject: {                                                                                               // 563
      requiredString: "   "                                                                                         // 564
    }                                                                                                               // 565
  });                                                                                                               // 566
  test.length(sc.invalidKeys(), 9);                                                                                 // 567
                                                                                                                    // 568
  //array of objects                                                                                                // 569
  sc = validate(friends, {                                                                                          // 570
    friends: [{name: 'Bob'}],                                                                                       // 571
    enemies: [{}]                                                                                                   // 572
  });                                                                                                               // 573
  test.length(sc.invalidKeys(), 2);                                                                                 // 574
});                                                                                                                 // 575
                                                                                                                    // 576
/*                                                                                                                  // 577
 * Upserts should be validated more like inserts because they might be an insert                                    // 578
 */                                                                                                                 // 579
                                                                                                                    // 580
Tinytest.add("SimpleSchema - Required Checks - Upsert - Valid - $set", function(test) {                             // 581
  var sc = validate(ssr, {$set: {                                                                                   // 582
      requiredString: "test",                                                                                       // 583
      requiredBoolean: true,                                                                                        // 584
      requiredNumber: 1,                                                                                            // 585
      requiredDate: (new Date()),                                                                                   // 586
      requiredEmail: "test123@sub.example.edu",                                                                     // 587
      requiredUrl: "http://google.com",                                                                             // 588
      requiredObject: {                                                                                             // 589
        requiredNumber: 1                                                                                           // 590
      },                                                                                                            // 591
      optionalObject: {                                                                                             // 592
        requiredString: "test"                                                                                      // 593
      }                                                                                                             // 594
    }}, true, true);                                                                                                // 595
  test.equal(sc.invalidKeys(), []);                                                                                 // 596
                                                                                                                    // 597
  sc = validate(ssr, {$set: {                                                                                       // 598
      requiredString: "test",                                                                                       // 599
      requiredBoolean: true,                                                                                        // 600
      requiredNumber: 1,                                                                                            // 601
      requiredDate: (new Date()),                                                                                   // 602
      requiredEmail: "test123@sub.example.edu",                                                                     // 603
      requiredUrl: "http://google.com",                                                                             // 604
      requiredObject: {                                                                                             // 605
        requiredNumber: 1                                                                                           // 606
      },                                                                                                            // 607
      'optionalObject.requiredString': "test"                                                                       // 608
    }}, true, true);                                                                                                // 609
  test.equal(sc.invalidKeys(), []);                                                                                 // 610
});                                                                                                                 // 611
                                                                                                                    // 612
Tinytest.add("SimpleSchema - Required Checks - Upsert - Valid - $setOnInsert", function(test) {                     // 613
  var sc = validate(ssr, {$setOnInsert: {                                                                           // 614
      requiredString: "test",                                                                                       // 615
      requiredBoolean: true,                                                                                        // 616
      requiredNumber: 1,                                                                                            // 617
      requiredDate: (new Date()),                                                                                   // 618
      requiredEmail: "test123@sub.example.edu",                                                                     // 619
      requiredUrl: "http://google.com",                                                                             // 620
      requiredObject: {                                                                                             // 621
        requiredNumber: 1                                                                                           // 622
      },                                                                                                            // 623
      optionalObject: {                                                                                             // 624
        requiredString: "test"                                                                                      // 625
      }                                                                                                             // 626
    }}, true, true);                                                                                                // 627
  test.equal(sc.invalidKeys(), []);                                                                                 // 628
                                                                                                                    // 629
  sc = validate(ssr, {$setOnInsert: {                                                                               // 630
      requiredString: "test",                                                                                       // 631
      requiredBoolean: true,                                                                                        // 632
      requiredNumber: 1,                                                                                            // 633
      requiredDate: (new Date()),                                                                                   // 634
      requiredEmail: "test123@sub.example.edu",                                                                     // 635
      requiredUrl: "http://google.com",                                                                             // 636
      requiredObject: {                                                                                             // 637
        requiredNumber: 1                                                                                           // 638
      },                                                                                                            // 639
      'optionalObject.requiredString': "test"                                                                       // 640
    }}, true, true);                                                                                                // 641
  test.equal(sc.invalidKeys(), []);                                                                                 // 642
});                                                                                                                 // 643
                                                                                                                    // 644
Tinytest.add("SimpleSchema - Required Checks - Upsert - Valid - Combined", function(test) {                         // 645
  //some in $set and some in $setOnInsert, make sure they're merged for validation purposes                         // 646
  ssrCon = validate(ssr, {                                                                                          // 647
    $set: {                                                                                                         // 648
      requiredString: "test",                                                                                       // 649
      requiredBoolean: true,                                                                                        // 650
      requiredNumber: 1,                                                                                            // 651
      requiredDate: (new Date())                                                                                    // 652
    },                                                                                                              // 653
    $setOnInsert: {                                                                                                 // 654
      requiredEmail: "test123@sub.example.edu",                                                                     // 655
      requiredUrl: "http://google.com",                                                                             // 656
      requiredObject: {                                                                                             // 657
        requiredNumber: 1                                                                                           // 658
      },                                                                                                            // 659
      'optionalObject.requiredString': "test"                                                                       // 660
    }                                                                                                               // 661
  }, true, true);                                                                                                   // 662
  test.length(ssrCon.invalidKeys(), 0);                                                                             // 663
                                                                                                                    // 664
  ssrCon = validate(ssr, {                                                                                          // 665
    $set: {                                                                                                         // 666
      requiredString: "test",                                                                                       // 667
      requiredBoolean: true,                                                                                        // 668
      requiredNumber: 1,                                                                                            // 669
      requiredDate: (new Date())                                                                                    // 670
    },                                                                                                              // 671
    $setOnInsert: {                                                                                                 // 672
      requiredEmail: "test123@sub.example.edu",                                                                     // 673
      requiredUrl: "http://google.com",                                                                             // 674
      requiredObject: {                                                                                             // 675
        requiredNumber: 1                                                                                           // 676
      },                                                                                                            // 677
      'optionalObject.requiredString': "test"                                                                       // 678
    }                                                                                                               // 679
  }, true, true);                                                                                                   // 680
  test.length(ssrCon.invalidKeys(), 0);                                                                             // 681
});                                                                                                                 // 682
                                                                                                                    // 683
Tinytest.add("SimpleSchema - Required Checks - Upsert - Invalid - $set", function(test) {                           // 684
  var sc = validate(ssr, {$set: {}}, true, true, true);                                                             // 685
  test.length(sc.invalidKeys(), 8);                                                                                 // 686
                                                                                                                    // 687
  sc = validate(ssr, {$set: {                                                                                       // 688
      requiredString: null,                                                                                         // 689
      requiredBoolean: null,                                                                                        // 690
      requiredNumber: null,                                                                                         // 691
      requiredDate: null,                                                                                           // 692
      requiredEmail: null,                                                                                          // 693
      requiredUrl: null,                                                                                            // 694
      requiredObject: null,                                                                                         // 695
      'optionalObject.requiredString': null                                                                         // 696
    }}, true, true, true);                                                                                          // 697
  test.length(sc.invalidKeys(), 9);                                                                                 // 698
                                                                                                                    // 699
  sc = validate(ssr, {$set: {                                                                                       // 700
      requiredString: void 0,                                                                                       // 701
      requiredBoolean: void 0,                                                                                      // 702
      requiredNumber: void 0,                                                                                       // 703
      requiredDate: void 0,                                                                                         // 704
      requiredEmail: void 0,                                                                                        // 705
      requiredUrl: void 0,                                                                                          // 706
      requiredObject: void 0,                                                                                       // 707
      'optionalObject.requiredString': void 0                                                                       // 708
    }}, true, true, true);                                                                                          // 709
  test.length(sc.invalidKeys(), 9);                                                                                 // 710
                                                                                                                    // 711
  sc = validate(ssr, {$set: {                                                                                       // 712
      requiredString: "",                                                                                           // 713
      requiredBoolean: null,                                                                                        // 714
      requiredNumber: null,                                                                                         // 715
      requiredDate: null,                                                                                           // 716
      requiredEmail: null,                                                                                          // 717
      requiredUrl: null,                                                                                            // 718
      requiredObject: null,                                                                                         // 719
      'optionalObject.requiredString': ""                                                                           // 720
    }}, true, true, true);                                                                                          // 721
  test.length(sc.invalidKeys(), 9);                                                                                 // 722
                                                                                                                    // 723
  sc = validate(ssr, {$set: {                                                                                       // 724
      requiredString: "   ",                                                                                        // 725
      requiredBoolean: null,                                                                                        // 726
      requiredNumber: null,                                                                                         // 727
      requiredDate: null,                                                                                           // 728
      requiredEmail: null,                                                                                          // 729
      requiredUrl: null,                                                                                            // 730
      requiredObject: null,                                                                                         // 731
      'optionalObject.requiredString': "   "                                                                        // 732
    }}, true, true, true);                                                                                          // 733
  test.length(sc.invalidKeys(), 9);                                                                                 // 734
});                                                                                                                 // 735
                                                                                                                    // 736
Tinytest.add("SimpleSchema - Required Checks - Upsert - Invalid - $setOnInsert", function(test) {                   // 737
  var sc = validate(ssr, {$setOnInsert: {}}, true, true, true);                                                     // 738
  test.length(sc.invalidKeys(), 8);                                                                                 // 739
                                                                                                                    // 740
  sc = validate(ssr, {$setOnInsert: {                                                                               // 741
      requiredString: null,                                                                                         // 742
      requiredBoolean: null,                                                                                        // 743
      requiredNumber: null,                                                                                         // 744
      requiredDate: null,                                                                                           // 745
      requiredEmail: null,                                                                                          // 746
      requiredUrl: null,                                                                                            // 747
      requiredObject: null,                                                                                         // 748
      'optionalObject.requiredString': null                                                                         // 749
    }}, true, true, true);                                                                                          // 750
  test.length(sc.invalidKeys(), 9);                                                                                 // 751
                                                                                                                    // 752
  sc = validate(ssr, {$setOnInsert: {                                                                               // 753
      requiredString: void 0,                                                                                       // 754
      requiredBoolean: void 0,                                                                                      // 755
      requiredNumber: void 0,                                                                                       // 756
      requiredDate: void 0,                                                                                         // 757
      requiredEmail: void 0,                                                                                        // 758
      requiredUrl: void 0,                                                                                          // 759
      requiredObject: void 0,                                                                                       // 760
      'optionalObject.requiredString': void 0                                                                       // 761
    }}, true, true, true);                                                                                          // 762
  test.length(sc.invalidKeys(), 9);                                                                                 // 763
                                                                                                                    // 764
  sc = validate(ssr, {$setOnInsert: {                                                                               // 765
      requiredString: "",                                                                                           // 766
      requiredBoolean: null,                                                                                        // 767
      requiredNumber: null,                                                                                         // 768
      requiredDate: null,                                                                                           // 769
      requiredEmail: null,                                                                                          // 770
      requiredUrl: null,                                                                                            // 771
      requiredObject: null,                                                                                         // 772
      'optionalObject.requiredString': ""                                                                           // 773
    }}, true, true, true);                                                                                          // 774
  test.length(sc.invalidKeys(), 9);                                                                                 // 775
                                                                                                                    // 776
  sc = validate(ssr, {$setOnInsert: {                                                                               // 777
      requiredString: "   ",                                                                                        // 778
      requiredBoolean: null,                                                                                        // 779
      requiredNumber: null,                                                                                         // 780
      requiredDate: null,                                                                                           // 781
      requiredEmail: null,                                                                                          // 782
      requiredUrl: null,                                                                                            // 783
      requiredObject: null,                                                                                         // 784
      'optionalObject.requiredString': "   "                                                                        // 785
    }}, true, true, true);                                                                                          // 786
  test.length(sc.invalidKeys(), 9);                                                                                 // 787
                                                                                                                    // 788
  //array of objects                                                                                                // 789
  sc = validate(friends, {$setOnInsert: {                                                                           // 790
      friends: [{name: 'Bob'}],                                                                                     // 791
      enemies: []                                                                                                   // 792
    }}, true, true, true);                                                                                          // 793
  test.length(sc.invalidKeys(), 1);                                                                                 // 794
});                                                                                                                 // 795
                                                                                                                    // 796
Tinytest.add("SimpleSchema - Required Checks - Upsert - Invalid - Combined", function(test) {                       // 797
  //some in $set and some in $setOnInsert, make sure they're merged for validation purposes                         // 798
                                                                                                                    // 799
  var sc = validate(ssr, {$setOnInsert: {}, $set: {}}, true, true, true);                                           // 800
  test.length(sc.invalidKeys(), 8);                                                                                 // 801
                                                                                                                    // 802
  sc = validate(ssr, {                                                                                              // 803
    $set: {                                                                                                         // 804
      requiredString: null,                                                                                         // 805
      requiredBoolean: null,                                                                                        // 806
      requiredNumber: null,                                                                                         // 807
      requiredDate: null                                                                                            // 808
    },                                                                                                              // 809
    $setOnInsert: {                                                                                                 // 810
      requiredEmail: null,                                                                                          // 811
      requiredUrl: null,                                                                                            // 812
      requiredObject: null,                                                                                         // 813
      'optionalObject.requiredString': null                                                                         // 814
    }                                                                                                               // 815
  }, true, true, true);                                                                                             // 816
  test.length(sc.invalidKeys(), 9);                                                                                 // 817
                                                                                                                    // 818
  sc = validate(ssr, {                                                                                              // 819
    $set: {                                                                                                         // 820
      requiredString: void 0,                                                                                       // 821
      requiredBoolean: void 0,                                                                                      // 822
      requiredNumber: void 0,                                                                                       // 823
      requiredDate: void 0                                                                                          // 824
    },                                                                                                              // 825
    $setOnInsert: {                                                                                                 // 826
      requiredEmail: void 0,                                                                                        // 827
      requiredUrl: void 0,                                                                                          // 828
      requiredObject: void 0,                                                                                       // 829
      'optionalObject.requiredString': void 0                                                                       // 830
    }                                                                                                               // 831
  }, true, true, true);                                                                                             // 832
  test.length(sc.invalidKeys(), 9);                                                                                 // 833
                                                                                                                    // 834
  sc = validate(ssr, {                                                                                              // 835
    $set: {                                                                                                         // 836
      requiredString: "",                                                                                           // 837
      requiredBoolean: null,                                                                                        // 838
      requiredNumber: null,                                                                                         // 839
      requiredDate: null                                                                                            // 840
    },                                                                                                              // 841
    $setOnInsert: {                                                                                                 // 842
      requiredEmail: "",                                                                                            // 843
      requiredUrl: "",                                                                                              // 844
      requiredObject: null,                                                                                         // 845
      'optionalObject.requiredString': ""                                                                           // 846
    }                                                                                                               // 847
  }, true, true, true);                                                                                             // 848
  test.length(sc.invalidKeys(), 9);                                                                                 // 849
                                                                                                                    // 850
  sc = validate(ssr, {                                                                                              // 851
    $set: {                                                                                                         // 852
      requiredString: "   ",                                                                                        // 853
      requiredBoolean: null,                                                                                        // 854
      requiredNumber: null,                                                                                         // 855
      requiredDate: null                                                                                            // 856
    },                                                                                                              // 857
    $setOnInsert: {                                                                                                 // 858
      requiredEmail: "   ",                                                                                         // 859
      requiredUrl: "   ",                                                                                           // 860
      requiredObject: null,                                                                                         // 861
      'optionalObject.requiredString': "   "                                                                        // 862
    }                                                                                                               // 863
  }, true, true, true);                                                                                             // 864
  test.length(sc.invalidKeys(), 9);                                                                                 // 865
});                                                                                                                 // 866
                                                                                                                    // 867
Tinytest.add("SimpleSchema - Required Checks - Update - Valid - $set", function(test) {                             // 868
  var sc = validate(ssr, {$set: {}}, true);                                                                         // 869
  test.equal(sc.invalidKeys(), []); //would not cause DB changes, so should not be an error                         // 870
                                                                                                                    // 871
  sc = validate(ssr, {$set: {                                                                                       // 872
      requiredString: void 0,                                                                                       // 873
      requiredBoolean: void 0,                                                                                      // 874
      requiredNumber: void 0,                                                                                       // 875
      requiredDate: void 0,                                                                                         // 876
      requiredEmail: void 0,                                                                                        // 877
      requiredUrl: void 0,                                                                                          // 878
      requiredObject: void 0,                                                                                       // 879
      'optionalObject.requiredString': void 0                                                                       // 880
    }}, true);                                                                                                      // 881
  test.equal(sc.invalidKeys(), []); //would not cause DB changes, so should not be an error                         // 882
                                                                                                                    // 883
  sc = validate(ssr, {$set: {                                                                                       // 884
      requiredString: "test",                                                                                       // 885
      requiredBoolean: true,                                                                                        // 886
      requiredNumber: 1,                                                                                            // 887
      requiredDate: (new Date()),                                                                                   // 888
      requiredEmail: "test123@sub.example.edu",                                                                     // 889
      requiredUrl: "http://google.com",                                                                             // 890
      requiredObject: {},                                                                                           // 891
      'optionalObject.requiredString': "test"                                                                       // 892
    }}, true);                                                                                                      // 893
  test.equal(sc.invalidKeys(), []);                                                                                 // 894
                                                                                                                    // 895
  //array of objects                                                                                                // 896
  sc = validate(friends, {$set: {                                                                                   // 897
      'friends.1.name': "Bob"                                                                                       // 898
    }}, true);                                                                                                      // 899
  test.equal(sc.invalidKeys(), []);                                                                                 // 900
                                                                                                                    // 901
  sc = validate(friends, {$set: {                                                                                   // 902
      friends: [{name: 'Bob', type: 'good'}]                                                                        // 903
    }}, true);                                                                                                      // 904
  test.equal(sc.invalidKeys(), []);                                                                                 // 905
});                                                                                                                 // 906
                                                                                                                    // 907
Tinytest.add("SimpleSchema - Required Checks - Update - Invalid - $set", function(test) {                           // 908
  function t(s, obj, errors) {                                                                                      // 909
    var sc = validateNoClean(s, obj, true);                                                                         // 910
    test.length(sc.invalidKeys(), errors);                                                                          // 911
  }                                                                                                                 // 912
                                                                                                                    // 913
  t(ssr, {$set: {                                                                                                   // 914
    requiredString: null,                                                                                           // 915
    requiredBoolean: null,                                                                                          // 916
    requiredNumber: null,                                                                                           // 917
    requiredDate: null,                                                                                             // 918
    requiredEmail: null,                                                                                            // 919
    requiredUrl: null,                                                                                              // 920
    requiredObject: null,                                                                                           // 921
    'optionalObject.requiredString': null                                                                           // 922
  }}, 8);                                                                                                           // 923
                                                                                                                    // 924
  t(ssr, {$set: {                                                                                                   // 925
    requiredString: "",                                                                                             // 926
    requiredBoolean: null,                                                                                          // 927
    requiredNumber: null,                                                                                           // 928
    requiredDate: null,                                                                                             // 929
    requiredEmail: null,                                                                                            // 930
    requiredUrl: null,                                                                                              // 931
    requiredObject: null,                                                                                           // 932
    'optionalObject.requiredString': ""                                                                             // 933
  }}, 8);                                                                                                           // 934
                                                                                                                    // 935
  t(ssr, {$set: {                                                                                                   // 936
    requiredString: "   ",                                                                                          // 937
    requiredBoolean: null,                                                                                          // 938
    requiredNumber: null,                                                                                           // 939
    requiredDate: null,                                                                                             // 940
    requiredEmail: null,                                                                                            // 941
    requiredUrl: null,                                                                                              // 942
    requiredObject: null,                                                                                           // 943
    'optionalObject.requiredString': "   "                                                                          // 944
  }}, 8);                                                                                                           // 945
                                                                                                                    // 946
  //array of objects                                                                                                // 947
                                                                                                                    // 948
  //name is required                                                                                                // 949
  t(friends, {$set: {                                                                                               // 950
    'friends.1.name': null                                                                                          // 951
  }}, 1);                                                                                                           // 952
                                                                                                                    // 953
  //type is required                                                                                                // 954
  t(friends, {$set: {                                                                                               // 955
    friends: [{name: 'Bob'}]                                                                                        // 956
  }}, 1);                                                                                                           // 957
});                                                                                                                 // 958
                                                                                                                    // 959
Tinytest.add("SimpleSchema - Required Checks - Update - Valid - $unset", function(test) {                           // 960
  var sc = validate(ssr, {$unset: {}}, true);                                                                       // 961
  test.equal(sc.invalidKeys(), []); //would not cause DB changes, so should not be an error                         // 962
                                                                                                                    // 963
  //make sure an optional can be unset when others are required                                                     // 964
  //retest with various values to be sure the value is ignored                                                      // 965
  sc = validate(ssr, {$unset: {                                                                                     // 966
      anOptionalOne: 1                                                                                              // 967
    }}, true);                                                                                                      // 968
  test.equal(sc.invalidKeys(), []);                                                                                 // 969
                                                                                                                    // 970
  sc = validate(ssr, {$unset: {                                                                                     // 971
      anOptionalOne: null                                                                                           // 972
    }}, true);                                                                                                      // 973
  test.equal(sc.invalidKeys(), []);                                                                                 // 974
                                                                                                                    // 975
  sc = validate(ssr, {$unset: {                                                                                     // 976
      anOptionalOne: ""                                                                                             // 977
    }}, true);                                                                                                      // 978
  test.equal(sc.invalidKeys(), []);                                                                                 // 979
                                                                                                                    // 980
  //array of objects                                                                                                // 981
  sc = validate(friends, {$unset: {                                                                                 // 982
      'friends.1.a.b': ""                                                                                           // 983
    }}, true);                                                                                                      // 984
  test.equal(sc.invalidKeys(), []);                                                                                 // 985
                                                                                                                    // 986
  sc = validate(friends, {$unset: {                                                                                 // 987
      'friends.1.a.b': 1,                                                                                           // 988
      'friends.2.a.b': 1,                                                                                           // 989
      'friends.3.a.b': 1                                                                                            // 990
    }}, true);                                                                                                      // 991
  test.equal(sc.invalidKeys(), []);                                                                                 // 992
                                                                                                                    // 993
});                                                                                                                 // 994
                                                                                                                    // 995
Tinytest.add("SimpleSchema - Required Checks - Update - Invalid - $unset", function(test) {                         // 996
  var sc = validate(ssr, {$unset: {                                                                                 // 997
      requiredString: 1,                                                                                            // 998
      requiredBoolean: 1,                                                                                           // 999
      requiredNumber: 1,                                                                                            // 1000
      requiredDate: 1,                                                                                              // 1001
      requiredEmail: 1,                                                                                             // 1002
      requiredUrl: 1                                                                                                // 1003
    }}, true);                                                                                                      // 1004
  test.length(sc.invalidKeys(), 6);                                                                                 // 1005
                                                                                                                    // 1006
  //array of objects                                                                                                // 1007
  sc = validate(friends, {$unset: {                                                                                 // 1008
      'friends.1.name': 1                                                                                           // 1009
    }}, true);                                                                                                      // 1010
  test.length(sc.invalidKeys(), 1);                                                                                 // 1011
                                                                                                                    // 1012
  sc = validate(friends, {$unset: {                                                                                 // 1013
      'friends.1.name': 1,                                                                                          // 1014
      'friends.2.name': 1,                                                                                          // 1015
      'friends.3.name': 1                                                                                           // 1016
    }}, true);                                                                                                      // 1017
  test.length(sc.invalidKeys(), 3);                                                                                 // 1018
});                                                                                                                 // 1019
                                                                                                                    // 1020
Tinytest.add("SimpleSchema - Required Checks - Update - Valid - $rename", function(test) {                          // 1021
  //rename from optional key to another key in schema                                                               // 1022
  var sc = ss.newContext();                                                                                         // 1023
  sc.validate({$rename: {string: "minMaxString"}}, {modifier: true});                                               // 1024
  test.equal(sc.invalidKeys(), []);                                                                                 // 1025
});                                                                                                                 // 1026
                                                                                                                    // 1027
Tinytest.add("SimpleSchema - Required Checks - Update - Invalid - $rename", function(test) {                        // 1028
  //rename from optional key to a key not in schema                                                                 // 1029
  var sc = ss.newContext();                                                                                         // 1030
  sc.validate({$rename: {string: "newString"}}, {modifier: true});                                                  // 1031
  test.equal(sc.invalidKeys()[0]["type"], "keyNotInSchema");                                                        // 1032
                                                                                                                    // 1033
  //rename from required key                                                                                        // 1034
  sc = ssr.newContext();                                                                                            // 1035
  sc.validate({$rename: {requiredString: "newRequiredString"}}, {modifier: true});                                  // 1036
  test.equal(sc.invalidKeys()[0]["type"], "required");                                                              // 1037
});                                                                                                                 // 1038
                                                                                                                    // 1039
Tinytest.add("SimpleSchema - Type Checks - Insert", function(test) {                                                // 1040
  var sc = validate(ss, {                                                                                           // 1041
    string: "test",                                                                                                 // 1042
    boolean: true,                                                                                                  // 1043
    number: 1,                                                                                                      // 1044
    decimal: 1.1,                                                                                                   // 1045
    date: (new Date()),                                                                                             // 1046
    url: "http://google.com",                                                                                       // 1047
    email: "test123@sub.example.edu"                                                                                // 1048
  });                                                                                                               // 1049
  test.equal(sc.invalidKeys(), []);                                                                                 // 1050
  /* STRING FAILURES */                                                                                             // 1051
                                                                                                                    // 1052
  //boolean string failure                                                                                          // 1053
  var sc2 = ss.newContext();                                                                                        // 1054
  sc2.validate({                                                                                                    // 1055
    string: true                                                                                                    // 1056
  });                                                                                                               // 1057
  test.length(sc2.invalidKeys(), 1); //without typeconvert                                                          // 1058
                                                                                                                    // 1059
  sc = validate(ss, {                                                                                               // 1060
    string: true                                                                                                    // 1061
  });                                                                                                               // 1062
  test.equal(sc.invalidKeys(), []); //with typeconvert                                                              // 1063
                                                                                                                    // 1064
  //number string failure                                                                                           // 1065
  sc2.validate({                                                                                                    // 1066
    string: 1                                                                                                       // 1067
  });                                                                                                               // 1068
  test.length(sc2.invalidKeys(), 1); //without typeconvert                                                          // 1069
                                                                                                                    // 1070
  sc = validate(ss, {                                                                                               // 1071
    string: 1                                                                                                       // 1072
  });                                                                                                               // 1073
  test.equal(sc.invalidKeys(), []); //with typeconvert                                                              // 1074
                                                                                                                    // 1075
  //object string failure                                                                                           // 1076
  sc2.validate({                                                                                                    // 1077
    string: {test: "test"}                                                                                          // 1078
  });                                                                                                               // 1079
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1080
                                                                                                                    // 1081
  sc = validate(ss, {                                                                                               // 1082
    string: {test: "test"}                                                                                          // 1083
  });                                                                                                               // 1084
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1085
                                                                                                                    // 1086
  //array string failure                                                                                            // 1087
  sc2.validate({                                                                                                    // 1088
    string: ["test"]                                                                                                // 1089
  });                                                                                                               // 1090
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1091
                                                                                                                    // 1092
  sc = validate(ss, {                                                                                               // 1093
    string: ["test"]                                                                                                // 1094
  });                                                                                                               // 1095
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1096
                                                                                                                    // 1097
  //instance string failure                                                                                         // 1098
  sc2.validate({                                                                                                    // 1099
    string: (new Date())                                                                                            // 1100
  });                                                                                                               // 1101
  test.length(sc2.invalidKeys(), 1); //without filter                                                               // 1102
                                                                                                                    // 1103
  sc = validate(ss, {                                                                                               // 1104
    string: (new Date())                                                                                            // 1105
  });                                                                                                               // 1106
  test.equal(sc.invalidKeys(), []); //with filter                                                                   // 1107
                                                                                                                    // 1108
  /* BOOLEAN FAILURES */                                                                                            // 1109
                                                                                                                    // 1110
  //string bool failure                                                                                             // 1111
  sc = validate(ss, {                                                                                               // 1112
    boolean: "test"                                                                                                 // 1113
  });                                                                                                               // 1114
  test.length(sc.invalidKeys(), 1);                                                                                 // 1115
                                                                                                                    // 1116
  //number bool failure                                                                                             // 1117
  sc = validate(ss, {                                                                                               // 1118
    boolean: 1                                                                                                      // 1119
  });                                                                                                               // 1120
  test.length(sc.invalidKeys(), 1);                                                                                 // 1121
                                                                                                                    // 1122
  //object bool failure                                                                                             // 1123
  sc2.validate({                                                                                                    // 1124
    boolean: {test: "test"}                                                                                         // 1125
  });                                                                                                               // 1126
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1127
                                                                                                                    // 1128
  sc = validate(ss, {                                                                                               // 1129
    boolean: {test: "test"}                                                                                         // 1130
  });                                                                                                               // 1131
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1132
                                                                                                                    // 1133
  //array bool failure                                                                                              // 1134
  sc2.validate({                                                                                                    // 1135
    boolean: ["test"]                                                                                               // 1136
  });                                                                                                               // 1137
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1138
                                                                                                                    // 1139
  sc = validate(ss, {                                                                                               // 1140
    boolean: ["test"]                                                                                               // 1141
  });                                                                                                               // 1142
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1143
                                                                                                                    // 1144
  //instance bool failure                                                                                           // 1145
  sc = validate(ss, {                                                                                               // 1146
    boolean: (new Date())                                                                                           // 1147
  });                                                                                                               // 1148
  test.length(sc.invalidKeys(), 1);                                                                                 // 1149
                                                                                                                    // 1150
  /* NUMBER FAILURES */                                                                                             // 1151
                                                                                                                    // 1152
  //string number failure                                                                                           // 1153
  sc = validate(ss, {                                                                                               // 1154
    number: "test"                                                                                                  // 1155
  });                                                                                                               // 1156
  test.length(sc.invalidKeys(), 1);                                                                                 // 1157
                                                                                                                    // 1158
  //boolean number failure                                                                                          // 1159
  sc = validate(ss, {                                                                                               // 1160
    number: true                                                                                                    // 1161
  });                                                                                                               // 1162
  test.length(sc.invalidKeys(), 1);                                                                                 // 1163
                                                                                                                    // 1164
  //object number failure                                                                                           // 1165
  sc2.validate({                                                                                                    // 1166
    number: {test: "test"}                                                                                          // 1167
  });                                                                                                               // 1168
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1169
                                                                                                                    // 1170
  sc = validate(ss, {                                                                                               // 1171
    number: {test: "test"}                                                                                          // 1172
  });                                                                                                               // 1173
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1174
                                                                                                                    // 1175
  //array number failure                                                                                            // 1176
  sc2.validate({                                                                                                    // 1177
    number: ["test"]                                                                                                // 1178
  });                                                                                                               // 1179
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1180
                                                                                                                    // 1181
  sc = validate(ss, {                                                                                               // 1182
    number: ["test"]                                                                                                // 1183
  });                                                                                                               // 1184
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1185
                                                                                                                    // 1186
  //instance number failure                                                                                         // 1187
  sc = validate(ss, {                                                                                               // 1188
    number: (new Date())                                                                                            // 1189
  });                                                                                                               // 1190
  test.length(sc.invalidKeys(), 1);                                                                                 // 1191
                                                                                                                    // 1192
  //decimal number failure                                                                                          // 1193
  sc = validate(ss, {                                                                                               // 1194
    number: 1.1                                                                                                     // 1195
  });                                                                                                               // 1196
  test.length(sc.invalidKeys(), 1);                                                                                 // 1197
                                                                                                                    // 1198
  //isNaN number failure                                                                                            // 1199
  sc = validate(ss, {                                                                                               // 1200
    number: NaN                                                                                                     // 1201
  });                                                                                                               // 1202
  test.length(sc.invalidKeys(), 1);                                                                                 // 1203
                                                                                                                    // 1204
  /* INSTANCE FAILURES */                                                                                           // 1205
                                                                                                                    // 1206
  //string date failure                                                                                             // 1207
  sc = validate(ss, {                                                                                               // 1208
    date: "test"                                                                                                    // 1209
  });                                                                                                               // 1210
  test.length(sc.invalidKeys(), 1);                                                                                 // 1211
                                                                                                                    // 1212
  //boolean date failure                                                                                            // 1213
  sc = validate(ss, {                                                                                               // 1214
    date: true                                                                                                      // 1215
  });                                                                                                               // 1216
  test.length(sc.invalidKeys(), 1);                                                                                 // 1217
                                                                                                                    // 1218
  //object date failure                                                                                             // 1219
  sc2.validate({                                                                                                    // 1220
    date: {test: "test"}                                                                                            // 1221
  });                                                                                                               // 1222
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1223
                                                                                                                    // 1224
  sc = validate(ss, {                                                                                               // 1225
    date: {test: "test"}                                                                                            // 1226
  });                                                                                                               // 1227
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1228
                                                                                                                    // 1229
  //array date failure                                                                                              // 1230
  sc2.validate({                                                                                                    // 1231
    date: ["test"]                                                                                                  // 1232
  });                                                                                                               // 1233
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1234
                                                                                                                    // 1235
  sc = validate(ss, {                                                                                               // 1236
    date: ["test"]                                                                                                  // 1237
  });                                                                                                               // 1238
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1239
                                                                                                                    // 1240
  //number date failure                                                                                             // 1241
  sc = validate(ss, {                                                                                               // 1242
    date: 1                                                                                                         // 1243
  });                                                                                                               // 1244
  test.length(sc.invalidKeys(), 1);                                                                                 // 1245
                                                                                                                    // 1246
  /* REGEX FAILURES */                                                                                              // 1247
                                                                                                                    // 1248
  sc = validate(ss, {                                                                                               // 1249
    url: "blah"                                                                                                     // 1250
  });                                                                                                               // 1251
  test.length(sc.invalidKeys(), 1);                                                                                 // 1252
                                                                                                                    // 1253
  sc = validate(ss, {                                                                                               // 1254
    email: "blah"                                                                                                   // 1255
  });                                                                                                               // 1256
  test.length(sc.invalidKeys(), 1);                                                                                 // 1257
});                                                                                                                 // 1258
                                                                                                                    // 1259
Tinytest.add("SimpleSchema - Type Checks - Upsert", function(test) {                                                // 1260
  //should validate the same as insert                                                                              // 1261
                                                                                                                    // 1262
  var sc = validate(ss, {$setOnInsert: {                                                                            // 1263
      string: "test",                                                                                               // 1264
      boolean: true,                                                                                                // 1265
      number: 1,                                                                                                    // 1266
      decimal: 1.1,                                                                                                 // 1267
      date: (new Date()),                                                                                           // 1268
      url: "http://google.com",                                                                                     // 1269
      email: "test123@sub.example.edu"                                                                              // 1270
    }}, true, true);                                                                                                // 1271
  test.equal(sc.invalidKeys(), []);                                                                                 // 1272
  /* STRING FAILURES */                                                                                             // 1273
                                                                                                                    // 1274
  //boolean string failure                                                                                          // 1275
  var sc2 = ss.newContext();                                                                                        // 1276
  sc2.validate({$setOnInsert: {                                                                                     // 1277
      string: true                                                                                                  // 1278
    }}, {modifier: true, upsert: true, filter: false, autoConvert: false});                                         // 1279
  test.length(sc2.invalidKeys(), 1); //without typeconvert                                                          // 1280
                                                                                                                    // 1281
  sc = validate(ss, {$setOnInsert: {                                                                                // 1282
      string: true                                                                                                  // 1283
    }}, true, true);                                                                                                // 1284
  test.equal(sc.invalidKeys(), []); //with typeconvert                                                              // 1285
                                                                                                                    // 1286
  //number string failure                                                                                           // 1287
  sc2.validate({$setOnInsert: {                                                                                     // 1288
      string: 1                                                                                                     // 1289
    }}, {modifier: true, upsert: true, filter: false, autoConvert: false});                                         // 1290
  test.length(sc2.invalidKeys(), 1); //without typeconvert                                                          // 1291
                                                                                                                    // 1292
  sc = validate(ss, {$setOnInsert: {                                                                                // 1293
      string: 1                                                                                                     // 1294
    }}, true, true);                                                                                                // 1295
  test.equal(sc.invalidKeys(), []); //with typeconvert                                                              // 1296
                                                                                                                    // 1297
  //object string failure                                                                                           // 1298
  sc2.validate({$setOnInsert: {                                                                                     // 1299
      string: {test: "test"}                                                                                        // 1300
    }}, {modifier: true, upsert: true, filter: false, autoConvert: false});                                         // 1301
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1302
                                                                                                                    // 1303
  sc = validate(ss, {$setOnInsert: {                                                                                // 1304
      string: {test: "test"}                                                                                        // 1305
    }}, true, true);                                                                                                // 1306
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1307
                                                                                                                    // 1308
  //array string failure                                                                                            // 1309
  sc2.validate({$setOnInsert: {                                                                                     // 1310
      string: ["test"]                                                                                              // 1311
    }}, {modifier: true, upsert: true, filter: false, autoConvert: false});                                         // 1312
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1313
                                                                                                                    // 1314
  sc = validate(ss, {$setOnInsert: {                                                                                // 1315
      string: ["test"]                                                                                              // 1316
    }}, true, true);                                                                                                // 1317
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1318
                                                                                                                    // 1319
  //instance string failure                                                                                         // 1320
  sc2.validate({$setOnInsert: {                                                                                     // 1321
      string: (new Date())                                                                                          // 1322
    }}, {modifier: true, upsert: true, filter: false, autoConvert: false});                                         // 1323
  test.length(sc2.invalidKeys(), 1); //without typeconvert                                                          // 1324
                                                                                                                    // 1325
  sc = validate(ss, {$setOnInsert: {                                                                                // 1326
      string: (new Date())                                                                                          // 1327
    }}, true, true);                                                                                                // 1328
  test.equal(sc.invalidKeys(), []); //with typeconvert                                                              // 1329
                                                                                                                    // 1330
  /* BOOLEAN FAILURES */                                                                                            // 1331
                                                                                                                    // 1332
  //string bool failure                                                                                             // 1333
  sc = validate(ss, {$setOnInsert: {                                                                                // 1334
      boolean: "test"                                                                                               // 1335
    }}, true, true);                                                                                                // 1336
  test.length(sc.invalidKeys(), 1);                                                                                 // 1337
                                                                                                                    // 1338
  //number bool failure                                                                                             // 1339
  sc = validate(ss, {$setOnInsert: {                                                                                // 1340
      boolean: 1                                                                                                    // 1341
    }}, true, true);                                                                                                // 1342
  test.length(sc.invalidKeys(), 1);                                                                                 // 1343
                                                                                                                    // 1344
  //object bool failure                                                                                             // 1345
  sc2.validate({$setOnInsert: {                                                                                     // 1346
      boolean: {test: "test"}                                                                                       // 1347
    }}, {modifier: true, upsert: true, filter: false, autoConvert: false});                                         // 1348
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1349
                                                                                                                    // 1350
  sc = validate(ss, {$setOnInsert: {                                                                                // 1351
      boolean: {test: "test"}                                                                                       // 1352
    }}, true, true);                                                                                                // 1353
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1354
                                                                                                                    // 1355
  //array bool failure                                                                                              // 1356
  sc2.validate({$setOnInsert: {                                                                                     // 1357
      boolean: ["test"]                                                                                             // 1358
    }}, {modifier: true, upsert: true, filter: false, autoConvert: false});                                         // 1359
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1360
                                                                                                                    // 1361
  sc = validate(ss, {$setOnInsert: {                                                                                // 1362
      boolean: ["test"]                                                                                             // 1363
    }}, true, true);                                                                                                // 1364
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1365
                                                                                                                    // 1366
  //instance bool failure                                                                                           // 1367
  sc = validate(ss, {$setOnInsert: {                                                                                // 1368
      boolean: (new Date())                                                                                         // 1369
    }}, true, true);                                                                                                // 1370
  test.length(sc.invalidKeys(), 1);                                                                                 // 1371
                                                                                                                    // 1372
  /* NUMBER FAILURES */                                                                                             // 1373
                                                                                                                    // 1374
  //string number failure                                                                                           // 1375
  sc = validate(ss, {$setOnInsert: {                                                                                // 1376
      number: "test"                                                                                                // 1377
    }}, true, true);                                                                                                // 1378
  test.length(sc.invalidKeys(), 1);                                                                                 // 1379
                                                                                                                    // 1380
  //boolean number failure                                                                                          // 1381
  sc = validate(ss, {$setOnInsert: {                                                                                // 1382
      number: true                                                                                                  // 1383
    }}, true, true);                                                                                                // 1384
  test.length(sc.invalidKeys(), 1);                                                                                 // 1385
                                                                                                                    // 1386
  //object number failure                                                                                           // 1387
  sc2.validate({$setOnInsert: {                                                                                     // 1388
      number: {test: "test"}                                                                                        // 1389
    }}, {modifier: true, upsert: true, filter: false, autoConvert: false});                                         // 1390
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1391
                                                                                                                    // 1392
  sc = validate(ss, {$setOnInsert: {                                                                                // 1393
      number: {test: "test"}                                                                                        // 1394
    }}, true, true);                                                                                                // 1395
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1396
                                                                                                                    // 1397
  //array number failure                                                                                            // 1398
  sc2.validate({$setOnInsert: {                                                                                     // 1399
      number: ["test"]                                                                                              // 1400
    }}, {modifier: true, upsert: true, filter: false, autoConvert: false});                                         // 1401
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1402
                                                                                                                    // 1403
  sc = validate(ss, {$setOnInsert: {                                                                                // 1404
      number: ["test"]                                                                                              // 1405
    }}, true, true);                                                                                                // 1406
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1407
                                                                                                                    // 1408
  //instance number failure                                                                                         // 1409
  sc = validate(ss, {$setOnInsert: {                                                                                // 1410
      number: (new Date())                                                                                          // 1411
    }}, true, true);                                                                                                // 1412
  test.length(sc.invalidKeys(), 1);                                                                                 // 1413
                                                                                                                    // 1414
  //decimal number failure                                                                                          // 1415
  sc = validate(ss, {$setOnInsert: {                                                                                // 1416
      number: 1.1                                                                                                   // 1417
    }}, true, true);                                                                                                // 1418
  test.length(sc.invalidKeys(), 1);                                                                                 // 1419
                                                                                                                    // 1420
  /* INSTANCE FAILURES */                                                                                           // 1421
                                                                                                                    // 1422
  //string date failure                                                                                             // 1423
  sc = validate(ss, {$setOnInsert: {                                                                                // 1424
      date: "test"                                                                                                  // 1425
    }}, true, true);                                                                                                // 1426
  test.length(sc.invalidKeys(), 1);                                                                                 // 1427
                                                                                                                    // 1428
  //boolean date failure                                                                                            // 1429
  sc = validate(ss, {$setOnInsert: {                                                                                // 1430
      date: true                                                                                                    // 1431
    }}, true, true);                                                                                                // 1432
  test.length(sc.invalidKeys(), 1);                                                                                 // 1433
                                                                                                                    // 1434
  //object date failure                                                                                             // 1435
  sc2.validate({$setOnInsert: {                                                                                     // 1436
      date: {test: "test"}                                                                                          // 1437
    }}, {modifier: true, upsert: true, filter: false, autoConvert: false});                                         // 1438
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1439
                                                                                                                    // 1440
  sc = validate(ss, {$setOnInsert: {                                                                                // 1441
      date: {test: "test"}                                                                                          // 1442
    }}, true, true);                                                                                                // 1443
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1444
                                                                                                                    // 1445
  //array date failure                                                                                              // 1446
  sc2.validate({$setOnInsert: {                                                                                     // 1447
      date: ["test"]                                                                                                // 1448
    }}, {modifier: true, upsert: true, filter: false, autoConvert: false});                                         // 1449
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1450
                                                                                                                    // 1451
  sc = validate(ss, {$setOnInsert: {                                                                                // 1452
      date: ["test"]                                                                                                // 1453
    }}, true, true);                                                                                                // 1454
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1455
                                                                                                                    // 1456
  //number date failure                                                                                             // 1457
  sc = validate(ss, {$setOnInsert: {                                                                                // 1458
      date: 1                                                                                                       // 1459
    }}, true, true);                                                                                                // 1460
  test.length(sc.invalidKeys(), 1);                                                                                 // 1461
                                                                                                                    // 1462
  /* REGEX FAILURES */                                                                                              // 1463
                                                                                                                    // 1464
  sc = validate(ss, {$setOnInsert: {                                                                                // 1465
      url: "blah"                                                                                                   // 1466
    }}, true, true);                                                                                                // 1467
  test.length(sc.invalidKeys(), 1);                                                                                 // 1468
                                                                                                                    // 1469
  sc = validate(ss, {$setOnInsert: {                                                                                // 1470
      email: "blah"                                                                                                 // 1471
    }}, true, true);                                                                                                // 1472
  test.length(sc.invalidKeys(), 1);                                                                                 // 1473
});                                                                                                                 // 1474
                                                                                                                    // 1475
Tinytest.add("SimpleSchema - Type Checks - Update", function(test) {                                                // 1476
  var sc = validate(ss, {$set: {                                                                                    // 1477
      string: "test",                                                                                               // 1478
      boolean: true,                                                                                                // 1479
      number: 1,                                                                                                    // 1480
      date: (new Date()),                                                                                           // 1481
      url: "http://google.com",                                                                                     // 1482
      email: "test123@sub.example.edu"                                                                              // 1483
    }}, true);                                                                                                      // 1484
  test.equal(sc.invalidKeys(), []);                                                                                 // 1485
                                                                                                                    // 1486
  /* STRING FAILURES */                                                                                             // 1487
                                                                                                                    // 1488
  //boolean string failure                                                                                          // 1489
  var sc2 = ss.newContext();                                                                                        // 1490
  sc2.validate({$set: {                                                                                             // 1491
      string: true                                                                                                  // 1492
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1493
  test.length(sc2.invalidKeys(), 1); //without typeconvert                                                          // 1494
                                                                                                                    // 1495
  sc = validate(ss, {$set: {                                                                                        // 1496
      string: true                                                                                                  // 1497
    }}, true);                                                                                                      // 1498
  test.equal(sc.invalidKeys(), []); //with typeconvert                                                              // 1499
                                                                                                                    // 1500
  //number string failure                                                                                           // 1501
  sc2.validate({$set: {                                                                                             // 1502
      string: 1                                                                                                     // 1503
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1504
  test.length(sc2.invalidKeys(), 1); //without typeconvert                                                          // 1505
                                                                                                                    // 1506
  sc = validate(ss, {$set: {                                                                                        // 1507
      string: 1                                                                                                     // 1508
    }}, true);                                                                                                      // 1509
  test.equal(sc.invalidKeys(), []); //with typeconvert                                                              // 1510
                                                                                                                    // 1511
  //object string failure                                                                                           // 1512
  sc2.validate({$set: {                                                                                             // 1513
      string: {test: "test"}                                                                                        // 1514
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1515
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1516
                                                                                                                    // 1517
  sc = validate(ss, {$set: {                                                                                        // 1518
      string: {test: "test"}                                                                                        // 1519
    }}, true, true);                                                                                                // 1520
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1521
                                                                                                                    // 1522
  //array string failure                                                                                            // 1523
  sc2.validate({$set: {                                                                                             // 1524
      string: ["test"]                                                                                              // 1525
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1526
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1527
                                                                                                                    // 1528
  sc = validate(ss, {$set: {                                                                                        // 1529
      string: ["test"]                                                                                              // 1530
    }}, true);                                                                                                      // 1531
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1532
                                                                                                                    // 1533
  //instance string failure                                                                                         // 1534
  sc2.validate({$set: {                                                                                             // 1535
      string: (new Date())                                                                                          // 1536
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1537
  test.length(sc2.invalidKeys(), 1); //without typeconvert                                                          // 1538
                                                                                                                    // 1539
  sc = validate(ss, {$set: {                                                                                        // 1540
      string: (new Date())                                                                                          // 1541
    }}, true);                                                                                                      // 1542
  test.equal(sc.invalidKeys(), []); //with typeconvert                                                              // 1543
                                                                                                                    // 1544
  /* BOOLEAN FAILURES */                                                                                            // 1545
                                                                                                                    // 1546
  //string bool failure                                                                                             // 1547
  sc = validate(ss, {$set: {                                                                                        // 1548
      boolean: "test"                                                                                               // 1549
    }}, true);                                                                                                      // 1550
  test.length(sc.invalidKeys(), 1);                                                                                 // 1551
                                                                                                                    // 1552
  //number bool failure                                                                                             // 1553
  sc = validate(ss, {$set: {                                                                                        // 1554
      boolean: 1                                                                                                    // 1555
    }}, true);                                                                                                      // 1556
  test.length(sc.invalidKeys(), 1);                                                                                 // 1557
                                                                                                                    // 1558
  //object bool failure                                                                                             // 1559
  sc2.validate({$set: {                                                                                             // 1560
      boolean: {test: "test"}                                                                                       // 1561
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1562
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1563
                                                                                                                    // 1564
  sc = validate(ss, {$set: {                                                                                        // 1565
      boolean: {test: "test"}                                                                                       // 1566
    }}, true, true);                                                                                                // 1567
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1568
                                                                                                                    // 1569
  //array bool failure                                                                                              // 1570
  sc2.validate({$set: {                                                                                             // 1571
      boolean: ["test"]                                                                                             // 1572
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1573
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1574
                                                                                                                    // 1575
  sc = validate(ss, {$set: {                                                                                        // 1576
      boolean: ["test"]                                                                                             // 1577
    }}, true);                                                                                                      // 1578
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1579
                                                                                                                    // 1580
  //instance bool failure                                                                                           // 1581
  sc = validate(ss, {$set: {                                                                                        // 1582
      boolean: (new Date())                                                                                         // 1583
    }}, true);                                                                                                      // 1584
  test.length(sc.invalidKeys(), 1);                                                                                 // 1585
                                                                                                                    // 1586
  /* NUMBER FAILURES */                                                                                             // 1587
                                                                                                                    // 1588
  //string number failure                                                                                           // 1589
  sc = validate(ss, {$set: {                                                                                        // 1590
      number: "test"                                                                                                // 1591
    }}, true);                                                                                                      // 1592
  test.length(sc.invalidKeys(), 1);                                                                                 // 1593
                                                                                                                    // 1594
  //boolean number failure                                                                                          // 1595
  sc = validate(ss, {$set: {                                                                                        // 1596
      number: true                                                                                                  // 1597
    }}, true);                                                                                                      // 1598
  test.length(sc.invalidKeys(), 1);                                                                                 // 1599
                                                                                                                    // 1600
  //object number failure                                                                                           // 1601
  sc2.validate({$set: {                                                                                             // 1602
      number: {test: "test"}                                                                                        // 1603
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1604
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1605
                                                                                                                    // 1606
  sc = validate(ss, {$set: {                                                                                        // 1607
      number: {test: "test"}                                                                                        // 1608
    }}, true, true);                                                                                                // 1609
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1610
                                                                                                                    // 1611
  //array number failure                                                                                            // 1612
  sc2.validate({$set: {                                                                                             // 1613
      number: ["test"]                                                                                              // 1614
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1615
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1616
                                                                                                                    // 1617
  sc = validate(ss, {$set: {                                                                                        // 1618
      number: ["test"]                                                                                              // 1619
    }}, true);                                                                                                      // 1620
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1621
                                                                                                                    // 1622
  //instance number failure                                                                                         // 1623
  sc = validate(ss, {$set: {                                                                                        // 1624
      number: (new Date())                                                                                          // 1625
    }}, true);                                                                                                      // 1626
  test.length(sc.invalidKeys(), 1);                                                                                 // 1627
                                                                                                                    // 1628
  //sub objects                                                                                                     // 1629
  sc = validate(ss, {$set: {                                                                                        // 1630
      'sub.number': 29                                                                                              // 1631
    }}, true);                                                                                                      // 1632
  test.equal(sc.invalidKeys(), []);                                                                                 // 1633
                                                                                                                    // 1634
  sc = validate(ss, {$set: {                                                                                        // 1635
      sub: {number: 29}                                                                                             // 1636
    }}, true);                                                                                                      // 1637
  test.equal(sc.invalidKeys(), []);                                                                                 // 1638
                                                                                                                    // 1639
  sc = validate(ss, {$set: {                                                                                        // 1640
      sub: {number: true}                                                                                           // 1641
    }}, true);                                                                                                      // 1642
  test.length(sc.invalidKeys(), 1);                                                                                 // 1643
                                                                                                                    // 1644
  sc2.validate({$set: {                                                                                             // 1645
      sub: {number: [29]}                                                                                           // 1646
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1647
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1648
                                                                                                                    // 1649
  sc = validate(ss, {$set: {                                                                                        // 1650
      sub: {number: [29]}                                                                                           // 1651
    }}, true);                                                                                                      // 1652
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1653
                                                                                                                    // 1654
  /* INSTANCE FAILURES */                                                                                           // 1655
                                                                                                                    // 1656
  //string date failure                                                                                             // 1657
  sc = validate(ss, {$set: {                                                                                        // 1658
      date: "test"                                                                                                  // 1659
    }}, true);                                                                                                      // 1660
  test.length(sc.invalidKeys(), 1);                                                                                 // 1661
                                                                                                                    // 1662
  //boolean date failure                                                                                            // 1663
  sc = validate(ss, {$set: {                                                                                        // 1664
      date: true                                                                                                    // 1665
    }}, true);                                                                                                      // 1666
  test.length(sc.invalidKeys(), 1);                                                                                 // 1667
                                                                                                                    // 1668
  //object date failure                                                                                             // 1669
  sc2.validate({$set: {                                                                                             // 1670
      date: {test: "test"}                                                                                          // 1671
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1672
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1673
                                                                                                                    // 1674
  sc = validate(ss, {$set: {                                                                                        // 1675
      date: {test: "test"}                                                                                          // 1676
    }}, true, true);                                                                                                // 1677
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1678
                                                                                                                    // 1679
  //array date failure                                                                                              // 1680
  sc2.validate({$set: {                                                                                             // 1681
      date: ["test"]                                                                                                // 1682
    }}, {modifier: true, filter: false, autoConvert: false});                                                       // 1683
  test.length(sc2.invalidKeys(), 2); //without filter                                                               // 1684
                                                                                                                    // 1685
  sc = validate(ss, {$set: {                                                                                        // 1686
      date: ["test"]                                                                                                // 1687
    }}, true);                                                                                                      // 1688
  test.length(sc.invalidKeys(), 1); //with filter                                                                   // 1689
                                                                                                                    // 1690
  //number date failure                                                                                             // 1691
  sc = validate(ss, {$set: {                                                                                        // 1692
      date: 1                                                                                                       // 1693
    }}, true);                                                                                                      // 1694
  test.length(sc.invalidKeys(), 1);                                                                                 // 1695
                                                                                                                    // 1696
  /* REGEX FAILURES */                                                                                              // 1697
                                                                                                                    // 1698
  sc = validate(ss, {$set: {                                                                                        // 1699
      url: "blah"                                                                                                   // 1700
    }}, true);                                                                                                      // 1701
  test.length(sc.invalidKeys(), 1);                                                                                 // 1702
                                                                                                                    // 1703
  sc = validate(ss, {$set: {                                                                                        // 1704
      email: "blah"                                                                                                 // 1705
    }}, true);                                                                                                      // 1706
  test.length(sc.invalidKeys(), 1);                                                                                 // 1707
                                                                                                                    // 1708
  /* ARRAY FAILURES */                                                                                              // 1709
                                                                                                                    // 1710
  sc = validate(ss, {$set: {                                                                                        // 1711
      booleanArray: true,                                                                                           // 1712
      dateArray: new Date,                                                                                          // 1713
      allowedStringsArray: "tuna",                                                                                  // 1714
      allowedNumbersArray: 2                                                                                        // 1715
    }}, true);                                                                                                      // 1716
  test.length(sc.invalidKeys(), 4);                                                                                 // 1717
                                                                                                                    // 1718
  sc = validate(ss, {$push: {                                                                                       // 1719
      booleanArray: "blah",                                                                                         // 1720
      dateArray: "blah",                                                                                            // 1721
      allowedStringsArray: "blah",                                                                                  // 1722
      allowedNumbersArray: 200                                                                                      // 1723
    }}, true);                                                                                                      // 1724
  test.length(sc.invalidKeys(), 4);                                                                                 // 1725
                                                                                                                    // 1726
  sc = validate(ss, {$addToSet: {                                                                                   // 1727
      booleanArray: "blah",                                                                                         // 1728
      dateArray: "blah",                                                                                            // 1729
      allowedStringsArray: "blah",                                                                                  // 1730
      allowedNumbersArray: 200                                                                                      // 1731
    }}, true);                                                                                                      // 1732
  test.length(sc.invalidKeys(), 4);                                                                                 // 1733
                                                                                                                    // 1734
  //these should work                                                                                               // 1735
  sc = validate(ss, {$set: {                                                                                        // 1736
      booleanArray: [true],                                                                                         // 1737
      dateArray: [new Date],                                                                                        // 1738
      allowedStringsArray: ["tuna"],                                                                                // 1739
      allowedNumbersArray: [2]                                                                                      // 1740
    }}, true);                                                                                                      // 1741
  test.equal(sc.invalidKeys(), []);                                                                                 // 1742
                                                                                                                    // 1743
  sc = validate(ss, {$push: {                                                                                       // 1744
      booleanArray: true,                                                                                           // 1745
      dateArray: new Date,                                                                                          // 1746
      allowedStringsArray: "tuna",                                                                                  // 1747
      allowedNumbersArray: 2                                                                                        // 1748
    }}, true);                                                                                                      // 1749
  test.equal(sc.invalidKeys(), []);                                                                                 // 1750
                                                                                                                    // 1751
  sc = validate(ss, {$addToSet: {                                                                                   // 1752
      booleanArray: true,                                                                                           // 1753
      dateArray: new Date,                                                                                          // 1754
      allowedStringsArray: "tuna",                                                                                  // 1755
      allowedNumbersArray: 2                                                                                        // 1756
    }}, true);                                                                                                      // 1757
  test.equal(sc.invalidKeys(), []);                                                                                 // 1758
                                                                                                                    // 1759
  //$each with both invalid                                                                                         // 1760
  sc = validate(ss, {$push: {                                                                                       // 1761
      booleanArray: {$each: ["foo", "bar"]},                                                                        // 1762
      dateArray: {$each: ["foo", "bar"]},                                                                           // 1763
      allowedStringsArray: {$each: ["foo", "bar"]},                                                                 // 1764
      allowedNumbersArray: {$each: [200, 500]}                                                                      // 1765
    }}, true);                                                                                                      // 1766
  test.length(sc.invalidKeys(), 8);                                                                                 // 1767
                                                                                                                    // 1768
  sc = validate(ss, {$addToSet: {                                                                                   // 1769
      booleanArray: {$each: ["foo", "bar"]},                                                                        // 1770
      dateArray: {$each: ["foo", "bar"]},                                                                           // 1771
      allowedStringsArray: {$each: ["foo", "bar"]},                                                                 // 1772
      allowedNumbersArray: {$each: [200, 500]}                                                                      // 1773
    }}, true);                                                                                                      // 1774
  test.length(sc.invalidKeys(), 8);                                                                                 // 1775
                                                                                                                    // 1776
  //$each with one valid and one invalid                                                                            // 1777
  sc = validate(ss, {$push: {                                                                                       // 1778
      booleanArray: {$each: ["foo", true]},                                                                         // 1779
      dateArray: {$each: ["foo", (new Date())]},                                                                    // 1780
      allowedStringsArray: {$each: ["foo", "tuna"]},                                                                // 1781
      allowedNumbersArray: {$each: [200, 1]}                                                                        // 1782
    }}, true);                                                                                                      // 1783
  test.length(sc.invalidKeys(), 4);                                                                                 // 1784
                                                                                                                    // 1785
  sc = validate(ss, {$addToSet: {                                                                                   // 1786
      booleanArray: {$each: ["foo", true]},                                                                         // 1787
      dateArray: {$each: ["foo", (new Date())]},                                                                    // 1788
      allowedStringsArray: {$each: ["foo", "tuna"]},                                                                // 1789
      allowedNumbersArray: {$each: [200, 1]}                                                                        // 1790
    }}, true);                                                                                                      // 1791
  test.length(sc.invalidKeys(), 4);                                                                                 // 1792
                                                                                                                    // 1793
  //$each with both valid                                                                                           // 1794
  sc = validate(ss, {$push: {                                                                                       // 1795
      booleanArray: {$each: [false, true]},                                                                         // 1796
      dateArray: {$each: [(new Date()), (new Date())]},                                                             // 1797
      allowedStringsArray: {$each: ["tuna", "fish"]},                                                               // 1798
      allowedNumbersArray: {$each: [2, 1]}                                                                          // 1799
    }}, true);                                                                                                      // 1800
  test.equal(sc.invalidKeys(), []);                                                                                 // 1801
                                                                                                                    // 1802
  sc = validate(ss, {$addToSet: {                                                                                   // 1803
      booleanArray: {$each: [false, true]},                                                                         // 1804
      dateArray: {$each: [(new Date()), (new Date())]},                                                             // 1805
      allowedStringsArray: {$each: ["tuna", "fish"]},                                                               // 1806
      allowedNumbersArray: {$each: [2, 1]}                                                                          // 1807
    }}, true);                                                                                                      // 1808
  test.equal(sc.invalidKeys(), []);                                                                                 // 1809
                                                                                                                    // 1810
  //make sure slice is ignored                                                                                      // 1811
  sc = validate(ss, {$push: {                                                                                       // 1812
      booleanArray: {$each: [false, true], $slice: -5},                                                             // 1813
      dateArray: {$each: [(new Date()), (new Date())], $slice: -5},                                                 // 1814
      allowedStringsArray: {$each: ["tuna", "fish"], $slice: -5},                                                   // 1815
      allowedNumbersArray: {$each: [2, 1], $slice: -5}                                                              // 1816
    }}, true);                                                                                                      // 1817
  test.equal(sc.invalidKeys(), []);                                                                                 // 1818
                                                                                                                    // 1819
  //pull, pullAll, and pop should be ignored; no validation                                                         // 1820
  sc = validate(ss, {$pull: {                                                                                       // 1821
      booleanArray: "foo",                                                                                          // 1822
      dateArray: "foo",                                                                                             // 1823
      allowedStringsArray: "foo",                                                                                   // 1824
      allowedNumbersArray: 200                                                                                      // 1825
    }}, true);                                                                                                      // 1826
  test.equal(sc.invalidKeys(), []);                                                                                 // 1827
                                                                                                                    // 1828
  sc = validate(ss, {$pull: {                                                                                       // 1829
      booleanArray: {$each: ["foo", "bar"]},                                                                        // 1830
      dateArray: {$each: ["foo", "bar"]},                                                                           // 1831
      allowedStringsArray: {$each: ["foo", "bar"]},                                                                 // 1832
      allowedNumbersArray: {$each: [200, 500]}                                                                      // 1833
    }}, true);                                                                                                      // 1834
  test.equal(sc.invalidKeys(), []);                                                                                 // 1835
                                                                                                                    // 1836
  sc = validate(ss, {$pullAll: {                                                                                    // 1837
      booleanArray: ["foo", "bar"],                                                                                 // 1838
      dateArray: ["foo", "bar"],                                                                                    // 1839
      allowedStringsArray: ["foo", "bar"],                                                                          // 1840
      allowedNumbersArray: [200, 500]                                                                               // 1841
    }}, true);                                                                                                      // 1842
  test.equal(sc.invalidKeys(), []);                                                                                 // 1843
                                                                                                                    // 1844
  sc = validate(ss, {$pop: {                                                                                        // 1845
      booleanArray: 1,                                                                                              // 1846
      dateArray: 1,                                                                                                 // 1847
      allowedStringsArray: 1,                                                                                       // 1848
      allowedNumbersArray: 1                                                                                        // 1849
    }}, true);                                                                                                      // 1850
  test.equal(sc.invalidKeys(), []);                                                                                 // 1851
                                                                                                                    // 1852
  sc = validate(ss, {$pop: {                                                                                        // 1853
      booleanArray: -1,                                                                                             // 1854
      dateArray: -1,                                                                                                // 1855
      allowedStringsArray: -1,                                                                                      // 1856
      allowedNumbersArray: -1                                                                                       // 1857
    }}, true);                                                                                                      // 1858
  test.equal(sc.invalidKeys(), []);                                                                                 // 1859
});                                                                                                                 // 1860
                                                                                                                    // 1861
Tinytest.add("SimpleSchema - Minimum Checks - Insert", function(test) {                                             // 1862
  /* STRING LENGTH */                                                                                               // 1863
  var sc = validate(ss, {                                                                                           // 1864
    minMaxString: "longenough"                                                                                      // 1865
  });                                                                                                               // 1866
  test.equal(sc.invalidKeys(), []);                                                                                 // 1867
  sc = validate(ss, {                                                                                               // 1868
    minMaxString: "short"                                                                                           // 1869
  });                                                                                                               // 1870
  test.length(sc.invalidKeys(), 1);                                                                                 // 1871
  /* NUMBER */                                                                                                      // 1872
  sc = validate(ss, {                                                                                               // 1873
    minMaxNumber: 10                                                                                                // 1874
  });                                                                                                               // 1875
  test.equal(sc.invalidKeys(), []);                                                                                 // 1876
  sc = validate(ss, {                                                                                               // 1877
    minMaxNumber: 9                                                                                                 // 1878
  });                                                                                                               // 1879
  test.length(sc.invalidKeys(), 1);                                                                                 // 1880
  sc = validate(ss, {                                                                                               // 1881
    minMaxNumberCalculated: 10                                                                                      // 1882
  });                                                                                                               // 1883
  test.equal(sc.invalidKeys(), []);                                                                                 // 1884
  sc = validate(ss, {                                                                                               // 1885
    minMaxNumberCalculated: 9                                                                                       // 1886
  });                                                                                                               // 1887
  test.length(sc.invalidKeys(), 1);                                                                                 // 1888
                                                                                                                    // 1889
  sc = validate(ss, {                                                                                               // 1890
    minZero: -1                                                                                                     // 1891
  });                                                                                                               // 1892
  test.length(sc.invalidKeys(), 1);                                                                                 // 1893
                                                                                                                    // 1894
  /* DATE */                                                                                                        // 1895
  sc = validate(ss, {                                                                                               // 1896
    minMaxDate: (new Date(Date.UTC(2013, 0, 1)))                                                                    // 1897
  });                                                                                                               // 1898
  test.equal(sc.invalidKeys(), []);                                                                                 // 1899
  sc = validate(ss, {                                                                                               // 1900
    minMaxDate: (new Date(Date.UTC(2012, 11, 31)))                                                                  // 1901
  });                                                                                                               // 1902
  test.length(sc.invalidKeys(), 1);                                                                                 // 1903
  sc = validate(ss, {                                                                                               // 1904
    minMaxDateCalculated: (new Date(Date.UTC(2013, 0, 1)))                                                          // 1905
  });                                                                                                               // 1906
  test.equal(sc.invalidKeys(), []);                                                                                 // 1907
  sc = validate(ss, {                                                                                               // 1908
    minMaxDateCalculated: (new Date(Date.UTC(2012, 11, 31)))                                                        // 1909
  });                                                                                                               // 1910
  test.length(sc.invalidKeys(), 1);                                                                                 // 1911
                                                                                                                    // 1912
  /* ARRAY COUNT PLUS STRING LENGTH */                                                                              // 1913
                                                                                                                    // 1914
  sc = validate(ss, {                                                                                               // 1915
    minMaxStringArray: ["longenough", "longenough"]                                                                 // 1916
  });                                                                                                               // 1917
  test.equal(sc.invalidKeys(), []);                                                                                 // 1918
                                                                                                                    // 1919
  sc = validate(ss, {                                                                                               // 1920
    minMaxStringArray: ["short", "short"]                                                                           // 1921
  });                                                                                                               // 1922
  test.length(sc.invalidKeys(), 2);                                                                                 // 1923
                                                                                                                    // 1924
  sc = validate(ss, {                                                                                               // 1925
    minMaxStringArray: []                                                                                           // 1926
  });                                                                                                               // 1927
  test.length(sc.invalidKeys(), 1);                                                                                 // 1928
});                                                                                                                 // 1929
                                                                                                                    // 1930
Tinytest.add("SimpleSchema - Minimum Checks - Upsert", function(test) {                                             // 1931
  /* STRING LENGTH */                                                                                               // 1932
  var sc = validate(ss, {$setOnInsert: {                                                                            // 1933
      minMaxString: "longenough"                                                                                    // 1934
    }}, true, true);                                                                                                // 1935
  test.equal(sc.invalidKeys(), []);                                                                                 // 1936
  sc = validate(ss, {$setOnInsert: {                                                                                // 1937
      minMaxString: "short"                                                                                         // 1938
    }}, true, true);                                                                                                // 1939
  test.length(sc.invalidKeys(), 1);                                                                                 // 1940
  /* NUMBER */                                                                                                      // 1941
  sc = validate(ss, {$setOnInsert: {                                                                                // 1942
      minMaxNumber: 10                                                                                              // 1943
    }}, true, true);                                                                                                // 1944
  test.equal(sc.invalidKeys(), []);                                                                                 // 1945
  sc = validate(ss, {$setOnInsert: {                                                                                // 1946
      minMaxNumber: 9                                                                                               // 1947
    }}, true, true);                                                                                                // 1948
  test.length(sc.invalidKeys(), 1);                                                                                 // 1949
  sc = validate(ss, {$setOnInsert: {                                                                                // 1950
      minMaxNumberCalculated: 10                                                                                    // 1951
    }}, true, true);                                                                                                // 1952
  test.equal(sc.invalidKeys(), []);                                                                                 // 1953
  sc = validate(ss, {$setOnInsert: {                                                                                // 1954
      minMaxNumberCalculated: 9                                                                                     // 1955
    }}, true, true);                                                                                                // 1956
  test.length(sc.invalidKeys(), 1);                                                                                 // 1957
                                                                                                                    // 1958
  sc = validate(ss, {$setOnInsert: {                                                                                // 1959
      minZero: -1                                                                                                   // 1960
    }}, true, true);                                                                                                // 1961
  test.length(sc.invalidKeys(), 1);                                                                                 // 1962
                                                                                                                    // 1963
  /* DATE */                                                                                                        // 1964
  sc = validate(ss, {$setOnInsert: {                                                                                // 1965
      minMaxDate: (new Date(Date.UTC(2013, 0, 1)))                                                                  // 1966
    }}, true, true);                                                                                                // 1967
  test.equal(sc.invalidKeys(), []);                                                                                 // 1968
  sc = validate(ss, {$setOnInsert: {                                                                                // 1969
      minMaxDate: (new Date(Date.UTC(2012, 11, 31)))                                                                // 1970
    }}, true, true);                                                                                                // 1971
  test.length(sc.invalidKeys(), 1);                                                                                 // 1972
  sc = validate(ss, {$setOnInsert: {                                                                                // 1973
      minMaxDateCalculated: (new Date(Date.UTC(2013, 0, 1)))                                                        // 1974
    }}, true, true);                                                                                                // 1975
  test.equal(sc.invalidKeys(), []);                                                                                 // 1976
  sc = validate(ss, {$setOnInsert: {                                                                                // 1977
      minMaxDateCalculated: (new Date(Date.UTC(2012, 11, 31)))                                                      // 1978
    }}, true, true);                                                                                                // 1979
  test.length(sc.invalidKeys(), 1);                                                                                 // 1980
  /* ARRAY COUNT PLUS STRING LENGTH */                                                                              // 1981
  sc = validate(ss, {$setOnInsert: {                                                                                // 1982
      minMaxStringArray: ["longenough", "longenough"]                                                               // 1983
    }}, true, true);                                                                                                // 1984
  test.equal(sc.invalidKeys(), []);                                                                                 // 1985
  sc = validate(ss, {$setOnInsert: {                                                                                // 1986
      minMaxStringArray: ["short", "short"]                                                                         // 1987
    }}, true, true);                                                                                                // 1988
  test.length(sc.invalidKeys(), 2);                                                                                 // 1989
  sc = validate(ss, {$setOnInsert: {                                                                                // 1990
      minMaxStringArray: []                                                                                         // 1991
    }}, true, true);                                                                                                // 1992
  test.length(sc.invalidKeys(), 1);                                                                                 // 1993
});                                                                                                                 // 1994
                                                                                                                    // 1995
Tinytest.add("SimpleSchema - Minimum Checks - Update", function(test) {                                             // 1996
  /* STRING LENGTH */                                                                                               // 1997
  var sc = validate(ss, {$set: {                                                                                    // 1998
      minMaxString: "longenough"                                                                                    // 1999
    }}, true);                                                                                                      // 2000
  test.equal(sc.invalidKeys(), []);                                                                                 // 2001
  sc = validate(ss, {$set: {                                                                                        // 2002
      minMaxString: "short"                                                                                         // 2003
    }}, true);                                                                                                      // 2004
  test.length(sc.invalidKeys(), 1);                                                                                 // 2005
  /* NUMBER */                                                                                                      // 2006
  sc = validate(ss, {$set: {                                                                                        // 2007
      minMaxNumber: 10                                                                                              // 2008
    }}, true);                                                                                                      // 2009
  test.equal(sc.invalidKeys(), []);                                                                                 // 2010
  sc = validate(ss, {$set: {                                                                                        // 2011
      minMaxNumber: 9                                                                                               // 2012
    }}, true);                                                                                                      // 2013
  test.length(sc.invalidKeys(), 1);                                                                                 // 2014
  sc = validate(ss, {$set: {                                                                                        // 2015
      minMaxNumberCalculated: 10                                                                                    // 2016
    }}, true);                                                                                                      // 2017
  test.equal(sc.invalidKeys(), []);                                                                                 // 2018
  sc = validate(ss, {$set: {                                                                                        // 2019
      minMaxNumberCalculated: 9                                                                                     // 2020
    }}, true);                                                                                                      // 2021
  test.length(sc.invalidKeys(), 1);                                                                                 // 2022
                                                                                                                    // 2023
  sc = validate(ss, {$set: {                                                                                        // 2024
      minZero: -1                                                                                                   // 2025
    }}, true);                                                                                                      // 2026
  test.length(sc.invalidKeys(), 1);                                                                                 // 2027
                                                                                                                    // 2028
  sc = validate(ss, {$inc: {                                                                                        // 2029
      minZero: -5                                                                                                   // 2030
    }}, true);                                                                                                      // 2031
  // Should not be invalid because we don't know what we're starting from                                           // 2032
  test.length(sc.invalidKeys(), 0);                                                                                 // 2033
                                                                                                                    // 2034
  /* DATE */                                                                                                        // 2035
  sc = validate(ss, {$set: {                                                                                        // 2036
      minMaxDate: (new Date(Date.UTC(2013, 0, 1)))                                                                  // 2037
    }}, true);                                                                                                      // 2038
  test.equal(sc.invalidKeys(), []);                                                                                 // 2039
  sc = validate(ss, {$set: {                                                                                        // 2040
      minMaxDate: (new Date(Date.UTC(2012, 11, 31)))                                                                // 2041
    }}, true);                                                                                                      // 2042
  test.length(sc.invalidKeys(), 1);                                                                                 // 2043
  sc = validate(ss, {$set: {                                                                                        // 2044
      minMaxDateCalculated: (new Date(Date.UTC(2013, 0, 1)))                                                        // 2045
    }}, true);                                                                                                      // 2046
  test.equal(sc.invalidKeys(), []);                                                                                 // 2047
  sc = validate(ss, {$set: {                                                                                        // 2048
      minMaxDateCalculated: (new Date(Date.UTC(2012, 11, 31)))                                                      // 2049
    }}, true);                                                                                                      // 2050
  test.length(sc.invalidKeys(), 1);                                                                                 // 2051
  /* ARRAY COUNT PLUS STRING LENGTH */                                                                              // 2052
  sc = validate(ss, {$set: {                                                                                        // 2053
      minMaxStringArray: ["longenough", "longenough"]                                                               // 2054
    }}, true);                                                                                                      // 2055
  test.equal(sc.invalidKeys(), []);                                                                                 // 2056
  sc = validate(ss, {$set: {                                                                                        // 2057
      minMaxStringArray: ["short", "short"]                                                                         // 2058
    }}, true);                                                                                                      // 2059
  test.length(sc.invalidKeys(), 2);                                                                                 // 2060
  sc = validate(ss, {$set: {                                                                                        // 2061
      minMaxStringArray: []                                                                                         // 2062
    }}, true);                                                                                                      // 2063
  test.length(sc.invalidKeys(), 1);                                                                                 // 2064
});                                                                                                                 // 2065
                                                                                                                    // 2066
Tinytest.add("SimpleSchema - Maximum Checks - Insert", function(test) {                                             // 2067
  /* STRING LENGTH */                                                                                               // 2068
  var sc = validate(ss, {                                                                                           // 2069
    minMaxString: "nottoolongnottoolong"                                                                            // 2070
  });                                                                                                               // 2071
  test.equal(sc.invalidKeys(), []);                                                                                 // 2072
  sc = validate(ss, {                                                                                               // 2073
    minMaxString: "toolongtoolongtoolong"                                                                           // 2074
  });                                                                                                               // 2075
  test.length(sc.invalidKeys(), 1);                                                                                 // 2076
  /* NUMBER */                                                                                                      // 2077
  sc = validate(ss, {                                                                                               // 2078
    minMaxNumber: 20                                                                                                // 2079
  });                                                                                                               // 2080
  test.equal(sc.invalidKeys(), []);                                                                                 // 2081
  sc = validate(ss, {                                                                                               // 2082
    minMaxNumber: 21                                                                                                // 2083
  });                                                                                                               // 2084
  test.length(sc.invalidKeys(), 1);                                                                                 // 2085
  sc = validate(ss, {                                                                                               // 2086
    minMaxNumberCalculated: 20                                                                                      // 2087
  });                                                                                                               // 2088
  test.equal(sc.invalidKeys(), []);                                                                                 // 2089
  sc = validate(ss, {                                                                                               // 2090
    minMaxNumberCalculated: 21                                                                                      // 2091
  });                                                                                                               // 2092
  test.length(sc.invalidKeys(), 1);                                                                                 // 2093
  /* DATE */                                                                                                        // 2094
  sc = validate(ss, {                                                                                               // 2095
    minMaxDate: (new Date(Date.UTC(2013, 11, 31)))                                                                  // 2096
  });                                                                                                               // 2097
  test.equal(sc.invalidKeys(), []);                                                                                 // 2098
  sc = validate(ss, {                                                                                               // 2099
    minMaxDate: (new Date(Date.UTC(2014, 0, 1)))                                                                    // 2100
  });                                                                                                               // 2101
  test.length(sc.invalidKeys(), 1);                                                                                 // 2102
  sc = validate(ss, {                                                                                               // 2103
    minMaxDateCalculated: (new Date(Date.UTC(2013, 11, 31)))                                                        // 2104
  });                                                                                                               // 2105
  test.equal(sc.invalidKeys(), []);                                                                                 // 2106
  sc = validate(ss, {                                                                                               // 2107
    minMaxDateCalculated: (new Date(Date.UTC(2014, 0, 1)))                                                          // 2108
  });                                                                                                               // 2109
  test.length(sc.invalidKeys(), 1);                                                                                 // 2110
  /* ARRAY COUNT PLUS STRING LENGTH */                                                                              // 2111
  sc = validate(ss, {                                                                                               // 2112
    minMaxStringArray: ["nottoolongnottoolong", "nottoolongnottoolong"]                                             // 2113
  });                                                                                                               // 2114
  test.equal(sc.invalidKeys(), []);                                                                                 // 2115
  sc = validate(ss, {                                                                                               // 2116
    minMaxStringArray: ["toolongtoolongtoolong", "toolongtoolongtoolong"]                                           // 2117
  });                                                                                                               // 2118
  test.length(sc.invalidKeys(), 2);                                                                                 // 2119
  sc = validate(ss, {                                                                                               // 2120
    minMaxStringArray: ["nottoolongnottoolong", "nottoolongnottoolong", "nottoolongnottoolong"]                     // 2121
  });                                                                                                               // 2122
  test.length(sc.invalidKeys(), 1);                                                                                 // 2123
});                                                                                                                 // 2124
                                                                                                                    // 2125
Tinytest.add("SimpleSchema - Maximum Checks - Upsert", function(test) {                                             // 2126
  /* STRING LENGTH */                                                                                               // 2127
  var sc = validate(ss, {$setOnInsert: {                                                                            // 2128
      minMaxString: "nottoolongnottoolong"                                                                          // 2129
    }}, true, true);                                                                                                // 2130
  test.equal(sc.invalidKeys(), []);                                                                                 // 2131
  sc = validate(ss, {$setOnInsert: {                                                                                // 2132
      minMaxString: "toolongtoolongtoolong"                                                                         // 2133
    }}, true, true);                                                                                                // 2134
  test.length(sc.invalidKeys(), 1);                                                                                 // 2135
  /* NUMBER */                                                                                                      // 2136
  sc = validate(ss, {$setOnInsert: {                                                                                // 2137
      minMaxNumber: 20                                                                                              // 2138
    }}, true, true);                                                                                                // 2139
  test.equal(sc.invalidKeys(), []);                                                                                 // 2140
  sc = validate(ss, {$setOnInsert: {                                                                                // 2141
      minMaxNumber: 21                                                                                              // 2142
    }}, true, true);                                                                                                // 2143
  test.length(sc.invalidKeys(), 1);                                                                                 // 2144
  sc = validate(ss, {$setOnInsert: {                                                                                // 2145
      minMaxNumberCalculated: 20                                                                                    // 2146
    }}, true, true);                                                                                                // 2147
  test.equal(sc.invalidKeys(), []);                                                                                 // 2148
  sc = validate(ss, {$setOnInsert: {                                                                                // 2149
      minMaxNumberCalculated: 21                                                                                    // 2150
    }}, true, true);                                                                                                // 2151
  test.length(sc.invalidKeys(), 1);                                                                                 // 2152
  /* DATE */                                                                                                        // 2153
  sc = validate(ss, {$setOnInsert: {                                                                                // 2154
      minMaxDate: (new Date(Date.UTC(2013, 11, 31)))                                                                // 2155
    }}, true, true);                                                                                                // 2156
  test.equal(sc.invalidKeys(), []);                                                                                 // 2157
  sc = validate(ss, {$setOnInsert: {                                                                                // 2158
      minMaxDate: (new Date(Date.UTC(2014, 0, 1)))                                                                  // 2159
    }}, true, true);                                                                                                // 2160
  test.length(sc.invalidKeys(), 1);                                                                                 // 2161
  sc = validate(ss, {$setOnInsert: {                                                                                // 2162
      minMaxDateCalculated: (new Date(Date.UTC(2013, 11, 31)))                                                      // 2163
    }}, true, true);                                                                                                // 2164
  test.equal(sc.invalidKeys(), []);                                                                                 // 2165
  sc = validate(ss, {$setOnInsert: {                                                                                // 2166
      minMaxDateCalculated: (new Date(Date.UTC(2014, 0, 1)))                                                        // 2167
    }}, true, true);                                                                                                // 2168
  test.length(sc.invalidKeys(), 1);                                                                                 // 2169
  /* ARRAY COUNT PLUS STRING LENGTH */                                                                              // 2170
  sc = validate(ss, {$setOnInsert: {                                                                                // 2171
      minMaxStringArray: ["nottoolongnottoolong", "nottoolongnottoolong"]                                           // 2172
    }}, true, true);                                                                                                // 2173
  test.equal(sc.invalidKeys(), []);                                                                                 // 2174
  sc = validate(ss, {$setOnInsert: {                                                                                // 2175
      minMaxStringArray: ["toolongtoolongtoolong", "toolongtoolongtoolong"]                                         // 2176
    }}, true, true);                                                                                                // 2177
  test.length(sc.invalidKeys(), 2);                                                                                 // 2178
  sc = validate(ss, {$setOnInsert: {                                                                                // 2179
      minMaxStringArray: ["nottoolongnottoolong", "nottoolongnottoolong", "nottoolongnottoolong"]                   // 2180
    }}, true, true);                                                                                                // 2181
  test.length(sc.invalidKeys(), 1);                                                                                 // 2182
});                                                                                                                 // 2183
                                                                                                                    // 2184
Tinytest.add("SimpleSchema - Maximum Checks - Update", function(test) {                                             // 2185
  /* STRING LENGTH */                                                                                               // 2186
  var sc = validate(ss, {$set: {                                                                                    // 2187
      minMaxString: "nottoolongnottoolong"                                                                          // 2188
    }}, true);                                                                                                      // 2189
  test.equal(sc.invalidKeys(), []);                                                                                 // 2190
  sc = validate(ss, {$set: {                                                                                        // 2191
      minMaxString: "toolongtoolongtoolong"                                                                         // 2192
    }}, true);                                                                                                      // 2193
  test.length(sc.invalidKeys(), 1);                                                                                 // 2194
  /* NUMBER */                                                                                                      // 2195
  sc = validate(ss, {$set: {                                                                                        // 2196
      minMaxNumber: 20                                                                                              // 2197
    }}, true);                                                                                                      // 2198
  test.equal(sc.invalidKeys(), []);                                                                                 // 2199
  sc = validate(ss, {$set: {                                                                                        // 2200
      minMaxNumber: 21                                                                                              // 2201
    }}, true);                                                                                                      // 2202
  test.length(sc.invalidKeys(), 1);                                                                                 // 2203
  sc = validate(ss, {$set: {                                                                                        // 2204
      minMaxNumberCalculated: 20                                                                                    // 2205
    }}, true);                                                                                                      // 2206
  test.equal(sc.invalidKeys(), []);                                                                                 // 2207
  sc = validate(ss, {$set: {                                                                                        // 2208
      minMaxNumberCalculated: 21                                                                                    // 2209
    }}, true);                                                                                                      // 2210
  test.length(sc.invalidKeys(), 1);                                                                                 // 2211
                                                                                                                    // 2212
  sc = validate(ss, {$set: {                                                                                        // 2213
      maxZero: 1                                                                                                    // 2214
    }}, true);                                                                                                      // 2215
  test.length(sc.invalidKeys(), 1);                                                                                 // 2216
                                                                                                                    // 2217
  sc = validate(ss, {$inc: {                                                                                        // 2218
      maxZero: 5                                                                                                    // 2219
    }}, true);                                                                                                      // 2220
  // Should not be invalid because we don't know what we're starting from                                           // 2221
  test.length(sc.invalidKeys(), 0);                                                                                 // 2222
                                                                                                                    // 2223
  /* DATE */                                                                                                        // 2224
  sc = validate(ss, {$set: {                                                                                        // 2225
      minMaxDate: (new Date(Date.UTC(2013, 11, 31)))                                                                // 2226
    }}, true);                                                                                                      // 2227
  test.equal(sc.invalidKeys(), []);                                                                                 // 2228
  sc = validate(ss, {$set: {                                                                                        // 2229
      minMaxDate: (new Date(Date.UTC(2014, 0, 1)))                                                                  // 2230
    }}, true);                                                                                                      // 2231
  test.length(sc.invalidKeys(), 1);                                                                                 // 2232
  sc = validate(ss, {$set: {                                                                                        // 2233
      minMaxDateCalculated: (new Date(Date.UTC(2013, 11, 31)))                                                      // 2234
    }}, true);                                                                                                      // 2235
  test.equal(sc.invalidKeys(), []);                                                                                 // 2236
  sc = validate(ss, {$set: {                                                                                        // 2237
      minMaxDateCalculated: (new Date(Date.UTC(2014, 0, 1)))                                                        // 2238
    }}, true);                                                                                                      // 2239
  test.length(sc.invalidKeys(), 1);                                                                                 // 2240
  /* ARRAY COUNT PLUS STRING LENGTH */                                                                              // 2241
  sc = validate(ss, {$set: {                                                                                        // 2242
      minMaxStringArray: ["nottoolongnottoolong", "nottoolongnottoolong"]                                           // 2243
    }}, true);                                                                                                      // 2244
  test.equal(sc.invalidKeys(), []);                                                                                 // 2245
  sc = validate(ss, {$set: {                                                                                        // 2246
      minMaxStringArray: ["toolongtoolongtoolong", "toolongtoolongtoolong"]                                         // 2247
    }}, true);                                                                                                      // 2248
  test.length(sc.invalidKeys(), 2);                                                                                 // 2249
  sc = validate(ss, {$set: {                                                                                        // 2250
      minMaxStringArray: ["nottoolongnottoolong", "nottoolongnottoolong", "nottoolongnottoolong"]                   // 2251
    }}, true);                                                                                                      // 2252
  test.length(sc.invalidKeys(), 1);                                                                                 // 2253
});                                                                                                                 // 2254
                                                                                                                    // 2255
Tinytest.add("SimpleSchema - Minimum Array Count - Insert - Invalid", function(test) {                              // 2256
  var sc = validate(friends, {                                                                                      // 2257
    friends: [],                                                                                                    // 2258
    enemies: []                                                                                                     // 2259
  });                                                                                                               // 2260
  test.length(sc.invalidKeys(), 1);                                                                                 // 2261
});                                                                                                                 // 2262
                                                                                                                    // 2263
Tinytest.add("SimpleSchema - Minimum Array Count - Update - Invalid", function(test) {                              // 2264
  var sc = validate(friends, {$set: {                                                                               // 2265
      friends: []                                                                                                   // 2266
    }}, true);                                                                                                      // 2267
  test.length(sc.invalidKeys(), 1);                                                                                 // 2268
});                                                                                                                 // 2269
                                                                                                                    // 2270
Tinytest.add("SimpleSchema - Minimum Array Count - Upsert - Invalid", function(test) {                              // 2271
  var sc = validate(friends, {$setOnInsert: {                                                                       // 2272
      friends: [],                                                                                                  // 2273
      enemies: []                                                                                                   // 2274
    }}, true, true);                                                                                                // 2275
  test.length(sc.invalidKeys(), 1);                                                                                 // 2276
});                                                                                                                 // 2277
                                                                                                                    // 2278
Tinytest.add("SimpleSchema - Allowed Values Checks - Insert - Valid", function(test) {                              // 2279
  /* STRING */                                                                                                      // 2280
  var sc = validate(ss, {                                                                                           // 2281
    allowedStrings: "tuna"                                                                                          // 2282
  });                                                                                                               // 2283
  test.equal(sc.invalidKeys(), []);                                                                                 // 2284
                                                                                                                    // 2285
  sc = validate(ss, {                                                                                               // 2286
    valueIsAllowedString: "pumpkin"                                                                                 // 2287
  });                                                                                                               // 2288
  test.equal(sc.invalidKeys(), []);                                                                                 // 2289
                                                                                                                    // 2290
  sc = validate(ss, {                                                                                               // 2291
    allowedStringsArray: ["tuna", "fish", "salad"]                                                                  // 2292
  });                                                                                                               // 2293
  test.equal(sc.invalidKeys(), []);                                                                                 // 2294
                                                                                                                    // 2295
  //array of objects                                                                                                // 2296
  sc = validate(friends, {                                                                                          // 2297
    friends: [{name: 'Bob', type: 'best'}],                                                                         // 2298
    enemies: []                                                                                                     // 2299
  });                                                                                                               // 2300
  test.equal(sc.invalidKeys(), []);                                                                                 // 2301
                                                                                                                    // 2302
  /* NUMBER */                                                                                                      // 2303
  sc = validate(ss, {                                                                                               // 2304
    allowedNumbers: 1                                                                                               // 2305
  });                                                                                                               // 2306
  test.equal(sc.invalidKeys(), []);                                                                                 // 2307
                                                                                                                    // 2308
  sc = validate(ss, {                                                                                               // 2309
    valueIsAllowedNumber: 1                                                                                         // 2310
  });                                                                                                               // 2311
  test.equal(sc.invalidKeys(), []);                                                                                 // 2312
                                                                                                                    // 2313
  sc = validate(ss, {                                                                                               // 2314
    allowedNumbersArray: [1, 2, 3]                                                                                  // 2315
  });                                                                                                               // 2316
  test.equal(sc.invalidKeys(), []);                                                                                 // 2317
                                                                                                                    // 2318
  //array of objects                                                                                                // 2319
  sc = validate(friends, {                                                                                          // 2320
    friends: [{name: 'Bob', type: 'best', a: {b: 5000}}],                                                           // 2321
    enemies: []                                                                                                     // 2322
  });                                                                                                               // 2323
  test.equal(sc.invalidKeys(), []);                                                                                 // 2324
});                                                                                                                 // 2325
                                                                                                                    // 2326
Tinytest.add("SimpleSchema - Allowed Values Checks - Insert - Invalid", function(test) {                            // 2327
  /* STRING */                                                                                                      // 2328
  var sc = validate(ss, {                                                                                           // 2329
    allowedStrings: "tunas"                                                                                         // 2330
  });                                                                                                               // 2331
  test.length(sc.invalidKeys(), 1);                                                                                 // 2332
                                                                                                                    // 2333
  sc = validate(ss, {                                                                                               // 2334
    valueIsAllowedString: "pumpkins"                                                                                // 2335
  });                                                                                                               // 2336
  test.length(sc.invalidKeys(), 1);                                                                                 // 2337
                                                                                                                    // 2338
  //array                                                                                                           // 2339
  sc = validate(ss, {                                                                                               // 2340
    allowedStringsArray: ["tuna", "fish", "sandwich"]                                                               // 2341
  });                                                                                                               // 2342
  test.length(sc.invalidKeys(), 1);                                                                                 // 2343
                                                                                                                    // 2344
  //array of objects                                                                                                // 2345
  sc = validate(friends, {                                                                                          // 2346
    friends: [{name: 'Bob', type: 'smelly'}],                                                                       // 2347
    enemies: []                                                                                                     // 2348
  });                                                                                                               // 2349
  test.length(sc.invalidKeys(), 1);                                                                                 // 2350
                                                                                                                    // 2351
  /* NUMBER */                                                                                                      // 2352
  sc = validate(ss, {                                                                                               // 2353
    allowedNumbers: 4                                                                                               // 2354
  });                                                                                                               // 2355
  test.length(sc.invalidKeys(), 1);                                                                                 // 2356
                                                                                                                    // 2357
  sc = validate(ss, {                                                                                               // 2358
    valueIsAllowedNumber: 2                                                                                         // 2359
  });                                                                                                               // 2360
  test.length(sc.invalidKeys(), 1);                                                                                 // 2361
                                                                                                                    // 2362
  //array                                                                                                           // 2363
  sc = validate(ss, {                                                                                               // 2364
    allowedNumbersArray: [1, 2, 3, 4]                                                                               // 2365
  });                                                                                                               // 2366
  test.length(sc.invalidKeys(), 1);                                                                                 // 2367
                                                                                                                    // 2368
  //array of objects                                                                                                // 2369
  sc = validate(friends, {                                                                                          // 2370
    friends: [{name: 'Bob', type: 'best', a: {b: "wrong"}}],                                                        // 2371
    enemies: []                                                                                                     // 2372
  });                                                                                                               // 2373
  test.length(sc.invalidKeys(), 1);                                                                                 // 2374
});                                                                                                                 // 2375
                                                                                                                    // 2376
Tinytest.add("SimpleSchema - Allowed Values Checks - Upsert - Valid - $setOnInsert", function(test) {               // 2377
  /* STRING */                                                                                                      // 2378
  var sc = validate(ss, {$setOnInsert: {                                                                            // 2379
      allowedStrings: "tuna"                                                                                        // 2380
    }}, true, true);                                                                                                // 2381
  test.equal(sc.invalidKeys(), []);                                                                                 // 2382
                                                                                                                    // 2383
  sc = validate(ss, {$setOnInsert: {                                                                                // 2384
      valueIsAllowedString: "pumpkin"                                                                               // 2385
    }}, true, true);                                                                                                // 2386
  test.equal(sc.invalidKeys(), []);                                                                                 // 2387
                                                                                                                    // 2388
  //array                                                                                                           // 2389
  sc = validate(ss, {$setOnInsert: {                                                                                // 2390
      allowedStringsArray: ["tuna", "fish", "salad"]                                                                // 2391
    }}, true, true);                                                                                                // 2392
  test.equal(sc.invalidKeys(), []);                                                                                 // 2393
                                                                                                                    // 2394
  //array of objects                                                                                                // 2395
  sc = validate(friends, {$setOnInsert: {                                                                           // 2396
      friends: [{name: 'Bob', type: 'best'}],                                                                       // 2397
      enemies: []                                                                                                   // 2398
    }}, true, true);                                                                                                // 2399
  test.equal(sc.invalidKeys(), []);                                                                                 // 2400
                                                                                                                    // 2401
  /* NUMBER */                                                                                                      // 2402
  sc = validate(ss, {$setOnInsert: {                                                                                // 2403
      allowedNumbers: 1                                                                                             // 2404
    }}, true, true);                                                                                                // 2405
  test.equal(sc.invalidKeys(), []);                                                                                 // 2406
                                                                                                                    // 2407
  sc = validate(ss, {$setOnInsert: {                                                                                // 2408
      valueIsAllowedNumber: 1                                                                                       // 2409
    }}, true, true);                                                                                                // 2410
  test.equal(sc.invalidKeys(), []);                                                                                 // 2411
                                                                                                                    // 2412
  //array                                                                                                           // 2413
  sc = validate(ss, {$setOnInsert: {                                                                                // 2414
      allowedNumbersArray: [1, 2, 3]                                                                                // 2415
    }}, true, true);                                                                                                // 2416
  test.equal(sc.invalidKeys(), []);                                                                                 // 2417
                                                                                                                    // 2418
  //array of objects                                                                                                // 2419
  sc = validate(friends, {$setOnInsert: {                                                                           // 2420
      friends: [{name: 'Bob', type: 'best', a: {b: 5000}}],                                                         // 2421
      enemies: []                                                                                                   // 2422
    }}, true, true);                                                                                                // 2423
  test.equal(sc.invalidKeys(), []);                                                                                 // 2424
});                                                                                                                 // 2425
                                                                                                                    // 2426
Tinytest.add("SimpleSchema - Allowed Values Checks - Upsert - Invalid - $setOnInsert", function(test) {             // 2427
  /* STRING */                                                                                                      // 2428
  var sc = validate(ss, {$setOnInsert: {                                                                            // 2429
      allowedStrings: "tunas"                                                                                       // 2430
    }}, true, true);                                                                                                // 2431
  test.length(sc.invalidKeys(), 1);                                                                                 // 2432
                                                                                                                    // 2433
  sc = validate(ss, {$setOnInsert: {                                                                                // 2434
      valueIsAllowedString: "pumpkins"                                                                              // 2435
    }}, true, true);                                                                                                // 2436
  test.length(sc.invalidKeys(), 1);                                                                                 // 2437
                                                                                                                    // 2438
  //array                                                                                                           // 2439
  sc = validate(ss, {$setOnInsert: {                                                                                // 2440
      allowedStringsArray: ["tuna", "fish", "sandwich"]                                                             // 2441
    }}, true, true);                                                                                                // 2442
  test.length(sc.invalidKeys(), 1);                                                                                 // 2443
                                                                                                                    // 2444
  //array of objects                                                                                                // 2445
  sc = validate(friends, {$setOnInsert: {                                                                           // 2446
      friends: [{name: 'Bob', type: 'smelly'}],                                                                     // 2447
      enemies: []                                                                                                   // 2448
    }}, true, true);                                                                                                // 2449
  test.length(sc.invalidKeys(), 1);                                                                                 // 2450
                                                                                                                    // 2451
  /* NUMBER */                                                                                                      // 2452
  sc = validate(ss, {$setOnInsert: {                                                                                // 2453
      allowedNumbers: 4                                                                                             // 2454
    }}, true, true);                                                                                                // 2455
  test.length(sc.invalidKeys(), 1);                                                                                 // 2456
                                                                                                                    // 2457
  sc = validate(ss, {$setOnInsert: {                                                                                // 2458
      valueIsAllowedNumber: 2                                                                                       // 2459
    }}, true, true);                                                                                                // 2460
  test.length(sc.invalidKeys(), 1);                                                                                 // 2461
                                                                                                                    // 2462
  //array                                                                                                           // 2463
  sc = validate(ss, {$setOnInsert: {                                                                                // 2464
      allowedNumbersArray: [1, 2, 3, 4]                                                                             // 2465
    }}, true, true);                                                                                                // 2466
  test.length(sc.invalidKeys(), 1);                                                                                 // 2467
                                                                                                                    // 2468
  //array of objects                                                                                                // 2469
  sc = validate(friends, {$setOnInsert: {                                                                           // 2470
      friends: [{name: 'Bob', type: 'best', a: {b: "wrong"}}],                                                      // 2471
      enemies: []                                                                                                   // 2472
    }}, true, true);                                                                                                // 2473
  test.length(sc.invalidKeys(), 1);                                                                                 // 2474
});                                                                                                                 // 2475
                                                                                                                    // 2476
Tinytest.add("SimpleSchema - Allowed Values Checks - Update - Valid - $set", function(test) {                       // 2477
  /* STRING */                                                                                                      // 2478
  var sc = validate(ss, {$set: {                                                                                    // 2479
      allowedStrings: "tuna"                                                                                        // 2480
    }}, true);                                                                                                      // 2481
  test.equal(sc.invalidKeys(), []);                                                                                 // 2482
                                                                                                                    // 2483
  sc = validate(ss, {$set: {                                                                                        // 2484
      valueIsAllowedString: "pumpkin"                                                                               // 2485
    }}, true);                                                                                                      // 2486
  test.equal(sc.invalidKeys(), []);                                                                                 // 2487
                                                                                                                    // 2488
  //array                                                                                                           // 2489
  sc = validate(ss, {$set: {                                                                                        // 2490
      allowedStringsArray: ["tuna", "fish", "salad"]                                                                // 2491
    }}, true);                                                                                                      // 2492
  test.equal(sc.invalidKeys(), []);                                                                                 // 2493
                                                                                                                    // 2494
  //array of objects                                                                                                // 2495
  sc = validate(friends, {$set: {                                                                                   // 2496
      'friends.$.name': 'Bob'                                                                                       // 2497
    }}, true);                                                                                                      // 2498
  test.equal(sc.invalidKeys(), []);                                                                                 // 2499
                                                                                                                    // 2500
  sc = validate(friends, {$set: {                                                                                   // 2501
      'friends.1.name': 'Bob'                                                                                       // 2502
    }}, true);                                                                                                      // 2503
  test.equal(sc.invalidKeys(), []);                                                                                 // 2504
                                                                                                                    // 2505
  /* NUMBER */                                                                                                      // 2506
  sc = validate(ss, {$set: {                                                                                        // 2507
      allowedNumbers: 1                                                                                             // 2508
    }}, true);                                                                                                      // 2509
  test.equal(sc.invalidKeys(), []);                                                                                 // 2510
                                                                                                                    // 2511
  sc = validate(ss, {$set: {                                                                                        // 2512
      valueIsAllowedNumber: 1                                                                                       // 2513
    }}, true);                                                                                                      // 2514
  test.equal(sc.invalidKeys(), []);                                                                                 // 2515
                                                                                                                    // 2516
  sc = validate(ss, {$set: {                                                                                        // 2517
      allowedNumbersArray: [1, 2, 3]                                                                                // 2518
    }}, true);                                                                                                      // 2519
  test.equal(sc.invalidKeys(), []);                                                                                 // 2520
                                                                                                                    // 2521
});                                                                                                                 // 2522
                                                                                                                    // 2523
Tinytest.add("SimpleSchema - Allowed Values Checks - Update - Invalid - $set", function(test) {                     // 2524
  /* STRING */                                                                                                      // 2525
  var sc = validate(ss, {$set: {                                                                                    // 2526
      allowedStrings: "tunas"                                                                                       // 2527
    }}, true);                                                                                                      // 2528
  test.length(sc.invalidKeys(), 1);                                                                                 // 2529
                                                                                                                    // 2530
  sc = validate(ss, {$set: {                                                                                        // 2531
      valueIsAllowedString: "pumpkins"                                                                              // 2532
    }}, true);                                                                                                      // 2533
  test.length(sc.invalidKeys(), 1);                                                                                 // 2534
                                                                                                                    // 2535
  //array                                                                                                           // 2536
  sc = validate(ss, {$set: {                                                                                        // 2537
      allowedStringsArray: ["tuna", "fish", "sandwich"]                                                             // 2538
    }}, true);                                                                                                      // 2539
  test.length(sc.invalidKeys(), 1);                                                                                 // 2540
                                                                                                                    // 2541
  //array of objects                                                                                                // 2542
  sc = validate(friends, {$set: {                                                                                   // 2543
      'friends.$.name': 'Bobby'                                                                                     // 2544
    }}, true);                                                                                                      // 2545
  test.length(sc.invalidKeys(), 1);                                                                                 // 2546
                                                                                                                    // 2547
  sc = validate(friends, {$set: {                                                                                   // 2548
      'friends.1.name': 'Bobby'                                                                                     // 2549
    }}, true);                                                                                                      // 2550
  test.length(sc.invalidKeys(), 1);                                                                                 // 2551
                                                                                                                    // 2552
  /* NUMBER */                                                                                                      // 2553
  sc = validate(ss, {$set: {                                                                                        // 2554
      allowedNumbers: 4                                                                                             // 2555
    }}, true);                                                                                                      // 2556
  test.length(sc.invalidKeys(), 1);                                                                                 // 2557
                                                                                                                    // 2558
  sc = validate(ss, {$set: {                                                                                        // 2559
      valueIsAllowedNumber: 2                                                                                       // 2560
    }}, true);                                                                                                      // 2561
  test.length(sc.invalidKeys(), 1);                                                                                 // 2562
                                                                                                                    // 2563
  sc = validate(ss, {$set: {                                                                                        // 2564
      allowedNumbersArray: [1, 2, 3, 4]                                                                             // 2565
    }}, true);                                                                                                      // 2566
  test.length(sc.invalidKeys(), 1);                                                                                 // 2567
});                                                                                                                 // 2568
                                                                                                                    // 2569
Tinytest.add("SimpleSchema - Black Box Objects", function(test) {                                                   // 2570
  var sc = validate(ss, {                                                                                           // 2571
    blackBoxObject: "string"                                                                                        // 2572
  }, false, false, true);                                                                                           // 2573
  test.length(sc.invalidKeys(), 1);                                                                                 // 2574
                                                                                                                    // 2575
  var sc = validate(ss, {                                                                                           // 2576
    blackBoxObject: {}                                                                                              // 2577
  }, false, false, true);                                                                                           // 2578
  test.length(sc.invalidKeys(), 0);                                                                                 // 2579
                                                                                                                    // 2580
  var sc = validate(ss, {                                                                                           // 2581
    blackBoxObject: {                                                                                               // 2582
      foo: "bar"                                                                                                    // 2583
    }                                                                                                               // 2584
  }, false, false, true);                                                                                           // 2585
  test.length(sc.invalidKeys(), 0);                                                                                 // 2586
                                                                                                                    // 2587
  var sc = validate(ss, {$set: {                                                                                    // 2588
    blackBoxObject: {                                                                                               // 2589
      foo: "bar"                                                                                                    // 2590
    }                                                                                                               // 2591
  }}, true, false, true);                                                                                           // 2592
  test.length(sc.invalidKeys(), 0);                                                                                 // 2593
                                                                                                                    // 2594
  var sc = validate(ss, {$set: {                                                                                    // 2595
    'blackBoxObject.foo': "bar"                                                                                     // 2596
  }}, true, false, true);                                                                                           // 2597
  test.length(sc.invalidKeys(), 0);                                                                                 // 2598
                                                                                                                    // 2599
  var sc = validate(ss, {$set: {                                                                                    // 2600
    'blackBoxObject.1': "bar"                                                                                       // 2601
  }}, true, false, true);                                                                                           // 2602
  test.length(sc.invalidKeys(), 0);                                                                                 // 2603
                                                                                                                    // 2604
  var sc = validate(ss, {$push: {                                                                                   // 2605
    'blackBoxObject.foo': "bar"                                                                                     // 2606
  }}, true, false, true);                                                                                           // 2607
  test.length(sc.invalidKeys(), 0);                                                                                 // 2608
                                                                                                                    // 2609
  var sc = validate(ss, {$set: {                                                                                    // 2610
    'blackBoxObject': []                                                                                            // 2611
  }}, true, false, true);                                                                                           // 2612
  test.length(sc.invalidKeys(), 1);                                                                                 // 2613
});                                                                                                                 // 2614
                                                                                                                    // 2615
Tinytest.add("SimpleSchema - Validation Against Another Key - Insert - Valid", function(test) {                     // 2616
  var sc = validate(pss, {                                                                                          // 2617
    password: "password",                                                                                           // 2618
    confirmPassword: "password"                                                                                     // 2619
  });                                                                                                               // 2620
  test.equal(sc.invalidKeys(), []);                                                                                 // 2621
});                                                                                                                 // 2622
                                                                                                                    // 2623
Tinytest.add("SimpleSchema - Validation Against Another Key - Upsert - Valid - $setOnInsert", function(test) {      // 2624
  var sc = validate(pss, {$setOnInsert: {                                                                           // 2625
      password: "password",                                                                                         // 2626
      confirmPassword: "password"                                                                                   // 2627
    }}, true, true);                                                                                                // 2628
  test.equal(sc.invalidKeys(), []);                                                                                 // 2629
});                                                                                                                 // 2630
                                                                                                                    // 2631
Tinytest.add("SimpleSchema - Validation Against Another Key - Update - Valid - $set", function(test) {              // 2632
  var sc = validate(pss, {$set: {                                                                                   // 2633
      password: "password",                                                                                         // 2634
      confirmPassword: "password"                                                                                   // 2635
    }}, true);                                                                                                      // 2636
                                                                                                                    // 2637
  test.equal(sc.invalidKeys(), []);                                                                                 // 2638
});                                                                                                                 // 2639
                                                                                                                    // 2640
Tinytest.add("SimpleSchema - Validation Against Another Key - Insert - Invalid", function(test) {                   // 2641
  var sc = validate(pss, {                                                                                          // 2642
    password: "password",                                                                                           // 2643
    confirmPassword: "password1"                                                                                    // 2644
  });                                                                                                               // 2645
  test.length(sc.invalidKeys(), 1);                                                                                 // 2646
  test.equal(sc.invalidKeys()[0].type, "passwordMismatch");                                                         // 2647
});                                                                                                                 // 2648
                                                                                                                    // 2649
Tinytest.add("SimpleSchema - Validation Against Another Key - Upsert - Invalid - $setOnInsert", function(test) {    // 2650
  var sc = validate(pss, {$setOnInsert: {                                                                           // 2651
      password: "password",                                                                                         // 2652
      confirmPassword: "password1"                                                                                  // 2653
    }}, true, true);                                                                                                // 2654
  test.length(sc.invalidKeys(), 1);                                                                                 // 2655
  test.equal(sc.invalidKeys()[0].type, "passwordMismatch");                                                         // 2656
});                                                                                                                 // 2657
                                                                                                                    // 2658
Tinytest.add("SimpleSchema - Validation Against Another Key - Update - Invalid - $set", function(test) {            // 2659
  var sc = validate(pss, {$set: {                                                                                   // 2660
      password: "password",                                                                                         // 2661
      confirmPassword: "password1"                                                                                  // 2662
    }}, true);                                                                                                      // 2663
  test.length(sc.invalidKeys(), 1);                                                                                 // 2664
  test.equal(sc.invalidKeys()[0].type, "passwordMismatch");                                                         // 2665
});                                                                                                                 // 2666
                                                                                                                    // 2667
Tinytest.add("SimpleSchema - Validate with the Match API", function(test) {                                         // 2668
  test.instanceOf(pss, SimpleSchema);                                                                               // 2669
  test.isFalse(Match.test({password: 'pass'}, pss));                                                                // 2670
  test.isTrue(Match.test({password: 'pass', confirmPassword: 'pass'}, pss));                                        // 2671
  try {                                                                                                             // 2672
    check({password: 'pass'}, pss);                                                                                 // 2673
    test.fail({type: 'exception', message: 'expect the check validation to throws an exception'});                  // 2674
  } catch (exception) {                                                                                             // 2675
    test.instanceOf(exception, Match.Error);                                                                        // 2676
  }                                                                                                                 // 2677
});                                                                                                                 // 2678
                                                                                                                    // 2679
Tinytest.add("SimpleSchema - Extend Schema Definition", function(test) {                                            // 2680
  try {                                                                                                             // 2681
    var ssWithUnique = new SimpleSchema({                                                                           // 2682
      name: {                                                                                                       // 2683
        type: String,                                                                                               // 2684
        unique: true                                                                                                // 2685
      }                                                                                                             // 2686
    });                                                                                                             // 2687
  } catch (exception) {                                                                                             // 2688
    test.instanceOf(exception, Error);                                                                              // 2689
  }                                                                                                                 // 2690
                                                                                                                    // 2691
  SimpleSchema.extendOptions({                                                                                      // 2692
    unique: Match.Optional(Boolean)                                                                                 // 2693
  });                                                                                                               // 2694
                                                                                                                    // 2695
  try {                                                                                                             // 2696
    ssWithUnique = new SimpleSchema({                                                                               // 2697
      name: {                                                                                                       // 2698
        type: String,                                                                                               // 2699
        unique: true                                                                                                // 2700
      }                                                                                                             // 2701
    });                                                                                                             // 2702
  } catch (exception) {                                                                                             // 2703
    test.fail({type: 'exception', message: 'define a schema with a unique option in field definition'});            // 2704
  }                                                                                                                 // 2705
});                                                                                                                 // 2706
                                                                                                                    // 2707
Tinytest.add("SimpleSchema - Array of Objects", function(test) {                                                    // 2708
                                                                                                                    // 2709
  var sc = validate(friends, {$set: {                                                                               // 2710
      enemies: [{}]                                                                                                 // 2711
    }}, true);                                                                                                      // 2712
  test.length(sc.invalidKeys(), 1);                                                                                 // 2713
                                                                                                                    // 2714
  sc = validate(friends, {$set: {                                                                                   // 2715
      enemies: [{name: "Zach"}]                                                                                     // 2716
    }}, true);                                                                                                      // 2717
  test.length(sc.invalidKeys(), 0);                                                                                 // 2718
                                                                                                                    // 2719
  sc = validate(friends, {$set: {                                                                                   // 2720
      enemies: [{name: "Zach", traits: []}]                                                                         // 2721
    }}, true);                                                                                                      // 2722
  test.length(sc.invalidKeys(), 0);                                                                                 // 2723
                                                                                                                    // 2724
  sc = validate(friends, {$set: {                                                                                   // 2725
      enemies: [{name: "Zach", traits: [{}]}]                                                                       // 2726
    }}, true);                                                                                                      // 2727
  test.length(sc.invalidKeys(), 2);                                                                                 // 2728
                                                                                                                    // 2729
  sc = validate(friends, {$set: {                                                                                   // 2730
      enemies: [{name: "Zach", traits: [{}, {}]}]                                                                   // 2731
    }}, true);                                                                                                      // 2732
  test.length(sc.invalidKeys(), 4);                                                                                 // 2733
                                                                                                                    // 2734
  sc = validate(friends, {$set: {                                                                                   // 2735
      enemies: [{name: "Zach", traits: [{name: "evil"}]}]                                                           // 2736
    }}, true);                                                                                                      // 2737
  test.length(sc.invalidKeys(), 1);                                                                                 // 2738
                                                                                                                    // 2739
  sc = validate(friends, {$set: {                                                                                   // 2740
      enemies: [{name: "Zach", traits: [{name: "evil", weight: "heavy"}]}]                                          // 2741
    }}, true);                                                                                                      // 2742
  test.length(sc.invalidKeys(), 1);                                                                                 // 2743
                                                                                                                    // 2744
  sc = validate(friends, {$set: {                                                                                   // 2745
      enemies: [{name: "Zach", traits: [{name: "evil", weight: 9.5}]}]                                              // 2746
    }}, true);                                                                                                      // 2747
  test.length(sc.invalidKeys(), 0);                                                                                 // 2748
                                                                                                                    // 2749
  sc = validate(friends, {$push: {                                                                                  // 2750
      friends: {name: "Bob"}                                                                                        // 2751
    }}, true);                                                                                                      // 2752
  test.length(sc.invalidKeys(), 1);                                                                                 // 2753
                                                                                                                    // 2754
  sc = validate(friends, {$push: {                                                                                  // 2755
      friends: {name: "Bob", type: "best"}                                                                          // 2756
    }}, true);                                                                                                      // 2757
  test.equal(sc.invalidKeys(), []);                                                                                 // 2758
                                                                                                                    // 2759
  sc = validate(friends, {$push: {                                                                                  // 2760
      friends: {name: "Bobby", type: "best"}                                                                        // 2761
    }}, true);                                                                                                      // 2762
  test.length(sc.invalidKeys(), 1);                                                                                 // 2763
                                                                                                                    // 2764
  sc = validate(friends, {$push: {                                                                                  // 2765
      friends: {$each: [{name: "Bob", type: "best"}, {name: "Bob", type: "best"}]}                                  // 2766
    }}, true);                                                                                                      // 2767
  test.equal(sc.invalidKeys(), []);                                                                                 // 2768
                                                                                                                    // 2769
  sc = validate(friends, {$push: {                                                                                  // 2770
      friends: {$each: [{name: "Bob", type: "best"}, {name: "Bobby", type: "best"}]}                                // 2771
    }}, true);                                                                                                      // 2772
  test.length(sc.invalidKeys(), 1);                                                                                 // 2773
                                                                                                                    // 2774
  sc = validate(friends, {$push: {                                                                                  // 2775
      friends: {$each: [{name: "Bob", type: 2}, {name: "Bobby", type: "best"}]}                                     // 2776
    }}, true);                                                                                                      // 2777
  test.length(sc.invalidKeys(), 2);                                                                                 // 2778
                                                                                                                    // 2779
  sc = validate(friends, {$addToSet: {                                                                              // 2780
      friends: {name: "Bob"}                                                                                        // 2781
    }}, true);                                                                                                      // 2782
  test.length(sc.invalidKeys(), 1);                                                                                 // 2783
                                                                                                                    // 2784
  sc = validate(friends, {$addToSet: {                                                                              // 2785
      friends: {name: "Bob", type: "best"}                                                                          // 2786
    }}, true);                                                                                                      // 2787
  test.equal(sc.invalidKeys(), []);                                                                                 // 2788
                                                                                                                    // 2789
  sc = validate(friends, {$addToSet: {                                                                              // 2790
      friends: {name: "Bobby", type: "best"}                                                                        // 2791
    }}, true);                                                                                                      // 2792
  test.length(sc.invalidKeys(), 1);                                                                                 // 2793
                                                                                                                    // 2794
  sc = validate(friends, {$addToSet: {                                                                              // 2795
      friends: {$each: [{name: "Bob", type: "best"}, {name: "Bob", type: "best"}]}                                  // 2796
    }}, true);                                                                                                      // 2797
  test.equal(sc.invalidKeys(), []);                                                                                 // 2798
                                                                                                                    // 2799
  sc = validate(friends, {$addToSet: {                                                                              // 2800
      friends: {$each: [{name: "Bob", type: "best"}, {name: "Bobby", type: "best"}]}                                // 2801
    }}, true);                                                                                                      // 2802
  test.length(sc.invalidKeys(), 1);                                                                                 // 2803
                                                                                                                    // 2804
  sc = validate(friends, {$addToSet: {                                                                              // 2805
      friends: {$each: [{name: "Bob", type: 2}, {name: "Bobby", type: "best"}]}                                     // 2806
    }}, true);                                                                                                      // 2807
  test.length(sc.invalidKeys(), 2);                                                                                 // 2808
});                                                                                                                 // 2809
                                                                                                                    // 2810
Tinytest.add("SimpleSchema - Multiple Contexts", function(test) {                                                   // 2811
  var ssContext1 = ssr.newContext();                                                                                // 2812
  ssContext1.validate({});                                                                                          // 2813
  test.length(ssContext1.invalidKeys(), 8);                                                                         // 2814
  var ssContext2 = ssr.newContext();                                                                                // 2815
  ssContext2.validate({                                                                                             // 2816
    requiredString: "test",                                                                                         // 2817
    requiredBoolean: true,                                                                                          // 2818
    requiredNumber: 1,                                                                                              // 2819
    requiredDate: (new Date()),                                                                                     // 2820
    requiredEmail: "test123@sub.example.edu",                                                                       // 2821
    requiredUrl: "http://google.com",                                                                               // 2822
    requiredObject: {                                                                                               // 2823
      requiredNumber: 1                                                                                             // 2824
    },                                                                                                              // 2825
    optionalObject: {                                                                                               // 2826
      requiredString: "test"                                                                                        // 2827
    }                                                                                                               // 2828
  });                                                                                                               // 2829
  test.length(ssContext1.invalidKeys(), 8);                                                                         // 2830
  test.length(ssContext2.invalidKeys(), 0);                                                                         // 2831
});                                                                                                                 // 2832
                                                                                                                    // 2833
Tinytest.add("SimpleSchema - Cleanup With Modifier Operators", function(test) {                                     // 2834
                                                                                                                    // 2835
  function doTest(given, expected) {                                                                                // 2836
    var cleanObj = ss.clean(given);                                                                                 // 2837
    test.equal(cleanObj, expected);                                                                                 // 2838
  }                                                                                                                 // 2839
                                                                                                                    // 2840
  //BASELINE                                                                                                        // 2841
                                                                                                                    // 2842
  //when you clean a good object it's still good                                                                    // 2843
  doTest({string: "This is a string"}, {string: "This is a string"});                                               // 2844
  //when you clean a bad object it's now good                                                                       // 2845
  doTest({string: "This is a string", admin: true}, {string: "This is a string"});                                  // 2846
  //type conversion works                                                                                           // 2847
  doTest({string: 1}, {string: "1"});                                                                               // 2848
  //remove empty strings                                                                                            // 2849
  doTest({string: ""}, {});                                                                                         // 2850
                                                                                                                    // 2851
  //WITH CUSTOM OBJECT                                                                                              // 2852
                                                                                                                    // 2853
  //when you clean a good object it's still good                                                                    // 2854
  var myObj = new Address("New York", "NY");                                                                        // 2855
  doTest({customObject: myObj}, {customObject: myObj});                                                             // 2856
                                                                                                                    // 2857
  //when you clean a good object it's still good                                                                    // 2858
  var myObj = {                                                                                                     // 2859
    foo: "bar",                                                                                                     // 2860
    "foobar.foobar": 10000                                                                                          // 2861
  };                                                                                                                // 2862
  doTest({blackBoxObject: myObj}, {blackBoxObject: myObj});                                                         // 2863
                                                                                                                    // 2864
  //$SET                                                                                                            // 2865
                                                                                                                    // 2866
  //when you clean a good object it's still good                                                                    // 2867
  doTest({$set: {string: "This is a string"}}, {$set: {string: "This is a string"}});                               // 2868
  //when you clean a bad object it's now good                                                                       // 2869
  doTest({$set: {string: "This is a string", admin: true}}, {$set: {string: "This is a string"}});                  // 2870
  //type conversion works                                                                                           // 2871
  doTest({$set: {string: 1}}, {$set: {string: "1"}});                                                               // 2872
  //remove empty strings                                                                                            // 2873
  doTest({$set: {string: ""}}, {$set: {}});                                                                         // 2874
                                                                                                                    // 2875
  //$UNSET                                                                                                          // 2876
                                                                                                                    // 2877
  //when you clean a good object it's still good                                                                    // 2878
  doTest({$unset: {string: null}}, {$unset: {string: null}});                                                       // 2879
  //when you clean a bad object it's now good                                                                       // 2880
  doTest({$unset: {string: null, admin: null}}, {$unset: {string: null}});                                          // 2881
                                                                                                                    // 2882
  //$SETONINSERT                                                                                                    // 2883
                                                                                                                    // 2884
  //when you clean a good object it's still good                                                                    // 2885
  doTest({$setOnInsert: {string: "This is a string"}}, {$setOnInsert: {string: "This is a string"}});               // 2886
  //when you clean a bad object it's now good                                                                       // 2887
  doTest({$setOnInsert: {string: "This is a string", admin: true}}, {$setOnInsert: {string: "This is a string"}});  // 2888
  //type conversion works                                                                                           // 2889
  doTest({$setOnInsert: {string: 1}}, {$setOnInsert: {string: "1"}});                                               // 2890
                                                                                                                    // 2891
  //$INC                                                                                                            // 2892
                                                                                                                    // 2893
  //when you clean a good object it's still good                                                                    // 2894
  doTest({$inc: {number: 1}}, {$inc: {number: 1}});                                                                 // 2895
  //when you clean a bad object it's now good                                                                       // 2896
  doTest({$inc: {number: 1, admin: 1}}, {$inc: {number: 1}});                                                       // 2897
  //type conversion works                                                                                           // 2898
  doTest({$inc: {number: "1"}}, {$inc: {number: 1}});                                                               // 2899
                                                                                                                    // 2900
  //$ADDTOSET                                                                                                       // 2901
                                                                                                                    // 2902
  //when you clean a good object it's still good                                                                    // 2903
  doTest({$addToSet: {allowedNumbersArray: 1}}, {$addToSet: {allowedNumbersArray: 1}});                             // 2904
  //when you clean a bad object it's now good                                                                       // 2905
  doTest({$addToSet: {allowedNumbersArray: 1, admin: 1}}, {$addToSet: {allowedNumbersArray: 1}});                   // 2906
  //type conversion works                                                                                           // 2907
  doTest({$addToSet: {allowedNumbersArray: "1"}}, {$addToSet: {allowedNumbersArray: 1}});                           // 2908
                                                                                                                    // 2909
  //$ADDTOSET WITH EACH                                                                                             // 2910
                                                                                                                    // 2911
  //when you clean a good object it's still good                                                                    // 2912
  doTest({$addToSet: {allowedNumbersArray: {$each: [1, 2, 3]}}}, {$addToSet: {allowedNumbersArray: {$each: [1, 2, 3]}}});
  //when you clean a bad object it's now good                                                                       // 2914
  doTest({$addToSet: {allowedNumbersArray: {$each: [1, 2, 3]}, admin: {$each: [1, 2, 3]}}}, {$addToSet: {allowedNumbersArray: {$each: [1, 2, 3]}}});
  //type conversion works                                                                                           // 2916
  doTest({$addToSet: {allowedNumbersArray: {$each: ["1", 2, 3]}}}, {$addToSet: {allowedNumbersArray: {$each: [1, 2, 3]}}});
                                                                                                                    // 2918
  //$PUSH                                                                                                           // 2919
                                                                                                                    // 2920
  //when you clean a good object it's still good                                                                    // 2921
  doTest({$push: {allowedNumbersArray: 1}}, {$push: {allowedNumbersArray: 1}});                                     // 2922
  //when you clean a bad object it's now good                                                                       // 2923
  doTest({$push: {allowedNumbersArray: 1, admin: 1}}, {$push: {allowedNumbersArray: 1}});                           // 2924
  //type conversion works                                                                                           // 2925
  doTest({$push: {allowedNumbersArray: "1"}}, {$push: {allowedNumbersArray: 1}});                                   // 2926
                                                                                                                    // 2927
  //$PUSH WITH EACH                                                                                                 // 2928
                                                                                                                    // 2929
  //when you clean a good object it's still good                                                                    // 2930
  doTest({$push: {allowedNumbersArray: {$each: [1, 2, 3]}}}, {$push: {allowedNumbersArray: {$each: [1, 2, 3]}}});   // 2931
  //when you clean a bad object it's now good                                                                       // 2932
  doTest({$push: {allowedNumbersArray: {$each: [1, 2, 3]}, admin: {$each: [1, 2, 3]}}}, {$push: {allowedNumbersArray: {$each: [1, 2, 3]}}});
  //type conversion works                                                                                           // 2934
  doTest({$push: {allowedNumbersArray: {$each: ["1", 2, 3]}}}, {$push: {allowedNumbersArray: {$each: [1, 2, 3]}}}); // 2935
                                                                                                                    // 2936
  //$PULL                                                                                                           // 2937
                                                                                                                    // 2938
  //when you clean a good object it's still good                                                                    // 2939
  doTest({$pull: {allowedNumbersArray: 1}}, {$pull: {allowedNumbersArray: 1}});                                     // 2940
  //when you clean a bad object it's now good                                                                       // 2941
  doTest({$pull: {allowedNumbersArray: 1, admin: 1}}, {$pull: {allowedNumbersArray: 1}});                           // 2942
  //type conversion works                                                                                           // 2943
  doTest({$pull: {allowedNumbersArray: "1"}}, {$pull: {allowedNumbersArray: 1}});                                   // 2944
                                                                                                                    // 2945
  //$POP                                                                                                            // 2946
                                                                                                                    // 2947
  //when you clean a good object it's still good                                                                    // 2948
  doTest({$pop: {allowedNumbersArray: 1}}, {$pop: {allowedNumbersArray: 1}});                                       // 2949
  //when you clean a bad object it's now good                                                                       // 2950
  doTest({$pop: {allowedNumbersArray: 1, admin: 1}}, {$pop: {allowedNumbersArray: 1}});                             // 2951
  //type conversion works                                                                                           // 2952
  doTest({$pop: {allowedNumbersArray: "1"}}, {$pop: {allowedNumbersArray: 1}});                                     // 2953
                                                                                                                    // 2954
  //$PULLALL                                                                                                        // 2955
                                                                                                                    // 2956
  doTest({$pullAll: {allowedNumbersArray: [1, 2, 3]}}, {$pullAll: {allowedNumbersArray: [1, 2, 3]}});               // 2957
  doTest({$pullAll: {allowedNumbersArray: ["1", 2, 3]}}, {$pullAll: {allowedNumbersArray: [1, 2, 3]}});             // 2958
                                                                                                                    // 2959
  //$PUSHALL (DEPRECATED - SHOULD BE TRANSLATED TO $PUSH+$EACH                                                      // 2960
                                                                                                                    // 2961
  doTest({$pushAll: {allowedNumbersArray: [1, 2, 3]}}, {$push: {allowedNumbersArray: {$each: [1, 2, 3]}}});         // 2962
  doTest({$pushAll: {allowedNumbersArray: ["1", 2, 3]}}, {$push: {allowedNumbersArray: {$each: [1, 2, 3]}}});       // 2963
  //if there's also $push for some reason, the two should be combined                                               // 2964
  doTest({                                                                                                          // 2965
    $push: {                                                                                                        // 2966
      allowedNumbersArray: {$each: ["1", 2, 3]},                                                                    // 2967
      allowedStringsArray: {$each: ["tuna", "fish"]}                                                                // 2968
    },                                                                                                              // 2969
    $pushAll: {allowedNumbersArray: ["4", 5, 6]}                                                                    // 2970
  }, {                                                                                                              // 2971
    $push: {                                                                                                        // 2972
      allowedNumbersArray: {$each: [1, 2, 3, 4, 5, 6]},                                                             // 2973
      allowedStringsArray: {$each: ["tuna", "fish"]}                                                                // 2974
    }                                                                                                               // 2975
  });                                                                                                               // 2976
                                                                                                                    // 2977
});                                                                                                                 // 2978
                                                                                                                    // 2979
Tinytest.add("SimpleSchema - Custom Types", function(test) {                                                        // 2980
  var peopleSchema = new SimpleSchema({                                                                             // 2981
    name: {                                                                                                         // 2982
      type: String,                                                                                                 // 2983
      max: 200                                                                                                      // 2984
    },                                                                                                              // 2985
    address: {                                                                                                      // 2986
      type: Address                                                                                                 // 2987
    },                                                                                                              // 2988
    createdAt: {                                                                                                    // 2989
      type: Date                                                                                                    // 2990
    },                                                                                                              // 2991
    file: {                                                                                                         // 2992
      type: Uint8Array                                                                                              // 2993
    }                                                                                                               // 2994
  });                                                                                                               // 2995
                                                                                                                    // 2996
  var c1 = peopleSchema.newContext();                                                                               // 2997
  var person = {                                                                                                    // 2998
    name: "Person One",                                                                                             // 2999
    createdAt: new Date(),                                                                                          // 3000
    file: new Uint8Array([104, 101, 108, 108, 111]),                                                                // 3001
    address: new Address("San Francisco", "CA")                                                                     // 3002
  };                                                                                                                // 3003
                                                                                                                    // 3004
  // without cleaning first                                                                                         // 3005
  c1 = validate(peopleSchema, person, false, false, true);                                                          // 3006
  test.length(c1.invalidKeys(), 0);                                                                                 // 3007
                                                                                                                    // 3008
  // with cleaning first                                                                                            // 3009
  c1 = validate(peopleSchema, person);                                                                              // 3010
  test.length(c1.invalidKeys(), 0);                                                                                 // 3011
                                                                                                                    // 3012
  var person2 = {                                                                                                   // 3013
    name: "Person Two",                                                                                             // 3014
    createdAt: {},                                                                                                  // 3015
    file: {},                                                                                                       // 3016
    address: {}                                                                                                     // 3017
  };                                                                                                                // 3018
                                                                                                                    // 3019
  // without cleaning first                                                                                         // 3020
  c1 = validate(peopleSchema, person2, false, false, true);                                                         // 3021
  test.length(c1.invalidKeys(), 3);                                                                                 // 3022
                                                                                                                    // 3023
  // with cleaning first                                                                                            // 3024
  c1 = validate(peopleSchema, person2);                                                                             // 3025
  test.length(c1.invalidKeys(), 3);                                                                                 // 3026
                                                                                                                    // 3027
  peopleSchema = new SimpleSchema({                                                                                 // 3028
    name: {                                                                                                         // 3029
      type: Object                                                                                                  // 3030
    },                                                                                                              // 3031
    address: {                                                                                                      // 3032
      type: Object                                                                                                  // 3033
    },                                                                                                              // 3034
    createdAt: {                                                                                                    // 3035
      type: Object                                                                                                  // 3036
    },                                                                                                              // 3037
    file: {                                                                                                         // 3038
      type: Object                                                                                                  // 3039
    }                                                                                                               // 3040
  });                                                                                                               // 3041
                                                                                                                    // 3042
  // without cleaning first                                                                                         // 3043
  c1 = validate(peopleSchema, person, false, false, true);                                                          // 3044
  test.length(c1.invalidKeys(), 4);                                                                                 // 3045
                                                                                                                    // 3046
  // with cleaning first                                                                                            // 3047
  c1 = validate(peopleSchema, person);                                                                              // 3048
  test.length(c1.invalidKeys(), 4);                                                                                 // 3049
});                                                                                                                 // 3050
                                                                                                                    // 3051
Tinytest.add("SimpleSchema - Nested Schemas", function(test) {                                                      // 3052
  var childDef = {type: String, min: 10};                                                                           // 3053
  var parentDef = {type: Number, min: 10};                                                                          // 3054
                                                                                                                    // 3055
  var child = new SimpleSchema({                                                                                    // 3056
    copied: childDef,                                                                                               // 3057
    overridden: childDef                                                                                            // 3058
  });                                                                                                               // 3059
                                                                                                                    // 3060
  var parent = new SimpleSchema({                                                                                   // 3061
    value: {                                                                                                        // 3062
      type: child                                                                                                   // 3063
    },                                                                                                              // 3064
    array: {                                                                                                        // 3065
      type: [child]                                                                                                 // 3066
    },                                                                                                              // 3067
    'value.overridden': parentDef,                                                                                  // 3068
    'array.$.overridden': parentDef                                                                                 // 3069
  });                                                                                                               // 3070
                                                                                                                    // 3071
  var defs = parent._schema;                                                                                        // 3072
                                                                                                                    // 3073
  test.equal(defs['value'].type, Object, "should change parent definition types to Object");                        // 3074
  test.equal(defs['value.copied'], childDef, "should add child definitions to parent schema");                      // 3075
  test.equal(defs['value.overridden'], parentDef, "parent definitions should override child definitions");          // 3076
  test.equal(defs['array'].type, Array, "should change array parent definition types to Array");                    // 3077
  test.equal(defs['array.$'].type, Object, "should add array child definitions to parent schema");                  // 3078
  test.equal(defs['array.$.copied'], childDef, "should add array child definitions to parent schema");              // 3079
  test.equal(defs['array.$.overridden'], parentDef, "parent definitions should override array child definitions");  // 3080
});                                                                                                                 // 3081
                                                                                                                    // 3082
Tinytest.add("SimpleSchema - Labels", function(test) {                                                              // 3083
  //inflection                                                                                                      // 3084
  test.equal(ss.label("minMaxNumber"), "Min max number", '"minMaxNumber" should have inflected to "Min max number" label');
  test.equal(ssr.label("optionalObject.requiredString"), "Required string", '"optionalObject.requiredString" should have inflected to "Required string" label');
                                                                                                                    // 3087
  //dynamic                                                                                                         // 3088
  ss.labels({"sub.number": "A different label"});                                                                   // 3089
  test.equal(ss.label("sub.number"), "A different label", '"sub.number" label should have been changed to "A different label"');
                                                                                                                    // 3091
  //callback                                                                                                        // 3092
  ss.labels({"sub.number": function() {                                                                             // 3093
      return "A callback label";                                                                                    // 3094
    }});                                                                                                            // 3095
  test.equal(ss.label("sub.number"), "A callback label", '"sub.number" label should be "A callback label" through the callback function');
});                                                                                                                 // 3097
                                                                                                                    // 3098
Tinytest.add("SimpleSchema - RegEx and Messages", function(test) {                                                  // 3099
                                                                                                                    // 3100
  // global                                                                                                         // 3101
  SimpleSchema.messages({                                                                                           // 3102
    'regEx': 'Global Message One',                                                                                  // 3103
    'regEx one': 'Global Message Two',                                                                              // 3104
    'regEx.0 one': 'Global Message Three',                                                                          // 3105
    'regEx.1 one': 'Global Message Four'                                                                            // 3106
  });                                                                                                               // 3107
                                                                                                                    // 3108
  var testSchema = new SimpleSchema({                                                                               // 3109
    one: {                                                                                                          // 3110
      type: String,                                                                                                 // 3111
      regEx: [                                                                                                      // 3112
        /^A/,                                                                                                       // 3113
        /B$/                                                                                                        // 3114
      ]                                                                                                             // 3115
    }                                                                                                               // 3116
  });                                                                                                               // 3117
                                                                                                                    // 3118
  var c1 = testSchema.newContext();                                                                                 // 3119
  c1.validate({one: "BBB"});                                                                                        // 3120
  test.length(c1.invalidKeys(), 1);                                                                                 // 3121
                                                                                                                    // 3122
  var err = c1.invalidKeys()[0] || {};                                                                              // 3123
  test.equal(err.message, 'Global Message Three');                                                                  // 3124
                                                                                                                    // 3125
  c1.validate({one: "AAA"});                                                                                        // 3126
  test.length(c1.invalidKeys(), 1);                                                                                 // 3127
                                                                                                                    // 3128
  err = c1.invalidKeys()[0] || {};                                                                                  // 3129
  test.equal(err.message, 'Global Message Four');                                                                   // 3130
                                                                                                                    // 3131
  c1.validate({one: "CCC"});                                                                                        // 3132
  test.length(c1.invalidKeys(), 1);                                                                                 // 3133
                                                                                                                    // 3134
  err = c1.invalidKeys()[0] || {};                                                                                  // 3135
  test.equal(err.message, 'Global Message Three');                                                                  // 3136
                                                                                                                    // 3137
  c1.validate({one: "ACB"});                                                                                        // 3138
  test.length(c1.invalidKeys(), 0);                                                                                 // 3139
                                                                                                                    // 3140
  // schema-specific messages                                                                                       // 3141
  testSchema.messages({                                                                                             // 3142
    'regEx': 'Message One',                                                                                         // 3143
    'regEx one': 'Message Two',                                                                                     // 3144
    'regEx.0 one': 'Message Three',                                                                                 // 3145
    'regEx.1 one': 'Message Four'                                                                                   // 3146
  });                                                                                                               // 3147
                                                                                                                    // 3148
  c1 = testSchema.newContext();                                                                                     // 3149
  c1.validate({one: "BBB"});                                                                                        // 3150
  test.length(c1.invalidKeys(), 1);                                                                                 // 3151
                                                                                                                    // 3152
  err = c1.invalidKeys()[0] || {};                                                                                  // 3153
  test.equal(err.message, 'Message Three');                                                                         // 3154
                                                                                                                    // 3155
  c1.validate({one: "AAA"});                                                                                        // 3156
  test.length(c1.invalidKeys(), 1);                                                                                 // 3157
                                                                                                                    // 3158
  err = c1.invalidKeys()[0] || {};                                                                                  // 3159
  test.equal(err.message, 'Message Four');                                                                          // 3160
                                                                                                                    // 3161
  c1.validate({one: "CCC"});                                                                                        // 3162
  test.length(c1.invalidKeys(), 1);                                                                                 // 3163
                                                                                                                    // 3164
  err = c1.invalidKeys()[0] || {};                                                                                  // 3165
  test.equal(err.message, 'Message Three');                                                                         // 3166
                                                                                                                    // 3167
  c1.validate({one: "ACB"});                                                                                        // 3168
  test.length(c1.invalidKeys(), 0);                                                                                 // 3169
});                                                                                                                 // 3170
                                                                                                                    // 3171
Tinytest.add("SimpleSchema - Issue 28", function(test) {                                                            // 3172
  var is28ss = new SimpleSchema({                                                                                   // 3173
    "name": {                                                                                                       // 3174
      type: String                                                                                                  // 3175
    },                                                                                                              // 3176
    "embed": {                                                                                                      // 3177
      type: Object                                                                                                  // 3178
    },                                                                                                              // 3179
    "embed._id": {                                                                                                  // 3180
      type: String                                                                                                  // 3181
    }                                                                                                               // 3182
  });                                                                                                               // 3183
                                                                                                                    // 3184
  var is28sc = validate(is28ss, {$set: {                                                                            // 3185
      name: "name"                                                                                                  // 3186
    }}, true);                                                                                                      // 3187
  test.length(is28sc.invalidKeys(), 0);                                                                             // 3188
                                                                                                                    // 3189
});                                                                                                                 // 3190
                                                                                                                    // 3191
Tinytest.add("SimpleSchema - Issue 30", function(test) {                                                            // 3192
  var is30ss = new SimpleSchema({                                                                                   // 3193
    firstname: {                                                                                                    // 3194
      type: String,                                                                                                 // 3195
      label: "First name",                                                                                          // 3196
      optional: true                                                                                                // 3197
    },                                                                                                              // 3198
    lastname: {                                                                                                     // 3199
      type: String,                                                                                                 // 3200
      label: "Last name",                                                                                           // 3201
      optional: true,                                                                                               // 3202
      valueIsAllowed: function(val, doc, op) {                                                                      // 3203
        if (!op) { //insert                                                                                         // 3204
          if ((doc.firstname && doc.firstname.length) && (!val || !val.length)) {                                   // 3205
            return false;                                                                                           // 3206
          } else {                                                                                                  // 3207
            return true;                                                                                            // 3208
          }                                                                                                         // 3209
        }                                                                                                           // 3210
        if (op === "$set") { //update                                                                               // 3211
          if ((doc.$set.firstname && doc.$set.firstname.length)                                                     // 3212
                  && (!val || !val.length)) {                                                                       // 3213
            return false;                                                                                           // 3214
          } else {                                                                                                  // 3215
            return true;                                                                                            // 3216
          }                                                                                                         // 3217
        }                                                                                                           // 3218
        return false; //allow only inserts and $set                                                                 // 3219
      }                                                                                                             // 3220
    }                                                                                                               // 3221
  });                                                                                                               // 3222
                                                                                                                    // 3223
  var is30sc = validate(is30ss, {                                                                                   // 3224
    firstname: "name"                                                                                               // 3225
  });                                                                                                               // 3226
  test.equal(is30sc.invalidKeys()[0]["type"], "notAllowed");                                                        // 3227
                                                                                                                    // 3228
  is30sc = validate(is30ss, {                                                                                       // 3229
    firstname: "name",                                                                                              // 3230
    lastname: ""                                                                                                    // 3231
  });                                                                                                               // 3232
  test.equal(is30sc.invalidKeys()[0]["type"], "notAllowed");                                                        // 3233
                                                                                                                    // 3234
  is30sc = validate(is30ss, {                                                                                       // 3235
    firstname: "name",                                                                                              // 3236
    lastname: "name"                                                                                                // 3237
  });                                                                                                               // 3238
  test.equal(is30sc.invalidKeys(), []);                                                                             // 3239
                                                                                                                    // 3240
  is30sc = validate(is30ss, {$set: {                                                                                // 3241
      firstname: "name"                                                                                             // 3242
    }}, true);                                                                                                      // 3243
  test.equal(is30sc.invalidKeys()[0]["type"], "notAllowed");                                                        // 3244
                                                                                                                    // 3245
  is30sc = validate(is30ss, {$set: {                                                                                // 3246
      firstname: "name",                                                                                            // 3247
      lastname: ""                                                                                                  // 3248
    }}, true);                                                                                                      // 3249
  test.equal(is30sc.invalidKeys()[0]["type"], "notAllowed");                                                        // 3250
                                                                                                                    // 3251
  is30sc = validate(is30ss, {$set: {                                                                                // 3252
      firstname: "name",                                                                                            // 3253
      lastname: "name"                                                                                              // 3254
    }}, true);                                                                                                      // 3255
  test.equal(is30sc.invalidKeys(), []);                                                                             // 3256
                                                                                                                    // 3257
});                                                                                                                 // 3258
                                                                                                                    // 3259
Tinytest.add("SimpleSchema - Basic Schema Merge", function(test) {                                                  // 3260
                                                                                                                    // 3261
  var s1 = new SimpleSchema([                                                                                       // 3262
    {                                                                                                               // 3263
      a: {                                                                                                          // 3264
        type: Boolean                                                                                               // 3265
      },                                                                                                            // 3266
      b: {                                                                                                          // 3267
        type: String                                                                                                // 3268
      }                                                                                                             // 3269
    },                                                                                                              // 3270
    {                                                                                                               // 3271
      c: {                                                                                                          // 3272
        type: String                                                                                                // 3273
      },                                                                                                            // 3274
      d: {                                                                                                          // 3275
        type: String                                                                                                // 3276
      }                                                                                                             // 3277
    }                                                                                                               // 3278
  ]);                                                                                                               // 3279
                                                                                                                    // 3280
  test.equal(s1._schema, {                                                                                          // 3281
    a: {                                                                                                            // 3282
      type: Boolean                                                                                                 // 3283
    },                                                                                                              // 3284
    b: {                                                                                                            // 3285
      type: String                                                                                                  // 3286
    },                                                                                                              // 3287
    c: {                                                                                                            // 3288
      type: String                                                                                                  // 3289
    },                                                                                                              // 3290
    d: {                                                                                                            // 3291
      type: String                                                                                                  // 3292
    }                                                                                                               // 3293
  }, "schema was not merged correctly");                                                                            // 3294
                                                                                                                    // 3295
  // test validation                                                                                                // 3296
  var ctx = s1.namedContext();                                                                                      // 3297
  var isValid = ctx.validate({a: "Wrong"});                                                                         // 3298
  test.length(ctx.invalidKeys(), 4);                                                                                // 3299
                                                                                                                    // 3300
});                                                                                                                 // 3301
                                                                                                                    // 3302
Tinytest.add("SimpleSchema - Mixed Schema Merge", function(test) {                                                  // 3303
                                                                                                                    // 3304
  var s1 = new SimpleSchema({                                                                                       // 3305
    a: {                                                                                                            // 3306
      type: Boolean                                                                                                 // 3307
    },                                                                                                              // 3308
    b: {                                                                                                            // 3309
      type: [String]                                                                                                // 3310
    }                                                                                                               // 3311
  });                                                                                                               // 3312
                                                                                                                    // 3313
  var s2 = new SimpleSchema([s1, {                                                                                  // 3314
      c: {                                                                                                          // 3315
        type: String                                                                                                // 3316
      },                                                                                                            // 3317
      d: {                                                                                                          // 3318
        type: String                                                                                                // 3319
      }                                                                                                             // 3320
    }]);                                                                                                            // 3321
                                                                                                                    // 3322
  test.equal(s2._schema, {                                                                                          // 3323
    a: {                                                                                                            // 3324
      type: Boolean                                                                                                 // 3325
    },                                                                                                              // 3326
    b: {                                                                                                            // 3327
      type: Array                                                                                                   // 3328
    },                                                                                                              // 3329
    'b.$': {                                                                                                        // 3330
      type: String,                                                                                                 // 3331
      optional: true                                                                                                // 3332
    },                                                                                                              // 3333
    c: {                                                                                                            // 3334
      type: String                                                                                                  // 3335
    },                                                                                                              // 3336
    d: {                                                                                                            // 3337
      type: String                                                                                                  // 3338
    }                                                                                                               // 3339
  }, "schema was not merged correctly");                                                                            // 3340
                                                                                                                    // 3341
  // test validation                                                                                                // 3342
  var ctx = s2.namedContext();                                                                                      // 3343
  var isValid = ctx.validate({a: "Wrong"});                                                                         // 3344
  test.length(ctx.invalidKeys(), 4);                                                                                // 3345
                                                                                                                    // 3346
});                                                                                                                 // 3347
                                                                                                                    // 3348
Tinytest.add("SimpleSchema - Mixed Schema Merge With Base Extend and Override", function(test) {                    // 3349
                                                                                                                    // 3350
  var s1 = new SimpleSchema({                                                                                       // 3351
    a: {                                                                                                            // 3352
      type: Boolean                                                                                                 // 3353
    },                                                                                                              // 3354
    b: {                                                                                                            // 3355
      type: [String]                                                                                                // 3356
    }                                                                                                               // 3357
  });                                                                                                               // 3358
                                                                                                                    // 3359
  var s2 = new SimpleSchema([s1, {                                                                                  // 3360
      a: {                                                                                                          // 3361
        type: Number                                                                                                // 3362
      },                                                                                                            // 3363
      b: {                                                                                                          // 3364
        label: "Bacon"                                                                                              // 3365
      },                                                                                                            // 3366
      c: {                                                                                                          // 3367
        type: String                                                                                                // 3368
      },                                                                                                            // 3369
      d: {                                                                                                          // 3370
        type: String                                                                                                // 3371
      }                                                                                                             // 3372
    }]);                                                                                                            // 3373
                                                                                                                    // 3374
  test.equal(s2._schema, {                                                                                          // 3375
    a: {                                                                                                            // 3376
      type: Number                                                                                                  // 3377
    },                                                                                                              // 3378
    b: {                                                                                                            // 3379
      type: Array,                                                                                                  // 3380
      label: "Bacon"                                                                                                // 3381
    },                                                                                                              // 3382
    'b.$': {                                                                                                        // 3383
      type: String,                                                                                                 // 3384
      optional: true,                                                                                               // 3385
      label: "Bacon"                                                                                                // 3386
    },                                                                                                              // 3387
    c: {                                                                                                            // 3388
      type: String                                                                                                  // 3389
    },                                                                                                              // 3390
    d: {                                                                                                            // 3391
      type: String                                                                                                  // 3392
    }                                                                                                               // 3393
  }, "schema was not merged correctly");                                                                            // 3394
                                                                                                                    // 3395
  // test validation                                                                                                // 3396
  var ctx = s2.namedContext();                                                                                      // 3397
  var isValid = ctx.validate({a: "Wrong"});                                                                         // 3398
  test.length(ctx.invalidKeys(), 4);                                                                                // 3399
                                                                                                                    // 3400
});                                                                                                                 // 3401
                                                                                                                    // 3402
Tinytest.add("SimpleSchema - AutoValues", function(test) {                                                          // 3403
                                                                                                                    // 3404
  function avClean(obj, exp, opts) {                                                                                // 3405
    autoValues.clean(obj, opts);                                                                                    // 3406
    test.equal(obj, exp);                                                                                           // 3407
  }                                                                                                                 // 3408
                                                                                                                    // 3409
  avClean(                                                                                                          // 3410
          {name: "Test", firstWord: "Illegal to manually set value"},                                               // 3411
  {name: "Test", someDefault: 5, updateCount: 0}                                                                    // 3412
  );                                                                                                                // 3413
                                                                                                                    // 3414
  avClean(                                                                                                          // 3415
          {name: "Test", someDefault: 20},                                                                          // 3416
  {name: "Test", someDefault: 20, updateCount: 0}                                                                   // 3417
  );                                                                                                                // 3418
                                                                                                                    // 3419
  var o = {name: "Test", content: 'Hello world!'};                                                                  // 3420
  autoValues.clean(o);                                                                                              // 3421
  test.equal(o.firstWord, 'Hello', 'expected firstWord to be "Hello"');                                             // 3422
  test.length(o.updatesHistory, 1);                                                                                 // 3423
  test.equal(o.updatesHistory[0].content, 'Hello world!', 'expected updatesHistory.content to be "Hello world!"');  // 3424
                                                                                                                    // 3425
  // autoValues in object in array with modifier                                                                    // 3426
  o = {$push: {avArrayOfObjects: {a: "b"}}};                                                                        // 3427
  autoValues.clean(o, {isModifier: true});                                                                          // 3428
  test.equal(o, {$push: {avArrayOfObjects: {a: "b", foo: "bar"}}, $set: {someDefault: 5}, $inc:{updateCount:1}}, 'autoValue in object in array not set correctly');
                                                                                                                    // 3430
  o = {$set: {avArrayOfObjects: [{a: "b"}]}};                                                                       // 3431
  autoValues.clean(o, {isModifier: true});                                                                          // 3432
  test.equal(o, {$set: {avArrayOfObjects: [{a: "b", foo: "bar"}], someDefault: 5}, $inc:{updateCount:1}}, 'autoValue in object in array not set correctly');
                                                                                                                    // 3434
  var av = new SimpleSchema({                                                                                       // 3435
    foo: {                                                                                                          // 3436
      type: String,                                                                                                 // 3437
      optional: true                                                                                                // 3438
    },                                                                                                              // 3439
    bar: {                                                                                                          // 3440
      type: Boolean,                                                                                                // 3441
      optional: true,                                                                                               // 3442
      autoValue: function() {                                                                                       // 3443
        test.equal(this.isSet, false);                                                                              // 3444
        test.isUndefined(this.value);                                                                               // 3445
        test.equal(this.operator, null);                                                                            // 3446
        var foo = this.field('foo');                                                                                // 3447
        test.equal(foo.isSet, false);                                                                               // 3448
        test.isUndefined(foo.value);                                                                                // 3449
        test.equal(foo.operator, null);                                                                             // 3450
        foo = this.siblingField('foo');                                                                             // 3451
        test.equal(foo.isSet, false);                                                                               // 3452
        test.isUndefined(foo.value);                                                                                // 3453
        test.equal(foo.operator, null);                                                                             // 3454
      }                                                                                                             // 3455
    }                                                                                                               // 3456
  });                                                                                                               // 3457
  av.clean({});                                                                                                     // 3458
                                                                                                                    // 3459
  var av2 = new SimpleSchema({                                                                                      // 3460
    foo: {                                                                                                          // 3461
      type: String,                                                                                                 // 3462
      optional: true                                                                                                // 3463
    },                                                                                                              // 3464
    bar: {                                                                                                          // 3465
      type: Boolean,                                                                                                // 3466
      optional: true,                                                                                               // 3467
      autoValue: function() {                                                                                       // 3468
        test.equal(this.isSet, false);                                                                              // 3469
        test.isUndefined(this.value);                                                                               // 3470
        test.equal(this.operator, null);                                                                            // 3471
        var foo = this.field('foo');                                                                                // 3472
        test.equal(foo.isSet, true);                                                                                // 3473
        test.equal(foo.value, "clown");                                                                             // 3474
        test.equal(foo.operator, null);                                                                             // 3475
        foo = this.siblingField('foo');                                                                             // 3476
        test.equal(foo.isSet, true);                                                                                // 3477
        test.equal(foo.value, "clown");                                                                             // 3478
        test.equal(foo.operator, null);                                                                             // 3479
      }                                                                                                             // 3480
    }                                                                                                               // 3481
  });                                                                                                               // 3482
  av2.clean({foo: "clown"});                                                                                        // 3483
                                                                                                                    // 3484
  var av3 = new SimpleSchema({                                                                                      // 3485
    foo: {                                                                                                          // 3486
      type: String,                                                                                                 // 3487
      optional: true                                                                                                // 3488
    },                                                                                                              // 3489
    bar: {                                                                                                          // 3490
      type: Boolean,                                                                                                // 3491
      optional: true,                                                                                               // 3492
      autoValue: function() {                                                                                       // 3493
        test.equal(this.isSet, true);                                                                               // 3494
        test.equal(this.value, true);                                                                               // 3495
        test.equal(this.operator, null);                                                                            // 3496
        var foo = this.field('foo');                                                                                // 3497
        test.equal(foo.isSet, true);                                                                                // 3498
        test.equal(foo.value, "clown");                                                                             // 3499
        test.equal(foo.operator, null);                                                                             // 3500
        foo = this.siblingField('foo');                                                                             // 3501
        test.equal(foo.isSet, true);                                                                                // 3502
        test.equal(foo.value, "clown");                                                                             // 3503
        test.equal(foo.operator, null);                                                                             // 3504
      }                                                                                                             // 3505
    }                                                                                                               // 3506
  });                                                                                                               // 3507
  av3.clean({foo: "clown", bar: true});                                                                             // 3508
                                                                                                                    // 3509
  var av4 = new SimpleSchema({                                                                                      // 3510
    foo: {                                                                                                          // 3511
      type: String,                                                                                                 // 3512
      optional: true                                                                                                // 3513
    },                                                                                                              // 3514
    bar: {                                                                                                          // 3515
      type: Boolean,                                                                                                // 3516
      optional: true,                                                                                               // 3517
      autoValue: function() {                                                                                       // 3518
        test.equal(this.isSet, true);                                                                               // 3519
        test.equal(this.value, false);                                                                              // 3520
        test.equal(this.operator, null);                                                                            // 3521
        var foo = this.field('foo');                                                                                // 3522
        test.equal(foo.isSet, false);                                                                               // 3523
        test.isUndefined(foo.value);                                                                                // 3524
        test.equal(foo.operator, null);                                                                             // 3525
        foo = this.siblingField('foo');                                                                             // 3526
        test.equal(foo.isSet, false);                                                                               // 3527
        test.isUndefined(foo.value);                                                                                // 3528
        test.equal(foo.operator, null);                                                                             // 3529
        this.unset();                                                                                               // 3530
      }                                                                                                             // 3531
    }                                                                                                               // 3532
  });                                                                                                               // 3533
  var doc = {bar: false};                                                                                           // 3534
  av4.clean(doc);                                                                                                   // 3535
  test.equal(doc, {});                                                                                              // 3536
                                                                                                                    // 3537
  var av5 = new SimpleSchema({                                                                                      // 3538
    foo: {                                                                                                          // 3539
      type: String,                                                                                                 // 3540
      optional: true                                                                                                // 3541
    },                                                                                                              // 3542
    bar: {                                                                                                          // 3543
      type: Boolean,                                                                                                // 3544
      optional: true,                                                                                               // 3545
      autoValue: function() {                                                                                       // 3546
        test.equal(this.isSet, true);                                                                               // 3547
        test.equal(this.value, false);                                                                              // 3548
        test.equal(this.operator, "$set");                                                                          // 3549
        var foo = this.field('foo');                                                                                // 3550
        test.equal(foo.isSet, false);                                                                               // 3551
        test.isUndefined(foo.value);                                                                                // 3552
        test.equal(foo.operator, null);                                                                             // 3553
        foo = this.siblingField('foo');                                                                             // 3554
        test.equal(foo.isSet, false);                                                                               // 3555
        test.isUndefined(foo.value);                                                                                // 3556
        test.equal(foo.operator, null);                                                                             // 3557
      }                                                                                                             // 3558
    }                                                                                                               // 3559
  });                                                                                                               // 3560
  var doc = {$set: {bar: false}};                                                                                   // 3561
  av5.clean(doc);                                                                                                   // 3562
  test.equal(doc, {$set: {bar: false}});                                                                            // 3563
                                                                                                                    // 3564
  var av6 = new SimpleSchema({                                                                                      // 3565
    foo: {                                                                                                          // 3566
      type: String,                                                                                                 // 3567
      optional: true                                                                                                // 3568
    },                                                                                                              // 3569
    bar: {                                                                                                          // 3570
      type: Boolean,                                                                                                // 3571
      optional: true,                                                                                               // 3572
      autoValue: function() {                                                                                       // 3573
        test.equal(this.isSet, true);                                                                               // 3574
        test.equal(this.value, false);                                                                              // 3575
        test.equal(this.operator, "$set");                                                                          // 3576
        var foo = this.field('foo');                                                                                // 3577
        test.equal(foo.isSet, true);                                                                                // 3578
        test.equal(foo.value, "clown");                                                                             // 3579
        test.equal(foo.operator, "$set");                                                                           // 3580
        foo = this.siblingField('foo');                                                                             // 3581
        test.equal(foo.isSet, true);                                                                                // 3582
        test.equal(foo.value, "clown");                                                                             // 3583
        test.equal(foo.operator, "$set");                                                                           // 3584
        return true;                                                                                                // 3585
      }                                                                                                             // 3586
    }                                                                                                               // 3587
  });                                                                                                               // 3588
  doc = {$set: {foo: "clown", bar: false}};                                                                         // 3589
  av6.clean(doc);                                                                                                   // 3590
  test.equal(doc, {$set: {foo: "clown", bar: true}});                                                               // 3591
                                                                                                                    // 3592
  var av7 = new SimpleSchema({                                                                                      // 3593
    foo: {                                                                                                          // 3594
      type: String,                                                                                                 // 3595
      optional: true                                                                                                // 3596
    },                                                                                                              // 3597
    bar: {                                                                                                          // 3598
      type: Boolean,                                                                                                // 3599
      optional: true,                                                                                               // 3600
      autoValue: function() {                                                                                       // 3601
        test.equal(this.isSet, false);                                                                              // 3602
        test.isUndefined(this.value);                                                                               // 3603
        test.equal(this.operator, null);                                                                            // 3604
        var foo = this.field('foo');                                                                                // 3605
        test.equal(foo.isSet, false);                                                                               // 3606
        test.isUndefined(foo.value);                                                                                // 3607
        test.equal(foo.operator, null);                                                                             // 3608
        foo = this.siblingField('foo');                                                                             // 3609
        test.equal(foo.isSet, false);                                                                               // 3610
        test.isUndefined(foo.value);                                                                                // 3611
        test.equal(foo.operator, null);                                                                             // 3612
        return {$set: true};                                                                                        // 3613
      }                                                                                                             // 3614
    }                                                                                                               // 3615
  });                                                                                                               // 3616
  doc = {};                                                                                                         // 3617
  av7.clean(doc);                                                                                                   // 3618
  test.equal(doc, {$set: {bar: true}});                                                                             // 3619
                                                                                                                    // 3620
});                                                                                                                 // 3621
                                                                                                                    // 3622
Tinytest.add("SimpleSchema - DefaultValues", function(test) {                                                       // 3623
                                                                                                                    // 3624
  function avClean(obj, exp, opts) {                                                                                // 3625
    defaultValues.clean(obj, opts);                                                                                 // 3626
    test.equal(obj, exp);                                                                                           // 3627
  }                                                                                                                 // 3628
                                                                                                                    // 3629
  avClean(                                                                                                          // 3630
          {},                                                                                                       // 3631
          {name: "Test", a: {b: "Test"}, strVals: []}                                                               // 3632
  );                                                                                                                // 3633
                                                                                                                    // 3634
  avClean(                                                                                                          // 3635
          {strVals: ["foo", "bar"]},                                                                                // 3636
          {name: "Test", a: {b: "Test"}, strVals: ["foo", "bar"]}                                                   // 3637
  );                                                                                                                // 3638
                                                                                                                    // 3639
  avClean(                                                                                                          // 3640
          {name: "Test1", a: {b: "Test1"}},                                                                         // 3641
  {name: "Test1", a: {b: "Test1"}, strVals: []}                                                                     // 3642
  );                                                                                                                // 3643
                                                                                                                    // 3644
  avClean(                                                                                                          // 3645
          {name: "Test1", a: {b: "Test1"}, b: []},                                                                  // 3646
  {name: "Test1", a: {b: "Test1"}, b: [], strVals: []}                                                              // 3647
  );                                                                                                                // 3648
                                                                                                                    // 3649
  avClean(                                                                                                          // 3650
          {name: "Test1", a: {b: "Test1"}, b: [{}]},                                                                // 3651
  {name: "Test1", a: {b: "Test1"}, b: [{a: "Test"}], strVals: []}                                                   // 3652
  );                                                                                                                // 3653
                                                                                                                    // 3654
  avClean(                                                                                                          // 3655
          {name: "Test1", a: {b: "Test1"}, b: [{a: "Test1"}, {}]},                                                  // 3656
  {name: "Test1", a: {b: "Test1"}, b: [{a: "Test1"}, {a: "Test"}], strVals: []}                                     // 3657
  );                                                                                                                // 3658
                                                                                                                    // 3659
  // Updates should not be affected                                                                                 // 3660
  avClean(                                                                                                          // 3661
          {$addToSet: {strVals: 'new value'}},                                                                      // 3662
          {$addToSet: {strVals: 'new value'}},                                                                      // 3663
          {isModifier: true}                                                                                        // 3664
  );                                                                                                                // 3665
                                                                                                                    // 3666
});                                                                                                                 // 3667
                                                                                                                    // 3668
Tinytest.add("SimpleSchema - Optional Custom", function(test) {                                                     // 3669
  var ctx = optCust.namedContext();                                                                                 // 3670
  // Ensure that custom validation runs even when the optional                                                      // 3671
  // field is undefined.                                                                                            // 3672
  ctx.validate({});                                                                                                 // 3673
  test.equal(ctx.invalidKeys().length, 1, 'expected 1 invalid key');                                                // 3674
  test.equal(ctx.invalidKeys()[0].type, 'custom', 'expected custom error');                                         // 3675
});                                                                                                                 // 3676
                                                                                                                    // 3677
Tinytest.add("SimpleSchema - Required Custom", function (test) {                                                    // 3678
  var ctx = reqCust.namedContext();                                                                                 // 3679
  // Ensure that we don't get required errors for a required field that                                             // 3680
  // has a `custom` function when we're doing an UPDATE                                                             // 3681
  ctx.validate({$set: {a: [{}]}}, {modifier: true});                                                                // 3682
  test.equal(ctx.invalidKeys().length, 0, 'expected no validation errors');                                         // 3683
                                                                                                                    // 3684
  ctx.validate({$set: {'a.0': {}}}, {modifier: true});                                                              // 3685
  test.equal(ctx.invalidKeys().length, 0, 'expected no validation errors');                                         // 3686
                                                                                                                    // 3687
  ctx.validate({$push: {'a': {}}}, {modifier: true});                                                               // 3688
  test.equal(ctx.invalidKeys().length, 0, 'expected no validation errors');                                         // 3689
});                                                                                                                 // 3690
                                                                                                                    // 3691
Tinytest.add("SimpleSchema - AllowsKey", function(test) {                                                           // 3692
  function run(key, allowed) {                                                                                      // 3693
    test.equal(ss.allowsKey(key), allowed, 'Incorrect allowsKey result for ' + key);                                // 3694
  }                                                                                                                 // 3695
                                                                                                                    // 3696
  run('minMaxString', true);                                                                                        // 3697
  run('minMaxString.$', false);                                                                                     // 3698
  run('minMaxString.$.foo', false);                                                                                 // 3699
  run('minMaxString.$foo', false);                                                                                  // 3700
  run('minMaxString.foo', false);                                                                                   // 3701
  run('sub', true);                                                                                                 // 3702
  run('sub.number', true);                                                                                          // 3703
  run('sub.number.$', false);                                                                                       // 3704
  run('sub.number.$.foo', false);                                                                                   // 3705
  run('sub.number.$foo', false);                                                                                    // 3706
  run('sub.number.foo', false);                                                                                     // 3707
  run('minMaxStringArray', true);                                                                                   // 3708
  run('minMaxStringArray.$', true);                                                                                 // 3709
  run('minMaxStringArray.$.foo', false);                                                                            // 3710
  run('minMaxStringArray.foo', false);                                                                              // 3711
  run('customObject', true);                                                                                        // 3712
  run('customObject.$', false);                                                                                     // 3713
  run('customObject.foo', true);                                                                                    // 3714
  run('customObject.foo.$', true);                                                                                  // 3715
  run('customObject.foo.$foo', true);                                                                               // 3716
  run('customObject.foo.$.$foo', true);                                                                             // 3717
  run('blackBoxObject', true);                                                                                      // 3718
  run('blackBoxObject.$', false);                                                                                   // 3719
  run('blackBoxObject.foo', true);                                                                                  // 3720
  run('blackBoxObject.foo.$', true);                                                                                // 3721
  run('blackBoxObject.foo.$foo', true);                                                                             // 3722
  run('blackBoxObject.foo.$.$foo', true);                                                                           // 3723
});                                                                                                                 // 3724
                                                                                                                    // 3725
Tinytest.add("SimpleSchema - RegEx - Email", function (test) {                                                      // 3726
  var expr = SimpleSchema.RegEx.Email;                                                                              // 3727
  var isTrue = function (s) { test.isTrue(expr.test(s), s) };                                                       // 3728
  var isFalse = function (s) { test.isFalse(expr.test(s), s) };                                                     // 3729
  isTrue("name@web.de");                                                                                            // 3730
  isTrue("name+addition@web.de");                                                                                   // 3731
  isTrue("st#r~ange.e+mail@web.de");                                                                                // 3732
  isFalse("name@localhost");                                                                                        // 3733
  isFalse("name@192.168.200.5");                                                                                    // 3734
  isFalse("name@BCDF:45AB:1245:75B9:0987:1562:4567:1234");                                                          // 3735
  isFalse("name@BCDF:45AB:1245:75B9::0987:1234:1324");                                                              // 3736
  isFalse("name@BCDF:45AB:1245:75B9:0987:1234:1324");                                                               // 3737
  isFalse("name@::1");                                                                                              // 3738
});                                                                                                                 // 3739
                                                                                                                    // 3740
Tinytest.add("SimpleSchema - RegEx - WeakEmail", function (test) {                                                  // 3741
  var expr = SimpleSchema.RegEx.WeakEmail;                                                                          // 3742
  var isTrue = function (s) { test.isTrue(expr.test(s), s) };                                                       // 3743
  var isFalse = function (s) { test.isFalse(expr.test(s), s) };                                                     // 3744
  isTrue("name@web.de");                                                                                            // 3745
  isTrue("name+addition@web.de");                                                                                   // 3746
  isTrue("st#r~ange.e+mail@web.de");                                                                                // 3747
  isTrue("name@localhost");                                                                                         // 3748
  isTrue("name@192.168.200.5");                                                                                     // 3749
  isTrue("name@BCDF:45AB:1245:75B9:0987:1562:4567:1234");                                                           // 3750
  isTrue("name@BCDF:45AB:1245:75B9::0987:1234:1324");                                                               // 3751
  isFalse("name@BCDF:45AB:1245:75B9:0987:1234:1324");                                                               // 3752
  isTrue("name@::1");                                                                                               // 3753
});                                                                                                                 // 3754
                                                                                                                    // 3755
Tinytest.add("SimpleSchema - RegEx - Domain", function (test) {                                                     // 3756
  var expr = SimpleSchema.RegEx.Domain;                                                                             // 3757
  var isTrue = function (s) { test.isTrue(expr.test(s), s) };                                                       // 3758
  var isFalse = function (s) { test.isFalse(expr.test(s), s) };                                                     // 3759
  isTrue("domain.com");                                                                                             // 3760
  isFalse("localhost");                                                                                             // 3761
  isFalse("192.168.200.5");                                                                                         // 3762
  isFalse("BCDF:45AB:1245:75B9:0987:1562:4567:1234:AB36");                                                          // 3763
});                                                                                                                 // 3764
                                                                                                                    // 3765
Tinytest.add("SimpleSchema - RegEx - WeakDomain", function (test) {                                                 // 3766
  var expr = SimpleSchema.RegEx.WeakDomain;                                                                         // 3767
  var isTrue = function (s) { test.isTrue(expr.test(s), s) };                                                       // 3768
  var isFalse = function (s) { test.isFalse(expr.test(s), s) };                                                     // 3769
  isTrue("domain.com");                                                                                             // 3770
  isTrue("localhost");                                                                                              // 3771
  isTrue("192.168.200.5");                                                                                          // 3772
  isTrue("BCDF:45AB:1245:75B9:0987:1562:4567:1234");                                                                // 3773
});                                                                                                                 // 3774
                                                                                                                    // 3775
Tinytest.add("SimpleSchema - RegEx - IP (4 and 6)", function (test) {                                               // 3776
  var expr = SimpleSchema.RegEx.IP;                                                                                 // 3777
  var isTrue = function (s) { test.isTrue(expr.test(s), s) };                                                       // 3778
  var isFalse = function (s) { test.isFalse(expr.test(s), s) };                                                     // 3779
  isFalse("localhost");                                                                                             // 3780
  isTrue("192.168.200.5");                                                                                          // 3781
  isFalse("320.168.200.5");                                                                                         // 3782
  isFalse("192.168.5");                                                                                             // 3783
  isTrue("BCDF:45AB:1245:75B9:0987:1562:4567:1234");                                                                // 3784
  isFalse("BCDF:45AB:1245:75B9:0987:1562:4567:1234:AB36");                                                          // 3785
  isTrue("BCDF:45AB:1245:75B9::0987:1234:1324");                                                                    // 3786
  isFalse("BCDF:45AB:1245:75B9:0987:1234:1324");                                                                    // 3787
  isTrue("::1");                                                                                                    // 3788
});                                                                                                                 // 3789
                                                                                                                    // 3790
Tinytest.add("SimpleSchema - RegEx - IPv4", function (test) {                                                       // 3791
  var expr = SimpleSchema.RegEx.IPv4;                                                                               // 3792
  var isTrue = function (s) { test.isTrue(expr.test(s), s) };                                                       // 3793
  var isFalse = function (s) { test.isFalse(expr.test(s), s) };                                                     // 3794
  isFalse("localhost");                                                                                             // 3795
  isTrue("192.168.200.5");                                                                                          // 3796
  isFalse("320.168.200.5");                                                                                         // 3797
  isFalse("192.168.5");                                                                                             // 3798
  isFalse("BCDF:45AB:1245:75B9:0987:1562:4567:1234");                                                               // 3799
  isFalse("BCDF:45AB:1245:75B9:0987:1562:4567:1234:AB36");                                                          // 3800
  isFalse("BCDF:45AB:1245:75B9::0987:1234:1324");                                                                   // 3801
  isFalse("BCDF:45AB:1245:75B9:0987:1234:1324");                                                                    // 3802
  isFalse("::1");                                                                                                   // 3803
});                                                                                                                 // 3804
                                                                                                                    // 3805
Tinytest.add("SimpleSchema - RegEx - IPv6", function (test) {                                                       // 3806
  var expr = SimpleSchema.RegEx.IPv6;                                                                               // 3807
  var isTrue = function (s) { test.isTrue(expr.test(s), s) };                                                       // 3808
  var isFalse = function (s) { test.isFalse(expr.test(s), s) };                                                     // 3809
  isFalse("localhost");                                                                                             // 3810
  isFalse("192.168.200.5");                                                                                         // 3811
  isFalse("320.168.200.5");                                                                                         // 3812
  isFalse("192.168.5");                                                                                             // 3813
  isTrue("BCDF:45AB:1245:75B9:0987:1562:4567:1234");                                                                // 3814
  isFalse("BCDF:45AB:1245:75B9:0987:1562:4567:1234:AB36");                                                          // 3815
  isTrue("BCDF:45AB:1245:75B9::0987:1234:1324");                                                                    // 3816
  isFalse("BCDF:45AB:1245:75B9:0987:1234:1324");                                                                    // 3817
  isTrue("::1");                                                                                                    // 3818
});                                                                                                                 // 3819
                                                                                                                    // 3820
/*                                                                                                                  // 3821
 * END TESTS                                                                                                        // 3822
 */                                                                                                                 // 3823
                                                                                                                    // 3824
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/simple-schema/mongo-object-tests.js                                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var flat = function(doc, opts) {                                                                                    // 1
  var mDoc = new MongoObject(doc);                                                                                  // 2
  return mDoc.getFlatObject(opts);                                                                                  // 3
};                                                                                                                  // 4
                                                                                                                    // 5
var passthru = function(doc) {                                                                                      // 6
  var mDoc = new MongoObject(doc);                                                                                  // 7
  return mDoc.getObject();                                                                                          // 8
};                                                                                                                  // 9
                                                                                                                    // 10
Tinytest.add("MongoObject - Round Trip", function(test) {                                                           // 11
  // Helper Function                                                                                                // 12
  function rt(o) {                                                                                                  // 13
    var po = passthru(o);                                                                                           // 14
    var jo = JSON.stringify(o);                                                                                     // 15
    var jpo = JSON.stringify(po);                                                                                   // 16
    test.equal(jpo, jo, "After round trip, object was " + jpo + " but should have been " + jo);                     // 17
  }                                                                                                                 // 18
                                                                                                                    // 19
  // Round Trip Tests                                                                                               // 20
  rt({});                                                                                                           // 21
  rt({a: 1});                                                                                                       // 22
  rt({a: "Test"});                                                                                                  // 23
  rt({a: new Date});                                                                                                // 24
  rt({a: []});                                                                                                      // 25
  rt({a: {}});                                                                                                      // 26
  rt({a: [1, 2]});                                                                                                  // 27
  rt({a: ["Test1", "Test2"]});                                                                                      // 28
  rt({a: [new Date, new Date]});                                                                                    // 29
  rt({a: {b: 1}});                                                                                                  // 30
  rt({a: {b: "Test"}});                                                                                             // 31
  rt({a: {b: new Date}});                                                                                           // 32
  rt({a: {b: []}});                                                                                                 // 33
  rt({a: {b: {}}});                                                                                                 // 34
  rt({a: {b: [1, 2]}});                                                                                             // 35
  rt({a: {b: ["Test1", "Test2"]}});                                                                                 // 36
  rt({a: {b: [new Date, new Date]}});                                                                               // 37
  rt({a: {b: [{c: 1}, {c: 2}]}});                                                                                   // 38
  rt({a: {b: [{c: "Test1"}, {c: "Test2"}]}});                                                                       // 39
  rt({a: {b: [{c: new Date}, {c: new Date}]}});                                                                     // 40
                                                                                                                    // 41
});                                                                                                                 // 42
                                                                                                                    // 43
Tinytest.add("MongoObject - Flat", function(test) {                                                                 // 44
  // Helper Function                                                                                                // 45
  function testFlat(o, exp, opts) {                                                                                 // 46
    var fo = flat(o, opts);                                                                                         // 47
    var jo = JSON.stringify(o);                                                                                     // 48
    var jfo = JSON.stringify(fo);                                                                                   // 49
    var jexp = JSON.stringify(exp);                                                                                 // 50
    test.equal(jfo, jexp, "Object " + jo + " was flattened to " + jfo + " but should have been " + jexp);           // 51
  }                                                                                                                 // 52
                                                                                                                    // 53
  // Round Trip Tests                                                                                               // 54
  var testDate = new Date;                                                                                          // 55
  testFlat({}, {});                                                                                                 // 56
  testFlat({a: 1}, {a: 1});                                                                                         // 57
  testFlat({a: "Test"}, {a: "Test"});                                                                               // 58
  testFlat({a: testDate}, {a: testDate});                                                                           // 59
  testFlat({a: []}, {a: []});                                                                                       // 60
  testFlat({a: {}}, {a: {}});                                                                                       // 61
  testFlat({a: [1, 2]}, {"a.0": 1, "a.1": 2});                                                                      // 62
  testFlat({a: [1, 2]}, {a: [1, 2]}, {keepArrays: true});                                                           // 63
  testFlat({a: ["Test1", "Test2"]}, {"a.0": "Test1", "a.1": "Test2"});                                              // 64
  testFlat({a: ["Test1", "Test2"]}, {a: ["Test1", "Test2"]}, {keepArrays: true});                                   // 65
  testFlat({a: [testDate, testDate]}, {"a.0": testDate, "a.1": testDate});                                          // 66
  testFlat({a: [testDate, testDate]}, {a: [testDate, testDate]}, {keepArrays: true});                               // 67
  testFlat({a: {b: 1}}, {"a.b": 1});                                                                                // 68
  testFlat({a: {b: "Test"}}, {"a.b": "Test"});                                                                      // 69
  testFlat({a: {b: testDate}}, {"a.b": testDate});                                                                  // 70
  testFlat({a: {b: []}}, {"a.b": []});                                                                              // 71
  testFlat({a: {b: {}}}, {"a.b": {}});                                                                              // 72
  testFlat({a: {b: [1, 2]}}, {"a.b.0": 1, "a.b.1": 2});                                                             // 73
  testFlat({a: {b: [1, 2]}}, {"a.b": [1, 2]}, {keepArrays: true});                                                  // 74
  testFlat({a: {b: ["Test1", "Test2"]}}, {"a.b.0": "Test1", "a.b.1": "Test2"});                                     // 75
  testFlat({a: {b: ["Test1", "Test2"]}}, {"a.b": ["Test1", "Test2"]}, {keepArrays: true});                          // 76
  testFlat({a: {b: [testDate, testDate]}}, {"a.b.0": testDate, "a.b.1": testDate});                                 // 77
  testFlat({a: {b: [testDate, testDate]}}, {"a.b": [testDate, testDate]}, {keepArrays: true});                      // 78
  testFlat({a: {b: [{c: 1}, {c: 2}]}}, {"a.b.0.c": 1, "a.b.1.c": 2});                                               // 79
  testFlat({a: {b: [{c: 1}, {c: 2}]}}, {"a.b": [{c: 1}, {c: 2}]}, {keepArrays: true});                              // 80
  testFlat({a: {b: [{c: "Test1"}, {c: "Test2"}]}}, {"a.b.0.c": "Test1", "a.b.1.c": "Test2"});                       // 81
  testFlat({a: {b: [{c: "Test1"}, {c: "Test2"}]}}, {"a.b": [{c: "Test1"}, {c: "Test2"}]}, {keepArrays: true});      // 82
  testFlat({a: {b: [{c: testDate}, {c: testDate}]}}, {"a.b.0.c": testDate, "a.b.1.c": testDate});                   // 83
  testFlat({a: {b: [{c: testDate}, {c: testDate}]}}, {"a.b": [{c: testDate}, {c: testDate}]}, {keepArrays: true});  // 84
});                                                                                                                 // 85
                                                                                                                    // 86
Tinytest.add("MongoObject - removeValueForPosition", function(test) {                                               // 87
  // Helper Function                                                                                                // 88
  function testRemove(o, exp, pos) {                                                                                // 89
    var mDoc = new MongoObject(o);                                                                                  // 90
    mDoc.removeValueForPosition(pos);                                                                               // 91
    var jo = JSON.stringify(o);                                                                                     // 92
    var jno = JSON.stringify(mDoc.getObject());                                                                     // 93
    var jexp = JSON.stringify(exp);                                                                                 // 94
    test.equal(jno, jexp, "After round trip, object " + jo + " was " + jno + " but should have been " + jexp);      // 95
  }                                                                                                                 // 96
                                                                                                                    // 97
  // correctly removed                                                                                              // 98
  testRemove({                                                                                                      // 99
    foo: "bar"                                                                                                      // 100
  }, {}, 'foo');                                                                                                    // 101
                                                                                                                    // 102
  // correctly not removed                                                                                          // 103
  testRemove({                                                                                                      // 104
    foo: "bar"                                                                                                      // 105
  }, {                                                                                                              // 106
    foo: "bar"                                                                                                      // 107
  }, 'fooBar');                                                                                                     // 108
                                                                                                                    // 109
  // all descendents are removed, too                                                                               // 110
  testRemove({                                                                                                      // 111
    foo: {                                                                                                          // 112
      bar: "foobar"                                                                                                 // 113
    }                                                                                                               // 114
  }, {}, 'foo');                                                                                                    // 115
                                                                                                                    // 116
  // but not siblings                                                                                               // 117
  testRemove({                                                                                                      // 118
    foo: {                                                                                                          // 119
      bar: "foobar",                                                                                                // 120
      foobar: 1                                                                                                     // 121
    }                                                                                                               // 122
  }, {                                                                                                              // 123
    foo: {                                                                                                          // 124
      bar: "foobar"                                                                                                 // 125
    }                                                                                                               // 126
  }, 'foo[foobar]');                                                                                                // 127
});                                                                                                                 // 128
                                                                                                                    // 129
Tinytest.add("MongoObject - getValueForPosition", function(test) {                                                  // 130
  // Helper Function                                                                                                // 131
  function testGetVal(o, pos, exp) {                                                                                // 132
    var mDoc = new MongoObject(o);                                                                                  // 133
    var val = mDoc.getValueForPosition(pos);                                                                        // 134
    var jo = JSON.stringify(o);                                                                                     // 135
    var jval = JSON.stringify(val);                                                                                 // 136
    var jexp = JSON.stringify(exp);                                                                                 // 137
    test.equal(jval, jexp, "Wrong value returned for position " + pos + " in object " + jo);                        // 138
  }                                                                                                                 // 139
                                                                                                                    // 140
  testGetVal({$pull: {foo: "bar"}}, '$pull', {foo: "bar"});                                                         // 141
                                                                                                                    // 142
  testGetVal({$pull: {foo: "bar"}}, '$pull[foo]', 'bar');                                                           // 143
                                                                                                                    // 144
  testGetVal({foo: ['bar']}, 'foo', ['bar']);                                                                       // 145
                                                                                                                    // 146
  testGetVal({foo: ['bar']}, 'foo[0]', 'bar');                                                                      // 147
                                                                                                                    // 148
  testGetVal({foo: [{a: 1}, {a: 2}]}, 'foo', [{a: 1}, {a: 2}]);                                                     // 149
                                                                                                                    // 150
  testGetVal({foo: [{a: 1}, {a: 2}]}, 'foo[1]', {a: 2});                                                            // 151
                                                                                                                    // 152
  testGetVal({foo: [{a: 1}, {a: 2}]}, 'foo[1][a]', 2);                                                              // 153
                                                                                                                    // 154
});                                                                                                                 // 155
                                                                                                                    // 156
Tinytest.add("MongoObject - getInfoForKey", function(test) {                                                        // 157
  // Helper Function                                                                                                // 158
  function testGetInfo(o, key, exp) {                                                                               // 159
    var mDoc = new MongoObject(o);                                                                                  // 160
    var info = mDoc.getInfoForKey(key);                                                                             // 161
    var jo = JSON.stringify(o);                                                                                     // 162
    var jinfo = JSON.stringify(info);                                                                               // 163
    var jexp = JSON.stringify(exp);                                                                                 // 164
    test.equal(jinfo, jexp, "Wrong info returned for object " + jo);                                                // 165
  }                                                                                                                 // 166
                                                                                                                    // 167
  testGetInfo({$set: {foo: "bar"}}, 'foo', {value: 'bar', operator: '$set'});                                       // 168
                                                                                                                    // 169
  testGetInfo({$set: {'foo.bar': 1}}, 'foo.bar', {value: 1, operator: '$set'});                                     // 170
                                                                                                                    // 171
  testGetInfo({$set: {'foo.bar': 1}}, '$set', undefined); //not valid                                               // 172
                                                                                                                    // 173
  testGetInfo({$set: {'foo.bar.0': 1}}, 'foo.bar.0', {value: 1, operator: '$set'});                                 // 174
                                                                                                                    // 175
  testGetInfo({$pull: {foo: "bar"}}, 'foo', {value: 'bar', operator: '$pull'});                                     // 176
                                                                                                                    // 177
  testGetInfo({foo: ['bar']}, 'foo', {value: ['bar'], operator: null});                                             // 178
                                                                                                                    // 179
  testGetInfo({foo: ['bar']}, 'foo.0', {value: 'bar', operator: null});                                             // 180
                                                                                                                    // 181
  testGetInfo({foo: [{a: 1}, {a: 2}]}, 'foo.1.a', {value: 2, operator: null});                                      // 182
                                                                                                                    // 183
  testGetInfo({foo: [{a: 1}, {a: 2}]}, 'foo.1', {value: {a: 2}, operator: null});                                   // 184
                                                                                                                    // 185
});                                                                                                                 // 186
                                                                                                                    // 187
Tinytest.add("MongoObject - _keyToPosition", function(test) {                                                       // 188
  // Helper Function                                                                                                // 189
  function convert(key, wrapAll, exp) {                                                                             // 190
    var pos = MongoObject._keyToPosition(key, wrapAll);                                                             // 191
    var jpos = JSON.stringify(pos);                                                                                 // 192
    var jexp = JSON.stringify(exp);                                                                                 // 193
    test.equal(jpos, jexp, "Key converted incorrectly to position");                                                // 194
  }                                                                                                                 // 195
                                                                                                                    // 196
  convert('foo', false, 'foo');                                                                                     // 197
  convert('foo', true, '[foo]');                                                                                    // 198
  convert('foo.bar', false, 'foo[bar]');                                                                            // 199
  convert('foo.bar', true, '[foo][bar]');                                                                           // 200
  convert('foo.bar.0', false, 'foo[bar][0]');                                                                       // 201
  convert('foo.bar.0', true, '[foo][bar][0]');                                                                      // 202
});                                                                                                                 // 203
                                                                                                                    // 204
//Test API:                                                                                                         // 205
//test.isFalse(v, msg)                                                                                              // 206
//test.isTrue(v, msg)                                                                                               // 207
//test.equal(actual, expected, message, not)                                                                        // 208
//test.length(obj, len)                                                                                             // 209
//test.include(s, v)                                                                                                // 210
//test.isNaN(v, msg)                                                                                                // 211
//test.isUndefined(v, msg)                                                                                          // 212
//test.isNotNull                                                                                                    // 213
//test.isNull                                                                                                       // 214
//test.throws(func)                                                                                                 // 215
//test.instanceOf(obj, klass)                                                                                       // 216
//test.notEqual(actual, expected, message)                                                                          // 217
//test.runId()                                                                                                      // 218
//test.exception(exception)                                                                                         // 219
//test.expect_fail()                                                                                                // 220
//test.ok(doc)                                                                                                      // 221
//test.fail(doc)                                                                                                    // 222
//test.equal(a, b, msg)                                                                                             // 223
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
