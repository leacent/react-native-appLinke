var _ = require('lodash');
var km = require('keymirror');

module.exports = _.assign({

  // ghost number :

  // 工具栏默认标题
  APPLICATION_NAVBAR_DEFAULT_TITLE: '卖座电影',
  // 工具栏类型为菜单
  APPLICATION_NAVBAR_TYPE_IS_MENU: 'menu',
  // 工具栏类型为后退
  APPLICATION_NAVBAR_TYPE_IS_BACK: 'back'

}, km({

  // dispatcher :

  APPLICATION_NAVBAR_SET: null,
  APPLICATION_TIP_SET: null

}));
