Meteor.subscribe "Courses"
Template.hello.rendered = -> console.log "Hello, Console!"
Router.map -> @route "hello", path: "/"

