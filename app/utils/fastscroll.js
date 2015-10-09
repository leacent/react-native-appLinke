module.exports = (function (window, document, _) {

  var _handleds = [];

  var FastScroll = function (element) {
    var self = this;
    var _init;
    self.element = element;
    _init = function () {
      var ivScroll;
      var evt = document.createEvent("Event");
      evt.initEvent("scroll", true, true);

      var dispatchScroll = function () {
        self.element.dispatchEvent(evt);
      };

      var activateOnScroll = function () {
        ivScroll = setInterval(dispatchScroll, 20);
      };

      var deactivateOnScroll = function () {
        clearInterval(ivScroll);
      };

      if ("ontouchstart" in window) {
        self.element.addEventListener("touchstart", activateOnScroll);
        self.element.addEventListener("touchmove", dispatchScroll);
        self.element.addEventListener("touchend", deactivateOnScroll);
      }
    };
    if (_handleds.indexOf(self.element) === -1) {
      _handleds.push(self.element);
      _init();
    }
    return self;
  };

  FastScroll.prototype.addListener = function (callback) {
    this.element.addEventListener("scroll", callback);
  };

  FastScroll.prototype.removeListener = function (callback) {
    this.element.removeEventListener("scroll", callback);
  };

  FastScroll.prototype.dispatch = function () {
    var evt = document.createEvent("Event");
    evt.initEvent("scroll", true, true);
    this.element.dispatchEvent(evt);
  };

  return FastScroll;
})(window, document, _);
