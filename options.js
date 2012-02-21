/*
  Bookmark Commander by Tom J Demuyt is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  Permissions beyond the scope of this license are available by contacting konijn@gmail.com
*/

/*

$("#menu")[0].offsetWidth
$(".border")[0].offsetHeight

width: 20px;
border: 0px;
background-color: silver;
height: 16px;
padding-top: 0px;

<BLINK> to blink ;]


$("#options")[0].innerHTML = $("#options")[0].innerHTML.replace( "[ ]" , "<input id='blah' lenght='1' width='32px'/>")

outline: none;
}

*/

options = {};


/*
	Fairly evil, would totally fail any code review
	due to coupling UI and control so tightly
	Feel free to submit a patch
*/
options.init = function()
{
	var s = $("#options")[0].innerHTML;

	s = s.replace( "( )" , "(<span id='always_sort_recursively'  class='underblink'> </span>)" );
	s = s.replace( "( )" , "(<span id='ask_sort_recursively'    > </span>)")
	s = s.replace( "(x)" , "(<span id='control_sort_recursively'>x</span>)")

	s = s.replace( "( )" , "(<span id='always_copy_recursively' > </span>)" );
	s = s.replace( "( )" , "(<span id='ask_copy_recursively'    > </span>)")
	s = s.replace( "(x)" , "(<span id='control_copy_recursively'>x</span>)")

	s = s.replace( "[ ]" , "[<span id='trashcan'> </span>]")

	s = s.replace( "&lt;OK&gt;" , "<span id='ok'>&lt;OK&gt;</span>")

	s = s.replace( "Cancel" , "<span id='cancel'>Cancel</span>")


	$("#options")[0].innerHTML = s;
}

options.show = function()
{
	var div  = options.div  = $("#options")[0];
  var pane = options.pane = $("#glasspane")[0];
  var commanderWidth  = $("#menu")[0].offsetWidth
  var commanderHeight = $("#menu")[0].offsetHeight + $(".border")[0].offsetHeight;

  div.style.display = pane.style.display = "block";

  div.style.left = ( commanderWidth  - div.offsetWidth  ) / 2 + 2;
  div.style.top  = ( commanderHeight - div.offsetHeight ) / 2 + 2;

  if( options.init )
  {
  	options.init();
  	delete options.init;
  }

  //Initial the options if they were not set yet
  if( !localStorage.options )
  	options.setDefaults();

  options.setRecursiveSorting();

}

options.setRecursiveSorting = function( newValue )
{
	//Take care of new value if any
  if( newValue)
  	localStorage.options.recursiveSorting = newValue;

  //recursive


}

options.setDefaults = function()
{
	var defaults = { recursiveSorting : 'control' , recursiveCopying : 'control' , trashcan : false }
	localStorage.options = defaults;
}



options.hide = function()
{
	options.div.style.display = options.pane.style.display ="none";
}
