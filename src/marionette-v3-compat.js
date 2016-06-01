import _ from 'underscore';
import Marionette from 'backbone.marionette';

import ItemView from './ItemView';
import LayoutView from './LayoutView';
import Module from './Module';
import templateHelpers from './templateHelpers';

Marionette.VERSION = 'marionette-v3-compat';

export default function(opts = {}) {
  const patches = _.extend({
    ItemView,
    LayoutView,
    Module,
    templateHelpers
  }, opts);

  _.mapObject(patches, function(patch) {
    if (_.isFunction(patch)) {
      patch();
    }
  });
}
