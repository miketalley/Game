define(['plugins/router', 'modal'], function (router) {

  function Shell(){
    var self = this;

    self.router = router;

    self.activate = function(){
      self.router.map([
        { route: '', title:'Home', moduleId: 'views/index', nav: true, hash: '#index' },
        { route:'play', title:'Play', moduleId:'views/play/index', nav: true, hash: '#play' },
        { route:'levels/new', title:'New Level', moduleId:'views/levels/new', nav: true, hash: '#levels/new' },
        { route:'prefabs/new', title:'New Prefab', moduleId:'views/prefabs/new', nav: true, hash: '#prefabs/new' },
        // { route: 'instruments/new',     title:'New Instrument',   moduleId:'sections/instruments/new',     nav: true },
        // { route:'sessions', title:'Sessions', moduleId:'sections/sessions/all', nav: true },
        // { route:'sessions/new', title:'New Sessions', moduleId:'sections/sessions/new', nav: true },
        // { route:'musicians', title:'Musicians', moduleId:'sections/musicians/all', nav: true },
        // { route: 'musicians/new',     title:'New Musician',   moduleId: 'sections/musicians/new',     nav: true },
        // { route: 'users/new',     title:'New User',   moduleId: 'sections/users/new',     nav: true }


      ]).buildNavigationModel();

      return self.router.activate();
    };

    // self.login = function(){
    //   console.log("Login");
    //   $.get("http://jamsync.herokuapp.com/users/sign_in", function(html) {
    //     $(html).appendTo('#login-modal');
    //     $('#login-modal').modal();
    //   });
    // };

    // self.signUp = function(){
    //   console.log("Sign Up");
    //   $.get('./app/assets/forms/signUp.html', function(html) {
    //     $(html).appendTo('#signUp-modal');
    //     $('#signUp-modal').modal();
    //   });
    // };

    // self.signedIn = false;

  }

  return Shell;

});
