import Marionette from 'backbone.marionette';

export default function() {

  function dep() {
    Marionette.deprecate('Regions attached to the Application are deprecated. Application now only has a single region.');
  }

  const originalConstructor = Marionette.Application.prototype.constructor;

  Marionette.Application = Marionette.Application.extend({
    constructor: function(options) {
      this._initializeRegions(options);
      originalConstructor.apply(this, arguments);
    },

    // Add regions to your app.
    // Accepts a hash of named strings or Region objects
    // addRegions({something: "#someRegion"})
    // addRegions({something: Region.extend({el: "#someRegion"}) });
    addRegions: function(regions) {
      return this._regionManager.addRegions(regions);
    },

    // Empty all regions in the app, without removing them
    emptyRegions: function() {
      return this._regionManager.emptyRegions();
    },

    // Removes a region from your app, by name
    // Accepts the regions name
    // removeRegion('myRegion')
    removeRegion: function(region) {
      return this._regionManager.removeRegion(region);
    },

    // Provides alternative access to regions
    // Accepts the region name
    // getRegion('main')
    getRegion: function(region) {
      if (arguments.length) {
        dep();
        return this._regionManager.get(region);
      }

      return this._region;
    },

    // Get all the regions from the region manager
    getRegions: function() {
      return this._regionManager.getRegions();
    },

    // Enable easy overriding of the default `RegionManager`
    // for customized region interactions and business-specific
    // view logic for better control over single regions.
    getRegionManager: function() {
      return new Marionette.RegionManager();
    },

    // Internal method to initialize the regions that have been defined in a
    // `regions` attribute on the application instance
    _initializeRegions: function(options = {}) {
      var regions = _.isFunction(this.regions) ? this.regions(options) : this.regions || {};

      // Enable users to define `regions` in instance options.
      var optionRegions = (options.options && options.options.regions) || options.regions;

      // Enable region options to be a function
      if (_.isFunction(optionRegions)) {
        optionRegions = optionRegions.call(this, options);
      }

      // Overwrite current regions with those passed in options
      _.extend(regions, optionRegions);

      this._initRegionManager();

      if (!_.isEmpty(regions)) {
        dep();

        this.addRegions(regions);
      }

      return this;
    },

    // Internal method to set up the region manager
    _initRegionManager: function() {
      this._regionManager = this.getRegionManager();
      this._regionManager._parent = this;

      this.listenTo(this._regionManager, 'before:add:region', function(name, region) {
        this.triggerMethod('before:add:region', name, region);
      });

      this.listenTo(this._regionManager, 'add:region', function(name, region) {
        this[name] = region;
        this.triggerMethod('add:region', name, region);
      });

      this.listenTo(this._regionManager, 'before:remove:region', function(name, region) {
        this.triggerMethod('before:remove:region', name, region);
      });

      this.listenTo(this._regionManager, 'remove:region', function(name, region) {
        delete this[name];
        this.triggerMethod('remove:region', name, region);
      });
    }
  })

}
