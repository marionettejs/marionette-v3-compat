import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

export default function() {
  const deprecatedEvents = {
    'render:collection': true
  };

  const dep = function(name) {
    Marionette.deprecate(`${ name } event is deprecated.`);
  }

  const listenTo = Backbone.View.prototype.listenTo;

  Backbone.View.prototype.listenTo = function(obj, name) {
    if (deprecatedEvents[name]) { dep(name); }
    if (_.isObject(name)) {
      _.each(name, function(value, key) {
        if (deprecatedEvents[key]) { dep(key); }
      });
    }
    listenTo.apply(this, arguments);
  }

  const on = Backbone.View.prototype.on;

  Backbone.View.prototype.on = function(name) {
    if (deprecatedEvents[name]) { dep(name); }
    if (_.isObject(name)) {
      _.each(name, function(value, key) {
        if (deprecatedEvents[key]) { dep(key); }
      });
    }
    on.apply(this, arguments);
  }
};
