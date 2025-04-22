function OnStart()
{
    lay = app.CreateLayout( "linear" );

    scr = app.CreateScroller( 1, 1, "horizontal" );
    lay.AddChild( scr );

    txt = app.CreateText( "", 1, -1, "monospace,log" );
    txt.SetTextSize( 8 );
    txt.SetLog( 1000 );
    scr.AddChild( txt );

    app.AddLayout( lay );

    sys = app.CreateSysProc( "sh" );
    sys.SetOnInput( sys_OnInput );
    sys.SetOnError( sys_OnError );

    Exec( "netstat\n" );

    // filter files containing 'D' in /sdcard/ and forward to stderr
    Exec( "ls -al /sdcard/ | grep D >&2\n" );

}

function Exec( cmd )
{
    sys.Out( cmd );
    txt.Log( cmd, "green" );
    scr.ScrollTo( 0, txt.GetHeight() );
}

function sys_OnInput( msg )
{
    txt.Log( msg );
    scr.ScrollTo( 0, txt.GetHeight() );
}

function sys_OnError( msg )
{
    txt.Log( msg, "red" );
    scr.ScrollTo( 0, txt.GetHeight() );
}