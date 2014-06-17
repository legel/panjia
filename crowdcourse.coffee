Courses = new Meteor.Collection("Courses")

if Meteor.isClient
        Template.hello.rendered = -> console.log "Hello, Console!"
