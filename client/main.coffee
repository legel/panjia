Meteor.startup ->
        Reveal.initialize(center: false)

Meteor.subscribe "Courses"

Template.insertCourseForm.helpers courses: -> Courses.find()
Template.courseList.helpers courses: -> Courses.find()

EasySearch.createSearchIndex "courses",
  collection: Courses
  field: ["title", "description", "main_question"]
  limit: 100

Template._loginButtonsLoggedInDropdown.events "click #login-buttons-edit-profile": (event) ->
  event.stopPropagation()
  Template._loginButtons.toggleDropdown()
  #TODO: make profileEdit route
  Router.go "profileEdit"
  return

#EasySearch.search "courses", "blah", (error, data) -> console.log data
