Meteor.startup ->
        Reveal.initialize
                center: false
                transition: "none"
                transitionSpeed: "fast"
                keyboard: true
                touch: true
                mouseWheel: true
                controls: true
                width: "100%"
                height: "100%"
                transform: "none"
                minScale: "1.0"
                maxScale: "1.0"

Meteor.subscribe "Courses"

Template.courseSubmit.helpers courses: -> Courses.find()

EasySearch.createSearchIndex "courses",
  collection: Courses
  field: ["title", "description", "main_question"]
  limit: 10

Template._loginButtonsLoggedInDropdown.events "click #login-buttons-edit-profile": (event) ->
  event.stopPropagation()
  Template._loginButtons.toggleDropdown()
  #TODO: make profileEdit route
  Router.go "profileEdit"
  return

EasySearch.search "courses", "solar", (error, data) -> console.log data
