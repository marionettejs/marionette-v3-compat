export default function(privateFunction, publicFunction, deprecation, ClassName) {
  const original = Marionette[ClassName].prototype[privateFunction];
  const options = {};

  options[privateFunction] = function() {
    return this[publicFunction].apply(this, arguments);
  }

  options[publicFunction] = function() {
    Marionette.deprecate(deprecation);
    return original.apply(this, arguments);
  }

  Marionette[ClassName] = Marionette[ClassName].extend(options);
}
