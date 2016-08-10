import Marionette from 'backbone.marionette';
import _ from 'underscore';

export default function() {

  const originalConstructor = Marionette.View.prototype.constructor;

  _.extend(Marionette.View.prototype, {
    constructor(options) {
      const args = Array.prototype.slice.call(arguments);

      if (_.isFunction(options)) {
        Marionette.deprecate('Marionette.View options is no longer supported as a function. Please use an object instead.');
        options = options();
        args[0] = options;
      }

      originalConstructor.apply(this, args);
    }
  });
};
