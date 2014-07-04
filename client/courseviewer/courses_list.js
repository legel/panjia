Template.coursesList.helpers({
    courses: function() {
	return Courses.find();
    }
});
