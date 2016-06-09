import Marionette from 'backbone.marionette';

export default function() {
  Marionette.proxyGetOption = function(optionName) {
    Marionette.deprecate('proxyGetOption has been deprecated and removed in v3.');
    return Marionette.getOption(this, optionName);
  };

  Marionette.proxyBindEntityEvents = function(entity, bindings) {
    Marionette.deprecate('proxyBindEntityEvents has been deprecated and removed in v3.');
    return Marionette.bindEntityEvents(this, entity, bindings);
  };

  Marionette.proxyUnbindEntityEvents = function(entity, bindings) {
    Marionette.deprecate('proxyUnbindEntityEvents has been deprecated and removed in v3.');
    return Marionette.unbindEntityEvents(this, entity, bindings);
  };
}
