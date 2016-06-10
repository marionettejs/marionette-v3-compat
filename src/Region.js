import Marionette from 'backbone.marionette';

import restoreFunction from './utils/restoreFunction';

export default function() {

  restoreFunction('_attachView', 'attachView', 'Region#attachView is now private.', 'Region');

  const originalShow = Marionette.Region.prototype.show;

  Marionette.Region = Marionette.Region.extend({
    show(view, options) {
      if (!this._ensureElement(options)) {
        return;
      }
      this._ensureView(view);
      if (view === this.currentView) { return this; }
      this.triggerMethod('before:swapOut', this.currentView, this, options);
      this.triggerMethod('before:swap', view, this, options)
      this.triggerMethod('swapOut', this.currentView, this, options);
      originalShow.apply(this, arguments);
      this.triggerMethod('swap', view, this, options);
      return this;
    },
  });
}
