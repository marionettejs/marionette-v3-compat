import _ from 'underscore';
import Marionette from 'backbone.marionette';

export default function() {

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
