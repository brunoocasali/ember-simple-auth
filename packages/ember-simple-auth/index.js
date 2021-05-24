'use strict';

/* eslint-env node */
/* eslint-disable no-var, object-shorthand, prefer-template */

var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-simple-auth',

  included: function() {
    this._super.included.apply(this, arguments);
    this._ensureThisImport();

    this.import('vendor/base64.js');
  },

  treeForVendor() {
    var base64Tree = new Funnel(path.dirname(require.resolve('base-64')), {
      files: ['base64.js']
    });

    return base64Tree;
  },

  _ensureThisImport: function() {
    if (!this.import) {
      this._findHost = function findHostShim() {
        var current = this;
        var app;
        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
        return app;
      };
      this.import = function importShim(asset, options) {
        var app = this._findHost();
        app.import(asset, options);
      };
    }
  }
};
