

var menu = {};


//Nuts about parsing
menu.itemize = function( s )
{
  //Skeleton object
  var o = { maxText : 0 , maxKey : 0  };
  //Split out the parameter into menu items
  var ta = s.split(",")  
  //Go over each menu item
  for( key in ta )
  {
    //Init
    o[key] = {};
    //Split text and key
    var textkey = ta[key].split("|")
    //Set text, no risk
    o[key].text = textkey[0];
    //Is this the longest one so far ?
    if( o[key].text.length > o.maxText )
      o.maxText = o[key].text.length;
    //Do we have a key ? Assign and measure
    if(textkey[2])
    {
      //Assign
      o[key].key = textkey[1];
      //Measure
      if( o[key].key.length > o.maxKey )
        o.maxKey = o[key].key.length;
    }
    //See if we have a shortcut by splitting
    var prepost = o[key].text.split("&")
    //Do we have a shortcut
    if( prepost.length == 2 )
    {
      //Deal with the shortcut
      o[key].html = prepost[0] + "<span class='speed'>" + prepost[1].left(1) + "</span>" + prepost[1].substring(1);
    }
    else
    {
      //Or dont deal with it
      o[key].html = o[key].text.remove("&");
    }
    //Finally, remove the pesky & from the text
    o[key].text = o[key].text.remove("&")
  }
  return o;
}

menu.init = function()
{
  menu.dropdown = document.getElementById( "dropdown" )
  menu.top = document.getElementById( "menu" )

  //Each menu is an object
  menu.left    = { caption : "Left"    , items : menu.itemize( "&List,&Info,&Tree,_,Sort by &Date,&Sort by Length,Sort &Alphabetically,_,&Filter,_,&Rescan|C-r" ) };
  menu.file    = { caption : "File"    , items : menu.itemize( "&Help|F1,Mirror|F2,View|F3,Edit|F4,Copy|F5,Move|F6,Create Folder|F7,Delete|F8,Quit|F10,_,Move up|+,Move down|-,Select|*,Filter|/" ) };
  menu.command = { caption : "Command" , items : menu.itemize( "&Search,S&wap panels" ) };
  menu.options = { caption : "Options" , items : menu.itemize( "&Learn Keys" ) };
  menu.right   = { caption : "File"    , items : menu.itemize( "&List,&Info,&Tree,_,Sort by &Date,&Sort by Length,Sort &Alphabetically,_,&Filter,_,&Rescan|C-r" ) };

  menu.left.left  = menu.right;
  menu.left.right = menu.file;

  menu.file.left  = menu.left;
  menu.file.right = menu.command;

  menu.command.left = menu.file;
  menu.command.right = menu.options;

  menu.options.left = menu.command;
  menu.options.right = menu.right;

  menu.right.left = menu.options;
}

menu.show = function()
{

}


menu.dispatch = function( s )
{
  



}
