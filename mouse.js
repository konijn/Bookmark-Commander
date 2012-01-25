/*
  Bookmark Commander by Tom J Demuyt is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  Permissions beyond the scope of this license are available by contacting konijn@gmail.com
*/

mouse = {};

mouse.init = function(){

  var i;

  //We go for each item and give it a mouse click event listener
  //Note the very cool 'live' which means listener also counts for newly created divs
  //which happens all the time in bookmark commander
  //if an item was already clicked then we assume the user wants to execute it (delve)
  for( i = 0 ; i < panelheight ; i ++ )
  {
    $("#left"+i).live( "click" ,
      function(e)
      { 
        if( menu.dropdown.style.display == "block" ) menu.exit();
        var n = e.srcElement.id.substring(4)
        if( commander.left.active && commander.left.selected == n )
          commander.delve();
        else
          { commander.left.info = false; commander.left.active = true; commander.right.active = false; commander.left.selected = n; commander.draw(); }
      }
    )
    $("#rite"+i).live( "click" , 
      function(e)
      { 
        if( menu.dropdown.style.display == "block" ) menu.exit();
        var n = e.srcElement.id.substring(4)
        if( commander.right.active && commander.right.selected == n )
          commander.delve();
        else
          { commander.right.info = false; commander.right.active = true; commander.left.active = false; commander.right.selected = n; commander.draw(); }
      }
    )
  }

  //Do the top menu
  //This is a fairly nasty piece of hacking ;\
  //To redeem myself I will make it i18n friendly
  
  bindTopMenu( menu.left );
  bindTopMenu( menu.file );
  bindTopMenu( menu.command );
  bindTopMenu( menu.options );
  bindTopMenu( menu.right );

  // Yes, this is very evil, crossing mouse and menu concerns..
  menu.original = menu.top.innerHTML;


  //Do the actual menu items, which have a very imaginative id system ( 0 -> panelheight -1 )

  for( i = 0 ; i < panelheight ; i ++ )
  {
    $("#"+i).live( "click" , 
      function(e)
      {
        var n = e.srcElement.id*1;
        if( menu.selection == n )
          menu.dispatch(e);
        else
          { menu.selection = n; menu.show(); }
      }
    )
  }

}

/* If we ever get enough user feedback, we might change this
   to jump more than 1 entry per scrolly
*/
mouse.scroll = function(e)
{
  if( e.wheelDelta > 0 )
  {
    //Go Up
    commander.up();
  }
  else
  {
    //Go Down
    commander.down();
  }
  return false;
}

/* Some DRYness*/
function bindTopMenu( _menu )
{
  var top = $("#menu")[0];

  top.innerHTML = top.innerHTML.replace( _menu.caption , '<span id="menu_' + _menu.caption + '">' + _menu.caption + '</span>' );
  $("#menu_" + _menu.caption).live( "click" , function(){  menu.current = _menu; menu.selection = 0; commander.menu(); } );

}