window.onload = function() {

	var longiVal ="";
	var latiVal = "";
    var addressArray = [];
    var cityArray = [];
    var nameArray  =[];
    var phoneArray = [];

	Parse.initialize("OiQcgOBDv6dNNKyIcROFCBK94BqamBwixYCrzGuv", "afR9jgJPGLZWE3e1SiXvUQJsEzVU3R4bPvmt1hsp");
	$("#sendToAll").click(function(){
	var selectedCountry = $("select#selectUrgency").val();
	longiVal = $("div#longtitudeVal").text();
	latiVal = $("div#latitudeVal").text();
	//console.log(selectedCountry + " " + longiVal + " " + latiVal);
	alert("Your alert has been sent. Thank you!");
	});
    var auth = {
        consumerKey : "BcZz2yjcvYnEnUXBr2qqPg",
        consumerSecret : "ZPFJNADA-3I_MLNRx7EWkZROxUo",
        accessToken : "dvo_49FKQYCZJJLmeZFpaC4pNY8vjaSm",
        // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
        // You wouldn't actually want to expose your access token secret like this in a real application.
        accessTokenSecret : "yLpNs-zIDaHfS6FTsBbkiwhbge4",
        serviceProvider : {
            signatureMethod : "HMAC-SHA1"
        }
    };

    var terms = 'Homeless';
    var near = 'Port Authority NYC'
    var cll = '40.8368786,-74.1143506';

    var accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret
    };
    parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['location', near]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {
        'action' : 'http://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);
    console.log(parameterMap);

    $.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'cb',
        'success' : function(data, textStats, XMLHttpRequest) {
            for(var i = 0; i <10; i++){
                console.log(data.businesses[i].location.address);
                console.log(data.businesses[i].location.city);
                console.log(data.businesses[i].name);
                console.log(data.businesses[i].phone);
                addressArray[i] = data.businesses[i].location.address;
                cityArray[i] = data.businesses[i].location.city;
                nameArray[i] = data.businesses[i].name;
                phoneArray[i] = data.businesses[i].phone;
                recordIn(addressArray[i], cityArray[i],nameArray[i],phoneArray[i]);
            }
        }
    });
    /*-----------------------------------*/
    //Facebook's Parse
    /*-----------------------------------------*/

 	function recordIn(address1, city1,name1,phone1){
		var userInfo = Parse.Object.extend('userInfo');
		var parseInfo = new userInfo();
		parseInfo.set('address', address1);
		parseInfo.set('city',city1);
        parseInfo.set('name',name1);
        parseInfo.set('phoneNumber', phone1);
		parseInfo.save().then(
			function(object) {
				console.log("Success; made object ", object.id);
			},
			function(err) { 
				console.log("FAIL");
				console.log(err);
			}
		);
	}
};