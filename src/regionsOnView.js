import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

export default function() {

  function dep() {
    Marionette.deprecate('Regions attached to the view are deprecated. Use View#getRegion or View#showChildView');
  }

  function _addRegion(view, name, region) {
    const regionShow = region.show;
    const regionEmpty = region.empty;
    const regionReset = region.reset;
    const regionOn = region.on;
    const regionOnce = region.once;

    const newRegion = _.extend({}, region, {
      on() {
        dep();
        regionOn.apply(this, arguments);
      },
      once() {
        dep();
        regionOnce.apply(this, arguments);
      },
      show() {
        dep();
        regionShow.apply(this, arguments);
      },
      empty() {
        dep();
        regionEmpty.apply(this, arguments);
      },
      reset() {
        dep();
        regionReset.apply(this, arguments);
      },
      __deprecatedRegion: true
    });

    view[name] = newRegion;
  }

  function _removeRegion(view, name, region) {
    delete view[name];
  }

  const listenTo = Backbone.View.listenTo;

  Backbone.View.listenTo = function(obj) {
    if (obj.__deprecatedRegion) { dep(); }
    listenTo.apply(this, arguments);
  }

  const initRegions = Marionette.LayoutView.prototype._initRegions;

  _.extend(Marionette.LayoutView.prototype, {
    _initRegions() {
      this.on({
        'add:region': _addRegion,
        'remove:region': _removeRegion
      });
      initRegions.apply(this, arguments);
    }
  });
}
