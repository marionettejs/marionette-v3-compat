import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

export default function() {

  function dep() {
    Marionette.deprecate('Show events are no longer triggered on the View.  User render or attach.');
  }

  var regionTriggerMethod = Marionette.Region.prototype.triggerMethod;

  Marionette.Region.prototype.triggerMethod = function(name, region, view, options) {
    var result = regionTriggerMethod.apply(this, arguments);
    if (name === 'before:show' || name === 'show') {
      Marionette.triggerMethodOn(view, name, view, region, options);
    }

    return result;
  };


  // split the event name on the ":"
  var splitter = /(^|:)(\w)/gi;

  // take the event section ("section1:section2:section3")
  // and turn it in to uppercase name onSection1Section2Section3
  function getEventName(match, prefix, eventName) {
    return eventName.toUpperCase();
  }

  var trigger = Backbone.Events.trigger;

  Backbone.Events.trigger = function(name) {
    if (this.prototype instanceof Backbone.View || this === Backbone.View) {
      var methodName = 'on' + name.replace(splitter, getEventName);
      var method = (this.options && this.options[methodName]) || this[methodName];

      if (_.isFunction(method)) {
        dep();
      }

      if (!this._events) { return this; }

      if ((name === 'before:show' || name === 'show') && this._events[name]) {
        dep();
      }
    }

    return trigger.apply(this, arguments);
  }
}
