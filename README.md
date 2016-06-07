# marionette-v3-compat
Transitional monkey patch to make Marionette v3 compatible with v2.

**Do NOT use this library in production!** This library is meant as a transitional tool only.
It is not guaranteed to be 100% backwards compatible and it will certainly be less performant.

Currently using v3.0.0-pre.3.

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

Todo: List available patches.



## Known Issues
- Marionette v3 no longer uses Wreqr.  This library shims Radio over the Wreqr API.  If you are using Wreqr directly sharing channels they will not communicate with the Application's channel.

- Changes to `Marionette.deprecate` are not accounted for.


###Unaccounted for breaking changes:

- Region: before:show / show events in v2 passed the view, the region, and options, but in v3 pass the region, the view and options
- Region: before:empty / empty events in v3 now pass the region as the first argument
- Region: before:destroy / destroy events in v3 now pass the region as the first argument

- Application: In v2 options passed while instantiating an Application were merged onto the Application. This was removed in v3 and not re-implemented here.

- View.isRendered / View.isDestroyed flags in v2 are now functions in v3. This is not accounted for here.
