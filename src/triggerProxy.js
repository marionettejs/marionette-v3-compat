import _ from 'underscore';
import Marionette from 'backbone.marionette';

export default function() {

  // split the event name on the ":"
  var splitter = /(^|:)(\w)/gi;

  // take the event section ("section1:section2:section3")
  // and turn it in to uppercase name onSection1Section2Section3
  function getEventName(match, prefix, eventName) {
    return eventName.toUpperCase();
  }

  const triggerParent = Marionette.View.prototype._triggerEventOnParentLayout;

  function _triggerEventOnParentLayout(eventName, ...args) {
    const layoutView = this._parentView();
    if (!layoutView) { return; }

    args = args || [];

    const eventPrefix = _.result(layoutView, 'childViewEventPrefix');
    const prefixedEventName = eventPrefix + ':' + eventName;

    var methodName = 'on' + prefixedEventName.replace(splitter, getEventName);
    var method = (layoutView.options && layoutView.options[methodName]) || layoutView[methodName];

    // If this is true we expect that it is expecting `this`
    // as its first argument
    if ((_.isFunction(method) && method.length) === args.length + 1 ||
        (layoutView._events && layoutView._events[prefixedEventName] && layoutView._events[prefixedEventName].length) === args.length + 1) {
      args = [this].concat(args);
      Marionette.deprecate('The triggering view is no longer prepended on to the arguments of proxied child events.');
    }

    return triggerParent.apply(this, [eventName].concat(args));
  }

  _.extend(Marionette.View.prototype, {
    _triggerEventOnParentLayout
  });

  _.extend(Marionette.CompositeView.prototype, {
    _triggerEventOnParentLayout
  });
}
