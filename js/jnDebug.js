// MODULE: jnDebug                                                                                                                                                             
// BRIEF: Implementation of the debugger and related methods

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 5/4/2019 
// BRIEF : Debug function to print messages into the console
//-----------------------------------------------------------------------------
function jnDebugConsoleLog(dbgMsg)
{
	var debugPrefix = "JN DEBUG: ";
	dbgMsg = debugPrefix + dbgMsg;
	console.log(dbgMsg);
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 5/4/2019 
// BRIEF : Debug function to print an object into the console
//-----------------------------------------------------------------------------
function jnDebugShowObj(obj)
{
	console.log(obj);
}

//-----------------------------------------------------------------------------
// AUTHOR: nakul
// DATE  : 5/4/2019 
// BRIEF : Debug function to print messages in an alert box
//-----------------------------------------------------------------------------
