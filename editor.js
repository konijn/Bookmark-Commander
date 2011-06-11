
var editor = {};
editor.width = screenwidth - 2;

//This is where the magic happens, so to say
editor.view = function( id )
{
    //Function keys
    editor.function_keys =
    [
      { id : 1 ,  description : "Help  " },
      { id : 2 ,  description : "Save  " },
      { id : 3 ,  description : "Quit  " },
      { id : 4 ,  description : "Quit  " },
      { id : 5 ,  description : "Test  " },
      { id : 6 ,  description : "      " },
      { id : 7 ,  description : "      " },
      { id : 8 ,  description : "      " },
      { id : 9 ,  description : "      " },
      { id : 10 , description : "Quit  " },
    ];

  var bookmark = findBookmarkId( commander.bookmarks , id );

  if(!bookmark)
    bookmark = { title: 'Something went terribly wrong' , url: '' };

  if(!bookmark.title)
    bookmark.title = 'Something went terribly wrong';

  if(!bookmark.url)
  {
    //Avoid the dreaded undefined ;]
    bookmark.url = '';
    //Dont show test for folders
    editor.function_keys[4].description = '      ';
    editor.urlreadonly = "readonly='readonly'";
  }
  else
  {
    editor.urlreadonly = "";
  }

  editor.id = id;
  editor.bookmark = bookmark;
  editor.changed = false;
  editor.saved   = false;

    //Table due to general textarea weirdness
    var s = "<table><tr><td style='background: rgb(0,0,128);'><pre>";
    //Menu
    s = s + ("<span class='menu'>" + ("  Folder/Bookmark").extend() + "</span>\n" );
    //Its a mess, but a short mess ;\
    s = s + "<textarea class='blue' cols='" + editor.width + "' rows='3' id='title'>" + bookmark.title + "</textarea>\n"
    s = s + ("<span class='menu'>" + ("  URL").extend() + "</span>\n" );
    s = s + "<textarea class='blue' cols='" + editor.width + "' rows='24' id='url'" + editor.urlreadonly + ">" + bookmark.url + "</textarea>\n"


    for( key in editor.function_keys )
    {
    var f = editor.function_keys[key];
      s = s + ( "<span class='fcode'>F" + f.id + "</span><span class='menu'>" + f.description + "</span><span class='fcode'> </span>" );
    }
    s = s + ( "<span id='end' class='fcode'>" + " ".repeat( screenwidth - 91 ) + "</span>\n" );

    document.body.innerHTML = s;

    key_mapping = editor.key_mapping;

    //Put focus on the title, at the end
    var title = document.getElementById("title");
    title.focus();
    var position = title.value.length * 2;
    title.setSelectionRange(position,position);

}

editor.considerTextAreas = function()
{
  var titleElement = document.getElementById( "title" )
  var   urlElement = document.getElementById( "url" )

  var _changed = false;

  //Consider the title
  if( titleElement.value != editor.bookmark.title )
  {
    _changed = true;
    titleElement.style.fontStyle = "italic"
  }
  else
  {
    titleElement.style.fontStyle = "normal"
  }

   //Consider the url
  if( urlElement.value != editor.bookmark.url )
  {
    _changed = true;
    urlElement.style.fontStyle = "italic"
  }
  else
  {
    urlElement.style.fontStyle = "normal"
  }

  editor.changed = _changed;

}

editor.test = function()
{
  chrome.tabs.create( { 'url': document.getElementById( "url" ).value }, null );
}

editor.save = function()
{
  var o = { title : document.getElementById( "title" ).value };

  var url = document.getElementById( "url" ).value.trim();

  if( url.length > 0 )
    o.url = url;

  chrome.bookmarks.update( editor.id, o );

  editor.saved = true;

  document.getElementById("end").innerHTML = ( "<span style='color: yellow'>" + ("SAVED!").extend( screenwidth - 91 ) + "</span>");

  editor.bookmark = o;

}

editor.quit = function()
{
    document.body.innerHTML = commander.backup;

    if( editor.saved )
      commander.boot();
    else
      commander.draw();

    key_mapping = commander.key_mapping;
    commander.editing = false;
}

