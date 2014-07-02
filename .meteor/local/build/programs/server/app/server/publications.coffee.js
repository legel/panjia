(function(){__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publish("Courses", function() {
  return Courses.find();
});

EasySearch.createSearchIndex("courses", {
  collection: Courses,
  field: ["title", "description"],
  limit: 100
});

})();
