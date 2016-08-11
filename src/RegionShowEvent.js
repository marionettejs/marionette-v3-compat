import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

export default function() {

  function dep() {
    Marionette.deprecate('Show events are no longer triggered on the View.  User render or attach.');
  }

  function triggerOnChildren(children, name) {
    if (!children) { return; }

    children.each(function(v) {
      if (!v._isShown) { Marionette.triggerMethodOn(v, name, v); }
      if (name === 'show') { v._isShown = true; }
    });
  }


  var regionTriggerMethod = Marionette.Region.prototype.triggerMethod;

  Marionette.Region.prototype.triggerMethod = function(name, region, view, options) {
    var result;
    if (name === 'before:show' || name === 'show') {
      result = regionTriggerMethod.call(this, name, view, region, options);
      if (!view._isShown) { Marionette.triggerMethodOn(view, name, view, region, options); }
      if (name === 'show') {
        view._isShown = true;
        triggerOnChildren(view.children, name);
      } else {
        view.once('render', function() {
          triggerOnChildren(view.children, name);
        });
      }
    } else {
      result = regionTriggerMethod.apply(this, arguments);
    }

    return result;
  };

  var _addChildView = Marionette.CollectionView.prototype._addChildView;

  Marionette.CollectionView.prototype._addChildView = function(view) {
    view.once('render', function() {
      // trigger the 'before:show' event on `view` if the collection view has already been shown
      if (this._isShown && !this._isBuffering) {
        Marionette.triggerMethodOn(view, 'before:show', view);
      }
    }, this);

    _addChildView.apply(this, arguments);

    if (this._isShown && !this._isBuffering) {
      if (!view._isShown) {
        Marionette.triggerMethodOn(view, 'show', view);
      }
      view._isShown = true;
    }
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
    var isView = this.prototype instanceof Backbone.View || this === Backbone.View;
    var isRegion = this.prototype instanceof Marionette.Region || this === Marionette.Region;
    if (isView || isRegion) {
      var methodName = 'on' + name.replace(splitter, getEventName);
      var method = (this.options && this.options[methodName]) || this[methodName];

      if (_.isFunction(method)) {
        if (isView) {
          dep();
        } else {
          if (method.length > 1) {
            Marionette.deprecate('Region show events in v3 pass the region and the 1st argument and the view as the 2nd');
          }
        }
      }

      if (!this._events) { return this; }

      if ((name === 'before:show' || name === 'show') && this._events[name]) {
        if (isView) {
          dep();
        } else {
          if (this._events[name].length > 1) {
            Marionette.deprecate('Region show events in v3 pass the region and the 1st argument and the view as the 2nd');
          }
        }
      }
    }

    return trigger.apply(this, arguments);
  }
}
