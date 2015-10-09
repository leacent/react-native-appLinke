require('./local_cache');
require('nprogress/nprogress.css');

var size = function() {
    return {
      //魅蓝note手机上的firefox，window.innerWidth和document.documentElement.clientWidth都不能取得正确的宽度，
      //screen.width可以。
      height: Math.min( window.innerHeight || screen.height|| document.documentElement.clientHeight,1024),
      width: Math.min( window.innerWidth || screen.width||document.documentElement.clientWidth,768)
    };
  };

(document.getElementsByTagName('html')[0]).style.fontSize = (size().width/375 * 100).toFixed(3) + 'px';

$(function(){
  $('body').on('touchstart', '*', function (e) {
    $(this).addClass('hover');
  });
  $('body').on('touchend touchcancel', '*', function (e) {
    $(this).removeClass('hover');
  });
  $('body').on('focus','input',function (e) {
    $('body').addClass('fixfixed');
    $(this).addClass('focus').siblings('.icon-wrong-circle').removeClass('hide');
  });
  $('body').on('blur','input',function (e) {
    $('body').removeClass('fixfixed');
    $(this).removeClass('focus').siblings('.icon-wrong-circle').addClass('hide');
  });
});
