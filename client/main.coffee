Meteor.startup ->
        Reveal.initialize()

Meteor.subscribe "Courses"

Template.insertCourseForm.helpers courses: -> Courses.find()
Template.courseList.helpers courses: -> Courses.find()

EasySearch.createSearchIndex "courses",
  collection: Courses
  field: ["title", "description", "main_question"]
  limit: 100

#EasySearch.search "courses", "blah", (error, data) -> console.log data
