(function(){__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var i, _i;

for (i = _i = 1; _i <= 20; i = ++_i) {
  Courses.insert({
    title: "Blah",
    description: "All about blah",
    main_question: "What is blah all about?",
    author: "user_id",
    creation_date: "12-12-1212",
    thumbnail: "images/europa.png",
    rating: "TODO",
    links: [
      {
        id: "max_link_id+1",
        url: "http://blah.com",
        title: "Blah Blah Blah",
        description: "Blah in the time of blah.",
        image: "blah.png",
        rating: "TODO",
        max_question_id: 2,
        link_questions: [
          {
            id: 1,
            title: "When was blah invented?",
            type: "mc",
            options: "Mercury, Venus, Pluto, Mars",
            n_answers: "n",
            answers: [
              {
                user: "_id",
                answer: "A|essay"
              }
            ]
          }, {
            id: 2,
            title: "Who invented blah?",
            type: "essay",
            options: "",
            n_answers: "n",
            answers: [
              {
                user: "_id",
                answer: "A|essay"
              }
            ]
          }
        ]
      }
    ],
    course_questions: [
      {
        id: 1,
        title: "When was blah invented?",
        type: "mc",
        options: "Mercury, Venus, Pluto, Mars",
        n_answers: "n",
        answers: [
          {
            user: "_id",
            answer: "A|essay"
          }
        ]
      }, {
        id: 2,
        title: "Who invented blah?",
        type: "essay",
        options: "",
        n_answers: "n",
        answers: [
          {
            user: "_id",
            answer: "A|essay"
          }
        ]
      }
    ]
  });
}

})();
