// MODULE: jnParser                                                                                                                                                                   
// BRIEF: Implementation of the parser and hosted methods

// UTIL functions
function clearArray(thisArray) 
{
    thisArray.splice(0, thisArray.length);
};

// CONSTANT VARS FOR PARSING
const _ITINERARY_DETAILS_KEY = "ItineraryDetails";
const _DAY_DETAILS_KEY = "DayDetails";
const _ACTIVITY_DETAILS_KEY = "ActivityDetails";
const _ACTIVITY_ARRAY_KEY = "Activities";

// CREATE CLASSES/CONSTRUCTORS FOR OBJECTS WE NEED TO CREATE


// Container for the itinerary objects for a given user name
function jnItinerariesForUsernameObj(username)
{
	this._username = username;
	this._itineraries = new Array();
}

// The itinerary object
function jnItineraryObj(id)
{
	this._id = id;
}

// The day object
function jnDayObj(id) {
	this._id = id;
}

// The activity object
function jnActivityObj(id)
{
	this._id = id;
}

// Array of "UserName: [Itinerary ID1, Itinerary ID2]" strings
var _jnAllParsedItineraryObjs = [];

// ACCESSOR FUNCTIONS FOR CLIENTS
//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Returns the number of itineraries that have been analyzed 
//         for the given user name
//-----------------------------------------------------------------------------
function jnParseGetNumItineraries(username) 
{
	var numObjs = -1;
	for (usernameItObj in _jnAllParsedItineraryObjs) {
		var usernameFromObj = usernameItObj._username;
		if (usernameFromObj == username) {
			numObjs = usernameItObj._itineraries.length;
			break;
		}
	}
	
	return numObjs;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Get the i-th itinerary ID for the given user name
//-----------------------------------------------------------------------------
function jnParseGetItineraryForUserName(username, i) 
{
		
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : 
//-----------------------------------------------------------------------------
function jnParseGetNumDaysForItinerary(dayId)
{
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : 
//-----------------------------------------------------------------------------
function jnParseGetDayForItinerary(dayId)
{
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : 
//-----------------------------------------------------------------------------
function jnParseGetNumActivitiesForDay(dayId)
{
	
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : 
//-----------------------------------------------------------------------------
function jnParseGetActivityForDay(dayId, actId)
{
	
}

// PARSE FUNCTIONS
//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Adds a given itinerary for the username
//-----------------------------------------------------------------------------
function jnParseAddItineraryForUsername(username, itObj) 
{
	var addResult = false;
	
	var usernameFound = false;
	for (usernameItObj in _jnAllParsedItineraryObjs) {
		var usernameFromObj = usernameItObj._username;
		if (usernameFromObj == username) {
			usernameItObj._itineraries.push(itObj);
			usernameFound = true;
			break;
		}
	}
	
	if (usernameFound == false) {
	   var itForUsernameObj = new jnItinerariesForUsernameObj(username);
	   itForUserNameObj._itineraries.push(itObj);
	   _jnAllParsedItineraryObjs.push(itForUserNameObj);
	}
	
	return addResult;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Deletes a given activity object
//-----------------------------------------------------------------------------
function jnParseDeleteActivityObj(activityObj) 
{
	delete activityObj;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Deletes given day object
//-----------------------------------------------------------------------------
function jnParseDeleteDayObj(dayObj) 
{
	if (typeof dayObj._activities === undefined) {
		if (dayObj._activities.length > 0) {
			for (jnActivityObj in dayObj._activities) {
				jnParseDeleteActivityObj(jnActivityObj);
			}
			clearArray(dayObj._activities);
		}
	}
	
	delete dayObj;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Deletes a given itinerary object
//-----------------------------------------------------------------------------
function jnParseDeleteItineraryObj(itObj) 
{
	if (typeof itObj._days === undefined) {
		if (itObj._days.length > 0) {
			for (jnDayObj in itObj._days) {
				jnParseDeleteDayObj(jnDayObj);
			}
			clearArray(itObj._days);
		}
	}
	
	delete itObj;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Parse the parameters of an day object 
//         This API parses specific string parameters of a day object
//         and translates it to a JS object property
//         
//         ------------------------------------------------------
//          Key                Value Type           PropertyName
//         ------------------------------------------------------
//          "ActivityType"      string              Type
//          "ActivityBeginTime" string	            BeginTime
//          "ActivityEndTime"   integer             EndTime
//         ------------------------------------------------------ 
//-----------------------------------------------------------------------------
function jnParseActivityParams(activityObj, key, value)
{
	var parseResult = true;
	
	if (key == "ActivityType") {
		activityObj.type = value;
	} else if (key == "ActivityBeginTime") {
		activityObj.beginTime = value;
	} else if (key == "ActivityEndTime") {
		activityObj.endTime = value;
	} else {
		parseResult = false;
	}
	
	return parseResult;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Parse the parameters of an day object
//         This API parses specific string parameters of a day object
//         and translates it to a JS object property
//         
//         ------------------------------------------------------
//          Key                Value Type           PropertyName
//         ------------------------------------------------------
//          "Date"             string               Date
//          "DayOfTheWeek"     string	            DayOfTheWeek
//          "BeginTime"        string               BeginTime
//          "EndTime"          string               EndTime
//          "NumberOfActivities" integer            NumActivities
//         ------------------------------------------------------ 
//-----------------------------------------------------------------------------
function jnParseDayParams(dayObj, key, value)
{
	var parseResult = true;
	
	if (key == "Date") {
		dayObj.Date = value;
	} else if (key == "DayOfTheWeek") {
		dayObj.DayOfTheWeek = value;
	} else if (key == "BeginTime") {
		dayObj.BeginTime = value;
	} else if (key == "EndTime") {
		dayObj.EndTime = value;
	} else if (key == "NumberOfActivities") {
		dayObj.NumActivities = parseInt(value);
	} else {
		parseResult = false;
	}
	
	return parseResult;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Parse the parameters of an itinerary object
//         This API parses specific string parameters of an itinerary object
//         and translates it to a JS object property
//         
//         ------------------------------------------------------
//          Key                Value Type           PropertyName
//         ------------------------------------------------------
//          "ItineraryName"    string               Name
//          "NumDays"          integer	            Integer
//         ------------------------------------------------------
//-----------------------------------------------------------------------------
function jnParseItineraryParams(itObj, key, value)
{
	var parseResult = true;
	
	if (key == "ItineraryName") {
		itObj.Name = value;
	} else if (key == "NumDays") {
		itObj.NumDays = parseInt(value);
	} else {
		parseResult = false;
	}
	
	return parseResult;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Parse day details
//-----------------------------------------------------------------------------
function jnParseActivityArray(dayObj, key, activityArray)
{
	var parseResult = true;
	
	if (key != _ACTIVITY_ARRAY_KEY) {
		return parseResult;
	}
	
	// ---------   BEGIN CONSOLE MESSAGE { ------------------------
		consoleLog = "Parsing activity array and details";
		jnDebugConsoleLog(consoleLog);
	// ----------  END CONSOLE MESSAGE   } ------------------------
	var activityIntId = 0;
	var jnActivityArray = new Array();
	
	for (var i = 0; i < activityArray.length; i++) {
		var activityObj = activityArray[i];
		var jnActivity = new jnActivityObj(activityIntId);
		
		for (activityKey in activityObj) {
			activitySubObj = activityObj[activityKey];
			
			if (activitySubObj.constructor == String) {
				parseResult &= jnParseActivityParams(jnActivity, activityKey, activitySubObj);
			} else if (activitySubObj.constructor == Array) {
				/* Process activity details here */
				if (activityKey != _ACTIVITY_DETAILS_KEY) {
					parseResult = false;
					break;
				}
				for (actDetailKey in activitySubObj) {
					var actDetailObj = activitySubObj[actDetailKey];
					if (actDetailObj.constructor != String) {
						continue;
					}
					parseResult &= jnParseActivityParams(jnActivity, actDetailKey, 
														 actDetailObj);
				}
			}
			if (parseResult == false) {
				break;
			}
		}
		
		if (parseResult == false) {
			jnParseDeleteActivityObj(jnActivityObj);
			break;
		}
		jnActivityArray.push(jnActivity);
		activityIntId++;
	}
	
	if (parseResult == true) {
		if (typeof dayObj._activities === undefined) {
			dayObj._activities = new Array();
		}
		for (jnActivity in jnActivityArray) {
			dayObj._activities.push(jnActivity);
		}
	} else {
		// Delete the jnActivityArray along with the objects
		for (jnActivityObj in jnActivityArray) {
			jnParseDeleteActivityObj(jnActivity);
		}
	}
	delete jnActivityArray;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Parse day details
//-----------------------------------------------------------------------------
function jnParseDayDetails(itObj, key, dayDetailsArray)
{
	var parseResult = true;
	//var numDays = jnParseGetNumDaysForItinerary(itObj);
	
	// ---------   BEGIN CONSOLE MESSAGE { ------------------------
		consoleLog = "Parsing day details";
		jnDebugConsoleLog(consoleLog);
	// ----------  END CONSOLE MESSAGE   } ------------------------
	
	var jnDayArray = [];
	var dayIdInt = 0;
	
	for (var i = 0; i < dayDetailsArray.length; i++) {
		var dayObj = dayDetailsArray[i];
		var jnDayObject = new jnDayObj(dayIdInt);
		// For each day object, go over each property and process
		for (dayProp in dayObj) {
			var dayPropObj = dayObj[dayProp];
			if (dayPropObj.constructor == String) {
				parseResult &= jnParseDayParams(jnDayObject, dayProp, dayPropObj);
			} else if (dayPropObj.constructor == Array) {
				if (dayProp == _ACTIVITY_ARRAY_KEY) {
					parseResult &= jnParseActivityArray(jnDayObject, dayProp,
														dayPropObj);
				}
			}
			if (parseResult == false) {
				break;
			}
		}
		if (parseResult == false) {
			jnParseDeleteDayObj(jnDayObject);
			break;
		}
		dayIdInt++;
		jnDayArray.push(jnDay);
	}
	
	// If the parse result is true add the collected days into the itObj's
	// days array
	if (parseResult == true) {
		if (typeof itObj._days === 'undefined') {
			itObj._days = new Array();
		}
		for (jnDayObject in jnDayArray) {
			itObj._days.push(jnDayObject);
		}
	} else {
		for (jnDayObject in jnDayArray) {
			jnParseDeleteDayObj(jnDayObject);
		}
	}
	
	delete jnDayArray;
	
	return parseResult;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Parse itinerary details
//-----------------------------------------------------------------------------
function jnParseItineraryDetails(itObj, key, itDetailsObj)
{
	var parseResult = true;
	
	if (key != _ITINERARY_DETAILS_KEY) {
		return parseResult;
	}
	
	// ---------   BEGIN CONSOLE MESSAGE { ------------------------
		consoleLog = "Parsing itinerary details";
		jnDebugConsoleLog(consoleLog);
	// ----------  END CONSOLE MESSAGE   } ------------------------

	// Parse details here
	for (itDetailsKey in itDetailsObj) {
		itDetailsSubObj = itDetailsObj[itDetailsKey];
		if (itDetailsSubObj.constructor == String) {
			parseResult &= jnParseItineraryParams(itObj, itDetailsKey, 
												  itDetailsSubObj);
		} else if (itDetailsSubObj.constructor == Array) {
			// Check if we are in the day details section
			if (itDetailsKey == _DAY_DETAILS_KEY) {
				parseResult &= jnParseDayDetails(itObj, itDetailsKey, 
												 itDetailsSubObj);
			}
		}
	}
	
	return parseResult;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 4/28/2019 
// BRIEF : Parse the top level itinerary object. 
//-----------------------------------------------------------------------------
function jnParseItineraryObj(username, itJSONObj)
{
	//var rand = new Person('Rand McNally', 33, 'M');
	//var id = 4;
	//var jnIt = new jnItineraryObj1(id);
	var consoleLog = "";
	
	// ---------   BEGIN CONSOLE MESSAGE { ------------------------
		consoleLog = "Parsing JSON for user name: " + username;
		jnDebugConsoleLog(consoleLog);
	// ----------  END CONSOLE MESSAGE   } ------------------------
	
	// Get the number of itineraries for the current user name
	var numItinerariesForUser = jnParseGetNumItineraries(username);
	
	// ---------   BEGIN CONSOLE MESSAGE { ------------------------
		consoleLog = "Found " + numItinerariesForUser + " for user : " + username;
		jnDebugConsoleLog(consoleLog);
	// ----------  END CONSOLE MESSAGE   } ------------------------
	
	
	// Do error checking of the JSON itObj
	//var jsonObjError = jnParseCheckJSON(itJSONObj);
	//if (jsonObjError == true) {
	//	return 0;
	//}
		
	// Create the itinerary object
	var newItObj = new jnItineraryObj(numItinerariesForUser);
	numItinerariesForUser = numItinerariesForUser + 1;
	
	// Collect parse result
	var parseResult = false;
	
	// Perform iteration of the itinerary object to collect first level details
	for (key in itJSONObj) {	
		var itSubObj = itJSONObj[key];
		
		// ---------   BEGIN CONSOLE MESSAGE { ------------------------
		consoleLog = "Found key:" + key + " in JSON object";
		jnDebugConsoleLog(consoleLog);
		// ----------  END CONSOLE MESSAGE   } ------------------------

		if (itSubObj.constructor == String) {
			
			// ---------   BEGIN CONSOLE MESSAGE { ------------------------
				consoleLog = "String value of key:" + key + " is " + itSubObj + ". Parsing..";
				jnDebugConsoleLog(consoleLog);
			// ----------  END CONSOLE MESSAGE   } ------------------------

			// Collect the string information from the top level itinerary object 
			parseResult &= jnParseItineraryParams(newItObj, key, itSubObj);
			
			
		} else if (itSubObj.constructor == Object) {
			
			// ---------   BEGIN CONSOLE MESSAGE { ------------------------
				consoleLog = "Object found for key:" + key + ". Parsing..";
				jnDebugConsoleLog(consoleLog);
			// ----------  END CONSOLE MESSAGE   } ------------------------

			// Check if we are in the details section
			if (key == _ITINERARY_DETAILS_KEY) {
				parseResult &= jnParseItineraryDetails(newItObj, key, itSubObj);
			}
		}
		
	}
	
	// Add the itinerary object for the username if parseResult is true
	if (parseResult == true) {
		jnParseAddItineraryForUsername(username, newItObj);
	} else {
		jnParseDeleteItineraryObj(newItObj);
	}
	
	return parseResult;
}
