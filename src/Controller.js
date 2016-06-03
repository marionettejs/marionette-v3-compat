import Marionette from 'backbone.marionette';

export default function() {
  Marionette.Controller = Marionette.Object.extend({
    constructor(options) {
      this.options = options || {};

      const args = Array.prototype.slice.call(arguments);
      args[0] = this.options;

      Marionette.deprecate('Marionette.Controller is deprecated. Use Marionette.Object');
      Marionette.Object.prototype.constructor.apply(this, args);
    },

    destroy: function(...args) {
      this.triggerMethod('before:destroy', ...args);
      this.triggerMethod('destroy', ...args);
      this.stopListening();

      return this;
    }
  });
}
