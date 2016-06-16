import _ from 'underscore';
import Marionette from 'backbone.marionette';

export default function() {

  var originalBind = Marionette.bindEvents;
  var originalUnbind = Marionette.unbindEvents;

  Marionette.bindEvents = function(context, entity, bindings) {
    if (_.isFunction(bindings)) {
      Marionette.deprecate('bindEvents no longer accepts bindings as a function in v3');
      bindings = bindings.call(context);
    }
    return originalBind(context, entity, bindings);
  };

  Marionette.unbindEvents = function(context, entity, bindings) {
    if (_.isFunction(bindings)) {
      Marionette.deprecate('unbindEvents no longer accepts bindings as a function in v3');
      bindings = bindings.call(context);
    }
    return originalUnbind(context, entity, bindings);
  };

  Marionette.bindEntityEvents = function(context, entity, bindings) {
    Marionette.deprecate('bindEntityEvents has been renamed to bindEvents in v3.');
    return Marionette.bindEvents(context, entity, bindings);
  };

  Marionette.unbindEntityEvents = function(context, entity, bindings) {
    Marionette.deprecate('unbindEntityEvents renamed to unbindEvents in v3.');
    return Marionette.unbindEvents(context, entity, bindings);
  };

  const bindEventsMixin = {
    bindEntityEvents(...args) {
      Marionette.deprecate('bindEntityEvents has been renamed to bindEvents in v3.');
      return Marionette.bindEvents(this, ...args);
    },
    unbindEntityEvents(...args) {
      Marionette.deprecate('unbindEntityEvents renamed to unbindEvents in v3.');
      return Marionette.unbindEvents(this, ...args);

    }
  };

  _.extend(Marionette.Object.prototype, bindEventsMixin);

  _.extend(Marionette.View.prototype, bindEventsMixin);

  _.extend(Marionette.CollectionView.prototype, bindEventsMixin);
}
