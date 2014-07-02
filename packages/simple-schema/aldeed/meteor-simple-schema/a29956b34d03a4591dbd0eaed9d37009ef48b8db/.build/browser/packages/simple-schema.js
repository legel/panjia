(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/simple-schema/string.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*                                                                                                                    // 1
string.js - Copyright (C) 2012-2013, JP Richardson <jprichardson@gmail.com>                                           // 2
*/                                                                                                                    // 3
                                                                                                                      // 4
!(function() {                                                                                                        // 5
  "use strict";                                                                                                       // 6
                                                                                                                      // 7
  var VERSION = '1.5.0';                                                                                              // 8
                                                                                                                      // 9
  var ENTITIES = {};                                                                                                  // 10
                                                                                                                      // 11
  function S(s) {                                                                                                     // 12
    if (s !== null && s !== undefined) {                                                                              // 13
      if (typeof s === 'string')                                                                                      // 14
        this.s = s;                                                                                                   // 15
      else                                                                                                            // 16
        this.s = s.toString();                                                                                        // 17
    } else {                                                                                                          // 18
      this.s = s; //null or undefined                                                                                 // 19
    }                                                                                                                 // 20
                                                                                                                      // 21
    this.orig = s; //original object, currently only used by toCSV() and toBoolean()                                  // 22
                                                                                                                      // 23
    if (s !== null && s !== undefined) {                                                                              // 24
      if (this.__defineGetter__) {                                                                                    // 25
        this.__defineGetter__('length', function() {                                                                  // 26
          return this.s.length;                                                                                       // 27
        })                                                                                                            // 28
      } else {                                                                                                        // 29
        this.length = s.length;                                                                                       // 30
      }                                                                                                               // 31
    } else {                                                                                                          // 32
      this.length = -1;                                                                                               // 33
    }                                                                                                                 // 34
  }                                                                                                                   // 35
                                                                                                                      // 36
  var __nsp = String.prototype;                                                                                       // 37
  var __sp = S.prototype = {                                                                                          // 38
                                                                                                                      // 39
    between: function(left, right) {                                                                                  // 40
      var s = this.s;                                                                                                 // 41
      var startPos = s.indexOf(left);                                                                                 // 42
      var endPos = s.indexOf(right);                                                                                  // 43
      var start = startPos + left.length;                                                                             // 44
      return new S(endPos > startPos ?  s.slice(start, endPos) : "");                                                 // 45
    },                                                                                                                // 46
                                                                                                                      // 47
    //# modified slightly from https://github.com/epeli/underscore.string                                             // 48
    camelize: function() {                                                                                            // 49
      var s = this.trim().s.replace(/(\-|_|\s)+(.)?/g, function(mathc, sep, c) {                                      // 50
        return (c ? c.toUpperCase() : '');                                                                            // 51
      });                                                                                                             // 52
      return new S(s);                                                                                                // 53
    },                                                                                                                // 54
                                                                                                                      // 55
    capitalize: function() {                                                                                          // 56
      return new S(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());                            // 57
    },                                                                                                                // 58
                                                                                                                      // 59
    charAt: function(index) {                                                                                         // 60
      return this.s.charAt(index);                                                                                    // 61
    },                                                                                                                // 62
                                                                                                                      // 63
    chompLeft: function(prefix) {                                                                                     // 64
      var s = this.s;                                                                                                 // 65
      if (s.indexOf(prefix) === 0) {                                                                                  // 66
         s = s.slice(prefix.length);                                                                                  // 67
         return new S(s);                                                                                             // 68
      } else {                                                                                                        // 69
        return this;                                                                                                  // 70
      }                                                                                                               // 71
    },                                                                                                                // 72
                                                                                                                      // 73
    chompRight: function(suffix) {                                                                                    // 74
      if (this.endsWith(suffix)) {                                                                                    // 75
        var s = this.s;                                                                                               // 76
        s = s.slice(0, s.length - suffix.length);                                                                     // 77
        return new S(s);                                                                                              // 78
      } else {                                                                                                        // 79
        return this;                                                                                                  // 80
      }                                                                                                               // 81
    },                                                                                                                // 82
                                                                                                                      // 83
    //#thanks Google                                                                                                  // 84
    collapseWhitespace: function() {                                                                                  // 85
      var s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');                                            // 86
      return new S(s);                                                                                                // 87
    },                                                                                                                // 88
                                                                                                                      // 89
    contains: function(ss) {                                                                                          // 90
      return this.s.indexOf(ss) >= 0;                                                                                 // 91
    },                                                                                                                // 92
                                                                                                                      // 93
    count: function(ss) {                                                                                             // 94
      var count = 0                                                                                                   // 95
        , pos = this.s.indexOf(ss)                                                                                    // 96
                                                                                                                      // 97
      while (pos >= 0) {                                                                                              // 98
        count += 1                                                                                                    // 99
        pos = this.s.indexOf(ss, pos + 1)                                                                             // 100
      }                                                                                                               // 101
                                                                                                                      // 102
      return count                                                                                                    // 103
    },                                                                                                                // 104
                                                                                                                      // 105
    //#modified from https://github.com/epeli/underscore.string                                                       // 106
    dasherize: function() {                                                                                           // 107
      var s = this.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();     // 108
      return new S(s);                                                                                                // 109
    },                                                                                                                // 110
                                                                                                                      // 111
    decodeHtmlEntities: function() { //https://github.com/substack/node-ent/blob/master/index.js                      // 112
      var s = this.s;                                                                                                 // 113
      s = s.replace(/&#(\d+);?/g, function (_, code) {                                                                // 114
        return String.fromCharCode(code);                                                                             // 115
      })                                                                                                              // 116
      .replace(/&#[xX]([A-Fa-f0-9]+);?/g, function (_, hex) {                                                         // 117
        return String.fromCharCode(parseInt(hex, 16));                                                                // 118
      })                                                                                                              // 119
      .replace(/&([^;\W]+;?)/g, function (m, e) {                                                                     // 120
        var ee = e.replace(/;$/, '');                                                                                 // 121
        var target = ENTITIES[e] || (e.match(/;$/) && ENTITIES[ee]);                                                  // 122
                                                                                                                      // 123
        if (typeof target === 'number') {                                                                             // 124
          return String.fromCharCode(target);                                                                         // 125
        }                                                                                                             // 126
        else if (typeof target === 'string') {                                                                        // 127
          return target;                                                                                              // 128
        }                                                                                                             // 129
        else {                                                                                                        // 130
          return m;                                                                                                   // 131
        }                                                                                                             // 132
      })                                                                                                              // 133
                                                                                                                      // 134
      return new S(s);                                                                                                // 135
    },                                                                                                                // 136
                                                                                                                      // 137
    endsWith: function(suffix) {                                                                                      // 138
      var l  = this.s.length - suffix.length;                                                                         // 139
      return l >= 0 && this.s.indexOf(suffix, l) === l;                                                               // 140
    },                                                                                                                // 141
                                                                                                                      // 142
    escapeHTML: function() { //from underscore.string                                                                 // 143
      return new S(this.s.replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; }));            // 144
    },                                                                                                                // 145
                                                                                                                      // 146
    ensureLeft: function(prefix) {                                                                                    // 147
      var s = this.s;                                                                                                 // 148
      if (s.indexOf(prefix) === 0) {                                                                                  // 149
        return this;                                                                                                  // 150
      } else {                                                                                                        // 151
        return new S(prefix + s);                                                                                     // 152
      }                                                                                                               // 153
    },                                                                                                                // 154
                                                                                                                      // 155
    ensureRight: function(suffix) {                                                                                   // 156
      var s = this.s;                                                                                                 // 157
      if (this.endsWith(suffix))  {                                                                                   // 158
        return this;                                                                                                  // 159
      } else {                                                                                                        // 160
        return new S(s + suffix);                                                                                     // 161
      }                                                                                                               // 162
    },                                                                                                                // 163
                                                                                                                      // 164
    humanize: function() { //modified from underscore.string                                                          // 165
      if (this.s === null || this.s === undefined)                                                                    // 166
        return new S('')                                                                                              // 167
      var s = this.underscore().replace(/_id$/,'').replace(/_/g, ' ').trim().capitalize()                             // 168
      return new S(s)                                                                                                 // 169
    },                                                                                                                // 170
                                                                                                                      // 171
    isAlpha: function() {                                                                                             // 172
      return !/[^a-z\xC0-\xFF]/.test(this.s.toLowerCase());                                                           // 173
    },                                                                                                                // 174
                                                                                                                      // 175
    isAlphaNumeric: function() {                                                                                      // 176
      return !/[^0-9a-z\xC0-\xFF]/.test(this.s.toLowerCase());                                                        // 177
    },                                                                                                                // 178
                                                                                                                      // 179
    isEmpty: function() {                                                                                             // 180
      return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);                             // 181
    },                                                                                                                // 182
                                                                                                                      // 183
    isLower: function() {                                                                                             // 184
      return this.isAlpha() && this.s.toLowerCase() === this.s;                                                       // 185
    },                                                                                                                // 186
                                                                                                                      // 187
    isNumeric: function() {                                                                                           // 188
      return !/[^0-9]/.test(this.s);                                                                                  // 189
    },                                                                                                                // 190
                                                                                                                      // 191
    isUpper: function() {                                                                                             // 192
      return this.isAlpha() && this.s.toUpperCase() === this.s;                                                       // 193
    },                                                                                                                // 194
                                                                                                                      // 195
    left: function(N) {                                                                                               // 196
      if (N >= 0) {                                                                                                   // 197
        var s = this.s.substr(0, N);                                                                                  // 198
        return new S(s);                                                                                              // 199
      } else {                                                                                                        // 200
        return this.right(-N);                                                                                        // 201
      }                                                                                                               // 202
    },                                                                                                                // 203
                                                                                                                      // 204
    lines: function() { //convert windows newlines to unix newlines then convert to an Array of lines                 // 205
      return this.replaceAll('\r\n', '\n').s.split('\n');                                                             // 206
    },                                                                                                                // 207
                                                                                                                      // 208
    pad: function(len, ch) { //https://github.com/component/pad                                                       // 209
      ch = ch || ' ';                                                                                                 // 210
      if (this.s.length >= len) return new S(this.s);                                                                 // 211
      len = len - this.s.length;                                                                                      // 212
      var left = Array(Math.ceil(len / 2) + 1).join(ch);                                                              // 213
      var right = Array(Math.floor(len / 2) + 1).join(ch);                                                            // 214
      return new S(left + this.s + right);                                                                            // 215
    },                                                                                                                // 216
                                                                                                                      // 217
    padLeft: function(len, ch) { //https://github.com/component/pad                                                   // 218
      ch = ch || ' ';                                                                                                 // 219
      if (this.s.length >= len) return new S(this.s);                                                                 // 220
      return new S(Array(len - this.s.length + 1).join(ch) + this.s);                                                 // 221
    },                                                                                                                // 222
                                                                                                                      // 223
    padRight: function(len, ch) { //https://github.com/component/pad                                                  // 224
      ch = ch || ' ';                                                                                                 // 225
      if (this.s.length >= len) return new S(this.s);                                                                 // 226
      return new S(this.s + Array(len - this.s.length + 1).join(ch));                                                 // 227
    },                                                                                                                // 228
                                                                                                                      // 229
    parseCSV: function(delimiter, qualifier, escape, lineDelimiter) { //try to parse no matter what                   // 230
      delimiter = delimiter || ',';                                                                                   // 231
      escape = escape || '\\'                                                                                         // 232
      if (typeof qualifier == 'undefined')                                                                            // 233
        qualifier = '"';                                                                                              // 234
                                                                                                                      // 235
      var i = 0, fieldBuffer = [], fields = [], len = this.s.length, inField = false, self = this;                    // 236
      var ca = function(i){return self.s.charAt(i)};                                                                  // 237
      if (typeof lineDelimiter !== 'undefined') var rows = [];                                                        // 238
                                                                                                                      // 239
      if (!qualifier)                                                                                                 // 240
        inField = true;                                                                                               // 241
                                                                                                                      // 242
      while (i < len) {                                                                                               // 243
        var current = ca(i);                                                                                          // 244
        switch (current) {                                                                                            // 245
          case escape:                                                                                                // 246
          //fix for issues #32 and #35                                                                                // 247
          if (inField && ((escape !== qualifier) || ca(i+1) === qualifier)) {                                         // 248
              i += 1;                                                                                                 // 249
              fieldBuffer.push(ca(i));                                                                                // 250
              break;                                                                                                  // 251
          }                                                                                                           // 252
          if (escape !== qualifier) break;                                                                            // 253
          case qualifier:                                                                                             // 254
            inField = !inField;                                                                                       // 255
            break;                                                                                                    // 256
          case delimiter:                                                                                             // 257
            if (inField && qualifier)                                                                                 // 258
              fieldBuffer.push(current);                                                                              // 259
            else {                                                                                                    // 260
              fields.push(fieldBuffer.join(''))                                                                       // 261
              fieldBuffer.length = 0;                                                                                 // 262
            }                                                                                                         // 263
            break;                                                                                                    // 264
          case lineDelimiter:                                                                                         // 265
            if (inField) {                                                                                            // 266
                fieldBuffer.push(current);                                                                            // 267
            } else {                                                                                                  // 268
                if (rows) {                                                                                           // 269
                    fields.push(fieldBuffer.join(''))                                                                 // 270
                    rows.push(fields);                                                                                // 271
                    fields = [];                                                                                      // 272
                    fieldBuffer.length = 0;                                                                           // 273
                }                                                                                                     // 274
            }                                                                                                         // 275
            break;                                                                                                    // 276
          default:                                                                                                    // 277
            if (inField)                                                                                              // 278
              fieldBuffer.push(current);                                                                              // 279
            break;                                                                                                    // 280
        }                                                                                                             // 281
        i += 1;                                                                                                       // 282
      }                                                                                                               // 283
                                                                                                                      // 284
      fields.push(fieldBuffer.join(''));                                                                              // 285
      if (rows) {                                                                                                     // 286
        rows.push(fields);                                                                                            // 287
        return rows;                                                                                                  // 288
      }                                                                                                               // 289
      return fields;                                                                                                  // 290
    },                                                                                                                // 291
                                                                                                                      // 292
    replaceAll: function(ss, r) {                                                                                     // 293
      //var s = this.s.replace(new RegExp(ss, 'g'), r);                                                               // 294
      var s = this.s.split(ss).join(r)                                                                                // 295
      return new S(s);                                                                                                // 296
    },                                                                                                                // 297
                                                                                                                      // 298
    right: function(N) {                                                                                              // 299
      if (N >= 0) {                                                                                                   // 300
        var s = this.s.substr(this.s.length - N, N);                                                                  // 301
        return new S(s);                                                                                              // 302
      } else {                                                                                                        // 303
        return this.left(-N);                                                                                         // 304
      }                                                                                                               // 305
    },                                                                                                                // 306
                                                                                                                      // 307
    slugify: function() {                                                                                             // 308
      var sl = (new S(this.s.replace(/[^\w\s-]/g, '').toLowerCase())).dasherize().s;                                  // 309
      if (sl.charAt(0) === '-')                                                                                       // 310
        sl = sl.substr(1);                                                                                            // 311
      return new S(sl);                                                                                               // 312
    },                                                                                                                // 313
                                                                                                                      // 314
    startsWith: function(prefix) {                                                                                    // 315
      return this.s.lastIndexOf(prefix, 0) === 0;                                                                     // 316
    },                                                                                                                // 317
                                                                                                                      // 318
    stripPunctuation: function() {                                                                                    // 319
      //return new S(this.s.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""));                                            // 320
      return new S(this.s.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));                                            // 321
    },                                                                                                                // 322
                                                                                                                      // 323
    stripTags: function() { //from sugar.js                                                                           // 324
      var s = this.s, args = arguments.length > 0 ? arguments : [''];                                                 // 325
      multiArgs(args, function(tag) {                                                                                 // 326
        s = s.replace(RegExp('<\/?' + tag + '[^<>]*>', 'gi'), '');                                                    // 327
      });                                                                                                             // 328
      return new S(s);                                                                                                // 329
    },                                                                                                                // 330
                                                                                                                      // 331
    template: function(values, opening, closing) {                                                                    // 332
      var s = this.s                                                                                                  // 333
      var opening = opening || Export.TMPL_OPEN                                                                       // 334
      var closing = closing || Export.TMPL_CLOSE                                                                      // 335
      var r = new RegExp(opening + '(.+?)' + closing, 'g')                                                            // 336
        //, r = /\{\{(.+?)\}\}/g                                                                                      // 337
      var matches = s.match(r) || [];                                                                                 // 338
                                                                                                                      // 339
      matches.forEach(function(match) {                                                                               // 340
        var key = match.substring(opening.length, match.length - closing.length);//chop {{ and }}                     // 341
        if (values[key])                                                                                              // 342
          s = s.replace(match, values[key]);                                                                          // 343
      });                                                                                                             // 344
      return new S(s);                                                                                                // 345
    },                                                                                                                // 346
                                                                                                                      // 347
    times: function(n) {                                                                                              // 348
      return new S(new Array(n + 1).join(this.s));                                                                    // 349
    },                                                                                                                // 350
                                                                                                                      // 351
    toBoolean: function() {                                                                                           // 352
      if (typeof this.orig === 'string') {                                                                            // 353
        var s = this.s.toLowerCase();                                                                                 // 354
        return s === 'true' || s === 'yes' || s === 'on';                                                             // 355
      } else                                                                                                          // 356
        return this.orig === true || this.orig === 1;                                                                 // 357
    },                                                                                                                // 358
                                                                                                                      // 359
    toFloat: function(precision) {                                                                                    // 360
      var num = parseFloat(this.s)                                                                                    // 361
      if (precision)                                                                                                  // 362
        return parseFloat(num.toFixed(precision))                                                                     // 363
      else                                                                                                            // 364
        return num                                                                                                    // 365
    },                                                                                                                // 366
                                                                                                                      // 367
    toInt: function() { //thanks Google                                                                               // 368
      // If the string starts with '0x' or '-0x', parse as hex.                                                       // 369
      return /^\s*-?0x/i.test(this.s) ? parseInt(this.s, 16) : parseInt(this.s, 10)                                   // 370
    },                                                                                                                // 371
                                                                                                                      // 372
    trim: function() {                                                                                                // 373
      var s;                                                                                                          // 374
      if (typeof __nsp.trim === 'undefined')                                                                          // 375
        s = this.s.replace(/(^\s*|\s*$)/g, '')                                                                        // 376
      else                                                                                                            // 377
        s = this.s.trim()                                                                                             // 378
      return new S(s);                                                                                                // 379
    },                                                                                                                // 380
                                                                                                                      // 381
    trimLeft: function() {                                                                                            // 382
      var s;                                                                                                          // 383
      if (__nsp.trimLeft)                                                                                             // 384
        s = this.s.trimLeft();                                                                                        // 385
      else                                                                                                            // 386
        s = this.s.replace(/(^\s*)/g, '');                                                                            // 387
      return new S(s);                                                                                                // 388
    },                                                                                                                // 389
                                                                                                                      // 390
    trimRight: function() {                                                                                           // 391
      var s;                                                                                                          // 392
      if (__nsp.trimRight)                                                                                            // 393
        s = this.s.trimRight();                                                                                       // 394
      else                                                                                                            // 395
        s = this.s.replace(/\s+$/, '');                                                                               // 396
      return new S(s);                                                                                                // 397
    },                                                                                                                // 398
                                                                                                                      // 399
    truncate: function(length, pruneStr) { //from underscore.string, author: github.com/rwz                           // 400
      var str = this.s;                                                                                               // 401
                                                                                                                      // 402
      length = ~~length;                                                                                              // 403
      pruneStr = pruneStr || '...';                                                                                   // 404
                                                                                                                      // 405
      if (str.length <= length) return new S(str);                                                                    // 406
                                                                                                                      // 407
      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },                              // 408
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'         // 409
                                                                                                                      // 410
      if (template.slice(template.length-2).match(/\w\w/))                                                            // 411
        template = template.replace(/\s*\S+$/, '');                                                                   // 412
      else                                                                                                            // 413
        template = new S(template.slice(0, template.length-1)).trimRight().s;                                         // 414
                                                                                                                      // 415
      return (template+pruneStr).length > str.length ? new S(str) : new S(str.slice(0, template.length)+pruneStr);    // 416
    },                                                                                                                // 417
                                                                                                                      // 418
    toCSV: function() {                                                                                               // 419
      var delim = ',', qualifier = '"', escape = '\\', encloseNumbers = true, keys = false;                           // 420
      var dataArray = [];                                                                                             // 421
                                                                                                                      // 422
      function hasVal(it) {                                                                                           // 423
        return it !== null && it !== '';                                                                              // 424
      }                                                                                                               // 425
                                                                                                                      // 426
      if (typeof arguments[0] === 'object') {                                                                         // 427
        delim = arguments[0].delimiter || delim;                                                                      // 428
        delim = arguments[0].separator || delim;                                                                      // 429
        qualifier = arguments[0].qualifier || qualifier;                                                              // 430
        encloseNumbers = !!arguments[0].encloseNumbers;                                                               // 431
        escape = arguments[0].escape || escape;                                                                       // 432
        keys = !!arguments[0].keys;                                                                                   // 433
      } else if (typeof arguments[0] === 'string') {                                                                  // 434
        delim = arguments[0];                                                                                         // 435
      }                                                                                                               // 436
                                                                                                                      // 437
      if (typeof arguments[1] === 'string')                                                                           // 438
        qualifier = arguments[1];                                                                                     // 439
                                                                                                                      // 440
      if (arguments[1] === null)                                                                                      // 441
        qualifier = null;                                                                                             // 442
                                                                                                                      // 443
       if (this.orig instanceof Array)                                                                                // 444
        dataArray  = this.orig;                                                                                       // 445
      else { //object                                                                                                 // 446
        for (var key in this.orig)                                                                                    // 447
          if (this.orig.hasOwnProperty(key))                                                                          // 448
            if (keys)                                                                                                 // 449
              dataArray.push(key);                                                                                    // 450
            else                                                                                                      // 451
              dataArray.push(this.orig[key]);                                                                         // 452
      }                                                                                                               // 453
                                                                                                                      // 454
      var rep = escape + qualifier;                                                                                   // 455
      var buildString = [];                                                                                           // 456
      for (var i = 0; i < dataArray.length; ++i) {                                                                    // 457
        var shouldQualify = hasVal(qualifier)                                                                         // 458
        if (typeof dataArray[i] == 'number')                                                                          // 459
          shouldQualify &= encloseNumbers;                                                                            // 460
                                                                                                                      // 461
        if (shouldQualify)                                                                                            // 462
          buildString.push(qualifier);                                                                                // 463
                                                                                                                      // 464
        if (dataArray[i] !== null && dataArray[i] !== undefined) {                                                    // 465
          var d = new S(dataArray[i]).replaceAll(qualifier, rep).s;                                                   // 466
          buildString.push(d);                                                                                        // 467
        } else                                                                                                        // 468
          buildString.push('')                                                                                        // 469
                                                                                                                      // 470
        if (shouldQualify)                                                                                            // 471
          buildString.push(qualifier);                                                                                // 472
                                                                                                                      // 473
        if (delim)                                                                                                    // 474
          buildString.push(delim);                                                                                    // 475
      }                                                                                                               // 476
                                                                                                                      // 477
      //chop last delim                                                                                               // 478
      //console.log(buildString.length)                                                                               // 479
      buildString.length = buildString.length - 1;                                                                    // 480
      return new S(buildString.join(''));                                                                             // 481
    },                                                                                                                // 482
                                                                                                                      // 483
    toString: function() {                                                                                            // 484
      return this.s;                                                                                                  // 485
    },                                                                                                                // 486
                                                                                                                      // 487
    //#modified from https://github.com/epeli/underscore.string                                                       // 488
    underscore: function() {                                                                                          // 489
      var s = this.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();             // 490
      if ((new S(this.s.charAt(0))).isUpper()) {                                                                      // 491
        s = '_' + s;                                                                                                  // 492
      }                                                                                                               // 493
      return new S(s);                                                                                                // 494
    },                                                                                                                // 495
                                                                                                                      // 496
    unescapeHTML: function() { //from underscore.string                                                               // 497
      return new S(this.s.replace(/\&([^;]+);/g, function(entity, entityCode){                                        // 498
        var match;                                                                                                    // 499
                                                                                                                      // 500
        if (entityCode in escapeChars) {                                                                              // 501
          return escapeChars[entityCode];                                                                             // 502
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {                                                   // 503
          return String.fromCharCode(parseInt(match[1], 16));                                                         // 504
        } else if (match = entityCode.match(/^#(\d+)$/)) {                                                            // 505
          return String.fromCharCode(~~match[1]);                                                                     // 506
        } else {                                                                                                      // 507
          return entity;                                                                                              // 508
        }                                                                                                             // 509
      }));                                                                                                            // 510
    },                                                                                                                // 511
                                                                                                                      // 512
    valueOf: function() {                                                                                             // 513
      return this.s.valueOf();                                                                                        // 514
    }                                                                                                                 // 515
                                                                                                                      // 516
  }                                                                                                                   // 517
                                                                                                                      // 518
  var methodsAdded = [];                                                                                              // 519
  function extendPrototype() {                                                                                        // 520
    for (var name in __sp) {                                                                                          // 521
      (function(name){                                                                                                // 522
        var func = __sp[name];                                                                                        // 523
        if (!__nsp.hasOwnProperty(name)) {                                                                            // 524
          methodsAdded.push(name);                                                                                    // 525
          __nsp[name] = function() {                                                                                  // 526
            String.prototype.s = this;                                                                                // 527
            return func.apply(this, arguments);                                                                       // 528
          }                                                                                                           // 529
        }                                                                                                             // 530
      })(name);                                                                                                       // 531
    }                                                                                                                 // 532
  }                                                                                                                   // 533
                                                                                                                      // 534
  function restorePrototype() {                                                                                       // 535
    for (var i = 0; i < methodsAdded.length; ++i)                                                                     // 536
      delete String.prototype[methodsAdded[i]];                                                                       // 537
    methodsAdded.length = 0;                                                                                          // 538
  }                                                                                                                   // 539
                                                                                                                      // 540
                                                                                                                      // 541
/*************************************                                                                                // 542
/* Attach Native JavaScript String Properties                                                                         // 543
/*************************************/                                                                               // 544
                                                                                                                      // 545
  var nativeProperties = getNativeStringProperties();                                                                 // 546
  for (var name in nativeProperties) {                                                                                // 547
    (function(name) {                                                                                                 // 548
      var stringProp = __nsp[name];                                                                                   // 549
      if (typeof stringProp == 'function') {                                                                          // 550
        //console.log(stringProp)                                                                                     // 551
        if (!__sp[name]) {                                                                                            // 552
          if (nativeProperties[name] === 'string') {                                                                  // 553
            __sp[name] = function() {                                                                                 // 554
              //console.log(name)                                                                                     // 555
              return new S(stringProp.apply(this, arguments));                                                        // 556
            }                                                                                                         // 557
          } else {                                                                                                    // 558
            __sp[name] = stringProp;                                                                                  // 559
          }                                                                                                           // 560
        }                                                                                                             // 561
      }                                                                                                               // 562
    })(name);                                                                                                         // 563
  }                                                                                                                   // 564
                                                                                                                      // 565
                                                                                                                      // 566
/*************************************                                                                                // 567
/* Function Aliases                                                                                                   // 568
/*************************************/                                                                               // 569
                                                                                                                      // 570
  __sp.repeat = __sp.times;                                                                                           // 571
  __sp.include = __sp.contains;                                                                                       // 572
  __sp.toInteger = __sp.toInt;                                                                                        // 573
  __sp.toBool = __sp.toBoolean;                                                                                       // 574
  __sp.decodeHTMLEntities = __sp.decodeHtmlEntities //ensure consistent casing scheme of 'HTML'                       // 575
                                                                                                                      // 576
                                                                                                                      // 577
/*************************************                                                                                // 578
/* Private Functions                                                                                                  // 579
/*************************************/                                                                               // 580
                                                                                                                      // 581
  function getNativeStringProperties() {                                                                              // 582
    var names = getNativeStringPropertyNames();                                                                       // 583
    var retObj = {};                                                                                                  // 584
                                                                                                                      // 585
    for (var i = 0; i < names.length; ++i) {                                                                          // 586
      var name = names[i];                                                                                            // 587
      var func = __nsp[name];                                                                                         // 588
      try {                                                                                                           // 589
        var type = typeof func.apply('teststring', []);                                                               // 590
        retObj[name] = type;                                                                                          // 591
      } catch (e) {}                                                                                                  // 592
    }                                                                                                                 // 593
    return retObj;                                                                                                    // 594
  }                                                                                                                   // 595
                                                                                                                      // 596
  function getNativeStringPropertyNames() {                                                                           // 597
    var results = [];                                                                                                 // 598
    if (Object.getOwnPropertyNames) {                                                                                 // 599
      results = Object.getOwnPropertyNames(__nsp);                                                                    // 600
      results.splice(results.indexOf('valueOf'), 1);                                                                  // 601
      results.splice(results.indexOf('toString'), 1);                                                                 // 602
      return results;                                                                                                 // 603
    } else { //meant for legacy cruft, this could probably be made more efficient                                     // 604
      var stringNames = {};                                                                                           // 605
      var objectNames = [];                                                                                           // 606
      for (var name in String.prototype)                                                                              // 607
        stringNames[name] = name;                                                                                     // 608
                                                                                                                      // 609
      for (var name in Object.prototype)                                                                              // 610
        delete stringNames[name];                                                                                     // 611
                                                                                                                      // 612
      //stringNames['toString'] = 'toString'; //this was deleted with the rest of the object names                    // 613
      for (var name in stringNames) {                                                                                 // 614
        results.push(name);                                                                                           // 615
      }                                                                                                               // 616
      return results;                                                                                                 // 617
    }                                                                                                                 // 618
  }                                                                                                                   // 619
                                                                                                                      // 620
  function Export(str) {                                                                                              // 621
    return new S(str);                                                                                                // 622
  };                                                                                                                  // 623
                                                                                                                      // 624
  //attach exports to StringJSWrapper                                                                                 // 625
  Export.extendPrototype = extendPrototype;                                                                           // 626
  Export.restorePrototype = restorePrototype;                                                                         // 627
  Export.VERSION = VERSION;                                                                                           // 628
  Export.TMPL_OPEN = '{{';                                                                                            // 629
  Export.TMPL_CLOSE = '}}';                                                                                           // 630
  Export.ENTITIES = ENTITIES;                                                                                         // 631
                                                                                                                      // 632
                                                                                                                      // 633
                                                                                                                      // 634
/*************************************                                                                                // 635
/* Exports                                                                                                            // 636
/*************************************/                                                                               // 637
                                                                                                                      // 638
  if (typeof module !== 'undefined'  && typeof module.exports !== 'undefined') {                                      // 639
    module.exports = Export;                                                                                          // 640
                                                                                                                      // 641
  } else {                                                                                                            // 642
                                                                                                                      // 643
    if(typeof define === "function" && define.amd) {                                                                  // 644
      define([], function() {                                                                                         // 645
        return Export;                                                                                                // 646
      });                                                                                                             // 647
    } else {                                                                                                          // 648
      window.S = Export;                                                                                              // 649
    }                                                                                                                 // 650
  }                                                                                                                   // 651
                                                                                                                      // 652
                                                                                                                      // 653
/*************************************                                                                                // 654
/* 3rd Party Private Functions                                                                                        // 655
/*************************************/                                                                               // 656
                                                                                                                      // 657
  //from sugar.js                                                                                                     // 658
  function multiArgs(args, fn) {                                                                                      // 659
    var result = [], i;                                                                                               // 660
    for(i = 0; i < args.length; i++) {                                                                                // 661
      result.push(args[i]);                                                                                           // 662
      if(fn) fn.call(args, args[i], i);                                                                               // 663
    }                                                                                                                 // 664
    return result;                                                                                                    // 665
  }                                                                                                                   // 666
                                                                                                                      // 667
  //from underscore.string                                                                                            // 668
  var escapeChars = {                                                                                                 // 669
    lt: '<',                                                                                                          // 670
    gt: '>',                                                                                                          // 671
    quot: '"',                                                                                                        // 672
    apos: "'",                                                                                                        // 673
    amp: '&'                                                                                                          // 674
  };                                                                                                                  // 675
                                                                                                                      // 676
  //from underscore.string                                                                                            // 677
  var reversedEscapeChars = {};                                                                                       // 678
  for(var key in escapeChars){ reversedEscapeChars[escapeChars[key]] = key; }                                         // 679
                                                                                                                      // 680
  ENTITIES = {                                                                                                        // 681
    "amp" : "&",                                                                                                      // 682
    "gt" : ">",                                                                                                       // 683
    "lt" : "<",                                                                                                       // 684
    "quot" : "\"",                                                                                                    // 685
    "apos" : "'",                                                                                                     // 686
    "AElig" : 198,                                                                                                    // 687
    "Aacute" : 193,                                                                                                   // 688
    "Acirc" : 194,                                                                                                    // 689
    "Agrave" : 192,                                                                                                   // 690
    "Aring" : 197,                                                                                                    // 691
    "Atilde" : 195,                                                                                                   // 692
    "Auml" : 196,                                                                                                     // 693
    "Ccedil" : 199,                                                                                                   // 694
    "ETH" : 208,                                                                                                      // 695
    "Eacute" : 201,                                                                                                   // 696
    "Ecirc" : 202,                                                                                                    // 697
    "Egrave" : 200,                                                                                                   // 698
    "Euml" : 203,                                                                                                     // 699
    "Iacute" : 205,                                                                                                   // 700
    "Icirc" : 206,                                                                                                    // 701
    "Igrave" : 204,                                                                                                   // 702
    "Iuml" : 207,                                                                                                     // 703
    "Ntilde" : 209,                                                                                                   // 704
    "Oacute" : 211,                                                                                                   // 705
    "Ocirc" : 212,                                                                                                    // 706
    "Ograve" : 210,                                                                                                   // 707
    "Oslash" : 216,                                                                                                   // 708
    "Otilde" : 213,                                                                                                   // 709
    "Ouml" : 214,                                                                                                     // 710
    "THORN" : 222,                                                                                                    // 711
    "Uacute" : 218,                                                                                                   // 712
    "Ucirc" : 219,                                                                                                    // 713
    "Ugrave" : 217,                                                                                                   // 714
    "Uuml" : 220,                                                                                                     // 715
    "Yacute" : 221,                                                                                                   // 716
    "aacute" : 225,                                                                                                   // 717
    "acirc" : 226,                                                                                                    // 718
    "aelig" : 230,                                                                                                    // 719
    "agrave" : 224,                                                                                                   // 720
    "aring" : 229,                                                                                                    // 721
    "atilde" : 227,                                                                                                   // 722
    "auml" : 228,                                                                                                     // 723
    "ccedil" : 231,                                                                                                   // 724
    "eacute" : 233,                                                                                                   // 725
    "ecirc" : 234,                                                                                                    // 726
    "egrave" : 232,                                                                                                   // 727
    "eth" : 240,                                                                                                      // 728
    "euml" : 235,                                                                                                     // 729
    "iacute" : 237,                                                                                                   // 730
    "icirc" : 238,                                                                                                    // 731
    "igrave" : 236,                                                                                                   // 732
    "iuml" : 239,                                                                                                     // 733
    "ntilde" : 241,                                                                                                   // 734
    "oacute" : 243,                                                                                                   // 735
    "ocirc" : 244,                                                                                                    // 736
    "ograve" : 242,                                                                                                   // 737
    "oslash" : 248,                                                                                                   // 738
    "otilde" : 245,                                                                                                   // 739
    "ouml" : 246,                                                                                                     // 740
    "szlig" : 223,                                                                                                    // 741
    "thorn" : 254,                                                                                                    // 742
    "uacute" : 250,                                                                                                   // 743
    "ucirc" : 251,                                                                                                    // 744
    "ugrave" : 249,                                                                                                   // 745
    "uuml" : 252,                                                                                                     // 746
    "yacute" : 253,                                                                                                   // 747
    "yuml" : 255,                                                                                                     // 748
    "copy" : 169,                                                                                                     // 749
    "reg" : 174,                                                                                                      // 750
    "nbsp" : 160,                                                                                                     // 751
    "iexcl" : 161,                                                                                                    // 752
    "cent" : 162,                                                                                                     // 753
    "pound" : 163,                                                                                                    // 754
    "curren" : 164,                                                                                                   // 755
    "yen" : 165,                                                                                                      // 756
    "brvbar" : 166,                                                                                                   // 757
    "sect" : 167,                                                                                                     // 758
    "uml" : 168,                                                                                                      // 759
    "ordf" : 170,                                                                                                     // 760
    "laquo" : 171,                                                                                                    // 761
    "not" : 172,                                                                                                      // 762
    "shy" : 173,                                                                                                      // 763
    "macr" : 175,                                                                                                     // 764
    "deg" : 176,                                                                                                      // 765
    "plusmn" : 177,                                                                                                   // 766
    "sup1" : 185,                                                                                                     // 767
    "sup2" : 178,                                                                                                     // 768
    "sup3" : 179,                                                                                                     // 769
    "acute" : 180,                                                                                                    // 770
    "micro" : 181,                                                                                                    // 771
    "para" : 182,                                                                                                     // 772
    "middot" : 183,                                                                                                   // 773
    "cedil" : 184,                                                                                                    // 774
    "ordm" : 186,                                                                                                     // 775
    "raquo" : 187,                                                                                                    // 776
    "frac14" : 188,                                                                                                   // 777
    "frac12" : 189,                                                                                                   // 778
    "frac34" : 190,                                                                                                   // 779
    "iquest" : 191,                                                                                                   // 780
    "times" : 215,                                                                                                    // 781
    "divide" : 247,                                                                                                   // 782
    "OElig;" : 338,                                                                                                   // 783
    "oelig;" : 339,                                                                                                   // 784
    "Scaron;" : 352,                                                                                                  // 785
    "scaron;" : 353,                                                                                                  // 786
    "Yuml;" : 376,                                                                                                    // 787
    "fnof;" : 402,                                                                                                    // 788
    "circ;" : 710,                                                                                                    // 789
    "tilde;" : 732,                                                                                                   // 790
    "Alpha;" : 913,                                                                                                   // 791
    "Beta;" : 914,                                                                                                    // 792
    "Gamma;" : 915,                                                                                                   // 793
    "Delta;" : 916,                                                                                                   // 794
    "Epsilon;" : 917,                                                                                                 // 795
    "Zeta;" : 918,                                                                                                    // 796
    "Eta;" : 919,                                                                                                     // 797
    "Theta;" : 920,                                                                                                   // 798
    "Iota;" : 921,                                                                                                    // 799
    "Kappa;" : 922,                                                                                                   // 800
    "Lambda;" : 923,                                                                                                  // 801
    "Mu;" : 924,                                                                                                      // 802
    "Nu;" : 925,                                                                                                      // 803
    "Xi;" : 926,                                                                                                      // 804
    "Omicron;" : 927,                                                                                                 // 805
    "Pi;" : 928,                                                                                                      // 806
    "Rho;" : 929,                                                                                                     // 807
    "Sigma;" : 931,                                                                                                   // 808
    "Tau;" : 932,                                                                                                     // 809
    "Upsilon;" : 933,                                                                                                 // 810
    "Phi;" : 934,                                                                                                     // 811
    "Chi;" : 935,                                                                                                     // 812
    "Psi;" : 936,                                                                                                     // 813
    "Omega;" : 937,                                                                                                   // 814
    "alpha;" : 945,                                                                                                   // 815
    "beta;" : 946,                                                                                                    // 816
    "gamma;" : 947,                                                                                                   // 817
    "delta;" : 948,                                                                                                   // 818
    "epsilon;" : 949,                                                                                                 // 819
    "zeta;" : 950,                                                                                                    // 820
    "eta;" : 951,                                                                                                     // 821
    "theta;" : 952,                                                                                                   // 822
    "iota;" : 953,                                                                                                    // 823
    "kappa;" : 954,                                                                                                   // 824
    "lambda;" : 955,                                                                                                  // 825
    "mu;" : 956,                                                                                                      // 826
    "nu;" : 957,                                                                                                      // 827
    "xi;" : 958,                                                                                                      // 828
    "omicron;" : 959,                                                                                                 // 829
    "pi;" : 960,                                                                                                      // 830
    "rho;" : 961,                                                                                                     // 831
    "sigmaf;" : 962,                                                                                                  // 832
    "sigma;" : 963,                                                                                                   // 833
    "tau;" : 964,                                                                                                     // 834
    "upsilon;" : 965,                                                                                                 // 835
    "phi;" : 966,                                                                                                     // 836
    "chi;" : 967,                                                                                                     // 837
    "psi;" : 968,                                                                                                     // 838
    "omega;" : 969,                                                                                                   // 839
    "thetasym;" : 977,                                                                                                // 840
    "upsih;" : 978,                                                                                                   // 841
    "piv;" : 982,                                                                                                     // 842
    "ensp;" : 8194,                                                                                                   // 843
    "emsp;" : 8195,                                                                                                   // 844
    "thinsp;" : 8201,                                                                                                 // 845
    "zwnj;" : 8204,                                                                                                   // 846
    "zwj;" : 8205,                                                                                                    // 847
    "lrm;" : 8206,                                                                                                    // 848
    "rlm;" : 8207,                                                                                                    // 849
    "ndash;" : 8211,                                                                                                  // 850
    "mdash;" : 8212,                                                                                                  // 851
    "lsquo;" : 8216,                                                                                                  // 852
    "rsquo;" : 8217,                                                                                                  // 853
    "sbquo;" : 8218,                                                                                                  // 854
    "ldquo;" : 8220,                                                                                                  // 855
    "rdquo;" : 8221,                                                                                                  // 856
    "bdquo;" : 8222,                                                                                                  // 857
    "dagger;" : 8224,                                                                                                 // 858
    "Dagger;" : 8225,                                                                                                 // 859
    "bull;" : 8226,                                                                                                   // 860
    "hellip;" : 8230,                                                                                                 // 861
    "permil;" : 8240,                                                                                                 // 862
    "prime;" : 8242,                                                                                                  // 863
    "Prime;" : 8243,                                                                                                  // 864
    "lsaquo;" : 8249,                                                                                                 // 865
    "rsaquo;" : 8250,                                                                                                 // 866
    "oline;" : 8254,                                                                                                  // 867
    "frasl;" : 8260,                                                                                                  // 868
    "euro;" : 8364,                                                                                                   // 869
    "image;" : 8465,                                                                                                  // 870
    "weierp;" : 8472,                                                                                                 // 871
    "real;" : 8476,                                                                                                   // 872
    "trade;" : 8482,                                                                                                  // 873
    "alefsym;" : 8501,                                                                                                // 874
    "larr;" : 8592,                                                                                                   // 875
    "uarr;" : 8593,                                                                                                   // 876
    "rarr;" : 8594,                                                                                                   // 877
    "darr;" : 8595,                                                                                                   // 878
    "harr;" : 8596,                                                                                                   // 879
    "crarr;" : 8629,                                                                                                  // 880
    "lArr;" : 8656,                                                                                                   // 881
    "uArr;" : 8657,                                                                                                   // 882
    "rArr;" : 8658,                                                                                                   // 883
    "dArr;" : 8659,                                                                                                   // 884
    "hArr;" : 8660,                                                                                                   // 885
    "forall;" : 8704,                                                                                                 // 886
    "part;" : 8706,                                                                                                   // 887
    "exist;" : 8707,                                                                                                  // 888
    "empty;" : 8709,                                                                                                  // 889
    "nabla;" : 8711,                                                                                                  // 890
    "isin;" : 8712,                                                                                                   // 891
    "notin;" : 8713,                                                                                                  // 892
    "ni;" : 8715,                                                                                                     // 893
    "prod;" : 8719,                                                                                                   // 894
    "sum;" : 8721,                                                                                                    // 895
    "minus;" : 8722,                                                                                                  // 896
    "lowast;" : 8727,                                                                                                 // 897
    "radic;" : 8730,                                                                                                  // 898
    "prop;" : 8733,                                                                                                   // 899
    "infin;" : 8734,                                                                                                  // 900
    "ang;" : 8736,                                                                                                    // 901
    "and;" : 8743,                                                                                                    // 902
    "or;" : 8744,                                                                                                     // 903
    "cap;" : 8745,                                                                                                    // 904
    "cup;" : 8746,                                                                                                    // 905
    "int;" : 8747,                                                                                                    // 906
    "there4;" : 8756,                                                                                                 // 907
    "sim;" : 8764,                                                                                                    // 908
    "cong;" : 8773,                                                                                                   // 909
    "asymp;" : 8776,                                                                                                  // 910
    "ne;" : 8800,                                                                                                     // 911
    "equiv;" : 8801,                                                                                                  // 912
    "le;" : 8804,                                                                                                     // 913
    "ge;" : 8805,                                                                                                     // 914
    "sub;" : 8834,                                                                                                    // 915
    "sup;" : 8835,                                                                                                    // 916
    "nsub;" : 8836,                                                                                                   // 917
    "sube;" : 8838,                                                                                                   // 918
    "supe;" : 8839,                                                                                                   // 919
    "oplus;" : 8853,                                                                                                  // 920
    "otimes;" : 8855,                                                                                                 // 921
    "perp;" : 8869,                                                                                                   // 922
    "sdot;" : 8901,                                                                                                   // 923
    "lceil;" : 8968,                                                                                                  // 924
    "rceil;" : 8969,                                                                                                  // 925
    "lfloor;" : 8970,                                                                                                 // 926
    "rfloor;" : 8971,                                                                                                 // 927
    "lang;" : 9001,                                                                                                   // 928
    "rang;" : 9002,                                                                                                   // 929
    "loz;" : 9674,                                                                                                    // 930
    "spades;" : 9824,                                                                                                 // 931
    "clubs;" : 9827,                                                                                                  // 932
    "hearts;" : 9829,                                                                                                 // 933
    "diams;" : 9830                                                                                                   // 934
  }                                                                                                                   // 935
                                                                                                                      // 936
                                                                                                                      // 937
}).call(this);                                                                                                        // 938
                                                                                                                      // 939
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/simple-schema/mongo-object.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*                                                                                                                    // 1
 * @constructor                                                                                                       // 2
 * @param {Object} objOrModifier                                                                                      // 3
 * @param {string[]} blackBoxKeys - A list of the names of keys that shouldn't be traversed                           // 4
 * @returns {undefined}                                                                                               // 5
 *                                                                                                                    // 6
 * Creates a new MongoObject instance. The object passed as the first argument                                        // 7
 * will be modified in place by calls to instance methods. Also, immediately                                          // 8
 * upon creation of the instance, the object will have any `undefined` keys                                           // 9
 * removed recursively.                                                                                               // 10
 */                                                                                                                   // 11
MongoObject = function(objOrModifier, blackBoxKeys) {                                                                 // 12
  var self = this;                                                                                                    // 13
  self._obj = objOrModifier;                                                                                          // 14
  self._affectedKeys = {};                                                                                            // 15
  self._genericAffectedKeys = {};                                                                                     // 16
  self._parentPositions = [];                                                                                         // 17
  self._positionsInsideArrays = [];                                                                                   // 18
  self._objectPositions = [];                                                                                         // 19
                                                                                                                      // 20
  function parseObj(val, currentPosition, affectedKey, operator, adjusted, isWithinArray) {                           // 21
                                                                                                                      // 22
    // Adjust for first-level modifier operators                                                                      // 23
    if (!operator && affectedKey && affectedKey.substring(0, 1) === "$") {                                            // 24
      operator = affectedKey;                                                                                         // 25
      affectedKey = null;                                                                                             // 26
    }                                                                                                                 // 27
                                                                                                                      // 28
    var affectedKeyIsBlackBox = false;                                                                                // 29
    var affectedKeyGeneric;                                                                                           // 30
    if (affectedKey) {                                                                                                // 31
                                                                                                                      // 32
      // Adjust for $push and $addToSet and $pull and $pop                                                            // 33
      if (!adjusted && (operator === "$push" || operator === "$addToSet" || operator === "$pull" || operator === "$pop")) {
        // Adjust for $each                                                                                           // 35
        // We can simply jump forward and pretend like the $each array                                                // 36
        // is the array for the field. This has the added benefit of                                                  // 37
        // skipping past any $slice, which we also don't care about.                                                  // 38
        if (isBasicObject(val) && "$each" in val) {                                                                   // 39
          val = val.$each;                                                                                            // 40
          currentPosition = currentPosition + "[$each]";                                                              // 41
        } else {                                                                                                      // 42
          affectedKey = affectedKey + ".0";                                                                           // 43
        }                                                                                                             // 44
        adjusted = true;                                                                                              // 45
      }                                                                                                               // 46
                                                                                                                      // 47
      // Make generic key                                                                                             // 48
      affectedKeyGeneric = makeGeneric(affectedKey);                                                                  // 49
                                                                                                                      // 50
      // Determine whether affected key should be treated as a black box                                              // 51
      affectedKeyIsBlackBox = _.contains(blackBoxKeys, affectedKeyGeneric);                                           // 52
                                                                                                                      // 53
      // Mark that this position affects this generic and non-generic key                                             // 54
      if (currentPosition) {                                                                                          // 55
        self._affectedKeys[currentPosition] = affectedKey;                                                            // 56
        self._genericAffectedKeys[currentPosition] = affectedKeyGeneric;                                              // 57
                                                                                                                      // 58
        // If we're within an array, mark this position so we can omit it from flat docs                              // 59
        isWithinArray && self._positionsInsideArrays.push(currentPosition);                                           // 60
      }                                                                                                               // 61
    }                                                                                                                 // 62
                                                                                                                      // 63
    // Loop through arrays                                                                                            // 64
    if (_.isArray(val) && !_.isEmpty(val)) {                                                                          // 65
      if (currentPosition) {                                                                                          // 66
        // Mark positions with arrays that should be ignored when we want endpoints only                              // 67
        self._parentPositions.push(currentPosition);                                                                  // 68
      }                                                                                                               // 69
                                                                                                                      // 70
      // Loop                                                                                                         // 71
      _.each(val, function(v, i) {                                                                                    // 72
        parseObj(v, (currentPosition ? currentPosition + "[" + i + "]" : i), affectedKey + '.' + i, operator, adjusted, true);
      });                                                                                                             // 74
    }                                                                                                                 // 75
                                                                                                                      // 76
    // Loop through object keys, only for basic objects,                                                              // 77
    // but always for the passed-in object, even if it                                                                // 78
    // is a custom object.                                                                                            // 79
    else if ((isBasicObject(val) && !affectedKeyIsBlackBox) || !currentPosition) {                                    // 80
      if (currentPosition && !_.isEmpty(val)) {                                                                       // 81
        // Mark positions with objects that should be ignored when we want endpoints only                             // 82
        self._parentPositions.push(currentPosition);                                                                  // 83
        // Mark positions with objects that should be left out of flat docs.                                          // 84
        self._objectPositions.push(currentPosition);                                                                  // 85
      }                                                                                                               // 86
      // Loop                                                                                                         // 87
      _.each(val, function(v, k) {                                                                                    // 88
        if (v === void 0) {                                                                                           // 89
          delete val[k];                                                                                              // 90
        } else if (k !== "$slice") {                                                                                  // 91
          parseObj(v, (currentPosition ? currentPosition + "[" + k + "]" : k), appendAffectedKey(affectedKey, k), operator, adjusted, isWithinArray);
        }                                                                                                             // 93
      });                                                                                                             // 94
    }                                                                                                                 // 95
                                                                                                                      // 96
  }                                                                                                                   // 97
  parseObj(self._obj);                                                                                                // 98
                                                                                                                      // 99
  function reParseObj() {                                                                                             // 100
    self._affectedKeys = {};                                                                                          // 101
    self._genericAffectedKeys = {};                                                                                   // 102
    self._parentPositions = [];                                                                                       // 103
    self._positionsInsideArrays = [];                                                                                 // 104
    self._objectPositions = [];                                                                                       // 105
    parseObj(self._obj);                                                                                              // 106
  }                                                                                                                   // 107
                                                                                                                      // 108
  /**                                                                                                                 // 109
   * @method MongoObject.forEachNode                                                                                  // 110
   * @param {Function} func                                                                                           // 111
   * @param {Object} [options]                                                                                        // 112
   * @param {Boolean} [options.endPointsOnly=true] - Only call function for endpoints and not for nodes that contain other nodes
   * @returns {undefined}                                                                                             // 114
   *                                                                                                                  // 115
   * Runs a function for each endpoint node in the object tree, including all items in every array.                   // 116
   * The function arguments are                                                                                       // 117
   * (1) the value at this node                                                                                       // 118
   * (2) a string representing the node position                                                                      // 119
   * (3) the representation of what would be changed in mongo, using mongo dot notation                               // 120
   * (4) the generic equivalent of argument 3, with "$" instead of numeric pieces                                     // 121
   */                                                                                                                 // 122
  self.forEachNode = function(func, options) {                                                                        // 123
    if (typeof func !== "function")                                                                                   // 124
      throw new Error("filter requires a loop function");                                                             // 125
                                                                                                                      // 126
    options = _.extend({                                                                                              // 127
      endPointsOnly: true                                                                                             // 128
    }, options);                                                                                                      // 129
                                                                                                                      // 130
    var updatedValues = {};                                                                                           // 131
    _.each(self._affectedKeys, function(affectedKey, position) {                                                      // 132
      if (options.endPointsOnly && _.contains(self._parentPositions, position))                                       // 133
        return; //only endpoints                                                                                      // 134
      func.call({                                                                                                     // 135
        value: self.getValueForPosition(position),                                                                    // 136
        operator: extractOp(position),                                                                                // 137
        position: position,                                                                                           // 138
        key: affectedKey,                                                                                             // 139
        genericKey: self._genericAffectedKeys[position],                                                              // 140
        updateValue: function(newVal) {                                                                               // 141
          updatedValues[position] = newVal;                                                                           // 142
        },                                                                                                            // 143
        remove: function() {                                                                                          // 144
          updatedValues[position] = void 0;                                                                           // 145
        }                                                                                                             // 146
      });                                                                                                             // 147
    });                                                                                                               // 148
                                                                                                                      // 149
    // Actually update/remove values as instructed                                                                    // 150
    _.each(updatedValues, function(newVal, position) {                                                                // 151
      self.setValueForPosition(position, newVal);                                                                     // 152
    });                                                                                                               // 153
                                                                                                                      // 154
  };                                                                                                                  // 155
                                                                                                                      // 156
  self.getValueForPosition = function(position) {                                                                     // 157
    var subkey, subkeys = position.split("["), current = self._obj;                                                   // 158
    for (var i = 0, ln = subkeys.length; i < ln; i++) {                                                               // 159
      subkey = subkeys[i];                                                                                            // 160
      // If the subkey ends in "]", remove the ending                                                                 // 161
      if (subkey.slice(-1) === "]") {                                                                                 // 162
        subkey = subkey.slice(0, -1);                                                                                 // 163
      }                                                                                                               // 164
      current = current[subkey];                                                                                      // 165
      if (!_.isArray(current) && !isBasicObject(current) && i < ln - 1) {                                             // 166
        return;                                                                                                       // 167
      }                                                                                                               // 168
    }                                                                                                                 // 169
    return current;                                                                                                   // 170
  };                                                                                                                  // 171
                                                                                                                      // 172
  /**                                                                                                                 // 173
   * @method MongoObject.prototype.setValueForPosition                                                                // 174
   * @param {String} position                                                                                         // 175
   * @param {Any} value                                                                                               // 176
   * @returns {undefined}                                                                                             // 177
   */                                                                                                                 // 178
  self.setValueForPosition = function(position, value) {                                                              // 179
    var nextPiece, subkey, subkeys = position.split("["), current = self._obj;                                        // 180
                                                                                                                      // 181
    for (var i = 0, ln = subkeys.length; i < ln; i++) {                                                               // 182
      subkey = subkeys[i];                                                                                            // 183
      // If the subkey ends in "]", remove the ending                                                                 // 184
      if (subkey.slice(-1) === "]") {                                                                                 // 185
        subkey = subkey.slice(0, -1);                                                                                 // 186
      }                                                                                                               // 187
      // If we've reached the key in the object tree that needs setting or                                            // 188
      // deleting, do it.                                                                                             // 189
      if (i === ln - 1) {                                                                                             // 190
        current[subkey] = value;                                                                                      // 191
        //if value is undefined, delete the property                                                                  // 192
        if (value === void 0)                                                                                         // 193
          delete current[subkey];                                                                                     // 194
      }                                                                                                               // 195
      // Otherwise attempt to keep moving deeper into the object.                                                     // 196
      else {                                                                                                          // 197
        // If we're setting (as opposed to deleting) a key and we hit a place                                         // 198
        // in the ancestor chain where the keys are not yet created, create them.                                     // 199
        if (current[subkey] === void 0 && value !== void 0) {                                                         // 200
          //see if the next piece is a number                                                                         // 201
          nextPiece = subkeys[i + 1];                                                                                 // 202
          nextPiece = parseInt(nextPiece, 10);                                                                        // 203
          current[subkey] = isNaN(nextPiece) ? {} : [];                                                               // 204
        }                                                                                                             // 205
                                                                                                                      // 206
        // Move deeper into the object                                                                                // 207
        current = current[subkey];                                                                                    // 208
                                                                                                                      // 209
        // If we can go no further, then quit                                                                         // 210
        if (!_.isArray(current) && !isBasicObject(current) && i < ln - 1) {                                           // 211
          return;                                                                                                     // 212
        }                                                                                                             // 213
      }                                                                                                               // 214
    }                                                                                                                 // 215
                                                                                                                      // 216
    reParseObj();                                                                                                     // 217
  };                                                                                                                  // 218
                                                                                                                      // 219
  /**                                                                                                                 // 220
   * @method MongoObject.prototype.removeValueForPosition                                                             // 221
   * @param {String} position                                                                                         // 222
   * @returns {undefined}                                                                                             // 223
   */                                                                                                                 // 224
  self.removeValueForPosition = function(position) {                                                                  // 225
    self.setValueForPosition(position, void 0);                                                                       // 226
  };                                                                                                                  // 227
                                                                                                                      // 228
  /**                                                                                                                 // 229
   * @method MongoObject.prototype.getKeyForPosition                                                                  // 230
   * @param {String} position                                                                                         // 231
   * @returns {undefined}                                                                                             // 232
   */                                                                                                                 // 233
  self.getKeyForPosition = function(position) {                                                                       // 234
    return self._affectedKeys[position];                                                                              // 235
  };                                                                                                                  // 236
                                                                                                                      // 237
  /**                                                                                                                 // 238
   * @method MongoObject.prototype.getGenericKeyForPosition                                                           // 239
   * @param {String} position                                                                                         // 240
   * @returns {undefined}                                                                                             // 241
   */                                                                                                                 // 242
  self.getGenericKeyForPosition = function(position) {                                                                // 243
    return self._genericAffectedKeys[position];                                                                       // 244
  };                                                                                                                  // 245
                                                                                                                      // 246
  /**                                                                                                                 // 247
   * @method MongoObject.getInfoForKey                                                                                // 248
   * @param {String} key - Non-generic key                                                                            // 249
   * @returns {undefined|Object}                                                                                      // 250
   *                                                                                                                  // 251
   * Returns the value and operator of the requested non-generic key.                                                 // 252
   * Example: {value: 1, operator: "$pull"}                                                                           // 253
   */                                                                                                                 // 254
  self.getInfoForKey = function(key) {                                                                                // 255
    // Get the info                                                                                                   // 256
    var position = self.getPositionForKey(key);                                                                       // 257
    if (position) {                                                                                                   // 258
      return {                                                                                                        // 259
        value: self.getValueForPosition(position),                                                                    // 260
        operator: extractOp(position)                                                                                 // 261
      };                                                                                                              // 262
    }                                                                                                                 // 263
                                                                                                                      // 264
    // If we haven't returned yet, check to see if there is an array value                                            // 265
    // corresponding to this key                                                                                      // 266
    // We find the first item within the array, strip the last piece off the                                          // 267
    // position string, and then return whatever is at that new position in                                           // 268
    // the original object.                                                                                           // 269
    var positions = self.getPositionsForGenericKey(key + ".$"), p, v;                                                 // 270
    for (var i = 0, ln = positions.length; i < ln; i++) {                                                             // 271
      p = positions[i];                                                                                               // 272
      v = self.getValueForPosition(p) || self.getValueForPosition(p.slice(0, p.lastIndexOf("[")));                    // 273
      if (v) {                                                                                                        // 274
        return {                                                                                                      // 275
          value: v,                                                                                                   // 276
          operator: extractOp(p)                                                                                      // 277
        };                                                                                                            // 278
      }                                                                                                               // 279
    }                                                                                                                 // 280
  };                                                                                                                  // 281
                                                                                                                      // 282
  /**                                                                                                                 // 283
   * @method MongoObject.getPositionForKey                                                                            // 284
   * @param {String} key - Non-generic key                                                                            // 285
   * @returns {undefined|String} Position string                                                                      // 286
   *                                                                                                                  // 287
   * Returns the position string for the place in the object that                                                     // 288
   * affects the requested non-generic key.                                                                           // 289
   * Example: 'foo[bar][0]'                                                                                           // 290
   */                                                                                                                 // 291
  self.getPositionForKey = function(key) {                                                                            // 292
    // Get the info                                                                                                   // 293
    for (var position in self._affectedKeys) {                                                                        // 294
      if (self._affectedKeys.hasOwnProperty(position)) {                                                              // 295
        if (self._affectedKeys[position] === key) {                                                                   // 296
          // We return the first one we find. While it's                                                              // 297
          // possible that multiple update operators could                                                            // 298
          // affect the same non-generic key, we'll assume that's not the case.                                       // 299
          return position;                                                                                            // 300
        }                                                                                                             // 301
      }                                                                                                               // 302
    }                                                                                                                 // 303
                                                                                                                      // 304
    // If we haven't returned yet, we need to check for affected keys                                                 // 305
  };                                                                                                                  // 306
                                                                                                                      // 307
  /**                                                                                                                 // 308
   * @method MongoObject.getPositionsForGenericKey                                                                    // 309
   * @param {String} key - Generic key                                                                                // 310
   * @returns {String[]} Array of position strings                                                                    // 311
   *                                                                                                                  // 312
   * Returns an array of position strings for the places in the object that                                           // 313
   * affect the requested generic key.                                                                                // 314
   * Example: ['foo[bar][0]']                                                                                         // 315
   */                                                                                                                 // 316
  self.getPositionsForGenericKey = function(key) {                                                                    // 317
    // Get the info                                                                                                   // 318
    var list = [];                                                                                                    // 319
    for (var position in self._genericAffectedKeys) {                                                                 // 320
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                       // 321
        if (self._genericAffectedKeys[position] === key) {                                                            // 322
          list.push(position);                                                                                        // 323
        }                                                                                                             // 324
      }                                                                                                               // 325
    }                                                                                                                 // 326
                                                                                                                      // 327
    return list;                                                                                                      // 328
  };                                                                                                                  // 329
                                                                                                                      // 330
  /**                                                                                                                 // 331
   * @deprecated Use getInfoForKey                                                                                    // 332
   * @method MongoObject.getValueForKey                                                                               // 333
   * @param {String} key - Non-generic key                                                                            // 334
   * @returns {undefined|Any}                                                                                         // 335
   *                                                                                                                  // 336
   * Returns the value of the requested non-generic key                                                               // 337
   */                                                                                                                 // 338
  self.getValueForKey = function(key) {                                                                               // 339
    var position = self.getPositionForKey(key);                                                                       // 340
    if (position) {                                                                                                   // 341
      return self.getValueForPosition(position);                                                                      // 342
    }                                                                                                                 // 343
  };                                                                                                                  // 344
                                                                                                                      // 345
  /**                                                                                                                 // 346
   * @method MongoObject.prototype.addKey                                                                             // 347
   * @param {String} key - Key to set                                                                                 // 348
   * @param {Any} val - Value to give this key                                                                        // 349
   * @param {String} op - Operator under which to set it, or `null` for a non-modifier object                         // 350
   * @returns {undefined}                                                                                             // 351
   *                                                                                                                  // 352
   * Adds `key` with value `val` under operator `op` to the source object.                                            // 353
   */                                                                                                                 // 354
  self.addKey = function(key, val, op) {                                                                              // 355
    var position = op ? op + "[" + key + "]" : MongoObject._keyToPosition(key);                                       // 356
    self.setValueForPosition(position, val);                                                                          // 357
  };                                                                                                                  // 358
                                                                                                                      // 359
  /**                                                                                                                 // 360
   * @method MongoObject.prototype.removeGenericKeys                                                                  // 361
   * @param {String[]} keys                                                                                           // 362
   * @returns {undefined}                                                                                             // 363
   *                                                                                                                  // 364
   * Removes anything that affects any of the generic keys in the list                                                // 365
   */                                                                                                                 // 366
  self.removeGenericKeys = function(keys) {                                                                           // 367
    for (var position in self._genericAffectedKeys) {                                                                 // 368
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                       // 369
        if (_.contains(keys, self._genericAffectedKeys[position])) {                                                  // 370
          self.removeValueForPosition(position);                                                                      // 371
        }                                                                                                             // 372
      }                                                                                                               // 373
    }                                                                                                                 // 374
  };                                                                                                                  // 375
                                                                                                                      // 376
  /**                                                                                                                 // 377
   * @method MongoObject.removeGenericKey                                                                             // 378
   * @param {String} key                                                                                              // 379
   * @returns {undefined}                                                                                             // 380
   *                                                                                                                  // 381
   * Removes anything that affects the requested generic key                                                          // 382
   */                                                                                                                 // 383
  self.removeGenericKey = function(key) {                                                                             // 384
    for (var position in self._genericAffectedKeys) {                                                                 // 385
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                       // 386
        if (self._genericAffectedKeys[position] === key) {                                                            // 387
          self.removeValueForPosition(position);                                                                      // 388
        }                                                                                                             // 389
      }                                                                                                               // 390
    }                                                                                                                 // 391
  };                                                                                                                  // 392
                                                                                                                      // 393
  /**                                                                                                                 // 394
   * @method MongoObject.removeKey                                                                                    // 395
   * @param {String} key                                                                                              // 396
   * @returns {undefined}                                                                                             // 397
   *                                                                                                                  // 398
   * Removes anything that affects the requested non-generic key                                                      // 399
   */                                                                                                                 // 400
  self.removeKey = function(key) {                                                                                    // 401
    // We don't use getPositionForKey here because we want to be sure to                                              // 402
    // remove for all positions if there are multiple.                                                                // 403
    for (var position in self._affectedKeys) {                                                                        // 404
      if (self._affectedKeys.hasOwnProperty(position)) {                                                              // 405
        if (self._affectedKeys[position] === key) {                                                                   // 406
          self.removeValueForPosition(position);                                                                      // 407
        }                                                                                                             // 408
      }                                                                                                               // 409
    }                                                                                                                 // 410
  };                                                                                                                  // 411
                                                                                                                      // 412
  /**                                                                                                                 // 413
   * @method MongoObject.removeKeys                                                                                   // 414
   * @param {String[]} keys                                                                                           // 415
   * @returns {undefined}                                                                                             // 416
   *                                                                                                                  // 417
   * Removes anything that affects any of the non-generic keys in the list                                            // 418
   */                                                                                                                 // 419
  self.removeKeys = function(keys) {                                                                                  // 420
    for (var i = 0, ln = keys.length; i < ln; i++) {                                                                  // 421
      self.removeKey(keys[i]);                                                                                        // 422
    }                                                                                                                 // 423
  };                                                                                                                  // 424
                                                                                                                      // 425
  /**                                                                                                                 // 426
   * @method MongoObject.filterGenericKeys                                                                            // 427
   * @param {Function} test - Test function                                                                           // 428
   * @returns {undefined}                                                                                             // 429
   *                                                                                                                  // 430
   * Passes all affected keys to a test function, which                                                               // 431
   * should return false to remove whatever is affecting that key                                                     // 432
   */                                                                                                                 // 433
  self.filterGenericKeys = function(test) {                                                                           // 434
    var gk, checkedKeys = [], keysToRemove = [];                                                                      // 435
    for (var position in self._genericAffectedKeys) {                                                                 // 436
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                       // 437
        gk = self._genericAffectedKeys[position];                                                                     // 438
        if (!_.contains(checkedKeys, gk)) {                                                                           // 439
          checkedKeys.push(gk);                                                                                       // 440
          if (gk && !test(gk)) {                                                                                      // 441
            keysToRemove.push(gk);                                                                                    // 442
          }                                                                                                           // 443
        }                                                                                                             // 444
      }                                                                                                               // 445
    }                                                                                                                 // 446
                                                                                                                      // 447
    _.each(keysToRemove, function(key) {                                                                              // 448
      self.removeGenericKey(key);                                                                                     // 449
    });                                                                                                               // 450
  };                                                                                                                  // 451
                                                                                                                      // 452
  /**                                                                                                                 // 453
   * @method MongoObject.setValueForKey                                                                               // 454
   * @param {String} key                                                                                              // 455
   * @param {Any} val                                                                                                 // 456
   * @returns {undefined}                                                                                             // 457
   *                                                                                                                  // 458
   * Sets the value for every place in the object that affects                                                        // 459
   * the requested non-generic key                                                                                    // 460
   */                                                                                                                 // 461
  self.setValueForKey = function(key, val) {                                                                          // 462
    // We don't use getPositionForKey here because we want to be sure to                                              // 463
    // set the value for all positions if there are multiple.                                                         // 464
    for (var position in self._affectedKeys) {                                                                        // 465
      if (self._affectedKeys.hasOwnProperty(position)) {                                                              // 466
        if (self._affectedKeys[position] === key) {                                                                   // 467
          self.setValueForPosition(position, val);                                                                    // 468
        }                                                                                                             // 469
      }                                                                                                               // 470
    }                                                                                                                 // 471
  };                                                                                                                  // 472
                                                                                                                      // 473
  /**                                                                                                                 // 474
   * @method MongoObject.setValueForGenericKey                                                                        // 475
   * @param {String} key                                                                                              // 476
   * @param {Any} val                                                                                                 // 477
   * @returns {undefined}                                                                                             // 478
   *                                                                                                                  // 479
   * Sets the value for every place in the object that affects                                                        // 480
   * the requested generic key                                                                                        // 481
   */                                                                                                                 // 482
  self.setValueForGenericKey = function(key, val) {                                                                   // 483
    // We don't use getPositionForKey here because we want to be sure to                                              // 484
    // set the value for all positions if there are multiple.                                                         // 485
    for (var position in self._genericAffectedKeys) {                                                                 // 486
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                       // 487
        if (self._genericAffectedKeys[position] === key) {                                                            // 488
          self.setValueForPosition(position, val);                                                                    // 489
        }                                                                                                             // 490
      }                                                                                                               // 491
    }                                                                                                                 // 492
  };                                                                                                                  // 493
                                                                                                                      // 494
  /**                                                                                                                 // 495
   * @method MongoObject.getObject                                                                                    // 496
   * @returns {Object}                                                                                                // 497
   *                                                                                                                  // 498
   * Get the source object, potentially modified by other method calls on this                                        // 499
   * MongoObject instance.                                                                                            // 500
   */                                                                                                                 // 501
  self.getObject = function() {                                                                                       // 502
    return self._obj;                                                                                                 // 503
  };                                                                                                                  // 504
                                                                                                                      // 505
  /**                                                                                                                 // 506
   * @method MongoObject.getFlatObject                                                                                // 507
   * @returns {Object}                                                                                                // 508
   *                                                                                                                  // 509
   * Gets a flat object based on the MongoObject instance.                                                            // 510
   * In a flat object, the key is the name of the non-generic affectedKey,                                            // 511
   * with mongo dot notation if necessary, and the value is the value for                                             // 512
   * that key.                                                                                                        // 513
   *                                                                                                                  // 514
   * With `keepArrays: true`, we don't flatten within arrays. Currently                                               // 515
   * MongoDB does not see a key such as `a.0.b` and automatically assume                                              // 516
   * an array. Instead it would create an object with key "0" if there                                                // 517
   * wasn't already an array saved as the value of `a`, which is rarely                                               // 518
   * if ever what we actually want. To avoid this confusion, we                                                       // 519
   * set entire arrays.                                                                                               // 520
   */                                                                                                                 // 521
  self.getFlatObject = function(options) {                                                                            // 522
    options = options || {};                                                                                          // 523
    var newObj = {};                                                                                                  // 524
    _.each(self._affectedKeys, function(affectedKey, position) {                                                      // 525
      if (typeof affectedKey === "string" &&                                                                          // 526
        (options.keepArrays === true && !_.contains(self._positionsInsideArrays, position) && !_.contains(self._objectPositions, position)) ||
        (!options.keepArrays && !_.contains(self._parentPositions, position))                                         // 528
        ) {                                                                                                           // 529
        newObj[affectedKey] = self.getValueForPosition(position);                                                     // 530
      }                                                                                                               // 531
    });                                                                                                               // 532
    return newObj;                                                                                                    // 533
  };                                                                                                                  // 534
                                                                                                                      // 535
  /**                                                                                                                 // 536
   * @method MongoObject.affectsKey                                                                                   // 537
   * @param {String} key                                                                                              // 538
   * @returns {Object}                                                                                                // 539
   *                                                                                                                  // 540
   * Returns true if the non-generic key is affected by this object                                                   // 541
   */                                                                                                                 // 542
  self.affectsKey = function(key) {                                                                                   // 543
    return !!self.getPositionForKey(key);                                                                             // 544
  };                                                                                                                  // 545
                                                                                                                      // 546
  /**                                                                                                                 // 547
   * @method MongoObject.affectsGenericKey                                                                            // 548
   * @param {String} key                                                                                              // 549
   * @returns {Object}                                                                                                // 550
   *                                                                                                                  // 551
   * Returns true if the generic key is affected by this object                                                       // 552
   */                                                                                                                 // 553
  self.affectsGenericKey = function(key) {                                                                            // 554
    for (var position in self._genericAffectedKeys) {                                                                 // 555
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                       // 556
        if (self._genericAffectedKeys[position] === key) {                                                            // 557
          return true;                                                                                                // 558
        }                                                                                                             // 559
      }                                                                                                               // 560
    }                                                                                                                 // 561
    return false;                                                                                                     // 562
  };                                                                                                                  // 563
                                                                                                                      // 564
  /**                                                                                                                 // 565
   * @method MongoObject.affectsGenericKeyImplicit                                                                    // 566
   * @param {String} key                                                                                              // 567
   * @returns {Object}                                                                                                // 568
   *                                                                                                                  // 569
   * Like affectsGenericKey, but will return true if a child key is affected                                          // 570
   */                                                                                                                 // 571
  self.affectsGenericKeyImplicit = function(key) {                                                                    // 572
    for (var position in self._genericAffectedKeys) {                                                                 // 573
      if (self._genericAffectedKeys.hasOwnProperty(position)) {                                                       // 574
        var affectedKey = self._genericAffectedKeys[position];                                                        // 575
                                                                                                                      // 576
        // If the affected key is the test key                                                                        // 577
        if (affectedKey === key) {                                                                                    // 578
          return true;                                                                                                // 579
        }                                                                                                             // 580
                                                                                                                      // 581
        // If the affected key implies the test key because the affected key                                          // 582
        // starts with the test key followed by a period                                                              // 583
        if (affectedKey.substring(0, key.length + 1) === key + ".") {                                                 // 584
          return true;                                                                                                // 585
        }                                                                                                             // 586
                                                                                                                      // 587
        // If the affected key implies the test key because the affected key                                          // 588
        // starts with the test key and the test key ends with ".$"                                                   // 589
        var lastTwo = key.slice(-2);                                                                                  // 590
        if (lastTwo === ".$" && key.slice(0, -2) === affectedKey) {                                                   // 591
          return true;                                                                                                // 592
        }                                                                                                             // 593
      }                                                                                                               // 594
    }                                                                                                                 // 595
    return false;                                                                                                     // 596
  };                                                                                                                  // 597
};                                                                                                                    // 598
                                                                                                                      // 599
/** Takes a string representation of an object key and its value                                                      // 600
 *  and updates "obj" to contain that key with that value.                                                            // 601
 *                                                                                                                    // 602
 *  Example keys and results if val is 1:                                                                             // 603
 *    "a" -> {a: 1}                                                                                                   // 604
 *    "a[b]" -> {a: {b: 1}}                                                                                           // 605
 *    "a[b][0]" -> {a: {b: [1]}}                                                                                      // 606
 *    "a[b.0.c]" -> {a: {'b.0.c': 1}}                                                                                 // 607
 */                                                                                                                   // 608
                                                                                                                      // 609
/** Takes a string representation of an object key and its value                                                      // 610
 *  and updates "obj" to contain that key with that value.                                                            // 611
 *                                                                                                                    // 612
 *  Example keys and results if val is 1:                                                                             // 613
 *    "a" -> {a: 1}                                                                                                   // 614
 *    "a[b]" -> {a: {b: 1}}                                                                                           // 615
 *    "a[b][0]" -> {a: {b: [1]}}                                                                                      // 616
 *    "a[b.0.c]" -> {a: {'b.0.c': 1}}                                                                                 // 617
 *                                                                                                                    // 618
 * @param {any} val                                                                                                   // 619
 * @param {String} key                                                                                                // 620
 * @param {Object} obj                                                                                                // 621
 * @returns {undefined}                                                                                               // 622
 */                                                                                                                   // 623
MongoObject.expandKey = function(val, key, obj) {                                                                     // 624
  var nextPiece, subkey, subkeys = key.split("["), current = obj;                                                     // 625
  for (var i = 0, ln = subkeys.length; i < ln; i++) {                                                                 // 626
    subkey = subkeys[i];                                                                                              // 627
    if (subkey.slice(-1) === "]") {                                                                                   // 628
      subkey = subkey.slice(0, -1);                                                                                   // 629
    }                                                                                                                 // 630
    if (i === ln - 1) {                                                                                               // 631
      //last iteration; time to set the value; always overwrite                                                       // 632
      current[subkey] = val;                                                                                          // 633
      //if val is undefined, delete the property                                                                      // 634
      if (val === void 0)                                                                                             // 635
        delete current[subkey];                                                                                       // 636
    } else {                                                                                                          // 637
      //see if the next piece is a number                                                                             // 638
      nextPiece = subkeys[i + 1];                                                                                     // 639
      nextPiece = parseInt(nextPiece, 10);                                                                            // 640
      if (!current[subkey]) {                                                                                         // 641
        current[subkey] = isNaN(nextPiece) ? {} : [];                                                                 // 642
      }                                                                                                               // 643
    }                                                                                                                 // 644
    current = current[subkey];                                                                                        // 645
  }                                                                                                                   // 646
};                                                                                                                    // 647
                                                                                                                      // 648
MongoObject._keyToPosition = function keyToPosition(key, wrapAll) {                                                   // 649
  var position = '';                                                                                                  // 650
  _.each(key.split("."), function (piece, i) {                                                                        // 651
    if (i === 0 && !wrapAll) {                                                                                        // 652
      position += piece;                                                                                              // 653
    } else {                                                                                                          // 654
      position += "[" + piece + "]";                                                                                  // 655
    }                                                                                                                 // 656
  });                                                                                                                 // 657
  return position;                                                                                                    // 658
};                                                                                                                    // 659
                                                                                                                      // 660
/**                                                                                                                   // 661
 * @method MongoObject._positionToKey                                                                                 // 662
 * @param {String} position                                                                                           // 663
 * @returns {String} The key that this position in an object would affect.                                            // 664
 *                                                                                                                    // 665
 * This is different from MongoObject.prototype.getKeyForPosition in that                                             // 666
 * this method does not depend on the requested position actually being                                               // 667
 * present in any particular MongoObject.                                                                             // 668
 */                                                                                                                   // 669
MongoObject._positionToKey = function positionToKey(position) {                                                       // 670
  //XXX Probably a better way to do this, but this is                                                                 // 671
  //foolproof for now.                                                                                                // 672
  var mDoc = new MongoObject({});                                                                                     // 673
  mDoc.setValueForPosition(position, 1); //value doesn't matter                                                       // 674
  var key = mDoc.getKeyForPosition(position);                                                                         // 675
  mDoc = null;                                                                                                        // 676
  return key;                                                                                                         // 677
};                                                                                                                    // 678
                                                                                                                      // 679
var isArray = _.isArray;                                                                                              // 680
                                                                                                                      // 681
var isObject = function(obj) {                                                                                        // 682
  return obj === Object(obj);                                                                                         // 683
};                                                                                                                    // 684
                                                                                                                      // 685
// getPrototypeOf polyfill                                                                                            // 686
if (typeof Object.getPrototypeOf !== "function") {                                                                    // 687
  if (typeof "".__proto__ === "object") {                                                                             // 688
    Object.getPrototypeOf = function(object) {                                                                        // 689
      return object.__proto__;                                                                                        // 690
    };                                                                                                                // 691
  } else {                                                                                                            // 692
    Object.getPrototypeOf = function(object) {                                                                        // 693
      // May break if the constructor has been tampered with                                                          // 694
      return object.constructor.prototype;                                                                            // 695
    };                                                                                                                // 696
  }                                                                                                                   // 697
}                                                                                                                     // 698
                                                                                                                      // 699
/* Tests whether "obj" is an Object as opposed to                                                                     // 700
 * something that inherits from Object                                                                                // 701
 *                                                                                                                    // 702
 * @param {any} obj                                                                                                   // 703
 * @returns {Boolean}                                                                                                 // 704
 */                                                                                                                   // 705
var isBasicObject = function(obj) {                                                                                   // 706
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;                                            // 707
};                                                                                                                    // 708
                                                                                                                      // 709
/* Takes a specific string that uses mongo-style dot notation                                                         // 710
 * and returns a generic string equivalent. Replaces all numeric                                                      // 711
 * "pieces" with a dollar sign ($).                                                                                   // 712
 *                                                                                                                    // 713
 * @param {type} name                                                                                                 // 714
 * @returns {unresolved}                                                                                              // 715
 */                                                                                                                   // 716
var makeGeneric = function makeGeneric(name) {                                                                        // 717
  if (typeof name !== "string")                                                                                       // 718
    return null;                                                                                                      // 719
  return name.replace(/\.[0-9]+\./g, '.$.').replace(/\.[0-9]+/g, '.$');                                               // 720
};                                                                                                                    // 721
                                                                                                                      // 722
var appendAffectedKey = function appendAffectedKey(affectedKey, key) {                                                // 723
  if (key === "$each") {                                                                                              // 724
    return affectedKey;                                                                                               // 725
  } else {                                                                                                            // 726
    return (affectedKey ? affectedKey + "." + key : key);                                                             // 727
  }                                                                                                                   // 728
};                                                                                                                    // 729
                                                                                                                      // 730
// Extracts operator piece, if present, from position string                                                          // 731
var extractOp = function extractOp(position) {                                                                        // 732
  var firstPositionPiece = position.slice(0, position.indexOf("["));                                                  // 733
  return (firstPositionPiece.substring(0, 1) === "$") ? firstPositionPiece : null;                                    // 734
};                                                                                                                    // 735
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/simple-schema/simple-schema.js                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 1
  S = Npm.require("string");                                                                                          // 2
}                                                                                                                     // 3
if (Meteor.isClient) {                                                                                                // 4
  S = window.S;                                                                                                       // 5
}                                                                                                                     // 6
                                                                                                                      // 7
var schemaDefinition = {                                                                                              // 8
  type: Match.Any,                                                                                                    // 9
  label: Match.Optional(Match.OneOf(String, Function)),                                                               // 10
  optional: Match.Optional(Boolean),                                                                                  // 11
  min: Match.Optional(Match.OneOf(Number, Date, Function)),                                                           // 12
  max: Match.Optional(Match.OneOf(Number, Date, Function)),                                                           // 13
  minCount: Match.Optional(Number),                                                                                   // 14
  maxCount: Match.Optional(Number),                                                                                   // 15
  allowedValues: Match.Optional([Match.Any]),                                                                         // 16
  valueIsAllowed: Match.Optional(Function), //TODO deprecate this in favor of custom?                                 // 17
  decimal: Match.Optional(Boolean),                                                                                   // 18
  regEx: Match.Optional(Match.OneOf(RegExp, [RegExp])),                                                               // 19
  custom: Match.Optional(Function),                                                                                   // 20
  blackbox: Match.Optional(Boolean),                                                                                  // 21
  autoValue: Match.Optional(Function),                                                                                // 22
  defaultValue: Match.Optional(Match.Any)                                                                             // 23
};                                                                                                                    // 24
                                                                                                                      // 25
//exported                                                                                                            // 26
SimpleSchema = function(schemas, options) {                                                                           // 27
  var self = this;                                                                                                    // 28
  var firstLevelSchemaKeys = [];                                                                                      // 29
  var requiredSchemaKeys = [], firstLevelRequiredSchemaKeys = [];                                                     // 30
  var valueIsAllowedSchemaKeys = [], firstLevelValueIsAllowedSchemaKeys = [];                                         // 31
  var customSchemaKeys = [], firstLevelCustomSchemaKeys = [];                                                         // 32
  var fieldNameRoot;                                                                                                  // 33
  options = options || {};                                                                                            // 34
  schemas = schemas || {};                                                                                            // 35
                                                                                                                      // 36
  if (!_.isArray(schemas)) {                                                                                          // 37
    schemas = [schemas];                                                                                              // 38
  }                                                                                                                   // 39
                                                                                                                      // 40
  // adjust and store a copy of the schema definitions                                                                // 41
  self._schema = mergeSchemas(schemas);                                                                               // 42
                                                                                                                      // 43
  // store the list of defined keys for speedier checking                                                             // 44
  self._schemaKeys = [];                                                                                              // 45
                                                                                                                      // 46
  // store autoValue functions by key                                                                                 // 47
  self._autoValues = {};                                                                                              // 48
                                                                                                                      // 49
  // store the list of blackbox keys for passing to MongoObject constructor                                           // 50
  self._blackboxKeys = [];                                                                                            // 51
                                                                                                                      // 52
  // a place to store custom validators for this instance                                                             // 53
  self._validators = [];                                                                                              // 54
                                                                                                                      // 55
  // a place to store custom error messages for this schema                                                           // 56
  self._messages = {};                                                                                                // 57
                                                                                                                      // 58
  self._depsMessages = new Deps.Dependency;                                                                           // 59
  self._depsLabels = {};                                                                                              // 60
                                                                                                                      // 61
  var overrideMessages = {};                                                                                          // 62
  _.each(self._schema, function(definition, fieldName) {                                                              // 63
    // Validate the field definition                                                                                  // 64
    if (!Match.test(definition, schemaDefinition)) {                                                                  // 65
      throw new Error('Invalid definition for ' + fieldName + ' field.');                                             // 66
    }                                                                                                                 // 67
                                                                                                                      // 68
    fieldNameRoot = fieldName.split(".")[0];                                                                          // 69
                                                                                                                      // 70
    self._schemaKeys.push(fieldName);                                                                                 // 71
                                                                                                                      // 72
    // We support defaultValue shortcut by converting it immediately into an                                          // 73
    // autoValue.                                                                                                     // 74
    if ('defaultValue' in definition) {                                                                               // 75
      if ('autoValue' in definition) {                                                                                // 76
        console.warn('SimpleSchema: Found both autoValue and defaultValue options for "' + fieldName + '". Ignoring defaultValue.');
      } else {                                                                                                        // 78
        if (fieldName.slice(-2) === ".$") {                                                                           // 79
          throw new Error('An array item field (one that ends with ".$") cannot have defaultValue.')                  // 80
        }                                                                                                             // 81
        self._autoValues[fieldName] = (function defineAutoValue(v) {                                                  // 82
          return function() {                                                                                         // 83
            if (this.operator === null && !this.isSet) {                                                              // 84
              return v;                                                                                               // 85
            }                                                                                                         // 86
          };                                                                                                          // 87
        })(definition.defaultValue);                                                                                  // 88
      }                                                                                                               // 89
    }                                                                                                                 // 90
                                                                                                                      // 91
    if ('autoValue' in definition) {                                                                                  // 92
      if (fieldName.slice(-2) === ".$") {                                                                             // 93
        throw new Error('An array item field (one that ends with ".$") cannot have autoValue.')                       // 94
      }                                                                                                               // 95
      self._autoValues[fieldName] = definition.autoValue;                                                             // 96
    }                                                                                                                 // 97
                                                                                                                      // 98
    self._depsLabels[fieldName] = new Deps.Dependency;                                                                // 99
                                                                                                                      // 100
    if (definition.blackbox === true) {                                                                               // 101
      self._blackboxKeys.push(fieldName);                                                                             // 102
    }                                                                                                                 // 103
                                                                                                                      // 104
    if (!_.contains(firstLevelSchemaKeys, fieldNameRoot)) {                                                           // 105
      firstLevelSchemaKeys.push(fieldNameRoot);                                                                       // 106
      if (!definition.optional) {                                                                                     // 107
        firstLevelRequiredSchemaKeys.push(fieldNameRoot);                                                             // 108
      }                                                                                                               // 109
                                                                                                                      // 110
      if (definition.valueIsAllowed) {                                                                                // 111
        firstLevelValueIsAllowedSchemaKeys.push(fieldNameRoot);                                                       // 112
      }                                                                                                               // 113
                                                                                                                      // 114
      if (definition.custom) {                                                                                        // 115
        firstLevelCustomSchemaKeys.push(fieldNameRoot);                                                               // 116
      }                                                                                                               // 117
    }                                                                                                                 // 118
                                                                                                                      // 119
    if (!definition.optional) {                                                                                       // 120
      requiredSchemaKeys.push(fieldName);                                                                             // 121
    }                                                                                                                 // 122
                                                                                                                      // 123
    if (definition.valueIsAllowed) {                                                                                  // 124
      valueIsAllowedSchemaKeys.push(fieldName);                                                                       // 125
    }                                                                                                                 // 126
                                                                                                                      // 127
    if (definition.custom) {                                                                                          // 128
      customSchemaKeys.push(fieldName);                                                                               // 129
    }                                                                                                                 // 130
                                                                                                                      // 131
    // Set up nicer error messages for the built-in regEx.                                                            // 132
    // Users will need to override these at the schema-specific level,                                                // 133
    // which could be undesirable, so we provide an option to                                                         // 134
    // skip this.                                                                                                     // 135
    if (options.defineBuiltInRegExMessages !== false) {                                                               // 136
      if (definition.regEx === SimpleSchema.RegEx.Email) {                                                            // 137
        overrideMessages['regEx ' + fieldName] = "[label] must be a valid e-mail address";                            // 138
      } else if (definition.regEx === SimpleSchema.RegEx.Url) {                                                       // 139
        overrideMessages['regEx ' + fieldName] = "[label] must be a valid URL";                                       // 140
      } else if (_.isArray(definition.regEx)) {                                                                       // 141
        _.each(definition.regEx, function(re, i) {                                                                    // 142
          if (re === SimpleSchema.RegEx.Email) {                                                                      // 143
            overrideMessages['regEx.' + i + ' ' + fieldName] = "[label] must be a valid e-mail address";              // 144
          } else if (re === SimpleSchema.RegEx.Url) {                                                                 // 145
            overrideMessages['regEx.' + i + ' ' + fieldName] = "[label] must be a valid URL";                         // 146
          }                                                                                                           // 147
        });                                                                                                           // 148
      }                                                                                                               // 149
    }                                                                                                                 // 150
                                                                                                                      // 151
  });                                                                                                                 // 152
                                                                                                                      // 153
  // Set override messages                                                                                            // 154
  self.messages(overrideMessages);                                                                                    // 155
                                                                                                                      // 156
  // Cache these lists                                                                                                // 157
  self._firstLevelSchemaKeys = firstLevelSchemaKeys;                                                                  // 158
  //required                                                                                                          // 159
  self._requiredSchemaKeys = requiredSchemaKeys;                                                                      // 160
  self._firstLevelRequiredSchemaKeys = firstLevelRequiredSchemaKeys;                                                  // 161
  self._requiredObjectKeys = getObjectKeys(self._schema, requiredSchemaKeys);                                         // 162
  //valueIsAllowed                                                                                                    // 163
  self._valueIsAllowedSchemaKeys = valueIsAllowedSchemaKeys;                                                          // 164
  self._firstLevelValueIsAllowedSchemaKeys = firstLevelValueIsAllowedSchemaKeys;                                      // 165
  self._valueIsAllowedObjectKeys = getObjectKeys(self._schema, valueIsAllowedSchemaKeys);                             // 166
  //custom                                                                                                            // 167
  self._customSchemaKeys = customSchemaKeys;                                                                          // 168
  self._firstLevelCustomSchemaKeys = firstLevelCustomSchemaKeys;                                                      // 169
  self._customObjectKeys = getObjectKeys(self._schema, customSchemaKeys);                                             // 170
                                                                                                                      // 171
  // We will store named validation contexts here                                                                     // 172
  self._validationContexts = {};                                                                                      // 173
};                                                                                                                    // 174
                                                                                                                      // 175
// This allows other packages or users to extend the schema                                                           // 176
// definition options that are supported.                                                                             // 177
SimpleSchema.extendOptions = function(options) {                                                                      // 178
  _.extend(schemaDefinition, options);                                                                                // 179
};                                                                                                                    // 180
                                                                                                                      // 181
// regex for email validation after RFC 5322                                                                          // 182
// the obsolete double quotes and square brackets are left out                                                        // 183
// read: http://www.regular-expressions.info/email.html                                                               // 184
var RX_MAIL_NAME = '[a-z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*';                          // 185
// this domain regex matches all domains that have at least one .                                                     // 186
// sadly IPv4 Adresses will be caught too but technically those are valid domains                                     // 187
// this expression is extracted from the original RFC 5322 mail expression                                            // 188
// a modification enforces that the tld consists only of characters                                                   // 189
var RX_DOMAIN = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z](?:[a-z-]*[a-z])?';                                      // 190
// this domain regex matches everythign that could be a domain in intranet                                            // 191
// that means "localhost" is a valid domain                                                                           // 192
var RX_NAME_DOMAIN = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\\.|$))+';                                                 // 193
// strict IPv4 expression which allows 0-255 per oktett                                                               // 194
var RX_IPv4 = '(?:(?:[0-1]?\\d{1,2}|2[0-4]\\d|25[0-5])(?:\\.|$)){4}';                                                 // 195
// strict IPv6 expression which allows (and validates) all shortcuts                                                  // 196
var RX_IPv6 = '(?:(?:[\\dA-Fa-f]{1,4}(?::|$)){8}' // full adress                                                      // 197
  + '|(?=(?:[^:\\s]|:[^:\\s])*::(?:[^:\\s]|:[^:\\s])*$)' // or min/max one '::'                                       // 198
  + '[\\dA-Fa-f]{0,4}(?:::?(?:[\\dA-Fa-f]{1,4}|$)){1,6})'; // and short adress                                        // 199
// this allows domains (also localhost etc) and ip adresses                                                           // 200
var RX_WEAK_DOMAIN = '(?:' + [RX_NAME_DOMAIN,RX_IPv4,RX_IPv6].join('|') + ')';                                        // 201
                                                                                                                      // 202
SimpleSchema.RegEx = {                                                                                                // 203
  Email: new RegExp('^' + RX_MAIL_NAME + '@' + RX_DOMAIN + '$'),                                                      // 204
  WeakEmail: new RegExp('^' + RX_MAIL_NAME + '@' + RX_WEAK_DOMAIN + '$'),                                             // 205
                                                                                                                      // 206
  Domain: new RegExp('^' + RX_DOMAIN + '$'),                                                                          // 207
  WeakDomain: new RegExp('^' + RX_WEAK_DOMAIN + '$'),                                                                 // 208
                                                                                                                      // 209
  IP: new RegExp('^(?:' + RX_IPv4 + '|' + RX_IPv6 + ')$'),                                                            // 210
  IPv4: new RegExp('^' + RX_IPv4 + '$'),                                                                              // 211
  IPv6: new RegExp('^' + RX_IPv6 + '$'),                                                                              // 212
  // URL RegEx from https://gist.github.com/dperini/729294                                                            // 213
  // http://mathiasbynens.be/demo/url-regex                                                                           // 214
  Url: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i,
  // unique id from the random package also used by minimongo                                                         // 216
  // character list: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L88                // 217
  // string length: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L143                // 218
  Id: /^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{17}$/                                               // 219
};                                                                                                                    // 220
                                                                                                                      // 221
SimpleSchema._makeGeneric = function(name) {                                                                          // 222
  if (typeof name !== "string")                                                                                       // 223
    return null;                                                                                                      // 224
                                                                                                                      // 225
  return name.replace(/\.[0-9]+\./g, '.$.').replace(/\.[0-9]+/g, '.$');                                               // 226
};                                                                                                                    // 227
                                                                                                                      // 228
SimpleSchema._depsGlobalMessages = new Deps.Dependency;                                                               // 229
                                                                                                                      // 230
// exported for backwards compatibility, deprecated                                                                   // 231
SchemaRegEx = SimpleSchema.RegEx;                                                                                     // 232
                                                                                                                      // 233
// Inherit from Match.Where                                                                                           // 234
// This allow SimpleSchema instance to be recognized as a Match.Where instance as well                                // 235
// as a SimpleSchema instance                                                                                         // 236
SimpleSchema.prototype = new Match.Where();                                                                           // 237
                                                                                                                      // 238
// If an object is an instance of Match.Where, Meteor built-in check API will look at                                 // 239
// the function named `condition` and will pass it the document to validate                                           // 240
SimpleSchema.prototype.condition = function(obj) {                                                                    // 241
  var self = this;                                                                                                    // 242
                                                                                                                      // 243
  //determine whether obj is a modifier                                                                               // 244
  var isModifier, isNotModifier;                                                                                      // 245
  _.each(obj, function(val, key) {                                                                                    // 246
    if (key.substring(0, 1) === "$") {                                                                                // 247
      isModifier = true;                                                                                              // 248
    } else {                                                                                                          // 249
      isNotModifier = true;                                                                                           // 250
    }                                                                                                                 // 251
  });                                                                                                                 // 252
                                                                                                                      // 253
  if (isModifier && isNotModifier)                                                                                    // 254
    throw new Match.Error("Object cannot contain modifier operators alongside other keys");                           // 255
                                                                                                                      // 256
  if (!self.newContext().validate(obj, {modifier: isModifier, filter: false, autoConvert: false}))                    // 257
    throw new Match.Error("One or more properties do not match the schema.");                                         // 258
                                                                                                                      // 259
  return true;                                                                                                        // 260
};                                                                                                                    // 261
                                                                                                                      // 262
function logInvalidKeysForContext(context, name) {                                                                    // 263
  Meteor.startup(function() {                                                                                         // 264
    Deps.autorun(function() {                                                                                         // 265
      if (!context.isValid()) {                                                                                       // 266
        console.log('SimpleSchema invalid keys for "' + name + '" context:', context.invalidKeys());                  // 267
      }                                                                                                               // 268
    });                                                                                                               // 269
  });                                                                                                                 // 270
}                                                                                                                     // 271
                                                                                                                      // 272
SimpleSchema.prototype.namedContext = function(name) {                                                                // 273
  var self = this;                                                                                                    // 274
  if (typeof name !== "string") {                                                                                     // 275
    name = "default";                                                                                                 // 276
  }                                                                                                                   // 277
  if (!self._validationContexts[name]) {                                                                              // 278
    self._validationContexts[name] = new SimpleSchemaValidationContext(self);                                         // 279
                                                                                                                      // 280
    // In debug mode, log all invalid key errors to the browser console                                               // 281
    if (SimpleSchema.debug && Meteor.isClient) {                                                                      // 282
      Deps.nonreactive(function() {                                                                                   // 283
        logInvalidKeysForContext(self._validationContexts[name], name);                                               // 284
      });                                                                                                             // 285
    }                                                                                                                 // 286
  }                                                                                                                   // 287
  return self._validationContexts[name];                                                                              // 288
};                                                                                                                    // 289
                                                                                                                      // 290
// Global custom validators                                                                                           // 291
SimpleSchema._validators = [];                                                                                        // 292
SimpleSchema.addValidator = function(func) {                                                                          // 293
  SimpleSchema._validators.push(func);                                                                                // 294
};                                                                                                                    // 295
                                                                                                                      // 296
// Instance custom validators                                                                                         // 297
// validator is deprecated; use addValidator                                                                          // 298
SimpleSchema.prototype.addValidator = SimpleSchema.prototype.validator = function(func) {                             // 299
  this._validators.push(func);                                                                                        // 300
};                                                                                                                    // 301
                                                                                                                      // 302
/**                                                                                                                   // 303
 * @method SimpleSchema.prototype.clean                                                                               // 304
 * @param {Object} doc - Document or modifier to clean. Referenced object will be modified in place.                  // 305
 * @param {Object} [options]                                                                                          // 306
 * @param {Boolean} [options.filter=true] - Do filtering?                                                             // 307
 * @param {Boolean} [options.autoConvert=true] - Do automatic type converting?                                        // 308
 * @param {Boolean} [options.removeEmptyStrings=true] - Remove keys in normal object or $set where the value is an empty string?
 * @param {Boolean} [options.getAutoValues=true] - Inject automatic and default values?                               // 310
 * @param {Boolean} [options.isModifier=false] - Is doc a modifier object?                                            // 311
 * @param {Object} [options.extendAutoValueContext] - This object will be added to the `this` context of autoValue functions.
 * @returns {Object} The modified doc.                                                                                // 313
 *                                                                                                                    // 314
 * Cleans a document or modifier object. By default, will filter, automatically                                       // 315
 * type convert where possible, and inject automatic/default values. Use the options                                  // 316
 * to skip one or more of these.                                                                                      // 317
 */                                                                                                                   // 318
SimpleSchema.prototype.clean = function(doc, options) {                                                               // 319
  var self = this;                                                                                                    // 320
                                                                                                                      // 321
  // By default, doc will be filtered and autoconverted                                                               // 322
  options = _.extend({                                                                                                // 323
    filter: true,                                                                                                     // 324
    autoConvert: true,                                                                                                // 325
    removeEmptyStrings: true,                                                                                         // 326
    getAutoValues: true,                                                                                              // 327
    isModifier: false,                                                                                                // 328
    extendAutoValueContext: {}                                                                                        // 329
  }, options || {});                                                                                                  // 330
                                                                                                                      // 331
  // Convert $pushAll (deprecated) to $push with $each                                                                // 332
  if ("$pushAll" in doc) {                                                                                            // 333
    console.warn("SimpleSchema.clean: $pushAll is deprecated; converting to $push with $each");                       // 334
    doc.$push = doc.$push || {};                                                                                      // 335
    for (var field in doc.$pushAll) {                                                                                 // 336
      doc.$push[field] = doc.$push[field] || {};                                                                      // 337
      doc.$push[field].$each = doc.$push[field].$each || [];                                                          // 338
      for (var i = 0, ln = doc.$pushAll[field].length; i < ln; i++) {                                                 // 339
        doc.$push[field].$each.push(doc.$pushAll[field][i]);                                                          // 340
      }                                                                                                               // 341
      delete doc.$pushAll;                                                                                            // 342
    }                                                                                                                 // 343
  }                                                                                                                   // 344
                                                                                                                      // 345
  var mDoc = new MongoObject(doc, self._blackboxKeys);                                                                // 346
                                                                                                                      // 347
  // Filter out anything that would affect keys not defined                                                           // 348
  // or implied by the schema                                                                                         // 349
  options.filter && mDoc.filterGenericKeys(function(genericKey) {                                                     // 350
    var allowed = self.allowsKey(genericKey);                                                                         // 351
    if (!allowed && SimpleSchema.debug) {                                                                             // 352
      console.info('SimpleSchema.clean: filtered out value that would have affected key "' + genericKey + '", which is not allowed by the schema');
    }                                                                                                                 // 354
    return allowed;                                                                                                   // 355
  });                                                                                                                 // 356
                                                                                                                      // 357
  // Autoconvert values if requested and if possible                                                                  // 358
  (options.autoConvert || options.removeEmptyStrings) && mDoc.forEachNode(function() {                                // 359
    if (this.genericKey) {                                                                                            // 360
      var def = self._schema[this.genericKey];                                                                        // 361
      var val = this.value;                                                                                           // 362
      if (def && val !== void 0) {                                                                                    // 363
        var wasAutoConverted = false;                                                                                 // 364
        if (options.autoConvert) {                                                                                    // 365
          var newVal = typeconvert(val, def.type);                                                                    // 366
          if (newVal !== void 0 && newVal !== val) {                                                                  // 367
            SimpleSchema.debug && console.info('SimpleSchema.clean: autoconverted value ' + val + ' from ' + typeof val + ' to ' + typeof newVal + ' for ' + this.genericKey);
            this.updateValue(newVal);                                                                                 // 369
            wasAutoConverted = true;                                                                                  // 370
            // remove empty strings                                                                                   // 371
            if (options.removeEmptyStrings && (!this.operator || this.operator === "$set") && typeof newVal === "string" && !newVal.length) {
              this.remove();                                                                                          // 373
            }                                                                                                         // 374
          }                                                                                                           // 375
        }                                                                                                             // 376
        // remove empty strings                                                                                       // 377
        if (options.removeEmptyStrings && !wasAutoConverted && (!this.operator || this.operator === "$set") && typeof val === "string" && !val.length) {
          this.remove();                                                                                              // 379
        }                                                                                                             // 380
      }                                                                                                               // 381
    }                                                                                                                 // 382
  }, {endPointsOnly: false});                                                                                         // 383
                                                                                                                      // 384
  // Set automatic values                                                                                             // 385
  options.getAutoValues && getAutoValues.call(self, mDoc, options.isModifier, options.extendAutoValueContext);        // 386
                                                                                                                      // 387
  return doc;                                                                                                         // 388
};                                                                                                                    // 389
                                                                                                                      // 390
// Returns the entire schema object or just the definition for one key                                                // 391
// in the schema.                                                                                                     // 392
SimpleSchema.prototype.schema = function(key) {                                                                       // 393
  var self = this;                                                                                                    // 394
  // if not null or undefined (more specific)                                                                         // 395
  if (key != null) {                                                                                                  // 396
    return self._schema[SimpleSchema._makeGeneric(key)];                                                              // 397
  } else {                                                                                                            // 398
    return self._schema;                                                                                              // 399
  }                                                                                                                   // 400
};                                                                                                                    // 401
                                                                                                                      // 402
// Use to dynamically change the schema labels.                                                                       // 403
SimpleSchema.prototype.labels = function(labels) {                                                                    // 404
  var self = this;                                                                                                    // 405
  _.each(labels, function(label, fieldName) {                                                                         // 406
    if (!_.isString(label) && !_.isFunction(label))                                                                   // 407
      return;                                                                                                         // 408
                                                                                                                      // 409
    if (!(fieldName in self._schema))                                                                                 // 410
      return;                                                                                                         // 411
                                                                                                                      // 412
    self._schema[fieldName].label = label;                                                                            // 413
    self._depsLabels[fieldName] && self._depsLabels[fieldName].changed();                                             // 414
  });                                                                                                                 // 415
};                                                                                                                    // 416
                                                                                                                      // 417
// should be used to safely get a label as string                                                                     // 418
SimpleSchema.prototype.label = function(key) {                                                                        // 419
  var self = this                                                                                                     // 420
  key = SimpleSchema._makeGeneric(key);                                                                               // 421
  var def = self.schema(key);                                                                                         // 422
  // if there is no field defined use all fields                                                                      // 423
  if (key == null) {                                                                                                  // 424
    var result = {};                                                                                                  // 425
    _.each(def, function(def, fieldName) {                                                                            // 426
      result[fieldName] = self.label(fieldName);                                                                      // 427
    });                                                                                                               // 428
    return result;                                                                                                    // 429
    // if a field was defined get that                                                                                // 430
  } else if (def != null) {                                                                                           // 431
    self._depsLabels[key] && self._depsLabels[key].depend();                                                          // 432
    var label = def.label;                                                                                            // 433
    return _.isFunction(label) ? label.call(def) : (label || inflectedLabel(key));                                    // 434
  } else {                                                                                                            // 435
    return null;                                                                                                      // 436
  }                                                                                                                   // 437
};                                                                                                                    // 438
                                                                                                                      // 439
// Global messages                                                                                                    // 440
                                                                                                                      // 441
SimpleSchema._globalMessages = {                                                                                      // 442
  required: "[label] is required",                                                                                    // 443
  minString: "[label] must be at least [min] characters",                                                             // 444
  maxString: "[label] cannot exceed [max] characters",                                                                // 445
  minNumber: "[label] must be at least [min]",                                                                        // 446
  maxNumber: "[label] cannot exceed [max]",                                                                           // 447
  minDate: "[label] must be on or before [min]",                                                                      // 448
  maxDate: "[label] cannot be after [max]",                                                                           // 449
  minCount: "You must specify at least [minCount] values",                                                            // 450
  maxCount: "You cannot specify more than [maxCount] values",                                                         // 451
  noDecimal: "[label] must be an integer",                                                                            // 452
  notAllowed: "[value] is not an allowed value",                                                                      // 453
  expectedString: "[label] must be a string",                                                                         // 454
  expectedNumber: "[label] must be a number",                                                                         // 455
  expectedBoolean: "[label] must be a boolean",                                                                       // 456
  expectedArray: "[label] must be an array",                                                                          // 457
  expectedObject: "[label] must be an object",                                                                        // 458
  expectedConstructor: "[label] must be a [type]",                                                                    // 459
  regEx: "[label] failed regular expression validation",                                                              // 460
  keyNotInSchema: "[label] is not allowed by the schema"                                                              // 461
};                                                                                                                    // 462
                                                                                                                      // 463
SimpleSchema.messages = function(messages) {                                                                          // 464
  _.extend(SimpleSchema._globalMessages, messages);                                                                   // 465
  SimpleSchema._depsGlobalMessages.changed();                                                                         // 466
};                                                                                                                    // 467
                                                                                                                      // 468
// Schema-specific messages                                                                                           // 469
                                                                                                                      // 470
SimpleSchema.prototype.messages = function(messages) {                                                                // 471
  var self = this;                                                                                                    // 472
  _.extend(self._messages, messages);                                                                                 // 473
  self._depsMessages.changed();                                                                                       // 474
};                                                                                                                    // 475
                                                                                                                      // 476
// Returns a string message for the given error type and key. Uses the                                                // 477
// def and value arguments to fill in placeholders in the error messages.                                             // 478
SimpleSchema.prototype.messageForError = function(type, key, def, value) {                                            // 479
  var self = this;                                                                                                    // 480
                                                                                                                      // 481
  // Prep some strings to be used when finding the correct message for this error                                     // 482
  var typePlusKey = type + " " + key;                                                                                 // 483
  var genericKey = SimpleSchema._makeGeneric(key);                                                                    // 484
  var typePlusGenKey = type + " " + genericKey;                                                                       // 485
  var firstTypePeriod = type.indexOf(".");                                                                            // 486
  var genType;                                                                                                        // 487
  var genTypePlusKey;                                                                                                 // 488
  var genTypePlusGenKey;                                                                                              // 489
  if (firstTypePeriod !== -1) {                                                                                       // 490
    genType = type.substring(0, firstTypePeriod);                                                                     // 491
    genTypePlusKey = genType + " " + key;                                                                             // 492
    genTypePlusGenKey = genType + " " + genericKey;                                                                   // 493
  }                                                                                                                   // 494
                                                                                                                      // 495
  // reactively update when message templates or labels are changed                                                   // 496
  SimpleSchema._depsGlobalMessages.depend();                                                                          // 497
  self._depsMessages.depend();                                                                                        // 498
  self._depsLabels[key] && self._depsLabels[key].depend();                                                            // 499
                                                                                                                      // 500
  // Try finding the correct message to use at various levels, from most                                              // 501
  // specific to least specific.                                                                                      // 502
  //                                                                                                                  // 503
  // (1) Use schema-specific message for specific key, specific type                                                  // 504
  // (2) Use schema-specific message for generic key, specific type                                                   // 505
  // (3) Use schema-specific message for specific type                                                                // 506
  var message = self._messages[typePlusKey] || self._messages[typePlusGenKey] || self._messages[type];                // 507
  // (4) Use schema-specific message for specific key, general type                                                   // 508
  // (5) Use schema-specific message for generic key, general type                                                    // 509
  // (6) Use schema-specific message for general type                                                                 // 510
  if (!message && genType) {                                                                                          // 511
    message = self._messages[genTypePlusKey] || self._messages[genTypePlusGenKey] || self._messages[genType];         // 512
  }                                                                                                                   // 513
  // (7) Use global message for specific key, specific type                                                           // 514
  // (8) Use global message for generic key, specific type                                                            // 515
  // (9) Use global message for specific type                                                                         // 516
  if (!message) {                                                                                                     // 517
    message = SimpleSchema._globalMessages[typePlusKey] || SimpleSchema._globalMessages[typePlusGenKey] || SimpleSchema._globalMessages[type];
  }                                                                                                                   // 519
  // (10) Use global message for specific key, general type                                                           // 520
  // (11) Use global message for generic key, general type                                                            // 521
  // (12) Use global message for general type                                                                         // 522
  if (!message && genType) {                                                                                          // 523
    message = SimpleSchema._globalMessages[genTypePlusKey] || SimpleSchema._globalMessages[genTypePlusGenKey] || SimpleSchema._globalMessages[genType];
  }                                                                                                                   // 525
  if (!message) {                                                                                                     // 526
    return "Unknown validation error";                                                                                // 527
  }                                                                                                                   // 528
                                                                                                                      // 529
  // Now replace all placeholders in the message with the correct values                                              // 530
  def = def || self.schema(key) || {};                                                                                // 531
  message = message.replace("[label]", self.label(key));                                                              // 532
  if (typeof def.minCount !== "undefined") {                                                                          // 533
    message = message.replace("[minCount]", def.minCount);                                                            // 534
  }                                                                                                                   // 535
  if (typeof def.maxCount !== "undefined") {                                                                          // 536
    message = message.replace("[maxCount]", def.maxCount);                                                            // 537
  }                                                                                                                   // 538
  if (value !== void 0 && value !== null) {                                                                           // 539
    message = message.replace("[value]", value.toString());                                                           // 540
  }                                                                                                                   // 541
  var min = def.min;                                                                                                  // 542
  var max = def.max;                                                                                                  // 543
  if (typeof min === "function") {                                                                                    // 544
    min = min();                                                                                                      // 545
  }                                                                                                                   // 546
  if (typeof max === "function") {                                                                                    // 547
    max = max();                                                                                                      // 548
  }                                                                                                                   // 549
  if (def.type === Date || def.type === [Date]) {                                                                     // 550
    if (typeof min !== "undefined") {                                                                                 // 551
      message = message.replace("[min]", dateToDateString(min));                                                      // 552
    }                                                                                                                 // 553
    if (typeof max !== "undefined") {                                                                                 // 554
      message = message.replace("[max]", dateToDateString(max));                                                      // 555
    }                                                                                                                 // 556
  } else {                                                                                                            // 557
    if (typeof min !== "undefined") {                                                                                 // 558
      message = message.replace("[min]", min);                                                                        // 559
    }                                                                                                                 // 560
    if (typeof max !== "undefined") {                                                                                 // 561
      message = message.replace("[max]", max);                                                                        // 562
    }                                                                                                                 // 563
  }                                                                                                                   // 564
  if (def.type instanceof Function) {                                                                                 // 565
    message = message.replace("[type]", def.type.name);                                                               // 566
  }                                                                                                                   // 567
                                                                                                                      // 568
  // Now return the message                                                                                           // 569
  return message;                                                                                                     // 570
};                                                                                                                    // 571
                                                                                                                      // 572
// Returns true if key is explicitly allowed by the schema or implied                                                 // 573
// by other explicitly allowed keys.                                                                                  // 574
// The key string should have $ in place of any numeric array positions.                                              // 575
SimpleSchema.prototype.allowsKey = function(key) {                                                                    // 576
  var self = this;                                                                                                    // 577
                                                                                                                      // 578
  // Loop through all keys in the schema                                                                              // 579
  return _.any(self._schemaKeys, function(schemaKey) {                                                                // 580
                                                                                                                      // 581
    // If the schema key is the test key, it's allowed.                                                               // 582
    if (schemaKey === key) {                                                                                          // 583
      return true;                                                                                                    // 584
    }                                                                                                                 // 585
                                                                                                                      // 586
    // Black box handling                                                                                             // 587
    if (self.schema(schemaKey).blackbox === true) {                                                                   // 588
      var kl = schemaKey.length;                                                                                      // 589
      var compare1 = key.slice(0, kl + 2);                                                                            // 590
      var compare2 = compare1.slice(0, -1);                                                                           // 591
                                                                                                                      // 592
      // If the test key is the black box key + ".$", then the test                                                   // 593
      // key is NOT allowed because black box keys are by definition                                                  // 594
      // only for objects, and not for arrays.                                                                        // 595
      if (compare1 === schemaKey + '.$')                                                                              // 596
        return false;                                                                                                 // 597
                                                                                                                      // 598
      // Otherwise                                                                                                    // 599
      if (compare2 === schemaKey + '.')                                                                               // 600
        return true;                                                                                                  // 601
    }                                                                                                                 // 602
                                                                                                                      // 603
    return false;                                                                                                     // 604
  });                                                                                                                 // 605
};                                                                                                                    // 606
                                                                                                                      // 607
SimpleSchema.prototype.newContext = function() {                                                                      // 608
  return new SimpleSchemaValidationContext(this);                                                                     // 609
};                                                                                                                    // 610
                                                                                                                      // 611
SimpleSchema.prototype.requiredObjectKeys = function(keyPrefix) {                                                     // 612
  var self = this;                                                                                                    // 613
  if (!keyPrefix) {                                                                                                   // 614
    return self._firstLevelRequiredSchemaKeys;                                                                        // 615
  }                                                                                                                   // 616
  return self._requiredObjectKeys[keyPrefix + "."] || [];                                                             // 617
};                                                                                                                    // 618
                                                                                                                      // 619
SimpleSchema.prototype.requiredSchemaKeys = function() {                                                              // 620
  return this._requiredSchemaKeys;                                                                                    // 621
};                                                                                                                    // 622
                                                                                                                      // 623
SimpleSchema.prototype.firstLevelSchemaKeys = function() {                                                            // 624
  return this._firstLevelSchemaKeys;                                                                                  // 625
};                                                                                                                    // 626
                                                                                                                      // 627
SimpleSchema.prototype.valueIsAllowedObjectKeys = function(keyPrefix) {                                               // 628
  var self = this;                                                                                                    // 629
  if (!keyPrefix) {                                                                                                   // 630
    return self._firstLevelValueIsAllowedSchemaKeys;                                                                  // 631
  }                                                                                                                   // 632
  return self._valueIsAllowedObjectKeys[keyPrefix + "."] || [];                                                       // 633
};                                                                                                                    // 634
                                                                                                                      // 635
SimpleSchema.prototype.valueIsAllowedSchemaKeys = function() {                                                        // 636
  return this._valueIsAllowedSchemaKeys;                                                                              // 637
};                                                                                                                    // 638
                                                                                                                      // 639
SimpleSchema.prototype.customObjectKeys = function(keyPrefix) {                                                       // 640
  var self = this;                                                                                                    // 641
  if (!keyPrefix) {                                                                                                   // 642
    return self._firstLevelCustomSchemaKeys;                                                                          // 643
  }                                                                                                                   // 644
  return self._customObjectKeys[keyPrefix + "."] || [];                                                               // 645
};                                                                                                                    // 646
                                                                                                                      // 647
SimpleSchema.prototype.customSchemaKeys = function() {                                                                // 648
  return this._customSchemaKeys;                                                                                      // 649
};                                                                                                                    // 650
                                                                                                                      // 651
//called by clean()                                                                                                   // 652
var typeconvert = function(value, type) {                                                                             // 653
  if (_.isArray(value) || (_.isObject(value) && !(value instanceof Date)))                                            // 654
    return value; //can't and shouldn't convert arrays or objects                                                     // 655
  if (type === String) {                                                                                              // 656
    if (typeof value !== "undefined" && value !== null && typeof value !== "string") {                                // 657
      return value.toString();                                                                                        // 658
    }                                                                                                                 // 659
    return value;                                                                                                     // 660
  }                                                                                                                   // 661
  if (type === Number) {                                                                                              // 662
    if (typeof value === "string" && !S(value).isEmpty()) {                                                           // 663
      //try to convert numeric strings to numbers                                                                     // 664
      var numberVal = Number(value);                                                                                  // 665
      if (!isNaN(numberVal)) {                                                                                        // 666
        return numberVal;                                                                                             // 667
      } else {                                                                                                        // 668
        return value; //leave string; will fail validation                                                            // 669
      }                                                                                                               // 670
    }                                                                                                                 // 671
    return value;                                                                                                     // 672
  }                                                                                                                   // 673
  return value;                                                                                                       // 674
};                                                                                                                    // 675
                                                                                                                      // 676
//tests whether it's an Object as opposed to something that inherits from Object                                      // 677
var isBasicObject = function(obj) {                                                                                   // 678
  return _.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;                                          // 679
};                                                                                                                    // 680
                                                                                                                      // 681
looksLikeModifier = function(obj) {                                                                                   // 682
  for (var key in obj) {                                                                                              // 683
    if (obj.hasOwnProperty(key) && key.substring(0, 1) === "$") {                                                     // 684
      return true;                                                                                                    // 685
    }                                                                                                                 // 686
  }                                                                                                                   // 687
  return false;                                                                                                       // 688
};                                                                                                                    // 689
                                                                                                                      // 690
var dateToDateString = function(date) {                                                                               // 691
  var m = (date.getUTCMonth() + 1);                                                                                   // 692
  if (m < 10) {                                                                                                       // 693
    m = "0" + m;                                                                                                      // 694
  }                                                                                                                   // 695
  var d = date.getUTCDate();                                                                                          // 696
  if (d < 10) {                                                                                                       // 697
    d = "0" + d;                                                                                                      // 698
  }                                                                                                                   // 699
  return date.getUTCFullYear() + '-' + m + '-' + d;                                                                   // 700
};                                                                                                                    // 701
                                                                                                                      // 702
var mergeSchemas = function(schemas) {                                                                                // 703
                                                                                                                      // 704
  // Merge all provided schema definitions.                                                                           // 705
  // This is effectively a shallow clone of each object, too,                                                         // 706
  // which is what we want since we are going to manipulate it.                                                       // 707
  var mergedSchema = {};                                                                                              // 708
  _.each(schemas, function(schema) {                                                                                  // 709
                                                                                                                      // 710
    // Create a temporary SS instance so that the internal object                                                     // 711
    // we use for merging/extending will be fully expanded                                                            // 712
    if (Match.test(schema, SimpleSchema)) {                                                                           // 713
      schema = schema._schema;                                                                                        // 714
    } else {                                                                                                          // 715
      schema = addImplicitKeys(expandSchema(schema));                                                                 // 716
    }                                                                                                                 // 717
                                                                                                                      // 718
    // Loop through and extend each individual field                                                                  // 719
    // definition. That way you can extend and overwrite                                                              // 720
    // base field definitions.                                                                                        // 721
    _.each(schema, function(def, field) {                                                                             // 722
      mergedSchema[field] = mergedSchema[field] || {};                                                                // 723
      _.extend(mergedSchema[field], def);                                                                             // 724
    });                                                                                                               // 725
                                                                                                                      // 726
  });                                                                                                                 // 727
                                                                                                                      // 728
  // If we merged some schemas, do this again to make sure                                                            // 729
  // extended definitions are pushed into array item field                                                            // 730
  // definitions properly.                                                                                            // 731
  schemas.length && adjustArrayFields(mergedSchema);                                                                  // 732
                                                                                                                      // 733
  return mergedSchema;                                                                                                // 734
};                                                                                                                    // 735
                                                                                                                      // 736
var expandSchema = function(schema) {                                                                                 // 737
  // Flatten schema by inserting nested definitions                                                                   // 738
  _.each(schema, function(val, key) {                                                                                 // 739
    var dot, type;                                                                                                    // 740
    if (!val)                                                                                                         // 741
      return;                                                                                                         // 742
    if (Match.test(val.type, SimpleSchema)) {                                                                         // 743
      dot = '.';                                                                                                      // 744
      type = val.type;                                                                                                // 745
      val.type = Object;                                                                                              // 746
    } else if (Match.test(val.type, [SimpleSchema])) {                                                                // 747
      dot = '.$.';                                                                                                    // 748
      type = val.type[0];                                                                                             // 749
      val.type = [Object];                                                                                            // 750
    } else {                                                                                                          // 751
      return;                                                                                                         // 752
    }                                                                                                                 // 753
    //add child schema definitions to parent schema                                                                   // 754
    _.each(type._schema, function(subVal, subKey) {                                                                   // 755
      var newKey = key + dot + subKey;                                                                                // 756
      if (!(newKey in schema))                                                                                        // 757
        schema[newKey] = subVal;                                                                                      // 758
    });                                                                                                               // 759
  });                                                                                                                 // 760
  return schema;                                                                                                      // 761
};                                                                                                                    // 762
                                                                                                                      // 763
var adjustArrayFields = function(schema) {                                                                            // 764
  _.each(schema, function(def, existingKey) {                                                                         // 765
    if (_.isArray(def.type) || def.type === Array) {                                                                  // 766
      // Copy some options to array-item definition                                                                   // 767
      var itemKey = existingKey + ".$";                                                                               // 768
      if (!(itemKey in schema)) {                                                                                     // 769
        schema[itemKey] = {};                                                                                         // 770
      }                                                                                                               // 771
      if (_.isArray(def.type)) {                                                                                      // 772
        schema[itemKey].type = def.type[0];                                                                           // 773
      }                                                                                                               // 774
      if (def.label) {                                                                                                // 775
        schema[itemKey].label = def.label;                                                                            // 776
      }                                                                                                               // 777
      schema[itemKey].optional = true;                                                                                // 778
      if (typeof def.min !== "undefined") {                                                                           // 779
        schema[itemKey].min = def.min;                                                                                // 780
      }                                                                                                               // 781
      if (typeof def.max !== "undefined") {                                                                           // 782
        schema[itemKey].max = def.max;                                                                                // 783
      }                                                                                                               // 784
      if (typeof def.allowedValues !== "undefined") {                                                                 // 785
        schema[itemKey].allowedValues = def.allowedValues;                                                            // 786
      }                                                                                                               // 787
      if (typeof def.valueIsAllowed !== "undefined") {                                                                // 788
        schema[itemKey].valueIsAllowed = def.valueIsAllowed;                                                          // 789
      }                                                                                                               // 790
      if (typeof def.decimal !== "undefined") {                                                                       // 791
        schema[itemKey].decimal = def.decimal;                                                                        // 792
      }                                                                                                               // 793
      if (typeof def.regEx !== "undefined") {                                                                         // 794
        schema[itemKey].regEx = def.regEx;                                                                            // 795
      }                                                                                                               // 796
      // Remove copied options and adjust type                                                                        // 797
      def.type = Array;                                                                                               // 798
      _.each(['min', 'max', 'allowedValues', 'valueIsAllowed', 'decimal', 'regEx'], function(k) {                     // 799
        deleteIfPresent(def, k);                                                                                      // 800
      });                                                                                                             // 801
    }                                                                                                                 // 802
  });                                                                                                                 // 803
};                                                                                                                    // 804
                                                                                                                      // 805
/**                                                                                                                   // 806
 * Adds implied keys.                                                                                                 // 807
 * * If schema contains a key like "foo.$.bar" but not "foo", adds "foo".                                             // 808
 * * If schema contains a key like "foo" with an array type, adds "foo.$".                                            // 809
 * @param {Object} schema                                                                                             // 810
 * @returns {Object} modified schema                                                                                  // 811
 */                                                                                                                   // 812
var addImplicitKeys = function(schema) {                                                                              // 813
  var arrayKeysToAdd = [], objectKeysToAdd = [], newKey, key;                                                         // 814
                                                                                                                      // 815
  // Pass 1 (objects)                                                                                                 // 816
  _.each(schema, function(def, existingKey) {                                                                         // 817
    var pos = existingKey.indexOf(".");                                                                               // 818
    while (pos !== -1) {                                                                                              // 819
      newKey = existingKey.substring(0, pos);                                                                         // 820
                                                                                                                      // 821
      // It's an array item; nothing to add                                                                           // 822
      if (newKey.substring(newKey.length - 2) === ".$") {                                                             // 823
        pos = -1;                                                                                                     // 824
      }                                                                                                               // 825
      // It's an array of objects; add it with type [Object] if not already in the schema                             // 826
      else if (existingKey.substring(pos, pos + 3) === ".$.") {                                                       // 827
        arrayKeysToAdd.push(newKey); // add later, since we are iterating over schema right now                       // 828
        pos = existingKey.indexOf(".", pos + 3); // skip over next dot, find the one after                            // 829
      }                                                                                                               // 830
      // It's an object; add it with type Object if not already in the schema                                         // 831
      else {                                                                                                          // 832
        objectKeysToAdd.push(newKey); // add later, since we are iterating over schema right now                      // 833
        pos = existingKey.indexOf(".", pos + 1); // find next dot                                                     // 834
      }                                                                                                               // 835
    }                                                                                                                 // 836
  });                                                                                                                 // 837
                                                                                                                      // 838
  for (var i = 0, ln = arrayKeysToAdd.length; i < ln; i++) {                                                          // 839
    key = arrayKeysToAdd[i];                                                                                          // 840
    if (!(key in schema)) {                                                                                           // 841
      schema[key] = {type: [Object], optional: true};                                                                 // 842
    }                                                                                                                 // 843
  }                                                                                                                   // 844
                                                                                                                      // 845
  for (var i = 0, ln = objectKeysToAdd.length; i < ln; i++) {                                                         // 846
    key = objectKeysToAdd[i];                                                                                         // 847
    if (!(key in schema)) {                                                                                           // 848
      schema[key] = {type: Object, optional: true};                                                                   // 849
    }                                                                                                                 // 850
  }                                                                                                                   // 851
                                                                                                                      // 852
  // Pass 2 (arrays)                                                                                                  // 853
  adjustArrayFields(schema);                                                                                          // 854
                                                                                                                      // 855
  return schema;                                                                                                      // 856
};                                                                                                                    // 857
                                                                                                                      // 858
// Returns an object relating the keys in the list                                                                    // 859
// to their parent object.                                                                                            // 860
var getObjectKeys = function(schema, schemaKeyList) {                                                                 // 861
  var keyPrefix, remainingText, rKeys = {}, loopArray;                                                                // 862
  _.each(schema, function(definition, fieldName) {                                                                    // 863
    if (definition.type === Object) {                                                                                 // 864
      //object                                                                                                        // 865
      keyPrefix = fieldName + ".";                                                                                    // 866
    } else {                                                                                                          // 867
      return;                                                                                                         // 868
    }                                                                                                                 // 869
                                                                                                                      // 870
    loopArray = [];                                                                                                   // 871
    _.each(schemaKeyList, function(fieldName2) {                                                                      // 872
      if (S(fieldName2).startsWith(keyPrefix)) {                                                                      // 873
        remainingText = fieldName2.substring(keyPrefix.length);                                                       // 874
        if (remainingText.indexOf(".") === -1) {                                                                      // 875
          loopArray.push(remainingText);                                                                              // 876
        }                                                                                                             // 877
      }                                                                                                               // 878
    });                                                                                                               // 879
    rKeys[keyPrefix] = loopArray;                                                                                     // 880
  });                                                                                                                 // 881
  return rKeys;                                                                                                       // 882
};                                                                                                                    // 883
                                                                                                                      // 884
// returns an inflected version of fieldName to use as the label                                                      // 885
var inflectedLabel = function(fieldName) {                                                                            // 886
  var label = fieldName, lastPeriod = label.lastIndexOf(".");                                                         // 887
  if (lastPeriod !== -1) {                                                                                            // 888
    label = label.substring(lastPeriod + 1);                                                                          // 889
    if (label === "$") {                                                                                              // 890
      var pcs = fieldName.split(".");                                                                                 // 891
      label = pcs[pcs.length - 2];                                                                                    // 892
    }                                                                                                                 // 893
  }                                                                                                                   // 894
  if (label === "_id")                                                                                                // 895
    return "ID";                                                                                                      // 896
  return S(label).humanize().s;                                                                                       // 897
};                                                                                                                    // 898
                                                                                                                      // 899
var deleteIfPresent = function(obj, key) {                                                                            // 900
  if (key in obj) {                                                                                                   // 901
    delete obj[key];                                                                                                  // 902
  }                                                                                                                   // 903
};                                                                                                                    // 904
                                                                                                                      // 905
/**                                                                                                                   // 906
 * @method getAutoValues                                                                                              // 907
 * @private                                                                                                           // 908
 * @param {MongoObject} mDoc                                                                                          // 909
 * @param {Boolean} [isModifier=false] - Is it a modifier doc?                                                        // 910
 * @param {Object} [extendedAutoValueContext] - Object that will be added to the context when calling each autoValue function
 * @returns {undefined}                                                                                               // 912
 *                                                                                                                    // 913
 * Updates doc with automatic values from autoValue functions or default                                              // 914
 * values from defaultValue. Modifies the referenced object in place.                                                 // 915
 */                                                                                                                   // 916
function getAutoValues(mDoc, isModifier, extendedAutoValueContext) {                                                  // 917
  var self = this;                                                                                                    // 918
  var doneKeys = [];                                                                                                  // 919
                                                                                                                      // 920
  //on the client we can add the userId if not already in the custom context                                          // 921
  if (Meteor.isClient && extendedAutoValueContext.userId === void 0) {                                                // 922
    extendedAutoValueContext.userId = (Meteor.userId && Meteor.userId()) || null;                                     // 923
  }                                                                                                                   // 924
                                                                                                                      // 925
  function runAV(func) {                                                                                              // 926
    var affectedKey = this.key;                                                                                       // 927
    // If already called for this key, skip it                                                                        // 928
    if (_.contains(doneKeys, affectedKey))                                                                            // 929
      return;                                                                                                         // 930
    var lastDot = affectedKey.lastIndexOf('.');                                                                       // 931
    var fieldParentName = lastDot === -1 ? '' : affectedKey.slice(0, lastDot + 1);                                    // 932
    var doUnset = false;                                                                                              // 933
    var autoValue = func.call(_.extend({                                                                              // 934
      isSet: (this.value !== void 0),                                                                                 // 935
      unset: function() {                                                                                             // 936
        doUnset = true;                                                                                               // 937
      },                                                                                                              // 938
      value: this.value,                                                                                              // 939
      operator: this.operator,                                                                                        // 940
      field: function(fName) {                                                                                        // 941
        var keyInfo = mDoc.getInfoForKey(fName) || {};                                                                // 942
        return {                                                                                                      // 943
          isSet: (keyInfo.value !== void 0),                                                                          // 944
          value: keyInfo.value,                                                                                       // 945
          operator: keyInfo.operator || null                                                                          // 946
        };                                                                                                            // 947
      },                                                                                                              // 948
      siblingField: function(fName) {                                                                                 // 949
        var keyInfo = mDoc.getInfoForKey(fieldParentName + fName) || {};                                              // 950
        return {                                                                                                      // 951
          isSet: (keyInfo.value !== void 0),                                                                          // 952
          value: keyInfo.value,                                                                                       // 953
          operator: keyInfo.operator || null                                                                          // 954
        };                                                                                                            // 955
      }                                                                                                               // 956
    }, extendedAutoValueContext || {}), mDoc.getObject());                                                            // 957
                                                                                                                      // 958
    // Update tracking of which keys we've run autovalue for                                                          // 959
    doneKeys.push(affectedKey);                                                                                       // 960
                                                                                                                      // 961
    if (autoValue === void 0) {                                                                                       // 962
      if (doUnset) {                                                                                                  // 963
        mDoc.removeValueForPosition(this.position);                                                                   // 964
      }                                                                                                               // 965
      return;                                                                                                         // 966
    }                                                                                                                 // 967
                                                                                                                      // 968
    // If the user's auto value is of the pseudo-modifier format, parse it                                            // 969
    // into operator and value.                                                                                       // 970
    var op, newValue;                                                                                                 // 971
    if (_.isObject(autoValue)) {                                                                                      // 972
      for (var key in autoValue) {                                                                                    // 973
        if (autoValue.hasOwnProperty(key) && key.substring(0, 1) === "$") {                                           // 974
          op = key;                                                                                                   // 975
          newValue = autoValue[key];                                                                                  // 976
          break;                                                                                                      // 977
        }                                                                                                             // 978
      }                                                                                                               // 979
    }                                                                                                                 // 980
                                                                                                                      // 981
    // Add $set for updates and upserts if necessary                                                                  // 982
    if (!op && isModifier && this.position.slice(0, 1) !== '$') {                                                     // 983
      op = "$set";                                                                                                    // 984
      newValue = autoValue;                                                                                           // 985
    }                                                                                                                 // 986
                                                                                                                      // 987
    // Update/change value                                                                                            // 988
    if (op) {                                                                                                         // 989
      mDoc.removeValueForPosition(this.position);                                                                     // 990
      mDoc.setValueForPosition(op + '[' + affectedKey + ']', newValue);                                               // 991
    } else {                                                                                                          // 992
      mDoc.setValueForPosition(this.position, autoValue);                                                             // 993
    }                                                                                                                 // 994
  }                                                                                                                   // 995
                                                                                                                      // 996
  _.each(self._autoValues, function(func, fieldName) {                                                                // 997
    var positionSuffix, key, keySuffix, positions;                                                                    // 998
                                                                                                                      // 999
    // If we're under an array, run autovalue for all the properties of                                               // 1000
    // any objects that are present in the nearest ancestor array.                                                    // 1001
    if (fieldName.indexOf("$") !== -1) {                                                                              // 1002
      var testField = fieldName.slice(0, fieldName.lastIndexOf("$") + 1);                                             // 1003
      keySuffix = fieldName.slice(testField.length + 1);                                                              // 1004
      positionSuffix = MongoObject._keyToPosition(keySuffix, true);                                                   // 1005
      keySuffix = '.' + keySuffix;                                                                                    // 1006
      positions = mDoc.getPositionsForGenericKey(testField);                                                          // 1007
    } else {                                                                                                          // 1008
                                                                                                                      // 1009
      // See if anything in the object affects this key                                                               // 1010
      positions = mDoc.getPositionsForGenericKey(fieldName);                                                          // 1011
                                                                                                                      // 1012
      // Run autovalue for properties that are set in the object                                                      // 1013
      if (positions.length) {                                                                                         // 1014
        key = fieldName;                                                                                              // 1015
        keySuffix = '';                                                                                               // 1016
        positionSuffix = '';                                                                                          // 1017
      }                                                                                                               // 1018
                                                                                                                      // 1019
      // Run autovalue for properties that are NOT set in the object                                                  // 1020
      else {                                                                                                          // 1021
        key = fieldName;                                                                                              // 1022
        keySuffix = '';                                                                                               // 1023
        positionSuffix = '';                                                                                          // 1024
        if (isModifier) {                                                                                             // 1025
          positions = ["$set[" + fieldName + "]"];                                                                    // 1026
        } else {                                                                                                      // 1027
          positions = [MongoObject._keyToPosition(fieldName)];                                                        // 1028
        }                                                                                                             // 1029
      }                                                                                                               // 1030
                                                                                                                      // 1031
    }                                                                                                                 // 1032
                                                                                                                      // 1033
    _.each(positions, function(position) {                                                                            // 1034
      runAV.call({                                                                                                    // 1035
        key: (key || MongoObject._positionToKey(position)) + keySuffix,                                               // 1036
        value: mDoc.getValueForPosition(position + positionSuffix),                                                   // 1037
        operator: extractOp(position),                                                                                // 1038
        position: position + positionSuffix                                                                           // 1039
      }, func);                                                                                                       // 1040
    });                                                                                                               // 1041
  });                                                                                                                 // 1042
}                                                                                                                     // 1043
                                                                                                                      // 1044
// Extracts operator piece, if present, from position string                                                          // 1045
var extractOp = function extractOp(position) {                                                                        // 1046
  var firstPositionPiece = position.slice(0, position.indexOf("["));                                                  // 1047
  return (firstPositionPiece.substring(0, 1) === "$") ? firstPositionPiece : null;                                    // 1048
};                                                                                                                    // 1049
                                                                                                                      // 1050
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/simple-schema/simple-schema-context.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*                                                                                                                    // 1
 * PUBLIC API                                                                                                         // 2
 */                                                                                                                   // 3
                                                                                                                      // 4
SimpleSchemaValidationContext = function(ss) {                                                                        // 5
  var self = this;                                                                                                    // 6
  self._simpleSchema = ss;                                                                                            // 7
  self._schema = ss.schema();                                                                                         // 8
  self._schemaKeys = _.keys(self._schema);                                                                            // 9
  self._invalidKeys = [];                                                                                             // 10
  //set up validation dependencies                                                                                    // 11
  self._deps = {};                                                                                                    // 12
  self._depsAny = new Deps.Dependency;                                                                                // 13
  _.each(self._schemaKeys, function(name) {                                                                           // 14
    self._deps[name] = new Deps.Dependency;                                                                           // 15
  });                                                                                                                 // 16
};                                                                                                                    // 17
                                                                                                                      // 18
//validates the object against the simple schema and sets a reactive array of error objects                           // 19
SimpleSchemaValidationContext.prototype.validate = function(doc, options) {                                           // 20
  var self = this;                                                                                                    // 21
  options = _.extend({                                                                                                // 22
    modifier: false,                                                                                                  // 23
    upsert: false,                                                                                                    // 24
    extendedCustomContext: {}                                                                                         // 25
  }, options || {});                                                                                                  // 26
                                                                                                                      // 27
  //on the client we can add the userId if not already in the custom context                                          // 28
  if (Meteor.isClient && options.extendedCustomContext.userId === void 0) {                                           // 29
    options.extendedCustomContext.userId = (Meteor.userId && Meteor.userId()) || null;                                // 30
  }                                                                                                                   // 31
                                                                                                                      // 32
  var invalidKeys = doValidation(doc, options.modifier, options.upsert, null, self._simpleSchema, options.extendedCustomContext);
                                                                                                                      // 34
  //now update self._invalidKeys and dependencies                                                                     // 35
                                                                                                                      // 36
  //note any currently invalid keys so that we can mark them as changed                                               // 37
  //due to new validation (they may be valid now, or invalid in a different way)                                      // 38
  var removedKeys = _.pluck(self._invalidKeys, "name");                                                               // 39
                                                                                                                      // 40
  //update                                                                                                            // 41
  self._invalidKeys = invalidKeys;                                                                                    // 42
                                                                                                                      // 43
  //add newly invalid keys to changedKeys                                                                             // 44
  var addedKeys = _.pluck(self._invalidKeys, "name");                                                                 // 45
                                                                                                                      // 46
  //mark all changed keys as changed                                                                                  // 47
  var changedKeys = _.union(addedKeys, removedKeys);                                                                  // 48
  self._markKeysChanged(changedKeys);                                                                                 // 49
                                                                                                                      // 50
  // Return true if it was valid; otherwise, return false                                                             // 51
  return self._invalidKeys.length === 0;                                                                              // 52
};                                                                                                                    // 53
                                                                                                                      // 54
//validates doc against self._schema for one key and sets a reactive array of error objects                           // 55
SimpleSchemaValidationContext.prototype.validateOne = function(doc, keyName, options) {                               // 56
  var self = this;                                                                                                    // 57
  options = _.extend({                                                                                                // 58
    modifier: false,                                                                                                  // 59
    upsert: false,                                                                                                    // 60
    extendedCustomContext: {}                                                                                         // 61
  }, options || {});                                                                                                  // 62
                                                                                                                      // 63
  //on the client we can add the userId if not already in the custom context                                          // 64
  if (Meteor.isClient && options.extendedCustomContext.userId === void 0) {                                           // 65
    options.extendedCustomContext.userId = (Meteor.userId && Meteor.userId()) || null;                                // 66
  }                                                                                                                   // 67
                                                                                                                      // 68
  var invalidKeys = doValidation(doc, options.modifier, options.upsert, keyName, self._simpleSchema, options.extendedCustomContext);
                                                                                                                      // 70
  //now update self._invalidKeys and dependencies                                                                     // 71
                                                                                                                      // 72
  //remove objects from self._invalidKeys where name = keyName                                                        // 73
  var newInvalidKeys = [];                                                                                            // 74
  for (var i = 0, ln = self._invalidKeys.length, k; i < ln; i++) {                                                    // 75
    k = self._invalidKeys[i];                                                                                         // 76
    if (k.name !== keyName) {                                                                                         // 77
      newInvalidKeys.push(k);                                                                                         // 78
    }                                                                                                                 // 79
  }                                                                                                                   // 80
  self._invalidKeys = newInvalidKeys;                                                                                 // 81
                                                                                                                      // 82
  //merge invalidKeys into self._invalidKeys                                                                          // 83
  for (var i = 0, ln = invalidKeys.length, k; i < ln; i++) {                                                          // 84
    k = invalidKeys[i];                                                                                               // 85
    self._invalidKeys.push(k);                                                                                        // 86
  }                                                                                                                   // 87
                                                                                                                      // 88
  //mark key as changed due to new validation (they may be valid now, or invalid in a different way)                  // 89
  self._markKeysChanged([keyName]);                                                                                   // 90
                                                                                                                      // 91
  // Return true if it was valid; otherwise, return false                                                             // 92
  return !self._keyIsInvalid(keyName);                                                                                // 93
};                                                                                                                    // 94
                                                                                                                      // 95
//reset the invalidKeys array                                                                                         // 96
SimpleSchemaValidationContext.prototype.resetValidation = function() {                                                // 97
  var self = this;                                                                                                    // 98
  var removedKeys = _.pluck(self._invalidKeys, "name");                                                               // 99
  self._invalidKeys = [];                                                                                             // 100
  self._markKeysChanged(removedKeys);                                                                                 // 101
};                                                                                                                    // 102
                                                                                                                      // 103
SimpleSchemaValidationContext.prototype.isValid = function() {                                                        // 104
  var self = this;                                                                                                    // 105
  self._depsAny.depend();                                                                                             // 106
  return !self._invalidKeys.length;                                                                                   // 107
};                                                                                                                    // 108
                                                                                                                      // 109
SimpleSchemaValidationContext.prototype.invalidKeys = function() {                                                    // 110
  var self = this;                                                                                                    // 111
  self._depsAny.depend();                                                                                             // 112
  return self._invalidKeys;                                                                                           // 113
};                                                                                                                    // 114
                                                                                                                      // 115
SimpleSchemaValidationContext.prototype.addInvalidKeys = function(errors) {                                           // 116
  var self = this;                                                                                                    // 117
                                                                                                                      // 118
  if (!errors || !errors.length)                                                                                      // 119
    return;                                                                                                           // 120
                                                                                                                      // 121
  var changedKeys = [];                                                                                               // 122
  _.each(errors, function (errorObject) {                                                                             // 123
    changedKeys.push(errorObject.name);                                                                               // 124
    self._invalidKeys.push(errorObject);                                                                              // 125
  });                                                                                                                 // 126
                                                                                                                      // 127
  self._markKeysChanged(changedKeys);                                                                                 // 128
};                                                                                                                    // 129
                                                                                                                      // 130
SimpleSchemaValidationContext.prototype._markKeysChanged = function(keys) {                                           // 131
  var self = this;                                                                                                    // 132
                                                                                                                      // 133
  if (!keys || !keys.length)                                                                                          // 134
    return;                                                                                                           // 135
                                                                                                                      // 136
  _.each(keys, function(name) {                                                                                       // 137
    var genericName = SimpleSchema._makeGeneric(name);                                                                // 138
    if (genericName in self._deps) {                                                                                  // 139
      self._deps[genericName].changed();                                                                              // 140
    }                                                                                                                 // 141
  });                                                                                                                 // 142
  self._depsAny.changed();                                                                                            // 143
};                                                                                                                    // 144
                                                                                                                      // 145
SimpleSchemaValidationContext.prototype._keyIsInvalid = function(name, genericName) {                                 // 146
  var self = this;                                                                                                    // 147
  genericName = genericName || SimpleSchema._makeGeneric(name);                                                       // 148
  var specificIsInvalid = !!_.findWhere(self._invalidKeys, {name: name});                                             // 149
  var genericIsInvalid = (genericName !== name) ? (!!_.findWhere(self._invalidKeys, {name: genericName})) : false;    // 150
  return specificIsInvalid || genericIsInvalid;                                                                       // 151
};                                                                                                                    // 152
                                                                                                                      // 153
SimpleSchemaValidationContext.prototype.keyIsInvalid = function(name) {                                               // 154
  var self = this, genericName = SimpleSchema._makeGeneric(name);                                                     // 155
  self._deps[genericName].depend();                                                                                   // 156
  return self._keyIsInvalid(name, genericName);                                                                       // 157
};                                                                                                                    // 158
                                                                                                                      // 159
SimpleSchemaValidationContext.prototype.keyErrorMessage = function(name) {                                            // 160
  var self = this, genericName = SimpleSchema._makeGeneric(name);                                                     // 161
  var ss = self._simpleSchema;                                                                                        // 162
  self._deps[genericName].depend();                                                                                   // 163
                                                                                                                      // 164
  var errorObj = _.findWhere(self._invalidKeys, {name: name});                                                        // 165
  if (!errorObj) {                                                                                                    // 166
    errorObj = _.findWhere(self._invalidKeys, {name: genericName});                                                   // 167
    if (!errorObj) {                                                                                                  // 168
      return "";                                                                                                      // 169
    }                                                                                                                 // 170
  }                                                                                                                   // 171
                                                                                                                      // 172
  var def = ss.schema(genericName);                                                                                   // 173
  if (!def) {                                                                                                         // 174
    return "";                                                                                                        // 175
  }                                                                                                                   // 176
                                                                                                                      // 177
  return ss.messageForError(errorObj.type, errorObj.name, def, errorObj.value);                                       // 178
};                                                                                                                    // 179
                                                                                                                      // 180
/*                                                                                                                    // 181
 * PRIVATE                                                                                                            // 182
 */                                                                                                                   // 183
                                                                                                                      // 184
var doValidation = function(obj, isModifier, isUpsert, keyToValidate, ss, extendedCustomContext) {                    // 185
  var setKeys = [];                                                                                                   // 186
                                                                                                                      // 187
  // First do some basic checks of the object, and throw errors if necessary                                          // 188
  if (!_.isObject(obj)) {                                                                                             // 189
    throw new Error("The first argument of validate() or validateOne() must be an object");                           // 190
  }                                                                                                                   // 191
                                                                                                                      // 192
  if (isModifier) {                                                                                                   // 193
    if (_.isEmpty(obj)) {                                                                                             // 194
      throw new Error("When the modifier option is true, validation object must have at least one operator");         // 195
    } else {                                                                                                          // 196
      var allKeysAreOperators = _.every(obj, function(v, k) {                                                         // 197
        return (k.substring(0, 1) === "$");                                                                           // 198
      });                                                                                                             // 199
      if (!allKeysAreOperators) {                                                                                     // 200
        throw new Error("When the modifier option is true, all validation object keys must be operators");            // 201
      }                                                                                                               // 202
                                                                                                                      // 203
      // Get a list of all keys in $set and $setOnInsert combined, for use later                                      // 204
      setKeys = setKeys.concat(_.keys(obj.$set || {})).concat(_.keys(obj.$setOnInsert || {}));                        // 205
    }                                                                                                                 // 206
  } else if (looksLikeModifier(obj)) {                                                                                // 207
    throw new Error("When the validation object contains mongo operators, you must set the modifier option to true"); // 208
  }                                                                                                                   // 209
                                                                                                                      // 210
  // If this is an upsert, add all the $setOnInsert keys to $set;                                                     // 211
  // since we don't know whether it will be an insert or update, we'll                                                // 212
  // validate upserts as if they will be an insert.                                                                   // 213
  if ("$setOnInsert" in obj) {                                                                                        // 214
    if (isUpsert) {                                                                                                   // 215
      obj.$set = obj.$set || {};                                                                                      // 216
      obj.$set = _.extend(obj.$set, obj.$setOnInsert);                                                                // 217
    }                                                                                                                 // 218
    delete obj.$setOnInsert;                                                                                          // 219
  }                                                                                                                   // 220
                                                                                                                      // 221
  var invalidKeys = [];                                                                                               // 222
  var mDoc; // for caching the MongoObject if necessary                                                               // 223
                                                                                                                      // 224
  // Validation function called for each affected key                                                                 // 225
  function validate(val, affectedKey, affectedKeyGeneric, def, op, skipRequiredCheck, strictRequiredCheck) {          // 226
                                                                                                                      // 227
    // Get the schema for this key, marking invalid if there isn't one.                                               // 228
    if (!def) {                                                                                                       // 229
      invalidKeys.push(errorObject("keyNotInSchema", affectedKey, val, def, ss));                                     // 230
      return;                                                                                                         // 231
    }                                                                                                                 // 232
                                                                                                                      // 233
    // Check for missing required values. The general logic is this:                                                  // 234
    // * If there's no operator, or if the operator is $set and it's an upsert,                                       // 235
    //   val must not be undefined, null, or an empty string.                                                         // 236
    // * If there is an operator other than $unset or $rename, val must                                               // 237
    //   not be null or an empty string, but undefined is OK.                                                         // 238
    // * If the operator is $unset or $rename, it's invalid.                                                          // 239
    if (!skipRequiredCheck && !def.optional) {                                                                        // 240
      if (                                                                                                            // 241
        op === "$unset" ||                                                                                            // 242
        op === "$rename" ||                                                                                           // 243
        ((!op || (op === "$set" && isUpsert) || strictRequiredCheck) && isBlankNullOrUndefined(val)) ||               // 244
        (op && isBlankOrNull(val))                                                                                    // 245
        ) {                                                                                                           // 246
        invalidKeys.push(errorObject("required", affectedKey, null, def, ss));                                        // 247
        return;                                                                                                       // 248
      }                                                                                                               // 249
    }                                                                                                                 // 250
                                                                                                                      // 251
    // For $rename, make sure that the new name is allowed by the schema                                              // 252
    if (op === "$rename" && typeof val === "string" && !ss.allowsKey(val)) {                                          // 253
      invalidKeys.push(errorObject("keyNotInSchema", val, null, null, ss));                                           // 254
      return;                                                                                                         // 255
    }                                                                                                                 // 256
                                                                                                                      // 257
    // No further checking necessary for $unset or $rename                                                            // 258
    if (_.contains(["$unset", "$rename"], op)) {                                                                      // 259
      return;                                                                                                         // 260
    }                                                                                                                 // 261
                                                                                                                      // 262
    // Value checks are not necessary for null or undefined values                                                    // 263
    if (isSet(val)) {                                                                                                 // 264
                                                                                                                      // 265
      // Check that value is of the correct type                                                                      // 266
      var typeError = doTypeChecks(def, val, op);                                                                     // 267
      if (typeError) {                                                                                                // 268
        invalidKeys.push(errorObject(typeError, affectedKey, val, def, ss));                                          // 269
        return;                                                                                                       // 270
      }                                                                                                               // 271
                                                                                                                      // 272
      // Check value against allowedValues array                                                                      // 273
      if (def.allowedValues && !_.contains(def.allowedValues, val)) {                                                 // 274
        invalidKeys.push(errorObject("notAllowed", affectedKey, val, def, ss));                                       // 275
        return;                                                                                                       // 276
      }                                                                                                               // 277
                                                                                                                      // 278
    }                                                                                                                 // 279
                                                                                                                      // 280
    // DEPRECATED: Check value using valusIsAllowed function                                                          // 281
    if (def.valueIsAllowed && !def.valueIsAllowed(val, obj, op)) {                                                    // 282
      console.warn("SimpleSchema: 'valueIsAllowed' is deprecated. Use 'custom' instead.");                            // 283
      invalidKeys.push(errorObject("notAllowed", affectedKey, val, def, ss));                                         // 284
      return;                                                                                                         // 285
    }                                                                                                                 // 286
                                                                                                                      // 287
    // Perform custom validation                                                                                      // 288
    var lastDot = affectedKey.lastIndexOf('.');                                                                       // 289
    var fieldParentName = lastDot === -1 ? '' : affectedKey.slice(0, lastDot + 1);                                    // 290
    var validators = def.custom ? [def.custom] : [];                                                                  // 291
    validators = validators.concat(ss._validators).concat(SimpleSchema._validators);                                  // 292
    _.every(validators, function(validator) {                                                                         // 293
      var errorType = validator.call(_.extend({                                                                       // 294
        key: affectedKey,                                                                                             // 295
        genericKey: affectedKeyGeneric,                                                                               // 296
        definition: def,                                                                                              // 297
        isSet: (val !== void 0),                                                                                      // 298
        value: val,                                                                                                   // 299
        operator: op,                                                                                                 // 300
        field: function(fName) {                                                                                      // 301
          mDoc = mDoc || new MongoObject(obj, ss._blackboxKeys); //create if necessary, cache for speed               // 302
          var keyInfo = mDoc.getInfoForKey(fName) || {};                                                              // 303
          return {                                                                                                    // 304
            isSet: (keyInfo.value !== void 0),                                                                        // 305
            value: keyInfo.value,                                                                                     // 306
            operator: keyInfo.operator                                                                                // 307
          };                                                                                                          // 308
        },                                                                                                            // 309
        siblingField: function(fName) {                                                                               // 310
          mDoc = mDoc || new MongoObject(obj, ss._blackboxKeys); //create if necessary, cache for speed               // 311
          var keyInfo = mDoc.getInfoForKey(fieldParentName + fName) || {};                                            // 312
          return {                                                                                                    // 313
            isSet: (keyInfo.value !== void 0),                                                                        // 314
            value: keyInfo.value,                                                                                     // 315
            operator: keyInfo.operator                                                                                // 316
          };                                                                                                          // 317
        }                                                                                                             // 318
      }, extendedCustomContext || {}), affectedKeyGeneric, val, def, op); //pass args for backwards compatibility; don't use them
      if (typeof errorType === "string") {                                                                            // 320
        invalidKeys.push(errorObject(errorType, affectedKey, val, def, ss));                                          // 321
        return false;                                                                                                 // 322
      }                                                                                                               // 323
      return true;                                                                                                    // 324
    });                                                                                                               // 325
  }                                                                                                                   // 326
                                                                                                                      // 327
  // The recursive function                                                                                           // 328
  function checkObj(val, affectedKey, operator, adjusted, skipRequiredCheck, strictRequiredCheck) {                   // 329
    var affectedKeyGeneric, def, checkAllRequired = false;                                                            // 330
                                                                                                                      // 331
    // Adjust for first-level modifier operators                                                                      // 332
    if (!operator && affectedKey && affectedKey.substring(0, 1) === "$") {                                            // 333
      operator = affectedKey;                                                                                         // 334
      affectedKey = null;                                                                                             // 335
    }                                                                                                                 // 336
                                                                                                                      // 337
    if (affectedKey) {                                                                                                // 338
                                                                                                                      // 339
      // Adjust for $push and $addToSet                                                                               // 340
      if (!adjusted && (operator === "$push" || operator === "$addToSet")) {                                          // 341
        // Adjust for $each                                                                                           // 342
        // We can simply jump forward and pretend like the $each array                                                // 343
        // is the array for the field. This has the added benefit of                                                  // 344
        // skipping past any $slice, which we also don't care about.                                                  // 345
        if (isBasicObject(val) && "$each" in val) {                                                                   // 346
          val = val.$each;                                                                                            // 347
        } else {                                                                                                      // 348
          affectedKey = affectedKey + ".0";                                                                           // 349
        }                                                                                                             // 350
        checkAllRequired = adjusted = true;                                                                           // 351
      }                                                                                                               // 352
                                                                                                                      // 353
      // Make a generic version of the affected key, and use that                                                     // 354
      // to get the schema for this key.                                                                              // 355
      affectedKeyGeneric = SimpleSchema._makeGeneric(affectedKey);                                                    // 356
      def = ss.schema(affectedKeyGeneric);                                                                            // 357
                                                                                                                      // 358
      // We didn't find a schema for our key, so check if the key                                                     // 359
      // is a nested dot-syntax key inside of a blackbox object                                                       // 360
      if (!def) {                                                                                                     // 361
        var parentPath = affectedKeyGeneric, lastDot;                                                                 // 362
                                                                                                                      // 363
        // Iterate the dot-syntax hierarchy until we find a key in our schema                                         // 364
        do {                                                                                                          // 365
          lastDot = parentPath.lastIndexOf('.');                                                                      // 366
          if (lastDot !== -1) {                                                                                       // 367
            parentPath = parentPath.slice(0, lastDot); // Remove last path component                                  // 368
            def = ss.schema(parentPath);                                                                              // 369
          }                                                                                                           // 370
        } while (lastDot !== -1 && !def);                                                                             // 371
                                                                                                                      // 372
        if (!def || !def.blackbox) {                                                                                  // 373
          def = null;                                                                                                 // 374
        } else {                                                                                                      // 375
          return; // The key points inside of a black box so our validation attempt ends                              // 376
        }                                                                                                             // 377
      }                                                                                                               // 378
                                                                                                                      // 379
      // Perform validation for this key                                                                              // 380
      if (!keyToValidate || keyToValidate === affectedKey || keyToValidate === affectedKeyGeneric) {                  // 381
        validate(val, affectedKey, affectedKeyGeneric, def, operator, skipRequiredCheck, strictRequiredCheck);        // 382
      }                                                                                                               // 383
    }                                                                                                                 // 384
                                                                                                                      // 385
    // Temporarily convert missing objects to empty objects                                                           // 386
    // so that the looping code will be called and required                                                           // 387
    // descendent keys can be validated.                                                                              // 388
    if ((val === void 0 || val === null) && (!def || (def.type === Object && !def.optional))) {                       // 389
      val = {};                                                                                                       // 390
    }                                                                                                                 // 391
                                                                                                                      // 392
    // Loop through arrays                                                                                            // 393
    if (_.isArray(val)) {                                                                                             // 394
      _.each(val, function(v, i) {                                                                                    // 395
        checkObj(v, affectedKey + '.' + i, operator, adjusted);                                                       // 396
      });                                                                                                             // 397
    }                                                                                                                 // 398
                                                                                                                      // 399
    // Loop through object keys                                                                                       // 400
    else if (isBasicObject(val) && (!def || !def.blackbox)) {                                                         // 401
      var presentKeys, requiredKeys, valueIsAllowedKeys, customKeys;                                                  // 402
                                                                                                                      // 403
      // Get list of present keys                                                                                     // 404
      presentKeys = _.keys(val);                                                                                      // 405
                                                                                                                      // 406
      if (!isModifier || operator === "$set" || checkAllRequired) {                                                   // 407
                                                                                                                      // 408
        // For required checks, we want to also loop through all keys expected                                        // 409
        // based on the schema, in case any are missing.                                                              // 410
        requiredKeys = ss.requiredObjectKeys(affectedKeyGeneric);                                                     // 411
                                                                                                                      // 412
        // We want to be sure to call any present valueIsAllowed and custom functions                                 // 413
        // even if the value isn't set, so they can be used for custom                                                // 414
        // required errors, such as basing it on another field's value.                                               // 415
        valueIsAllowedKeys = ss.valueIsAllowedObjectKeys(affectedKeyGeneric);                                         // 416
        customKeys = ss.customObjectKeys(affectedKeyGeneric);                                                         // 417
      }                                                                                                               // 418
                                                                                                                      // 419
      // Merge the lists                                                                                              // 420
      var keysToCheck = _.union(presentKeys, requiredKeys || [], valueIsAllowedKeys || [], customKeys || []);         // 421
                                                                                                                      // 422
      // If this object is within an array, make sure we check for                                                    // 423
      // required as if it's not a modifier                                                                           // 424
      var strictRequiredCheck = (affectedKeyGeneric && affectedKeyGeneric.slice(-2) === ".$");                        // 425
                                                                                                                      // 426
      // Check all keys in the merged list                                                                            // 427
      _.each(keysToCheck, function(key) {                                                                             // 428
        if (shouldCheck(key)) {                                                                                       // 429
          // We can skip the required check for keys that are ancestors                                               // 430
          // of those in $set or $setOnInsert because they will be created                                            // 431
          // by MongoDB while setting.                                                                                // 432
          skipRequiredCheck = _.some(setKeys, function(sk) {                                                          // 433
            return (sk.slice(0, key.length + 1) === key + ".");                                                       // 434
          });                                                                                                         // 435
          checkObj(val[key], appendAffectedKey(affectedKey, key), operator, adjusted, skipRequiredCheck, strictRequiredCheck);
        }                                                                                                             // 437
      });                                                                                                             // 438
    }                                                                                                                 // 439
                                                                                                                      // 440
  }                                                                                                                   // 441
                                                                                                                      // 442
  // Kick off the validation                                                                                          // 443
  checkObj(obj);                                                                                                      // 444
                                                                                                                      // 445
  // Make sure there is only one error per fieldName                                                                  // 446
  var addedFieldNames = [];                                                                                           // 447
  invalidKeys = _.filter(invalidKeys, function(errObj) {                                                              // 448
    if (!_.contains(addedFieldNames, errObj.name)) {                                                                  // 449
      addedFieldNames.push(errObj.name);                                                                              // 450
      return true;                                                                                                    // 451
    }                                                                                                                 // 452
    return false;                                                                                                     // 453
  });                                                                                                                 // 454
                                                                                                                      // 455
  return invalidKeys;                                                                                                 // 456
};                                                                                                                    // 457
                                                                                                                      // 458
var doTypeChecks = function(def, keyValue, op) {                                                                      // 459
  var expectedType = def.type;                                                                                        // 460
                                                                                                                      // 461
  // If min/max are functions, call them                                                                              // 462
  var min = def.min;                                                                                                  // 463
  var max = def.max;                                                                                                  // 464
  if (typeof min === "function") {                                                                                    // 465
    min = min();                                                                                                      // 466
  }                                                                                                                   // 467
  if (typeof max === "function") {                                                                                    // 468
    max = max();                                                                                                      // 469
  }                                                                                                                   // 470
                                                                                                                      // 471
  // String checks                                                                                                    // 472
  if (expectedType === String) {                                                                                      // 473
    if (typeof keyValue !== "string") {                                                                               // 474
      return "expectedString";                                                                                        // 475
    } else if (max !== null && max < keyValue.length) {                                                               // 476
      return "maxString";                                                                                             // 477
    } else if (min !== null && min > keyValue.length) {                                                               // 478
      return "minString";                                                                                             // 479
    } else if (def.regEx instanceof RegExp && !def.regEx.test(keyValue)) {                                            // 480
      return "regEx";                                                                                                 // 481
    } else if (_.isArray(def.regEx)) {                                                                                // 482
      var regExError;                                                                                                 // 483
      _.every(def.regEx, function(re, i) {                                                                            // 484
        if (!re.test(keyValue)) {                                                                                     // 485
          regExError = "regEx." + i;                                                                                  // 486
          return false;                                                                                               // 487
        }                                                                                                             // 488
        return true;                                                                                                  // 489
      });                                                                                                             // 490
      if (regExError)                                                                                                 // 491
        return regExError;                                                                                            // 492
    }                                                                                                                 // 493
  }                                                                                                                   // 494
                                                                                                                      // 495
  // Number checks                                                                                                    // 496
  else if (expectedType === Number) {                                                                                 // 497
    if (typeof keyValue !== "number" || isNaN(keyValue)) {                                                            // 498
      return "expectedNumber";                                                                                        // 499
    } else if (op !== "$inc" && max !== null && max < keyValue) {                                                     // 500
      return "maxNumber";                                                                                             // 501
    } else if (op !== "$inc" && min !== null && min > keyValue) {                                                     // 502
      return "minNumber";                                                                                             // 503
    } else if (!def.decimal && keyValue.toString().indexOf(".") > -1) {                                               // 504
      return "noDecimal";                                                                                             // 505
    }                                                                                                                 // 506
  }                                                                                                                   // 507
                                                                                                                      // 508
  // Boolean checks                                                                                                   // 509
  else if (expectedType === Boolean) {                                                                                // 510
    if (typeof keyValue !== "boolean") {                                                                              // 511
      return "expectedBoolean";                                                                                       // 512
    }                                                                                                                 // 513
  }                                                                                                                   // 514
                                                                                                                      // 515
  // Object checks                                                                                                    // 516
  else if (expectedType === Object) {                                                                                 // 517
    if (!isBasicObject(keyValue)) {                                                                                   // 518
      return "expectedObject";                                                                                        // 519
    }                                                                                                                 // 520
  }                                                                                                                   // 521
                                                                                                                      // 522
  // Array checks                                                                                                     // 523
  else if (expectedType === Array) {                                                                                  // 524
    if (!_.isArray(keyValue)) {                                                                                       // 525
      return "expectedArray";                                                                                         // 526
    } else if (def.minCount !== null && keyValue.length < def.minCount) {                                             // 527
      return "minCount";                                                                                              // 528
    } else if (def.maxCount !== null && keyValue.length > def.maxCount) {                                             // 529
      return "maxCount";                                                                                              // 530
    }                                                                                                                 // 531
  }                                                                                                                   // 532
                                                                                                                      // 533
  // Constructor function checks                                                                                      // 534
  else if (expectedType instanceof Function || safariBugFix(expectedType)) {                                          // 535
                                                                                                                      // 536
    // Generic constructor checks                                                                                     // 537
    if (!(keyValue instanceof expectedType)) {                                                                        // 538
      return "expectedConstructor";                                                                                   // 539
    }                                                                                                                 // 540
                                                                                                                      // 541
    // Date checks                                                                                                    // 542
    else if (expectedType === Date) {                                                                                 // 543
      if (_.isDate(min) && min.getTime() > keyValue.getTime()) {                                                      // 544
        return "minDate";                                                                                             // 545
      } else if (_.isDate(max) && max.getTime() < keyValue.getTime()) {                                               // 546
        return "maxDate";                                                                                             // 547
      }                                                                                                               // 548
    }                                                                                                                 // 549
  }                                                                                                                   // 550
                                                                                                                      // 551
};                                                                                                                    // 552
                                                                                                                      // 553
/*                                                                                                                    // 554
 * HELPERS                                                                                                            // 555
 */                                                                                                                   // 556
                                                                                                                      // 557
var appendAffectedKey = function(affectedKey, key) {                                                                  // 558
  if (key === "$each") {                                                                                              // 559
    return affectedKey;                                                                                               // 560
  } else {                                                                                                            // 561
    return (affectedKey ? affectedKey + "." + key : key);                                                             // 562
  }                                                                                                                   // 563
};                                                                                                                    // 564
                                                                                                                      // 565
var shouldCheck = function(key) {                                                                                     // 566
  if (key === "$pushAll") {                                                                                           // 567
    throw new Error("$pushAll is not supported; use $push + $each");                                                  // 568
  }                                                                                                                   // 569
  return !_.contains(["$pull", "$pullAll", "$pop", "$slice"], key);                                                   // 570
};                                                                                                                    // 571
                                                                                                                      // 572
var isBlank = function(str) {                                                                                         // 573
  if (typeof str !== "string") {                                                                                      // 574
    return false;                                                                                                     // 575
  }                                                                                                                   // 576
  return (/^\s*$/).test(str);                                                                                         // 577
};                                                                                                                    // 578
                                                                                                                      // 579
var isBlankNullOrUndefined = function(str) {                                                                          // 580
  return (str === void 0 || str === null || isBlank(str));                                                            // 581
};                                                                                                                    // 582
                                                                                                                      // 583
var isBlankOrNull = function(str) {                                                                                   // 584
  return (str === null || isBlank(str));                                                                              // 585
};                                                                                                                    // 586
                                                                                                                      // 587
var errorObject = function(errorType, keyName, keyValue, def, ss) {                                                   // 588
  // TODO when we're sure nothing relies on the `message` prop anymore, retire it                                     // 589
  // We should be getting error message dynamically from keyErrorMessage method                                       // 590
  return {name: keyName, type: errorType, value: keyValue, message: ss.messageForError(errorType, keyName, def, keyValue)};
};                                                                                                                    // 592
                                                                                                                      // 593
// Tests whether it's an Object as opposed to something that inherits from Object                                     // 594
var isBasicObject = function(obj) {                                                                                   // 595
  return _.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;                                          // 596
};                                                                                                                    // 597
                                                                                                                      // 598
// The latest Safari returns false for Uint8Array, etc. instanceof Function                                           // 599
// unlike other browsers.                                                                                             // 600
var safariBugFix = function(type) {                                                                                   // 601
  return (typeof Uint8Array !== "undefined" && type === Uint8Array)                                                   // 602
          || (typeof Uint16Array !== "undefined" && type === Uint16Array)                                             // 603
          || (typeof Uint32Array !== "undefined" && type === Uint32Array)                                             // 604
          || (typeof Uint8ClampedArray !== "undefined" && type === Uint8ClampedArray);                                // 605
};                                                                                                                    // 606
                                                                                                                      // 607
var isSet = function(val) {                                                                                           // 608
  return val !== void 0 && val !== null;                                                                              // 609
};                                                                                                                    // 610
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
