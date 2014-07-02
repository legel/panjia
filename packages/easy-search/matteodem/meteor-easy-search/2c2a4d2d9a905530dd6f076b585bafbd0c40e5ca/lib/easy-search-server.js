EasySearch = (function () {
    var ElasticSearchClient,
        Searchers,
        indexes = {},
        config = {
            host: 'localhost',
            port: 9200,
            secure: false
        },
        conditions = {
            'onChangeProperty' : function () {
                return true;
            }
        },
        defaultQuery = function (searchFields, searchString) {
            return {
                "fuzzy_like_this" : {
                    "fields" : searchFields,
                    "like_text" : searchString
                }
            };
        },
        Future = Npm.require('fibers/future'),
        ElasticSearchInstance = Npm.require('elasticsearchclient');

    /**
     * Return Elastic Search indexable data.
     *
     * @param {Object} doc
     * @returns {Object}
     */
    function getESFields(doc) {
        var newDoc = {};

        _.each(doc, function (value, key) {
            newDoc[key] = "string" === typeof value ? value : JSON.stringify(value);
        });

        return newDoc;
    }

    /**
     * Write a document to a specified index.
     *
     * @param {String} name
     * @param {Object} doc
     * @param {String} id
     */
    function writeToIndex(name, doc, id) {
        // add to index
        ElasticSearchClient.index(name, 'default_type', doc, id)
            .on('data', function (data) {
                if (config.debug && console) {
                    console.log('EasySearch: Added / Replaced document to Elastic Search:');
                    console.log('EasySearch: ' + data + "\n");
                }
            })
            .exec();
    }

    /**
     * Searchers which contain all types which can be used to search content, until now:
     *
     * elastic-search: Use an elastic search server to search with (fast)
     * mongo-db: Use mongodb to search (more convenient)
     */
    Searchers = {
        'elastic-search' : {
            /**
             * Setup some observers on the mongo db collection provided.
             *
             * @param {String} name
             * @param {Object} options
             */
            'createSearchIndex' : function (name, options) {
                if ("undefined" === typeof ElasticSearchClient) {
                    ElasticSearchClient = new ElasticSearchInstance(config)
                }

                options.collection.find().observeChanges({
                    added: function (id, fields) {
                        writeToIndex(name, getESFields(fields), id);
                    },
                    changed: function (id, fields) {
                        // Overwrites the current document with the new doc
                        writeToIndex(name, getESFields(options.collection.findOne(id)), id);
                    },
                    removed: function (id) {
                        ElasticSearchClient.deleteDocument(name, 'default_type', id)
                            .on('data', function (data) {
                                if (config.debug && console) {
                                    console.log('EasySearch: Removed document off Elastic Search:');
                                    console.log('EasySearch: ' + data + "\n");
                                }
                            })
                            .exec();
                    }
                });
            },
            /**
             * Get a fake representation of a mongo document.
             *
             * @param {Object} data
             * @returns {Array}
             */
            'getMongoDocumentObject' : function (data) {
                data = _.isString(data) ? JSON.parse(data) : data;

                return _.map(data.hits.hits, function (resultSet) {
                    var mongoDbDocFake = resultSet['_source'];

                    mongoDbDocFake['_id'] = resultSet['_id'];

                    return resultSet['_source'];
                });
            },
            /**
             * Perform a search with Elastic Search, using fibers.
             *
             * @param {String} name
             * @param {String} searchString
             * @param {String|Array} fields
             * @param {Function} callback
             * @returns {*}
             */
            'search' : function (name, searchString, fields, callback) {
                var queryObj,
                    that = this,
                    searchFields,
                    fut = new Future(),
                    index = indexes[name];

                if ("function" === typeof fields) {
                    callback = fields;
                    fields = [];
                }

                if (!_.isObject(index)) {
                    return;
                }

                searchFields = _.isArray(index.field) ? index.field : [index.field];

                queryObj = {
                    "query" : index.query(searchFields, searchString),
                    "size" : index.limit
                };

                if ("function" === typeof callback) {
                    ElasticSearchClient.search(name, queryObj, callback);
                    return;
                }

                // Most likely client call, return data set
                ElasticSearchClient.search(name, 'default_type', queryObj, function (error, data) {
                    if ("mongo" === index.format) {
                        data = that.getMongoDocumentObject(data);
                    }

                    if (_.isArray(fields) && fields.length > 0) {
                        data = _.map(data, function (doc) {
                            var i,
                                newDoc = {};

                            for (i = 0; i < fields.length; i += 1) {
                                newDoc[fields[i]] = doc[fields[i]];
                            }

                            return newDoc;
                        });
                    }

                    fut['return'](data);
                });

                return fut.wait();
            }
        },
        'mongo-db' : {
            /**
             * Set up a search index.
             *
             * @param name
             * @param options
             * @returns {*}
             */
            'createSearchIndex' : function (name, options) {
                // Don't have to setup anything
            },
            /**
             * Get the valid mongodb selector of an index
             *
             * @param {Object} index
             * @param {String} searchString
             * @returns {Object}
             */
            'getSelector' : function (index, searchString) {
                var orSelector,
                    selector = {},
                    field = index.field,
                    stringSelector = index.exact ? searchString : { '$regex' : '.*' + searchString + '.*' };

                if (_.isString(field)) {
                    selector[field] = stringSelector;
                    return selector;
                }

                // Should be an array
                selector['$or'] = [];

                _.each(field, function (fieldString) {
                    orSelector = {};
                    orSelector[fieldString] = stringSelector;

                    selector['$or'].push(orSelector);
                });

                return selector;
            },
            /**
             *
             * Perform a really simple search with mongo db.
             *
             * @param {String} name
             * @param {String} searchString
             * @returns {*}
             */
            'search' : function (name, searchString) {
                var selector,
                    that = this,
                    index = indexes[name];

                if (!_.isObject(index)) {
                    return;
                }

                index.limit = index.limit || 10;
                index.exact = index.exact || false;

                // if several, fields do an $or search, otherwise only over the field
                selector = that.getSelector(index, searchString);

                return index.collection.find(selector, { 'limit' : index.limit }).fetch();
            }
        }
    };

    return {
        /**
         * Override the config for Elastic Search.
         *
         * @param {object} newConfig
         */
        'config' : function (newConfig) {
            if ("undefined" === typeof newConfig) {
                return config;
            }

            config = _.extend(config, newConfig);
            ElasticSearchClient = new ElasticSearchInstance(config);
        },
        /**
         * Override conditions or return conditions if no parameter passed.
         *
         * @param newConditions
         * @returns {object}
         */
        'conditions' : function (newConditions) {
            if ("undefined" === typeof newConditions) {
                return conditions;
            }

            conditions = _.extend(conditions, newConditions);
        },
        /**
         * Create a search index for Elastic Search, which resembles a MongoDB Collection.
         *
         * @param {String} name
         * @param {Object} options
         */
        'createSearchIndex' : function (name, options) {
            options.format = "string" === typeof options.format ? options.format : "mongo";
            options.limit = "number" === typeof options.limit ? options.limit : 10;
            options.query = "function" === typeof options.query ? options.query : defaultQuery;
            options.use = "string" === typeof options.use ? options.use : 'elastic-search';

            indexes[name] = options;

            if ("undefined" === typeof Searchers[options.use]) {
                throw new Meteor.Error(500, "Didnt find the type: '" + options.use + "' to be searched with.");
            }

            Searchers[options.use].createSearchIndex(name, options);
        },
        /**
         * Get a fake representation of a mongo document.
         *
         * @param {Object} data
         * @returns {Array}
         */
        'getMongoDocumentObject' : function (data) {
            data = _.isString(data) ? JSON.parse(data) : data;

            return _.map(data.hits.hits, function (resultSet) {
                var mongoDbDocFake = resultSet['_source'];

                mongoDbDocFake['_id'] = resultSet['_id'];

                return resultSet['_source'];
            });
        },
        /**
         * Perform a search.
         *
         * @param {String} name
         * @param {String} searchString
         * @param {Array} fields
         * @param {Function} callback
         */
        'search' : function (name, searchString, fields, callback) {
            var searcherType = indexes[name].use;

            if ("undefined" === typeof Searchers[searcherType]) {
                throw new Meteor.Error(500, "Couldnt search with the type: '" + searcherType + "'");
            }

            return Searchers[searcherType].search(name, searchString, fields, callback);
        },
        /**
         * Change a property specified for the index.
         *
         * @param {String} name
         * @param {String} key
         * @param {String} value
         */
        'changeProperty' : function(name, key, value) {
            if (!_.isString(name) || !_.isString(key)) {
                throw new Meteor.Error('name and key of the property have to be strings!');
            }

            indexes[name][key] = value;
        },
        /**
         * Get the ElasticSearchClient
         * @see https://github.com/phillro/node-elasticsearch-client
         *
         * @return {ElasticSearchInstance}
         */
        'getElasticSearchClient' : function () {
            return ElasticSearchClient;
        },
        /**
          * Retrieve all index configurations
          */
        'getIndexes' : function () {
            return indexes;
        }
    };
})();

Meteor.methods({
    /**
     * Make search possible on the client.
     *
     * @param {String} name
     * @param {String} searchString
     */
    easySearch: function (name, searchString) {
        return EasySearch.search(name, searchString);
    },
    /**
     * Make changing properties possible on the client.
     *
     * @param {String} name
     * @param {String} key
     * @param {String} value
     */
    easySearchChangeProperty: function(name, key, value) {
        if (EasySearch.conditions().onChangeProperty(name, key, value)) {
            EasySearch.changeProperty(name, key, value);
        }
    }
});
