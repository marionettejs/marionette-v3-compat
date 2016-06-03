import _ from 'underscore';
import Marionette from 'backbone.marionette';

import ApplicationWreqr from './ApplicationWreqr';
import childEvents from './childEvents';
import Controller from './Controller';
import ItemView from './ItemView';
import LayoutView from './LayoutView';
import Module from './Module';
import RegionManager from './RegionManager';
import RegionShowEvent from './RegionShowEvent';
import regionsOnApplication from './regionsOnApplication';
import regionsOnView from './regionsOnView';
import RegionStaticMethods from './RegionStaticMethods';
import templateHelpers from './templateHelpers';

Marionette.VERSION = 'marionette-v3-compat';

Marionette._getValue = function(value, context, params) {
  if (_.isFunction(value)) {
    value = params ? value.apply(context, params) : value.call(context);
  }
  return value;
};

export default function(opts = {}) {
  const patches = _.extend({
    ApplicationWreqr,
    childEvents,
    Controller,
    ItemView,
    LayoutView,
    Module,
    RegionManager,
    RegionShowEvent,
    regionsOnApplication,
    regionsOnView,
    RegionStaticMethods,
    templateHelpers
  }, opts);

  _.mapObject(patches, function(patch) {
    if (_.isFunction(patch)) {
      patch();
    }
  });
}
