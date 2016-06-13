# marionette-v3-compat
Transitional monkey patch to make Marionette v3 compatible with v2.

**Do NOT use this library in production!** This library is meant as a transitional tool only.
It is not guaranteed to be 100% backwards compatible and it will certainly be less performant.

Currently using v3.0.0-pre.4.

Include and execute this library directly after marionette prior to using the library.

You can turn off certain patches by passing an object setting patches to false.

```js
// main.js
import _ from 'underscrore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette'

import Patch from 'marionette-v3-compat';

// turn off the ItemView and LayoutView patch
Patch({
  ItemView: false,
  LayoutView: false
});
```

## Current backport or shimming

If you are currently backporting v3 functionality or shimming in Radio for Wreqr you may need to remove these modifications.

## Available Patches

- **ApplicationWreqr**: Global channel on Application - `app.vent` `app.reqres` and `app.commands` were removed from Application as well as the `app.request` and `app.execute` shortcuts.
- **childEvents**: `childEvents` was renamed `childViewEvents`
- **CollectionView**: `CollectionView` had a number of methods privatized
- **Controller**: `Controller` was removed in v3
- **getChildView**: `getChildView` was removed from both View and CollectionView as `childView` can now accept a function
- **ItemView**: `Marionette.ItemView` is now `Marionette.View` in v3
- **LayoutView**: `Marionette.LayoutView` is now `Marionette.View` in v3
- **Module**: `Module` was removed in v3
- **Region**: Region swap events were removed and `attachView` was privatized. By default `show` will not re-render a rendered view, so `attachView` is unnecessary.
- **RegionManager**: `RegionManager` was removed in v3. The `Marionette.actAsCollection` utility was only used by `RegionManager`, so it was also removed.
- **RegionShowEvent**: Showing a view in a region no longer triggers a show event on the View in v3
- **regionsOnApplication**: Region instances are no longer appended to the Application.  Application has only one region and to access it use `getRegion`.
- **regionsOnApplication**: Region instances are no longer appended to the View.  Use `getRegion` to get the region by name from the view.
- **RegionStaticMethods**: The static build methods for a Region were removed in v3.
- **templateHelpers**: View's `templateHelpers` is now `templateContext` in v3
- **triggerProxy**: View events proxied to a parent layout no longer automatically prepend the view as the 1st argument.

## Known Issues
- Marionette v3 no longer uses Wreqr.  This library shims Radio over the Wreqr API.  If you are using Wreqr directly sharing channels they will not communicate with the Application's channel.

- Changes to `Marionette.deprecate` are not accounted for.


### Unaccounted for breaking changes:

- Region: before:show / show events in v2 passed the view, the region, and options, but in v3 pass the region, the view and options
- Region: before:empty / empty events in v3 now pass the region as the first argument
- Region: before:destroy / destroy events in v3 now pass the region as the first argument
- Region: show({forceShow: true}) was removed. In v3 a view is rendered if it was not previously and it is show if it was not shown previously. If you need to retrigger events, either re-render or empty/show again.

- Application: In v2 options passed while instantiating an Application were merged onto the Application. This was removed in v3 and not re-implemented here.

- View.isRendered / View.isDestroyed flags in v2 are now functions in v3. This is not accounted for here.
- View.triggers in v2 passed a object to the handler containing the view, model, and collection.  In v3 instead of this option, simply the view is passed (which will contain the model or collection anyhow).
- View.serializeModel in v3 uses `this.model` and does not take `model` as an argument.
- View.destroy in v3 doesn't call `Backbone.View.remove` directly however all pieces of it are called.  As long as someone isn't overriding remove in Backbone, this is a non-breaking change.
- View.modelEvents and View.collectionEvents were bound on `delegateEvents` in v2, but it was separated in v3 into its own `delegateEntityEvents`.  Entity events are now only bound upon initialization.
