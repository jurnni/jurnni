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
// DATE  : 5/20/2019 
// BRIEF : Class to model the default renderer
//-----------------------------------------------------------------------------
function jnRendererDef(jnItObj) 
{
	this.renderObj = function (jnItObj) {
		
	}
}


//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 5/20/2019 
// BRIEF : Top level function to rendner the itinerary and return the HTML 
//         text
//-----------------------------------------------------------------------------
function jnRenderItinerary(jnItObj)
{
	
}