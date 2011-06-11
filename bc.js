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

  //I hate dealing with -1 so I stick it here
  String.prototype.has = function( s )
  {
  return ( this.indexOf(s) != -1 );
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

  //Linking to an external icon due to existing chrome bug
  //http://code.google.com/p/chromium/issues/detail?id=84373

  var iconURL = "http://bc.demuyt.net/mc-32x32.png";
  var link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = iconURL;
  //this.docHead.appendChild(link);
  this.document.head.appendChild(link);
