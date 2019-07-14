// MODULE: jnParse                                                                                                                                                               
// BRIEF: Implementation of the parser and hosted methods

// CONSTANT VARS FOR PARSING
const _ITINERARY_DETAILS_KEY = "ItineraryDetails";
const _DAY_DETAILS_KEY = "DayDetails";
const _ACTIVITY_DETAILS_KEY = "ActivityDetails";
const _ACTIVITY_ARRAY_KEY = "Activities";

// CREATE CLASSES/CONSTRUCTORS FOR OBJECTS WE NEED TO CREATE
//******************************************************************************
// Global to store the number of itineraries that have been parsed and processed
//******************************************************************************
var numParsedItineraries = 0;
function isEmpty(value){
  return (value == null || value === '');
}

//******************************************************************************
// The itinerary object
//******************************************************************************
function jnItineraryObj(id)
{
	this._id = id;
	
	// Get the name of the itinerary
	this.getName = function() {
		var name = "";
		if (!isEmpty(this._name)) {
			name = this._name;
		}
		return name;
	}
	
	// Get the number of days of the itinerary
	this.getNumDays = function() {
		return this._numDays;
	}
	
	// Get the day corresponding to dayNum from the itinerary 
	// object's _days array
	this.getDay = function(dayNum) {
		var dayObj = {};
		if (!isEmpty(this._days)) {
			if (this._days.length > dayNum) {
				dayObj = this._days[dayNum];
			}
		}
		return dayObj;
	}
}

//******************************************************************************
// The day object
//******************************************************************************
function jnDayObj(id) {
	this._id = id;
	
	// Get the ID of the day object
	this.getId = function() {
		return this._id;
	}
	
	// Get the date of the day object
	this.getDate = function() {
		var date = {};
		if (!isEmpty(this._date)) {
			date = this._date;	
		}
		return this._date;
	}
	
	// Get the day of the week
	this.getDayOfTheWeek = function() {
		var dayOfTheWeek = {};
		if (!isEmpty(this._dayOfTheWeek)) {
			dayOfTheWeek = this._dayOfTheWeek;
		}
		
		return this._dayOfTheWeek;
	}
	
	// Get the begin time of the day
	this.getBeginTime = function() {
		var beginTime = {};
		if (!isEmpty(this._beginTime)) {
			beginTime = this._beginTime;
		}
		
		return this._beginTime;
	}

	// Get the end time of the day
	this.getEndTime = function() {
		var endTime = {};
		if (!isEmpty(this._endTime)) {
			endTime = this._endTime;
		}
		
		return endTime;
	}
	
	// Get the number of activities in the day
	this.getNumActivities = function() {
		var numActivities = {};
		if (!isEmpty(this._numActivities)) {
			numActivities = this._numActivities;
		}
		return numActivities;
	}
	
	// Get the activity indexed by activity num from the 
	// _activities array
	this.getActivity = function(activityNum) {
		var activityObj = {};
		if (!isEmpty(this._activities)) {
			if (this._activities.length > activityNum) {
				activityObj = this._activities[activityNum];
			}
		}
		
		return activityObj;
	}
}

//******************************************************************************
// The activity object
//******************************************************************************
function jnActivityObj(id)
{
	this._id = id;
	
	// Get the name of the activity
	this.getName = function() {
		var name = "";
		if (!isEmpty(this._name)) {
			name = this._name;
		}
		return name;
	}
	
	// Get the type of the activity
	this.getType = function() {
		var type = "";
		if (!isEmpty(this._type)) {
			type = this._type;
		}
		return type;
	}
	
	// Get the begin time of the activity
	this.getBeginTime = function() {
		var beginTime = {};
		if (!isEmpty(this._beginTime)) {
			beginTime = this._beginTime;
		}
		return beginTime;
	}
	
	// Get the end time of the activity
	this.getEndTime = function() {
		var endTime = {};
		if (!isEmpty(this._endTime)) {
			endTime = this._endTime;
		}
		return endTime;
	}
	
	// Get the title of the activity
	this.getTitle = function() {
		var title = "";
		if (!isEmpty(this._title)) {
			title = this._title;
		}
	}
}

// ACCESSOR FUNCTIONS FOR CLIENTS
// PARSE FUNCTIONS
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
	if (dayObj._activities === undefined) {
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
	if (itObj._days === undefined) {
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
		activityObj._type = value;
	} else if (key == "ActivityBeginTime") {
		activityObj._beginTime = value;
	} else if (key == "ActivityEndTime") {
		activityObj._endTime = value;
	} else {
		// ---------   BEGIN CONSOLE MESSAGE { ------------------------
			consoleLog = "Error while parsing key: " + key + " in activity";
			jnDebugConsoleLog(consoleLog);
		// ----------  END CONSOLE MESSAGE   } ------------------------
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
		dayObj._date = value;
	} else if (key == "DayOfTheWeek") {
		dayObj._dayOfTheWeek = value;
	} else if (key == "BeginTime") {
		dayObj._beginTime = value;
	} else if (key == "EndTime") {
		dayObj._endTime = value;
	} else if (key == "NumberOfActivities") {
		dayObj._numActivities = parseInt(value);
	} else {
		// ---------   BEGIN CONSOLE MESSAGE { ------------------------
			consoleLog = "Error while parsing key: " + key + " in day object";
			jnDebugConsoleLog(consoleLog);
		// ----------  END CONSOLE MESSAGE   } ------------------------
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
		itObj._name = value;
	} else if (key == "NumDays") {
		itObj._numDays = parseInt(value);
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
			jnParseDeleteActivityObj(jnActivity);
			break;
		}
		jnActivityArray.push(jnActivity);
		activityIntId++;
	}
	
	if (parseResult == true) {
		if (dayObj._activities === undefined) {
			dayObj._activities = new Array();
		}
		for (var i = 0; i < jnActivityArray.length; i++) {
			var jnActivityObject = jnActivityArray[i];
			dayObj._activities.push(jnActivityObject);
		}
	} else {
		// Delete the jnActivityArray along with the objects
		for (var i = 0; i < _activities.length; i++) {
			var jnActivityObject = jnActivityArray[i];
			jnParseDeleteActivityObj(jnActivityObject);
		}
	}
	
	delete jnActivityArray;
	
	return parseResult;
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
		jnDayArray.push(jnDayObject);
	}
	
	// If the parse result is true add the collected days into the itObj's
	// days array
	if (parseResult == true) {
		if (typeof itObj._days === 'undefined') {
			itObj._days = new Array();
		}
		for (var i = 0; i < jnDayArray.length; i++) {
			var jnDayObject = jnDayArray[i];
			itObj._days.push(jnDayObject);
		}
	} else {
		for (var i = 0; i < jnDayArray.length; i++) {
			var jnDayObject = jnDayArray[i];
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
function jnParseItineraryObj(itJSONObj)
{
	var consoleLog = "";
	
	// Create the itinerary object
	var newItObj = new jnItineraryObj(numParsedItineraries);
	numParsedItineraries = numParsedItineraries + 1;
	
	// Collect parse result
	var parseResult = true;
	
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
	if (parseResult == false) {
		delete newItObj;
		newItObj = {};
	}
	
	return newItObj;
}
