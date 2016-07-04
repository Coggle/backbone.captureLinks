define(function(require, exports, module) {

// modified from http://stackoverflow.com/questions/7310230/backbone-routes-without-hashes
Backbone.Router.captureLinks = function() {
  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
    if (Backbone.Router._disableCaptureLinks) return;
    // if this looks like a click with a modifier to open-in-new-tab, then
    // don't route it in this tab:
    if (evt.metaKey || evt.ctrlKey || evt.shiftKey) {
        return;
    }

    // Get the absolute anchor href.
    var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
    
    // Get the absolute root.
    var root = location.protocol + "//" + location.host;
    // Ensure the root is part of the anchor href, meaning it's relative.
    if ((href.attr.slice(0, 1) !== '#') && (href.prop.slice(0, root.length) === root)) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate(href.prop.slice(root.length, href.prop.length), true);
    }
  });
};

Backbone.Router.disableCaptureLinks = function() {
  Backbone.Router._disableCaptureLinks = true;
};

});
