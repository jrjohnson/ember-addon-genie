/* jshint node: true */
'use strict';

var commands = require('./lib/commands');

module.exports = {
  name: 'ember-addon-genie',

  includedCommands: function () {
    return commands;
  }
};
