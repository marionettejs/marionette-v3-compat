import _ from 'underscore';
import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Marionette from 'backbone.marionette';

export default function() {

  function dep() {
    Marionette.deprecate('Global channels are deprecated.  Create your own Radio channels.');
  }

  const originalConstructor = Marionette.Application.prototype.constructor;

  Marionette.Application = Marionette.Application.extend({
    constructor: function() {
      this._initV2Channel();
      originalConstructor.apply(this, arguments);
    },

    // Command execution, facilitated by Backbone.Wreqr.Commands
    execute: function() {
      this.commands.execute.apply(this.commands, arguments);
    },

    // Request/response, facilitated by Backbone.Wreqr.RequestResponse
    request: function() {
      return this.reqres.request.apply(this.reqres, arguments);
    },

    _initV2Channel: function() {
      this.channelName = _.result(this, 'channelName') || 'global';
      this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
      this.channel.__deprecateChannel = true;
      this.vent = this.channel;
      this.reqres = this.channel;
      this.commands = this.channel;

      const channelOn = this.channel.on;

      this.channel.on = function() {
        dep();
        return channelOn.apply(this, arguments);
      };

      const channelRequest = this.channel.request;

      this.channel.request = function() {
        dep();
        return channelRequest.apply(this, arguments);
      };

      this.channel.execute = function() {
        dep();
        Marionette.deprecate('Channel commands are deprecated.  Use requests.');
        return channelRequest.apply(this, arguments);
      };

      const listenTo = Marionette.Object.listenTo;

      Marionette.Object.listenTo = function(obj) {
        if (obj.__deprecateChannel) { dep(); }
        listenTo.apply(this, arguments);
      };
    }
  });
}
