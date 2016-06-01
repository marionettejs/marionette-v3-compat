import Marionette from 'backbone.marionette';

export default function() {
  Marionette.LayoutView = Marionette.View.extend({
    constructor() {
      Marionette.deprecate('Marionette.LayoutView is deprecated. Use Marionette.View');
      Marionette.View.prototype.constructor.apply(this, arguments);
    }
  });
}
