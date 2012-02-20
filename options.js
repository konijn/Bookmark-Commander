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



$("#options")[0].innerHTML = $("#options")[0].innerHTML.replace( "[ ]" , "[<span id='always_sort_recursively' class='underblink'>x</span>]")

$("#options")[0].innerHTML = $("#options")[0].innerHTML.replace( "[ ]" , "<input id='blah' lenght='1' width='32px'/>")

outline: none;
}

*/

options = {};

options.show = function()
{
	var div  = options.div  = $("#options")[0];
  var pane = options.pane = $("#glasspane")[0];
  var commanderWidth  = $("#menu")[0].offsetWidth
  var commanderHeight = $("#menu")[0].offsetHeight + $(".border")[0].offsetHeight;

  div.style.display = pane.style.display = "block";

  div.style.left = ( commanderWidth  - div.offsetWidth  ) / 2 + 2;
  div.style.top  = ( commanderHeight - div.offsetHeight ) / 2 + 2;

}

options.hide = function()
{
	options.div.style.display = options.pane.style.display ="none";
}
