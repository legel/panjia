Template.courseList.helpers({
    courses: function() {
        return Courses.find();
    }
});