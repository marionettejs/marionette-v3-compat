import Marionette from 'backbone.marionette';

export default function() {
  Marionette.ItemView = Marionette.View.extend({
    constructor() {
      Marionette.deprecate('Marionette.ItemView is deprecated. Use Marionette.View');
      Marionette.View.prototype.constructor.apply(this, arguments);
    }
  });
}
