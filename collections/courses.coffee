#@Courses = new Meteor.Collection "Courses"
@Courses = new Meteor.Collection "Courses",
  schema:
    title:
      type: String
      label: "Title"
      max: 200
    description:
      type: String
      label: "Description"
      max: 500
    author:
      type: String
      label: "Author Name"
      max: 100
    links:
      type: [Object]
      minCount: 1
    "links.$.id":
      type: String
    "links.$.url":
      type: String
    "links.$.title":
      type: String
    "links.$.description":
      type: String
    "links.$.questions":
      type: [Object]
    "links.$.questions.$.title":
      type: String
    "links.$.questions.$.answers":
      type: [Object]
    "links.$.questions.$.answers.$.text":
      type: String
