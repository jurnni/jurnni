/* Javascript functions to create the itinerary object */
var testItinerary = 
{
	"ItineraryName" : "Los Angeles Trip 3 days",
	"ItineraryDetails" : 
	{
		"NumDays": "4",
		"DayDetails": [
			{
				"Date": "9/21/2018",
				"DayOfTheWeek": "Saturday",
				"BeginTime": "10:00 AM",
				"NumberOfActivities": "3",
				"Activities" : [ 
					{
						"ActivityType" : "Eat",
						"ActivityBeginTime" : "800",
						"ActivityEndTime" : "900",
						"ActivityDetails" : 
						{
							"EateryName" : "Noah's Bagels",
							"EateryLocation" : "GPS Coords"
						}
					},
					{
						"ActivityType" : "Commute",
						"ActivityBeginTime" : "900",
						"ActivityEndTime" : "930",
						"ActivityDetails" :
						{
							"CommuteMedium" : "Private Car",
							"ApproximateCommuteTime" : "15 mins",
							"ApproximateCommuteCost" : "3.5$"
						}
					},
					{
						"ActivityType" : "Do",
						"ActivityBeginTime" : "930",
						"ActivityEndTime" : "1045",
						"ActivityDetails" :
						{	
							"CommuteMedium" : "Private Car",
							"ApproximateCommuteTime" : "15 mins",
							"ApproximateCommuteCost" : "3.5$"
						}
					}
				]
			},
			{
				"Date": "9/22/2018",
				"DayOfTheWeek": "Sunday",
				"BeginTime": "10:00 AM",
				"NumberOfActivities": "3",
				"Activities" : [ 
					{
						"ActivityType" : "Eat",
						"ActivityBeginTime" : "800",
						"ActivityEndTime" : "900",
						"ActivityDetails" : 
						{
							"EateryName" : "Noah's Bagels",
							"EateryLocation" : "GPS Coords"
						}
					},
					{
						"ActivityType" : "Commute",
						"ActivityBeginTime" : "900",
						"ActivityEndTime" : "930",
						"ActivityDetails" :
						{
							"CommuteMedium" : "Private Car",
							"ApproximateCommuteTime" : "15 mins",
							"ApproximateCommuteCost" : "3.5$"
						}
					},
					{
						"ActivityType" : "Do",
						"ActivityBeginTime" : "930",
						"ActivityEndTime" : "1045",
						"ActivityDetails" :
						{	
							"CommuteMedium" : "Private Car",
							"ApproximateCommuteTime" : "15 mins",
							"ApproximateCommuteCost" : "3.5$"
						}
					}	
				]
			},
			{
				"Date": "9/23/2018",
				"DayOfTheWeek": "Monday",
				"BeginTime": "10:00 AM",
				"NumberOfActivities": "3",
				"Activities" : [ 
					{
						"ActivityType" : "Eat",
						"ActivityBeginTime" : "800",
						"ActivityEndTime" : "900",
						"ActivityDetails" : 
						{
							"EateryName" : "Noah's Bagels",
							"EateryLocation" : "GPS Coords" 
						}
					},
					{
						"ActivityType" : "Commute",
						"ActivityBeginTime" : "900",
						"ActivityEndTime" : "930",
						"ActivityDetails" :
						{
							"CommuteMedium" : "Private Car",
							"ApproximateCommuteTime" : "15 mins",
							"ApproximateCommuteCost" : "3.5$"
						}
					},
					{
						"ActivityType" : "Do",
						"ActivityBeginTime" : "930",
						"ActivityEndTime" : "1045",
						"ActivityDetails" :
						{	
							"CommuteMedium" : "Private Car",
							"ApproximateCommuteTime" : "15 mins",
							"ApproximateCommuteCost" : "3.5$"
						}
					}	
				]
			},
			{
				"Date": "9/24/2018",
				"DayOfTheWeek": "Tuesday",
				"BeginTime": "10:00 AM",
				"NumberOfActivities": "3",
				"Activities" : [ 
					{
						"ActivityType" : "Eat",
						"ActivityBeginTime" : "800",
						"ActivityEndTime" : "900",
						"ActivityDetails" : 
						{
							"EateryName" : "Noah's Bagels",
							"EateryLocation" : "GPS Coords" 
						}
					},
					{
						"ActivityType" : "Commute",
						"ActivityBeginTime" : "900",
						"ActivityEndTime" : "930",
						"ActivityDetails" :
						{
							"CommuteMedium" : "Private Car",
							"ApproximateCommuteTime" : "15 mins",
							"ApproximateCommuteCost" : "3.5$"
						}
					},
					{
						"ActivityType" : "Do",
						"ActivityBeginTime" : "930",
						"ActivityEndTime" : "1045",
						"ActivityDetails" :
						{	
							"CommuteMedium" : "Private Car",
							"ApproximateCommuteTime" : "15 mins",
							"ApproximateCommuteCost" : "3.5$"
						}
					}	
				]
			}
		]
	}
}
	

function testCreateObject()
{
	var myObj = new Object();
	myObj.itineraryName = "Los angeles trip";
	myObj.numberOfPeople = 6;
	
	console.log(myObj);
}	

/* Parse the test itinerary object */
function loadJsonInTextArea()
{
	// var obj = JSON.parse(testItinerary);
    var pretty = JSON.stringify(testItinerary, undefined, 4);
	document.getElementById("jsonTextArea").innerHTML = pretty;
	//generateItineraryObj();
	
	//testCreateObject();

}

function generateItineraryObj()
{
	try {
		console.log(JSON.parse(document.getElementById("jsonTextArea").value));
	} catch (objError) {
		if (objError instanceof SyntaxError) {
			alert(objError.name);
		} else {
			alert(objError.message);
		}
	}
	testItinerary = JSON.parse(document.getElementById("jsonTextArea").value);
	
	/* Parse with jnParser */
	jnParseItineraryObj("guest", testItinerary);
	
	/* Now iterate over the JSON keys and print values */
	var renderDiv = document.getElementById("renderDiv").innerHTML;
	for (key in testItinerary) {
		var obj = testItinerary[key];
		parseObj(key, obj);
	}
	
}


function parseObj(key, obj)
{
	if (key != "") {
		var renderDiv = document.getElementById("renderDiv").innerHTML;
		renderDiv = renderDiv + "Key: " + key + "<br>";
		document.getElementById("renderDiv").innerHTML = renderDiv;
	}
	if (obj.constructor == Array)  {
		parseArray(key, obj);
	} else if (obj.constructor == String) {
		parseString(obj);
	} else {
		/* This is a regular JSON object */
		for (jsonKey in obj) {
			parseObj(jsonKey, obj[jsonKey]);
		}
	}
}

function parseString(obj)
{
	var renderDiv = document.getElementById("renderDiv").innerHTML;
	if (obj.constructor == String) {
		renderDiv = renderDiv + "Value: " + "<br>";
		renderDiv = renderDiv + " : " + obj + "<br>";
		document.getElementById("renderDiv").innerHTML = renderDiv;		
	}
}

function parseArray(key, obj)
{
	if (obj.constructor != Array) {
		return;
	}
	renderDiv = renderDiv + key + " : " + "<br>"; 
	/* Iterate over the array and parse each object */
	var arrayLength = obj.length;
    for (var i = 0; i < arrayLength; i++) {
		parseObj("", obj[i]);
	}
}


$(document).ready(function() {
	loadJsonInTextArea();
	
	try {
		console.log(JSON.parse(document.getElementById("jsonTextArea").value));
	} catch (objError) {
		if (objError instanceof SyntaxError) {
			alert(objError.name);
		} else {
			alert(objError.message);
		}
	}
	var itJSONObj = JSON.parse(document.getElementById("jsonTextArea").value);
	
	/* Parse with jnParser */
	var itObj = jnParseItineraryObj(itJSONObj);
	
	/* Render the object */
	var renderHTML = jnRenderItinerary(itObj);
	document.getElementById("renderDiv").innerHTML = renderHTML.htmlStr;
	
	// Append the script to the current document's script object
	var renderScript = "\t<script>\n" + "\t\t" + renderHTML.scriptStr + "\n\t</script>\n";
	$("head").append(renderScript);
	
	// Call the created API to initialize
	//initRender();
});