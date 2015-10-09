// 倒计时
// 用法  $el:jquery对象元素, clock: 总共几秒倒计时，text: 倒计时时显示的带有数字的文本
// 示例  var myClock = new Clock($('.el'), 60, "倒计时60秒");
//       myClock.start();
// 暴露三个方法：start() 开始计时 ; reset()重置; isActive() 定时器状态

function noop() {
}

var Clock = function($el, clock, text, complete) {
  this._init($el, clock, text, complete);
  return this;
};
Clock.prototype = {
  _init: function($el, clock, text, complete) {
    this.$el = $el;
    this.initialClock = clock;
    this.clock = clock || 60;
    this.text = text;
    this.isLock = false;
    this.initialText = this._getText($el);
    this.complete = complete || noop;
    return this;
  },
  start: function() {
    if (this.isLock) return;
    this._update();
    return this;
  },
  reset: function() {
    this.clock = this.initialClock + 0;
    this._setText(this.$el, this.initialText);
    clearTimeout(this.timeout);
    this.isLock = false;
    return this;
  },
  isActive: function() {
    return this.isLock;
  },
  _update: function() {
    if (this.clock === -1) {
      this.isLock = false;
      this.clock = this.initialClock + 0;
      this._setText(this.$el, this.initialText);
      this.complete();
      return this;
    }
    var newStr = this.text.replace(/\d+/, this.clock);
    this._setText(this.$el, newStr);
    this.clock -= 1;
    this.timeout = setTimeout(this._update.bind(this), 1000);
    this.isLock = true;
  },
  _setText: function($el, text) {
    return ($el.text() && $el.text(text)) || $el.val(text);
  },
  _getText: function($el, text) {
    return $el.text() || $el.val();
  }
};
module.exports = Clock;
