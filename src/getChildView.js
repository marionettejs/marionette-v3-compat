import Marionette from 'backbone.marionette';
import restoreFunction from './utils/restoreFunction';

export default function() {

  const originalPublicGetChildView = Marionette.View.prototype.getChildView;

  restoreFunction('_getChildView', 'getChildView', 'getChildView is deprecated. Use childView instead.', 'CollectionView');
  restoreFunction('_getEmptyView', 'getEmptyView', 'getEmptyView is deprecated. Use emptyView instead.', 'View');

  const restoredPublicGetChildView = Marionette.View.prototype.getChildView;

  Marionette.View = Marionette.View.extend({
    getChildView() {
      if (arguments.length) {
        return originalPublicGetChildView.apply(this, arguments);
      }

      return restoredPublicGetChildView.apply(this, arguments);
    }
  });
}
