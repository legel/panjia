var cheerio =Npm.require('cheerio');

Future =Npm.require('fibers/future');

Meteor.methods({


    dc: function (URL) { 

	var exec =Npm.require('child_process').exec;
	var sys = Npm.require('sys');
	var result;

	var fut=new Future();

	setTimeout(function(){

	    exec("phantomjs netlog.js " + URL + " ", {cwd: '/Users/Niels/git/panjia/panjia-mvp-step0/private'}, function(error, stdout, stderr) {

		console.log(stdout);

		fut['return'](stdout);
		
	    });
	}, 1);
	
	return fut.wait();

    },

    getTags: function (URL) {
        result = Meteor.http.get(URL);
        $ = cheerio.load(result.content);
        var meta = $('meta');
        var keys = Object.keys(meta);

	var ogImage;
	var ogTitle;
	var description;

	keys.forEach(function(key){
	    if (  meta[key].attribs
		  && ((meta[key].attribs.property
		       && meta[key].attribs.property === 'og:image')||(meta[key].attribs.name&&meta[key].attribs.name==='og:image'))) {
		ogImage = meta[key].attribs.content;
	    }
	});

	keys.forEach(function(key){
	    if (  meta[key].attribs
		  &&(( meta[key].attribs.property
		       && meta[key].attribs.property === 'og:title')||(meta[key].attribs.name&&meta[key].attribs.name==='og:title'))) {
		ogTitle = meta[key].attribs.content;
	    }
	});

	keys.forEach(function(key){
	    if (  meta[key].attribs
		  && (meta[key].attribs.name||meta[key].attribs.property)
		  && (meta[key].attribs.name === 'description'||meta[key].attribs.name === 'Description'||meta[key].attribs.name === 'og:description'||meta[key].attribs.property==='og:description')) {
		description = meta[key].attribs.content;
	    }
	});

	if(!ogTitle){
	    
	    var tit=$('title');
	    ogTitle=tit.text();

	}


	var result = [];
	result.push(ogTitle);
	result.push(description);
	result.push(ogImage);

	console.log(ogImage);
	console.log(ogTitle);
	console.log(description);

        //CurrentTime = $('#ct').html();
        return result;
    },

    dynamicCrawl: function (URL){

	var spooky = new Spooky({
            child: {
		transport: 'http'
            },
            casper: {
		logLevel: 'debug',
		verbose: true
            }
	}, function (err) {
            if (err) {
		e = new Error('Failed to initialize SpookyJS');
		e.details = err;
		throw e;
            }

            spooky.start(URL);

            spooky.then(function () {
		this.wait(1000, function () {
		    //this.capture('pic.png');
		    this.emit('hello', this.evaluate(function () {
			return document;
		    }))
		});
            });
            spooky.run();
	});

	spooky.on('error', function (e, stack) {
	    console.error(e);

	    if (stack) {
		console.log(stack);
	    }
	});

	/*
	// Uncomment this block to see all of the things Casper has to say.
	// There are a lot.
	// He has opinions.
	spooky.on('console', function (line) {
	console.log(line);
	});
	*/


	spooky.on('hello', function (greeting) {   
	    //console.log(greeting);
	    //$ = cheerio.load(greeting.content);
	    $=JSON.stringify(greeting);
	    //jsonobj=JSON.parse($);
	    //console.log(jsonobj[0].innerHTML);

	    var fs =Npm.require('fs');
	    fs.writeFile("/tmp/blah.txt",$, function(err) {
		if(err) {
		    console.log(err);
		} else {
		    console.log("The file was saved!");
		}
	    }); 
	});

	spooky.on('log', function (log) {
	    if (log.space === 'remote') {
		// console.log(log.message.replace(/ \-., ''));
	    }
	});
	/*

var fs =Npm.require('fs');

// First I want to read the file
fs.readFile('/tmp/blah.txt', function read(err, data) {
if (err) {
throw err;
}
content = data.toString();

});
return content;

*/
var blah="bladsa";
return blah;
}
});

