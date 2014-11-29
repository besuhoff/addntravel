#!/bin/node

/**
 * Installation guideline:
 * To use this hook you need at least 1.8.2 version of GIT installed
 * sudo ln -s /usr/local/bin/node /bin/node
 * cd ./.git/hooks
 * ln -s ../../build/git-hooks/pre-push.js pre-push && chmod +x pre-push
 */

var colors = require('colors'),
    grunt = require('grunt'),
    messages = {
        success: 'pre push hook: '.magenta + 'SUCCESS'.green
    };


/**
 * Runs the hook
 */
(function () {
    'use strict';

  grunt.tasks(['test'], {}, function () {
    console.log(messages.success);
    process.exit(0);
  });
})();