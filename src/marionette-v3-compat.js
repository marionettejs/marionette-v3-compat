import _ from 'underscore';
import Marionette from 'backbone.marionette';

import Controller from './Controller';
import ItemView from './ItemView';
import LayoutView from './LayoutView';
import Module from './Module';
import RegionManager from './RegionManager';
import templateHelpers from './templateHelpers';

Marionette.VERSION = 'marionette-v3-compat';

export default function(opts = {}) {
  const patches = _.extend({
    Controller,
    ItemView,
    LayoutView,
    Module,
    RegionManager,
    templateHelpers
  }, opts);

  _.mapObject(patches, function(patch) {
    if (_.isFunction(patch)) {
      patch();
    }
  });
}
