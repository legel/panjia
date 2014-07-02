(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/easy-search/lib/easy-search-server.js                                                               //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
EasySearch = (function () {                                                                                     // 1
    var ElasticSearchClient,                                                                                    // 2
        Searchers,                                                                                              // 3
        indexes = {},                                                                                           // 4
        config = {                                                                                              // 5
            host: 'localhost',                                                                                  // 6
            port: 9200,                                                                                         // 7
            secure: false                                                                                       // 8
        },                                                                                                      // 9
        conditions = {                                                                                          // 10
            'onChangeProperty' : function () {                                                                  // 11
                return true;                                                                                    // 12
            }                                                                                                   // 13
        },                                                                                                      // 14
        defaultQuery = function (searchFields, searchString) {                                                  // 15
            return {                                                                                            // 16
                "fuzzy_like_this" : {                                                                           // 17
                    "fields" : searchFields,                                                                    // 18
                    "like_text" : searchString                                                                  // 19
                }                                                                                               // 20
            };                                                                                                  // 21
        },                                                                                                      // 22
        Future = Npm.require('fibers/future'),                                                                  // 23
        ElasticSearchInstance = Npm.require('elasticsearchclient');                                             // 24
                                                                                                                // 25
    /**                                                                                                         // 26
     * Return Elastic Search indexable data.                                                                    // 27
     *                                                                                                          // 28
     * @param {Object} doc                                                                                      // 29
     * @returns {Object}                                                                                        // 30
     */                                                                                                         // 31
    function getESFields(doc) {                                                                                 // 32
        var newDoc = {};                                                                                        // 33
                                                                                                                // 34
        _.each(doc, function (value, key) {                                                                     // 35
            newDoc[key] = "string" === typeof value ? value : JSON.stringify(value);                            // 36
        });                                                                                                     // 37
                                                                                                                // 38
        return newDoc;                                                                                          // 39
    }                                                                                                           // 40
                                                                                                                // 41
    /**                                                                                                         // 42
     * Write a document to a specified index.                                                                   // 43
     *                                                                                                          // 44
     * @param {String} name                                                                                     // 45
     * @param {Object} doc                                                                                      // 46
     * @param {String} id                                                                                       // 47
     */                                                                                                         // 48
    function writeToIndex(name, doc, id) {                                                                      // 49
        // add to index                                                                                         // 50
        ElasticSearchClient.index(name, 'default_type', doc, id)                                                // 51
            .on('data', function (data) {                                                                       // 52
                if (config.debug && console) {                                                                  // 53
                    console.log('EasySearch: Added / Replaced document to Elastic Search:');                    // 54
                    console.log('EasySearch: ' + data + "\n");                                                  // 55
                }                                                                                               // 56
            })                                                                                                  // 57
            .exec();                                                                                            // 58
    }                                                                                                           // 59
                                                                                                                // 60
    /**                                                                                                         // 61
     * Searchers which contain all types which can be used to search content, until now:                        // 62
     *                                                                                                          // 63
     * elastic-search: Use an elastic search server to search with (fast)                                       // 64
     * mongo-db: Use mongodb to search (more convenient)                                                        // 65
     */                                                                                                         // 66
    Searchers = {                                                                                               // 67
        'elastic-search' : {                                                                                    // 68
            /**                                                                                                 // 69
             * Setup some observers on the mongo db collection provided.                                        // 70
             *                                                                                                  // 71
             * @param {String} name                                                                             // 72
             * @param {Object} options                                                                          // 73
             */                                                                                                 // 74
            'createSearchIndex' : function (name, options) {                                                    // 75
                if ("undefined" === typeof ElasticSearchClient) {                                               // 76
                    ElasticSearchClient = new ElasticSearchInstance(config)                                     // 77
                }                                                                                               // 78
                                                                                                                // 79
                options.collection.find().observeChanges({                                                      // 80
                    added: function (id, fields) {                                                              // 81
                        writeToIndex(name, getESFields(fields), id);                                            // 82
                    },                                                                                          // 83
                    changed: function (id, fields) {                                                            // 84
                        // Overwrites the current document with the new doc                                     // 85
                        writeToIndex(name, getESFields(options.collection.findOne(id)), id);                    // 86
                    },                                                                                          // 87
                    removed: function (id) {                                                                    // 88
                        ElasticSearchClient.deleteDocument(name, 'default_type', id)                            // 89
                            .on('data', function (data) {                                                       // 90
                                if (config.debug && console) {                                                  // 91
                                    console.log('EasySearch: Removed document off Elastic Search:');            // 92
                                    console.log('EasySearch: ' + data + "\n");                                  // 93
                                }                                                                               // 94
                            })                                                                                  // 95
                            .exec();                                                                            // 96
                    }                                                                                           // 97
                });                                                                                             // 98
            },                                                                                                  // 99
            /**                                                                                                 // 100
             * Get a fake representation of a mongo document.                                                   // 101
             *                                                                                                  // 102
             * @param {Object} data                                                                             // 103
             * @returns {Array}                                                                                 // 104
             */                                                                                                 // 105
            'getMongoDocumentObject' : function (data) {                                                        // 106
                data = _.isString(data) ? JSON.parse(data) : data;                                              // 107
                                                                                                                // 108
                return _.map(data.hits.hits, function (resultSet) {                                             // 109
                    var mongoDbDocFake = resultSet['_source'];                                                  // 110
                                                                                                                // 111
                    mongoDbDocFake['_id'] = resultSet['_id'];                                                   // 112
                                                                                                                // 113
                    return resultSet['_source'];                                                                // 114
                });                                                                                             // 115
            },                                                                                                  // 116
            /**                                                                                                 // 117
             * Perform a search with Elastic Search, using fibers.                                              // 118
             *                                                                                                  // 119
             * @param {String} name                                                                             // 120
             * @param {String} searchString                                                                     // 121
             * @param {String|Array} fields                                                                     // 122
             * @param {Function} callback                                                                       // 123
             * @returns {*}                                                                                     // 124
             */                                                                                                 // 125
            'search' : function (name, searchString, fields, callback) {                                        // 126
                var queryObj,                                                                                   // 127
                    that = this,                                                                                // 128
                    searchFields,                                                                               // 129
                    fut = new Future(),                                                                         // 130
                    index = indexes[name];                                                                      // 131
                                                                                                                // 132
                if ("function" === typeof fields) {                                                             // 133
                    callback = fields;                                                                          // 134
                    fields = [];                                                                                // 135
                }                                                                                               // 136
                                                                                                                // 137
                if (!_.isObject(index)) {                                                                       // 138
                    return;                                                                                     // 139
                }                                                                                               // 140
                                                                                                                // 141
                searchFields = _.isArray(index.field) ? index.field : [index.field];                            // 142
                                                                                                                // 143
                queryObj = {                                                                                    // 144
                    "query" : index.query(searchFields, searchString),                                          // 145
                    "size" : index.limit                                                                        // 146
                };                                                                                              // 147
                                                                                                                // 148
                if ("function" === typeof callback) {                                                           // 149
                    ElasticSearchClient.search(name, queryObj, callback);                                       // 150
                    return;                                                                                     // 151
                }                                                                                               // 152
                                                                                                                // 153
                // Most likely client call, return data set                                                     // 154
                ElasticSearchClient.search(name, 'default_type', queryObj, function (error, data) {             // 155
                    if ("mongo" === index.format) {                                                             // 156
                        data = that.getMongoDocumentObject(data);                                               // 157
                    }                                                                                           // 158
                                                                                                                // 159
                    if (_.isArray(fields) && fields.length > 0) {                                               // 160
                        data = _.map(data, function (doc) {                                                     // 161
                            var i,                                                                              // 162
                                newDoc = {};                                                                    // 163
                                                                                                                // 164
                            for (i = 0; i < fields.length; i += 1) {                                            // 165
                                newDoc[fields[i]] = doc[fields[i]];                                             // 166
                            }                                                                                   // 167
                                                                                                                // 168
                            return newDoc;                                                                      // 169
                        });                                                                                     // 170
                    }                                                                                           // 171
                                                                                                                // 172
                    fut['return'](data);                                                                        // 173
                });                                                                                             // 174
                                                                                                                // 175
                return fut.wait();                                                                              // 176
            }                                                                                                   // 177
        },                                                                                                      // 178
        'mongo-db' : {                                                                                          // 179
            /**                                                                                                 // 180
             * Set up a search index.                                                                           // 181
             *                                                                                                  // 182
             * @param name                                                                                      // 183
             * @param options                                                                                   // 184
             * @returns {*}                                                                                     // 185
             */                                                                                                 // 186
            'createSearchIndex' : function (name, options) {                                                    // 187
                // Don't have to setup anything                                                                 // 188
            },                                                                                                  // 189
            /**                                                                                                 // 190
             * Get the valid mongodb selector of an index                                                       // 191
             *                                                                                                  // 192
             * @param {Object} index                                                                            // 193
             * @param {String} searchString                                                                     // 194
             * @returns {Object}                                                                                // 195
             */                                                                                                 // 196
            'getSelector' : function (index, searchString) {                                                    // 197
                var orSelector,                                                                                 // 198
                    selector = {},                                                                              // 199
                    field = index.field,                                                                        // 200
                    stringSelector = index.exact ? searchString : { '$regex' : '.*' + searchString + '.*' };    // 201
                                                                                                                // 202
                if (_.isString(field)) {                                                                        // 203
                    selector[field] = stringSelector;                                                           // 204
                    return selector;                                                                            // 205
                }                                                                                               // 206
                                                                                                                // 207
                // Should be an array                                                                           // 208
                selector['$or'] = [];                                                                           // 209
                                                                                                                // 210
                _.each(field, function (fieldString) {                                                          // 211
                    orSelector = {};                                                                            // 212
                    orSelector[fieldString] = stringSelector;                                                   // 213
                                                                                                                // 214
                    selector['$or'].push(orSelector);                                                           // 215
                });                                                                                             // 216
                                                                                                                // 217
                return selector;                                                                                // 218
            },                                                                                                  // 219
            /**                                                                                                 // 220
             *                                                                                                  // 221
             * Perform a really simple search with mongo db.                                                    // 222
             *                                                                                                  // 223
             * @param {String} name                                                                             // 224
             * @param {String} searchString                                                                     // 225
             * @returns {*}                                                                                     // 226
             */                                                                                                 // 227
            'search' : function (name, searchString) {                                                          // 228
                var selector,                                                                                   // 229
                    that = this,                                                                                // 230
                    index = indexes[name];                                                                      // 231
                                                                                                                // 232
                if (!_.isObject(index)) {                                                                       // 233
                    return;                                                                                     // 234
                }                                                                                               // 235
                                                                                                                // 236
                index.limit = index.limit || 10;                                                                // 237
                index.exact = index.exact || false;                                                             // 238
                                                                                                                // 239
                // if several, fields do an $or search, otherwise only over the field                           // 240
                selector = that.getSelector(index, searchString);                                               // 241
                                                                                                                // 242
                return index.collection.find(selector, { 'limit' : index.limit }).fetch();                      // 243
            }                                                                                                   // 244
        }                                                                                                       // 245
    };                                                                                                          // 246
                                                                                                                // 247
    return {                                                                                                    // 248
        /**                                                                                                     // 249
         * Override the config for Elastic Search.                                                              // 250
         *                                                                                                      // 251
         * @param {object} newConfig                                                                            // 252
         */                                                                                                     // 253
        'config' : function (newConfig) {                                                                       // 254
            if ("undefined" === typeof newConfig) {                                                             // 255
                return config;                                                                                  // 256
            }                                                                                                   // 257
                                                                                                                // 258
            config = _.extend(config, newConfig);                                                               // 259
            ElasticSearchClient = new ElasticSearchInstance(config);                                            // 260
        },                                                                                                      // 261
        /**                                                                                                     // 262
         * Override conditions or return conditions if no parameter passed.                                     // 263
         *                                                                                                      // 264
         * @param newConditions                                                                                 // 265
         * @returns {object}                                                                                    // 266
         */                                                                                                     // 267
        'conditions' : function (newConditions) {                                                               // 268
            if ("undefined" === typeof newConditions) {                                                         // 269
                return conditions;                                                                              // 270
            }                                                                                                   // 271
                                                                                                                // 272
            conditions = _.extend(conditions, newConditions);                                                   // 273
        },                                                                                                      // 274
        /**                                                                                                     // 275
         * Create a search index for Elastic Search, which resembles a MongoDB Collection.                      // 276
         *                                                                                                      // 277
         * @param {String} name                                                                                 // 278
         * @param {Object} options                                                                              // 279
         */                                                                                                     // 280
        'createSearchIndex' : function (name, options) {                                                        // 281
            options.format = "string" === typeof options.format ? options.format : "mongo";                     // 282
            options.limit = "number" === typeof options.limit ? options.limit : 10;                             // 283
            options.query = "function" === typeof options.query ? options.query : defaultQuery;                 // 284
            options.use = "string" === typeof options.use ? options.use : 'elastic-search';                     // 285
                                                                                                                // 286
            indexes[name] = options;                                                                            // 287
                                                                                                                // 288
            if ("undefined" === typeof Searchers[options.use]) {                                                // 289
                throw new Meteor.Error(500, "Didnt find the type: '" + options.use + "' to be searched with."); // 290
            }                                                                                                   // 291
                                                                                                                // 292
            Searchers[options.use].createSearchIndex(name, options);                                            // 293
        },                                                                                                      // 294
        /**                                                                                                     // 295
         * Get a fake representation of a mongo document.                                                       // 296
         *                                                                                                      // 297
         * @param {Object} data                                                                                 // 298
         * @returns {Array}                                                                                     // 299
         */                                                                                                     // 300
        'getMongoDocumentObject' : function (data) {                                                            // 301
            data = _.isString(data) ? JSON.parse(data) : data;                                                  // 302
                                                                                                                // 303
            return _.map(data.hits.hits, function (resultSet) {                                                 // 304
                var mongoDbDocFake = resultSet['_source'];                                                      // 305
                                                                                                                // 306
                mongoDbDocFake['_id'] = resultSet['_id'];                                                       // 307
                                                                                                                // 308
                return resultSet['_source'];                                                                    // 309
            });                                                                                                 // 310
        },                                                                                                      // 311
        /**                                                                                                     // 312
         * Perform a search.                                                                                    // 313
         *                                                                                                      // 314
         * @param {String} name                                                                                 // 315
         * @param {String} searchString                                                                         // 316
         * @param {Array} fields                                                                                // 317
         * @param {Function} callback                                                                           // 318
         */                                                                                                     // 319
        'search' : function (name, searchString, fields, callback) {                                            // 320
            var searcherType = indexes[name].use;                                                               // 321
                                                                                                                // 322
            if ("undefined" === typeof Searchers[searcherType]) {                                               // 323
                throw new Meteor.Error(500, "Couldnt search with the type: '" + searcherType + "'");            // 324
            }                                                                                                   // 325
                                                                                                                // 326
            return Searchers[searcherType].search(name, searchString, fields, callback);                        // 327
        },                                                                                                      // 328
        /**                                                                                                     // 329
         * Change a property specified for the index.                                                           // 330
         *                                                                                                      // 331
         * @param {String} name                                                                                 // 332
         * @param {String} key                                                                                  // 333
         * @param {String} value                                                                                // 334
         */                                                                                                     // 335
        'changeProperty' : function(name, key, value) {                                                         // 336
            if (!_.isString(name) || !_.isString(key)) {                                                        // 337
                throw new Meteor.Error('name and key of the property have to be strings!');                     // 338
            }                                                                                                   // 339
                                                                                                                // 340
            indexes[name][key] = value;                                                                         // 341
        },                                                                                                      // 342
        /**                                                                                                     // 343
         * Get the ElasticSearchClient                                                                          // 344
         * @see https://github.com/phillro/node-elasticsearch-client                                            // 345
         *                                                                                                      // 346
         * @return {ElasticSearchInstance}                                                                      // 347
         */                                                                                                     // 348
        'getElasticSearchClient' : function () {                                                                // 349
            return ElasticSearchClient;                                                                         // 350
        },                                                                                                      // 351
        /**                                                                                                     // 352
          * Retrieve all index configurations                                                                   // 353
          */                                                                                                    // 354
        'getIndexes' : function () {                                                                            // 355
            return indexes;                                                                                     // 356
        }                                                                                                       // 357
    };                                                                                                          // 358
})();                                                                                                           // 359
                                                                                                                // 360
Meteor.methods({                                                                                                // 361
    /**                                                                                                         // 362
     * Make search possible on the client.                                                                      // 363
     *                                                                                                          // 364
     * @param {String} name                                                                                     // 365
     * @param {String} searchString                                                                             // 366
     */                                                                                                         // 367
    easySearch: function (name, searchString) {                                                                 // 368
        return EasySearch.search(name, searchString);                                                           // 369
    },                                                                                                          // 370
    /**                                                                                                         // 371
     * Make changing properties possible on the client.                                                         // 372
     *                                                                                                          // 373
     * @param {String} name                                                                                     // 374
     * @param {String} key                                                                                      // 375
     * @param {String} value                                                                                    // 376
     */                                                                                                         // 377
    easySearchChangeProperty: function(name, key, value) {                                                      // 378
        if (EasySearch.conditions().onChangeProperty(name, key, value)) {                                       // 379
            EasySearch.changeProperty(name, key, value);                                                        // 380
        }                                                                                                       // 381
    }                                                                                                           // 382
});                                                                                                             // 383
                                                                                                                // 384
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
