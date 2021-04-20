var CoreObject  = require('core-object');
var gitRepoInfo = require('git-repo-info');
var RSVP        = require('rsvp');

module.exports = CoreObject.extend({
  init: function(options) {
    this._super();
    this._plugin = options.plugin;
  },

  generate: function() {
    var separator = this._plugin.readConfig('separator');
    var info = gitRepoInfo();

    if (info === null || info.root === null) {
      return RSVP.reject('Could not find git repository');
    }

    var branch = info.branch;

    if (!info.branch) {
      return RSVP.reject('Could not build revision with branch `' + branch + '`');
    }

    var chunks = info.branch.split('/');

    return RSVP.resolve({
      revisionKey: chunks[chunks.length - 1],
      timestamp: new Date().toISOString()
    });
  }
});
