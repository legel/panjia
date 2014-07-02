(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/autoform/tests/utility-tests.js                                                          //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
if (Meteor.isClient) {                                                                               // 1
                                                                                                     // 2
  Tinytest.add('AutoForm - Utility - cleanNulls', function(test) {                                   // 3
    var cleaned = Utility.cleanNulls({                                                               // 4
      a: void 0,                                                                                     // 5
      b: undefined,                                                                                  // 6
      c: null,                                                                                       // 7
      d: "",                                                                                         // 8
      e: "keep me",                                                                                  // 9
      f: {                                                                                           // 10
        a: void 0,                                                                                   // 11
        b: undefined,                                                                                // 12
        c: null,                                                                                     // 13
        d: "",                                                                                       // 14
        e: "keep me"                                                                                 // 15
      },                                                                                             // 16
      g: {                                                                                           // 17
        a: null                                                                                      // 18
      }                                                                                              // 19
    });                                                                                              // 20
    test.equal(cleaned, {e: "keep me", f: {e: "keep me"}});                                          // 21
  });                                                                                                // 22
                                                                                                     // 23
  Tinytest.add('AutoForm - Utility - reportNulls', function(test) {                                  // 24
    var report = Utility.reportNulls({                                                               // 25
      a: void 0,                                                                                     // 26
      b: undefined,                                                                                  // 27
      c: null,                                                                                       // 28
      d: "",                                                                                         // 29
      e: "keep me"                                                                                   // 30
    });                                                                                              // 31
    test.equal(report, {                                                                             // 32
      a: "",                                                                                         // 33
      b: "",                                                                                         // 34
      c: "",                                                                                         // 35
      d: ""                                                                                          // 36
    });                                                                                              // 37
  });                                                                                                // 38
                                                                                                     // 39
  Tinytest.add('AutoForm - Utility - docToModifier', function(test) {                                // 40
    var date = new Date;                                                                             // 41
    var mod = Utility.docToModifier({                                                                // 42
      a: 1,                                                                                          // 43
      b: "foo",                                                                                      // 44
      c: date,                                                                                       // 45
      d: {                                                                                           // 46
        a: 1,                                                                                        // 47
        b: "foo",                                                                                    // 48
        c: date,                                                                                     // 49
        d: [                                                                                         // 50
          {                                                                                          // 51
            a: 1,                                                                                    // 52
            b: "foo",                                                                                // 53
            c: date,                                                                                 // 54
            d: {                                                                                     // 55
              a: 1,                                                                                  // 56
              b: "foo",                                                                              // 57
              c: date,                                                                               // 58
              d: null // make sure that null, empty, etc. don't end up in $unset when under an array // 59
            }                                                                                        // 60
          }                                                                                          // 61
        ],                                                                                           // 62
        e: [1, 2]                                                                                    // 63
      },                                                                                             // 64
      e: null,                                                                                       // 65
      f: "",                                                                                         // 66
      g: void 0 //undefined props are removed                                                        // 67
    });                                                                                              // 68
    test.equal(mod, {                                                                                // 69
      $set: {                                                                                        // 70
        a: 1,                                                                                        // 71
        b: "foo",                                                                                    // 72
        c: date,                                                                                     // 73
        'd.a': 1,                                                                                    // 74
        'd.b': "foo",                                                                                // 75
        'd.c': date,                                                                                 // 76
        'd.d': [ //array of objects should remain array                                              // 77
          {                                                                                          // 78
            a: 1,                                                                                    // 79
            b: "foo",                                                                                // 80
            c: date,                                                                                 // 81
            d: {                                                                                     // 82
              a: 1,                                                                                  // 83
              b: "foo",                                                                              // 84
              c: date                                                                                // 85
              // null should have been removed, too                                                  // 86
            }                                                                                        // 87
          }                                                                                          // 88
        ],                                                                                           // 89
        'd.e': [1, 2] //array of non-objects should remain array                                     // 90
      },                                                                                             // 91
      $unset: {                                                                                      // 92
        e: "",                                                                                       // 93
        f: ""                                                                                        // 94
      }                                                                                              // 95
    });                                                                                              // 96
  });                                                                                                // 97
                                                                                                     // 98
  Tinytest.add('AutoForm - Utility - maybeNum', function(test) {                                     // 99
    function testMaybeNum(val, expect) {                                                             // 100
      var mod = Utility.maybeNum(val);                                                               // 101
      test.equal(mod, expect);                                                                       // 102
    }                                                                                                // 103
                                                                                                     // 104
    testMaybeNum(1, 1);                                                                              // 105
    testMaybeNum(1.1, 1.1);                                                                          // 106
    testMaybeNum("1", 1);                                                                            // 107
    testMaybeNum("1.1", 1.1);                                                                        // 108
    testMaybeNum("foo", "foo");                                                                      // 109
    var d = new Date;                                                                                // 110
    testMaybeNum(d, d);                                                                              // 111
    testMaybeNum(true, true);                                                                        // 112
    testMaybeNum(false, false);                                                                      // 113
    testMaybeNum({}, {});                                                                            // 114
  });                                                                                                // 115
                                                                                                     // 116
  Tinytest.add('AutoForm - Utility - expandObj', function(test) {                                    // 117
    function testExpandObj(val, expect) {                                                            // 118
      var mod = Utility.expandObj(val);                                                              // 119
      test.equal(JSON.stringify(mod), JSON.stringify(expect));                                       // 120
    }                                                                                                // 121
                                                                                                     // 122
    testExpandObj({}, {});                                                                           // 123
    testExpandObj({foo: "bar"}, {foo: "bar"});                                                       // 124
    testExpandObj({foo: "bar", baz: 1}, {foo: "bar", baz: 1});                                       // 125
    testExpandObj({                                                                                  // 126
      'foo.bar': "baz",                                                                              // 127
      baz: 1                                                                                         // 128
    }, {                                                                                             // 129
      foo: {bar: "baz"},                                                                             // 130
      baz: 1                                                                                         // 131
    });                                                                                              // 132
    testExpandObj({                                                                                  // 133
      'foo.bar.0': "foo",                                                                            // 134
      'foo.bar.1': "baz",                                                                            // 135
      baz: 1                                                                                         // 136
    }, {                                                                                             // 137
      foo: {bar: ["foo", "baz"]},                                                                    // 138
      baz: 1                                                                                         // 139
    });                                                                                              // 140
    testExpandObj({                                                                                  // 141
      'foo.bar.1': "baz",                                                                            // 142
      baz: 1                                                                                         // 143
    }, {                                                                                             // 144
      foo: {bar: [null, "baz"]},                                                                     // 145
      baz: 1                                                                                         // 146
    });                                                                                              // 147
    testExpandObj({                                                                                  // 148
      'foo.bar.1.bam': "baz",                                                                        // 149
      baz: 1                                                                                         // 150
    }, {                                                                                             // 151
      foo: {bar: [null, {bam: "baz"}]},                                                              // 152
      baz: 1                                                                                         // 153
    });                                                                                              // 154
    testExpandObj({                                                                                  // 155
      'foo.bar.0': null,                                                                             // 156
      'foo.bar.1.bam': "baz",                                                                        // 157
      baz: 1                                                                                         // 158
    }, {                                                                                             // 159
      foo: {bar: [null, {bam: "baz"}]},                                                              // 160
      baz: 1                                                                                         // 161
    });                                                                                              // 162
    testExpandObj({                                                                                  // 163
      'foo.bar.0': "baz",                                                                            // 164
      'foo.bar.1.bam': "baz",                                                                        // 165
      baz: 1                                                                                         // 166
    }, {                                                                                             // 167
      foo: {bar: ["baz", {bam: "baz"}]},                                                             // 168
      baz: 1                                                                                         // 169
    });                                                                                              // 170
    testExpandObj({                                                                                  // 171
      'foo.bar.0': "baz",                                                                            // 172
      'foo.bar.1.bam': "baz",                                                                        // 173
      'foo.bar.1.boo': "foo",                                                                        // 174
      baz: 1                                                                                         // 175
    }, {                                                                                             // 176
      foo: {bar: ["baz", {bam: "baz", boo: "foo"}]},                                                 // 177
      baz: 1                                                                                         // 178
    });                                                                                              // 179
    testExpandObj({                                                                                  // 180
      'foo.0': null,                                                                                 // 181
      'foo.1.bar': "baz",                                                                            // 182
      baz: 1                                                                                         // 183
    }, {                                                                                             // 184
      foo: [null, {bar: "baz"}],                                                                     // 185
      baz: 1                                                                                         // 186
    });                                                                                              // 187
    testExpandObj({                                                                                  // 188
      'foo.0': null,                                                                                 // 189
      'foo.1.bar': null,                                                                             // 190
      baz: 1                                                                                         // 191
    }, {                                                                                             // 192
      foo: [null, {bar: null}],                                                                      // 193
      baz: 1                                                                                         // 194
    });                                                                                              // 195
  });                                                                                                // 196
                                                                                                     // 197
}                                                                                                    // 198
                                                                                                     // 199
//Test API:                                                                                          // 200
//test.isFalse(v, msg)                                                                               // 201
//test.isTrue(v, msg)                                                                                // 202
//test.equalactual, expected, message, not                                                           // 203
//test.length(obj, len)                                                                              // 204
//test.include(s, v)                                                                                 // 205
//test.isNaN(v, msg)                                                                                 // 206
//test.isUndefined(v, msg)                                                                           // 207
//test.isNotNull                                                                                     // 208
//test.isNull                                                                                        // 209
//test.throws(func)                                                                                  // 210
//test.instanceOf(obj, klass)                                                                        // 211
//test.notEqual(actual, expected, message)                                                           // 212
//test.runId()                                                                                       // 213
//test.exception(exception)                                                                          // 214
//test.expect_fail()                                                                                 // 215
//test.ok(doc)                                                                                       // 216
//test.fail(doc)                                                                                     // 217
//test.equal(a, b, msg)                                                                              // 218
                                                                                                     // 219
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/autoform/tests/autoform-tests.js                                                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
if (Meteor.isClient) {                                                                               // 1
                                                                                                     // 2
                                                                                                     // 3
                                                                                                     // 4
}                                                                                                    // 5
                                                                                                     // 6
//Test API:                                                                                          // 7
//test.isFalse(v, msg)                                                                               // 8
//test.isTrue(v, msg)                                                                                // 9
//test.equalactual, expected, message, not                                                           // 10
//test.length(obj, len)                                                                              // 11
//test.include(s, v)                                                                                 // 12
//test.isNaN(v, msg)                                                                                 // 13
//test.isUndefined(v, msg)                                                                           // 14
//test.isNotNull                                                                                     // 15
//test.isNull                                                                                        // 16
//test.throws(func)                                                                                  // 17
//test.instanceOf(obj, klass)                                                                        // 18
//test.notEqual(actual, expected, message)                                                           // 19
//test.runId()                                                                                       // 20
//test.exception(exception)                                                                          // 21
//test.expect_fail()                                                                                 // 22
//test.ok(doc)                                                                                       // 23
//test.fail(doc)                                                                                     // 24
//test.equal(a, b, msg)                                                                              // 25
                                                                                                     // 26
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
