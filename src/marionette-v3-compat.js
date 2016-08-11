import _ from 'underscore';
import Marionette from 'backbone.marionette';

import ApplicationWreqr from './ApplicationWreqr';
import bindEntityEvents from './bindEntityEvents';
import childEvents from './childEvents';
import CollectionView from './CollectionView';
import CompositeView from './CompositeView';
import Controller from './Controller';
import deprecatedEvents from './deprecatedEvents';
import getChildView from './getChildView';
import ItemView from './ItemView';
import LayoutView from './LayoutView';
import Module from './Module';
import normalizeUi from './normalizeUi';
import proxyFunctions from './proxyFunctions';
import Region from './Region';
import RegionManager from './RegionManager';
import RegionShowEvent from './RegionShowEvent';
import regionsOnApplication from './regionsOnApplication';
import regionsOnView from './regionsOnView';
import RegionStaticMethods from './RegionStaticMethods';
import templateHelpers from './templateHelpers';
import triggerProxy from './triggerProxy';
import viewOptions from './viewOptions';

Marionette.DEV_MODE = true;

if (!Marionette || Marionette.VERSION.charAt(0) !== '3') {
  alert('marionette-v3-compat patches Marionette v3 to act like v2. Marionette v3 not found.');
}

Marionette.VERSION = 'marionette-v3-compat';

// Add a console.trace to the deprecate message
Marionette.deprecate._warn = function() {
  const warn = Marionette.deprecate._console.warn || Marionette.deprecate._console.log || function() {};
  console.trace();
  return warn.apply(Marionette.deprecate._console, arguments);
};

Marionette._getValue = function(value, context, params) {
  if (_.isFunction(value)) {
    value = params ? value.apply(context, params) : value.call(context);
  }
  return value;
};

export default function(opts = {}) {
  const patches = _.extend({
    ApplicationWreqr,
    bindEntityEvents,
    childEvents,
    CollectionView,
    CompositeView,
    Controller,
    deprecatedEvents,
    getChildView,
    ItemView,
    LayoutView,
    Module,
    normalizeUi,
    proxyFunctions,
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
