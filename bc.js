/*
  Bookmark Commander by Tom J Demuyt is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  Permissions beyond the scope of this license are available by contacting konijn@gmail.com
*/

  //Extend String with repeat, we need it
  String.prototype.repeat = function( num )
  {
    return new Array( num + 1 ).join( this );
  }

  //Extend String with extend, muhahah
  String.prototype.extend = function( till )
  {
    if(!till)
      till = screenwidth;
    return ( this + " ".repeat( till ) ).substring(0,till);
  }

  //Need moar sugar
  //Note that this takes also an array with possible prefixes
  String.prototype.startsWith = function(str)
  {
    if( typeof str == "string" )
      return (this.indexOf(str) === 0);

    var any = false;

    if( typeof str == "object" )
      for( var key in str )
        if( this.startsWith( str[key] ) )
          any = true;
    return any;
  }

  String.prototype.replaceAll = function(needle,prick) {
    var s = this;
    while (s.indexOf(needle) >= 0)
    s = s.replace(needle, prick);
    return s;
  }


  //html 5 should have stuff like this, really..
  String.prototype.remove = function(needle)
  { 
    return this.replaceAll(needle, ""); 
  }

  //To go where jQuery dares not go
  String.prototype.trim = function()
  {
    return jQuery.trim( this );
  }

  //BASIC for the win
  String.prototype.left = function( n )
  {
    if( n > this.length )
      return this;

    return this.substring( 0 , n );
  }

  //Some more winner BASIC
  String.prototype.right = function(len){
    return (len > this.length) ? this : this.substring(this.length - len);
  }

  //I hate dealing with -1 so I stick it here
  String.prototype.has = function( s )
  {
  return ( this.indexOf(s) != -1 );
  }


  Date.prototype.format = function()
  {
      var day   = this.getDate();
      var month = this.getMonth()+1;
      var year  = this.getYear()+1900;
    
      return ( month + "/" + day + "/" + year );
  }

  //"662"
  //Yes, google provides a search function
  //But I can debug this one
  function findBookmarkId( stuff , id )
  {
    var node;

    var seek = function( stuff, id )
    {
      if( stuff && stuff.id && stuff.id == id )
        node = stuff;
      else
        for(var key in stuff)
          if( typeof stuff[key] == "object" )
            seek( stuff[key] , id );
    }
    seek( stuff , id );

    return node;
  }

  function findBookmarkTitle( id )
  {
    //This is not entirely true, sue me
    var parent = findBookmarkId( commander.bookmarks , id );
    //Start from scratch
    var title = "";
    //Indicate whether we are dealing with a folder
    if( parent.children )
      title = title + "/";
    //Do some recursive magic
    while( parent.parentId )
    {
      title = "/" + parent.title + title;
      parent = findBookmarkId( commander.bookmarks , parent.parentId );
    }
    //Prefix & postfix to make it look even better
    title = " " + title + " ";
    //Cut off at the right size
    if( title.length > panelwidth )
      title = "..." + title.right( panelwidth - 3 );
    //Give it back
    return title
  }


  //Linking to an external icon due to existing chrome bug
  //http://code.google.com/p/chromium/issues/detail?id=84373

  var iconURL = "http://bc.demuyt.net/mc-32x32.png";
  var link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = iconURL;
  //this.docHead.appendChild(link);
  this.document.head.appendChild(link);
