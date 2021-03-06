// MODULE: jnRender                                                                                                                                                                   
// BRIEF: Implementation of the renderer 

// UTIL functions

// ----------------------------------------------------------------------------
// Overall architecture
// ----------------------------------------------------------------------------
// The purpose of the renderer is to render the itinerary object in the HTML
// page 
// The renderer could have multiple modes which can render the object in 
// different ways.
// INPUT to Renderer:
//   Itinerary object as a parsed javascript object
// OUTPUT from Renderer:
//	 A DIV with inner HTML which contains the object
//
// Input javascript object:
//   The renderer assumes that the input javascript object has the following
//   functions:
//
//
//
//
//


//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 5/28/2019 
// BRIEF : Render the day as HTML
//-----------------------------------------------------------------------------
function jnRenderActivity(jnActivityObj, dayHTML, activityNum)
{
	var activitySizeClass = "activity-size";
	var activityLinkClass = "activity-link";
	var activityBaseClass = "activity";
	var activityType = jnActivityObj.getType();
	
	var activityHTML = "<div class =\"" + activitySizeClass + ">\n";
	activityHTML = activityHTML + "   <a href=\"#\" class=\"" + activityLinkClass + ">\n";
	if (activityType == "Move") {
		activityHTML = activityHTML + "     <div id=\"nonresizableActivity\"";
	} else {
		activityHTML = activityHTML + "     <div id=\"resizableActivity\"";
	}
	
	activityHTML = activityHTML + "  class=\"" + activityBaseClass + " ";
	activityHTML = activityHTML + activityBaseClass + "-type-" + activityType + "\">\n";
	activityHTML = activityHTML + "\n";
	activityHTML = activityHTML + "<p>Begin :" + jnActivityObj.getBeginTime() + "</p>\n";
	activityHTML = activityHTML + "<p>End :" + jnActivityObj.getEndTime() + "</p>\n";
	activityHTML = activityHTML + "<p>Activity Num:" + activityNum + "</p>\n";
	activityHTML = activityHTML + "     </div>\n";
	activityHTML = activityHTML + "  </a>\n";
	activityHTML = activityHTML + "</div>\n";
	
	dayHTML.htmlStr = dayHtml.htmlStr + activityHTML;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 5/28/2019 
// BRIEF : Render the day as HTML
//-----------------------------------------------------------------------------
function jnRenderGetDayAsHTML(jnDayObj, dayNum)
{
	var dayHTML = { htmlStr : "", cssStr : "", scriptStr : "" };
	
	var dayClass = "day";
	var date = jnDayObj.getDate();
	var dayOfTheWeek = jnDayObj.getDayOfTheWeek();
	var dayBeginTime = jnDayObj.getBeginTime();
	var dayEndTime = jnDayObj.getEndTime();
	var dayNumActivities = jnDayObj.getNumActivities();
	
	// Setup the day div
	var dayHTMLStr = "<div id=\"jnDay" + dayNum.toString() + "\"";
	var dayHTMLStr = " class=\"" + dayClass + "\">\n"; 
	for (var i = 0; i < dayNumActivities; i = i + 1) 
	{
		var jnActivityObj = jnDayObj.getActivity(i);
		
		// Render the activity object and generate the HTML, css, js
		// in dayHTML
		jnRenderActivity(jnActivityObj, dayHTML, i);
	}
	var dayHTMLStr = "</div>\n";
	
	dayHTML.htmlStr = dayHTML.htmlStr + dayHTMLStr;
	
	return dayHTML;
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 5/28/2019 
// BRIEF : Render the details of the itinerary as HTML
//-----------------------------------------------------------------------------
function jnRenderGetItineraryDetailsAsHTML(jnItObj, renderHTML)
{
	var itName = jnItObj.getName();
	var itNumDays = jnItObj.getNumDays();
	
	renderHTML.str = renderHTML.str + "\n";
	renderHTML.str = renderHTML.str + "<h3> Itinerary Name: " + itName + "</h3>";
	renderHTML.str = renderHTML.str + "<br>\n" + "<h4> Number of Days: ";
	renderHTML.str = renderHTML.str + Integer(itNumDays).toString() + "</h4>";
	renderHTML.str = renderHTML.str + "\n<br>";
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 5/28/2019 
// BRIEF : Initialize the itinerary HTML and populate renderHTML
//-----------------------------------------------------------------------------
function jnRenderInitHTML(jnItObj, renderHTML)
{
	var itName = jnItObj.getName();
	var itineraryClass = "itinerary";
	
	renderHTML.str = "<div id = \"" + itName + "\" class = \"" + itineraryClass + "\">\n";
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 5/28/2019 
// BRIEF : Top level function to rendner the itinerary and return the HTML 
//         text
//-----------------------------------------------------------------------------
function jnRenderEndHTML(jnItObj, renderHTML)
{
	renderHTML.str = "</div>\n";
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 5/20/2019 
// BRIEF : Top level function to rendner the itinerary and return the HTML 
//         text
//-----------------------------------------------------------------------------
function jnRenderItinerary(jnItObj)
{
	var renderHTML = { htmlStr : "", cssStr : " ", scriptStr : "" };
	
	// Initialize render HTML
	jnRenderInitHTML(jnItObj, renderHTML);
	
	// Process the itinerary object to capture essential parameters
	jnRenderGetItineraryDetailsAsHTML(jnItObj, renderHTML);
		
	// Get the number of days
	var numDays = jnItObj.getNumDays();
	
	// Iterate over each days and get the actvities
	for (var i = 0; i < numDays; i=i+1) 
	{
		var dayObj = jnItObj.getDay(i);
		
		// Get the rendering of the day HTML
		var dayHTML = jnRenderGetDayAsHTML(dayObj);
		
		// Merge the dayHTML with the renderHTML
		renderHTML.htmlStr = renderHTML.htmlStr + dayHTML.htmlStr;
	}

	// Terminate the rendered Itinerary HTML
	jnRenderEndHTML(jnItObj, renderHTML);
}