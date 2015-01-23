requirejs.config({
  paths: {
    // Libraries
    'text': 'js/lib/require/text',
    'fabric' : 'js/lib/fabric/fabric.require',
    'durandal':'js/lib/durandal/js',
    'plugins' : 'js/lib/durandal/js/plugins',
    'transitions' : 'js/lib/durandal/js/transitions',
    'knockout': 'js/lib/knockout/knockout-3.2.0',
    'knockout.punches': 'js/lib/knockout-punches/knockout.punches',
    'jquery': 'js/lib/jquery/jquery-2.1.1',
    'modal': 'js/lib/jquery-modal/jquery.modal.min',
    'datatables': 'js/lib/jquery-datatables/js/jquery.dataTables',
    'datatables.foundation': 'js/lib/jquery-datatables-foundation/dataTables.foundation',
    'dropzone': 'js/lib/dropzone/dropzone-amd-module',

    // Modules
    'gameMath' : 'js/modules/gameMath',
    'gameVariables': 'js/modules/gameVariables',
    'level': 'js/modules/level',
    'player': 'js/modules/player',
    'bullet': 'js/modules/bullet'

    },
    shim: {
      'knockout.punches': {
        deps: ['knockout']
      }
    }
});

define(function (require) {
  var system = require('durandal/system'),
      app = require('durandal/app'),
      ko = require('knockout');


  require('knockout.punches');
  ko.punches.enableAll();
  ko.punches.attributeInterpolationMarkup.enable();

  // Set window variables
  window.ko = ko;
  window.app = app;

  system.debug(true);

  app.title = 'Game';

  app.configurePlugins({
    router: true,
    dialog: true
  });

  app.start().then(function() {
    app.setRoot('views/layout');
  });
});
