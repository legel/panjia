Meteor.subscribe "Courses"
Template.insertCourseForm.helpers courses: -> Courses.find()

EasySearch.createSearchIndex "courses",
  collection: Courses
  field: ["title", "description"]
  limit: 100

#EasySearch.search "courses", "blah", (error, data) -> console.log data
