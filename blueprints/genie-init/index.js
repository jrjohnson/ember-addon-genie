/*jshint node:true*/
var utils      = require('../../lib/utils/utils');

module.exports = {
  description: 'Genie Init',

  normalizeEntityName: function() {},

  beforeInstall: function() {
    return this.addAddonsToProject({
      packages: [
        'ember-suave',
        'ember-cli-es5-shim'
      ]
    });
  },

  afterInstall: function() {
    this.modifyPackageJson();
  },

  locals: function() {
    return utils.getGitUserInfo();
  },

  modifyPackageJson: function() {
    var json = utils.getContents.call(this, 'package.json', 'json');
    var locals = this.locals();

    if(json.repository === '') {
      json.repository = {
        'type': 'git',
        'url': 'git@github.com:' + locals.username + '/' + json.name + '.git'
      };
    }

    if(json.author === '') {
      json.author = locals.username + ' <' + locals.email + '>';
    }

    if(this._selectedOptions.ghPages && !json['ember-addon'].demoURL) {
      json['ember-addon'].demoURL = 'http://' + locals.username + '.github.io/' + json.name;
    }

    utils.setContents.call(this, 'package.json', 'json', json);
  }

};
