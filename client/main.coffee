Meteor.subscribe "Courses"
Template.insertCourseForm.helpers courses: -> Courses.find()
