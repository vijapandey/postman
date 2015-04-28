module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
        'app/bower_components/angular-cookies/angular-cookies.js',
        'app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/jquery/dist/jquery.js',
        'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
        //'app/components/**/*.js',
        //'app/script*/**/*.js',
        'app/script/app.js',
        'app/script/controller.js',
        'app/script/appdirectiveDirective.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
