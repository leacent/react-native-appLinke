var Loading = function() {
  this._init();
  return this;
};

Loading.prototype._init = function() {
  var $modal = $(document.createElement('div'));
  var $layer = $(document.createElement('div'));
  $modal.css({
    width: '128px',
    height: '52px',
    'background-color': 'rgba(0, 0, 0,0.6)',
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    margin: '0 auto',
    'z-index': '99999',
    display: 'block',
    'border-radius': '6px',
    border: 'none',
    color: '#fff',
    'text-align': 'center',
    'line-height': '52px',
    'font-size': '14px',
    'transition': 'all .5s ease'
  });
  $layer.css({
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    'background-color': 'rgba(0,0,0,0)',
    'z-index': '99998',
    display: 'none'
  });
  // $('body').append($modal);
  // $('body').append($layer);
  this.$modal = $modal;
  this.$layer = $layer;
  this.canShow = true;
  return this;
};
Loading.prototype.show = function(msg) {
  msg = msg || '加载数据中...';
  $('body').append(this.$modal);
  this.$modal.html(msg);
  this.$layer.css('display', 'block');
  return this;
};

Loading.prototype.hide = function() {
  this.$modal.remove();
  // this.$modal.css('display', 'none');
  this.$layer.css('display', 'none');
  return this;
};
Loading.prototype.flash = function (msg) {
  var self = this;
  if (!self.canShow) return;
  this.show(msg);
  setTimeout(function () {
    self.canShow = true;
  }, 1500);
  this.canShow = false;
  setTimeout(function () {
    self.hide();
  },1500);
};
// Loading.prototype.Singleton = function () {
//   this.instance = this.instance || new Loading();
//   return this.instance;
// };
module.exports = new Loading();
