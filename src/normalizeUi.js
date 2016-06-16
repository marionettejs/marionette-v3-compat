import _ from 'underscore';
import Marionette from 'backbone.marionette';

export default function() {

  var normalizeUIString = function(uiString, ui) {
    return uiString.replace(/@ui\.[a-zA-Z-_$0-9]*/g, function(r) {
      return ui[r.slice(4)];
    });
  };

  Marionette.normalizeUIString = function(uiString, ui) {
    Marionette.deprecate('normalizeUIString was removed in v3.');
    return normalizeUIString.apply(this, arguments);
  };

  var normalizeUIKeys = function(hash, ui) {
    return _.reduce(hash, function(memo, val, key) {
      var normalizedKey = normalizeUIString(key, ui);
      memo[normalizedKey] = val;
      return memo;
    }, {});
  };

  Marionette.normalizeUIKeys = function(hash, ui) {
    Marionette.deprecate('normalizeUIKeys was removed in v3.');
    return normalizeUIKeys.apply(this, arguments);
  };

  var normalizeUIValues = function(hash, ui, properties) {
    _.each(hash, function(val, key) {
      if (_.isString(val)) {
        hash[key] = normalizeUIString(val, ui);
      } else if (_.isObject(val) && _.isArray(properties)) {
        _.extend(val, normalizeUIValues(_.pick(val, properties), ui));
        /* Value is an object, and we got an array of embedded property names to normalize. */
        _.each(properties, function(property) {
          var propertyVal = val[property];
          if (_.isString(propertyVal)) {
            val[property] = normalizeUIString(propertyVal, ui);
          }
        });
      }
    });
    return hash;
  };

  Marionette.normalizeUIValues = function(hash, ui, properties) {
    Marionette.deprecate('normalizeUIValues was removed in v3.');
    return normalizeUIValues.apply(this, arguments);
  };

}
