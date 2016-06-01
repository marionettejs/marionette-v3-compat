import _ from 'underscore';
import Marionette from 'backbone.marionette';

export default function() {

  // Cache `childViewEvents` and `childViewTriggers`
  function _buildEventProxies() {
    if (this.childEvents || this.options.childEvents) {
      Marionette.deprecate('childEvents are deprecated. Use childViewEvents');
      this.mergeOptions(this.options, ['childEvents']);
      this._childViewEvents = _.result(this, 'childEvents');
    } else {
      this._childViewEvents = _.result(this, 'childViewEvents');
    }

    this._childViewTriggers = _.result(this, 'childViewTriggers');
  }

  _.extend(Marionette.View.prototype, {
    _buildEventProxies
  });

  _.extend(Marionette.CollectionView.prototype, {
    _buildEventProxies
  });
}
