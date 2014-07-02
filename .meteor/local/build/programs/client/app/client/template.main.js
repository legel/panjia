(function(){
UI.body.contentParts.push(UI.Component.extend({render: (function() {
  var self = this;
  return Spacebars.include(self.lookupTemplate("body"));
})}));
Meteor.startup(function () { if (! UI.body.INSTANTIATED) { UI.body.INSTANTIATED = true; UI.DomRange.insert(UI.render(UI.body).dom, document.body); } });

Template.__define__("body", (function() {
  var self = this;
  var template = this;
  return [ Spacebars.include(self.lookupTemplate("toolbar")), "\n  ", Spacebars.include(self.lookupTemplate("content")) ];
}));

Template.__define__("content", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    id: "content"
  }, "\n     ", Spacebars.include(self.lookupTemplate("courseList")), "   \n     ", Spacebars.include(self.lookupTemplate("insertCourseForm")), "\n  ");
}));

Template.__define__("courseList", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "courses"
  }, "\n    ", UI.Each(function() {
    return Spacebars.call(self.lookup("courses"));
  }, UI.block(function() {
    var self = this;
    return [ "\n      ", Spacebars.include(self.lookupTemplate("courseItem")), "\n    " ];
  })), "\n  ");
}));

Template.__define__("courseItem", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "course"
  }, "\n      ", HTML.IMG({
    "class": "course-thumbnail",
    src: function() {
      return Spacebars.mustache(self.lookup("thumbnail"));
    }
  }), "\n      ", HTML.DIV({
    "class": "course-content"
  }, "\n          ", HTML.H3(function() {
    return Spacebars.mustache(self.lookup("title"));
  }), HTML.Raw("\n          <h4>Main Question?</h4>\n           <!-- need helpers to grab Main Question from course -->\n          "), HTML.P(function() {
    return Spacebars.mustache(self.lookup("description"));
  }), "\n      "), "\n      ", HTML.DIV({
    "class": "author-content"
  }, HTML.Raw('\n        <img src="images/lance.jpg" style="height:40px">\n        '), HTML.P({
    "class": "author-name"
  }, "\n          ", function() {
    return Spacebars.mustache(self.lookup("author"));
  }, HTML.Raw("\n          <br>\n          <span>30</span> minutes\n          <br>\n          <span>12</span> learners\n          <br>\n          <span>2</span> likes\n        ")), "\n        \n      "), "\n  ");
}));

Template.__define__("toolbar", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "toolbar"
  }, HTML.Raw('\n    <div class="col-logo"> <img width="100%" src="images/panjia.png"></div>\n    '), Spacebars.include(self.lookupTemplate("mycourses")), "\n    ", Spacebars.include(self.lookupTemplate("questions")), "\n    ", Spacebars.include(self.lookupTemplate("answers")), "\n    ", Spacebars.include(self.lookupTemplate("easysearch")), "\n    ", Spacebars.include(self.lookupTemplate("profilename")), "\n    ", Spacebars.include(self.lookupTemplate("profile")), "\n    ", Spacebars.include(self.lookupTemplate("newcourse")), "\n    ", Spacebars.include(self.lookupTemplate("connect")), "\n  ");
}));

Template.__define__("mycourses", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div id="mycourses">Courses</div>');
}));

Template.__define__("questions", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div id="questions">Questions</div>');
}));

Template.__define__("answers", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div id="answers">Answers</div>');
}));

Template.__define__("search", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div id="search"> \n    <input id="searchBox" type="text" placeholder="What would you like to learn?">\n    <input id="searchButton" type="image" src="images/mglass.png">\n  </div>');
}));

Template.__define__("profilename", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div id="profilename">Niels</div>');
}));

Template.__define__("profile", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div id="profile"> <img src="images/niels.png"></div>');
}));

Template.__define__("newcourse", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div id="icon"> <img src="images/newcourse.png"></div>');
}));

Template.__define__("connect", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div id="icon"> <img src="images/connect.png"></div>');
}));

Template.__define__("easysearch", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "searchBox"
  }, "\n    ", Spacebars.TemplateWith(function() {
    return {
      index: Spacebars.call("courses"),
      placeholder: Spacebars.call("What do you want to learn?")
    };
  }, UI.block(function() {
    var self = this;
    return Spacebars.include(self.lookupTemplate("esInput"));
  })), "\n\n    ", Spacebars.TemplateWith(function() {
    return {
      index: Spacebars.call("courses")
    };
  }, UI.block(function() {
    var self = this;
    return Spacebars.include(self.lookupTemplate("ifEsIsSearching"), UI.block(function() {
      var self = this;
      return [ "\n      ", HTML.DIV({
        "class": "search-loading"
      }, "Loading..."), "\n    " ];
    }));
  })), "\n\n    ", HTML.DIV({
    "class": "results-wrapper"
  }, "\n      ", Spacebars.TemplateWith(function() {
    return {
      index: Spacebars.call("courses")
    };
  }, UI.block(function() {
    var self = this;
    return Spacebars.include(self.lookupTemplate("esEach"), UI.block(function() {
      var self = this;
      return [ "\n      ", HTML.UL("\n      ", HTML.LI(HTML.SPAN("Course : "), " ", function() {
        return Spacebars.mustache(self.lookup("title"));
      }), "\n      ", HTML.LI(HTML.SPAN("Description : "), "  ", function() {
        return Spacebars.mustache(self.lookup("description"));
      }), "\n      "), "\n      \n      ", HTML.Comment(" {{> courseItem}} "), "\n      " ];
    }));
  })), "\n\n    "), HTML.Raw('\n      <!-- {{#ifEsHasNoResults index="courses"}} -->\n      <!-- <div class="no-results">No results found!</div> -->\n      <!-- {{/ifEsHasNoResults}} -->\n\n  '));
}));

Template.__define__("insertCourseForm", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "container"
  }, HTML.Raw(' \n    <div class="row">\n      <div class="col-md-3"></div>\n      <div class="col-md-6 welcome">SHARE YOUR KNOWLEDGE</div>\n      <div class="col-md-3"></div>\n    </div>\n   \n    '), HTML.DIV({
    "class": "row"
  }, HTML.Raw('\n      <div class="col-md-2"></div>\n      '), HTML.DIV({
    "class": "col-md-8"
  }, "\n\n        ", Spacebars.TemplateWith(function() {
    return {
      collection: Spacebars.call("Courses"),
      doc: Spacebars.call(self.lookup("selectedDoc")),
      id: Spacebars.call("docForm"),
      type: Spacebars.call(self.lookup("docFormType")),
      template: Spacebars.call("bootstrap3")
    };
  }, UI.block(function() {
    var self = this;
    return Spacebars.include(self.lookupTemplate("autoForm"), UI.block(function() {
      var self = this;
      return [ "\n\n	", HTML.DIV({
        "class": [ "form-group ", UI.If(function() {
          return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({
            name: "title"
          }));
        }, UI.block(function() {
          var self = this;
          return "has-error";
        })) ]
      }, "\n          ", Spacebars.TemplateWith(function() {
        return {
          name: Spacebars.call("title"),
          style: Spacebars.call("height: 40px; resize: none; width: 100%; font-family:'Raleway'"),
          placeholder: Spacebars.call("Title")
        };
      }, UI.block(function() {
        var self = this;
        return Spacebars.include(self.lookupTemplate("afFieldInput"));
      })), "\n          ", UI.If(function() {
        return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({
          name: "title"
        }));
      }, UI.block(function() {
        var self = this;
        return [ " ", HTML.SPAN({
          "class": "help-block"
        }, function() {
          return Spacebars.makeRaw(Spacebars.mustache(self.lookup("afFieldMessage"), Spacebars.kw({
            name: "title"
          })));
        }) ];
      })), "\n        "), "\n\n	", HTML.DIV({
        "class": [ "form-group ", UI.If(function() {
          return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({
            name: "description"
          }));
        }, UI.block(function() {
          var self = this;
          return "has-error";
        })) ]
      }, "\n          ", Spacebars.TemplateWith(function() {
        return {
          name: Spacebars.call("description"),
          style: Spacebars.call("height: 80px; resize: none; width: 100%; font-family:'Raleway'"),
          placeholder: Spacebars.call("Description")
        };
      }, UI.block(function() {
        var self = this;
        return Spacebars.include(self.lookupTemplate("afFieldInput"));
      })), "\n          ", UI.If(function() {
        return Spacebars.dataMustache(self.lookup("afFieldIsInvalid"), Spacebars.kw({
          name: "description"
        }));
      }, UI.block(function() {
        var self = this;
        return [ " ", HTML.SPAN({
          "class": "help-block"
        }, function() {
          return Spacebars.makeRaw(Spacebars.mustache(self.lookup("afFieldMessage"), Spacebars.kw({
            name: "description"
          })));
        }) ];
      })), "\n        "), "\n\n\n\n        " ];
    }));
  })), "\n      "), HTML.Raw('\n      <div class="col-md-2"></div>\n      ')), "\n    ");
}));

Template.__define__("showCourse", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    style: "width: 100%;"
  }, "\n    ", HTML.DIV({
    style: "float: right; width: 50%;"
  }, "\n      ", UI.Each(function() {
    return Spacebars.call(self.lookup("courses"));
  }, UI.block(function() {
    var self = this;
    return [ "\n      ", HTML.UL("\n        ", HTML.LI(function() {
      return Spacebars.mustache(self.lookup("title"));
    }), "\n        ", HTML.LI(function() {
      return Spacebars.mustache(self.lookup("description"));
    }), "\n        ", HTML.LI(function() {
      return Spacebars.mustache(self.lookup("author"));
    }), "\n        ", HTML.UL("\n          ", UI.Each(function() {
      return Spacebars.call(self.lookup("links"));
    }, UI.block(function() {
      var self = this;
      return [ "\n          ", HTML.LI(function() {
        return Spacebars.mustache(self.lookup("id"));
      }), "\n          ", HTML.LI(HTML.IFRAME({
        src: function() {
          return Spacebars.mustache(self.lookup("url"));
        }
      })), "\n          ", HTML.LI(function() {
        return Spacebars.mustache(self.lookup("title"));
      }), "\n          ", HTML.LI(function() {
        return Spacebars.mustache(self.lookup("description"));
      }), "\n          ", HTML.UL("\n            ", UI.Each(function() {
        return Spacebars.call(self.lookup("questions"));
      }, UI.block(function() {
        var self = this;
        return [ "\n	    ", HTML.LI(function() {
          return Spacebars.mustache(self.lookup("title"));
        }), "\n            ", HTML.UL("\n              ", UI.Each(function() {
          return Spacebars.call(self.lookup("answers"));
        }, UI.block(function() {
          var self = this;
          return [ "\n              ", HTML.LI(function() {
            return Spacebars.mustache(self.lookup("text"));
          }), "\n              " ];
        })), "\n            "), "\n	    " ];
      })), "\n	  "), "\n	  " ];
    })), "\n        "), "\n      "), "\n      " ];
  })), "\n    "), "\n  ");
}));

})();
