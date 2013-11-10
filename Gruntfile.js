/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
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
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      },
      slim: {
        files: ['slim/*.slim'],
        tasks: ['slim:dev']
      }
    },
    slim: {                              // Task
      dist: {                            // Target
        files: {                         // Dictionary of files
          'index.html': 'slim/index.slim',     // 'destination': 'source'
          'sidebar.html': 'slim/sidebar.slim'
        }
      },
      dev: {                             // Another target
        options: {                       // Target options
          pretty: true
        },
        files: {
          'index.html': [
            'slim/header.slim',
            'slim/container.slim',
            'slim/home.slim',
            'slim/menu.slim',
            'slim/footer.slim'  // Maybe you need one extra file in dev
          ],
          'buero.html': [
            'slim/header.slim',
            'slim/container.slim',
            'slim/buero.slim',
            'slim/menu.slim',
            'slim/footer.slim'  // Maybe you need one extra file in dev
          ],
          'project.html': [
            'slim/header.slim',
            'slim/container.slim',
            'slim/project.slim',
            'slim/menu.slim',
            'slim/footer.slim'  // Maybe you need one extra file in dev
          ],
          'list.html': [
            'slim/header.slim',
            'slim/container.slim',
            'slim/list.slim',
            'slim/menu.slim',
            'slim/footer.slim'
          ]
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-slim');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
