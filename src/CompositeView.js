import Marionette from 'backbone.marionette';
export default function() {


  const originalRenderTemp = Marionette.CompositeView.prototype._renderTemplate;

  _.extend(Marionette.CompositeView.prototype, {
    _renderTemplate() {
      this.triggerMethod('before:render:template');
      originalRenderTemp.apply(this, arguments);
      this.triggerMethod('render:template');
    }
  });
}
