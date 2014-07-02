(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/collection2/collection2.tests.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function pub(col) {                                                                                                    // 1
  if (Meteor.isServer) {                                                                                               // 2
    Meteor.publish(null, function () {                                                                                 // 3
      return col.find();                                                                                               // 4
    });                                                                                                                // 5
  }                                                                                                                    // 6
}                                                                                                                      // 7
                                                                                                                       // 8
var books = new Meteor.Collection("books", {                                                                           // 9
  schema: new SimpleSchema({                                                                                           // 10
    title: {                                                                                                           // 11
      type: String,                                                                                                    // 12
      label: "Title",                                                                                                  // 13
      max: 200,                                                                                                        // 14
      index: 1                                                                                                         // 15
    },                                                                                                                 // 16
    author: {                                                                                                          // 17
      type: String,                                                                                                    // 18
      label: "Author"                                                                                                  // 19
    },                                                                                                                 // 20
    copies: {                                                                                                          // 21
      type: Number,                                                                                                    // 22
      label: "Number of copies",                                                                                       // 23
      min: 0                                                                                                           // 24
    },                                                                                                                 // 25
    lastCheckedOut: {                                                                                                  // 26
      type: Date,                                                                                                      // 27
      label: "Last date this book was checked out",                                                                    // 28
      optional: true                                                                                                   // 29
    },                                                                                                                 // 30
    summary: {                                                                                                         // 31
      type: String,                                                                                                    // 32
      label: "Brief summary",                                                                                          // 33
      optional: true,                                                                                                  // 34
      max: 1000                                                                                                        // 35
    },                                                                                                                 // 36
    isbn: {                                                                                                            // 37
      type: String,                                                                                                    // 38
      label: "ISBN",                                                                                                   // 39
      optional: true,                                                                                                  // 40
      index: 1,                                                                                                        // 41
      unique: true                                                                                                     // 42
    },                                                                                                                 // 43
    field1: {                                                                                                          // 44
      type: String,                                                                                                    // 45
      optional: true                                                                                                   // 46
    },                                                                                                                 // 47
    field2: {                                                                                                          // 48
      type: String,                                                                                                    // 49
      optional: true                                                                                                   // 50
    },                                                                                                                 // 51
    createdAt: {                                                                                                       // 52
      type: Date,                                                                                                      // 53
      optional: true,                                                                                                  // 54
      denyUpdate: true                                                                                                 // 55
    },                                                                                                                 // 56
    updatedAt: {                                                                                                       // 57
      type: Date,                                                                                                      // 58
      optional: true,                                                                                                  // 59
      denyInsert: true                                                                                                 // 60
    }                                                                                                                  // 61
  })                                                                                                                   // 62
});                                                                                                                    // 63
                                                                                                                       // 64
// Add one unique index outside of C2                                                                                  // 65
if (Meteor.isServer) {                                                                                                 // 66
  try {                                                                                                                // 67
    books._dropIndex({field1: 1, field2: 1});                                                                          // 68
  } catch (err) {                                                                                                      // 69
                                                                                                                       // 70
  }                                                                                                                    // 71
  books._ensureIndex({field1: 1, field2: 1}, {unique: true, sparse: true});                                            // 72
}                                                                                                                      // 73
                                                                                                                       // 74
var autoValues = new Meteor.Collection("autoValues", {                                                                 // 75
  schema: {                                                                                                            // 76
    name: {                                                                                                            // 77
      type: String                                                                                                     // 78
    },                                                                                                                 // 79
    dateDefault: {                                                                                                     // 80
      type: Date,                                                                                                      // 81
      optional: true,                                                                                                  // 82
      autoValue: function() {                                                                                          // 83
        if (!this.isSet) {                                                                                             // 84
          return new Date("2013-01-01");                                                                               // 85
        }                                                                                                              // 86
      }                                                                                                                // 87
    },                                                                                                                 // 88
    dateForce: {                                                                                                       // 89
      type: Date,                                                                                                      // 90
      optional: true,                                                                                                  // 91
      autoValue: function() {                                                                                          // 92
        return new Date("2013-01-01");                                                                                 // 93
      }                                                                                                                // 94
    },                                                                                                                 // 95
    updateCount: {                                                                                                     // 96
      type: Number,                                                                                                    // 97
      autoValue: function() {                                                                                          // 98
        if (this.isInsert) {                                                                                           // 99
          return 0;                                                                                                    // 100
        } else {                                                                                                       // 101
          return {$inc: 1};                                                                                            // 102
        }                                                                                                              // 103
      }                                                                                                                // 104
    },                                                                                                                 // 105
    content: {                                                                                                         // 106
      type: String,                                                                                                    // 107
      optional: true                                                                                                   // 108
    },                                                                                                                 // 109
    firstWord: {                                                                                                       // 110
      type: String,                                                                                                    // 111
      optional: true,                                                                                                  // 112
      autoValue: function() {                                                                                          // 113
        var content = this.field("content");                                                                           // 114
        if (content.isSet) {                                                                                           // 115
          return content.value.split(' ')[0];                                                                          // 116
        } else {                                                                                                       // 117
          this.unset();                                                                                                // 118
        }                                                                                                              // 119
      }                                                                                                                // 120
    },                                                                                                                 // 121
    updatesHistory: {                                                                                                  // 122
      type: [Object],                                                                                                  // 123
      optional: true,                                                                                                  // 124
      autoValue: function() {                                                                                          // 125
        var content = this.field("content");                                                                           // 126
        if (content.isSet) {                                                                                           // 127
          if (this.isInsert) {                                                                                         // 128
            return [{                                                                                                  // 129
                date: new Date,                                                                                        // 130
                content: content.value                                                                                 // 131
              }];                                                                                                      // 132
          } else {                                                                                                     // 133
            return {                                                                                                   // 134
              $push: {                                                                                                 // 135
                date: new Date,                                                                                        // 136
                content: content.value                                                                                 // 137
              }                                                                                                        // 138
            };                                                                                                         // 139
          }                                                                                                            // 140
        }                                                                                                              // 141
      }                                                                                                                // 142
    },                                                                                                                 // 143
    'updatesHistory.$.date': {                                                                                         // 144
      type: Date,                                                                                                      // 145
      optional: true                                                                                                   // 146
    },                                                                                                                 // 147
    'updatesHistory.$.content': {                                                                                      // 148
      type: String,                                                                                                    // 149
      optional: true                                                                                                   // 150
    }                                                                                                                  // 151
  }                                                                                                                    // 152
});                                                                                                                    // 153
                                                                                                                       // 154
var noSchemaCollection = new Meteor.Collection('noSchema', {                                                           // 155
  transform: function(doc) {                                                                                           // 156
    doc.userFoo = "userBar";                                                                                           // 157
    return doc;                                                                                                        // 158
  }                                                                                                                    // 159
});                                                                                                                    // 160
                                                                                                                       // 161
Document = function(data) {                                                                                            // 162
  _.extend(this, data);                                                                                                // 163
};                                                                                                                     // 164
                                                                                                                       // 165
Document.prototype = {                                                                                                 // 166
  constructor: Document,                                                                                               // 167
  toString: function() {                                                                                               // 168
    return this.toJSONValue.toString();                                                                                // 169
  },                                                                                                                   // 170
  clone: function() {                                                                                                  // 171
    return new Document(this);                                                                                         // 172
  },                                                                                                                   // 173
  equals: function(other) {                                                                                            // 174
    if (!(other instanceof Document))                                                                                  // 175
      return false;                                                                                                    // 176
    return EJSON.stringify(this) === EJSON.stringify(other);                                                           // 177
  },                                                                                                                   // 178
  typeName: function() {                                                                                               // 179
    return "Document";                                                                                                 // 180
  },                                                                                                                   // 181
  toJSONValue: function() {                                                                                            // 182
    return _.extend({}, this);                                                                                         // 183
  }                                                                                                                    // 184
};                                                                                                                     // 185
                                                                                                                       // 186
BlackBox = new Meteor.Collection('black', {                                                                            // 187
  schema: {                                                                                                            // 188
    name: {                                                                                                            // 189
      type: String                                                                                                     // 190
    },                                                                                                                 // 191
    data: {                                                                                                            // 192
      type: Document,                                                                                                  // 193
      blackbox: true                                                                                                   // 194
    }                                                                                                                  // 195
  },                                                                                                                   // 196
  transform: function(doc) {                                                                                           // 197
    doc.data = new Document(doc.data);                                                                                 // 198
    return doc;                                                                                                        // 199
  }                                                                                                                    // 200
});                                                                                                                    // 201
                                                                                                                       // 202
defaultValues = new Meteor.Collection("dv");                                                                           // 203
                                                                                                                       // 204
// Ensure that attaching the schema after constructing works, too                                                      // 205
defaultValues.attachSchema(new SimpleSchema({                                                                          // 206
  bool1: {                                                                                                             // 207
    type: Boolean,                                                                                                     // 208
    defaultValue: false                                                                                                // 209
  }                                                                                                                    // 210
}));                                                                                                                   // 211
                                                                                                                       // 212
contextCheck = new Meteor.Collection("contextCheck", {                                                                 // 213
  schema: new SimpleSchema({                                                                                           // 214
    foo: {                                                                                                             // 215
      type: String,                                                                                                    // 216
      optional: true                                                                                                   // 217
    },                                                                                                                 // 218
    'context.userId': {                                                                                                // 219
      type: String,                                                                                                    // 220
      optional: true,                                                                                                  // 221
      autoValue: function () {                                                                                         // 222
        return this.userId;                                                                                            // 223
      }                                                                                                                // 224
    },                                                                                                                 // 225
    'context.isFromTrustedCode': {                                                                                     // 226
      type: Boolean,                                                                                                   // 227
      optional: true,                                                                                                  // 228
      autoValue: function () {                                                                                         // 229
        return this.isFromTrustedCode;                                                                                 // 230
      }                                                                                                                // 231
    },                                                                                                                 // 232
    'context.isInsert': {                                                                                              // 233
      type: Boolean,                                                                                                   // 234
      optional: true,                                                                                                  // 235
      autoValue: function () {                                                                                         // 236
        return this.isInsert;                                                                                          // 237
      }                                                                                                                // 238
    },                                                                                                                 // 239
    'context.isUpdate': {                                                                                              // 240
      type: Boolean,                                                                                                   // 241
      optional: true,                                                                                                  // 242
      autoValue: function () {                                                                                         // 243
        return this.isUpdate;                                                                                          // 244
      }                                                                                                                // 245
    }                                                                                                                  // 246
  })                                                                                                                   // 247
});                                                                                                                    // 248
                                                                                                                       // 249
if (Meteor.isServer) {                                                                                                 // 250
  Meteor.publish("books", function() {                                                                                 // 251
    return books.find();                                                                                               // 252
  });                                                                                                                  // 253
                                                                                                                       // 254
  Meteor.publish("autovalues", function() {                                                                            // 255
    return autoValues.find();                                                                                          // 256
  });                                                                                                                  // 257
                                                                                                                       // 258
  Meteor.publish("defvalues", function() {                                                                             // 259
    return defaultValues.find();                                                                                       // 260
  });                                                                                                                  // 261
                                                                                                                       // 262
  Meteor.publish("noschema", function() {                                                                              // 263
    return noSchemaCollection.find();                                                                                  // 264
  });                                                                                                                  // 265
                                                                                                                       // 266
  Meteor.publish("black", function() {                                                                                 // 267
    return BlackBox.find();                                                                                            // 268
  });                                                                                                                  // 269
                                                                                                                       // 270
  Meteor.publish("contextCheck", function () {                                                                         // 271
    return contextCheck.find();                                                                                        // 272
  });                                                                                                                  // 273
                                                                                                                       // 274
  defaultValues.allow({                                                                                                // 275
    insert: function() {                                                                                               // 276
      return true;                                                                                                     // 277
    },                                                                                                                 // 278
    update: function() {                                                                                               // 279
      return true;                                                                                                     // 280
    },                                                                                                                 // 281
    remove: function() {                                                                                               // 282
      return true;                                                                                                     // 283
    }                                                                                                                  // 284
  });                                                                                                                  // 285
                                                                                                                       // 286
  books.allow({                                                                                                        // 287
    insert: function() {                                                                                               // 288
      return true;                                                                                                     // 289
    },                                                                                                                 // 290
    update: function() {                                                                                               // 291
      return true;                                                                                                     // 292
    },                                                                                                                 // 293
    remove: function() {                                                                                               // 294
      return true;                                                                                                     // 295
    }                                                                                                                  // 296
  });                                                                                                                  // 297
                                                                                                                       // 298
  var shouldDeny = false;                                                                                              // 299
  books.deny({                                                                                                         // 300
    insert: function() {                                                                                               // 301
      return shouldDeny;                                                                                               // 302
    },                                                                                                                 // 303
    update: function() {                                                                                               // 304
      return shouldDeny;                                                                                               // 305
    },                                                                                                                 // 306
    remove: function() {                                                                                               // 307
      return shouldDeny;                                                                                               // 308
    }                                                                                                                  // 309
  });                                                                                                                  // 310
                                                                                                                       // 311
  autoValues.allow({                                                                                                   // 312
    insert: function() {                                                                                               // 313
      return true;                                                                                                     // 314
    },                                                                                                                 // 315
    update: function() {                                                                                               // 316
      return true;                                                                                                     // 317
    },                                                                                                                 // 318
    remove: function() {                                                                                               // 319
      return true;                                                                                                     // 320
    }                                                                                                                  // 321
  });                                                                                                                  // 322
                                                                                                                       // 323
  // Rig test helper method for setting denyAll                                                                        // 324
  Meteor.methods({                                                                                                     // 325
    denyAll: function() {                                                                                              // 326
      shouldDeny = true;                                                                                               // 327
    },                                                                                                                 // 328
    allowAll: function() {                                                                                             // 329
      shouldDeny = false;                                                                                              // 330
    },                                                                                                                 // 331
    removeAll: function () {                                                                                           // 332
      books.remove({});                                                                                                // 333
      autoValues.remove({});                                                                                           // 334
      defaultValues.remove({});                                                                                        // 335
      noSchemaCollection.remove({});                                                                                   // 336
      BlackBox.remove({});                                                                                             // 337
      contextCheck.remove({});                                                                                         // 338
    }                                                                                                                  // 339
  });                                                                                                                  // 340
                                                                                                                       // 341
  noSchemaCollection.allow({                                                                                           // 342
    insert: function() {                                                                                               // 343
      return true;                                                                                                     // 344
    },                                                                                                                 // 345
    update: function() {                                                                                               // 346
      return true;                                                                                                     // 347
    }                                                                                                                  // 348
  });                                                                                                                  // 349
                                                                                                                       // 350
  BlackBox.allow({                                                                                                     // 351
    insert: function() {                                                                                               // 352
      return true;                                                                                                     // 353
    },                                                                                                                 // 354
    update: function() {                                                                                               // 355
      return true;                                                                                                     // 356
    }                                                                                                                  // 357
  });                                                                                                                  // 358
                                                                                                                       // 359
  contextCheck.allow({                                                                                                 // 360
    insert: function() {                                                                                               // 361
      return true;                                                                                                     // 362
    },                                                                                                                 // 363
    update: function() {                                                                                               // 364
      return true;                                                                                                     // 365
    }                                                                                                                  // 366
  });                                                                                                                  // 367
                                                                                                                       // 368
} else {                                                                                                               // 369
  var booksSubscription = Meteor.subscribe("books");                                                                   // 370
  Meteor.subscribe("autovalues");                                                                                      // 371
  Meteor.subscribe("defvalues");                                                                                       // 372
  Meteor.subscribe("noschema");                                                                                        // 373
  Meteor.subscribe("black");                                                                                           // 374
  Meteor.subscribe("contextCheck");                                                                                    // 375
}                                                                                                                      // 376
                                                                                                                       // 377
function equals(a, b) {                                                                                                // 378
  return !!(EJSON.stringify(a) === EJSON.stringify(b));                                                                // 379
}                                                                                                                      // 380
                                                                                                                       // 381
Tinytest.add('Collection2 - Test Environment', function(test) {                                                        // 382
  test.isTrue(typeof SimpleSchema !== 'undefined', 'test environment not initialized SimpleSchema');                   // 383
});                                                                                                                    // 384
                                                                                                                       // 385
if (Meteor.isServer) {                                                                                                 // 386
  Tinytest.add('Collection2 - Ensure Index', function(test) {                                                          // 387
    // We need to have an access to the getIndexes method of the embedded                                              // 388
    // collection in order to test this feature.                                                                       // 389
    // var indexes = books._collection._getIndexes();                                                                  // 390
  });                                                                                                                  // 391
}                                                                                                                      // 392
                                                                                                                       // 393
Tinytest.addAsync('Collection2 - Reset', function (test, next) {                                                       // 394
  Meteor.call("removeAll", next);                                                                                      // 395
});                                                                                                                    // 396
                                                                                                                       // 397
// Test required field "copies"                                                                                        // 398
Tinytest.addAsync('Collection2 - Insert Required', function(test, next) {                                              // 399
  var numDone = 0;                                                                                                     // 400
  function maybeNext() {                                                                                               // 401
    numDone++;                                                                                                         // 402
    if (numDone === 2) {                                                                                               // 403
      next();                                                                                                          // 404
    }                                                                                                                  // 405
  }                                                                                                                    // 406
                                                                                                                       // 407
  var id = books.insert({title: "Ulysses", author: "James Joyce"}, function(error, result) {                           // 408
    //The insert will fail, error will be set,                                                                         // 409
    test.isTrue(!!error, 'We expected the insert to trigger an error since field "copies" are required');              // 410
    //and result will be false because "copies" is required.                                                           // 411
    test.isFalse(result, 'result should be false because "copies" is required');                                       // 412
    //The list of errors is available by calling books.simpleSchema().namedContext().invalidKeys()                     // 413
    var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                               // 414
    test.equal(invalidKeys.length, 1, 'We should get one invalidKey back');                                            // 415
                                                                                                                       // 416
    var key = invalidKeys[0] || {};                                                                                    // 417
                                                                                                                       // 418
    test.equal(key.name, 'copies', 'We expected the key "copies"');                                                    // 419
    test.equal(key.type, 'required', 'We expected the type to be required');                                           // 420
    maybeNext();                                                                                                       // 421
  });                                                                                                                  // 422
                                                                                                                       // 423
  test.equal(typeof id, 'string', 'We expected an ID to be returned');                                                 // 424
  maybeNext();                                                                                                         // 425
});                                                                                                                    // 426
                                                                                                                       // 427
// When unique: true, inserts should fail if another document already has the same value                               // 428
var uniqueBookId, isbn;                                                                                                // 429
Tinytest.addAsync('Collection2 - Unique - Prep', function(test, next) {                                                // 430
  isbn = Random.id();                                                                                                  // 431
  // Insert isbn                                                                                                       // 432
  uniqueBookId = books.insert({title: "Ulysses", author: "James Joyce", copies: 1, isbn: isbn}, function(error, result) {
    test.isFalse(!!error, 'We expected the insert not to trigger an error since isbn is unique');                      // 434
    test.isTrue(!!result, 'result should be defined');                                                                 // 435
                                                                                                                       // 436
    var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                               // 437
    test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back');                                            // 438
    // Insert isbn+"A"                                                                                                 // 439
    books.insert({title: "Ulysses", author: "James Joyce", copies: 1, isbn: isbn+"A"}, function(error, result) {       // 440
      test.isFalse(!!error, 'We expected the insert not to trigger an error since isbn is unique');                    // 441
      test.isTrue(!!result, 'result should be defined');                                                               // 442
                                                                                                                       // 443
      var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                             // 444
      test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back');                                          // 445
      next();                                                                                                          // 446
    });                                                                                                                // 447
  });                                                                                                                  // 448
});                                                                                                                    // 449
                                                                                                                       // 450
Tinytest.addAsync('Collection2 - Unique - Insert Duplicate', function(test, next) {                                    // 451
  books.insert({title: "Ulysses", author: "James Joyce", copies: 1, isbn: isbn}, function(error, result) {             // 452
    test.isTrue(!!error, 'We expected the insert to trigger an error since isbn being inserted is already used');      // 453
    test.isFalse(result, 'result should be false');                                                                    // 454
                                                                                                                       // 455
    var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                               // 456
    test.equal(invalidKeys.length, 1, 'We should get one invalidKey back');                                            // 457
    var key = invalidKeys[0] || {};                                                                                    // 458
                                                                                                                       // 459
    test.equal(key.name, 'isbn', 'We expected the key "isbn"');                                                        // 460
    test.equal(key.type, 'notUnique', 'We expected the type to be "notUnique"');                                       // 461
    next();                                                                                                            // 462
  });                                                                                                                  // 463
});                                                                                                                    // 464
                                                                                                                       // 465
Tinytest.addAsync('Collection2 - Unique - Insert Duplicate Non-C2 Index', function(test, next) {                       // 466
  if (Meteor.isServer) {                                                                                               // 467
    var val = "foo";                                                                                                   // 468
  } else {                                                                                                             // 469
    var val = "bar";                                                                                                   // 470
  }                                                                                                                    // 471
  // Good insert                                                                                                       // 472
  books.insert({title: "Ulysses", author: "James Joyce", copies: 1, field1: val, field2: val}, function(error, result) {
    test.isFalse(!!error, 'We expected the insert not to trigger an error since the fields are unique');               // 474
    test.isTrue(!!result, 'result should be the new ID');                                                              // 475
                                                                                                                       // 476
    var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                               // 477
    test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back');                                            // 478
    var key = invalidKeys[0] || {};                                                                                    // 479
                                                                                                                       // 480
    // Bad insert                                                                                                      // 481
    books.insert({title: "Ulysses", author: "James Joyce", copies: 1, field1: val, field2: val}, function(error, result) {
      test.isTrue(!!error, 'We expected the insert to trigger an error since the fields are not unique');              // 483
      test.isFalse(result, 'result should be false');                                                                  // 484
                                                                                                                       // 485
      var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                             // 486
      test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back because this is a non-C2 unique index');    // 487
      var key = invalidKeys[0] || {};                                                                                  // 488
                                                                                                                       // 489
      next();                                                                                                          // 490
    });                                                                                                                // 491
  });                                                                                                                  // 492
});                                                                                                                    // 493
                                                                                                                       // 494
Tinytest.addAsync('Collection2 - Unique - Validation Alone', function(test, next) {                                    // 495
  //test validation without actual updating                                                                            // 496
  var context = books.simpleSchema().namedContext();                                                                   // 497
                                                                                                                       // 498
  //we don't know whether this would result in a non-unique value or not because                                       // 499
  //we don't know which documents we'd be changing; therefore, no notUnique error                                      // 500
  context.validate({$set: {isbn: isbn}}, {modifier: true});                                                            // 501
  var invalidKeys = context.invalidKeys();                                                                             // 502
  test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back');                                              // 503
                                                                                                                       // 504
  context.validateOne({$set: {isbn: isbn}}, "isbn", {modifier: true});                                                 // 505
  invalidKeys = context.invalidKeys();                                                                                 // 506
  test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back');                                              // 507
  next();                                                                                                              // 508
});                                                                                                                    // 509
                                                                                                                       // 510
Tinytest.addAsync('Collection2 - Unique - Update Self', function(test, next) {                                         // 511
  // When unique: true, updates should not fail when the document being updated has the same value                     // 512
  books.update(uniqueBookId, {$set: {isbn: isbn}}, function(error) {                                                   // 513
    test.isFalse(!!error, 'We expected the update not to trigger an error since isbn is used only by the doc being updated');
                                                                                                                       // 515
    var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                               // 516
    test.equal(invalidKeys, [], 'We should get no invalidKeys back');                                                  // 517
    next();                                                                                                            // 518
  });                                                                                                                  // 519
});                                                                                                                    // 520
                                                                                                                       // 521
Tinytest.addAsync('Collection2 - Unique - Update Another', function(test, next) {                                      // 522
  // When unique: true, updates should fail if another document already has the same value                             // 523
  books.update(uniqueBookId, {$set: {isbn: isbn + "A"}}, function(error) {                                             // 524
    test.isTrue(!!error, 'We expected the update to trigger an error since isbn we want to change to is already used by a different document');
                                                                                                                       // 526
    var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                               // 527
    test.equal(invalidKeys.length, 1, 'We should get one invalidKey back');                                            // 528
    var key = invalidKeys[0] || {};                                                                                    // 529
                                                                                                                       // 530
    test.equal(key.name, 'isbn', 'We expected the key "isbn"');                                                        // 531
    test.equal(key.type, 'notUnique', 'We expected the type to be "notUnique"');                                       // 532
    next();                                                                                                            // 533
  });                                                                                                                  // 534
});                                                                                                                    // 535
                                                                                                                       // 536
var testCollection = new Meteor.Collection("testCollection");                                                          // 537
Tinytest.add('Collection2 - Unique - Object Array', function(test) {                                                   // 538
  // We need to handle arrays of objects specially because the                                                         // 539
  // index key must be "a.b" if, for example, the schema key is "a.$.b".                                               // 540
  // Here we make sure that works.                                                                                     // 541
  var testSchema = new SimpleSchema({                                                                                  // 542
    'a.$.b': {                                                                                                         // 543
      type: String,                                                                                                    // 544
      unique: true                                                                                                     // 545
    }                                                                                                                  // 546
  });                                                                                                                  // 547
                                                                                                                       // 548
  try {                                                                                                                // 549
    testCollection.attachSchema(testSchema);                                                                           // 550
  } catch (e) {                                                                                                        // 551
    // If we error, that means collection2 tried to set up the index incorrectly,                                      // 552
    // using the wrong index key                                                                                       // 553
  }                                                                                                                    // 554
                                                                                                                       // 555
  test.instanceOf(testCollection.simpleSchema(), SimpleSchema);                                                        // 556
});                                                                                                                    // 557
                                                                                                                       // 558
Tinytest.addAsync("Collection2 - denyInsert", function(test, next) {                                                   // 559
  books.insert({title: "Ulysses", author: "James Joyce", copies: 1, updatedAt: new Date}, function(error, result) {    // 560
    test.isTrue(!!error, 'We expected the insert to trigger an error since updatedAt has denyInsert set to true');     // 561
                                                                                                                       // 562
    var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                               // 563
    test.equal(invalidKeys.length, 1, 'We should get one invalidKey back');                                            // 564
    var key = invalidKeys[0] || {};                                                                                    // 565
                                                                                                                       // 566
    test.equal(key.name, 'updatedAt', 'We expected the key "updatedAt"');                                              // 567
    test.equal(key.type, 'insertNotAllowed', 'We expected the type to be "insertNotAllowed"');                         // 568
                                                                                                                       // 569
    next();                                                                                                            // 570
  });                                                                                                                  // 571
});                                                                                                                    // 572
                                                                                                                       // 573
Tinytest.addAsync("Collection2 - denyUpdate", function(test, next) {                                                   // 574
  // Test denyInsert valid case here so that we can use the inserted doc for the                                       // 575
  // update tests.                                                                                                     // 576
  books.insert({title: "Ulysses", author: "James Joyce", copies: 1, createdAt: new Date}, function(error, newId) {     // 577
    test.isFalse(!!error, 'We expected the insert not to trigger an error since createdAt denies updates but not inserts');
                                                                                                                       // 579
    var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                               // 580
    test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back');                                            // 581
    books.update({_id: newId}, {$set: {createdAt: new Date}}, function(error, result) {                                // 582
      test.isTrue(!!error, 'We expected the insert to trigger an error since createdAt has denyUpdate set to true');   // 583
                                                                                                                       // 584
      var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                             // 585
      test.equal(invalidKeys.length, 1, 'We should get one invalidKey back');                                          // 586
      var key = invalidKeys[0] || {};                                                                                  // 587
                                                                                                                       // 588
      test.equal(key.name, 'createdAt', 'We expected the key "createdAt"');                                            // 589
      test.equal(key.type, 'updateNotAllowed', 'We expected the type to be "updateNotAllowed"');                       // 590
                                                                                                                       // 591
      //now test valid case                                                                                            // 592
      books.update({_id: newId}, {$set: {updatedAt: new Date}}, function(error, result) {                              // 593
        test.isFalse(!!error, 'We expected the update not to trigger an error since updatedAt denies inserts but not updates');
                                                                                                                       // 595
        var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                           // 596
        test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back');                                        // 597
        next();                                                                                                        // 598
      });                                                                                                              // 599
    });                                                                                                                // 600
  });                                                                                                                  // 601
});                                                                                                                    // 602
                                                                                                                       // 603
if (Meteor.isServer) {                                                                                                 // 604
  //no validation when calling underlying _collection on the server                                                    // 605
  Tinytest.addAsync("Collection2 - _collection on the server", function(test, next) {                                  // 606
    books._collection.insert({title: "Ulysses", author: "James Joyce", copies: 1, updatedAt: new Date}, function(error, result) {
      test.isFalse(!!error, 'We expected the insert not to trigger an error since we are on the server');              // 608
      next();                                                                                                          // 609
    });                                                                                                                // 610
  });                                                                                                                  // 611
}                                                                                                                      // 612
                                                                                                                       // 613
Tinytest.addAsync("Collection2 - Black Box", function(test, next) {                                                    // 614
                                                                                                                       // 615
  var now = new Date;                                                                                                  // 616
                                                                                                                       // 617
  var boxData = {                                                                                                      // 618
    name: "Test",                                                                                                      // 619
    data: new Document({                                                                                               // 620
      one: 1,                                                                                                          // 621
      two: "some string",                                                                                              // 622
      three: {                                                                                                         // 623
        four: now                                                                                                      // 624
      }                                                                                                                // 625
    })                                                                                                                 // 626
  };                                                                                                                   // 627
                                                                                                                       // 628
  BlackBox.insert(boxData, function(error, newId) {                                                                    // 629
    test.isFalse(!!error, 'We expected the insert not to trigger an error since all required fields are present');     // 630
    test.isTrue(!!newId, 'We expected to get an ID back');                                                             // 631
                                                                                                                       // 632
    var doc = BlackBox.findOne({_id: newId});                                                                          // 633
    test.isTrue(!!doc, 'There should be a document inserted');                                                         // 634
    doc && test.isTrue(doc.data instanceof Document, "we lost the custom type");                                       // 635
    doc && test.equal(doc.name, "Test");                                                                               // 636
    doc && test.equal(doc.data.one, 1);                                                                                // 637
    doc && test.equal(doc.data.two, "some string");                                                                    // 638
    doc && test.equal(doc.data.three.four, now);                                                                       // 639
                                                                                                                       // 640
    // remove the EJSON prototype and try again; should still work                                                     // 641
    Document.prototype = {};                                                                                           // 642
                                                                                                                       // 643
    boxData = {                                                                                                        // 644
      name: "Test",                                                                                                    // 645
      data: new Document({                                                                                             // 646
        one: 1,                                                                                                        // 647
        two: "some string",                                                                                            // 648
        three: {                                                                                                       // 649
          four: now                                                                                                    // 650
        }                                                                                                              // 651
      })                                                                                                               // 652
    };                                                                                                                 // 653
                                                                                                                       // 654
    BlackBox.insert(boxData, function(error, newId2) {                                                                 // 655
      test.isFalse(!!error, 'We expected the insert not to trigger an error since all required fields are present');   // 656
      test.isTrue(!!newId, 'We expected to get an ID back');                                                           // 657
                                                                                                                       // 658
      var doc = BlackBox.findOne({_id: newId2});                                                                       // 659
      test.isTrue(!!doc, 'There should be a document inserted');                                                       // 660
      doc && test.isTrue(doc.data instanceof Document, "we lost the custom type");                                     // 661
      doc && test.equal(doc.name, "Test");                                                                             // 662
      doc && test.equal(doc.data.one, 1);                                                                              // 663
      doc && test.equal(doc.data.two, "some string");                                                                  // 664
      doc && test.equal(doc.data.three.four, now);                                                                     // 665
                                                                                                                       // 666
      next();                                                                                                          // 667
    });                                                                                                                // 668
  });                                                                                                                  // 669
                                                                                                                       // 670
});                                                                                                                    // 671
                                                                                                                       // 672
Tinytest.addAsync("Collection2 - AutoValue Insert", function(test, next) {                                             // 673
  autoValues.insert({name: "Test", firstWord: "Illegal to manually set value"}, function(err, res) {                   // 674
    test.isFalse(!!err, 'We expected the insert not to trigger an error since all required fields are present');       // 675
    var p = autoValues.findOne({_id: res});                                                                            // 676
    var d = new Date("2013-01-01");                                                                                    // 677
                                                                                                                       // 678
    test.equal(p.dateDefault.getTime(), d.getTime(), 'expected the dateDefault to be correctly set after insert');     // 679
    test.equal(p.dateForce.getTime(), d.getTime(), 'expected the dateForce to be correctly set after insert');         // 680
    test.isUndefined(p.firstWord, 'expected firstWord to be undefined');                                               // 681
    test.isUndefined(p.updatesHistory, 'expected updatesHistory to be undefined');                                     // 682
                                                                                                                       // 683
    // Now test with dateDefault set and verify it is not overwritten                                                  // 684
    var myDate = new Date("2013-02-01");                                                                               // 685
    autoValues.insert({name: "Test", dateDefault: myDate}, function(err, res) {                                        // 686
      var p = autoValues.findOne({_id: res});                                                                          // 687
      var d = new Date("2013-01-01");                                                                                  // 688
                                                                                                                       // 689
      test.instanceOf(p.dateDefault, Date);                                                                            // 690
      if (p.dateDefault instanceof Date) {                                                                             // 691
        test.equal(p.dateDefault.getTime(), myDate.getTime(), 'expected the dateDefault to be correctly set after insert');
      }                                                                                                                // 693
                                                                                                                       // 694
      test.instanceOf(p.dateForce, Date);                                                                              // 695
      if (p.dateForce instanceof Date) {                                                                               // 696
        test.equal(p.dateForce.getTime(), d.getTime(), 'expected the dateForce to be correctly set after insert');     // 697
      }                                                                                                                // 698
                                                                                                                       // 699
      test.isUndefined(p.firstWord, 'expected firstWord to be undefined');                                             // 700
      test.isUndefined(p.updatesHistory, 'expected updatesHistory to be undefined');                                   // 701
                                                                                                                       // 702
      autoValues.insert({name: "Test", content: 'Hello world!'}, function(err, res) {                                  // 703
        var p = autoValues.findOne({_id: res});                                                                        // 704
        test.equal(p.firstWord, 'Hello', 'expected firstWord to be "Hello"');                                          // 705
        test.length(p.updatesHistory, 1);                                                                              // 706
        test.equal(p.updatesHistory[0].content, 'Hello world!', 'expected updatesHistory.content to be "Hello world!"');
        next();                                                                                                        // 708
      });                                                                                                              // 709
    });                                                                                                                // 710
  });                                                                                                                  // 711
});                                                                                                                    // 712
                                                                                                                       // 713
Tinytest.addAsync("Collection2 - AutoValue Update", function(test, next) {                                             // 714
  autoValues.insert({name: "Update Test"}, function(err, testId) {                                                     // 715
    autoValues.update({_id: testId}, {$set: {content: "Test Content"}}, function(err, res) {                           // 716
      var p = autoValues.findOne({_id: testId});                                                                       // 717
      test.equal(p.firstWord, 'Test', 'expected firstWord to be "Test"');                                              // 718
      test.length(p.updatesHistory, 1);                                                                                // 719
      test.equal(p.updatesHistory[0].content, 'Test Content', 'expected updatesHistory.content to be "Test Content"'); // 720
      test.equal(p.updateCount, 1, 'expected updateCount to be 1');                                                    // 721
      next();                                                                                                          // 722
    });                                                                                                                // 723
  });                                                                                                                  // 724
});                                                                                                                    // 725
                                                                                                                       // 726
Tinytest.addAsync("Collection2 - AutoValue Context", function(test, next) {                                            // 727
  contextCheck.insert({}, function (error, testId) {                                                                   // 728
    test.isFalse(!!error, 'insert failed: ' + (error && error.message))                                                // 729
    var ctx = contextCheck.findOne({_id: testId});                                                                     // 730
    test.isTrue(ctx.context.isInsert, 'expected isInsert to be true');                                                 // 731
    test.isFalse(ctx.context.isUpdate, 'expected isUpdate to be false');                                               // 732
    test.isNull(ctx.context.userId, 'expected userId to be null');                                                     // 733
    if (Meteor.isClient) {                                                                                             // 734
      test.isFalse(ctx.context.isFromTrustedCode, 'expected isFromTrustedCode to be false');                           // 735
    } else {                                                                                                           // 736
      test.isTrue(ctx.context.isFromTrustedCode, 'expected isFromTrustedCode to be true');                             // 737
    }                                                                                                                  // 738
                                                                                                                       // 739
    contextCheck.update({_id: testId}, {$set: {foo: "bar"}}, function (error, result) {                                // 740
      ctx = contextCheck.findOne({_id: testId});                                                                       // 741
      test.equal(ctx.foo, 'bar', "update failed");                                                                     // 742
      test.isTrue(ctx.context.isUpdate, 'expected isUpdate to be true');                                               // 743
      test.isFalse(ctx.context.isInsert, 'expected isInsert to be false');                                             // 744
      test.isNull(ctx.context.userId, 'expected userId to be null');                                                   // 745
      if (Meteor.isClient) {                                                                                           // 746
        test.isFalse(ctx.context.isFromTrustedCode, 'expected isFromTrustedCode to be false');                         // 747
      } else {                                                                                                         // 748
        test.isTrue(ctx.context.isFromTrustedCode, 'expected isFromTrustedCode to be true');                           // 749
      }                                                                                                                // 750
      next();                                                                                                          // 751
    });                                                                                                                // 752
  });                                                                                                                  // 753
});                                                                                                                    // 754
                                                                                                                       // 755
Tinytest.addAsync("Collection2 - DefaultValue Update", function(test, next) {                                          // 756
  // Base case                                                                                                         // 757
  defaultValues.insert({}, function(err, testId) {                                                                     // 758
    var p = defaultValues.findOne({_id: testId});                                                                      // 759
    test.equal(p.bool1, false);                                                                                        // 760
                                                                                                                       // 761
    // Ensure that default values do not mess with inserts and updates of the field                                    // 762
    defaultValues.insert({bool1: true}, function(err, testId) {                                                        // 763
      var p = defaultValues.findOne({_id: testId});                                                                    // 764
      test.equal(p.bool1, true);                                                                                       // 765
      defaultValues.update({_id: testId}, {$set: {bool1: true}}, function(err, res) {                                  // 766
        p = defaultValues.findOne({_id: testId});                                                                      // 767
        test.equal(p.bool1, true);                                                                                     // 768
        next();                                                                                                        // 769
      });                                                                                                              // 770
    });                                                                                                                // 771
  });                                                                                                                  // 772
});                                                                                                                    // 773
                                                                                                                       // 774
Tinytest.addAsync('Collection2 - Upsert', function(test, next) {                                                       // 775
  //test validation without actual updating                                                                            // 776
                                                                                                                       // 777
  //invalid                                                                                                            // 778
  books.simpleSchema().namedContext().validate({$set: {title: "Ulysses", author: "James Joyce"}}, {modifier: true, upsert: true});
  var invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                                 // 780
  test.equal(invalidKeys.length, 1, 'We should get one invalidKeys back because copies is missing');                   // 781
                                                                                                                       // 782
  books.simpleSchema().namedContext().validateOne({$set: {title: "Ulysses", author: "James Joyce"}}, "copies", {modifier: true, upsert: true});
  invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                                     // 784
  test.equal(invalidKeys.length, 1, 'We should get one invalidKeys back because copies is missing');                   // 785
                                                                                                                       // 786
  //valid                                                                                                              // 787
  books.simpleSchema().namedContext().validate({$set: {title: "Ulysses", author: "James Joyce", copies: 1}}, {modifier: true, upsert: true});
  invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                                     // 789
  test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back');                                              // 790
                                                                                                                       // 791
  books.simpleSchema().namedContext().validateOne({$set: {title: "Ulysses", author: "James Joyce"}}, "author", {modifier: true, upsert: true});
  invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                                     // 793
  test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back');                                              // 794
                                                                                                                       // 795
  //test update calls                                                                                                  // 796
  books.upsert({title: "Ulysses", author: "James Joyce"}, {$set: {copies: 1}}, function(error, result) {               // 797
                                                                                                                       // 798
    //upserts are server only when this package is used                                                                // 799
    if (Meteor.isServer) {                                                                                             // 800
      test.isFalse(!!error, 'We expected the upsert not to trigger an error since the selector values should be used');
      test.equal(result.numberAffected, 1, 'Upsert should update one record');                                         // 802
                                                                                                                       // 803
      invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                                 // 804
      test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back');                                          // 805
    } else {                                                                                                           // 806
      test.isTrue(!!error, 'We expected the upsert to trigger an error because upserts are not allowed from the client');
    }                                                                                                                  // 808
                                                                                                                       // 809
    books.update({title: "Ulysses", author: "James Joyce"}, {$set: {copies: 1}}, {upsert: true}, function(error, result) {
                                                                                                                       // 811
      //upserts are server only when this package is used                                                              // 812
      if (Meteor.isServer) {                                                                                           // 813
        test.isFalse(!!error, 'We expected the update/upsert not to trigger an error since the selector values should be used');
        test.equal(result, 1, 'Update/upsert should update one record');                                               // 815
                                                                                                                       // 816
        invalidKeys = books.simpleSchema().namedContext().invalidKeys();                                               // 817
        test.equal(invalidKeys.length, 0, 'We should get no invalidKeys back');                                        // 818
      } else {                                                                                                         // 819
        test.isTrue(!!error, 'We expected the upsert to trigger an error because upserts are not allowed from the client');
      }                                                                                                                // 821
                                                                                                                       // 822
      next();                                                                                                          // 823
    });                                                                                                                // 824
  });                                                                                                                  // 825
});                                                                                                                    // 826
                                                                                                                       // 827
// Ensure that there are no errors when using a schemaless collection                                                  // 828
Tinytest.addAsync("Collection2 - No Schema", function(test, next) {                                                    // 829
  noSchemaCollection.insert({a: 1, b: 2}, function(error, newId) {                                                     // 830
    test.isFalse(!!error, 'There should be no error since there is no schema');                                        // 831
    test.isTrue(!!newId, 'result should be the inserted ID');                                                          // 832
                                                                                                                       // 833
    var doc = noSchemaCollection.findOne({_id: newId});                                                                // 834
    test.instanceOf(doc, Object);                                                                                      // 835
    test.equal(doc.userFoo, "userBar", "User-supplied transforms are lost");                                           // 836
                                                                                                                       // 837
    noSchemaCollection.update({_id: newId}, {$set: {a: 3, b: 4}}, function(error, result) {                            // 838
      test.isFalse(!!error, 'There should be no error since there is no schema');                                      // 839
      //result is undefined for some reason, but it's happening for apps without                                       // 840
      //C2 as well, so must be a Meteor bug                                                                            // 841
      //test.isTrue(typeof result === "number", 'result should be the number of records updated');                     // 842
      next();                                                                                                          // 843
    });                                                                                                                // 844
  });                                                                                                                  // 845
});                                                                                                                    // 846
                                                                                                                       // 847
// By default, empty strings are removed, but we can override                                                          // 848
var RES = new Meteor.Collection("RES");                                                                                // 849
RES.attachSchema(new SimpleSchema({                                                                                    // 850
  foo: { type: String },                                                                                               // 851
  bar: { type: String, optional: true }                                                                                // 852
}));                                                                                                                   // 853
pub(RES);                                                                                                              // 854
RES.allow({                                                                                                            // 855
  insert: function (userId, doc) {                                                                                     // 856
    return true;                                                                                                       // 857
  },                                                                                                                   // 858
  update: function (userId, doc) {                                                                                     // 859
    return true;                                                                                                       // 860
  }                                                                                                                    // 861
});                                                                                                                    // 862
                                                                                                                       // 863
Tinytest.addAsync("Collection2 - removeEmptyStrings", function(test, next) {                                           // 864
  // Remove empty strings (default)                                                                                    // 865
  RES.insert({foo: "foo", bar: ""}, function(error, newId1) {                                                          // 866
    test.isFalse(!!error, 'There should be no error');                                                                 // 867
    test.isTrue(!!newId1, 'result should be the inserted ID');                                                         // 868
                                                                                                                       // 869
    var doc = RES.findOne({_id: newId1});                                                                              // 870
    test.instanceOf(doc, Object);                                                                                      // 871
    test.isUndefined(doc.bar);                                                                                         // 872
                                                                                                                       // 873
    // Don't remove empty strings                                                                                      // 874
    RES.insert({foo: "foo", bar: ""}, {removeEmptyStrings: false}, function(error, newId2) {                           // 875
      test.isFalse(!!error, 'There should be no error');                                                               // 876
      test.isTrue(!!newId2, 'result should be the inserted ID');                                                       // 877
                                                                                                                       // 878
      var doc = RES.findOne({_id: newId2});                                                                            // 879
      test.instanceOf(doc, Object);                                                                                    // 880
      test.equal(doc.bar, "");                                                                                         // 881
                                                                                                                       // 882
      // Don't remove empty strings for an update either                                                               // 883
      RES.update({_id: newId1}, {$set: {bar: ""}}, {removeEmptyStrings: false}, function(error, result) {              // 884
        test.isFalse(!!error, 'There should be no error');                                                             // 885
        test.equal(result, 1, 'should have updated 1 record');                                                         // 886
                                                                                                                       // 887
        var doc = RES.findOne({_id: newId1});                                                                          // 888
        test.instanceOf(doc, Object);                                                                                  // 889
        test.equal(doc.bar, "");                                                                                       // 890
        next();                                                                                                        // 891
      });                                                                                                              // 892
    });                                                                                                                // 893
  });                                                                                                                  // 894
});                                                                                                                    // 895
                                                                                                                       // 896
Tinytest.addAsync('Collection2 - Validate False', function(test, next) {                                               // 897
  var title;                                                                                                           // 898
  if (Meteor.isClient) {                                                                                               // 899
    title = "Validate False Client";                                                                                   // 900
  } else {                                                                                                             // 901
    title = "Validate False Server";                                                                                   // 902
  }                                                                                                                    // 903
                                                                                                                       // 904
  books.insert({title: title, author: "James Joyce"}, {validate: false, validationContext: "validateFalse"}, function(error, result) {
    var invalidKeys = books.simpleSchema().namedContext("validateFalse").invalidKeys();                                // 906
                                                                                                                       // 907
    if (Meteor.isClient) {                                                                                             // 908
      // When validate: false on the client, we should still get a validation error and invalidKeys back from the server
      test.isTrue(!!error, 'We expected the insert to trigger an error since field "copies" are required');            // 910
      test.isFalse(!!result, 'result should be falsy because "copies" is required');                                   // 911
      test.equal(invalidKeys.length, 1, 'There should be 1 invalidKey since validation happened on the server and errors were sent back');
                                                                                                                       // 913
      var insertedBook = books.findOne({title: title});                                                                // 914
      test.isFalse(!!insertedBook, 'Book should not have been inserted because validation failed on server');          // 915
    } else {                                                                                                           // 916
      // When validate: false on the server, validation should be skipped                                              // 917
      test.isFalse(!!error, 'We expected no error because we skipped validation');                                     // 918
      test.isTrue(!!result, 'result should be set because we skipped validation');                                     // 919
      test.equal(invalidKeys.length, 0, 'There should be no invalidKeys');                                             // 920
                                                                                                                       // 921
      var insertedBook = books.findOne({title: title});                                                                // 922
      test.isTrue(!!insertedBook, 'Book should have been inserted because we skipped validation on server');           // 923
    }                                                                                                                  // 924
                                                                                                                       // 925
    // do a good one to set up update test                                                                             // 926
    books.insert({title: title + " 2", author: "James Joyce", copies: 1}, {validate: false, validationContext: "validateFalse2"}, function(error, newId) {
      var invalidKeys = books.simpleSchema().namedContext("validateFalse2").invalidKeys();                             // 928
                                                                                                                       // 929
      test.isFalse(!!error, "We expected no error because it's valid");                                                // 930
      test.isTrue(!!newId, "result should be set because it's valid");                                                 // 931
      test.equal(invalidKeys.length, 0, 'There should be no invalidKeys');                                             // 932
                                                                                                                       // 933
      var insertedBook = books.findOne({title: title + " 2"});                                                         // 934
      test.isTrue(!!insertedBook, 'Book should have been inserted because it was valid');                              // 935
                                                                                                                       // 936
      books.update({_id: newId}, {$set: {copies: "Yes Please"}}, {validate: false, validationContext: "validateFalse3"}, function(error, result) {
        var invalidKeys = books.simpleSchema().namedContext("validateFalse3").invalidKeys();                           // 938
                                                                                                                       // 939
        if (Meteor.isClient) {                                                                                         // 940
          // When validate: false on the client, we should still get a validation error and invalidKeys from the server
          test.isTrue(!!error, 'We expected the insert to trigger an error since field "copies" are required');        // 942
          test.isFalse(!!result, 'result should be falsy because "copies" is required');                               // 943
          test.equal(invalidKeys.length, 1, 'There should be 1 invalidKey since validation happened on the server and invalidKeys were sent back');
                                                                                                                       // 945
          var updatedBook = books.findOne({_id: newId});                                                               // 946
          test.isTrue(!!updatedBook, 'Book should still be there');                                                    // 947
          test.equal(updatedBook.copies, 1, 'copies should still be 1 because our new value failed validation on the server');
        } else {                                                                                                       // 949
          // When validate: false on the server, validation should be skipped                                          // 950
          test.isFalse(!!error, 'We expected no error because we skipped validation');                                 // 951
          test.isTrue(!!result, 'result should be set because we skipped validation');                                 // 952
          test.equal(invalidKeys.length, 0, 'There should be no invalidKeys');                                         // 953
                                                                                                                       // 954
          var updatedBook = books.findOne({_id: newId});                                                               // 955
          test.isTrue(!!updatedBook, 'Book should still be there');                                                    // 956
          test.equal(updatedBook.copies, "Yes Please", 'copies should be changed despite being invalid because we skipped validation on the server');
        }                                                                                                              // 958
                                                                                                                       // 959
        // now try a good one                                                                                          // 960
        books.update({_id: newId}, {$set: {copies: 3}}, {validate: false, validationContext: "validateFalse4"}, function(error, result) {
          var invalidKeys = books.simpleSchema().namedContext("validateFalse4").invalidKeys();                         // 962
          test.isFalse(!!error, "We expected no error because it's valid");                                            // 963
          //result is undefined for some reason, but it's happening for apps without                                   // 964
          //C2 as well, so must be a Meteor bug                                                                        // 965
          //test.isTrue(!!result, "result should be set because it's valid");                                          // 966
          test.equal(invalidKeys.length, 0, 'There should be no invalidKeys');                                         // 967
                                                                                                                       // 968
          var updatedBook = books.findOne({_id: newId});                                                               // 969
          test.isTrue(!!updatedBook, 'Book should still be there');                                                    // 970
          test.equal(updatedBook.copies, 3, 'copies should be changed because we used a valid value');                 // 971
                                                                                                                       // 972
          next();                                                                                                      // 973
        });                                                                                                            // 974
      });                                                                                                              // 975
    });                                                                                                                // 976
  });                                                                                                                  // 977
});                                                                                                                    // 978
                                                                                                                       // 979
// Test denyAll                                                                                                        // 980
if (Meteor.isClient) {                                                                                                 // 981
  Tinytest.addAsync('Collection2 - Insert Deny Failure', function(test, next) {                                        // 982
    Meteor.call("denyAll", function() {                                                                                // 983
      books.insert({title: "Ulysses", author: "James Joyce", copies: 1}, function(error, result) {                     // 984
        test.isTrue(!!error, 'We expected this to fail since access has to be set explicitly');                        // 985
                                                                                                                       // 986
        test.isFalse(result, 'result should be false');                                                                // 987
                                                                                                                       // 988
        test.equal((error || {}).error, 403, 'We should get Access denied');                                           // 989
                                                                                                                       // 990
        // Clear denyAll settings so that tests work correctly if client                                               // 991
        // page is reloaded                                                                                            // 992
        Meteor.call("allowAll", function() {                                                                           // 993
          next();                                                                                                      // 994
        });                                                                                                            // 995
      });                                                                                                              // 996
    });                                                                                                                // 997
  });                                                                                                                  // 998
}                                                                                                                      // 999
                                                                                                                       // 1000
//Test API:                                                                                                            // 1001
//test.isFalse(v, msg)                                                                                                 // 1002
//test.isTrue(v, msg)                                                                                                  // 1003
//test.equal(actual, expected, message, not)                                                                           // 1004
//test.length(obj, len)                                                                                                // 1005
//test.include(s, v)                                                                                                   // 1006
//test.isNaN(v, msg)                                                                                                   // 1007
//test.isUndefined(v, msg)                                                                                             // 1008
//test.isNotNull                                                                                                       // 1009
//test.isNull                                                                                                          // 1010
//test.throws(func)                                                                                                    // 1011
//test.instanceOf(obj, klass)                                                                                          // 1012
//test.notEqual(actual, expected, message)                                                                             // 1013
//test.runId()                                                                                                         // 1014
//test.exception(exception)                                                                                            // 1015
//test.expect_fail()                                                                                                   // 1016
//test.ok(doc)                                                                                                         // 1017
//test.fail(doc)                                                                                                       // 1018
//test.equal(a, b, msg)                                                                                                // 1019
                                                                                                                       // 1020
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
