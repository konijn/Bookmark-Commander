  key_mapping = {};


  //Key mappings
  //Start with the viewer
  key_mapping = {};
  key_mapping[112] = commander.help;    //F1
  key_mapping[114] = commander.view;    //F3
  key_mapping[121] = commander.view;    //F10 ( yes, the same )
  key_mapping[27 ] = commander.view;    //F10 ( yes, the same )
  key_mapping[116] = viewer.test;       //F5
  key_mapping[13 ] = viewer.test;       //Enter
  viewer.key_mapping = key_mapping;
  viewer.key_mapping[9] = function(){}; //tab, do nothing, viewer only, minor hack

  //Continue with the viewer
  key_mapping = {};
  key_mapping[112] = commander.help;    //F1
  key_mapping[113] = editor.save;       //F2
  key_mapping[114] = editor.quit;       //F3
  key_mapping[115] = editor.quit;       //F4
  key_mapping[27 ] = editor.quit;       //F4
  key_mapping[116] = editor.test;       //F5
  key_mapping[121] = editor.quit;       //F10 ( yes, the same )
  editor.key_mapping = key_mapping;

  //Continue with menu
  key_mapping = {};
  key_mapping[37 ] = menu.goLeft;       //Arrow Left
  key_mapping[39 ] = menu.goRight;      //Arrow Right
  key_mapping[40 ] = menu.goDown;       //Arrow Down
  key_mapping[38 ] = menu.goUp;         //Arrow Up
  key_mapping[13 ] = menu.dispatch;     //Enter
  key_mapping[27 ] = menu.exit;         //Escape
  key_mapping[120] = menu.exit;          //F9
  key_mapping[9 ]  = function(){};       //tab, do nothing
  menu.key_mapping = key_mapping;

  //Now do the commander key mappings
  key_mapping = {};
  key_mapping[8 ] =  commander.back;          //backspace
  key_mapping[9 ] =  commander.swapPanel;     //tab
  key_mapping[37] =  commander.swapPanel;     //Arrow Left
  key_mapping[39] =  commander.swapPanel;     //Arrow Right
  key_mapping[13] =  commander.delve;         //enter
  key_mapping[40] =  commander.down;          //Arrow Down
  key_mapping[38] =  commander.up;            //Arrow Up
  key_mapping[36] =  commander.home;          //Home key
  key_mapping[35] =  commander.end;           //End key
  key_mapping[112] = commander.help;          //F1
  key_mapping[113] = commander.equalize;      //F2
  key_mapping[114] = commander.view;          //F3
  key_mapping[115] = commander.edit;          //F4
  key_mapping[116] = commander.copy;          //F5
  key_mapping[117] = commander.move;          //F6
  key_mapping[118] = commander.createfolder;  //F7
  key_mapping[119] = commander.delete;        //F8
  key_mapping[120] = commander.menu;          //F9
  key_mapping[121] = commander.quit;          //F10
  key_mapping[107] = commander.moveup;        //+ on numeric
  key_mapping[187] = commander.moveup;        //+ on main
  key_mapping[109] = commander.movedown;      //- on numeric
  key_mapping[189] = commander.movedown;      //- on main
  commander.key_mapping = key_mapping;

  control_key_mapping = {};
  control_key_mapping[79] = commander.showLogs;

  //Escape function keys are mostly meant for the evil mac that hijacks F keys
  //My brain is so hard wired to Escape 0 for quit that I even do this on Windows now
  escape_mapping = {};
  //49 is keyboard 1 , 58 is one above keyboard 9
  //112 is F1, 113 is F2 etc
  for( var counter = 49 ; counter < 58 ; counter++ )
    escape_mapping[counter] = (112-49)+counter; //1 ->F1 till 9->F9
  escape_mapping[48] = 121; //0 -> F10 does not follow the pattern
  escape_mapping[27] = 27; //0 -> F10 does not follow the pattern



