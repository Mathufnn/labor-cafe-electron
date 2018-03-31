module.exports = {
  loading: function (t) {
    if(t) $(".loading").fadeIn("slow");
    else $(".loading").fadeOut("slow");
  },
  load_simple_view: function(title, file, callback=null){
  //  module.exports.loading(true);
    $(".navbar-brand").html(title);
    $( "#main_container" ).load(file, function( response, status, xhr ) {
      if ( status == "error" ) {
        remote.dialog.showErrorBox('Não foi possível carregar um módulo!', xhr.status + " " + xhr.statusText);
      }
      if(callback!=null)
      {
        callback();
      }
      window.scrollTo(0,0);
    //  module.exports.loading(false);
    });
  }
};
