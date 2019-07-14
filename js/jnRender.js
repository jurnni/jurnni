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
// DATE  : 6/11/2019 
// BRIEF : Top level function to generate scripts that are associated with
//         the objects that are rendered
//-----------------------------------------------------------------------------
function jnRenderCreateScr(jnItObj, renderHTML)
{
	var openDayFunc = "function openDay(evt, dayNum)\n" +
					  "{\n" + 
	                  "$('div[id ^= \"jnDay\"]').css(\"display\", \"none\");\n" +
					  "$(\".daybutton\").removeClass(\"daybuttonactive\");\n" +	
					  "$(\"#\" + dayNum).show();\n" +
					  "$(evt.currentTarget).addClass(\"daybuttonactive\");\n" +
					  "}\n";
	renderHTML.scriptStr = renderHTML.scriptStr + openDayFunc + "\n";
}

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
	
	var activityHTML = "<div class =\"" + activitySizeClass + "\">\n";
	activityHTML = activityHTML + "\t<a href=\"#\" class=\"" + activityLinkClass + "\">\n";
	if (activityType == "Move") {
		activityHTML = activityHTML + "\t\t<div id=\"nonresizableActivity\"";
	} else {
		activityHTML = activityHTML + "\t\t<div id=\"resizableActivity\"";
	}
	
	activityHTML = activityHTML + "  class=\"" + activityBaseClass + " ";
	activityHTML = activityHTML + activityBaseClass + "-type-" + activityType.toLowerCase() + "\">\n";
	activityHTML = activityHTML + "\n";
	activityHTML = activityHTML + "\t\t\tBegin :" + jnActivityObj.getBeginTime() + "<br>\n";
	activityHTML = activityHTML + "\t\t\tEnd :" + jnActivityObj.getEndTime() + "<br>\n";
	activityHTML = activityHTML + "\t\t\tActivity Num:" + activityNum + "<br>\n";
	activityHTML = activityHTML + "\t\t</div>\n";
	activityHTML = activityHTML + "\t</a>\n";
	activityHTML = activityHTML + "</div>\n";
	
	dayHTML.htmlStr = dayHTML.htmlStr + activityHTML;
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
	dayHTML.htmlStr = "<div id=\"jnDay" + dayNum.toString() + "\" class = \"dayDiv\"";
	dayHTML.htmlStr = dayHTML.htmlStr + " class=\"tabcontent\">\n";
	dayHTML.htmlStr = dayHTML.htmlStr + " <h4> Day: " + dayNum.toString() + "</h4>";
	
	for (var i = 0; i < dayNumActivities; i = i + 1) 
	{
		var jnActivityObj = jnDayObj.getActivity(i);
		
		// Render the activity object and generate the HTML, css, js
		// in dayHTML
		jnRenderActivity(jnActivityObj, dayHTML, i);
	}
	dayHTML.htmlStr = dayHTML.htmlStr + "</div>\n";
	
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
	
	renderHTML.htmlStr = renderHTML.htmlStr + "\n";
	renderHTML.htmlStr = renderHTML.htmlStr + "<h3> Itinerary Name: " + itName + "</h3>";
	renderHTML.htmlStr = renderHTML.htmlStr + "<br>\n" + "<h4> Number of Days: ";
	renderHTML.htmlStr = renderHTML.htmlStr + itNumDays.toString() + "</h4>";
	renderHTML.htmlStr = renderHTML.htmlStr + "\n<br>";
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
	
	renderHTML.htmlStr = renderHTML.htmlStr + "<div id = \"" + itName + "\" class = \"" + itineraryClass + "\">\n";
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 5/28/2019 
// BRIEF : Top level function to rendner the itinerary and return the HTML 
//         text
//-----------------------------------------------------------------------------
function jnRenderEndHTML(jnItObj, renderHTML)
{
	renderHTML.htmlStr = renderHTML.htmlStr + "</div>\n";
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 6/11/2019 
// BRIEF : 
//       
//-----------------------------------------------------------------------------
function jnRenderDayTabs(jnItObj, renderHTML)
{
	// Check panel HTML
	var panelHTML = "";
	
	// Generate the panel
	panelHTML = "<div class=\"tab\">\n";
	
	// Get the number of days
	var numDays = jnItObj.getNumDays();
	
	// Iterate over each day and generate a name for each
	for (var i = 0; i < numDays; i = i + 1)
	{
		var dayNum = i + 1;
		panelHTML = panelHTML + "\t<button class = \"daybutton\"";
		panelHTML = panelHTML + " onclick=\"openDay(event, 'jnDay" + dayNum.toString();
		panelHTML = panelHTML + "')\"> Day " + dayNum.toString() + "</button>\n";
	}
	
	// Generate the panel
	panelHTML = panelHTML + "</div>\n";
	
	// Append to renderHTML
	renderHTML.htmlStr = renderHTML.htmlStr + panelHTML;
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
	
	// Generate the tabbed days with buttons
	jnRenderDayTabs(jnItObj, renderHTML);
	
	// Iterate over each days and get the actvities
	for (var i = 0; i < numDays; i = i + 1) 
	{
		var dayObj = jnItObj.getDay(i);
		
		// Get the rendering of the day HTML
		var dayHTML = jnRenderGetDayAsHTML(dayObj, i + 1);
		
		// Merge the dayHTML with the renderHTML
		renderHTML.htmlStr = renderHTML.htmlStr + dayHTML.htmlStr;
	}

	// Terminate the rendered Itinerary HTML
	jnRenderEndHTML(jnItObj, renderHTML);
	
	// Install the renderer JS code in the scripts
	jnRenderCreateScr(jnItObj, renderHTML);
	
	return renderHTML;
}