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
    thumbnail:
      optional: true
      type: String
      label: "Thumb Url"
      max: 200
    links:
      type: [Object]
      minCount: 1
    "links.$.id":
      type: String
    "links.$.image":
      optional:true
      type: String
    "links.$.url":
      type: String
    "links.$.title":
      type: String
    "links.$.description":
      type: String
    "links.$.link_questions":
      type: [Object]
    "links.$.link_questions.$.title":
      type: String
    "links.$.link_questions.$.type":
      optional:true
      type: String
    "links.$.link_questions.$.n_answers":
      optional:true 
      type: String
    "links.$.link_questions.$.answers":
      type: [Object]
    "links.$.link_questions.$.answers.$.answer":
      type: String
