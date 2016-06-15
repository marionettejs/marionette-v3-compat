import _ from 'underscore';
import Marionette from 'backbone.marionette';

export default function() {
  function mixinTemplateContext(target = {}) {
    if (this.templateHelpers || this.options.templateHelpers) {
      Marionette.deprecate('templateHelpers are deprecated. Use templateContext');
      this.mergeOptions(this.options, ['templateHelpers']);
      const templateHelpers = _.result(this, 'templateHelpers');
      return _.extend(target, templateHelpers);
    }

    const templateContext = _.result(this, 'templateContext');
    return _.extend(target, templateContext);
  }

  function mixinTemplateHelpers() {
    Marionette.deprecate('mixinTemplateHelpers was renamed mixinTemplateContext in v3.');
    mixinTemplateContext.apply(this, arguments);
  }

  _.extend(Marionette.View.prototype, {
    mixinTemplateContext,
    mixinTemplateHelpers
  });

  _.extend(Marionette.CompositeView.prototype, {
    mixinTemplateContext,
    mixinTemplateHelpers
  });
}
