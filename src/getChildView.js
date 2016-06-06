import Marionette from 'backbone.marionette';

export default function() {

  const originalGetChildView = Marionette.CollectionView.prototype._getChildView;

  Marionette.CollectionView = Marionette.CollectionView.extend({
    getChildView() {
      Marionette.deprecate('getChildView is deprecated. Use childView instead.');
      return originalGetChildView.apply(this, arguments);
    },
    _getChildView() {
      return this.getChildView.apply(this, arguments);
    }
  });

  const originalPrivateGetChildView = Marionette.View.prototype._getChildView;
  const originalPublicGetChildView = Marionette.View.prototype._getChildView;

  Marionette.View = Marionette.View.extend({
    getChildView() {
      if (arguments.length) {
        return originalPublicGetChildView.apply(this, arguments);
      }

      Marionette.deprecate('getChildView is deprecated. Use childView instead.');
      return originalPrivateGetChildView.apply(this, arguments);
    },
    _getChildView() {
      return this.getChildView.apply(this, arguments);
    }
  });
}
