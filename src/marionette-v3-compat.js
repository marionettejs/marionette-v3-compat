import _ from 'underscore';
import Marionette from 'backbone.marionette';

import ApplicationWreqr from './ApplicationWreqr';
import childEvents from './childEvents';
import CollectionView from './CollectionView';
import Controller from './Controller';
import getChildView from './getChildView';
import ItemView from './ItemView';
import LayoutView from './LayoutView';
import Module from './Module';
import Region from './Region';
import RegionManager from './RegionManager';
import RegionShowEvent from './RegionShowEvent';
import regionsOnApplication from './regionsOnApplication';
import regionsOnView from './regionsOnView';
import RegionStaticMethods from './RegionStaticMethods';
import templateHelpers from './templateHelpers';
import triggerProxy from './triggerProxy';
import viewOptions from './viewOptions';

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
    CollectionView,
    Controller,
    getChildView,
    ItemView,
    LayoutView,
    Module,
    Region,
    RegionManager,
    RegionShowEvent,
    regionsOnApplication,
    regionsOnView,
    RegionStaticMethods,
    templateHelpers,
    triggerProxy,
    viewOptions
  }, opts);

  _.mapObject(patches, function(patch) {
    if (_.isFunction(patch)) {
      patch();
    }
  });
}
