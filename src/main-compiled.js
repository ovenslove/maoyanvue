'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _index = require('components/index/index');

var _index2 = _interopRequireDefault(_index);

var _filminfo = require('components/filminfo/filminfo');

var _filminfo2 = _interopRequireDefault(_filminfo);

var _vueScroll = require('vue-scroll');

var _vueScroll2 = _interopRequireDefault(_vueScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueResource2.default);
_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueScroll2.default);

var routes = [{ path: '/', component: _index2.default }, { path: '/index', component: _index2.default }, { path: '/filminfo/:id', component: _filminfo2.default }];
var router = new _vueRouter2.default({
  routes: routes
});

new _vue2.default({
  router: router,
  el: '#app',
  template: '<App/>',
  components: { App: _App2.default }
}).$mount('#app');

//# sourceMappingURL=main-compiled.js.map