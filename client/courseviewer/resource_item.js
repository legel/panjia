Template.resource_item.helpers({

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
