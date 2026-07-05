var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
function loadfire( src, not_async ){

 
  var me = loadfire;
  var bug;

  var client_side = (typeof window !== "undefined")
  var scope = client_side ? window : global

 
  if( !me.initialized ){

   
    me.initialized = true

   
    me.version = "0.1"

   
    me.scriptQueue = []

   
    me.timeStarted = (new Date()).getTime()

   
    me.age = 0

   
    me.callbacks = [];

   
    me.readyCallbacks = []

   
    me.scripts = {}

   
    me.scriptFailures = {}

   
    me.oring = false

   
    me.doesing = false

   
    me.jQueryGoogle    = "https://web.archive.org/web/20141225152844/http://code.jquery.com/jquery-2.1.1.min.js"
    me.jQueryMicrosoft = "https://web.archive.org/web/20141225152844/http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.js"

   
    var de_def = false
    if( !scope.de ){
      scope.de     = true
      scope.de_def = true
    }
    var bugC = ( scope.console && console.log
      && function bug( m ){
        console.log( "de&&bug: " + m );
        if( ( "" + m ).toLowerCase().indexOf( "err" ) !== -1 )debugger;
      } )
    || ( scope.de = false );
    if( !client_side ){
      bugC = trace;
    }
    if( scope.de && !scope.bug ){
      scope.bug = bugC;
    }else if( de_def ){
      scope.de = false
    }

   
    var scribe = function( msg ){
      bugC( "loadfire: " + msg + " @" + me.age );
    }

   
   
    var start_timeout = function(){
      if( me.interval )return
      me.interval = setInterval( function(){
       
        me.age = (new Date()).getTime() - me.timeStarted
        var signal = "fire " + Math.floor( me.age / 1000) + " seconds"
        if( false && de && me.did( signal) ){
          de&&scribe( "Done " + signal)
          return
        }
        me.fire( signal)
      }, 500)
    }
    var stop_timeout = function(){
      if( !me.interval )return
      clearInterval( me.interval)
      me.interval = null
    }

   
    me.event = function loadfire_event( cb ){
   
   
   
      me.callbacks.push( cb)
      return me.fire()
    }

   
    me.ready = function loadfire_ready( fn ){
      me.readyCallbacks.push( fn)
    }

   
    me.fire = function loadfire_fire( script, does ){
     
     
      if( script ){
        if( typeof script == 'object' ){
          for( var ii in script ){
            me.fire([script[ii]], does)
          }
          return
        }
       
        me.age = (new Date()).getTime() - me.timeStarted
        me.scripts[script] = !does ? (me.age || 1) : false
        if( de && script.indexOf( " seconds") < 0 && me.age > 1 ){
          de&&scribe( '"' + script + '"' + (does ? " starting" : " firing"))
        }
        if( window.jQuery && !me.did( "jQuery") ){
          me.fire( "jQuery")
        }
      }
     
      var some_callback = false
      for( var ii in me.callbacks ){
        var callback = me.callbacks[ii]
        if( !callback )continue
        some_callback = true
       
        me.age = (new Date()).getTime() - me.timeStarted
       
        me.callbacks[ii] = null
        var deregister = false
        try{
         
          deregister = callback( me, script )
        }catch( err ){
          de&&bugC(  err );
          de&&bugC( "error in loadfire callback for " + script );
          deregister = true
        }
        if( !deregister ){
          me.callbacks[ii] = callback
        }
      }
     
      var all_loaded = true
      for( var key in me.scripts ){
        if( !me.scripts[key] ){
          all_loaded = false
          break
        }
      }
     
      if( some_callback ){
        start_timeout()
       
       
        if( !me.did( "loadfire_warning") ){
          if( me.age > 30000 ){
            de&&bugC( "loadfire, 30 secs, rejuvenate?")
            me.dump()
            me.fire( "loadfire_warning")
          }
        }
      }else if( all_loaded ){
       
        stop_timeout()
      }
     
      if( !all_loaded )return me
      for( ii in me.readyCallbacks ){
        var callback = me.readyCallbacks[ii]
        if( !callback )continue
       
        me.readyCallbacks[ii] = null
       
        me.age = (new Date()).getTime() - me.timeStarted
        try{
          callback( me, script)
        }catch( err ){
          de&&bugC(  err );
          de&&bugC( "error in loadfire ready callback for " + script );
        }
      }
     
      if( !some_callback ){
       
        me.rejuvenate()
      }
      return me
    }

   
    me.reset = function loadfire_reset( goal ){
      delete me.scripts[goal]
      delete me.scriptFailures[goal]
    }

   
    me.signal = function loadfire_signal( script ){
      return me.fire( script, true)
    }

    var check_done = function( script ){
   
   
     
     
      if( !script )return me
      var doesing = me.doesing
      var oring   = me.oring
      if( typeof script == 'object' ){
        var found = true
        for( var ii in script ){
          var ok = check_done( script[ii])
          if( !ok ){
            if( !oring )return
            found = false
          }else{
            if( oring )return me
            found = true
          }
        }
       
        return found ? me : undefined
      }
     
      var any = false
      for( var key in me.scripts ){
        if( key.indexOf( script) != -1 ){
          any = true
          var ok = (me.scripts[key] || doesing)
          if( ok ){
           
            if( oring )return me
          }else{
           
            if( !oring )return
          }
        }
      }
     
      return any ? me : undefined
    }

   
    me.did = function loadfire_did( script ){
      me.oring   = false
      me.doesing = false
      return check_done( script)
    }

   
    me.does = function loadfire_does( script ){
      me.oring   = false
      me.doesing = true
      return check_done( script)
    }

   
    me.all = function loadfire_all( script ){
      me.oring = false
      return check_done( script)
    }

   
    me.any = function loadfire_any( script ){
      me.oring = true
      return check_done( script)
    }

   
   
    me.failed = function( script ){
      return me.scriptFailures[script] ? me : undefined
    }

   
    me.fail = function( goal ){
      me.scriptFailures[goal] = true
      return me.fire()
    }

   
    me.rejuvenate = function(){
      me.timeStarted = (new Date()).getTime()
      return me
    }

   
    me.dump = function(){
      de&&bugC( "loadfire, dump all scripts & states")
      for( var key in me.scripts ){
        de&&bugC( "loadfire " + key + " " + me.scripts[key])
      }
     
    }

   
    me.test = function loadfire_test(){
      function assert( ok, msg ){
        if( ok )return
        de&&bugC( "Assert failure error, " + msg )
        throw "loadfire assert failure " + msg
      }
      assert( me.did(),             "did()")
      assert( me.does(),            "does()")
      assert( !me.did( "t"),        "did t")
      assert( !me.does( "t"),       "does t")
      assert( !me.any( "t"),        "any t")
      me.signal( "--t1--")
      assert( me.does( "t1"),       "does t1")
      assert( me.any().does( "t1"), "any does t1")
      assert( !me.did( "t1"),       "!did t1")
      me.fire( "--t1--")
      assert( me.does( "t1"),       "now does t1")
      assert( me.did( "t1"),        "did t1")
      me.signal( "--t2--")
      assert( !me.did( "t"),        "!did test")
      assert( me.any( "t"),         "any test")
      me.fire( "--t2--")
      assert( me.did( ["t1","t2"]), "did t1, t2")
      assert( me.did( "t"),         "did t")
      var fired = false
      me.event( function(){ return fired = true })
      assert( fired,                "fired")
      fired = false
      var ready = false
      me.signal( "--t3--")
      assert( !fired,               "!fired")
      me.ready( function(){ ready = true })
      assert( !ready,               "!ready")
      me.fire( "--t3--")
      assert( ready,                "ready")
    }

   
   
    if( client_side && document.addEventListener ){
      if( document.readyState === null ){
        document.readyState = "loading"
      }
      document.addEventListener( "DOMContentLoaded", handler = function (){
        document.removeEventListener( "DOMContentLoaded", handler, false)
        if( document.readyState == null ){ 
          document.readyState = "complete";
        }
        me.fire()
      }, false);

    }

   
    me.load
    = me.did.load        = me.does.load
    = me.fire.load       = me.signal.load = me.reset.load
    = me.event.load      = me.ready.load
    = me.any.load        = me.all.load
    = me.failed.load     = me.fail.load
    = me.rejuvenate.load = me.dump.load
    = me
   
    me.load.load = me.bing = me.me = me
   
    me.free = me.all.me = me.bing.bang = me
   

   
    me.waits = me.does

    start_timeout()

  }

  function doit( what, not_async ){
    var script = (client_side && document.createElement( 'script')) || {}
    var cb   = ""
    var body = ""
    var src  = what
    if( src.indexOf( "__raw__") < 0 ){
      src = src.replace( / *async +/, function(){
        not_async = false
        return ""
      })
      src = src.replace( / *sync +/, function(){
        not_async = true
        return ""
      })
     
     
      src = src.replace( / *\>[\S\s]*/, function( m ){
        body = m.substr( m.indexOf( ">") + 1)
        return ""
      })
     
      src = src.replace( / *;.*$/, function( m ){
        cb = m
        return ""
      })
    }
   
    body && (script.text = body)
    script.async  = !not_async
    script.src    = src
    script.type   = 'text/javascript'
    var done = false
    script.onreadystatechange = script.onload = function(){
      var ready_state = script.readyState
     
      if( done ){
        me.fire()
        return
      }
      if( !ready_state || /loaded|complete/.test( ready_state) ){
        done = true
        me.fire( what)
       
        if( cb ){
         
          eval( cb)
        }
      }
    }
    me.fire( what, true)
    if( !client_side ){
      try{
       
        require( src)
        script.onload()
      }catch( err ){
        me.scriptFailures[src] = true
        de&&scribe( "can't require() " + src + ", err: " + err)
      }
      return
    }
   
    var head = document.documentElement.getElementsByTagName( "head")
    if( head ){
      head = head[0]
   
   
    }else{
      head = document.documentElement.getElementsByTagName( "body")[0]
    }
    head.appendChild( script)
  }

 
  if( src == "jQuery" ){
    src = ""
   
    if( !me.did( "friend-jquery") && !window.$ ){
      var my$ = function loadfire$( fn ){
        if( !fn || fn === document )return $
        $.ready( fn)
      }
      $ = my$
      $.ready = function( fn ){
        bugC( "my$.ready invoked")
        me.event( function(){
         
          if( $ == my$ )return
          bugC( "jQuery $ defined")
         
         
           
            $().ready( fn)
         
          return true
        })
      }
      me.fire( "friend-jquery")
    }
    if( not_async == "google"    ){ me.load( me.jQueryGoogle)    }
    if( not_async == "microsoft" ){ me.load( me.jQueryMicrosoft) }
  }

 
  if( src ){
   
    if( !(src in me.scripts) ){
     
      me.scripts[src] = false
      me.scriptQueue.push( src)
     
      de && (me.does( src) || broken)
    }
  }

 
  me.fire()

 
  if( me.initialized ){
    while( src = me.scriptQueue.shift() ){
     
      doit( src, not_async)
    }
  }

 
  me.fire()

 
  return me
}
}

/*
     FILE ARCHIVED ON 15:28:44 Dec 25, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 03:55:04 Jul 05, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.459
  exclusion.robots: 0.047
  exclusion.robots.policy: 0.037
  esindex: 0.008
  cdx.remote: 5.896
  LoadShardBlock: 151.51 (3)
  PetaboxLoader3.datanode: 69.46 (4)
  PetaboxLoader3.resolve: 98.608 (2)
  load_resource: 93.234
*/