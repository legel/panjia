(function () {

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/easy-search/lib/easy-search-client.js                                           //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
EasySearch = function () {                                                                  // 1
    'use strict';                                                                           // 2
                                                                                            // 3
    var indexes = {                                                                         // 4
            /*                                                                              // 5
            collection: Meteor.Collection (required),                                       // 6
            field: [string] || string (required),                                           // 7
            limit: number (default: 10),                                                    // 8
            exact: boolean (default false)                                                  // 9
            caseSensitive: boolean (default false)                                          // 10
            */                                                                              // 11
        };                                                                                  // 12
                                                                                            // 13
    return {                                                                                // 14
        /**                                                                                 // 15
         * Create a search "index" to search on.                                            // 16
         *                                                                                  // 17
         * @param {String} name                                                             // 18
         * @param {Object} options                                                          // 19
         */                                                                                 // 20
        'createSearchIndex' : function (name, options) {                                    // 21
            indexes[name] = options;                                                        // 22
        },                                                                                  // 23
        /**                                                                                 // 24
         * Search over one of the defined indexes.                                          // 25
         *                                                                                  // 26
         * @param {String} name                                                             // 27
         * @param {String} searchString                                                     // 28
         * @param {Function} callback                                                       // 29
         */                                                                                 // 30
        'search' : function (name, searchString, callback) {                                // 31
            Meteor.call('easySearch', name, searchString, callback);                        // 32
        },                                                                                  // 33
        /**                                                                                 // 34
         * Search over multiple indexes.                                                    // 35
         *                                                                                  // 36
         * @param {array} indexes                                                           // 37
         * @param {String} searchString                                                     // 38
         * @param {Function} callback                                                       // 39
         */                                                                                 // 40
        'searchMultiple' : function (indexes, searchString, callback) {                     // 41
            _.each(indexes, function (name) {                                               // 42
                Meteor.call('easySearch', name, searchString, callback);                    // 43
            });                                                                             // 44
        },                                                                                  // 45
        /**                                                                                 // 46
         * Allow easily changing properties, for example limiting.                          // 47
         *                                                                                  // 48
         * @param {String} name                                                             // 49
         * @param {String} key                                                              // 50
         * @param {Object} value                                                            // 51
         */                                                                                 // 52
        'changeProperty' : function(name, key, value) {                                     // 53
            Meteor.call('easySearchChangeProperty', name, key, value);                      // 54
        },                                                                                  // 55
        /**                                                                                 // 56
          * Retrieve all index configurations                                               // 57
          */                                                                                // 58
        'getIndexes' : function () {                                                        // 59
            return indexes;                                                                 // 60
        }                                                                                   // 61
    };                                                                                      // 62
}();                                                                                        // 63
                                                                                            // 64
//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/easy-search/lib/components/template.easy-search-components.js                   //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
                                                                                            // 1
Template.__define__("esInput", (function() {                                                // 2
  var self = this;                                                                          // 3
  var template = this;                                                                      // 4
  return HTML.INPUT({                                                                       // 5
    type: "text",                                                                           // 6
    id: function() {                                                                        // 7
      return Spacebars.mustache(self.lookup("id"));                                         // 8
    },                                                                                      // 9
    placeholder: function() {                                                               // 10
      return Spacebars.mustache(self.lookup("placeholder"));                                // 11
    },                                                                                      // 12
    "class": function() {                                                                   // 13
      return Spacebars.mustache(self.lookup("classes"));                                    // 14
    }                                                                                       // 15
  });                                                                                       // 16
}));                                                                                        // 17
                                                                                            // 18
Template.__define__("esEach", (function() {                                                 // 19
  var self = this;                                                                          // 20
  var template = this;                                                                      // 21
  return UI.Each(function() {                                                               // 22
    return Spacebars.call(self.lookup("elasticSearchDoc"));                                 // 23
  }, UI.block(function() {                                                                  // 24
    var self = this;                                                                        // 25
    return [ "\n        ", UI.InTemplateScope(template, Spacebars.TemplateWith(function() { // 26
      return Spacebars.call(self.lookup("."));                                              // 27
    }, UI.block(function() {                                                                // 28
      var self = this;                                                                      // 29
      return Spacebars.include(function() {                                                 // 30
        return template.__content;                                                          // 31
      });                                                                                   // 32
    }))), "\n    " ];                                                                       // 33
  }));                                                                                      // 34
}));                                                                                        // 35
                                                                                            // 36
Template.__define__("ifEsIsSearching", (function() {                                        // 37
  var self = this;                                                                          // 38
  var template = this;                                                                      // 39
  return UI.If(function() {                                                                 // 40
    return Spacebars.call(self.lookup("isSearching"));                                      // 41
  }, UI.block(function() {                                                                  // 42
    var self = this;                                                                        // 43
    return [ "\n        ", UI.InTemplateScope(template, Spacebars.include(function() {      // 44
      return template.__content;                                                            // 45
    })), "\n    " ];                                                                        // 46
  }));                                                                                      // 47
}));                                                                                        // 48
                                                                                            // 49
Template.__define__("ifEsHasNoResults", (function() {                                       // 50
  var self = this;                                                                          // 51
  var template = this;                                                                      // 52
  return UI.If(function() {                                                                 // 53
    return Spacebars.call(self.lookup("hasNoResults"));                                     // 54
  }, UI.block(function() {                                                                  // 55
    var self = this;                                                                        // 56
    return [ "\n        ", UI.InTemplateScope(template, Spacebars.include(function() {      // 57
      return template.__content;                                                            // 58
    })), "\n    " ];                                                                        // 59
  }));                                                                                      // 60
}));                                                                                        // 61
                                                                                            // 62
Template.__define__("esSearchBox", (function() {                                            // 63
  var self = this;                                                                          // 64
  var template = this;                                                                      // 65
  return "";                                                                                // 66
}));                                                                                        // 67
                                                                                            // 68
Template.__define__("esAutosuggest", (function() {                                          // 69
  var self = this;                                                                          // 70
  var template = this;                                                                      // 71
  return "";                                                                                // 72
}));                                                                                        // 73
                                                                                            // 74
//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/easy-search/lib/components/easy-search-components.js                            //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
(function () {                                                                              // 1
    'use strict';                                                                           // 2
                                                                                            // 3
    var m = {},                                                                             // 4
        defaults,                                                                           // 5
        LocalTimer,                                                                         // 6
        inputCache = {},                                                                    // 7
        LocalCache = new Meteor.Collection(null);                                           // 8
                                                                                            // 9
    // Default values                                                                       // 10
    defaults = {                                                                            // 11
        'inputTimeout' : 200,                                                               // 12
        'reactive' : true,                                                                  // 13
        'event' : 'keyup'                                                                   // 14
    };                                                                                      // 15
                                                                                            // 16
    Session.setDefault('notSearching', true);                                               // 17
                                                                                            // 18
    // Error Messages                                                                       // 19
    m.specifyIndex = 'Specify an index, for example {{> esInput index="name"}}!';           // 20
                                                                                            // 21
    // A simple timer                                                                       // 22
    LocalTimer = {                                                                          // 23
        'timers' : {},                                                                      // 24
        'stop' : function (id) {                                                            // 25
            clearTimeout(this.timers[id]);                                                  // 26
            delete this.timers[id];                                                         // 27
        },                                                                                  // 28
        'runAt' : function (id, millSec, func, params) {                                    // 29
            var that = this;                                                                // 30
                                                                                            // 31
            this.timers[id] = setTimeout(function () {                                      // 32
                func(params);                                                               // 33
                that.stop(id);                                                              // 34
            }, parseInt(millSec, 10));                                                      // 35
        },                                                                                  // 36
        'isRunning' : function (id) {                                                       // 37
            return "undefined" !== typeof this.timers[id];                                  // 38
        }                                                                                   // 39
    };                                                                                      // 40
                                                                                            // 41
    // Add the search results to cache and process it                                       // 42
    function processSearchResults(index, data, isReactive)                                  // 43
    {                                                                                       // 44
        // Just store the data                                                              // 45
        if (!isReactive) {                                                                  // 46
            LocalCache.upsert(                                                              // 47
                { _id : index },                                                            // 48
                { _id : index, r : isReactive, d : data }                                   // 49
            );                                                                              // 50
                                                                                            // 51
            return;                                                                         // 52
        }                                                                                   // 53
                                                                                            // 54
        // If it has to be reactive                                                         // 55
        LocalCache.upsert(                                                                  // 56
            { _id : index },                                                                // 57
            {                                                                               // 58
                _id : index,                                                                // 59
                r : isReactive,                                                             // 60
                d : _.map(data, function(doc) { return doc._id; })                          // 61
            }                                                                               // 62
        );                                                                                  // 63
    }                                                                                       // 64
                                                                                            // 65
    // Perform a search with esInput                                                        // 66
    function esInputSearch (conf) {                                                         // 67
        var id = conf.easySearchID,                                                         // 68
            searchValue = conf.value,                                                       // 69
            index = conf.easySearchIndex;                                                   // 70
                                                                                            // 71
        if (searchValue.length < 1) {                                                       // 72
            Session.set('esSearching_' + id, false);                                        // 73
            LocalCache.upsert({ _id : index }, { _id : index, d : null });                  // 74
            return;                                                                         // 75
        }                                                                                   // 76
                                                                                            // 77
        EasySearch.search(index, searchValue, function (err, data) {                        // 78
            if (err) {                                                                      // 79
                throw new Meteor.Error(500, "Searching failed");                            // 80
            }                                                                               // 81
                                                                                            // 82
            inputCache[id] = searchValue;                                                   // 83
            Session.set('esSearching_' + id, false);                                        // 84
            processSearchResults(index, data, conf.easySearchReactive);                     // 85
        });                                                                                 // 86
    }                                                                                       // 87
                                                                                            // 88
    // Generate an id used for the components                                               // 89
    function generateId(index, id) {                                                        // 90
        var generatedId = index;                                                            // 91
                                                                                            // 92
        if (!generatedId) {                                                                 // 93
            throw new Meteor.Error(400, m.specifyIndex);                                    // 94
        }                                                                                   // 95
                                                                                            // 96
        if (id) {                                                                           // 97
            generatedId += '_' + id;                                                        // 98
        }                                                                                   // 99
                                                                                            // 100
        return generatedId;                                                                 // 101
    }                                                                                       // 102
                                                                                            // 103
                                                                                            // 104
    /* esInput */                                                                           // 105
    Template.esInput.events({                                                               // 106
        'keyup input' : function (e) {                                                      // 107
            var i, id, index,                                                               // 108
                searchValue,                                                                // 109
                eventScope = this,                                                          // 110
                searchCache = inputCache[id],                                               // 111
                reactive = this.reactive !== "false",                                       // 112
                timeout = this.timeout || defaults.inputTimeout,                            // 113
                event = this.event || defaults.event,                                       // 114
                searchValue = $(e.target).val(),                                            // 115
                keyCode = e.keyCode || e.which;                                             // 116
                                                                                            // 117
            // Pressed not enter with enter configuration                                   // 118
            if ("enter" === event && 13 !== keyCode) {                                      // 119
                Session.set('notSearching', true);                                          // 120
                return;                                                                     // 121
            }                                                                               // 122
                                                                                            // 123
            // Only search when the value hasn't changed                                    // 124
            if (searchCache === searchValue) {                                              // 125
                return;                                                                     // 126
            }                                                                               // 127
                                                                                            // 128
            // If already running, stop the timer                                           // 129
            if (LocalTimer.isRunning(id)) {                                                 // 130
                LocalTimer.stop(id);                                                        // 131
            }                                                                               // 132
                                                                                            // 133
            // Run the search at the specified timeout                                      // 134
            Session.set('notSearching', false);                                             // 135
            searchValue = $(e.target).val();                                                // 136
                                                                                            // 137
            if (!_.isArray(this.index)) {                                                   // 138
                this.index = [this.index];                                                  // 139
            }                                                                               // 140
                                                                                            // 141
            _.each(this.index, function (index) {                                           // 142
                id = generateId(index, eventScope.id);                                      // 143
                                                                                            // 144
                LocalTimer.runAt(id, timeout, esInputSearch, {                              // 145
                    value : searchValue,                                                    // 146
                    easySearchID : id,                                                      // 147
                    easySearchIndex : index,                                                // 148
                    easySearchReactive : reactive                                           // 149
                });                                                                         // 150
                Session.set('esSearching_' + id, true);                                     // 151
            });                                                                             // 152
        }                                                                                   // 153
    });                                                                                     // 154
                                                                                            // 155
    /* esEach */                                                                            // 156
    UI.registerHelper('esEach', function () {                                               // 157
        return Template.esEach;                                                             // 158
    });                                                                                     // 159
                                                                                            // 160
    Template.esEach.helpers({                                                               // 161
        'elasticSearchDoc' : function () {                                                  // 162
            var config,                                                                     // 163
                indexConf,                                                                  // 164
                isReactive,                                                                 // 165
                options = this.options || {},                                               // 166
                doc = LocalCache.findOne(this.index);                                       // 167
                                                                                            // 168
            if (!_.isObject(doc)) {                                                         // 169
                return [];                                                                  // 170
            }                                                                               // 171
                                                                                            // 172
            isReactive = doc.r;                                                             // 173
                                                                                            // 174
            // Not reactive                                                                 // 175
            if (doc && doc.d && !isReactive) {                                              // 176
                return doc.d;                                                               // 177
            }                                                                               // 178
                                                                                            // 179
            // Is reactive                                                                  // 180
            if (doc && doc.d) {                                                             // 181
                config = EasySearch.getIndexes();                                           // 182
                indexConf = config[this.index];                                             // 183
                return indexConf.collection.find({ _id : { $in : doc.d } }, options);       // 184
            }                                                                               // 185
        }                                                                                   // 186
    });                                                                                     // 187
                                                                                            // 188
    /* ifEsIsSearching */                                                                   // 189
    Template.ifEsIsSearching.isSearching = function () {                                    // 190
        var id = generateId(this.index, this.id),                                           // 191
            isSearching = Session.get('esSearching_' + id);                                 // 192
                                                                                            // 193
        return isSearching ? isSearching : null;                                            // 194
    };                                                                                      // 195
                                                                                            // 196
    /* ifEsHasNoResults */                                                                  // 197
    Template.ifEsHasNoResults.hasNoResults = function () {                                  // 198
        var cache = LocalCache.findOne(this.index);                                         // 199
                                                                                            // 200
        if ((Session.get('esSearching_' + generateId(this.index, this.id)))                 // 201
                || Session.get('notSearching')) {                                           // 202
            return false;                                                                   // 203
        }                                                                                   // 204
                                                                                            // 205
        return !(cache && _.isArray(cache.d) && cache.d.length > 0);                        // 206
    }                                                                                       // 207
})();                                                                                       // 208
                                                                                            // 209
//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
