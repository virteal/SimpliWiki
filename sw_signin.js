var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
function sw_signin(){

window.sw_set_cookie = function( srv, attr, value, days ){
  var cookie_name = "sw_" + (srv ? srv + "_" : "") + attr
  days || (days = 1)
  window[cookie_name] = value 
  var cookie_update = cookie_name
  + "=" + (value || "null")
 
  //+ ";domain=.simpliwiki.com"
  + ";expires="
  + ((value || days)
    ? (new Date( (new Date()).getTime() + (days * 84000000))).toGMTString()
    : (new Date()).toGMTString()
  )
  + ";path=/"
 
  document.cookie = cookie_update
  return value
}

window.sw_get_cookie = function( srv, attr ){
  var cookie_name = "sw_" + (srv ? srv + "_" : "") + attr
  var value = ""
  document.cookie.replace( RegExp( cookie_name + "=(.*?);"), function( _, v ){
    if( v && v != "null"){ value = v }
  })
  return window[cookie_name] = value 
}

window.sw_set_id_cookies = function( srv, id, name, label ){
  sw_set_cookie( srv, "id",         id),
  sw_set_cookie( srv, "screenname", name)
  sw_set_cookie( srv, "label",      label)
}

window.sw_get_id_cookies = function( srv ){
  sw_get_cookie( srv, "id"),
  sw_get_cookie( srv, "screenname")
  sw_get_cookie( srv, "label")
}

sw_set_cookie( "", "can_script", true)

window.install_signout = function( srv, e ){
  e.append(
    ' <button id="signout' + srv +'" type="button">'
    + "Bye"
    + '</button>'
  ).fadeIn( 1500)
  $("#signout" + srv).one( "click", function (){
 
  debugger;   if( srv == "tw" ){
      sw_set_id_cookies( "twitter")
      //try{ twttr.anywhere.signOut(); }catch( e ){}
    }
    try{
      window["update_" + srv + "_login"].call()
    }catch( e ){}
  })
 
  if( typeof Session === "undefined" )return
  if( Session.config.lang == "fr" ){
   
   
  }else{
   
   
  }
}

window.install_signin = function(){
 
  if( typeof Session === "undefined" )return
  if( Session.config.lang == "fr" ){
   
   
  }else{
   
   
  }
}


window.update_sw_login =  window.update_tw_login = function(){
  sw_get_id_cookies( "twitter" );
  var id = window.sw_twitter_id;
  if( id ){
    sw_set_id_cookies( "twitter", id, id, id )
    install_signout( "tw", $('#sw-login').fadeOut( 0).html( ""
      + ' <a href="/@' + id 
      + '">@' + window.sw_twitter_screenname + "</a>"
      + ' <img src="/twitter_ico.png" />'
    ))
  }else{
   
    if( ! $("#sw-login").size() )return
    sw_set_id_cookies( "twitter" )
    $("#sw-login").html(
      '<div id="sw-login-box" class="sw_boxed">'
      //+'<img src="/yanugred16.png" width="16"/> '
      //+'Connect with Simpl<em>i</em>Wiki</div>'
      + "Login"
    )
    $('#sw-login-box').one( "click", function( event ){
      $("#sw-login").css( "display", "inline")
      .html(
        '<a href="https://web.archive.org/web/20141225152335/http://kudocracy.com">Kudo<em>c</em>racy</a>'
      )
      
      $('#sw-login-ok').one( "click", function( event ){
        id = $('#sw-connect-id').val();
	      var screen_name = id
        .substr( 0, 30)
        .replace( /[^A-Z_a-z0-9]/g, "");
	      id = screen_name.toLowerCase();
        sw_set_id_cookies( "twitter", id, screen_name, id)
        update_sw_login()
      })
    })
  }
 
  if( typeof window.sw_logged_in_twitter === "undefined" ){
   
  }else{
    if( window.sw_logged_in_twitter != !!id ){
     
      if( id && typeof Session === "undefined" && sw_ctx.isAnonymous ){
       
        window.location = ""
        location.reload( true)
      }
    }
  }
  window.sw_logged_in_twitter = !!id
}


window.sw_twitterOnLoad = function sw_twitterOnLoad(){
  /*twttr.anywhere( function( T ){ 
    T.bind( "authComplete", function( e, user ) {
     
      update_tw_login( T)
    })
    T.bind("signOut", function (e) {
     
      update_tw_login( T)
    })
    update_tw_login( T)
  })*/
}


var sw_footer_was_displayed         = false
var sw_login_buttons_were_displayed = false

window.onFooterDisplay = function( force, brutal ){

 
  if( force == "init" ){
    sw_footer_was_displayed = sw_login_buttons_were_displayed = false
    return
  }

 
 
  if( brutal ){
    $('#footer').fadeTo( 0, 1).removeClass( "fade")
  }

 
  if( sw_footer_was_displayed
  && sw_login_buttons_were_displayed
  )return

 
  (  true
  || sw_ctx.twid
  || window.sw_fb_like_button_href)
  && setTimeout( function(){
   
    if( !force && !$("#footer").is(":visible") )return
   
    var $buttons = $('#login-buttons')
   
    if( $buttons.size()
    && ($buttons.is(":visible") || brutal)
    ){
      update_sw_login()
     
      sw_ctx.twid && false && loadfire.event( function( fire ){
        if( !window.sw_twitterOnLoad )return
        fire.load(
          "https://web.archive.org/web/20141225152335/http://platform.twitter.com/anywhere.js?id=" + sw_ctx.twid + '&v=1'
        ).event( function( fire ){
         
          if( !window.twttr )return
          sw_twitterOnLoad()
          return true
        })
        return true
      })
      var lang = (window.sw_lang == "fr") ? "fr" : "en_US"
      sw_login_buttons_were_displayed = true
    }
    if( !sw_footer_was_displayed ){
     
      if( window.sw_fb_like_button_href ){
        $('#sw_fb_like_button').html( '<iframe src='
          + '"https://web.archive.org/web/20141225152335/http://www.facebook.com/plugins/like.php?'
         
          + 'href=' + sw_fb_like_button_href
          + '&amp;layout=button_count&amp;show_faces=false&amp;width=200&amp;'
          + 'action=like&amp;font=verdana&amp;colorscheme=light&amp;height=21" '
          + 'scrolling="no" frameborder="0" class="sw_fb_like_iframe"'
          + 'height:21px;" allowTransparency="true"></iframe>\n'
        )
      }
      sw_footer_was_displayed = true
    }
  }, brutal ? 1 : 1000)
}

}
;sw_signin();
}

/*
     FILE ARCHIVED ON 15:23:35 Dec 25, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 03:55:45 Jul 05, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.651
  exclusion.robots: 0.068
  exclusion.robots.policy: 0.055
  esindex: 0.012
  cdx.remote: 8.117
  LoadShardBlock: 48.338 (3)
  PetaboxLoader3.datanode: 60.801 (4)
  load_resource: 291.645
  PetaboxLoader3.resolve: 243.566
*/