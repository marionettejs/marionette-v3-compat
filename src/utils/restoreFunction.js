import Marionette from 'backbone.marionette';

export default function(privateFunction, publicFunction, deprecation, ClassName) {
  const original = Marionette[ClassName].prototype[privateFunction];
  const options = {};

  options[privateFunction] = function() {
    this._nodep = true;
    return this[publicFunction].apply(this, arguments);
  }

  options[publicFunction] = function() {
    if (this._nodep) {
      this._nodep = false;
    } else {
      Marionette.deprecate(deprecation);
    }
    return original.apply(this, arguments);
  }

  Marionette[ClassName] = Marionette[ClassName].extend(options);
}
