(function(){__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {
  return Reveal.initialize();
});

Meteor.subscribe("Courses");

Template.insertCourseForm.helpers({
  courses: function() {
    return Courses.find();
  }
});

Template.courseList.helpers({
  courses: function() {
    return Courses.find();
  }
});

EasySearch.createSearchIndex("courses", {
  collection: Courses,
  field: ["title", "description"],
  limit: 100
});

})();

//# sourceMappingURL=6d8ba33d4925c8b358bf139c3a82fc3c78dd37af.map
