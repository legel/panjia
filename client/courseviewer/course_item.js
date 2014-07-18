Template.courseItem.question_item=function(){
    return this.links;
}

Template.courseItem.events({

    'click .refresh': function (event){
	event.preventDefault();
	staticFind(this._id, this.links[0].url, this._id,1);
    },

    'click .showhide': function(event){
	event.preventDefault();
	
	if (document.getElementById("row"+this._id).style["display"]=="none"){
	    //alert("know it's hidden, change it");
	    document.getElementById("row"+this._id).style["display"]='block';
	    document.getElementById("downup"+this._id).src="/images/upbutton.png";
	}
	else {
	    //alert("know it's showing, hide it");
	    document.getElementById("row"+this._id).style["display"]="none";
	    document.getElementById("downup"+this._id).src="/images/downbutton.png";
	   }
    }
});


Template.courseItem.helpers({
    domain: function() {
	var a = document.createElement('a');
	a.href = this.url;
	return a.hostname;
    },

    question: function(){
	return Questions.find({title: this.title});
    },

    row_id: function() {
	return "row"+this._id;
    },

    downup_id: function(){
	return "downup"+this._id;
    },

    main_question: function(){
	return this.main_question;
    },

    thumb_id: function() {
	return this._id;
    },

    users: function() {
	return Users.find();
    },

    res_img: function() {
	console.log(this.id);
	console.log(this.url);
	if(this.image==""||typeof this.image=="undefined"){
	    staticFind(this.id, this.url, this.id, 0);
	    return;
	}
	else{
	    return this.image;
	}
    },

    img: function() {

	if(this.thumbnail==""||typeof this.thumbnail=='undefined'){
	    staticFind(this._id, this.links[0].url, this._id,1);
	}
	else{
	    return this.thumbnail;
	}
    }
});


function staticFind(ID, URL, record, isMain){
    
    var parser = document.createElement('a');
    parser.href = URL;
    
    if(parser.hostname=="coursera.org")
	dynamic(ID,URL,record,isMain); 	

    else{
	Meteor.call("getTags",URL, function(error, result) {
	    var src=result.pop();
	    result.pop(); 
	    result.pop();
	    
	    if(typeof src=="undefined"||src=="")
		dynamic(ID,URL,record,isMain);
	    else{
		document.getElementById(ID).style.backgroundImage="url('"+src+"')";
		if(isMain==1)	
		    Courses.update(ID, {$set: {thumbnail:src}});
	    }
	    
	});
    }
}

function dynamic(ID, URL, record, isMain){


    Meteor.call("dc", URL, 0 , function(error, result){
	
	var img_src=[];
	
	img_src=result.split("c======3");
        
	var src=img_src[0].slice(1,img_src[0].length-2);
	
	console.log("setting "+ID+" to "+src);	
	document.getElementById(ID).style.backgroundImage="url('"+src+"')";
	
	if(isMain==1){	

	    console.log(isMain);
	    Courses.update(ID, {$set: {thumbnail:src}});
	}
	else{
	    
	}
    });

}
