import _ from 'underscore';
import Marionette from 'backbone.marionette';

<<<<<<< HEAD
import childEvents from './childEvents';
=======
import Controller from './Controller';
>>>>>>> 46fc571... create RegionManager.js and Controller.js
import ItemView from './ItemView';
import LayoutView from './LayoutView';
import Module from './Module';
import RegionManager from './RegionManager';
import templateHelpers from './templateHelpers';

Marionette.VERSION = 'marionette-v3-compat';

export default function(opts = {}) {
  const patches = _.extend({
<<<<<<< HEAD
    childEvents,
=======
    Controller,
>>>>>>> 46fc571... create RegionManager.js and Controller.js
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
