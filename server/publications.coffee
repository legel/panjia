Meteor.publish "Courses", -> Courses.find()

EasySearch.createSearchIndex "courses",
  collection: Courses
  field: ["title", "description"]
  limit: 100
