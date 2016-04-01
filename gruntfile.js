/** Source paths **/
var src = {
  root: 'src/',
  html: 'src/',
  css: 'src/css/',
  less: 'src/less/',
  js: 'src/js/',
  vendor: 'bower_components/',
  img: 'src/img/',
  svg: 'src/img/svg/',
  fonts: 'src/fonts/',
  video: 'src/video/'
};

/** Destination paths **/
var dist = {
  root: 'dist/',
  html: 'dist/',
  css: 'dist/css/',
  js: 'dist/js/',
  img: 'dist/img/',

  fonts: 'dist/fonts/',
  video: 'dist/video/'
};


var config = {
  src: 'src/',
  dest: 'dist/',
  vendor: 'bower_components/'
};


module.exports = function (grunt) {
  grunt.initConfig({
    config: config,

    clean: {
      pre: [dist.root, src.css, src.js + 'vendor'],
      after: [src.js + 'vendor/fastclick.js', src.css + 'temp'],
      dist: [dist.js + 'custom.js']
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              src.vendor + 'html5shiv/dist/html5shiv.min.js',
              src.vendor + 'fastclick/lib/fastclick.js',
              src.vendor + 'jquery/jquery.min.js',
              src.vendor + 'jquery-mobile-bower/js/jquery.mobile-1.4.5.min.js'
            ],
            dest: src.js + 'vendor'
          },
          {
            expand: true,
            flatten: true,
            src: [
              src.vendor + 'jquery-mobile-bower/css/jquery.mobile-1.4.5.min.css'
            ],
            dest: src.css + 'vendor'
          },
          {
            expand: true,
            cwd: '<%= config.vendor %>/jquery-mobile-bower/css/images/',
            dest: '<%= config.src %>/css/images/',
            src: [
              '{,*/}*.*'
            ]
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>',
            dest: '<%= config.dest %>',
            src: [
              'css/**/*',
              'img/**/*',
              'js/{,*/}*.*',
              'fonts/{,*/}*.*',
              'video/{,*/}*.*',
              '{,*/}*.html'
            ]
          }
        ]
      }
    },
    concat: {
      options: {
        separator: '\n\n\n'
      },
      dist: {
        files: [
          {
            src: [
              src.js + 'custom.js',
              src.js + 'vendor/jquery.mobile-1.4.5.min.js'
            ],
            dest: src.js + 'plugins.js'
          },
          {
            src: [
              src.css + 'vendor/jquery.mobile-1.4.5.min.css'
            ],
            dest: src.css + 'plugins.css'
          }
        ]
      }
    },
    cssmin: {
      options: {
        separator: '\n\n\n'
      },
      dist: {
        files: [
          {
            expand: true,
            flatten: true,
            src: src.css + 'temp/*.css',
            dest: src.css + 'vendor',
            ext: '.min.css'
          }
        ]
      }
    },
    less: {
      dev: {
        options: {
          paths: [src.less]
        },
        files: [{
          expand: true,
          cwd: src.less,
          src: ["**/*.less"],
          dest: src.css,
          ext: ".css"
        }]
      }
    },
    uglify: {
      dev: {
        files: []
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: [src.js + "*.js"],
        tasks: ["process"]
      },
      styles: {
        files: [src.less + "*.less"],
        tasks: ["process"]
      },
      html: {
        files: [src.html + "*.html"],
        tasks: ["process"]
      },
      images: {
        files: [src.img + "**/*.*"],
        tasks: ["process"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-rename");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-newer");

  grunt.registerTask("default", ["clean:pre", "less", "copy:dev", "uglify:dev", "cssmin", "concat", "clean:after", "copy:dist", "clean:dist", "watch"]);
  grunt.registerTask("process", ["newer:less", "newer:copy:dist"]);
};