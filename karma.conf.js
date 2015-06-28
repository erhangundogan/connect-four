module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'public/components/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['mocha'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
