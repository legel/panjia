Meteor.publish "Courses", -> Courses.find()

# TODO: need pagination
EasySearch.createSearchIndex "courses",
  collection: Courses
  field: ["title", "description"]
  limit: 100
