/*
  Bookmark Commander by Tom J Demuyt is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  Permissions beyond the scope of this license are available by contacting konijn@gmail.com
*/
  var commander   = {};

  commander.left  = { id : "0" , selected : 0  , scroll : 0 , active : true  , prefix : "left" , info: false };
  commander.right = { id : "0" , selected : 0  , scroll : 0 , active : false , prefix : "rite" , info: false };
  commander.left.other = commander.right;
  commander.right.other = commander.left;
  commander.bookmarks = {};
  commander.viewing = false;
  commander.editing = false;

  /****
   **
   * Regular panel
   **
   ****/

  commander.setPanel = function( panelConfig )
  {
    //Show we be here ?
    if( panelConfig.info )
      return commander.setInfoPanel( panelConfig );

    var o = findBookmarkId( commander.bookmarks , panelConfig.id );

    //Are we clear ?
    if( !document.getElementById("end") )
      return;

    //Deal with trouble
    if( !o || !o.children )
    {
      //If we are looking at a dead folder by any chance, just go to the root
      if( panelConfig.id != "0" )
      {
        panelConfig.id = "0";
        commander.setPanel( panelConfig );
        return;
      }
      else
      {
        //This should never happen as well
        alert("Bookmark Commander regrets to inform you that it cannot display your bookmarks,\n please hit refresh and try again.");
      }
    }

    //Set the folder structure on top
    var title = findBookmarkTitle( panelConfig.id );

    document.getElementById( panelConfig.prefix + "root" ).innerHTML = "╔" + ( title + doublebar.repeat( panelwidth ) ).left(panelwidth) + "╗";

    //Clear out the children
    for( var counter = 0 ; counter < panelheight ; counter++ )
    {
      document.getElementById( panelConfig.prefix + counter ).innerHTML = ( " ".repeat(panelwidth) );
      document.getElementById( panelConfig.prefix + counter ).setAttribute("class", "border" );
    }

    //We merely do this to facilitate the following trick
    var children = [].concat( o.children );

    //Do we have a parent ?, if so top the entries with '..'
    if( o.parentId )
    {
      children.reverse();
      children.push( { children: true , title : ".." , id : o.parentId } );
      children.reverse();
    }

    //Other parties are interested in how many items there really are
    panelConfig.itemcount = children.length;

    //Keep counter post-loop for sanity checks
    var counter;

    //Delete any reference to selectedBookmark, it might just go wrong with the info panel
    delete panelConfig.selectedBookmark;

    //Go over the children ( folders + bookmarks )
    for( counter = 0; counter < panelheight && counter+panelConfig.scroll < children.length ;counter++)
    {
      //Get the child
      var child  = children[counter+panelConfig.scroll];
      //Default bookmark prefix and style
      var prefix = " ";
      var style  = "border";

      //This should never happen ™
      if( !child )
        child = { url : '', title: ''  }

      //If there are no children though, take out the slash
      if( child.children )
        prefix = "/";

      //Are we looking at a javascript ?
      if( child.url && child.url.startsWith( "javascript" ) )
        style = "js"

      //If we look at the selected one the style is different
      if( counter == panelConfig.selected && panelConfig.active )
      {
        style = "selected"
        //Lets also show the url
        if( child.url )
        {
          var url = child.url.left( ((panelwidth+1)*2) ).extend( (panelwidth+1)*2 );
          document.getElementById( "url" ).innerHTML = url;
        }
        else
        {
          document.getElementById( "url" ).innerHTML = " ".repeat((panelwidth+1)*2);
        }
        panelConfig.selectedBookmark = child.id;
      }

      //Get the element
      var element = document.getElementById( panelConfig.prefix + counter );

      //set the style
      element.setAttribute("class", style );

      //Set the content
      element.innerHTML =  ( prefix + child.title ).extend( panelwidth );

      //Set the new index
      element.commander = { id : child.id };
    }
    //Since speed is of no concern, I just redraw the screen if we missed the selected item due to deletion ;)
    if( panelConfig.selected >= counter )
      commander.end();
  }

  /****
   **
   * Info panel
   **
   ****/
  commander.setInfoPanel = function( panelConfig )
  {
    var o = findBookmarkId( commander.bookmarks , panelConfig.other.selectedBookmark );

    //Are we clear ?
    if( !document.getElementById("end") )
      return;

    //Deal with trouble
    if( !o )
    {
      //If we are looking at a dead folder by any chance, just go to the root
      if( panelConfig.id != "0" )
      {
        panelConfig.id = "0";
        commander.setPanel( panelConfig );
        return;
      }
      else
      {
        //This should never happen as well, except if we are in the menu ( other panel is inactive as well )
        if( !panelConfig.other.active )
          return;
        else
          alert("Bookmark Commander regrets to inform you that it cannot display the info on this bookmark,\n please hit refresh and try again.");
      }
    }

    //Do not set the folder structure on top
    document.getElementById( panelConfig.prefix + "root" ).innerHTML = "╔" + doublebar.repeat( panelwidth ) + "╗";

    //Clear out the children
    for( var counter = 0 ; counter < panelheight ; counter++ )
    {
      document.getElementById( panelConfig.prefix + counter ).innerHTML = ( " ".repeat(panelwidth) );
      document.getElementById( panelConfig.prefix + counter ).setAttribute("class", "border" );
    }

    //Deal with root, put some arbitrary value
    if( o.id == "0" )
    {
      o.title    = "root";
      o.index    = 0;
      o.parentId = 0;
    }

    var line = 0;

     var element = document.getElementById( panelConfig.prefix + line++ );
     if( o.title )
       element.innerHTML = ( o.title ).extend( panelwidth );

     line++;

     if( o.dateAdded )
     {
       element = document.getElementById( panelConfig.prefix + line++ );
       var d = new Date()
       d.setTime( o.dateAdded  );
       element.innerHTML = ( "  added:    " + d.format() ).extend( panelwidth );
     }

     if( o.dateGroupModified )
     {
       element = document.getElementById( panelConfig.prefix + line++ );
       var d = new Date()
       d.setTime( o.dateGroupModified  );
       element.innerHTML = ( "  changed:  " + d.format() ).extend( panelwidth );
     }

     element = document.getElementById( panelConfig.prefix + line++ );
     element.innerHTML = ( "  id:       " + o.id ).extend( panelwidth );

     element = document.getElementById( panelConfig.prefix + line++ );
     element.innerHTML = ( "  index:    " + o.index ).extend( panelwidth );

     element = document.getElementById( panelConfig.prefix + line++ );
     element.innerHTML = ( "  parent:   " + o.parentId ).extend( panelwidth );

     element = document.getElementById( panelConfig.prefix + line++ );
     if( o.children )
     {
       element.innerHTML = ( "  children: " + o.children.length ).extend( panelwidth );
     }
     else
     {
        //Sugar
        var url = o.url;

        while( url.length > panelwidth )
        {
          //Get the victim, leave implicit space for first entry
          element = document.getElementById( panelConfig.prefix + line++ );
          //content
          element.innerHTML = url.left( panelwidth );
          //remainder
          url = url.substring(panelwidth);
        }
        if( url.length > 0 )
        {
          //Get the victim
          element = document.getElementById( panelConfig.prefix + line++ );
          //content
          element.innerHTML = url.extend( panelwidth );
        }
     }
  }

  /* TAB, SWAP */
  commander.swapPanel = function()
  {
    var panel = commander.left.active ? commander.left : commander.right;
    //Dont make an info panel active
    if( panel.other.info )
      return;

    commander.left.active  = !commander.left.active;
    commander.right.active = !commander.right.active;
    commander.draw();
  }

  /* Prelude to SELECT, ENTER */
  commander.delve = function()
  {
    var panel = commander.left.active ? commander.left : commander.right;

    var id = document.getElementById( panel.prefix + panel.selected ).commander.id;

    commander.select( id );
  }

  /* SELECT, ENTER */
  commander.select = function( index )
  {
    var panel = commander.left.active ? commander.left : commander.right;

    //Do we want to select this for real ?
    var bookmark = findBookmarkId( commander.bookmarks , index );
    //Go deeper if its a folder, or as the case may be, higher
    if( bookmark.children )
    {
      panel.id = index;
      panel.selected = 0;
      panel.scroll = 0;
      commander.draw();
    }
    //Open if its a bookmark
    else if( bookmark.url && bookmark.url.startsWith( [ "http" , "file" ] ) )
    {
      chrome.tabs.getCurrent( function( tab ) { chrome.tabs.create( { 'url': bookmark.url , 'index' : tab.index}, null ) } );
    }
    //Yes, do nuttin if its js, them evil hackers cannought be trusted
  }

  /* HELP */
  commander.help = function()
  {
    chrome.tabs.create( {'url': chrome.extension.getURL('help.html')}, null );
  }

  /* QUIT */
  commander.quit = function()
  {
    if( commander.left.id == "search" )
    {
      delete commander.query;
      delete commander.results;
      commander.back();
    }
    else    
      chrome.tabs.getCurrent( function( tab ) { chrome.tabs.remove( tab.id ) } );
  }

  /* VIEW */
  commander.view = function()
  {
    commander.viewing = !commander.viewing;

    if( commander.viewing )
    {
      commander.backup = document.body.innerHTML;

    var panel = commander.left.active ? commander.left : commander.right;
      var id = document.getElementById( panel.prefix + panel.selected ).commander.id;

      viewer.view( id );
    }
    else
    {
      document.body.innerHTML = commander.backup;

      //we require it for decorating the elements, kludgy, I know
      commander.draw();

      key_mapping = commander.key_mapping;
    }
  }

  /* EDIT */
  commander.edit = function()
  {
    commander.backup = document.body.innerHTML;

    var panel = commander.left.active ? commander.left : commander.right;

    if( panel.id == 0 )
      return;

    var id = document.getElementById( panel.prefix + panel.selected ).commander.id;

    commander.editing = true;

    editor.view( id );
  }


  /* BACKSPACE */
  commander.back = function()
  {
    var panel = commander.left.active ? commander.left : commander.right;

    if( panel.id == "search" )
      return commander.select("0");

    var element = document.getElementById( panel.prefix + "0" );
    var text = jQuery.trim( element.innerHTML );

    if( text == "/.." )
      commander.select( element.commander.id );
  }

  /* DOWN */
  commander.down = function()
  {
    var panel = commander.left.active ? commander.left : commander.right;

    if( panel.selected == panelheight-1  )
      panel.scroll++;
    else
      panel.selected++;

    if( !(panel.scroll + panel.selected < panel.itemcount) )
      commander.end();

    commander.draw();
  }

  /* UP */
  commander.up = function()
  {
    //Get active panel
    var panel = commander.left.active ? commander.left : commander.right;
    //if we are already physically in slot 0, see if we can still scroll up
    //Otherwise go up a physical slot
    if( panel.selected == 0 )
      panel.scroll--;
    else
      panel.selected--;
    //Sanity fix the scroll value
    if( panel.scroll == -1 )
      panel.scroll = 0
    //Draw the commander again
    commander.draw();
  }

  /* HOME */
  commander.home = function()
  {
    var panel = commander.left.active ? commander.left : commander.right;
    panel.selected = 0;
    panel.scroll = 0;
    commander.draw();
  }

  /* END */
  commander.end = function()
  {
    var panel = commander.left.active ? commander.left : commander.right;

    if( panel.itemcount < panelheight+1 )
    {
      panel.scroll = 0;
      panel.selected = panel.itemcount-1;
    }
    else
    {
      panel.scroll = panel.itemcount - panelheight;
      panel.selected = panelheight-1;
    }
    commander.draw();
  }

  /* COPY */
  commander.copy = function()
  {
    var from =  commander.left.active ? commander.left : commander.right;
    var to   = !commander.left.active ? commander.left : commander.right;

    if( to.id == "0" )
    {
      alert( "Can not copy bookmarks into the root" )
      return
    }

    //Copying from
    var from_id  = document.getElementById( from.prefix + from.selected ).commander.id;
    var bookmark = findBookmarkId( commander.bookmarks , from_id );

    var newbookmark = { parentId : to.id };
    //Create the bookmark object
    if( bookmark.title )
      newbookmark.title = bookmark.title;
    if( bookmark.url )
      newbookmark.url = bookmark.url;

    chrome.bookmarks.create( newbookmark , commander.boot );
  }

  /* MOVE */
  commander.move = function()
  {
    var panel = commander.left.active ? commander.left : commander.right;
    var id  = document.getElementById( panel.prefix + panel.selected ).commander.id;
    var bookmark = findBookmarkId( commander.bookmarks , id );

    var to   = !commander.left.active ? commander.left : commander.right;

    if( to.id == "0" )
    {
      alert( "Can not copy bookmarks into the root" )
      return false
    }

    if( to.id == "search" )
    {
      alert( "Can not copy bookmarks into search results" )
      return false
    }

    chrome.bookmarks.move( bookmark.id, { parentId  : to.id }  , commander.boot );
  }

  /* DELETE */
  commander.delete = function()
  {
    var panel = commander.left.active ? commander.left : commander.right;
    var id  = document.getElementById( panel.prefix + panel.selected ).commander.id;
    var bookmark = findBookmarkId( commander.bookmarks , id );

    //What is interesting, is that removeTree works on non-trees as well
    //I am not going to count on that though ;]
    if( bookmark.children )
      chrome.bookmarks.removeTree( bookmark.id , commander.boot );
    else
      chrome.bookmarks.remove( bookmark.id , commander.boot );
  }

  /* CREATE FOLDER */
  commander.createfolder = function()
  {
    var panel = commander.left.active ? commander.left : commander.right;
    var foldertext = prompt("Enter folder name","");

    if(foldertext)
    {
      var newbookmark = { parentId : panel.id , title : foldertext };
      chrome.bookmarks.create( newbookmark , commander.boot );
    }
  }

  /* EQUALIZE */
  commander.equalize = function()
  {
    var active =  commander.left.active ? commander.left : commander.right;
    var sleepy = !commander.left.active ? commander.left : commander.right;

    sleepy.id       = active.id;
    sleepy.selected = 0;
    sleepy.scroll   = 0;

    commander.draw();
  }

  /* PLUS , MOVE UP */
  commander.moveup = function()
  {
    var panel = commander.left.active ? commander.left : commander.right;
    var id  = document.getElementById( panel.prefix + panel.selected ).commander.id;
    var bookmark = findBookmarkId( commander.bookmarks , id );

    if( panel.id == 0 )
      return;

    if( panel.selected == 0 && panel.scroll == 0 )
      return;

    if( bookmark.index == 0 )
      return;

    if( panel.selected == 0 )
      panel.scroll--;
    else
      panel.selected--;

    chrome.bookmarks.move( id, { parentId: panel.id , index : (bookmark.index-1)   }  , commander.boot );

  }

  /* DOWN, MOVE DOWN */
  commander.movedown = function()
  {
    var panel = commander.left.active ? commander.left : commander.right;
    var id  = document.getElementById( panel.prefix + panel.selected ).commander.id;
    var bookmark = findBookmarkId( commander.bookmarks , id );

    if( panel.id == 0 )
      return;

    if( panel.selected == 0 && panel.scroll == 0 )
      return;

    //now see who is under their
    var parent   = findBookmarkId( commander.bookmarks , panel.id );
    var bookmark = parent.children[ bookmark.index+1 ];
    if( bookmark )
    {
      //We are evilly counting on the 'hmmm I think this got deleted feature', muhaha is in order
      if( panel.selected == panelheight-1 )
        panel.scroll++;
      else
        panel.selected++;

      chrome.bookmarks.move( bookmark.id , { parentId: panel.id , index : (bookmark.index-1)   }  , commander.boot );
    }
  }
  
  /* SEARCH */
  commander.search = function( searchtext )
  {
    if(!searchtext)
    {
      if(commander.query)
        searchtext = commander.query;
      else
        searchtext = prompt("Enter folder name","");
    }
    chrome.bookmarks.search( searchtext , function(o){ 
      var panel = commander.left.active ? commander.left : commander.right;
      panel.id = "search";
      commander.results = o;
      commander.query = searchtext;
      commander.draw();
    });  
  }

  /* HELPER, DRAW IT */
  commander.draw = function()
  {
    if( commander.left.id == "search" )
    {
      chrome.bookmarks.search( commander.query , function(o){ 
        commander.results = o;
        commander.setPanel( commander.left );
        commander.setPanel( commander.right );    
      });       
      return;
    }

    //Less Ugly, but still ugly
    if( commander.left.info )
    {
      commander.setPanel( commander.right );
      commander.setPanel( commander.left );    
    }
    else
    {
      commander.setPanel( commander.left );
      commander.setPanel( commander.right );    
    }
  }

  /* INIT, RE-INIT */
  commander.boot = function()
  {
    chrome.bookmarks.getTree( function(stuff)
    {
      commander.bookmarks = stuff ;
      commander.draw();
    });
  }