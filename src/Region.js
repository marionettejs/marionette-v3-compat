import Marionette from 'backbone.marionette';

export default function() {

  const originalShow = Marionette.Region.prototype.show;

  Marionette.Region = Marionette.Region.extend({
    attachView(view) {
      Marionette.deprecate('Region#attachView was removed in v3. Use Region#show without fear of re-rendering.')
      if (this.currentView) {
        delete this.currentView._parent;
      }
      view._parent = this;
      this.currentView = view;
      return this;
    },
    show(view, options) {
      if (!this._ensureElement(options)) {
        return;
      }
      this._ensureView(view);
      if (view === this.currentView) { return this; }
      var isChangingView = !!this.currentView;
      if (isChangingView) {
        this.triggerMethod('before:swapOut', this.currentView, this, options);
        this.triggerMethod('before:swap', view, this, options);
        this.triggerMethod('swapOut', this.currentView, this, options);
      }
      originalShow.apply(this, arguments);
      if (isChangingView) {
        this.triggerMethod('swap', view, this, options);
      }
      return this;
    },
  });
}
