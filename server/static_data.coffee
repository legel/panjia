if Courses.find().count() is 0
          Courses.insert
            title: "Agent-based Modelling in Public Health"
            author: "Niels Bantilan"
            description: "Applying agent-based models to public health problems"

          Courses.insert
            title: "Public Health Data Science"
            author: "Niels Bantilan"
            description: "An introductory course to the data science process of public health students"

          Courses.insert
            title: "Social Network Analysis with Chronic Disease Datasets"
            author: "Niels Bantilan"
            description: "An intermediate level class for creating social graphs with qualitative data"
