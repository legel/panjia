if Courses.find().count() is 0
          Courses.insert
            image: "solarsystem.png"
            title: "Birth of the Solar System"
            question: "How did our solar system form and evolve?"
            description: "Discover how our sun and all that orbits it emerged from a supernova star explosion and trace this event up to today's solar system."

          Courses.insert
            image: "europa.png"
            title: "Oceans of Europa"
            question: "What type of life might Europa be able to support?"
            description: "Dive into the icy, mysterious oceanic moon of Jupiter, where you will learn about its geological structure and nature, and consider possibilities of there being life on it right now."

          Courses.insert
            image: "exploration.png"
            title: "Oceans of Europa"
            question: "What future discoveries should upcoming space missions pursue?"
            description: "Learn about some of the most exciting space exploration missions, and imagine what we could discover next."
