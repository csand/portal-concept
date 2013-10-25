var grunt = require('grunt');
var path = require('path');

module.exports = function(grunt) {
  var uglifyFiles = [
    'js/templates.js',
    'js/application.js',
    'js/router.js',
    'js/models/*.js',
    'js/controllers/*.js',
    'js/views/*.js'
  ];
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    emberTemplates: {
      compile: {
        options: {
          amd: false,
          templateBasePath: /templates\//
        },
        files: {'js/templates.js': 'templates/**/*.hbs'}
      }
    },
    copy: {
      build: {
        files: {
          'public/': [
            'index.html',
            'img/**/*',
            'css/**/*.css'
          ]
        }
      }
    },
    watch: {
      templates: {
        files: ['**/*.hbs'],
        tasks: ['emberTemplates:compile', 'uglify:dev'],
        options: {spawn: false}
      },
      uglify: {
        files: uglifyFiles,
        tasks: ['uglify:dev']
      },
      stylus: {
        files: ['css/**/*.styl'],
        tasks: ['stylus:dev']
      }
    },
    uglify: {
      dev: {
        options: {
          mangle: true,
          compress: true,
          preserveComments: false,
          sourceMap: 'js/portal.js.map',
          sourceMapPrefix: 1,
          sourceMappingURL: 'portal.js.map'
        },
        files: {
          'js/portal.js': uglifyFiles
        }
      },
      build: {
        options: {
          mangle: true,
          compress: true,
          report: 'min',
          preserveComments: false
        },
        files: {
          'public/js/portal.js': uglifyFiles,
          'public/js/lib/jquery.js': 'js/lib/jquery.js',
          'public/js/lib/lodash.js': 'js/lib/lodash.js',
          'public/js/lib/handlebars.runtime.js': 'js/lib/handlebars.runtime.js',
          'public/js/lib/ember.js': 'js/lib/ember.js',
          'public/js/lib/ember-data.js': 'js/lib/ember-data.js'
        }
      }
    },
    stylus: {
      dev: {
        options: {
          compress: false,
          use: [require('fluidity')],
          'import': ['fluidity']
        },
        files: {
          'css/style.css': ['css/**/*.styl']
        }
      },
      build: {
        options: {
          use: [require('fluidity')],
          'import': ['fluidity']
        },
        files: {
          'public/css/style.css': ['css/**/*.styl']
        }
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('build', ['emberTemplates:compile', 'uglify:build', 'copy:build']);
};
