Portal.Router.map(function() {
  this.resource('portal', {path: '/'}, function() {
    this.route('nav1');
    this.route('nav2');
  });
});

Portal.PortalRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('portal.nav1');
  }
});
