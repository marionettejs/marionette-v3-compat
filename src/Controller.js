import Marionette from 'backbone.marionette';

export default function() {
  Marionette.Controller = Marionette.Object.extend({
    constructor() {
      Marionette.deprecate('Marionette.Controller is deprecated. Use Marionette.Object');
      Marionette.Object.prototype.constructor.apply(this, arguments);
    }
  });
}
