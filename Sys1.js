function OnStart()
{
    lay = app.CreateLayout( "linear" );

    txt = app.CreateText( "", 1, 1, "Log,Monospace,autoscale" );
    lay.AddChild( txt );

    app.AddLayout( lay );

    sys = app.CreateSysProc( "sh" );
    sys.Out( "netstat\n" );
    sys.SetOnInput( sys_OnInput );
    sys.SetOnError( sys_OnError );
    sys.Out( "netstoat\n" );
}

function sys_OnInput( msg )
{
    txt.Log( msg );
}

function sys_OnError( msg )
{
    txt.Log( msg );
}