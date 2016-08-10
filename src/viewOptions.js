import Marionette from 'backbone.marionette';

export default function() {

  const originalConstructor = Marionette.View.prototype.constructor;

  Marionette.View = Marionette.View.extend({
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
