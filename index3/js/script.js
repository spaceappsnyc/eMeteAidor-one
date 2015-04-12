window.onload = function() {
	$("#tttitle").text($("#tttitle").text() + "New York City");
	Parse.initialize("OiQcgOBDv6dNNKyIcROFCBK94BqamBwixYCrzGuv", "afR9jgJPGLZWE3e1SiXvUQJsEzVU3R4bPvmt1hsp");
	var addressArray = "";
	var cityArray = "";
	var nameArray = "";
	var phoneArray = "";
	var haddressArray = "";
	var hcityArray = "";
	var hnameArray = "";
	var hphoneArray = "";
	function updatePage(){
		var i = 0;
		var parseInfo = new Parse.Query('userInfo');
		parseInfo.find({
		  success: function(results) {
		  	for(i = 0; i < results.length; i++){
			  	addressArray = results[i].get('address');
			  	cityArray =results[i].get('city');
			  	nameArray =results[i].get('name');
			  	phoneArray = results[i].get('phoneNumber');
			  	//console.log("addressArray: " + addressArray + " cityArray: " +cityArray);
				postOnPage(i,addressArray,cityArray,nameArray,phoneArray);
			}	
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}
	function updatePageHospital(){
		var i = 0;
		var hosInfo = new Parse.Query('hospitalFind');
		hosInfo.find({
		  success: function(results) {
		  	for(i = 0; i < results.length; i++){
			  	haddressArray = results[i].get('haddress');
			  	hcityArray =results[i].get('hcity');
			  	hnameArray =results[i].get('hname');
			  	hphoneArray = results[i].get('hphoneNumber');
			  	//console.log("haddressArray: " + haddressArray + " hcityArray: " +hcityArray);
				hpostOnPage(i,haddressArray,hcityArray,hnameArray,hphoneArray);
			}	
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}
	updatePage();
	updatePageHospital();
	var script = "";
	var hscript = "";
	function postOnPage(i,addressArray,cityArray,nameArray,phoneArray){
		console.log("i: "+i);
		script = "<div class=' shellContainer'><div class='sh name"+i+"'></div><div class='sh city"+i+"'></div><div class='sh address"+i+"'></div><div class='sh phnum"+i+"'></div></div>"
		$("#sheltersPlaces").append(script);
		$(".name"+i).html(nameArray);
		$(".city"+i).html(phoneArray);
		$(".address"+i).html(cityArray);
		$(".phnum"+i).html(phoneArray);
	}
	function hpostOnPage(i,haddressArray,hcityArray,hnameArray,hphoneArray){
		console.log("i: "+i);
		hscript = "<div class='hshellContainer'><div class='hsh hname"+i+"'></div><div class='hsh hcity"+i+"'></div><div class='hsh haddress"+i+"'></div><div class='hsh hphnum"+i+"'></div></div>"
		$("#hospitalLoc").append(hscript);
		$(".hname"+i).html(hnameArray);
		$(".hcity"+i).html(hphoneArray);
		$(".haddress"+i).html(hcityArray);
		$(".hphnum"+i).html(hphoneArray);
	}
	/*-------------------------------------------------------------------*/
function getVenmoInfo(){
    	var date_completed = [];
    	var first_name = [];
    	var last_name = [];
    	var note = [];
    	var vAmt = [];
    	var chargeCheck = "charge";
    	var totalAmount = 0;
	    $.ajax({
	        url: 'https://api.venmo.com/v1/payments?access_token=add8e15349231265466651c5422ff9c4274eec979decfd33cd32da78b07c86b6',
	        type: "GET",
	        success: function(poop) {
	        	console.log(poop.length);
	        	for(var i = 0; i< 10; i++){
	        		if(poop.data[i].action == chargeCheck){
			        	date_completed[i] = poop.data[i].date_completed;
			        	first_name[i] = poop.data[i].target.user.first_name;
			        	last_name[i] = poop.data[i].target.user.last_name;
			        	vAmt[i] = poop.data[i].amount;
			        	totalAmount += vAmt[i];
			        	console.log(
			        		date_completed[i] +"\n" +
			        		first_name[i] +"\n" +
			        		last_name[i] +"\n" +
			        		note[i] +"\n" +
			        		vAmt[i] +"\n" 
			        	);
			        	makeitem(i,date_completed[i], first_name[i],last_name[i],vAmt[i]);
			        }
		        }
	        }
	    });
	};
	var script = "";
	function makeitem(i,dte, fn, ln, v){
		console.log("i: "+i);
		script = $("<div class='ApDiv2'><div class='ApDiv dte1 dte"+i+"'></div><div class='ApDiv fn1 fn"+i+"'></div><div class='ApDiv ln1 ln"+i+"'></div></div><div class='v1 v"+i+"'></div></div>");
		$("#actNeedMoney").append(script);
		$(".dte"+i).html(dte);
		$(".fn"+i).html(fn);
		$(".ln"+i).html(ln);
		$(".v"+i).html("$"+v);
	}
	getVenmoInfo();
/*--------------------------------------------------------------------*/
	$("#inputBingSearch").click(function(){
		var inputQuery = $("#inputBing").val();
		window.location.href = "http://www.bing.com/search?q="+inputQuery;
	});
};