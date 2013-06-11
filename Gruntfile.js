'use strict';

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.authors %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    clean:{
      css:['<%= pkg.paths.css %>all.combined.min.css', '<%= pkg.paths.css %>all.combined.css']
    },
    cssmin:{
      add_banner: {
        options: {
          banner : '<%= banner %>'
        },
        files: {
          '<%= pkg.paths.css %>all.combined.css': ['<%= pkg.paths.css %>*.css']
        }
      },
      minify: {
        expand: true,
        cwd: '<%= pkg.paths.css %>',
        src: ['all.combined.css'],
        dest: '<%= pkg.paths.css %>',
        ext: '.combined.min.css'
      }
    },
    watch: {
      options:{
        livereload: true,
        nosapwn: true
      },
      javascripts:{
        files:['assets/javascripts/*.js'],
        tasks:['livereload']
      },
      stylesheets:{
        files:['assets/stylesheets/*.css'],
        tasks:['livereload']
      },
      hbs: {
        files: ['partials/*.hbs'],
        tasks: ['assemble']
      },  
    }, //END WATCH
    assemble: {
      options: {
        flatten: true, 
        assets: 'dist/assets', 
        partials: 'partials/*.hbs'
      }, 
      pages: {
        options: {
          data: 'package.json'
        },
        files: {
          'dist/': ['*.hbs']
        }
      }
    }, // END ASSEMBLE

    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        middleware: function (connect) {
          return [
            mountFolder(connect, 'dist')
          ];
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    }, //END CONNECT

    open: {
      server: {
        path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
      }
    }, 

    'gh-pages': {
      options: { base: 'dist' },
      src: ['index.html', 'assets/images/**/*', 'assets/stylesheets/all.combined.min.css', 'assets/javascripts/**/*'],
    }
  });

  // Load NPM Tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  // Load Assemble
  grunt.loadNpmTasks('assemble');

  // Default task.
  grunt.registerTask('dev', ['assemble' ,'clean:css','cssmin', 'connect', 'open', 'watch']);
  grunt.registerTask('build', ['cssmin', 'gh-pages']);

};
