(function(){__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
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

//# sourceMappingURL=9a34918e14d60ce87f8ee696e311fb83e5fe4523.map
