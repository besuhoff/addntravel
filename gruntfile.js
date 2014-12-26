module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var chrome = ('linux' === process.platform) ? 'google-chrome' : 'Google Chrome',
    bowerPath = 'bower_components/',
    googleCdn = 'https://ajax.googleapis.com/ajax/libs/',
    cloudflareCdn = 'https://cdnjs.cloudflare.com/ajax/libs/',
    lib,
    libs = {
      'jquery': { path: 'jquery/dist/', src: 'jquery.js', min: 'jquery.min.js', cdn: googleCdn + 'jquery/1.11.1/jquery.min.js'},
      'angular': { path: 'angular/', src: 'angular.js', min: 'angular.min.js', cdn: googleCdn + 'angular/angular.min.js'},
      'angular-growl-2': { path: 'angular-growl-2/build/', src: 'angular-growl.js', min: 'angular-growl.min.js', cdn: '' },
      'ngAutocomplete': { path: 'ngAutocomplete/src/', src: 'ngAutocomplete.js', min: '', cdn: '' }
    },
    copyFiles = [],
    linkerFiles = [],
    targetPath = 'build/target/',
    sourcePath = 'src/';

  for (lib in libs) {
    copyFiles.push({
      src: bowerPath + libs[lib].path + libs[lib].src,
      dest: sourcePath + 'javascript/libs/' + lib + '.js'
    });
    linkerFiles.push(sourcePath + 'javascript/libs/' + lib + '.js');
  }

  copyFiles.push({src: sourcePath + 'index.src.html', dest: sourcePath + 'index.html'});
  copyFiles.push({src: bowerPath + 'bootstrap-css-only/css/bootstrap.min.css', dest: sourcePath + 'css/bootstrap.min.css'});

  linkerFiles.push(sourcePath + 'javascript/app/**/*.js');
  linkerFiles.push('!' + sourcePath + 'javascript/app/admin/config.stag.js');
  linkerFiles.push('!' + sourcePath + 'javascript/app/admin/config.prod.js');
  linkerFiles.push('!' + sourcePath + 'javascript/app/**/tests/*.js');

  grunt.initConfig({
    express: {
      source: {
        options: {
          server: 'server.js',
          port: Number(process.env.PORT || 3000)//,
//          livereload: true
        }
      },
      dist: {
        options: {
          bases: 'build/target'
        }
      }
    },
    copy: {
      index: {
        files: [
          { src: 'src/index.src.html', dest: 'src/index.html'}
        ]
      },
      dev: {
        files: copyFiles
      },
      prod: {
        files: [
          { src: 'src/index.src.html', dest: 'build/target/index.html'},
          { src: bowerPath + libs['angular-growl-2'].path + libs['angular-growl-2'].min, dest: targetPath + 'javascript/libs/angular-growl.min.js' }
        ]
      }
    },
    jslinker: {
      dev: {
        options: {
          target: sourcePath + 'index.html',
          relative_to: 'src'
        },
        src: linkerFiles
      }
    },
    replace: {
      css_path: {
        options: {
          patterns: [
            { match: /\/css\/main\.css/, replacement: 'css/main.min.css'},
          ]
        },
        files: [
          {expand: true, flatten: true, src: [targetPath + '/index.html'], dest: 'build/target/'}
        ]
      }
    },
    clean: {
      bower: ['bower_components'],
      target: ['build/target/**'],
      prod: [ targetPath + '/css/main.css', targetPath + '/javascript/app']
    },
    html2js: {
      options: {
        base: 'src/javascript/app/',
        module: 'app-templates'
      },
      templates: {
        src: [sourcePath + 'javascript/app/**/views/**/*.html'],
        dest: sourcePath + 'javascript/app/templates.js'
      }
    },
    json: {
      main: {
        options: {
          namespace: 'mocks'
        },
        src: ['build/api/resources/*.json'],
        dest: sourcePath + 'javascript/app/mocks.js'
      }
    },
    watch: {
      index: {
        files: ['src/index.src.html'],
        tasks: ['copy:index', 'jslinker:dev']
      },
      templates: {
        files: ['src/javascript/app/**/views/**/*.html'],
        tasks: ['html2js']
      },
      js: {
        files: ['src/javascript/app/**/*.js', targetPath + 'javascript/app/templates.js', targetPath + 'javascript/app/mocks.js'],
        tasks: ['ngAnnotate'],
        options: {
//          livereload: true
        }
      },
      json: {
        files: ['buils/api/resourses/*.json'],
        tasks: ['json']
      }
    },
    ngAnnotate: {
      prod: {
        files: {
          'build/target/javascript/app.js': [
              sourcePath + '/javascript/app/!(ant)/*.js',
              sourcePath + '/javascript/app/ant/*.js',
              sourcePath + '/javascript/app/templates.js',
              sourcePath + '/javascript/app/mocks.js'
          ]
        }
      }
    },
    jshint: {
      all: {
        src: ['src/javascript/app/**/*.js',
          '!src/javascript/app/templates.js',
          '!src/javascript/app/mocks.js'],
        options: {
          jshintrc: true
        }
      }
    },
    uglify: {
      prod: {
        files: {
          'build/target/javascript/app.min.js': ['build/target/javascript/app.js']
        }
      }
    },
    cssmin: {
      prod: {
        files: {
          'build/target/css/main.min.css': [sourcePath + 'css/main.css'],
        }
      }
    }
  });


  grunt.registerTask('default', ['start']);

  grunt.registerTask('start', 'Starting server...', function(targetOption) {
    var target = ['source', 'dist'].indexOf(targetOption) !== -1 ? targetOption : 'source';

    grunt.task.run(['express:' + target, 'watch', 'express-keepalive']);
  });

  grunt.registerTask('install', ['copy:dev', 'clean:bower', 'html2js', 'json', 'jslinker:dev']);
  grunt.registerTask('build', ['clean:target', 'copy:prod', 'clean:bower', 'html2js', 'json', 'ngAnnotate:prod', 'uglify', 'cssmin', 'replace:css_path', 'clean:prod']);

};
