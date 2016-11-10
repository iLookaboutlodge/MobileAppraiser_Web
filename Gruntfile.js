'use strict';

module.exports = function (grunt) {
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);
  var bower_file = require('./bower.json');
  var bower_components = Object.keys(bower_file.dependencies);

	// Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'release'
  };

  grunt.initConfig({
  	config: appConfig,

    bower_concat: {
      all: {
        dest: '<%= config.app %>/_bower.js'
      }
    },

    injector: {

      options: {
        template: "<%=config.app %>/index.html",
        relative: true,
        addSlashRoot: false
      },
      js: {
        files: {
          '<%= config.app %>/index.html': ['<%= config.app %>/scripts/libs/**/*.js','<%= config.app %>/scripts/services/**/*.js','<%= config.app %>/scripts/components/**/*.js','<%= config.app %>/scripts/config.js', '<%= config.app %>/scripts/app.module.js', '<%= config.app %>/scripts/app.config.js', '<%= config.app %>/scripts/_templates.js']
        }
      },
      html: {
        files: {
           '<%= config.app %>/index.html': ['<%= config.app %>/scripts/**/*.html']
        }
      },
      css: {
        files: {
           '<%= config.app %>/index.html': ['<%= config.app %>/styles/**/*.css']
        }
      }
    },

    less: {
      development: {
        options: {
          nospawn: true
        },
        files: {'<%= config.app %>/styles/main.css':'<%= config.app %>/styles/main.less'}
      }
    },

    watch: {
      css: {
        files: ['<%= config.app %>/styles/**/**/*.less'],
        tasks: ['less', 'injector:css']
      },
      js: {
        files: ['<%= config.app %>/scripts/**.js'],
        tasks: ['less', 'injector:js']
      },
      html: {
        files: ['<%= config.app %>/scripts/**/*.html'],
        tasks: ['less', 'ngtemplates', 'injector:js']
      },
      bower: {
        files: ['./bower'],
        tasks: ['bower', 'concat:bower']
      },
      grunt: {
        files: ['./gruntfile.js'],
        tasks: ['default']
      }
    },

    ngconstant: {
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {\%= __ngModule %}',
        name: 'config'
      },
      development: {
        options: {
            dest: 'app/scripts/config.js'
        },
        constants: {
            ENV: {
                name: 'development',
                apiEndpoint: 'http://localhost:31132'
            }
        }
      },
      release: {
        options: {
          dest: 'release/scripts/config.js'
        },
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://dev-ma.ilookabout.com'
          }
        }
      }
    },

    manifest: {
      release: {
        options: {
            basePath: '<%= config.dest %>',
            timestamp: false,
            hash: true
        },
        src: [
            './scripts/**/*.js',
            './styles/main.css',
            './_bower.js',
            './404.html',
            './index.html'
        ],
        dest: '<%= config.dest %>/manifest.appcache'
      }
    },

    copy: {
      release : {
        files: [
            {
                expand: true,
                cwd: '<%= config.app %>',
                src: ['**/*'],
                dest: 'release/'
            }
        ]
      }
    },

    ngtemplates: {
      app: {
        cwd: '<%= config.app %>/scripts/components',
        src: '**/*.html',
        dest: '<%= config.app %>/scripts/_templates.js',
        options: {
          htmlmin: {
              collapseWhitespace: true,
              collapseBooleanAttributes: true
          }
        }
      }
    }
  });

  grunt.registerTask('dev', [
    'build',
    'watch'
  ]);

  grunt.registerTask('build', [
    'less:development',
    'ngtemplates',
    'ngconstant:development',
    'injector',
    'bower_concat'
  ]);

  grunt.registerTask('release', [
    'build',
    'copy',
    'ngconstant:release',
    'manifest:release'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-contrib-copy');
};
