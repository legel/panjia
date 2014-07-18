if (Meteor.isClient) {

    // Counts how many links, questions, and answers in total have been inserted 
    var linkCount = 1;
    var questionCount = 0;
    var answerCount = 0;

    // Function for creating n-dimensional arrays
    function createArray(length) {
	var arr = new Array(length || 0),
        i = length;
	if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}
	return arr;
    }

    // Allocate space for 100 links, 10 questions per link, 10 answers per question
    var linkMax = 100;
    var questionMax = 10;
    var answerMax = 10;
    var questionIndex = createArray(linkMax); // array to identify who is the parent link of each question
    var answerIndex = createArray(linkMax,questionMax); // array to identify who is the parent link and question of each answer

    // Initialize arrays to all 0's
    for (i = 0; i < 100; i++) {
	questionIndex[i] = 0;
	for (j = 0; j < 10; j++) {
	    answerIndex[i][j] = 0;
	}
    }

    // This is an event handler that is called every time the "addlink" button is pressed.
    Template.addlink.events({
	'click input.addlink': function(event)
	{
            var n = 0;
            var chr = String.fromCharCode(97 + n);
            console.log(chr);

	    linkCount++;  // Record that a link has been added
            var LinkContainerDiv = document.getElementById ("link-container");  // Initialize foundation to insert new <div> 
	    var LinkDiv = document.createElement ("div");
	    LinkDiv.setAttribute("id", "link");
	    var QuestionDiv = document.createElement ("div");
	    QuestionDiv.setAttribute("id", "question");
            // Insert into new <div> code for (i) inserting the link URL into a field, and (ii) pressing the button for "addquestion"
	    var QuestionHTML = '<div class="row"><div class="column-linknumber"><div class="leadbutton linknumber">'+linkCount+'</div></div><input name="link' + linkCount + '" type="text" style="height: 35px; width: calc(100% - 250px); float: left; margin-left: 10px" value="" placeholder="Link"/><input type="button" class="addbuttons addquestionbutton addquestion" id="' + linkCount + '" value="Add Question"/></div>'
	    QuestionDiv.innerHTML = QuestionHTML;
	    LinkDiv.appendChild(QuestionDiv);
	    LinkContainerDiv.appendChild(LinkDiv);  // Append HTML to DOM
	},

	// When an "addquestion" button is pressed (from the "addlink" handler above) then do the following.
	'click input.addquestion': function(event, template)
	{
	    questionCount++;
	    questionIndex[event.currentTarget.id]++;
	    var serviceDiv = document.createElement ("div");
	    serviceDiv.setAttribute("id", "service");
	    // Insert into new <div> code for (i) inserting the question into a field, and (ii) pressing the button for "addanswer"
	    var serviceHTML = '<div class="row"><div class="column-questionsymbol"><div class="leadbutton questionsymbol">Q</div></div><input name="question_' + event.currentTarget.id + '_' + questionIndex[event.currentTarget.id] + '" type="text" style="height: 35px; width: calc(100% - 265px); float: left; margin-left: 10px" value="" placeholder="Question"/><input type="button" id="' + event.currentTarget.id + ' ' + questionIndex[event.currentTarget.id] + '" class="addbuttons addanswerbutton addanswer" value="Add Answer" /></div>';
	    // Above the value "event.currentTarget.id" grabs the id="linkCount" from the "addquestion" button that was pressed.  This is a way of basically passing an argument (the link # of the parent calling for a new question) from the button caller to the event handler.  We also create for our "addanswer" button an id= <link #><question #> for the same purpose of recording the link and question parents of answer children.
	    serviceDiv.innerHTML = serviceHTML;
	    event.currentTarget.parentNode.parentNode.appendChild(serviceDiv);

	},

	'click input.addanswer': function(event, template)
	{
	    answerCount++;
	    var ans = event.currentTarget.id.split(" ");
	    // Because "addanswer" button id= is like "link2 question3", we use the .js method split(" ") to put link2 in ans[0] and question3 in ans[1]
	    answerIndex[ans[0]][ans[1]]++; //answerIndex[link#][question#] records the total number of answers for this link+question index, with question# localized to the current link (not a total count of questions across the whole course)
	    var serviceDiv = document.createElement ("div");
	    serviceDiv.setAttribute("id", "service");
	    var serviceHTML = '<div class="row"><div class="column-answerletter"><div class="leadbutton answerletter">'+String.fromCharCode(96 + answerIndex[ans[0]][ans[1]])+'</div></div><input name="answer_' + ans[0] + '_' + ans[1] + '_' + answerIndex[ans[0]][ans[1]] + '" type="text" style="height: 35px; width: calc(100% - 135px); float: left; margin-left: 10px" value="" placeholder="Answer"/></div>' ;
	    serviceDiv.innerHTML = serviceHTML;
	    
	    event.currentTarget.parentNode.appendChild(serviceDiv);
	}


    });


    Template.courseSubmit.events({
	'submit form': function(e) {
	    e.preventDefault();
	    
	    var course = {
		title: $(e.target).find('[name=title]').val(),
		description: $(e.target).find('[name=description]').val()
	    }

	    course._id = Courses.insert({title: course.title, description: course.description, links: [] });

	    for (i = 0; i < linkCount; i++) {
		var linkIndex = 'links'
		var linkField = $(e.target).find('[name=link'+(i+1)+']').val();
		var linkValue = {url: linkField, id: '', image: '', title: '', description: '', questions: [] };
		linkObject = {};
		linkObject[linkIndex] = linkValue;
		Courses.update({ _id: course._id }, { $push: linkObject });
		for (j = 0; j < 10; j++) {
		    var questionIndex = 'links.' + i +'.questions';
		    var questionField = $(e.target).find('[name=question_'+(i+1)+'_'+(j+1)+']').val();
		    if(typeof questionField === 'undefined') break;
		    var questionValue = {title: questionField, answers: [] };
		    var questionObject = {};        
		    questionObject[questionIndex] = questionValue;    
		    Courses.update({ _id: course._id }, { $push: questionObject});
		    for (k = 0; k < 10; k++) {
			var answerIndex = 'links.' + i +'.questions.' + j + '.answers';
			var answerField = $(e.target).find('[name=answer_'+(i+1)+'_'+(j+1)+'_'+(k+1)+']').val();
			if(typeof answerField === 'undefined') break;
			var answerValue = {answer: answerField};
			var answerObject = {};
			answerObject[answerIndex] = answerValue;
			Courses.update({ _id: course._id }, { $push: answerObject});
		    }        
		}
	    }

	    console.log("Yes, we got here.");
	    //   Router.go('coursePage', course);
	}
    });
}
