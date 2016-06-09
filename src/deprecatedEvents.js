import Backbone from 'backbone';

export default function() {
  const deprecatedEvents = ['render:collection'];

  const listenTo = Backbone.Events.listenTo;

  const dep = function(name) {
    Marionette.deprecate(`${ name } event is deprecated.`);
  }

  Backbone.Events.listenTo = function(obj, name) {
    if (deprecatedEvents[name]) { dep(name); }
    if (_.isObject(name)) {
      _.each(name, function(value, key) {
        if (deprecatedEvents[key]) { dep(key); }
      });
    }
    listenTo.apply(this, arguments);
  }

  Backbone.Events.once = function(name) {
    if (deprecatedEvents[name]) { dep(name); }
    if (_.isObject(name)) {
      _.each(name, function(value, key) {
        if (deprecatedEvents[key]) { dep(key); }
      });
    }
    listenTo.apply(this, arguments);
  }
};
