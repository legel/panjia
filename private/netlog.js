
var page = require('webpage').create(),
    system = require('system'),
    t, address, waitTime, imagecount, urls, needTitle;

function getSRC(firstTime){

if (system.args.length === 1) {
    console.log('Usage: netlog.js <some URL>');
    phantom.exit(1);
} else {
	
    address = system.args[1];

   if(firstTime===1)
	waitTime = 0;
   //	waitTime = system.args[2];
   else
	waitTime = 3500;

    imagecount=0;
    

    page.onResourceRequested = function (req) {
        //console.log('requested: ' + JSON.stringify(req, undefined, 4));
    };

    page.onResourceReceived = function (res) {
		

	if(imagecount<5){

		/*
		if(res.contentType==="application/json")
		console.log(JSON.stringify(res));
	
		*/

		if(res.contentType==="image/jpeg"/*||(res.contentType==="image/png"&&firstTime===0)*/){
        		console.log(JSON.stringify(res.url, undefined, 4));
			console.log("c======3");
			imagecount++;
    		}

	}
     };
	
    	
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
	    phantom.exit();
        }
	else{
	
	window.setTimeout(function(){
		var title = page.evaluate(function (s){ 
			return document.querySelector(s).innerText;}, 'title' );

		if(imagecount===0&&firstTime===1){
			getSRC(0);
		}
		else{
			console.log(title);
			phantom.exit();
		}
	}, waitTime);
	}
	
    });

}

}


getSRC(1);
