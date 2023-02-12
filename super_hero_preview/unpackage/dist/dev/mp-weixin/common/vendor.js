(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"电影预告","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!******************************************************!*\
  !*** D:/WebStudy/super_hero_preview/utils/common.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.toImg = exports.toast = exports.request = void 0;var host = '../static/mock';
var request = function request(options) {
  options.url = host + options.url;
  options.timeout = 5000;
  if (!options.type) {
    options.method = "GET";
  }
  if (!options.header) {
    options.header = { 'Content-Type': 'application/json;charset=utf8' };
  }
  if (!options.data) {
    options.data = {};
  }
  return new Promise(function (resolve, reject) {
    uni.request({
      url: options.url,
      data: options.data,
      success: function success(res) {
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject('获取数据失败！');
        }
      },
      fail: function fail(err) {
        reject(err);
      } });

  });
};
// 显示提示框
exports.request = request;var toast = function toast() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { title: 'OK', duration: 1200, icon: 'success' };
  uni.showToast({
    icon: options.icon,
    title: options.title,
    duration: options.duration });

};
// 图片批量处理
exports.toast = toast;var toImg = function toImg(arg) {var reg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://';var rep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'https://images.weserv.nl/?url=';
  var newArg = null;
  if (arg.constructor === Array) {
    newArg = [];
    arg.forEach(function (item) {
      newArg.push(item.replace(reg, rep));
    });
  } else {
    newArg = arg.replace(reg, rep);
  }
  return newArg;
};exports.toImg = toImg;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!*******************************************************!*\
  !*** D:/WebStudy/super_hero_preview/utils/storage.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getLocal = void 0;var getLocal = function getLocal(key, field, value) {
  var userInfo = uni.getStorageSync(key);
  if (userInfo) {
    userInfo[field] = value;
    var res = uni.setStorageSync(key, userInfo);
  }
};exports.getLocal = getLocal;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"电影预告","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"电影预告","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"电影预告","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"电影预告","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!**************************************************************!*\
  !*** D:/WebStudy/super_hero_preview/static/mock/top250.json ***!
  \**************************************************************/
/*! exports provided: count, start, total, subjects, title, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"count\":50,\"start\":1,\"total\":250,\"subjects\":[{\"rating\":{\"max\":10,\"average\":9.6,\"details\":{\"1\":1210,\"2\":1362,\"3\":19321,\"4\":140177,\"5\":713825},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"爱情\",\"同性\"],\"title\":\"霸王别姬\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p67.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p67.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p67.jpg\"},\"name_en\":\"Leslie Cheung\",\"name\":\"张国荣\",\"alt\":\"https://movie.douban.com/celebrity/1003494/\",\"id\":\"1003494\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p46345.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p46345.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p46345.jpg\"},\"name_en\":\"Fengyi Zhang\",\"name\":\"张丰毅\",\"alt\":\"https://movie.douban.com/celebrity/1050265/\",\"id\":\"1050265\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399268395.47.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399268395.47.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399268395.47.jpg\"},\"name_en\":\"Li Gong\",\"name\":\"巩俐\",\"alt\":\"https://movie.douban.com/celebrity/1035641/\",\"id\":\"1035641\"}],\"durations\":[\"171 分钟\"],\"collect_count\":1549067,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"霸王别姬\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1451727734.81.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1451727734.81.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1451727734.81.jpg\"},\"name_en\":\"Kaige Chen\",\"name\":\"陈凯歌\",\"alt\":\"https://movie.douban.com/celebrity/1023040/\",\"id\":\"1023040\"}],\"pubdates\":[\"1993-01-01(香港)\"],\"year\":\"1993\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291546/\",\"id\":\"1291546\"},{\"rating\":{\"max\":10,\"average\":9.4,\"details\":{\"1\":1048,\"2\":2033,\"3\":34505,\"4\":238966,\"5\":793136},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"动作\",\"犯罪\"],\"title\":\"这个杀手不太冷\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8833.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8833.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8833.jpg\"},\"name_en\":\"Jean Reno\",\"name\":\"让·雷诺\",\"alt\":\"https://movie.douban.com/celebrity/1025182/\",\"id\":\"1025182\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2274.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2274.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2274.jpg\"},\"name_en\":\"Natalie Portman\",\"name\":\"娜塔莉·波特曼\",\"alt\":\"https://movie.douban.com/celebrity/1054454/\",\"id\":\"1054454\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33896.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33896.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33896.jpg\"},\"name_en\":\"Gary Oldman\",\"name\":\"加里·奥德曼\",\"alt\":\"https://movie.douban.com/celebrity/1010507/\",\"id\":\"1010507\"}],\"durations\":[\"110分钟(剧场版)\",\"133分钟(国际版)\"],\"collect_count\":1991251,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"Léon\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33301.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33301.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33301.jpg\"},\"name_en\":\"Luc Besson\",\"name\":\"吕克·贝松\",\"alt\":\"https://movie.douban.com/celebrity/1031876/\",\"id\":\"1031876\"}],\"pubdates\":[\"1994-09-14(法国)\"],\"year\":\"1994\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg\"},\"alt\":\"https://movie.douban.com/subject/1295644/\",\"id\":\"1295644\"},{\"rating\":{\"max\":10,\"average\":9.4,\"details\":{\"1\":928,\"2\":1730,\"3\":27448,\"4\":193737,\"5\":705781},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"爱情\"],\"title\":\"阿甘正传\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28603.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28603.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28603.jpg\"},\"name_en\":\"Tom Hanks\",\"name\":\"汤姆·汉克斯\",\"alt\":\"https://movie.douban.com/celebrity/1054450/\",\"id\":\"1054450\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1537890386.77.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1537890386.77.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1537890386.77.jpg\"},\"name_en\":\"Robin Wright\",\"name\":\"罗宾·怀特\",\"alt\":\"https://movie.douban.com/celebrity/1002676/\",\"id\":\"1002676\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1345.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1345.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1345.jpg\"},\"name_en\":\"Gary Sinise\",\"name\":\"加里·西尼斯\",\"alt\":\"https://movie.douban.com/celebrity/1031848/\",\"id\":\"1031848\"}],\"durations\":[\"142分钟\"],\"collect_count\":1694595,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"Forrest Gump\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p505.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p505.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p505.jpg\"},\"name_en\":\"Robert Zemeckis\",\"name\":\"罗伯特·泽米吉斯\",\"alt\":\"https://movie.douban.com/celebrity/1053564/\",\"id\":\"1053564\"}],\"pubdates\":[\"1994-06-23(洛杉矶首映)\",\"1994-07-06(美国)\"],\"year\":\"1994\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2559011361.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2559011361.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2559011361.jpg\"},\"alt\":\"https://movie.douban.com/subject/1292720/\",\"id\":\"1292720\"},{\"rating\":{\"max\":10,\"average\":9.5,\"details\":{\"1\":595,\"2\":1094,\"3\":13258,\"4\":97334,\"5\":438694},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"喜剧\",\"爱情\"],\"title\":\"美丽人生\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg\"},\"name_en\":\"Roberto Benigni\",\"name\":\"罗伯托·贝尼尼\",\"alt\":\"https://movie.douban.com/celebrity/1041004/\",\"id\":\"1041004\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9548.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9548.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9548.jpg\"},\"name_en\":\"Nicoletta Braschi\",\"name\":\"尼可莱塔·布拉斯基\",\"alt\":\"https://movie.douban.com/celebrity/1000375/\",\"id\":\"1000375\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45590.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45590.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45590.jpg\"},\"name_en\":\"Giorgio Cantarini\",\"name\":\"乔治·坎塔里尼\",\"alt\":\"https://movie.douban.com/celebrity/1000368/\",\"id\":\"1000368\"}],\"durations\":[\"116分钟\",\"125分钟(加长版)\"],\"collect_count\":891246,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"La vita è bella\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26764.jpg\"},\"name_en\":\"Roberto Benigni\",\"name\":\"罗伯托·贝尼尼\",\"alt\":\"https://movie.douban.com/celebrity/1041004/\",\"id\":\"1041004\"}],\"pubdates\":[\"1997-12-20(意大利)\"],\"year\":\"1997\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p510861873.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p510861873.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p510861873.jpg\"},\"alt\":\"https://movie.douban.com/subject/1292063/\",\"id\":\"1292063\"},{\"rating\":{\"max\":10,\"average\":9.4,\"details\":{\"1\":864,\"2\":2137,\"3\":36656,\"4\":205417,\"5\":648609},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"爱情\",\"灾难\"],\"title\":\"泰坦尼克号\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p814.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p814.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p814.jpg\"},\"name_en\":\"Leonardo DiCaprio\",\"name\":\"莱昂纳多·迪卡普里奥\",\"alt\":\"https://movie.douban.com/celebrity/1041029/\",\"id\":\"1041029\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53358.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53358.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53358.jpg\"},\"name_en\":\"Kate Winslet\",\"name\":\"凯特·温丝莱特\",\"alt\":\"https://movie.douban.com/celebrity/1054446/\",\"id\":\"1054446\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45186.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45186.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45186.jpg\"},\"name_en\":\"Billy Zane\",\"name\":\"比利·赞恩\",\"alt\":\"https://movie.douban.com/celebrity/1031864/\",\"id\":\"1031864\"}],\"durations\":[\"194分钟\",\"227分钟(白星版)\"],\"collect_count\":1587886,\"mainland_pubdate\":\"1998-04-03\",\"has_video\":true,\"original_title\":\"Titanic\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33715.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33715.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33715.jpg\"},\"name_en\":\"James Cameron\",\"name\":\"詹姆斯·卡梅隆\",\"alt\":\"https://movie.douban.com/celebrity/1022571/\",\"id\":\"1022571\"}],\"pubdates\":[\"1997-11-01(东京电影节)\",\"1997-12-19(美国)\",\"1998-04-03(中国大陆)\"],\"year\":\"1997\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p457760035.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p457760035.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p457760035.jpg\"},\"alt\":\"https://movie.douban.com/subject/1292722/\",\"id\":\"1292722\"},{\"rating\":{\"max\":10,\"average\":9.3,\"details\":{\"1\":1027,\"2\":2042,\"3\":37247,\"4\":232693,\"5\":677880},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"动画\",\"奇幻\"],\"title\":\"千与千寻\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1463193210.13.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1463193210.13.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1463193210.13.jpg\"},\"name_en\":\"Rumi Hiiragi\",\"name\":\"柊瑠美\",\"alt\":\"https://movie.douban.com/celebrity/1023337/\",\"id\":\"1023337\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44986.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44986.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44986.jpg\"},\"name_en\":\"Miyu Irino\",\"name\":\"入野自由\",\"alt\":\"https://movie.douban.com/celebrity/1005438/\",\"id\":\"1005438\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376151005.51.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376151005.51.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376151005.51.jpg\"},\"name_en\":\"Mari Natsuki\",\"name\":\"夏木真理\",\"alt\":\"https://movie.douban.com/celebrity/1045797/\",\"id\":\"1045797\"}],\"durations\":[\"125分钟\"],\"collect_count\":1566353,\"mainland_pubdate\":\"2019-06-21\",\"has_video\":false,\"original_title\":\"千と千尋の神隠し\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\"},\"name_en\":\"Hayao Miyazaki\",\"name\":\"宫崎骏\",\"alt\":\"https://movie.douban.com/celebrity/1054439/\",\"id\":\"1054439\"}],\"pubdates\":[\"2001-07-20(日本)\",\"2019-06-21(中国大陆)\"],\"year\":\"2001\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291561/\",\"id\":\"1291561\"},{\"rating\":{\"max\":10,\"average\":9.5,\"details\":{\"1\":402,\"2\":665,\"3\":12533,\"4\":95863,\"5\":378431},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"历史\",\"战争\"],\"title\":\"辛德勒的名单\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44906.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44906.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44906.jpg\"},\"name_en\":\"Liam Neeson\",\"name\":\"连姆·尼森\",\"alt\":\"https://movie.douban.com/celebrity/1031220/\",\"id\":\"1031220\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1374649659.58.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1374649659.58.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1374649659.58.jpg\"},\"name_en\":\"Ben Kingsley\",\"name\":\"本·金斯利\",\"alt\":\"https://movie.douban.com/celebrity/1054393/\",\"id\":\"1054393\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28941.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28941.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28941.jpg\"},\"name_en\":\"Ralph Fiennes\",\"name\":\"拉尔夫·费因斯\",\"alt\":\"https://movie.douban.com/celebrity/1006956/\",\"id\":\"1006956\"}],\"durations\":[\"195分钟\"],\"collect_count\":828723,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"Schindler's List\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34602.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34602.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34602.jpg\"},\"name_en\":\"Steven Spielberg\",\"name\":\"史蒂文·斯皮尔伯格\",\"alt\":\"https://movie.douban.com/celebrity/1054440/\",\"id\":\"1054440\"}],\"pubdates\":[\"1993-11-30(华盛顿首映)\",\"1994-02-04(美国)\"],\"year\":\"1993\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p492406163.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p492406163.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p492406163.jpg\"},\"alt\":\"https://movie.douban.com/subject/1295124/\",\"id\":\"1295124\"},{\"rating\":{\"max\":10,\"average\":9.3,\"details\":{\"1\":1412,\"2\":2362,\"3\":38120,\"4\":237809,\"5\":655006},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"科幻\",\"悬疑\"],\"title\":\"盗梦空间\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p814.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p814.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p814.jpg\"},\"name_en\":\"Leonardo DiCaprio\",\"name\":\"莱昂纳多·迪卡普里奥\",\"alt\":\"https://movie.douban.com/celebrity/1041029/\",\"id\":\"1041029\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3517.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3517.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3517.jpg\"},\"name_en\":\"Joseph Gordon-Levitt\",\"name\":\"约瑟夫·高登-莱维特\",\"alt\":\"https://movie.douban.com/celebrity/1101703/\",\"id\":\"1101703\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p118.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p118.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p118.jpg\"},\"name_en\":\"Ellen Page\",\"name\":\"艾伦·佩吉\",\"alt\":\"https://movie.douban.com/celebrity/1012520/\",\"id\":\"1012520\"}],\"durations\":[\"148分钟\"],\"collect_count\":1673207,\"mainland_pubdate\":\"2010-09-01\",\"has_video\":true,\"original_title\":\"Inception\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg\"},\"name_en\":\"Christopher Nolan\",\"name\":\"克里斯托弗·诺兰\",\"alt\":\"https://movie.douban.com/celebrity/1054524/\",\"id\":\"1054524\"}],\"pubdates\":[\"2010-07-16(美国)\",\"2010-09-01(中国大陆)\"],\"year\":\"2010\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p513344864.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p513344864.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p513344864.jpg\"},\"alt\":\"https://movie.douban.com/subject/3541415/\",\"id\":\"3541415\"},{\"rating\":{\"max\":10,\"average\":9.3,\"details\":{\"1\":722,\"2\":1919,\"3\":29462,\"4\":148939,\"5\":457392},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"忠犬八公的故事\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33013.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33013.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33013.jpg\"},\"name_en\":\"Richard Gere\",\"name\":\"理查·基尔\",\"alt\":\"https://movie.douban.com/celebrity/1040997/\",\"id\":\"1040997\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5502.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5502.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5502.jpg\"},\"name_en\":\"Sarah Roemer\",\"name\":\"萨拉·罗默尔\",\"alt\":\"https://movie.douban.com/celebrity/1049499/\",\"id\":\"1049499\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17520.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17520.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17520.jpg\"},\"name_en\":\"Joan Allen\",\"name\":\"琼·艾伦\",\"alt\":\"https://movie.douban.com/celebrity/1025215/\",\"id\":\"1025215\"}],\"durations\":[\"93分钟\"],\"collect_count\":1232018,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"Hachi: A Dog's Tale\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4333.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4333.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4333.jpg\"},\"name_en\":\"Lasse Hallström\",\"name\":\"拉斯·霍尔斯道姆\",\"alt\":\"https://movie.douban.com/celebrity/1018014/\",\"id\":\"1018014\"}],\"pubdates\":[\"2009-06-13(西雅图电影节)\",\"2010-03-12(英国)\"],\"year\":\"2009\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p524964016.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p524964016.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p524964016.jpg\"},\"alt\":\"https://movie.douban.com/subject/3011091/\",\"id\":\"3011091\"},{\"rating\":{\"max\":10,\"average\":9.3,\"details\":{\"1\":549,\"2\":1442,\"3\":26081,\"4\":148542,\"5\":435561},\"stars\":\"50\",\"min\":0},\"genres\":[\"爱情\",\"科幻\",\"动画\"],\"title\":\"机器人总动员\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13028.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13028.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13028.jpg\"},\"name_en\":\"Ben Burtt\",\"name\":\"本·贝尔特\",\"alt\":\"https://movie.douban.com/celebrity/1009535/\",\"id\":\"1009535\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1519794715.93.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1519794715.93.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1519794715.93.jpg\"},\"name_en\":\"Elissa Knight\",\"name\":\"艾丽莎·奈特\",\"alt\":\"https://movie.douban.com/celebrity/1000389/\",\"id\":\"1000389\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p31068.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p31068.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p31068.jpg\"},\"name_en\":\"Jeff Garlin\",\"name\":\"杰夫·格尔林\",\"alt\":\"https://movie.douban.com/celebrity/1018022/\",\"id\":\"1018022\"}],\"durations\":[\"98分钟\"],\"collect_count\":1076179,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"WALL·E\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467359656.96.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467359656.96.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467359656.96.jpg\"},\"name_en\":\"Andrew Stanton\",\"name\":\"安德鲁·斯坦顿\",\"alt\":\"https://movie.douban.com/celebrity/1036450/\",\"id\":\"1036450\"}],\"pubdates\":[\"2008-06-27(美国)\"],\"year\":\"2008\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1461851991.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1461851991.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1461851991.jpg\"},\"alt\":\"https://movie.douban.com/subject/2131459/\",\"id\":\"2131459\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":2505,\"2\":5050,\"3\":47984,\"4\":218884,\"5\":573094},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"喜剧\",\"爱情\"],\"title\":\"三傻大闹宝莱坞\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13628.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13628.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13628.jpg\"},\"name_en\":\"Aamir Khan\",\"name\":\"阿米尔·汗\",\"alt\":\"https://movie.douban.com/celebrity/1031931/\",\"id\":\"1031931\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5568.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5568.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5568.jpg\"},\"name_en\":\"Kareena Kapoor\",\"name\":\"卡琳娜·卡普尔\",\"alt\":\"https://movie.douban.com/celebrity/1049635/\",\"id\":\"1049635\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5651.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5651.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5651.jpg\"},\"name_en\":\"R. Madhavan\",\"name\":\"马达范\",\"alt\":\"https://movie.douban.com/celebrity/1018290/\",\"id\":\"1018290\"}],\"durations\":[\"171分钟(印度)\"],\"collect_count\":1434595,\"mainland_pubdate\":\"2011-12-08\",\"has_video\":false,\"original_title\":\"3 Idiots\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16549.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16549.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16549.jpg\"},\"name_en\":\"Rajkumar Hirani\",\"name\":\"拉吉库马尔·希拉尼\",\"alt\":\"https://movie.douban.com/celebrity/1286677/\",\"id\":\"1286677\"}],\"pubdates\":[\"2009-12-25(印度)\",\"2011-12-08(中国大陆)\"],\"year\":\"2009\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p579729551.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p579729551.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p579729551.jpg\"},\"alt\":\"https://movie.douban.com/subject/3793023/\",\"id\":\"3793023\"},{\"rating\":{\"max\":10,\"average\":9.3,\"details\":{\"1\":348,\"2\":1068,\"3\":24006,\"4\":161967,\"5\":404616},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"音乐\"],\"title\":\"放牛班的春天\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3363.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3363.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3363.jpg\"},\"name_en\":\"Gérard Jugnot\",\"name\":\"热拉尔·朱尼奥\",\"alt\":\"https://movie.douban.com/celebrity/1048281/\",\"id\":\"1048281\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9329.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9329.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9329.jpg\"},\"name_en\":\"François Berléand\",\"name\":\"弗朗索瓦·贝莱昂\",\"alt\":\"https://movie.douban.com/celebrity/1054351/\",\"id\":\"1054351\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44424.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44424.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44424.jpg\"},\"name_en\":\"Kad Merad\",\"name\":\"凯德·麦拉德\",\"alt\":\"https://movie.douban.com/celebrity/1000491/\",\"id\":\"1000491\"}],\"durations\":[\"97分钟\"],\"collect_count\":1084072,\"mainland_pubdate\":\"2004-10-16\",\"has_video\":true,\"original_title\":\"Les choristes\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p24744.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p24744.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p24744.jpg\"},\"name_en\":\"Christophe Barratier\",\"name\":\"克里斯托夫·巴拉蒂\",\"alt\":\"https://movie.douban.com/celebrity/1277959/\",\"id\":\"1277959\"}],\"pubdates\":[\"2004-03-17(法国)\",\"2004-10-16(中国大陆)\"],\"year\":\"2004\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910824951.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910824951.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910824951.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291549/\",\"id\":\"1291549\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":1207,\"2\":3371,\"3\":35420,\"4\":174407,\"5\":453953},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"音乐\"],\"title\":\"海上钢琴师\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6281.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6281.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6281.jpg\"},\"name_en\":\"Tim Roth\",\"name\":\"蒂姆·罗斯\",\"alt\":\"https://movie.douban.com/celebrity/1025176/\",\"id\":\"1025176\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1355152571.6.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1355152571.6.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1355152571.6.jpg\"},\"name_en\":\"Pruitt Taylor Vince\",\"name\":\"普路特·泰勒·文斯\",\"alt\":\"https://movie.douban.com/celebrity/1010659/\",\"id\":\"1010659\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12333.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12333.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12333.jpg\"},\"name_en\":\"Bill Nunn\",\"name\":\"比尔·努恩\",\"alt\":\"https://movie.douban.com/celebrity/1027407/\",\"id\":\"1027407\"}],\"durations\":[\"165分钟\",\"120分钟(法国版)\",\"169分钟(加长版)\"],\"collect_count\":1189627,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"La leggenda del pianista sull'oceano\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p195.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p195.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p195.jpg\"},\"name_en\":\"Giuseppe Tornatore\",\"name\":\"朱塞佩·托纳多雷\",\"alt\":\"https://movie.douban.com/celebrity/1018983/\",\"id\":\"1018983\"}],\"pubdates\":[\"1998-10-28(意大利)\"],\"year\":\"1998\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p511146807.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p511146807.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p511146807.jpg\"},\"alt\":\"https://movie.douban.com/subject/1292001/\",\"id\":\"1292001\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":572,\"2\":1679,\"3\":30415,\"4\":190743,\"5\":447069},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"科幻\"],\"title\":\"楚门的世界\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p615.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p615.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p615.jpg\"},\"name_en\":\"Jim Carrey\",\"name\":\"金·凯瑞\",\"alt\":\"https://movie.douban.com/celebrity/1054438/\",\"id\":\"1054438\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p38385.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p38385.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p38385.jpg\"},\"name_en\":\"Laura Linney\",\"name\":\"劳拉·琳妮\",\"alt\":\"https://movie.douban.com/celebrity/1053572/\",\"id\":\"1053572\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485163747.76.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485163747.76.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485163747.76.jpg\"},\"name_en\":\"Ed Harris\",\"name\":\"艾德·哈里斯\",\"alt\":\"https://movie.douban.com/celebrity/1048024/\",\"id\":\"1048024\"}],\"durations\":[\"103分钟\"],\"collect_count\":1133820,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"The Truman Show\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4360.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4360.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4360.jpg\"},\"name_en\":\"Peter Weir\",\"name\":\"彼得·威尔\",\"alt\":\"https://movie.douban.com/celebrity/1022721/\",\"id\":\"1022721\"}],\"pubdates\":[\"1998-06-05(美国)\"],\"year\":\"1998\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p479682972.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p479682972.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p479682972.jpg\"},\"alt\":\"https://movie.douban.com/subject/1292064/\",\"id\":\"1292064\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":1744,\"2\":3092,\"3\":39968,\"4\":170942,\"5\":441161},\"stars\":\"45\",\"min\":0},\"genres\":[\"喜剧\",\"爱情\",\"奇幻\"],\"title\":\"大话西游之大圣娶亲\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47421.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47421.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47421.jpg\"},\"name_en\":\"Stephen Chow\",\"name\":\"周星驰\",\"alt\":\"https://movie.douban.com/celebrity/1048026/\",\"id\":\"1048026\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45481.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45481.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45481.jpg\"},\"name_en\":\"Man Tat Ng\",\"name\":\"吴孟达\",\"alt\":\"https://movie.douban.com/celebrity/1016771/\",\"id\":\"1016771\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p49237.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p49237.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p49237.jpg\"},\"name_en\":\"Athena Chu\",\"name\":\"朱茵\",\"alt\":\"https://movie.douban.com/celebrity/1041734/\",\"id\":\"1041734\"}],\"durations\":[\"95分钟\",\"110分钟(重映版)\"],\"collect_count\":1153456,\"mainland_pubdate\":\"2014-10-24\",\"has_video\":true,\"original_title\":\"西遊記大結局之仙履奇緣\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45374.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45374.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45374.jpg\"},\"name_en\":\"Jeffrey Lau\",\"name\":\"刘镇伟\",\"alt\":\"https://movie.douban.com/celebrity/1274431/\",\"id\":\"1274431\"}],\"pubdates\":[\"1995-02-04(香港)\",\"2014-10-24(中国大陆)\",\"2017-04-13(中国大陆重映)\"],\"year\":\"1995\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2455050536.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2455050536.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2455050536.jpg\"},\"alt\":\"https://movie.douban.com/subject/1292213/\",\"id\":\"1292213\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":2428,\"2\":3526,\"3\":35196,\"4\":169676,\"5\":482070},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"科幻\",\"冒险\"],\"title\":\"星际穿越\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1392653727.04.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1392653727.04.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1392653727.04.jpg\"},\"name_en\":\"Matthew McConaughey\",\"name\":\"马修·麦康纳\",\"alt\":\"https://movie.douban.com/celebrity/1040511/\",\"id\":\"1040511\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10467.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10467.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10467.jpg\"},\"name_en\":\"Anne Hathaway\",\"name\":\"安妮·海瑟薇\",\"alt\":\"https://movie.douban.com/celebrity/1048027/\",\"id\":\"1048027\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p54076.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p54076.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p54076.jpg\"},\"name_en\":\"Jessica Chastain\",\"name\":\"杰西卡·查斯坦\",\"alt\":\"https://movie.douban.com/celebrity/1000225/\",\"id\":\"1000225\"}],\"durations\":[\"169分钟\"],\"collect_count\":1132627,\"mainland_pubdate\":\"2014-11-12\",\"has_video\":true,\"original_title\":\"Interstellar\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg\"},\"name_en\":\"Christopher Nolan\",\"name\":\"克里斯托弗·诺兰\",\"alt\":\"https://movie.douban.com/celebrity/1054524/\",\"id\":\"1054524\"}],\"pubdates\":[\"2014-11-07(美国)\",\"2014-11-12(中国大陆)\"],\"year\":\"2014\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2206088801.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2206088801.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2206088801.jpg\"},\"alt\":\"https://movie.douban.com/subject/1889243/\",\"id\":\"1889243\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":132,\"2\":488,\"3\":10840,\"4\":54178,\"5\":119052},\"stars\":\"45\",\"min\":0},\"genres\":[\"动画\",\"奇幻\",\"冒险\"],\"title\":\"龙猫\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1455201170.02.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1455201170.02.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1455201170.02.jpg\"},\"name_en\":\"Noriko Hidaka\",\"name\":\"日高法子\",\"alt\":\"https://movie.douban.com/celebrity/1019382/\",\"id\":\"1019382\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29537.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29537.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29537.jpg\"},\"name_en\":\"Chika Sakamoto\",\"name\":\"坂本千夏\",\"alt\":\"https://movie.douban.com/celebrity/1025582/\",\"id\":\"1025582\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1503457262.72.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1503457262.72.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1503457262.72.jpg\"},\"name_en\":\"Shigesato Itoi\",\"name\":\"糸井重里\",\"alt\":\"https://movie.douban.com/celebrity/1379738/\",\"id\":\"1379738\"}],\"durations\":[\"86分钟\"],\"collect_count\":1045766,\"mainland_pubdate\":\"2018-12-14\",\"has_video\":true,\"original_title\":\"となりのトトロ\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\"},\"name_en\":\"Hayao Miyazaki\",\"name\":\"宫崎骏\",\"alt\":\"https://movie.douban.com/celebrity/1054439/\",\"id\":\"1054439\"}],\"pubdates\":[\"1988-04-16(日本)\",\"2018-12-14(中国大陆)\"],\"year\":\"1988\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2540924496.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2540924496.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2540924496.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291560/\",\"id\":\"1291560\"},{\"rating\":{\"max\":10,\"average\":9.3,\"details\":{\"1\":826,\"2\":1942,\"3\":22055,\"4\":102055,\"5\":291347},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"犯罪\"],\"title\":\"教父\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45035.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45035.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45035.jpg\"},\"name_en\":\"Marlon Brando\",\"name\":\"马龙·白兰度\",\"alt\":\"https://movie.douban.com/celebrity/1041025/\",\"id\":\"1041025\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p645.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p645.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p645.jpg\"},\"name_en\":\"Al Pacino\",\"name\":\"阿尔·帕西诺\",\"alt\":\"https://movie.douban.com/celebrity/1054451/\",\"id\":\"1054451\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53524.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53524.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53524.jpg\"},\"name_en\":\"James Caan\",\"name\":\"詹姆斯·肯恩\",\"alt\":\"https://movie.douban.com/celebrity/1000050/\",\"id\":\"1000050\"}],\"durations\":[\"175 分钟\"],\"collect_count\":723562,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"The Godfather\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p592.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p592.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p592.jpg\"},\"name_en\":\"Francis Ford Coppola\",\"name\":\"弗朗西斯·福特·科波拉\",\"alt\":\"https://movie.douban.com/celebrity/1054419/\",\"id\":\"1054419\"}],\"pubdates\":[\"1972-03-15(纽约首映)\",\"1972-03-24(美国)\"],\"year\":\"1972\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p616779645.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p616779645.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p616779645.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291841/\",\"id\":\"1291841\"},{\"rating\":{\"max\":10,\"average\":9.3,\"details\":{\"1\":482,\"2\":1015,\"3\":16000,\"4\":107145,\"5\":280496},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"熔炉\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p55195.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p55195.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p55195.jpg\"},\"name_en\":\"Yoo Gong\",\"name\":\"孔侑\",\"alt\":\"https://movie.douban.com/celebrity/1011009/\",\"id\":\"1011009\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1409765749.47.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1409765749.47.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1409765749.47.jpg\"},\"name_en\":\"Yu-mi Jung\",\"name\":\"郑有美\",\"alt\":\"https://movie.douban.com/celebrity/1276062/\",\"id\":\"1276062\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1393488191.45.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1393488191.45.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1393488191.45.jpg\"},\"name_en\":\"Jee-young Kim\",\"name\":\"金志映\",\"alt\":\"https://movie.douban.com/celebrity/1331104/\",\"id\":\"1331104\"}],\"durations\":[\"125分钟\"],\"collect_count\":626055,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"도가니\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p52558.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p52558.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p52558.jpg\"},\"name_en\":\"Dong-hyuk Hwang\",\"name\":\"黄东赫\",\"alt\":\"https://movie.douban.com/celebrity/1317274/\",\"id\":\"1317274\"}],\"pubdates\":[\"2011-09-22(韩国)\"],\"year\":\"2011\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1363250216.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1363250216.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1363250216.jpg\"},\"alt\":\"https://movie.douban.com/subject/5912992/\",\"id\":\"5912992\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":357,\"2\":1170,\"3\":29467,\"4\":168066,\"5\":352415},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"犯罪\",\"悬疑\"],\"title\":\"无间道\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1378956633.91.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1378956633.91.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1378956633.91.jpg\"},\"name_en\":\"Andy Lau\",\"name\":\"刘德华\",\"alt\":\"https://movie.douban.com/celebrity/1054424/\",\"id\":\"1054424\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33525.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33525.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33525.jpg\"},\"name_en\":\"Tony Leung Chiu Wai\",\"name\":\"梁朝伟\",\"alt\":\"https://movie.douban.com/celebrity/1115918/\",\"id\":\"1115918\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p24841.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p24841.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p24841.jpg\"},\"name_en\":\"Anthony Wong Chau-Sang\",\"name\":\"黄秋生\",\"alt\":\"https://movie.douban.com/celebrity/1050076/\",\"id\":\"1050076\"}],\"durations\":[\"101分钟\",\"97分钟(导演剪辑版)\"],\"collect_count\":987508,\"mainland_pubdate\":\"2003-09-05\",\"has_video\":true,\"original_title\":\"無間道\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1403267018.07.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1403267018.07.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1403267018.07.jpg\"},\"name_en\":\"Andrew Lau\",\"name\":\"刘伟强\",\"alt\":\"https://movie.douban.com/celebrity/1106979/\",\"id\":\"1106979\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3547.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3547.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3547.jpg\"},\"name_en\":\"Alan Mak\",\"name\":\"麦兆辉\",\"alt\":\"https://movie.douban.com/celebrity/1126158/\",\"id\":\"1126158\"}],\"pubdates\":[\"2002-12-12(香港)\",\"2003-09-05(中国大陆)\"],\"year\":\"2002\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2233971046.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2233971046.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2233971046.jpg\"},\"alt\":\"https://movie.douban.com/subject/1307914/\",\"id\":\"1307914\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":804,\"2\":1984,\"3\":41806,\"4\":239640,\"5\":508671},\"stars\":\"45\",\"min\":0},\"genres\":[\"喜剧\",\"动画\",\"冒险\"],\"title\":\"疯狂动物城\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4815.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4815.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4815.jpg\"},\"name_en\":\"Ginnifer Goodwin\",\"name\":\"金妮弗·古德温\",\"alt\":\"https://movie.douban.com/celebrity/1017930/\",\"id\":\"1017930\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p18772.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p18772.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p18772.jpg\"},\"name_en\":\"Jason Bateman\",\"name\":\"杰森·贝特曼\",\"alt\":\"https://movie.douban.com/celebrity/1013760/\",\"id\":\"1013760\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1410696282.74.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1410696282.74.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1410696282.74.jpg\"},\"name_en\":\"Idris Elba\",\"name\":\"伊德里斯·艾尔巴\",\"alt\":\"https://movie.douban.com/celebrity/1049501/\",\"id\":\"1049501\"}],\"durations\":[\"109分钟(中国大陆)\",\"108分钟\"],\"collect_count\":1223330,\"mainland_pubdate\":\"2016-03-04\",\"has_video\":true,\"original_title\":\"Zootopia\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1457505519.94.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1457505519.94.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1457505519.94.jpg\"},\"name_en\":\"Byron Howard\",\"name\":\"拜伦·霍华德\",\"alt\":\"https://movie.douban.com/celebrity/1286985/\",\"id\":\"1286985\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1457505501.8.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1457505501.8.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1457505501.8.jpg\"},\"name_en\":\"Rich Moore\",\"name\":\"瑞奇·摩尔\",\"alt\":\"https://movie.douban.com/celebrity/1324037/\",\"id\":\"1324037\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1456810614.66.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1456810614.66.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1456810614.66.jpg\"},\"name_en\":\"Jared Bush\",\"name\":\"杰拉德·布什\",\"alt\":\"https://movie.douban.com/celebrity/1304069/\",\"id\":\"1304069\"}],\"pubdates\":[\"2016-03-04(中国大陆)\",\"2016-03-04(美国)\"],\"year\":\"2016\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2315672647.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2315672647.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2315672647.jpg\"},\"alt\":\"https://movie.douban.com/subject/25662329/\",\"id\":\"25662329\"},{\"rating\":{\"max\":10,\"average\":9.1,\"details\":{\"1\":771,\"2\":2744,\"3\":45899,\"4\":221081,\"5\":412457},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"传记\",\"家庭\"],\"title\":\"当幸福来敲门\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41483.jpg\"},\"name_en\":\"Will Smith\",\"name\":\"威尔·史密斯\",\"alt\":\"https://movie.douban.com/celebrity/1027138/\",\"id\":\"1027138\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1519305434.22.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1519305434.22.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1519305434.22.jpg\"},\"name_en\":\"Jaden Smith\",\"name\":\"贾登·史密斯\",\"alt\":\"https://movie.douban.com/celebrity/1010532/\",\"id\":\"1010532\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1378018910.89.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1378018910.89.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1378018910.89.jpg\"},\"name_en\":\"Thandie Newton\",\"name\":\"坦迪·牛顿\",\"alt\":\"https://movie.douban.com/celebrity/1040513/\",\"id\":\"1040513\"}],\"durations\":[\"117分钟\"],\"collect_count\":1200299,\"mainland_pubdate\":\"2008-01-17\",\"has_video\":true,\"original_title\":\"The Pursuit of Happyness\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p20409.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p20409.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p20409.jpg\"},\"name_en\":\"Gabriele Muccino\",\"name\":\"加布里埃莱·穆奇诺\",\"alt\":\"https://movie.douban.com/celebrity/1045093/\",\"id\":\"1045093\"}],\"pubdates\":[\"2006-12-15(美国)\",\"2008-01-17(中国大陆)\"],\"year\":\"2006\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1312700744.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1312700744.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1312700744.jpg\"},\"alt\":\"https://movie.douban.com/subject/1849031/\",\"id\":\"1849031\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":996,\"2\":3758,\"3\":57226,\"4\":253603,\"5\":465633},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"喜剧\",\"爱情\"],\"title\":\"怦然心动\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16442.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16442.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16442.jpg\"},\"name_en\":\"Madeline Carroll\",\"name\":\"玛德琳·卡罗尔\",\"alt\":\"https://movie.douban.com/celebrity/1031867/\",\"id\":\"1031867\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p22277.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p22277.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p22277.jpg\"},\"name_en\":\"Callan McAuliffe\",\"name\":\"卡兰·麦克奥利菲\",\"alt\":\"https://movie.douban.com/celebrity/1004751/\",\"id\":\"1004751\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12355.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12355.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12355.jpg\"},\"name_en\":\"Rebecca De Mornay\",\"name\":\"瑞贝卡·德·莫妮\",\"alt\":\"https://movie.douban.com/celebrity/1049546/\",\"id\":\"1049546\"}],\"durations\":[\"90分钟\"],\"collect_count\":1315867,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"Flipped\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1379484184.83.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1379484184.83.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1379484184.83.jpg\"},\"name_en\":\"Rob Reiner\",\"name\":\"罗伯·莱纳\",\"alt\":\"https://movie.douban.com/celebrity/1031903/\",\"id\":\"1031903\"}],\"pubdates\":[\"2010-07-26(好莱坞首映)\",\"2010-09-10(美国)\"],\"year\":\"2010\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p663036666.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p663036666.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p663036666.jpg\"},\"alt\":\"https://movie.douban.com/subject/3319755/\",\"id\":\"3319755\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":439,\"2\":1340,\"3\":21282,\"4\":130223,\"5\":297838},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"喜剧\"],\"title\":\"触不可及\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1375092314.14.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1375092314.14.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1375092314.14.jpg\"},\"name_en\":\"François Cluzet\",\"name\":\"弗朗索瓦·克鲁塞\",\"alt\":\"https://movie.douban.com/celebrity/1050210/\",\"id\":\"1050210\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41401.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41401.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41401.jpg\"},\"name_en\":\"Omar Sy\",\"name\":\"奥玛·希\",\"alt\":\"https://movie.douban.com/celebrity/1220507/\",\"id\":\"1220507\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42048.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42048.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42048.jpg\"},\"name_en\":\"Anne Le Ny\",\"name\":\"安娜·勒尼\",\"alt\":\"https://movie.douban.com/celebrity/1289597/\",\"id\":\"1289597\"}],\"durations\":[\"112分钟\"],\"collect_count\":749762,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"Intouchables\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41640.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41640.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41640.jpg\"},\"name_en\":\"Olivier Nakache\",\"name\":\"奥利维埃·纳卡什\",\"alt\":\"https://movie.douban.com/celebrity/1001404/\",\"id\":\"1001404\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p50463.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p50463.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p50463.jpg\"},\"name_en\":\"Eric Toledano\",\"name\":\"埃里克·托莱达诺\",\"alt\":\"https://movie.douban.com/celebrity/1010884/\",\"id\":\"1010884\"}],\"pubdates\":[\"2011-11-02(法国)\"],\"year\":\"2011\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1454261925.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1454261925.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1454261925.jpg\"},\"alt\":\"https://movie.douban.com/subject/6786002/\",\"id\":\"6786002\"},{\"rating\":{\"max\":10,\"average\":9.1,\"details\":{\"1\":1062,\"2\":2364,\"3\":30469,\"4\":123814,\"5\":296285},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"动作\",\"科幻\"],\"title\":\"蝙蝠侠：黑暗骑士\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1004.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1004.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1004.jpg\"},\"name_en\":\"Christian Bale\",\"name\":\"克里斯蒂安·贝尔\",\"alt\":\"https://movie.douban.com/celebrity/1005773/\",\"id\":\"1005773\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13801.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13801.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13801.jpg\"},\"name_en\":\"Heath Ledger\",\"name\":\"希斯·莱杰\",\"alt\":\"https://movie.douban.com/celebrity/1006957/\",\"id\":\"1006957\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p522.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p522.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p522.jpg\"},\"name_en\":\"Aaron Eckhart\",\"name\":\"艾伦·艾克哈特\",\"alt\":\"https://movie.douban.com/celebrity/1053577/\",\"id\":\"1053577\"}],\"durations\":[\"152分钟\"],\"collect_count\":770721,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"The Dark Knight\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p673.jpg\"},\"name_en\":\"Christopher Nolan\",\"name\":\"克里斯托弗·诺兰\",\"alt\":\"https://movie.douban.com/celebrity/1054524/\",\"id\":\"1054524\"}],\"pubdates\":[\"2008-07-14(纽约首映)\",\"2008-07-18(美国)\"],\"year\":\"2008\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p462657443.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p462657443.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p462657443.jpg\"},\"alt\":\"https://movie.douban.com/subject/1851857/\",\"id\":\"1851857\"},{\"rating\":{\"max\":10,\"average\":9.3,\"details\":{\"1\":370,\"2\":967,\"3\":14740,\"4\":78437,\"5\":205382},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"历史\",\"爱情\"],\"title\":\"乱世佳人\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3151.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3151.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p3151.jpg\"},\"name_en\":\"Vivien Leigh\",\"name\":\"费雯·丽\",\"alt\":\"https://movie.douban.com/celebrity/1010506/\",\"id\":\"1010506\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5289.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5289.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5289.jpg\"},\"name_en\":\"Clark Gable\",\"name\":\"克拉克·盖博\",\"alt\":\"https://movie.douban.com/celebrity/1006997/\",\"id\":\"1006997\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1397551638.55.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1397551638.55.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1397551638.55.jpg\"},\"name_en\":\"Olivia de Havilland\",\"name\":\"奥利维娅·德哈维兰\",\"alt\":\"https://movie.douban.com/celebrity/1010604/\",\"id\":\"1010604\"}],\"durations\":[\"238分钟\",\"234分钟\"],\"collect_count\":536325,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"Gone with the Wind\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p11303.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p11303.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p11303.jpg\"},\"name_en\":\"Victor Fleming\",\"name\":\"维克多·弗莱明\",\"alt\":\"https://movie.douban.com/celebrity/1032275/\",\"id\":\"1032275\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p19067.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p19067.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p19067.jpg\"},\"name_en\":\"George Cukor\",\"name\":\"乔治·库克\",\"alt\":\"https://movie.douban.com/celebrity/1010711/\",\"id\":\"1010711\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p54831.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p54831.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p54831.jpg\"},\"name_en\":\"Sam Wood\",\"name\":\"山姆·伍德\",\"alt\":\"https://movie.douban.com/celebrity/1012588/\",\"id\":\"1012588\"}],\"pubdates\":[\"1939-12-15(亚特兰大首映)\",\"1940-01-17(美国)\"],\"year\":\"1939\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1963126880.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1963126880.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1963126880.jpg\"},\"alt\":\"https://movie.douban.com/subject/1300267/\",\"id\":\"1300267\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":419,\"2\":1259,\"3\":17954,\"4\":103180,\"5\":233970},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"历史\",\"家庭\"],\"title\":\"活着\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p46.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p46.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p46.jpg\"},\"name_en\":\"You Ge\",\"name\":\"葛优\",\"alt\":\"https://movie.douban.com/celebrity/1000905/\",\"id\":\"1000905\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399268395.47.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399268395.47.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399268395.47.jpg\"},\"name_en\":\"Li Gong\",\"name\":\"巩俐\",\"alt\":\"https://movie.douban.com/celebrity/1035641/\",\"id\":\"1035641\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p27203.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p27203.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p27203.jpg\"},\"name_en\":\"Wu Jiang\",\"name\":\"姜武\",\"alt\":\"https://movie.douban.com/celebrity/1274290/\",\"id\":\"1274290\"}],\"durations\":[\"132分钟\"],\"collect_count\":595831,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"活着\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p568.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p568.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p568.jpg\"},\"name_en\":\"Yimou Zhang\",\"name\":\"张艺谋\",\"alt\":\"https://movie.douban.com/celebrity/1054398/\",\"id\":\"1054398\"}],\"pubdates\":[\"1994-05-17(戛纳电影节)\",\"1994-06-30(香港)\"],\"year\":\"1994\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2513253791.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2513253791.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2513253791.jpg\"},\"alt\":\"https://movie.douban.com/subject/1292365/\",\"id\":\"1292365\"},{\"rating\":{\"max\":10,\"average\":9.6,\"details\":{\"1\":121,\"2\":142,\"3\":2763,\"4\":27458,\"5\":133591},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"犯罪\",\"悬疑\"],\"title\":\"控方证人\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1425263540.96.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1425263540.96.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1425263540.96.jpg\"},\"name_en\":\"Tyrone Power\",\"name\":\"泰隆·鲍华\",\"alt\":\"https://movie.douban.com/celebrity/1048197/\",\"id\":\"1048197\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1134.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1134.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1134.jpg\"},\"name_en\":\"Marlene Dietrich\",\"name\":\"玛琳·黛德丽\",\"alt\":\"https://movie.douban.com/celebrity/1013957/\",\"id\":\"1013957\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1456671389.86.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1456671389.86.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1456671389.86.jpg\"},\"name_en\":\"Charles Laughton\",\"name\":\"查尔斯·劳顿\",\"alt\":\"https://movie.douban.com/celebrity/1010665/\",\"id\":\"1010665\"}],\"durations\":[\"116分钟\"],\"collect_count\":226288,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"Witness for the Prosecution\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p924.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p924.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p924.jpg\"},\"name_en\":\"Billy Wilder\",\"name\":\"比利·怀德\",\"alt\":\"https://movie.douban.com/celebrity/1054385/\",\"id\":\"1054385\"}],\"pubdates\":[\"1957-12-17(美国)\"],\"year\":\"1957\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1505392928.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1505392928.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1505392928.jpg\"},\"alt\":\"https://movie.douban.com/subject/1296141/\",\"id\":\"1296141\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":1346,\"2\":3398,\"3\":46443,\"4\":216994,\"5\":414566},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"奇幻\",\"冒险\"],\"title\":\"少年派的奇幻漂流\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1354193464.0.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1354193464.0.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1354193464.0.jpg\"},\"name_en\":\"Suraj Sharma\",\"name\":\"苏拉·沙玛\",\"alt\":\"https://movie.douban.com/celebrity/1322230/\",\"id\":\"1322230\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p48861.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p48861.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p48861.jpg\"},\"name_en\":\"Irrfan Khan\",\"name\":\"伊尔凡·可汗\",\"alt\":\"https://movie.douban.com/celebrity/1108861/\",\"id\":\"1108861\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1528099178.04.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1528099178.04.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1528099178.04.jpg\"},\"name_en\":\"Rafe Spall\",\"name\":\"拉菲·斯波\",\"alt\":\"https://movie.douban.com/celebrity/1032169/\",\"id\":\"1032169\"}],\"durations\":[\"127分钟\"],\"collect_count\":1135311,\"mainland_pubdate\":\"2012-11-22\",\"has_video\":true,\"original_title\":\"Life of Pi\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p595.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p595.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p595.jpg\"},\"name_en\":\"Ang Lee\",\"name\":\"李安\",\"alt\":\"https://movie.douban.com/celebrity/1054421/\",\"id\":\"1054421\"}],\"pubdates\":[\"2012-09-28(纽约电影节)\",\"2012-11-21(美国)\",\"2012-11-22(中国大陆)\"],\"year\":\"2012\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1784592701.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1784592701.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1784592701.jpg\"},\"alt\":\"https://movie.douban.com/subject/1929463/\",\"id\":\"1929463\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":570,\"2\":1605,\"3\":22180,\"4\":91868,\"5\":223873},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"动作\",\"奇幻\"],\"title\":\"指环王3：王者无敌\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29922.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29922.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29922.jpg\"},\"name_en\":\"Viggo Mortensen\",\"name\":\"维果·莫腾森\",\"alt\":\"https://movie.douban.com/celebrity/1054520/\",\"id\":\"1054520\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.jpg\"},\"name_en\":\"Elijah Wood\",\"name\":\"伊利亚·伍德\",\"alt\":\"https://movie.douban.com/celebrity/1054395/\",\"id\":\"1054395\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p11727.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p11727.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p11727.jpg\"},\"name_en\":\"Sean Astin\",\"name\":\"西恩·奥斯汀\",\"alt\":\"https://movie.douban.com/celebrity/1031818/\",\"id\":\"1031818\"}],\"durations\":[\"201分钟\",\"254分钟(加长版)\",\"263分钟(蓝光加长版)\"],\"collect_count\":597197,\"mainland_pubdate\":\"2004-03-12\",\"has_video\":true,\"original_title\":\"The Lord of the Rings: The Return of the King\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p40835.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p40835.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p40835.jpg\"},\"name_en\":\"Peter Jackson\",\"name\":\"彼得·杰克逊\",\"alt\":\"https://movie.douban.com/celebrity/1040524/\",\"id\":\"1040524\"}],\"pubdates\":[\"2003-12-17(美国)\",\"2004-03-12(中国大陆)\"],\"year\":\"2003\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910825503.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910825503.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910825503.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291552/\",\"id\":\"1291552\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":380,\"2\":1186,\"3\":18170,\"4\":92213,\"5\":207164},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"爱情\"],\"title\":\"天堂电影院\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43502.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43502.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43502.jpg\"},\"name_en\":\"Antonella Attili\",\"name\":\"安东内拉·阿蒂利\",\"alt\":\"https://movie.douban.com/celebrity/1277558/\",\"id\":\"1277558\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44286.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44286.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44286.jpg\"},\"name_en\":\"Enzo Cannavale\",\"name\":\"恩佐·卡拉瓦勒\",\"alt\":\"https://movie.douban.com/celebrity/1078332/\",\"id\":\"1078332\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1371022856.11.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1371022856.11.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1371022856.11.jpg\"},\"name_en\":\"Isa Danieli\",\"name\":\"艾萨·丹尼埃利\",\"alt\":\"https://movie.douban.com/celebrity/1074920/\",\"id\":\"1074920\"}],\"durations\":[\"155分钟\",\"173分钟(导演剪辑版)\",\"124分钟(剧场版)\"],\"collect_count\":557063,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"Nuovo Cinema Paradiso\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p195.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p195.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p195.jpg\"},\"name_en\":\"Giuseppe Tornatore\",\"name\":\"朱塞佩·托纳多雷\",\"alt\":\"https://movie.douban.com/celebrity/1018983/\",\"id\":\"1018983\"}],\"pubdates\":[\"1988-11-17(意大利)\"],\"year\":\"1988\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2559577569.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2559577569.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2559577569.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291828/\",\"id\":\"1291828\"},{\"rating\":{\"max\":10,\"average\":9.1,\"details\":{\"1\":327,\"2\":1114,\"3\":24835,\"4\":127374,\"5\":244468},\"stars\":\"45\",\"min\":0},\"genres\":[\"动画\",\"奇幻\",\"冒险\"],\"title\":\"天空之城\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4978.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4978.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4978.jpg\"},\"name_en\":\"Mayumi Tanaka\",\"name\":\"田中真弓\",\"alt\":\"https://movie.douban.com/celebrity/1016801/\",\"id\":\"1016801\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1496312006.95.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1496312006.95.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1496312006.95.jpg\"},\"name_en\":\"Keiko Yokozawa\",\"name\":\"横泽启子\",\"alt\":\"https://movie.douban.com/celebrity/1051412/\",\"id\":\"1051412\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376305807.47.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376305807.47.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376305807.47.jpg\"},\"name_en\":\"Kotoe Hatsui\",\"name\":\"初井言荣\",\"alt\":\"https://movie.douban.com/celebrity/1015339/\",\"id\":\"1015339\"}],\"durations\":[\"125分钟\"],\"collect_count\":709888,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"天空の城ラピュタ\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\"},\"name_en\":\"Hayao Miyazaki\",\"name\":\"宫崎骏\",\"alt\":\"https://movie.douban.com/celebrity/1054439/\",\"id\":\"1054439\"}],\"pubdates\":[\"1986-08-02(日本)\",\"1992(中国大陆)\"],\"year\":\"1986\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1446261379.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1446261379.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1446261379.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291583/\",\"id\":\"1291583\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":589,\"2\":1185,\"3\":14910,\"4\":74228,\"5\":194046},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"历史\",\"战争\"],\"title\":\"鬼子来了\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1517818343.94.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1517818343.94.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1517818343.94.jpg\"},\"name_en\":\"Wen Jiang\",\"name\":\"姜文\",\"alt\":\"https://movie.douban.com/celebrity/1021999/\",\"id\":\"1021999\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1379678916.04.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1379678916.04.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1379678916.04.jpg\"},\"name_en\":\"Teruyuki Kagawa\",\"name\":\"香川照之\",\"alt\":\"https://movie.douban.com/celebrity/1037221/\",\"id\":\"1037221\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1499449986.84.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1499449986.84.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1499449986.84.jpg\"},\"name_en\":\"Ding Yuan\",\"name\":\"袁丁\",\"alt\":\"https://movie.douban.com/celebrity/1331421/\",\"id\":\"1331421\"}],\"durations\":[\"139分钟\",\"162分钟(戛纳电影节)\"],\"collect_count\":500739,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"鬼子来了\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1517818343.94.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1517818343.94.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1517818343.94.jpg\"},\"name_en\":\"Wen Jiang\",\"name\":\"姜文\",\"alt\":\"https://movie.douban.com/celebrity/1021999/\",\"id\":\"1021999\"}],\"pubdates\":[\"2000-05-12(戛纳电影节)\",\"2002-04-27(日本)\"],\"year\":\"2000\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2553104888.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2553104888.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2553104888.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291858/\",\"id\":\"1291858\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":231,\"2\":598,\"3\":9794,\"4\":49780,\"5\":90987},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"传记\",\"运动\"],\"title\":\"摔跤吧！爸爸\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13628.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13628.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13628.jpg\"},\"name_en\":\"Aamir Khan\",\"name\":\"阿米尔·汗\",\"alt\":\"https://movie.douban.com/celebrity/1031931/\",\"id\":\"1031931\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1493121366.9.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1493121366.9.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1493121366.9.jpg\"},\"name_en\":\"Fatima Sana Shaikh\",\"name\":\"法缇玛·萨那·纱卡\",\"alt\":\"https://movie.douban.com/celebrity/1372457/\",\"id\":\"1372457\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1493121856.81.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1493121856.81.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1493121856.81.jpg\"},\"name_en\":\"Sanya Malhotra\",\"name\":\"桑亚·玛荷塔\",\"alt\":\"https://movie.douban.com/celebrity/1372458/\",\"id\":\"1372458\"}],\"durations\":[\"161分钟(印度)\",\"140分钟(中国大陆)\"],\"collect_count\":1259143,\"mainland_pubdate\":\"2017-05-05\",\"has_video\":true,\"original_title\":\"Dangal\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1484120321.24.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1484120321.24.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1484120321.24.jpg\"},\"name_en\":\"Nitesh Tiwari\",\"name\":\"涅提·蒂瓦里\",\"alt\":\"https://movie.douban.com/celebrity/1366907/\",\"id\":\"1366907\"}],\"pubdates\":[\"2016-12-23(印度)\",\"2017-05-05(中国大陆)\"],\"year\":\"2016\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2457983084.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2457983084.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2457983084.jpg\"},\"alt\":\"https://movie.douban.com/subject/26387939/\",\"id\":\"26387939\"},{\"rating\":{\"max\":10,\"average\":9.4,\"details\":{\"1\":251,\"2\":468,\"3\":7147,\"4\":44008,\"5\":149140},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"十二怒汉\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1537.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1537.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1537.jpg\"},\"name_en\":\"Henry Fonda\",\"name\":\"亨利·方达\",\"alt\":\"https://movie.douban.com/celebrity/1048150/\",\"id\":\"1048150\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1427201867.36.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1427201867.36.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1427201867.36.jpg\"},\"name_en\":\"Martin Balsam\",\"name\":\"马丁·鲍尔萨姆\",\"alt\":\"https://movie.douban.com/celebrity/1041188/\",\"id\":\"1041188\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p40857.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p40857.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p40857.jpg\"},\"name_en\":\"John Fiedler\",\"name\":\"约翰·菲德勒\",\"alt\":\"https://movie.douban.com/celebrity/1007076/\",\"id\":\"1007076\"}],\"durations\":[\"96 分钟\"],\"collect_count\":316710,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"12 Angry Men\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1309.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1309.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1309.jpg\"},\"name_en\":\"Sidney Lumet\",\"name\":\"西德尼·吕美特\",\"alt\":\"https://movie.douban.com/celebrity/1010627/\",\"id\":\"1010627\"}],\"pubdates\":[\"1957-04-13(美国)\"],\"year\":\"1957\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2173577632.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2173577632.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2173577632.jpg\"},\"alt\":\"https://movie.douban.com/subject/1293182/\",\"id\":\"1293182\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":455,\"2\":2178,\"3\":46511,\"4\":213577,\"5\":343877},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"喜剧\",\"动画\"],\"title\":\"飞屋环游记\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6202.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6202.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6202.jpg\"},\"name_en\":\"Edward Asner\",\"name\":\"爱德华·阿斯纳\",\"alt\":\"https://movie.douban.com/celebrity/1054334/\",\"id\":\"1054334\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42033.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42033.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42033.jpg\"},\"name_en\":\"Christopher Plummer\",\"name\":\"克里斯托弗·普卢默\",\"alt\":\"https://movie.douban.com/celebrity/1036321/\",\"id\":\"1036321\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p58161.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p58161.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p58161.jpg\"},\"name_en\":\"Jordan Nagai\",\"name\":\"乔丹·长井\",\"alt\":\"https://movie.douban.com/celebrity/1004683/\",\"id\":\"1004683\"}],\"durations\":[\"96分钟\"],\"collect_count\":1072517,\"mainland_pubdate\":\"2009-08-04\",\"has_video\":true,\"original_title\":\"Up\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1288.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1288.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1288.jpg\"},\"name_en\":\"Pete Docter\",\"name\":\"彼特·道格特\",\"alt\":\"https://movie.douban.com/celebrity/1022803/\",\"id\":\"1022803\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1375330728.5.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1375330728.5.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1375330728.5.jpg\"},\"name_en\":\"Bob Peterson\",\"name\":\"鲍勃·彼德森\",\"alt\":\"https://movie.douban.com/celebrity/1294383/\",\"id\":\"1294383\"}],\"pubdates\":[\"2009-05-13(戛纳电影节)\",\"2009-05-29(美国)\",\"2009-08-04(中国大陆)\"],\"year\":\"2009\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p485887754.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p485887754.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p485887754.jpg\"},\"alt\":\"https://movie.douban.com/subject/2129039/\",\"id\":\"2129039\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":1221,\"2\":3130,\"3\":44747,\"4\":177594,\"5\":313242},\"stars\":\"45\",\"min\":0},\"genres\":[\"喜剧\",\"爱情\",\"奇幻\"],\"title\":\"大话西游之月光宝盒\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47421.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47421.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47421.jpg\"},\"name_en\":\"Stephen Chow\",\"name\":\"周星驰\",\"alt\":\"https://movie.douban.com/celebrity/1048026/\",\"id\":\"1048026\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45481.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45481.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45481.jpg\"},\"name_en\":\"Man Tat Ng\",\"name\":\"吴孟达\",\"alt\":\"https://movie.douban.com/celebrity/1016771/\",\"id\":\"1016771\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1208.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1208.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1208.jpg\"},\"name_en\":\"Kar-Ying Law\",\"name\":\"罗家英\",\"alt\":\"https://movie.douban.com/celebrity/1108968/\",\"id\":\"1108968\"}],\"durations\":[\"87分钟\"],\"collect_count\":996535,\"mainland_pubdate\":\"2014-10-24\",\"has_video\":true,\"original_title\":\"西遊記第壹佰零壹回之月光寶盒\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45374.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45374.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p45374.jpg\"},\"name_en\":\"Jeffrey Lau\",\"name\":\"刘镇伟\",\"alt\":\"https://movie.douban.com/celebrity/1274431/\",\"id\":\"1274431\"}],\"pubdates\":[\"1995-01-21(香港)\",\"2014-10-24(中国大陆)\"],\"year\":\"1995\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1280323646.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1280323646.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1280323646.jpg\"},\"alt\":\"https://movie.douban.com/subject/1299398/\",\"id\":\"1299398\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":492,\"2\":2066,\"3\":34357,\"4\":148488,\"5\":267981},\"stars\":\"45\",\"min\":0},\"genres\":[\"动画\",\"奇幻\",\"冒险\"],\"title\":\"哈尔的移动城堡\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42411.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42411.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42411.jpg\"},\"name_en\":\"Chieko Baishô\",\"name\":\"倍赏千惠子\",\"alt\":\"https://movie.douban.com/celebrity/1056635/\",\"id\":\"1056635\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1365448692.55.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1365448692.55.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1365448692.55.jpg\"},\"name_en\":\"Takuya Kimura\",\"name\":\"木村拓哉\",\"alt\":\"https://movie.douban.com/celebrity/1041371/\",\"id\":\"1041371\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4422.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4422.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4422.jpg\"},\"name_en\":\"Akihiro Miwa\",\"name\":\"美轮明宏\",\"alt\":\"https://movie.douban.com/celebrity/1045925/\",\"id\":\"1045925\"}],\"durations\":[\"119分钟\"],\"collect_count\":773083,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"ハウルの動く城\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\"},\"name_en\":\"Hayao Miyazaki\",\"name\":\"宫崎骏\",\"alt\":\"https://movie.douban.com/celebrity/1054439/\",\"id\":\"1054439\"}],\"pubdates\":[\"2004-09-05(威尼斯电影节)\",\"2004-11-20(日本)\"],\"year\":\"2004\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2174346180.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2174346180.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2174346180.jpg\"},\"alt\":\"https://movie.douban.com/subject/1308807/\",\"id\":\"1308807\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":1370,\"2\":3291,\"3\":31656,\"4\":127704,\"5\":255138},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"动作\",\"悬疑\"],\"title\":\"搏击俱乐部\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p385.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p385.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p385.jpg\"},\"name_en\":\"Edward Norton\",\"name\":\"爱德华·诺顿\",\"alt\":\"https://movie.douban.com/celebrity/1035676/\",\"id\":\"1035676\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p39053.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p39053.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p39053.jpg\"},\"name_en\":\"Brad Pitt\",\"name\":\"布拉德·皮特\",\"alt\":\"https://movie.douban.com/celebrity/1054452/\",\"id\":\"1054452\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p19519.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p19519.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p19519.jpg\"},\"name_en\":\"Helena Bonham Carter\",\"name\":\"海伦娜·伯翰·卡特\",\"alt\":\"https://movie.douban.com/celebrity/1016680/\",\"id\":\"1016680\"}],\"durations\":[\"139 分钟\"],\"collect_count\":705077,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"Fight Club\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p22137.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p22137.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p22137.jpg\"},\"name_en\":\"David Fincher\",\"name\":\"大卫·芬奇\",\"alt\":\"https://movie.douban.com/celebrity/1012521/\",\"id\":\"1012521\"}],\"pubdates\":[\"1999-09-10(威尼斯电影节)\",\"1999-10-15(美国)\"],\"year\":\"1999\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1910926158.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1910926158.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1910926158.jpg\"},\"alt\":\"https://movie.douban.com/subject/1292000/\",\"id\":\"1292000\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":423,\"2\":1484,\"3\":33182,\"4\":153138,\"5\":256926},\"stars\":\"45\",\"min\":0},\"genres\":[\"喜剧\",\"剧情\",\"爱情\"],\"title\":\"罗马假日\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4157.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4157.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4157.jpg\"},\"name_en\":\"Audrey Hepburn\",\"name\":\"奥黛丽·赫本\",\"alt\":\"https://movie.douban.com/celebrity/1054449/\",\"id\":\"1054449\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p338.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p338.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p338.jpg\"},\"name_en\":\"Gregory Peck\",\"name\":\"格利高里·派克\",\"alt\":\"https://movie.douban.com/celebrity/1031218/\",\"id\":\"1031218\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12729.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12729.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12729.jpg\"},\"name_en\":\"Eddie Albert\",\"name\":\"埃迪·艾伯特\",\"alt\":\"https://movie.douban.com/celebrity/1048218/\",\"id\":\"1048218\"}],\"durations\":[\"118分钟\"],\"collect_count\":882973,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"Roman Holiday\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485245573.54.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485245573.54.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485245573.54.jpg\"},\"name_en\":\"William Wyler\",\"name\":\"威廉·惠勒\",\"alt\":\"https://movie.douban.com/celebrity/1010691/\",\"id\":\"1010691\"}],\"pubdates\":[\"1953-09-02(美国)\"],\"year\":\"1953\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2189265085.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2189265085.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2189265085.jpg\"},\"alt\":\"https://movie.douban.com/subject/1293839/\",\"id\":\"1293839\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":428,\"2\":1699,\"3\":27743,\"4\":130498,\"5\":231399},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"闻香识女人\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p645.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p645.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p645.jpg\"},\"name_en\":\"Al Pacino\",\"name\":\"阿尔·帕西诺\",\"alt\":\"https://movie.douban.com/celebrity/1054451/\",\"id\":\"1054451\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p20086.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p20086.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p20086.jpg\"},\"name_en\":\"Chris O'Donnell\",\"name\":\"克里斯·奥唐纳\",\"alt\":\"https://movie.douban.com/celebrity/1009272/\",\"id\":\"1009272\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1550134032.44.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1550134032.44.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1550134032.44.jpg\"},\"name_en\":\"James Rebhorn\",\"name\":\"詹姆斯·瑞布霍恩\",\"alt\":\"https://movie.douban.com/celebrity/1049801/\",\"id\":\"1049801\"}],\"durations\":[\"157 分钟\"],\"collect_count\":688813,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"Scent of a Woman\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4831.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4831.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4831.jpg\"},\"name_en\":\"Martin Brest\",\"name\":\"马丁·布莱斯特\",\"alt\":\"https://movie.douban.com/celebrity/1055265/\",\"id\":\"1055265\"}],\"pubdates\":[\"1992-12-23(美国)\"],\"year\":\"1992\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2550757929.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2550757929.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2550757929.jpg\"},\"alt\":\"https://movie.douban.com/subject/1298624/\",\"id\":\"1298624\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":346,\"2\":983,\"3\":15776,\"4\":84398,\"5\":184779},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"传记\",\"历史\"],\"title\":\"末代皇帝\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p35177.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p35177.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p35177.jpg\"},\"name_en\":\"John Lone\",\"name\":\"尊龙\",\"alt\":\"https://movie.douban.com/celebrity/1027367/\",\"id\":\"1027367\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5526.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5526.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5526.jpg\"},\"name_en\":\"Joan Chen\",\"name\":\"陈冲\",\"alt\":\"https://movie.douban.com/celebrity/1044964/\",\"id\":\"1044964\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p31577.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p31577.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p31577.jpg\"},\"name_en\":\"Vivian Wu\",\"name\":\"邬君梅\",\"alt\":\"https://movie.douban.com/celebrity/1004773/\",\"id\":\"1004773\"}],\"durations\":[\"163分钟\",\"219分钟 (电视版)\"],\"collect_count\":495930,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"The Last Emperor\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p374.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p374.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p374.jpg\"},\"name_en\":\"Bernardo Bertolucci\",\"name\":\"贝纳尔多·贝托鲁奇\",\"alt\":\"https://movie.douban.com/celebrity/1035651/\",\"id\":\"1035651\"}],\"pubdates\":[\"1987-10-04(东京国际电影节)\",\"1987-10-23(意大利)\"],\"year\":\"1987\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p452089833.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p452089833.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p452089833.jpg\"},\"alt\":\"https://movie.douban.com/subject/1293172/\",\"id\":\"1293172\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":211,\"2\":693,\"3\":11204,\"4\":50160,\"5\":95687},\"stars\":\"45\",\"min\":0},\"genres\":[\"喜剧\",\"动画\",\"奇幻\"],\"title\":\"寻梦环游记\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1489594517.9.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1489594517.9.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1489594517.9.jpg\"},\"name_en\":\"Anthony Gonzalez\",\"name\":\"安东尼·冈萨雷斯\",\"alt\":\"https://movie.douban.com/celebrity/1370411/\",\"id\":\"1370411\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1510634028.69.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1510634028.69.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1510634028.69.jpg\"},\"name_en\":\"Gael García Bernal\",\"name\":\"盖尔·加西亚·贝纳尔\",\"alt\":\"https://movie.douban.com/celebrity/1041009/\",\"id\":\"1041009\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1416762292.89.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1416762292.89.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1416762292.89.jpg\"},\"name_en\":\"Benjamin Bratt\",\"name\":\"本杰明·布拉特\",\"alt\":\"https://movie.douban.com/celebrity/1036383/\",\"id\":\"1036383\"}],\"durations\":[\"105分钟\"],\"collect_count\":1014353,\"mainland_pubdate\":\"2017-11-24\",\"has_video\":true,\"original_title\":\"Coco\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13830.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13830.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p13830.jpg\"},\"name_en\":\"Lee Unkrich\",\"name\":\"李·昂克里奇\",\"alt\":\"https://movie.douban.com/celebrity/1022678/\",\"id\":\"1022678\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1497195148.21.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1497195148.21.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1497195148.21.jpg\"},\"name_en\":\"Adrian Molina\",\"name\":\"阿德里安·莫利纳\",\"alt\":\"https://movie.douban.com/celebrity/1370425/\",\"id\":\"1370425\"}],\"pubdates\":[\"2017-10-20(莫雷利亚电影节)\",\"2017-11-22(美国)\",\"2017-11-24(中国大陆)\"],\"year\":\"2017\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2503997609.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2503997609.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2503997609.jpg\"},\"alt\":\"https://movie.douban.com/subject/20495023/\",\"id\":\"20495023\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":295,\"2\":708,\"3\":13309,\"4\":81365,\"5\":179960},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"辩护人\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p345.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p345.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p345.jpg\"},\"name_en\":\"Kang-ho Song\",\"name\":\"宋康昊\",\"alt\":\"https://movie.douban.com/celebrity/1031238/\",\"id\":\"1031238\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4183.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4183.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4183.jpg\"},\"name_en\":\"Dal-su Oh\",\"name\":\"吴达洙\",\"alt\":\"https://movie.douban.com/celebrity/1203077/\",\"id\":\"1203077\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26917.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26917.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26917.jpg\"},\"name_en\":\"Yeong-ae Kim\",\"name\":\"金英爱\",\"alt\":\"https://movie.douban.com/celebrity/1314843/\",\"id\":\"1314843\"}],\"durations\":[\"127分钟\"],\"collect_count\":444858,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"변호인\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1394517493.21.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1394517493.21.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1394517493.21.jpg\"},\"name_en\":\"Woo-seok Yang\",\"name\":\"杨宇硕\",\"alt\":\"https://movie.douban.com/celebrity/1338840/\",\"id\":\"1338840\"}],\"pubdates\":[\"2013-12-18(韩国)\"],\"year\":\"2013\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2158166535.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2158166535.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2158166535.jpg\"},\"alt\":\"https://movie.douban.com/subject/21937445/\",\"id\":\"21937445\"},{\"rating\":{\"max\":10,\"average\":9.1,\"details\":{\"1\":382,\"2\":1139,\"3\":15355,\"4\":81501,\"5\":174632},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"悬疑\"],\"title\":\"窃听风暴\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43345.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43345.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p43345.jpg\"},\"name_en\":\"Ulrich Mühe\",\"name\":\"乌尔里希·穆埃\",\"alt\":\"https://movie.douban.com/celebrity/1053553/\",\"id\":\"1053553\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2462.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2462.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2462.jpg\"},\"name_en\":\"Martina Gedeck\",\"name\":\"马蒂娜·格德克\",\"alt\":\"https://movie.douban.com/celebrity/1049928/\",\"id\":\"1049928\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1362985206.01.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1362985206.01.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1362985206.01.jpg\"},\"name_en\":\"Sebastian Koch\",\"name\":\"塞巴斯蒂安·科赫\",\"alt\":\"https://movie.douban.com/celebrity/1019130/\",\"id\":\"1019130\"}],\"durations\":[\"137分钟\"],\"collect_count\":474018,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"Das Leben der Anderen\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4763.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4763.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4763.jpg\"},\"name_en\":\"Florian Henckel von Donnersmarck\",\"name\":\"弗洛里安·亨克尔·冯·多纳斯马尔克\",\"alt\":\"https://movie.douban.com/celebrity/1044973/\",\"id\":\"1044973\"}],\"pubdates\":[\"2006-03-23(德国)\"],\"year\":\"2006\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1808872109.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1808872109.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1808872109.jpg\"},\"alt\":\"https://movie.douban.com/subject/1900841/\",\"id\":\"1900841\"},{\"rating\":{\"max\":10,\"average\":9.2,\"details\":{\"1\":312,\"2\":783,\"3\":12702,\"4\":78583,\"5\":171975},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"素媛\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1403416347.83.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1403416347.83.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1403416347.83.jpg\"},\"name_en\":\"Kyung-gu Sol\",\"name\":\"薛耿求\",\"alt\":\"https://movie.douban.com/celebrity/1045576/\",\"id\":\"1045576\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p14020.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p14020.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p14020.jpg\"},\"name_en\":\"Ji-won Uhm\",\"name\":\"严志媛\",\"alt\":\"https://movie.douban.com/celebrity/1015178/\",\"id\":\"1015178\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1385020551.6.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1385020551.6.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1385020551.6.jpg\"},\"name_en\":\"Re Lee\",\"name\":\"李来\",\"alt\":\"https://movie.douban.com/celebrity/1336326/\",\"id\":\"1336326\"}],\"durations\":[\"123分钟\"],\"collect_count\":430846,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"소원\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1451911358.49.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1451911358.49.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1451911358.49.jpg\"},\"name_en\":\"Jun-ik Lee\",\"name\":\"李濬益\",\"alt\":\"https://movie.douban.com/celebrity/1028844/\",\"id\":\"1028844\"}],\"pubdates\":[\"2013-10-02(韩国)\"],\"year\":\"2013\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2118532944.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2118532944.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2118532944.jpg\"},\"alt\":\"https://movie.douban.com/subject/21937452/\",\"id\":\"21937452\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":539,\"2\":1989,\"3\":23518,\"4\":103951,\"5\":200016},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"死亡诗社\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p103.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p103.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p103.jpg\"},\"name_en\":\"Robin Williams\",\"name\":\"罗宾·威廉姆斯\",\"alt\":\"https://movie.douban.com/celebrity/1009241/\",\"id\":\"1009241\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p25694.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p25694.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p25694.jpg\"},\"name_en\":\"Robert Sean Leonard\",\"name\":\"罗伯特·肖恩·莱纳德\",\"alt\":\"https://movie.douban.com/celebrity/1031873/\",\"id\":\"1031873\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p25602.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p25602.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p25602.jpg\"},\"name_en\":\"Ethan Hawke\",\"name\":\"伊桑·霍克\",\"alt\":\"https://movie.douban.com/celebrity/1018984/\",\"id\":\"1018984\"}],\"durations\":[\"128 分钟\"],\"collect_count\":537044,\"mainland_pubdate\":\"\",\"has_video\":true,\"original_title\":\"Dead Poets Society\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4360.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4360.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p4360.jpg\"},\"name_en\":\"Peter Weir\",\"name\":\"彼得·威尔\",\"alt\":\"https://movie.douban.com/celebrity/1022721/\",\"id\":\"1022721\"}],\"pubdates\":[\"1989-06-02(多伦多首映)\",\"1989-06-09(美国)\"],\"year\":\"1989\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910824340.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910824340.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910824340.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291548/\",\"id\":\"1291548\"},{\"rating\":{\"max\":10,\"average\":9.1,\"details\":{\"1\":517,\"2\":1557,\"3\":18276,\"4\":87238,\"5\":177389},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"喜剧\",\"犯罪\"],\"title\":\"两杆大烟枪\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2028.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2028.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2028.jpg\"},\"name_en\":\"Jason Flemyng\",\"name\":\"杰森·弗莱明\",\"alt\":\"https://movie.douban.com/celebrity/1027179/\",\"id\":\"1027179\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8696.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8696.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8696.jpg\"},\"name_en\":\"Dexter Fletcher\",\"name\":\"德克斯特·弗莱彻\",\"alt\":\"https://movie.douban.com/celebrity/1007028/\",\"id\":\"1007028\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6761.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6761.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6761.jpg\"},\"name_en\":\"Nick Moran\",\"name\":\"尼克·莫兰\",\"alt\":\"https://movie.douban.com/celebrity/1014074/\",\"id\":\"1014074\"}],\"durations\":[\"107分钟\",\"115分钟(导演剪辑版)\"],\"collect_count\":479302,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"Lock, Stock and Two Smoking Barrels\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47189.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47189.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p47189.jpg\"},\"name_en\":\"Guy Ritchie\",\"name\":\"盖·里奇\",\"alt\":\"https://movie.douban.com/celebrity/1025148/\",\"id\":\"1025148\"}],\"pubdates\":[\"1998-08-28(英国)\"],\"year\":\"1998\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p792443418.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p792443418.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p792443418.jpg\"},\"alt\":\"https://movie.douban.com/subject/1293350/\",\"id\":\"1293350\"},{\"rating\":{\"max\":10,\"average\":9.1,\"details\":{\"1\":501,\"2\":1522,\"3\":19012,\"4\":90373,\"5\":178680},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"飞越疯人院\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26019.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26019.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p26019.jpg\"},\"name_en\":\"Jack Nicholson\",\"name\":\"杰克·尼科尔森\",\"alt\":\"https://movie.douban.com/celebrity/1054528/\",\"id\":\"1054528\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1538030195.75.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1538030195.75.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1538030195.75.jpg\"},\"name_en\":\"Danny DeVito\",\"name\":\"丹尼·德维托\",\"alt\":\"https://movie.douban.com/celebrity/1040516/\",\"id\":\"1040516\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42525.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42525.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42525.jpg\"},\"name_en\":\"Christopher Lloyd\",\"name\":\"克里斯托弗·洛伊德\",\"alt\":\"https://movie.douban.com/celebrity/1027163/\",\"id\":\"1027163\"}],\"durations\":[\"133分钟\"],\"collect_count\":506267,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"One Flew Over the Cuckoo's Nest\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p37577.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p37577.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p37577.jpg\"},\"name_en\":\"Miloš Forman\",\"name\":\"米洛斯·福尔曼\",\"alt\":\"https://movie.douban.com/celebrity/1053561/\",\"id\":\"1053561\"}],\"pubdates\":[\"1975-11-19(美国)\"],\"year\":\"1975\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p792238287.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p792238287.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p792238287.jpg\"},\"alt\":\"https://movie.douban.com/subject/1292224/\",\"id\":\"1292224\"},{\"rating\":{\"max\":10,\"average\":9,\"details\":{\"1\":503,\"2\":1578,\"3\":23948,\"4\":99598,\"5\":194158},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"动作\",\"奇幻\"],\"title\":\"指环王2：双塔奇兵\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.jpg\"},\"name_en\":\"Elijah Wood\",\"name\":\"伊利亚·伍德\",\"alt\":\"https://movie.douban.com/celebrity/1054395/\",\"id\":\"1054395\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p11727.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p11727.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p11727.jpg\"},\"name_en\":\"Sean Astin\",\"name\":\"西恩·奥斯汀\",\"alt\":\"https://movie.douban.com/celebrity/1031818/\",\"id\":\"1031818\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1453792417.87.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1453792417.87.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1453792417.87.jpg\"},\"name_en\":\"Ian McKellen\",\"name\":\"伊恩·麦克莱恩\",\"alt\":\"https://movie.douban.com/celebrity/1054410/\",\"id\":\"1054410\"}],\"durations\":[\"179分钟\",\"223分钟(加长版)\",\"235分钟(蓝光加长版)\"],\"collect_count\":555617,\"mainland_pubdate\":\"2003-04-25\",\"has_video\":true,\"original_title\":\"The Lord of the Rings: The Two Towers\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p40835.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p40835.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p40835.jpg\"},\"name_en\":\"Peter Jackson\",\"name\":\"彼得·杰克逊\",\"alt\":\"https://movie.douban.com/celebrity/1040524/\",\"id\":\"1040524\"}],\"pubdates\":[\"2002-12-05(纽约首映)\",\"2002-12-18(美国)\",\"2003-04-25(中国大陆)\"],\"year\":\"2002\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p909265336.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p909265336.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p909265336.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291572/\",\"id\":\"1291572\"}],\"title\":\"豆瓣电影Top250\"}");

/***/ }),

/***/ 21:
/*!**************************************************************!*\
  !*** D:/WebStudy/super_hero_preview/static/mock/weekly.json ***!
  \**************************************************************/
/*! exports provided: subjects, title, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"subjects\":[{\"subject\":{\"rating\":{\"max\":10,\"average\":9.3,\"details\":{\"1\":1020,\"2\":2037,\"3\":37177,\"4\":232199,\"5\":676211},\"stars\":\"50\",\"min\":0},\"genres\":[\"剧情\",\"动画\",\"奇幻\"],\"title\":\"千与千寻\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1463193210.13.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1463193210.13.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1463193210.13.jpg\"},\"name_en\":\"Rumi Hiiragi\",\"name\":\"柊瑠美\",\"alt\":\"https://movie.douban.com/celebrity/1023337/\",\"id\":\"1023337\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44986.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44986.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p44986.jpg\"},\"name_en\":\"Miyu Irino\",\"name\":\"入野自由\",\"alt\":\"https://movie.douban.com/celebrity/1005438/\",\"id\":\"1005438\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376151005.51.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376151005.51.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1376151005.51.jpg\"},\"name_en\":\"Mari Natsuki\",\"name\":\"夏木真理\",\"alt\":\"https://movie.douban.com/celebrity/1045797/\",\"id\":\"1045797\"}],\"durations\":[\"125分钟\"],\"collect_count\":1558263,\"mainland_pubdate\":\"2019-06-21\",\"has_video\":false,\"original_title\":\"千と千尋の神隠し\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p616.jpg\"},\"name_en\":\"Hayao Miyazaki\",\"name\":\"宫崎骏\",\"alt\":\"https://movie.douban.com/celebrity/1054439/\",\"id\":\"1054439\"}],\"pubdates\":[\"2001-07-20(日本)\",\"2019-06-21(中国大陆)\"],\"year\":\"2001\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg\"},\"alt\":\"https://movie.douban.com/subject/1291561/\",\"id\":\"1291561\"},\"rank\":1,\"delta\":2},{\"subject\":{\"rating\":{\"max\":10,\"average\":8.8,\"details\":{\"1\":27,\"2\":138,\"3\":2223,\"4\":9530,\"5\":11745},\"stars\":\"45\",\"min\":0},\"genres\":[\"喜剧\",\"动画\",\"奇幻\"],\"title\":\"玩具总动员4\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28603.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28603.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p28603.jpg\"},\"name_en\":\"Tom Hanks\",\"name\":\"汤姆·汉克斯\",\"alt\":\"https://movie.douban.com/celebrity/1054450/\",\"id\":\"1054450\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6409.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6409.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6409.jpg\"},\"name_en\":\"Tim Allen\",\"name\":\"蒂姆·艾伦\",\"alt\":\"https://movie.douban.com/celebrity/1017911/\",\"id\":\"1017911\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1397621158.92.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1397621158.92.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1397621158.92.jpg\"},\"name_en\":\"Annie Potts\",\"name\":\"安妮·波茨\",\"alt\":\"https://movie.douban.com/celebrity/1041111/\",\"id\":\"1041111\"}],\"durations\":[\"100分钟\"],\"collect_count\":109742,\"mainland_pubdate\":\"2019-06-21\",\"has_video\":false,\"original_title\":\"Toy Story 4\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1436104752.86.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1436104752.86.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1436104752.86.jpg\"},\"name_en\":\"Josh Cooley\",\"name\":\"乔什·库雷\",\"alt\":\"https://movie.douban.com/celebrity/1348615/\",\"id\":\"1348615\"}],\"pubdates\":[\"2019-06-21(美国)\",\"2019-06-21(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2557284230.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2557284230.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2557284230.jpg\"},\"alt\":\"https://movie.douban.com/subject/6850547/\",\"id\":\"6850547\"},\"rank\":2,\"delta\":-1},{\"subject\":{\"rating\":{\"max\":10,\"average\":8,\"details\":{\"1\":12,\"2\":48,\"3\":428,\"4\":892,\"5\":531},\"stars\":\"40\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"小委托人\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/pUilPzUlwdREcel_avatar_uploaded1450547560.2.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/pUilPzUlwdREcel_avatar_uploaded1450547560.2.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/pUilPzUlwdREcel_avatar_uploaded1450547560.2.jpg\"},\"name_en\":\"Dong-Hwi Lee\",\"name\":\"李东辉\",\"alt\":\"https://movie.douban.com/celebrity/1353574/\",\"id\":\"1353574\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1354444074.14.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1354444074.14.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1354444074.14.jpg\"},\"name_en\":\"Seon Yu\",\"name\":\"柳善\",\"alt\":\"https://movie.douban.com/celebrity/1006553/\",\"id\":\"1006553\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p_5X-73FQYd4cel_avatar_uploaded1527560639.35.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p_5X-73FQYd4cel_avatar_uploaded1527560639.35.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p_5X-73FQYd4cel_avatar_uploaded1527560639.35.jpg\"},\"name_en\":\"고수희\",\"name\":\"高素熙\",\"alt\":\"https://movie.douban.com/celebrity/1394427/\",\"id\":\"1394427\"}],\"durations\":[\"114分钟\"],\"collect_count\":2748,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"어린 의뢰인\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1523345261.35.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1523345261.35.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1523345261.35.jpg\"},\"name_en\":\"Kyu-sung Jang\",\"name\":\"张圭声\",\"alt\":\"https://movie.douban.com/celebrity/1332427/\",\"id\":\"1332427\"}],\"pubdates\":[\"2019-05-22(韩国)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557335459.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557335459.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557335459.jpg\"},\"alt\":\"https://movie.douban.com/subject/33404726/\",\"id\":\"33404726\"},\"rank\":3,\"delta\":8},{\"subject\":{\"rating\":{\"max\":10,\"average\":8,\"details\":{\"1\":174,\"2\":869,\"3\":9457,\"4\":20556,\"5\":11056},\"stars\":\"40\",\"min\":0},\"genres\":[\"动作\",\"科幻\",\"冒险\"],\"title\":\"蜘蛛侠：英雄远征\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467942867.09.jpg\"},\"name_en\":\"Tom Holland\",\"name\":\"汤姆·赫兰德\",\"alt\":\"https://movie.douban.com/celebrity/1325351/\",\"id\":\"1325351\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1543479263.47.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1543479263.47.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1543479263.47.jpg\"},\"name_en\":\"Zendaya\",\"name\":\"赞达亚\",\"alt\":\"https://movie.douban.com/celebrity/1325576/\",\"id\":\"1325576\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12737.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12737.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12737.jpg\"},\"name_en\":\"Jake Gyllenhaal\",\"name\":\"杰克·吉伦哈尔\",\"alt\":\"https://movie.douban.com/celebrity/1048002/\",\"id\":\"1048002\"}],\"durations\":[\"127分钟\"],\"collect_count\":279397,\"mainland_pubdate\":\"2019-06-28\",\"has_video\":false,\"original_title\":\"Spider-Man: Far From Home\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1435142487.62.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1435142487.62.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1435142487.62.jpg\"},\"name_en\":\"Jon Watts\",\"name\":\"乔·沃茨\",\"alt\":\"https://movie.douban.com/celebrity/1350194/\",\"id\":\"1350194\"}],\"pubdates\":[\"2019-06-28(中国大陆)\",\"2019-07-02(美国)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2558293106.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2558293106.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2558293106.jpg\"},\"alt\":\"https://movie.douban.com/subject/26931786/\",\"id\":\"26931786\"},\"rank\":4,\"delta\":-2},{\"subject\":{\"rating\":{\"max\":10,\"average\":7.6,\"details\":{\"1\":0,\"2\":7,\"3\":88,\"4\":150,\"5\":49},\"stars\":\"40\",\"min\":0},\"genres\":[\"剧情\",\"历史\"],\"title\":\"印第安·豪斯\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/pA6xRpJ9q3-Qcel_avatar_uploaded1540441349.29.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/pA6xRpJ9q3-Qcel_avatar_uploaded1540441349.29.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/pA6xRpJ9q3-Qcel_avatar_uploaded1540441349.29.jpg\"},\"name_en\":\"Sladen Peltier\",\"name\":\"斯莱登·佩提尔\",\"alt\":\"https://movie.douban.com/celebrity/1403265/\",\"id\":\"1403265\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1453358205.4.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1453358205.4.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1453358205.4.jpg\"},\"name_en\":\"Forrest Goodluck\",\"name\":\"福勒斯特·古德勒克\",\"alt\":\"https://movie.douban.com/celebrity/1354169/\",\"id\":\"1354169\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/pA6xRpJ9q3-Qcel_avatar_uploaded1540441743.99.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/pA6xRpJ9q3-Qcel_avatar_uploaded1540441743.99.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/pA6xRpJ9q3-Qcel_avatar_uploaded1540441743.99.jpg\"},\"name_en\":\"Ajuawak Kapashesit\",\"name\":\"阿居阿瓦克·卡帕绪西特\",\"alt\":\"https://movie.douban.com/celebrity/1403267/\",\"id\":\"1403267\"}],\"durations\":[\"100分钟\"],\"collect_count\":427,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"Indian Horse\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562392521.65.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562392521.65.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562392521.65.jpg\"},\"name_en\":\"Stephen S. Campanelli\",\"name\":\"斯蒂芬·S·坎帕内利\",\"alt\":\"https://movie.douban.com/celebrity/1419285/\",\"id\":\"1419285\"}],\"pubdates\":[\"2017-09-15(多伦多电影节)\",\"2018-04-13(加拿大)\"],\"year\":\"2017\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2517787515.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2517787515.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2517787515.jpg\"},\"alt\":\"https://movie.douban.com/subject/27173633/\",\"id\":\"27173633\"},\"rank\":5,\"delta\":6},{\"subject\":{\"rating\":{\"max\":10,\"average\":7.5,\"details\":{\"1\":8,\"2\":35,\"3\":337,\"4\":469,\"5\":166},\"stars\":\"40\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"陪审员\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6570.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6570.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6570.jpg\"},\"name_en\":\"So-ri Moon\",\"name\":\"文素丽\",\"alt\":\"https://movie.douban.com/celebrity/1010047/\",\"id\":\"1010047\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1479642755.23.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1479642755.23.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1479642755.23.jpg\"},\"name_en\":\"Hyung-Shik Park\",\"name\":\"朴炯植\",\"alt\":\"https://movie.douban.com/celebrity/1328834/\",\"id\":\"1328834\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1484199905.18.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1484199905.18.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1484199905.18.jpg\"},\"name_en\":\"Soo-Jang Baek\",\"name\":\"白秀章\",\"alt\":\"https://movie.douban.com/celebrity/1366939/\",\"id\":\"1366939\"}],\"durations\":[\"114分钟\"],\"collect_count\":1378,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"배심원들\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562393318.89.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562393318.89.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562393318.89.jpg\"},\"name_en\":\"Seung-wan Hong\",\"name\":\"洪承完\",\"alt\":\"https://movie.douban.com/celebrity/1419290/\",\"id\":\"1419290\"}],\"pubdates\":[\"2019-05-15(韩国)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2554542206.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2554542206.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2554542206.jpg\"},\"alt\":\"https://movie.douban.com/subject/27115758/\",\"id\":\"27115758\"},\"rank\":6,\"delta\":5},{\"subject\":{\"rating\":{\"max\":10,\"average\":7.2,\"details\":{\"1\":27,\"2\":263,\"3\":1706,\"4\":1569,\"5\":561},\"stars\":\"35\",\"min\":0},\"genres\":[\"喜剧\",\"动画\",\"冒险\"],\"title\":\"爱宠大机密2\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9414.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9414.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p9414.jpg\"},\"name_en\":\"Patton Oswalt\",\"name\":\"帕顿·奥斯瓦尔特\",\"alt\":\"https://movie.douban.com/celebrity/1007015/\",\"id\":\"1007015\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p56350.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p56350.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p56350.jpg\"},\"name_en\":\"Kevin Hart\",\"name\":\"凯文·哈特\",\"alt\":\"https://movie.douban.com/celebrity/1286162/\",\"id\":\"1286162\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1452760482.06.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1452760482.06.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1452760482.06.jpg\"},\"name_en\":\"Harrison Ford\",\"name\":\"哈里森·福特\",\"alt\":\"https://movie.douban.com/celebrity/1009238/\",\"id\":\"1009238\"}],\"durations\":[\"86分钟\"],\"collect_count\":20903,\"mainland_pubdate\":\"2019-07-05\",\"has_video\":false,\"original_title\":\"The Secret Life of Pets 2\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29587.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29587.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p29587.jpg\"},\"name_en\":\"Chris Renaud\",\"name\":\"克里斯·雷纳德\",\"alt\":\"https://movie.douban.com/celebrity/1295449/\",\"id\":\"1295449\"}],\"pubdates\":[\"2019-06-07(美国)\",\"2019-07-05(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2555923582.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2555923582.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2555923582.jpg\"},\"alt\":\"https://movie.douban.com/subject/26848167/\",\"id\":\"26848167\"},\"rank\":7,\"delta\":4},{\"subject\":{\"rating\":{\"max\":10,\"average\":7.2,\"details\":{\"1\":10,\"2\":61,\"3\":450,\"4\":452,\"5\":136},\"stars\":\"35\",\"min\":0},\"genres\":[\"战争\",\"灾难\"],\"title\":\"狼之歌\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1556635630.02.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1556635630.02.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1556635630.02.jpg\"},\"name_en\":\"François Civil\",\"name\":\"弗朗索瓦·西维尔\",\"alt\":\"https://movie.douban.com/celebrity/1006321/\",\"id\":\"1006321\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41401.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41401.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41401.jpg\"},\"name_en\":\"Omar Sy\",\"name\":\"奥玛·希\",\"alt\":\"https://movie.douban.com/celebrity/1220507/\",\"id\":\"1220507\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34948.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34948.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34948.jpg\"},\"name_en\":\"Mathieu Kassovitz\",\"name\":\"马修·卡索维茨\",\"alt\":\"https://movie.douban.com/celebrity/1022733/\",\"id\":\"1022733\"}],\"durations\":[\"116分钟\"],\"collect_count\":1559,\"mainland_pubdate\":\"\",\"has_video\":false,\"original_title\":\"Le chant du loup\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png\",\"large\":\"https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png\",\"medium\":\"https://img1.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png\"},\"name_en\":\"Abel Lanzac\",\"name\":\"阿贝尔·安扎克\",\"alt\":\"https://movie.douban.com/celebrity/1338365/\",\"id\":\"1338365\"}],\"pubdates\":[\"2019-02-20(法国)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2542972538.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2542972538.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2542972538.jpg\"},\"alt\":\"https://movie.douban.com/subject/27150283/\",\"id\":\"27150283\"},\"rank\":8,\"delta\":3},{\"subject\":{\"rating\":{\"max\":10,\"average\":7.5,\"details\":{\"1\":2,\"2\":6,\"3\":48,\"4\":64,\"5\":29},\"stars\":\"40\",\"min\":0},\"genres\":[\"传记\",\"纪录片\"],\"title\":\"上海的女儿\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p7240.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p7240.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p7240.jpg\"},\"name_en\":\"Tsai Chin\",\"name\":\"周采芹\",\"alt\":\"https://movie.douban.com/celebrity/1036870/\",\"id\":\"1036870\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p37261.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p37261.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p37261.jpg\"},\"name_en\":\"Sean Connery\",\"name\":\"肖恩·康纳利\",\"alt\":\"https://movie.douban.com/celebrity/1018982/\",\"id\":\"1018982\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10245.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10245.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p10245.jpg\"},\"name_en\":\"Sandra Oh\",\"name\":\"吴珊卓\",\"alt\":\"https://movie.douban.com/celebrity/1010565/\",\"id\":\"1010565\"}],\"durations\":[\"90分钟\"],\"collect_count\":538,\"mainland_pubdate\":\"2019-07-02\",\"has_video\":false,\"original_title\":\"上海的女儿\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1559043716.69.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1559043716.69.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1559043716.69.jpg\"},\"name_en\":\"Michelle Chen\",\"name\":\"陈苗\",\"alt\":\"https://movie.douban.com/celebrity/1308349/\",\"id\":\"1308349\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562383475.24.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562383475.24.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562383475.24.jpg\"},\"name_en\":\"Hilla Medalia\",\"name\":\"希拉·梅达利亚\",\"alt\":\"https://movie.douban.com/celebrity/1309059/\",\"id\":\"1309059\"}],\"pubdates\":[\"2019-07-02(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561937291.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561937291.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561937291.jpg\"},\"alt\":\"https://movie.douban.com/subject/33381322/\",\"id\":\"33381322\"},\"rank\":9,\"delta\":2},{\"subject\":{\"rating\":{\"max\":10,\"average\":7.2,\"details\":{\"1\":3,\"2\":7,\"3\":39,\"4\":44,\"5\":16},\"stars\":\"35\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"学区房72小时\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1504773599.22.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1504773599.22.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1504773599.22.jpg\"},\"name_en\":\"Xuan Guan\",\"name\":\"管轩\",\"alt\":\"https://movie.douban.com/celebrity/1380712/\",\"id\":\"1380712\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6311.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6311.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p6311.jpg\"},\"name_en\":\"Xing Xu\",\"name\":\"徐幸\",\"alt\":\"https://movie.douban.com/celebrity/1274773/\",\"id\":\"1274773\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5975.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5975.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5975.jpg\"},\"name_en\":\"Miao Fu\",\"name\":\"傅淼\",\"alt\":\"https://movie.douban.com/celebrity/1274661/\",\"id\":\"1274661\"}],\"durations\":[\"99分钟\"],\"collect_count\":568,\"mainland_pubdate\":\"2019-06-28\",\"has_video\":false,\"original_title\":\"学区房72小时\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1528872099.62.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1528872099.62.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1528872099.62.jpg\"},\"name_en\":\"Xiaoming Chen\",\"name\":\"陈晓鸣\",\"alt\":\"https://movie.douban.com/celebrity/1395363/\",\"id\":\"1395363\"}],\"pubdates\":[\"2019-06-16(上海电影节)\",\"2019-06-28(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2560837532.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2560837532.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2560837532.jpg\"},\"alt\":\"https://movie.douban.com/subject/30246061/\",\"id\":\"30246061\"},\"rank\":10,\"delta\":1}],\"title\":\"豆瓣电影本周口碑榜\"}");

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!*******************************************************************!*\
  !*** D:/WebStudy/super_hero_preview/static/mock/coming_soon.json ***!
  \*******************************************************************/
/*! exports provided: count, start, total, subjects, title, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"count\":20,\"start\":0,\"total\":89,\"subjects\":[{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"剧情\",\"动画\",\"冒险\"],\"title\":\"狮子王\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1466186775.21.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1466186775.21.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1466186775.21.jpg\"},\"name_en\":\"Donald Glover\",\"name\":\"唐纳德·格洛弗\",\"alt\":\"https://movie.douban.com/celebrity/1314061/\",\"id\":\"1314061\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1422444822.86.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1422444822.86.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1422444822.86.jpg\"},\"name_en\":\"Alfre Woodard\",\"name\":\"阿尔法·伍达德\",\"alt\":\"https://movie.douban.com/celebrity/1041159/\",\"id\":\"1041159\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1490091638.27.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1490091638.27.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1490091638.27.jpg\"},\"name_en\":\"James Earl Jones\",\"name\":\"詹姆斯·厄尔·琼斯\",\"alt\":\"https://movie.douban.com/celebrity/1013800/\",\"id\":\"1013800\"}],\"durations\":[\"118分钟\"],\"collect_count\":868,\"mainland_pubdate\":\"2019-07-12\",\"has_video\":false,\"original_title\":\"The Lion King\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1405546733.56.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1405546733.56.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1405546733.56.jpg\"},\"name_en\":\"Jon Favreau\",\"name\":\"乔恩·费儒\",\"alt\":\"https://movie.douban.com/celebrity/1027164/\",\"id\":\"1027164\"}],\"pubdates\":[\"2019-07-12(中国大陆)\",\"2019-07-19(美国)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2559742751.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2559742751.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2559742751.jpg\"},\"alt\":\"https://movie.douban.com/subject/26884354/\",\"id\":\"26884354\"},{\"rating\":{\"max\":10,\"average\":8.2,\"details\":{\"1\":7,\"2\":13,\"3\":94,\"4\":167,\"5\":195},\"stars\":\"45\",\"min\":0},\"genres\":[\"剧情\",\"动画\",\"奇幻\"],\"title\":\"命运之夜——天之杯II ：迷失之蝶\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1360495608.41.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1360495608.41.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1360495608.41.jpg\"},\"name_en\":\"Noriaki Sugiyama\",\"name\":\"杉山纪彰\",\"alt\":\"https://movie.douban.com/celebrity/1035537/\",\"id\":\"1035537\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1401447458.69.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1401447458.69.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1401447458.69.jpg\"},\"name_en\":\"Noriko Shitaya\",\"name\":\"下屋则子\",\"alt\":\"https://movie.douban.com/celebrity/1046546/\",\"id\":\"1046546\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p23870.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p23870.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p23870.jpg\"},\"name_en\":\"Hiroshi Kamiya\",\"name\":\"神谷浩史\",\"alt\":\"https://movie.douban.com/celebrity/1274377/\",\"id\":\"1274377\"}],\"durations\":[\"117分钟\",\"113分钟(中国大陆)\"],\"collect_count\":3315,\"mainland_pubdate\":\"2019-07-12\",\"has_video\":false,\"original_title\":\"劇場版Fate/stay night Heaven's Feel II.lost butterfly\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p-X6KppmI0EIcel_avatar_uploaded1525790121.19.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p-X6KppmI0EIcel_avatar_uploaded1525790121.19.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p-X6KppmI0EIcel_avatar_uploaded1525790121.19.jpg\"},\"name_en\":\"Tomonori Sudô\",\"name\":\"须藤友德\",\"alt\":\"https://movie.douban.com/celebrity/1392464/\",\"id\":\"1392464\"}],\"pubdates\":[\"2019-01-12(日本)\",\"2019-07-12(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561910374.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561910374.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561910374.jpg\"},\"alt\":\"https://movie.douban.com/subject/26759819/\",\"id\":\"26759819\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"喜剧\",\"动作\",\"冒险\"],\"title\":\"素人特工\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1546579487.08.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1546579487.08.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1546579487.08.jpg\"},\"name_en\":\"Talu Wang\",\"name\":\"王大陆\",\"alt\":\"https://movie.douban.com/celebrity/1341187/\",\"id\":\"1341187\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12665.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12665.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p12665.jpg\"},\"name_en\":\"Sandrine Pinna\",\"name\":\"张榕容\",\"alt\":\"https://movie.douban.com/celebrity/1226703/\",\"id\":\"1226703\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2431.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2431.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2431.jpg\"},\"name_en\":\"Milla Jovovich\",\"name\":\"米拉·乔沃维奇\",\"alt\":\"https://movie.douban.com/celebrity/1025154/\",\"id\":\"1025154\"}],\"durations\":[\"113分钟\"],\"collect_count\":142,\"mainland_pubdate\":\"2019-07-12\",\"has_video\":false,\"original_title\":\"素人特工\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1453166767.25.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1453166767.25.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1453166767.25.jpg\"},\"name_en\":\"Alan Yuen\",\"name\":\"袁锦麟\",\"alt\":\"https://movie.douban.com/celebrity/1312751/\",\"id\":\"1312751\"}],\"pubdates\":[\"2019-07-12(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2560447448.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2560447448.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2560447448.jpg\"},\"alt\":\"https://movie.douban.com/subject/27155276/\",\"id\":\"27155276\"},{\"rating\":{\"max\":10,\"average\":5.9,\"details\":{\"1\":16,\"2\":44,\"3\":108,\"4\":45,\"5\":11},\"stars\":\"30\",\"min\":0},\"genres\":[\"战争\",\"科幻\",\"动画\"],\"title\":\"机动战士高达NT\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1502244105.4.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1502244105.4.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1502244105.4.jpg\"},\"name_en\":\"Junya Enoki\",\"name\":\"榎木淳弥\",\"alt\":\"https://movie.douban.com/celebrity/1378653/\",\"id\":\"1378653\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/pNZkDWpTYTsocel_avatar_uploaded1547469900.23.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/pNZkDWpTYTsocel_avatar_uploaded1547469900.23.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/pNZkDWpTYTsocel_avatar_uploaded1547469900.23.jpg\"},\"name_en\":\"Muranaka Tomo\",\"name\":\"村中知\",\"alt\":\"https://movie.douban.com/celebrity/1409158/\",\"id\":\"1409158\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1512268646.95.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1512268646.95.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1512268646.95.jpg\"},\"name_en\":\"Ayu Matsuura\",\"name\":\"松浦爱弓\",\"alt\":\"https://movie.douban.com/celebrity/1319428/\",\"id\":\"1319428\"}],\"durations\":[\"90分钟\"],\"collect_count\":1067,\"mainland_pubdate\":\"2019-07-12\",\"has_video\":false,\"original_title\":\"機動戦士ガンダム NT（ナラティブ）\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png\",\"large\":\"https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png\",\"medium\":\"https://img1.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png\"},\"name_en\":\"Shun'ichi Yoshizawa\",\"name\":\"吉泽俊一\",\"alt\":\"https://movie.douban.com/celebrity/1419223/\",\"id\":\"1419223\"}],\"pubdates\":[\"2018-11-30(日本)\",\"2019-07-12(中国大陆)\"],\"year\":\"2018\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2558661806.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2558661806.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2558661806.jpg\"},\"alt\":\"https://movie.douban.com/subject/30201138/\",\"id\":\"30201138\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"剧情\",\"家庭\"],\"title\":\"舞动吧！少年\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/poROlorauh_scel_avatar_uploaded1517451746.06.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/poROlorauh_scel_avatar_uploaded1517451746.06.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/poROlorauh_scel_avatar_uploaded1517451746.06.jpg\"},\"name_en\":\"Jun Lei\",\"name\":\"雷俊\",\"alt\":\"https://movie.douban.com/celebrity/1388052/\",\"id\":\"1388052\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png\",\"large\":\"https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png\",\"medium\":\"https://img1.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png\"},\"name_en\":\"Sicheng Zhang\",\"name\":\"张嗣诚  \",\"alt\":\"https://movie.douban.com/celebrity/1418858/\",\"id\":\"1418858\"}],\"durations\":[\"94分钟\"],\"collect_count\":2,\"mainland_pubdate\":\"2019-07-12\",\"has_video\":false,\"original_title\":\"舞动吧！少年\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/peGF4emMAelAcel_avatar_uploaded1551493977.08.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/peGF4emMAelAcel_avatar_uploaded1551493977.08.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/peGF4emMAelAcel_avatar_uploaded1551493977.08.jpg\"},\"name_en\":\"Wei Dou\",\"name\":\"窦微\",\"alt\":\"https://movie.douban.com/celebrity/1412048/\",\"id\":\"1412048\"}],\"pubdates\":[\"2019-07-12(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2555119986.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2555119986.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2555119986.jpg\"},\"alt\":\"https://movie.douban.com/subject/30276413/\",\"id\":\"30276413\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"嘿，蠢贼\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399707920.17.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399707920.17.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1399707920.17.jpg\"},\"name_en\":\"Baoyue Cui\",\"name\":\"崔宝月\",\"alt\":\"https://movie.douban.com/celebrity/1334949/\",\"id\":\"1334949\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/pL9vAARVRtLscel_avatar_uploaded1514355604.19.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/pL9vAARVRtLscel_avatar_uploaded1514355604.19.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/pL9vAARVRtLscel_avatar_uploaded1514355604.19.jpg\"},\"name_en\":\"Nuo Xu\",\"name\":\"许诺\",\"alt\":\"https://movie.douban.com/celebrity/1386365/\",\"id\":\"1386365\"},{\"avatars\":null,\"name_en\":\"\",\"name\":\"苏小淳\",\"alt\":null,\"id\":null}],\"durations\":[\"90分钟\"],\"collect_count\":8,\"mainland_pubdate\":\"2019-07-16\",\"has_video\":false,\"original_title\":\"嘿，蠢贼\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467125575.08.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467125575.08.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467125575.08.jpg\"},\"name_en\":\"Kaiyang Wang\",\"name\":\"王凯阳\",\"alt\":\"https://movie.douban.com/celebrity/1350019/\",\"id\":\"1350019\"}],\"pubdates\":[\"2019-07-16(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2560832388.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2560832388.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2560832388.jpg\"},\"alt\":\"https://movie.douban.com/subject/34445992/\",\"id\":\"34445992\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"银河补习班\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p805.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p805.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p805.jpg\"},\"name_en\":\"Chao Deng\",\"name\":\"邓超\",\"alt\":\"https://movie.douban.com/celebrity/1274235/\",\"id\":\"1274235\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1530362237.95.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1530362237.95.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1530362237.95.jpg\"},\"name_en\":\"Yu Bai\",\"name\":\"白宇\",\"alt\":\"https://movie.douban.com/celebrity/1337887/\",\"id\":\"1337887\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1478066140.77.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1478066140.77.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1478066140.77.jpg\"},\"name_en\":\"Suxi Ren\",\"name\":\"任素汐\",\"alt\":\"https://movie.douban.com/celebrity/1362973/\",\"id\":\"1362973\"}],\"durations\":[\"147分钟\"],\"collect_count\":584,\"mainland_pubdate\":\"2019-07-18\",\"has_video\":false,\"original_title\":\"银河补习班\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p805.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p805.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p805.jpg\"},\"name_en\":\"Chao Deng\",\"name\":\"邓超\",\"alt\":\"https://movie.douban.com/celebrity/1274235/\",\"id\":\"1274235\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p36973.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p36973.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p36973.jpg\"},\"name_en\":\"Baimei Yu\",\"name\":\"俞白眉\",\"alt\":\"https://movie.douban.com/celebrity/1316617/\",\"id\":\"1316617\"}],\"pubdates\":[\"2019-07-18(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2561542089.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2561542089.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2561542089.jpg\"},\"alt\":\"https://movie.douban.com/subject/30282387/\",\"id\":\"30282387\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"剧情\",\"喜剧\",\"犯罪\"],\"title\":\"灰猴\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1371633861.75.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1371633861.75.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1371633861.75.jpg\"},\"name_en\":\"Dazhi Wang\",\"name\":\"王大治\",\"alt\":\"https://movie.douban.com/celebrity/1314858/\",\"id\":\"1314858\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53419.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53419.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p53419.jpg\"},\"name_en\":\"Feng Gao\",\"name\":\"高峰\",\"alt\":\"https://movie.douban.com/celebrity/1275669/\",\"id\":\"1275669\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1374382499.95.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1374382499.95.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1374382499.95.jpg\"},\"name_en\":\"Jingyun Wang\",\"name\":\"王靖云\",\"alt\":\"https://movie.douban.com/celebrity/1328159/\",\"id\":\"1328159\"}],\"durations\":[\"98分钟\"],\"collect_count\":165,\"mainland_pubdate\":\"2019-07-18\",\"has_video\":false,\"original_title\":\"灰猴\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1534008742.7.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1534008742.7.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1534008742.7.jpg\"},\"name_en\":\"Pu Zhang\",\"name\":\"张璞\",\"alt\":\"https://movie.douban.com/celebrity/1398757/\",\"id\":\"1398757\"}],\"pubdates\":[\"2018-09-01(蒙特利尔国际电影节)\",\"2019-07-18(中国大陆)\"],\"year\":\"2018\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2561541477.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2561541477.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2561541477.jpg\"},\"alt\":\"https://movie.douban.com/subject/27199913/\",\"id\":\"27199913\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"匠心\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p38286.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p38286.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p38286.jpg\"},\"name_en\":\"Shaohua Ma\",\"name\":\"马少骅\",\"alt\":\"https://movie.douban.com/celebrity/1274966/\",\"id\":\"1274966\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33243.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33243.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33243.jpg\"},\"name_en\":\"Di Zhang\",\"name\":\"张迪\",\"alt\":\"https://movie.douban.com/celebrity/1315701/\",\"id\":\"1315701\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562154860.46.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562154860.46.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562154860.46.jpg\"},\"name_en\":\"Eleven Yao\",\"name\":\"姚以缇\",\"alt\":\"https://movie.douban.com/celebrity/1355368/\",\"id\":\"1355368\"}],\"durations\":[\"93分钟\"],\"collect_count\":6,\"mainland_pubdate\":\"2019-07-18\",\"has_video\":false,\"original_title\":\"匠心\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467125575.08.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467125575.08.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1467125575.08.jpg\"},\"name_en\":\"Kaiyang Wang\",\"name\":\"王凯阳\",\"alt\":\"https://movie.douban.com/celebrity/1350019/\",\"id\":\"1350019\"}],\"pubdates\":[\"2019-07-18(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2553935771.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2553935771.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2553935771.jpg\"},\"alt\":\"https://movie.douban.com/subject/30136664/\",\"id\":\"30136664\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"剧情\",\"动作\",\"武侠\"],\"title\":\"刀背藏身\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485778268.65.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485778268.65.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1485778268.65.jpg\"},\"name_en\":\"Qing Xu\",\"name\":\"许晴\",\"alt\":\"https://movie.douban.com/celebrity/1005268/\",\"id\":\"1005268\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1560423707.2.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1560423707.2.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1560423707.2.jpg\"},\"name_en\":\"Aoyue Zhang\",\"name\":\"张傲月\",\"alt\":\"https://movie.douban.com/celebrity/1353125/\",\"id\":\"1353125\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1526309480.04.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1526309480.04.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1526309480.04.jpg\"},\"name_en\":\"Jessie Li\",\"name\":\"春夏\",\"alt\":\"https://movie.douban.com/celebrity/1339442/\",\"id\":\"1339442\"}],\"durations\":[\"123分钟\",\"137分钟(蒙特利尔电影节)\"],\"collect_count\":708,\"mainland_pubdate\":\"2019-07-19\",\"has_video\":false,\"original_title\":\"刀背藏身\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41597.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41597.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p41597.jpg\"},\"name_en\":\"Haofeng Xu\",\"name\":\"徐浩峰\",\"alt\":\"https://movie.douban.com/celebrity/1316577/\",\"id\":\"1316577\"}],\"pubdates\":[\"2017-08-27(蒙特利尔电影节)\",\"2019-07-19(中国大陆)\"],\"year\":\"2017\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557644589.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557644589.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557644589.jpg\"},\"alt\":\"https://movie.douban.com/subject/26757090/\",\"id\":\"26757090\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"喜剧\",\"奇幻\"],\"title\":\"猪八戒·传说\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png\",\"large\":\"https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png\",\"medium\":\"https://img1.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png\"},\"name_en\":\"\",\"name\":\"郑冀峰\",\"alt\":\"https://movie.douban.com/celebrity/1414809/\",\"id\":\"1414809\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1161.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1161.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1161.jpg\"},\"name_en\":\"Eric Tsang\",\"name\":\"曾志伟\",\"alt\":\"https://movie.douban.com/celebrity/1002862/\",\"id\":\"1002862\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1545123115.59.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1545123115.59.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1545123115.59.jpg\"},\"name_en\":\"Ruoxi Yin\",\"name\":\"殷若曦\",\"alt\":\"https://movie.douban.com/celebrity/1406995/\",\"id\":\"1406995\"}],\"durations\":[],\"collect_count\":394,\"mainland_pubdate\":\"2019-07-19\",\"has_video\":false,\"original_title\":\"猪八戒·传说\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png\",\"large\":\"https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png\",\"medium\":\"https://img1.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png\"},\"name_en\":\"\",\"name\":\"郑冀峰\",\"alt\":\"https://movie.douban.com/celebrity/1414809/\",\"id\":\"1414809\"}],\"pubdates\":[\"2019-07-19(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561910053.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561910053.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561910053.jpg\"},\"alt\":\"https://movie.douban.com/subject/30355305/\",\"id\":\"30355305\"},{\"rating\":{\"max\":10,\"average\":6.1,\"details\":{\"1\":29,\"2\":89,\"3\":210,\"4\":65,\"5\":50},\"stars\":\"30\",\"min\":0},\"genres\":[\"科幻\",\"动画\",\"冒险\"],\"title\":\"未来机器城\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1534766432.19.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1534766432.19.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1534766432.19.jpg\"},\"name_en\":\"Yingdi Han\",\"name\":\"韩莹棣\",\"alt\":\"https://movie.douban.com/celebrity/1399479/\",\"id\":\"1399479\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1534766550.03.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1534766550.03.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1534766550.03.jpg\"},\"name_en\":\"Haiyin Zheng\",\"name\":\"郑海音\",\"alt\":\"https://movie.douban.com/celebrity/1399480/\",\"id\":\"1399480\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1381744526.75.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1381744526.75.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1381744526.75.jpg\"},\"name_en\":\"Yuanzheng Feng\",\"name\":\"冯远征\",\"alt\":\"https://movie.douban.com/celebrity/1043136/\",\"id\":\"1043136\"}],\"durations\":[\"107分钟\",\"106分钟(美国)\"],\"collect_count\":4655,\"mainland_pubdate\":\"2019-07-19\",\"has_video\":false,\"original_title\":\"未来机器城\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1531724401.77.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1531724401.77.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1531724401.77.jpg\"},\"name_en\":\"Kevin R. Adams\",\"name\":\"安恪温\",\"alt\":\"https://movie.douban.com/celebrity/1392324/\",\"id\":\"1392324\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1531724416.93.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1531724416.93.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1531724416.93.jpg\"},\"name_en\":\"Joe Ksander\",\"name\":\"龙子乔\",\"alt\":\"https://movie.douban.com/celebrity/1308172/\",\"id\":\"1308172\"}],\"pubdates\":[\"2018-09-07(美国)\",\"2019-07-19(中国大陆)\"],\"year\":\"2018\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561782665.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561782665.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561782665.jpg\"},\"alt\":\"https://movie.douban.com/subject/27200988/\",\"id\":\"27200988\"},{\"rating\":{\"max\":10,\"average\":8.3,\"details\":{\"1\":17,\"2\":41,\"3\":240,\"4\":461,\"5\":546},\"stars\":\"45\",\"min\":0},\"genres\":[\"爱情\",\"动画\",\"奇幻\"],\"title\":\"游戏人生 零\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1497789604.25.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1497789604.25.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1497789604.25.jpg\"},\"name_en\":\"Yoshitsugu Matsuoka\",\"name\":\"松冈祯丞\",\"alt\":\"https://movie.douban.com/celebrity/1314691/\",\"id\":\"1314691\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1366715194.78.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1366715194.78.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1366715194.78.jpg\"},\"name_en\":\"Ai Kayano\",\"name\":\"茅野爱衣\",\"alt\":\"https://movie.douban.com/celebrity/1314532/\",\"id\":\"1314532\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p23363.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p23363.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p23363.jpg\"},\"name_en\":\"Yoko Hikasa\",\"name\":\"日笠阳子\",\"alt\":\"https://movie.douban.com/celebrity/1275199/\",\"id\":\"1275199\"}],\"durations\":[\"107分钟\"],\"collect_count\":11173,\"mainland_pubdate\":\"2019-07-19\",\"has_video\":false,\"original_title\":\"ノーゲーム・ノーライフ ゼロ\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p21643.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p21643.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p21643.jpg\"},\"name_en\":\"Atsuko Ishizuka\",\"name\":\"石塚敦子\",\"alt\":\"https://movie.douban.com/celebrity/1314066/\",\"id\":\"1314066\"}],\"pubdates\":[\"2017-07-15(日本)\",\"2019-07-19(中国大陆)\"],\"year\":\"2017\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561782374.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561782374.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561782374.jpg\"},\"alt\":\"https://movie.douban.com/subject/26837952/\",\"id\":\"26837952\"},{\"rating\":{\"max\":10,\"average\":7.2,\"details\":{\"1\":0,\"2\":15,\"3\":138,\"4\":166,\"5\":28},\"stars\":\"35\",\"min\":0},\"genres\":[\"剧情\",\"儿童\"],\"title\":\"旺扎的雨靴\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1538545061.03.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1538545061.03.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1538545061.03.jpg\"},\"name_en\":\"Druklha Dorje\",\"name\":\"周拉多杰\",\"alt\":\"https://movie.douban.com/celebrity/1396554/\",\"id\":\"1396554\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1539580440.17.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1539580440.17.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1539580440.17.jpg\"},\"name_en\":\"Jinpa\",\"name\":\"金巴\",\"alt\":\"https://movie.douban.com/celebrity/1362878/\",\"id\":\"1362878\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1539579380.69.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1539579380.69.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1539579380.69.jpg\"},\"name_en\":\"Tsemdo\",\"name\":\"才多\",\"alt\":\"https://movie.douban.com/celebrity/1402634/\",\"id\":\"1402634\"}],\"durations\":[\"90分钟\"],\"collect_count\":1688,\"mainland_pubdate\":\"2019-07-19\",\"has_video\":false,\"original_title\":\"旺扎的雨靴\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1525058811.52.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1525058811.52.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1525058811.52.jpg\"},\"name_en\":\"Lhapal Gyal\",\"name\":\"拉华加\",\"alt\":\"https://movie.douban.com/celebrity/1391840/\",\"id\":\"1391840\"}],\"pubdates\":[\"2018-02-21(柏林电影节)\",\"2019-07-19(中国大陆)\"],\"year\":\"2018\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561371801.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561371801.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561371801.jpg\"},\"alt\":\"https://movie.douban.com/subject/28510273/\",\"id\":\"28510273\"},{\"rating\":{\"max\":10,\"average\":6.4,\"details\":{\"1\":10,\"2\":64,\"3\":300,\"4\":146,\"5\":24},\"stars\":\"35\",\"min\":0},\"genres\":[\"剧情\",\"喜剧\",\"传记\"],\"title\":\"为家而战\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1500079626.83.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1500079626.83.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1500079626.83.jpg\"},\"name_en\":\"Dwayne Johnson\",\"name\":\"道恩·强森\",\"alt\":\"https://movie.douban.com/celebrity/1044707/\",\"id\":\"1044707\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1517034183.97.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1517034183.97.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1517034183.97.jpg\"},\"name_en\":\"Florence Pugh\",\"name\":\"弗洛伦斯·皮尤\",\"alt\":\"https://movie.douban.com/celebrity/1378921/\",\"id\":\"1378921\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1504372509.79.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1504372509.79.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1504372509.79.jpg\"},\"name_en\":\"Jack Lowden\",\"name\":\"杰克·劳登\",\"alt\":\"https://movie.douban.com/celebrity/1344553/\",\"id\":\"1344553\"}],\"durations\":[\"108分钟\"],\"collect_count\":2380,\"mainland_pubdate\":\"2019-07-19\",\"has_video\":false,\"original_title\":\"Fighting with My Family\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p7699.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p7699.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p7699.jpg\"},\"name_en\":\"Stephen Merchant\",\"name\":\"斯戴芬·莫昌特\",\"alt\":\"https://movie.douban.com/celebrity/1036473/\",\"id\":\"1036473\"}],\"pubdates\":[\"2019-01-28(圣丹斯电影节)\",\"2019-02-22(美国)\",\"2019-07-19(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2559337905.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2559337905.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2559337905.jpg\"},\"alt\":\"https://movie.douban.com/subject/26971054/\",\"id\":\"26971054\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"惊悚\",\"恐怖\"],\"title\":\"怨灵3：看不见的小孩\",\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562223888.57.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562223888.57.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562223888.57.jpg\"},\"name_en\":\"Petei Hokari\",\"name\":\"裴蒂·赫格莉\",\"alt\":\"https://movie.douban.com/celebrity/1400572/\",\"id\":\"1400572\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562151717.65.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562151717.65.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562151717.65.jpg\"},\"name_en\":\"Jinyun Chen\",\"name\":\"陈锦昀\",\"alt\":\"https://movie.douban.com/celebrity/1374406/\",\"id\":\"1374406\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561434947.6.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561434947.6.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561434947.6.jpg\"},\"name_en\":\"\",\"name\":\"王景晨\",\"alt\":\"https://movie.douban.com/celebrity/1416944/\",\"id\":\"1416944\"}],\"durations\":[\"90分钟\"],\"collect_count\":20,\"mainland_pubdate\":\"2019-07-19\",\"has_video\":false,\"original_title\":\"怨灵3：看不见的小孩\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562151601.28.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562151601.28.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1562151601.28.jpg\"},\"name_en\":\"Isara Nadee\",\"name\":\"伊萨拉·纳迪\",\"alt\":\"https://movie.douban.com/celebrity/1327530/\",\"id\":\"1327530\"}],\"pubdates\":[\"2019-07-19(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561451573.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561451573.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561451573.jpg\"},\"alt\":\"https://movie.douban.com/subject/30290872/\",\"id\":\"30290872\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"剧情\",\"动画\",\"冒险\"],\"title\":\"天池水怪\",\"casts\":[{\"avatars\":null,\"name_en\":\"\",\"name\":\"丁传惠\",\"alt\":null,\"id\":null},{\"avatars\":null,\"name_en\":\"\",\"name\":\"华兰香\",\"alt\":null,\"id\":null},{\"avatars\":null,\"name_en\":\"\",\"name\":\"黄设来\",\"alt\":null,\"id\":null}],\"durations\":[\"84分钟\"],\"collect_count\":8,\"mainland_pubdate\":\"2019-07-19\",\"has_video\":false,\"original_title\":\"天池水怪\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png\",\"large\":\"https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png\",\"medium\":\"https://img1.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png\"},\"name_en\":\"Dongxian Zhu\",\"name\":\"朱东贤\",\"alt\":\"https://movie.douban.com/celebrity/1419564/\",\"id\":\"1419564\"}],\"pubdates\":[\"2019-07-19(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561900220.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561900220.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561900220.jpg\"},\"alt\":\"https://movie.douban.com/subject/30483696/\",\"id\":\"30483696\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"动画\"],\"title\":\"精灵小王子\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34402.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34402.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34402.jpg\"},\"name_en\":\"Rasmus Hardiker\",\"name\":\"拉斯穆斯·哈迪克\",\"alt\":\"https://movie.douban.com/celebrity/1315925/\",\"id\":\"1315925\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png\",\"large\":\"https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png\",\"medium\":\"https://img1.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png\"},\"name_en\":\"Amy Saville\",\"name\":\"艾米·萨维尔\",\"alt\":\"https://movie.douban.com/celebrity/1418968/\",\"id\":\"1418968\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p19586.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p19586.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p19586.jpg\"},\"name_en\":\"Jim Carter\",\"name\":\"吉姆·卡特\",\"alt\":\"https://movie.douban.com/celebrity/1077385/\",\"id\":\"1077385\"}],\"durations\":[\"83分钟\",\"82分钟(中国大陆)\"],\"collect_count\":24,\"mainland_pubdate\":\"2019-07-20\",\"has_video\":false,\"original_title\":\"The Little Vampire 3D\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png\",\"large\":\"https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png\",\"medium\":\"https://img1.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png\"},\"name_en\":\"Richard Claus\",\"name\":\"理查德·克劳斯\",\"alt\":\"https://movie.douban.com/celebrity/1418967/\",\"id\":\"1418967\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png\",\"large\":\"https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png\",\"medium\":\"https://img1.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png\"},\"name_en\":\"Karsten Kiilerich\",\"name\":\"卡斯滕·基里奇\",\"alt\":\"https://movie.douban.com/celebrity/1289177/\",\"id\":\"1289177\"}],\"pubdates\":[\"2017-10-01(丹麦)\",\"2017-10-04(荷兰)\",\"2019-07-20(中国大陆)\"],\"year\":\"2017\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561172763.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561172763.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561172763.jpg\"},\"alt\":\"https://movie.douban.com/subject/26754064/\",\"id\":\"26754064\"},{\"rating\":{\"max\":10,\"average\":0,\"details\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0},\"stars\":\"00\",\"min\":0},\"genres\":[\"剧情\"],\"title\":\"心之山\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623312.44.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623312.44.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623312.44.jpg\"},\"name_en\":\"\",\"name\":\"胡建群\",\"alt\":\"https://movie.douban.com/celebrity/1418869/\",\"id\":\"1418869\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623325.82.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623325.82.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623325.82.jpg\"},\"name_en\":\"\",\"name\":\"倪颂夏\",\"alt\":\"https://movie.douban.com/celebrity/1418870/\",\"id\":\"1418870\"},{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623342.87.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623342.87.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623342.87.jpg\"},\"name_en\":\"Wenqian Jiao\",\"name\":\"焦雯倩\",\"alt\":\"https://movie.douban.com/celebrity/1406076/\",\"id\":\"1406076\"}],\"durations\":[\"104分钟\"],\"collect_count\":3,\"mainland_pubdate\":\"2019-07-20\",\"has_video\":false,\"original_title\":\"心之山\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623286.5.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623286.5.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623286.5.jpg\"},\"name_en\":\"\",\"name\":\"张崇玹\",\"alt\":\"https://movie.douban.com/celebrity/1418867/\",\"id\":\"1418867\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623301.03.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623301.03.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1561623301.03.jpg\"},\"name_en\":\"\",\"name\":\"徐飞\",\"alt\":\"https://movie.douban.com/celebrity/1418868/\",\"id\":\"1418868\"}],\"pubdates\":[\"2019-07-20(中国大陆)\"],\"year\":\"2019\",\"images\":{\"small\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561899653.jpg\",\"large\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561899653.jpg\",\"medium\":\"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561899653.jpg\"},\"alt\":\"https://movie.douban.com/subject/34445676/\",\"id\":\"34445676\"},{\"rating\":{\"max\":10,\"average\":7.4,\"details\":{\"1\":45,\"2\":263,\"3\":3061,\"4\":4190,\"5\":1118},\"stars\":\"40\",\"min\":0},\"genres\":[\"犯罪\",\"惊悚\"],\"title\":\"隧道尽头\",\"casts\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51251.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51251.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51251.jpg\"},\"name_en\":\"Leonardo Sbaraglia\",\"name\":\"莱昂纳多·斯巴拉格利亚\",\"alt\":\"https://movie.douban.com/celebrity/1010747/\",\"id\":\"1010747\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1386578407.24.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1386578407.24.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1386578407.24.jpg\"},\"name_en\":\"Clara Lago\",\"name\":\"克拉拉·拉戈\",\"alt\":\"https://movie.douban.com/celebrity/1032704/\",\"id\":\"1032704\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16034.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16034.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p16034.jpg\"},\"name_en\":\"Federico Luppi\",\"name\":\"费德里科·路皮\",\"alt\":\"https://movie.douban.com/celebrity/1032480/\",\"id\":\"1032480\"}],\"durations\":[\"120分钟\"],\"collect_count\":12626,\"mainland_pubdate\":\"2019-07-25\",\"has_video\":false,\"original_title\":\"Al final del túnel\",\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1532356263.59.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1532356263.59.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1532356263.59.jpg\"},\"name_en\":\"Rodrigo Grande\",\"name\":\"罗德里戈·格兰德\",\"alt\":\"https://movie.douban.com/celebrity/1006650/\",\"id\":\"1006650\"}],\"pubdates\":[\"2016-04-21(阿根廷)\",\"2016-08-12(西班牙)\",\"2019-07-25(中国大陆)\"],\"year\":\"2016\",\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2336413879.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2336413879.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2336413879.jpg\"},\"alt\":\"https://movie.douban.com/subject/26661229/\",\"id\":\"26661229\"}],\"title\":\"即将上映的电影\"}");

/***/ }),

/***/ 4:
/*!*************************************************!*\
  !*** D:/WebStudy/super_hero_preview/pages.json ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 47:
/*!**************************************************************!*\
  !*** D:/WebStudy/super_hero_preview/static/mock/detail.json ***!
  \**************************************************************/
/*! exports provided: rating, reviews_count, videos, wish_count, original_title, blooper_urls, collect_count, images, douban_site, year, popular_comments, alt, id, mobile_url, photos_count, pubdate, title, do_count, has_video, share_url, seasons_count, languages, schedule_url, writers, pubdates, website, tags, has_schedule, durations, genres, collection, trailers, episodes_count, trailer_urls, has_ticket, bloopers, clip_urls, current_season, casts, countries, mainland_pubdate, photos, summary, clips, subtype, directors, comments_count, popular_reviews, ratings_count, aka, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"rating\":{\"max\":10,\"average\":7.5,\"details\":{\"1\":207,\"2\":1597,\"3\":15940,\"4\":21732,\"5\":7641},\"stars\":\"40\",\"min\":0},\"reviews_count\":306,\"videos\":[{\"source\":{\"literal\":\"iqiyi\",\"pic\":\"https://img3.doubanio.com/f/movie/7c9e516e02c6fe445b6559c0dd2a705e8b17d1c9/pics/movie/video-iqiyi.png\",\"name\":\"爱奇艺视频\"},\"sample_link\":\"http://www.iqiyi.com/v_19rrmy33ic.html?vfm=m_331_dbdy&fv=4904d94982104144a1548dd9040df241\",\"video_id\":\"19rrmy33ic\",\"need_pay\":true},{\"source\":{\"literal\":\"qq\",\"pic\":\"https://img3.doubanio.com/f/movie/0a74f4379607fa731489d7f34daa545df9481fa0/pics/movie/video-qq.png\",\"name\":\"腾讯视频\"},\"sample_link\":\"http://v.qq.com/x/cover/uzuqdig87eggmiw.html?ptag=douban.movie\",\"video_id\":\"uzuqdig87eggmiw\",\"need_pay\":true}],\"wish_count\":17511,\"original_title\":\"9\",\"blooper_urls\":[],\"collect_count\":85691,\"images\":{\"small\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p494268647.jpg\",\"large\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p494268647.jpg\",\"medium\":\"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p494268647.jpg\"},\"douban_site\":\"\",\"year\":\"2009\",\"popular_comments\":[{\"rating\":{\"max\":5,\"value\":2,\"min\":0},\"useful_count\":44,\"author\":{\"uid\":\"Lan.die\",\"avatar\":\"https://img1.doubanio.com/icon/u1275416-68.jpg\",\"signature\":\"人生如寄，要美且开心。\",\"alt\":\"https://www.douban.com/people/Lan.die/\",\"id\":\"1275416\",\"name\":\"Lan~die\"},\"subject_id\":\"1764796\",\"content\":\"实在没必要拍成长篇。\",\"created_at\":\"2009-10-10 15:38:50\",\"id\":\"166753449\"},{\"rating\":{\"max\":5,\"value\":3,\"min\":0},\"useful_count\":0,\"author\":{\"uid\":\"kindsos\",\"avatar\":\"https://img3.doubanio.com/icon/u1726503-52.jpg\",\"signature\":\"今生苦短，来生再见！\",\"alt\":\"https://www.douban.com/people/kindsos/\",\"id\":\"1726503\",\"name\":\"kindsos\"},\"subject_id\":\"1764796\",\"content\":\"期待很久的片子。。有些失望。。讨厌那种小人物拯救世界的题材，总觉得不够真诚。。\",\"created_at\":\"2010-04-05 20:49:08\",\"id\":\"237235918\"},{\"rating\":{\"max\":5,\"value\":3,\"min\":0},\"useful_count\":0,\"author\":{\"uid\":\"longbookstore\",\"avatar\":\"https://img3.doubanio.com/icon/u3006497-45.jpg\",\"signature\":\"因為看不清，只能悶頭向前……\",\"alt\":\"https://www.douban.com/people/longbookstore/\",\"id\":\"3006497\",\"name\":\"龍爺\"},\"subject_id\":\"1764796\",\"content\":\"整體的設定。。。太過模糊和陰暗了，不過優點的話就是雖說是老掉牙的機器人話題，但是角度有所區別，也算是推陳出新了的，可惜是留不下什麽印象的片子，看過也就看過了。\",\"created_at\":\"2012-09-03 15:34:38\",\"id\":\"576141936\"},{\"rating\":{\"max\":5,\"value\":3,\"min\":0},\"useful_count\":17,\"author\":{\"uid\":\"No.59355\",\"avatar\":\"https://img3.doubanio.com/icon/u1059355-6.jpg\",\"signature\":\"垃圾分类很重要\",\"alt\":\"https://www.douban.com/people/No.59355/\",\"id\":\"1059355\",\"name\":\"问津\"},\"subject_id\":\"1764796\",\"content\":\"2009-10-09 看过。寓意浅白。但故事讲得很不好。Story和Director是一人，如果能给其他人导就好了。嗯，比如Tim Burton。\",\"created_at\":\"2009-10-09 14:39:36\",\"id\":\"166407222\"}],\"alt\":\"https://movie.douban.com/subject/1764796/\",\"id\":\"1764796\",\"mobile_url\":\"https://movie.douban.com/subject/1764796/mobile\",\"photos_count\":136,\"pubdate\":\"\",\"title\":\"机器人9号\",\"do_count\":null,\"has_video\":true,\"share_url\":\"https://m.douban.com/movie/subject/1764796\",\"seasons_count\":null,\"languages\":[\"英语\"],\"schedule_url\":\"\",\"writers\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1503025530.8.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1503025530.8.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1503025530.8.jpg\"},\"name_en\":\"Pamela Pettler\",\"name\":\"帕米拉·帕特勒\",\"alt\":\"https://movie.douban.com/celebrity/1301900/\",\"id\":\"1301900\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1351678808.44.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1351678808.44.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1351678808.44.jpg\"},\"name_en\":\"Shane Acker\",\"name\":\"申·阿克\",\"alt\":\"https://movie.douban.com/celebrity/1276787/\",\"id\":\"1276787\"}],\"pubdates\":[\"2009-09-09(美国)\"],\"website\":\"\",\"tags\":[\"动画\",\"科幻\",\"美国\",\"人性\",\"9\",\"2009\",\"战争\",\"3D\",\"剧情\",\"CG\"],\"has_schedule\":false,\"durations\":[\"79 分钟\"],\"genres\":[\"科幻\",\"动画\"],\"collection\":null,\"trailers\":[],\"episodes_count\":null,\"trailer_urls\":[],\"has_ticket\":false,\"bloopers\":[],\"clip_urls\":[],\"current_season\":null,\"casts\":[{\"avatars\":{\"small\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.jpg\",\"large\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.jpg\",\"medium\":\"https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.jpg\"},\"name_en\":\"Elijah Wood\",\"name\":\"伊利亚·伍德\",\"alt\":\"https://movie.douban.com/celebrity/1054395/\",\"id\":\"1054395\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33305.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33305.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33305.jpg\"},\"name_en\":\"Jennifer Connelly\",\"name\":\"詹妮弗·康纳利\",\"alt\":\"https://movie.douban.com/celebrity/1016673/\",\"id\":\"1016673\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p55994.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p55994.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p55994.jpg\"},\"name_en\":\"John C. Reilly\",\"name\":\"约翰·C·赖利\",\"alt\":\"https://movie.douban.com/celebrity/1017907/\",\"id\":\"1017907\"},{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42033.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42033.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p42033.jpg\"},\"name_en\":\"Christopher Plummer\",\"name\":\"克里斯托弗·普卢默\",\"alt\":\"https://movie.douban.com/celebrity/1036321/\",\"id\":\"1036321\"}],\"countries\":[\"美国\"],\"mainland_pubdate\":\"\",\"photos\":[{\"thumb\":\"https://img3.doubanio.com/view/photo/m/public/p1279933684.jpg\",\"image\":\"https://img3.doubanio.com/view/photo/l/public/p1279933684.jpg\",\"cover\":\"https://img3.doubanio.com/view/photo/sqs/public/p1279933684.jpg\",\"alt\":\"https://movie.douban.com/photos/photo/1279933684/\",\"id\":\"1279933684\",\"icon\":\"https://img3.doubanio.com/view/photo/s/public/p1279933684.jpg\"},{\"thumb\":\"https://img3.doubanio.com/view/photo/m/public/p494395796.jpg\",\"image\":\"https://img3.doubanio.com/view/photo/l/public/p494395796.jpg\",\"cover\":\"https://img3.doubanio.com/view/photo/sqs/public/p494395796.jpg\",\"alt\":\"https://movie.douban.com/photos/photo/494395796/\",\"id\":\"494395796\",\"icon\":\"https://img3.doubanio.com/view/photo/s/public/p494395796.jpg\"},{\"thumb\":\"https://img1.doubanio.com/view/photo/m/public/p494387619.jpg\",\"image\":\"https://img1.doubanio.com/view/photo/l/public/p494387619.jpg\",\"cover\":\"https://img1.doubanio.com/view/photo/sqs/public/p494387619.jpg\",\"alt\":\"https://movie.douban.com/photos/photo/494387619/\",\"id\":\"494387619\",\"icon\":\"https://img1.doubanio.com/view/photo/s/public/p494387619.jpg\"},{\"thumb\":\"https://img3.doubanio.com/view/photo/m/public/p494290044.jpg\",\"image\":\"https://img3.doubanio.com/view/photo/l/public/p494290044.jpg\",\"cover\":\"https://img3.doubanio.com/view/photo/sqs/public/p494290044.jpg\",\"alt\":\"https://movie.douban.com/photos/photo/494290044/\",\"id\":\"494290044\",\"icon\":\"https://img3.doubanio.com/view/photo/s/public/p494290044.jpg\"},{\"thumb\":\"https://img1.doubanio.com/view/photo/m/public/p2453637517.jpg\",\"image\":\"https://img1.doubanio.com/view/photo/l/public/p2453637517.jpg\",\"cover\":\"https://img1.doubanio.com/view/photo/sqs/public/p2453637517.jpg\",\"alt\":\"https://movie.douban.com/photos/photo/2453637517/\",\"id\":\"2453637517\",\"icon\":\"https://img1.doubanio.com/view/photo/s/public/p2453637517.jpg\"},{\"thumb\":\"https://img1.doubanio.com/view/photo/m/public/p1360133498.jpg\",\"image\":\"https://img1.doubanio.com/view/photo/l/public/p1360133498.jpg\",\"cover\":\"https://img1.doubanio.com/view/photo/sqs/public/p1360133498.jpg\",\"alt\":\"https://movie.douban.com/photos/photo/1360133498/\",\"id\":\"1360133498\",\"icon\":\"https://img1.doubanio.com/view/photo/s/public/p1360133498.jpg\"},{\"thumb\":\"https://img3.doubanio.com/view/photo/m/public/p1359577252.jpg\",\"image\":\"https://img3.doubanio.com/view/photo/l/public/p1359577252.jpg\",\"cover\":\"https://img3.doubanio.com/view/photo/sqs/public/p1359577252.jpg\",\"alt\":\"https://movie.douban.com/photos/photo/1359577252/\",\"id\":\"1359577252\",\"icon\":\"https://img3.doubanio.com/view/photo/s/public/p1359577252.jpg\"},{\"thumb\":\"https://img3.doubanio.com/view/photo/m/public/p1359559270.jpg\",\"image\":\"https://img3.doubanio.com/view/photo/l/public/p1359559270.jpg\",\"cover\":\"https://img3.doubanio.com/view/photo/sqs/public/p1359559270.jpg\",\"alt\":\"https://movie.douban.com/photos/photo/1359559270/\",\"id\":\"1359559270\",\"icon\":\"https://img3.doubanio.com/view/photo/s/public/p1359559270.jpg\"},{\"thumb\":\"https://img3.doubanio.com/view/photo/m/public/p1359558806.jpg\",\"image\":\"https://img3.doubanio.com/view/photo/l/public/p1359558806.jpg\",\"cover\":\"https://img3.doubanio.com/view/photo/sqs/public/p1359558806.jpg\",\"alt\":\"https://movie.douban.com/photos/photo/1359558806/\",\"id\":\"1359558806\",\"icon\":\"https://img3.doubanio.com/view/photo/s/public/p1359558806.jpg\"},{\"thumb\":\"https://img1.doubanio.com/view/photo/m/public/p1359558167.jpg\",\"image\":\"https://img1.doubanio.com/view/photo/l/public/p1359558167.jpg\",\"cover\":\"https://img1.doubanio.com/view/photo/sqs/public/p1359558167.jpg\",\"alt\":\"https://movie.douban.com/photos/photo/1359558167/\",\"id\":\"1359558167\",\"icon\":\"https://img1.doubanio.com/view/photo/s/public/p1359558167.jpg\"}],\"summary\":\"机器人9号（伊利亚•伍德 Elijah Wood 饰）突然醒来，发现身边的世界充满危机，四处残败，一片末世景象。9号带着一个画有三个奇怪符号的圆形物体逃到街上，幸遇发明家机器人2号（马丁•兰道 Martin Landau 饰）给自己装上了声音，但2号却不幸被机器怪兽抓走。9号找到了老兵1号（克里斯托弗•普卢默 Christopher Plummer 饰）、机械工5号（约翰•雷利 John C. Reilly 饰）、疯癫画家6号（克里斯品•格拉夫 Crispin Glover 饰）和大力士8号（弗雷德•塔塔绍尔 Fred Tatasciore 饰）。9号与5号擅自出行援救2号，危急时被女武士7号（詹妮佛•康纳利 Jennifer Connelly 饰）救下，但无意中9号却令终极机器兽复活。带着自己从哪里来以及生存使命的问题，9号决定想尽办法制服机器兽，拯救全世界……©豆瓣\",\"clips\":[],\"subtype\":\"movie\",\"directors\":[{\"avatars\":{\"small\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1351678808.44.jpg\",\"large\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1351678808.44.jpg\",\"medium\":\"https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1351678808.44.jpg\"},\"name_en\":\"Shane Acker\",\"name\":\"申·阿克\",\"alt\":\"https://movie.douban.com/celebrity/1276787/\",\"id\":\"1276787\"}],\"comments_count\":9728,\"popular_reviews\":[{\"rating\":{\"max\":5,\"value\":4,\"min\":0},\"title\":\"9哥就是个大阴谋家\",\"subject_id\":\"1764796\",\"author\":{\"uid\":\"LaoyeChan\",\"avatar\":\"https://img1.doubanio.com/icon/u2230001-17.jpg\",\"signature\":\"美丽世界的孤儿\",\"alt\":\"https://www.douban.com/people/LaoyeChan/\",\"id\":\"2230001\",\"name\":\"砍脖厮\"},\"summary\":\"电影开始，9哥只是个新来的无名小卒，但它心中的野心计划已经开始。 在它面前的阻碍有，作为团队领袖的1哥，作为自己大哥和情敌的2哥，作为政府武力的胖哥（忘了它是几号了）。 其余的人，艺术家6哥，工人阶级5哥...\",\"alt\":\"https://movie.douban.com/review/2478172/\",\"id\":\"2478172\"},{\"rating\":{\"max\":5,\"value\":4,\"min\":0},\"title\":\"如果卡梅隆来做制片 （剧透在分割线以后）\",\"subject_id\":\"1764796\",\"author\":{\"uid\":\"2185280\",\"avatar\":\"https://img3.doubanio.com/icon/u2185280-1.jpg\",\"signature\":\"\",\"alt\":\"https://www.douban.com/people/2185280/\",\"id\":\"2185280\",\"name\":\"imrains\"},\"summary\":\"    真可惜“9”堪比“终结者”的末世场景和机器人，超炫的动作场面，竟然讲了一个这么糊涂的故事... 这是我看完这部电影的总体感觉。      看这部电影的初衷是因为Tim Burton，很喜欢他那些”诡异”的电影所讲述...\",\"alt\":\"https://movie.douban.com/review/2332914/\",\"id\":\"2332914\"},{\"rating\":{\"max\":5,\"value\":3,\"min\":0},\"title\":\"没有了想象力，要技术还有什么用？\",\"subject_id\":\"1764796\",\"author\":{\"uid\":\"thatiszhangyan\",\"avatar\":\"https://img1.doubanio.com/icon/u1997010-18.jpg\",\"signature\":\"总得磕磕绊绊地前进吧\",\"alt\":\"https://www.douban.com/people/thatiszhangyan/\",\"id\":\"1997010\",\"name\":\"ZhangYan\"},\"summary\":\"两年前，在北京电影学院国际学生影展上，这个短片被评为了一等奖（打败了一个纽约大学（NYU）的学生拍摄的震惊全场、被老师同学们广为传颂的、得过戛纳短片一等奖的片子）。根据当时的流传（不一定准确），片子的...\",\"alt\":\"https://movie.douban.com/review/2488244/\",\"id\":\"2488244\"},{\"rating\":{\"max\":5,\"value\":4,\"min\":0},\"title\":\"我觉得结尾应该是这样的……\",\"subject_id\":\"1764796\",\"author\":{\"uid\":\"avankiss\",\"avatar\":\"https://img3.doubanio.com/icon/u1741835-1.jpg\",\"signature\":\"\",\"alt\":\"https://www.douban.com/people/avankiss/\",\"id\":\"1741835\",\"name\":\"avon\"},\"summary\":\"       如果我以前也曾用“虎头蛇尾”来形容一部电影。那么忘记它吧，因为我也许只是说说而已，除了这一部。 彻头彻尾令人发指的虎头挂个蛇尾，狗尾续个貂身。人神共愤！！！     无论是机器人的造型，特效都是一...\",\"alt\":\"https://movie.douban.com/review/2574051/\",\"id\":\"2574051\"},{\"rating\":{\"max\":5,\"value\":4,\"min\":0},\"title\":\"9个小机器人\",\"subject_id\":\"1764796\",\"author\":{\"uid\":\"151268747\",\"avatar\":\"https://img3.doubanio.com/icon/u151268747-10.jpg\",\"signature\":\"\",\"alt\":\"https://www.douban.com/people/151268747/\",\"id\":\"151268747\",\"name\":\"爱吃馒头的宝宝\"},\"summary\":\"科幻悬疑冒险动画，讲述不久的未来，人类制造的机器向人类展开进攻，最终机器将人类屠杀殆尽，另一小队人马却开始了与机器的战争，保护着人类最后的文明。末世情节，虽故事一般，但制作精致，发人深省。 从1号到9...\",\"alt\":\"https://movie.douban.com/review/8696041/\",\"id\":\"8696041\"},{\"rating\":{\"max\":5,\"value\":4,\"min\":0},\"title\":\"引人深思\",\"subject_id\":\"1764796\",\"author\":{\"uid\":\"155672072\",\"avatar\":\"https://img3.doubanio.com/icon/u155672072-3.jpg\",\"signature\":\"\",\"alt\":\"https://www.douban.com/people/155672072/\",\"id\":\"155672072\",\"name\":\"快乐卟卟\"},\"summary\":\"电影的故事讲述了在不久的未来，人类制造的机器向人类展开了进攻。建筑被毁、社会也分崩离析。最终，机器将人类屠杀殆尽。另一小队人马却开始了与机器的战争，保护着人类最后的文明。一部引人深思的电影，其实每...\",\"alt\":\"https://movie.douban.com/review/8674804/\",\"id\":\"8674804\"},{\"rating\":{\"max\":5,\"value\":3,\"min\":0},\"title\":\"机器人9号\",\"subject_id\":\"1764796\",\"author\":{\"uid\":\"158195982\",\"avatar\":\"https://img3.doubanio.com/icon/u158195982-24.jpg\",\"signature\":\"\",\"alt\":\"https://www.douban.com/people/158195982/\",\"id\":\"158195982\",\"name\":\"工藤新一\"},\"summary\":\"作为创意之作，本片无疑至少在画面上是极度成功的，破败的哥特风格显示了一种动画中很少出现的特异景象，因该比大红大紫的鬼妈妈更有气氛。无法成为经典的原因应该是难以撑起这份颓废的苍白内核。简单的机器反噬...\",\"alt\":\"https://movie.douban.com/review/8662488/\",\"id\":\"8662488\"},{\"rating\":{\"max\":5,\"value\":4,\"min\":0},\"title\":\"第九份灵魂——路线另类虎头蛇尾的电影会是好电影吗？\",\"subject_id\":\"1764796\",\"author\":{\"uid\":\"majorjohn\",\"avatar\":\"https://img1.doubanio.com/icon/user_normal.jpg\",\"signature\":\"\",\"alt\":\"https://www.douban.com/people/majorjohn/\",\"id\":\"2371040\",\"name\":\"[已注销]\"},\"summary\":\"路线另类虎头蛇尾的电影会是好电影吗？  最近更新：我在电影院看没有算时间，电影可能真是76分钟，感觉还是挺短的。   在回答这个问题之前，我首先解释下为什么我说它路线另类，虎头蛇尾。  路线另类： 美国动画...\",\"alt\":\"https://movie.douban.com/review/2337210/\",\"id\":\"2337210\"},{\"rating\":{\"max\":5,\"value\":4,\"min\":0},\"title\":\"《机器人9号》：人性分解之九型人格与十二星座理论溯源\",\"subject_id\":\"1764796\",\"author\":{\"uid\":\"passionfly\",\"avatar\":\"https://img3.doubanio.com/icon/u1540841-26.jpg\",\"signature\":\"感性也好，理性也好，激情最好\",\"alt\":\"https://www.douban.com/people/passionfly/\",\"id\":\"1540841\",\"name\":\"passionfly\"},\"summary\":\"一、9号机器人星座人格对应列表  机器人及角色 对应12星座 典型性格特征 对应人格九型  1号 退伍兵 天蝎座 狮子座 权威 恐惧 【完美者】一型 2号 发明家 水瓶座 天秤座 实用 承担 【给予者】二型 3号 书管员 双子...\",\"alt\":\"https://movie.douban.com/review/2826017/\",\"id\":\"2826017\"},{\"rating\":{\"max\":5,\"value\":4,\"min\":0},\"title\":\"《9》：小布人的末世预言\",\"subject_id\":\"1764796\",\"author\":{\"uid\":\"LucFrance\",\"avatar\":\"https://img3.doubanio.com/icon/u1978083-2.jpg\",\"signature\":\"春眠不觉小...\",\"alt\":\"https://www.douban.com/people/LucFrance/\",\"id\":\"1978083\",\"name\":\"Luc\"},\"summary\":\"虽说动画在好莱坞的定位，并不止于小朋友们的“寓教于乐”，但当独立的成人动画欲求全面公映时，发行方为了追求票房的最大化，潜在的操作就是“和谐”友爱，降低其暴力程度。为了老少皆宜，保守的剧本不惜套用陈...\",\"alt\":\"https://movie.douban.com/review/2812779/\",\"id\":\"2812779\"}],\"ratings_count\":64720,\"aka\":[\"9：末世决战\",\"九\",\"Number 9\",\"机器人9号\"]}");

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map