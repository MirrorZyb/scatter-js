"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator")),_toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray")),_typeof2=_interopRequireDefault(require("@babel/runtime/helpers/typeof")),_slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),_StorageService=_interopRequireDefault(require("./StorageService")),_getRandomValues=_interopRequireDefault(require("get-random-values")),_createHash=_interopRequireDefault(require("create-hash")),_isomorphicWs=_interopRequireDefault(require("isomorphic-ws")),_Device=_interopRequireDefault(require("../util/Device")),suffix="/socket.io/?EIO=3&transport=websocket",sha256=function(a){return(0,_createHash["default"])("sha256").update(a).digest("hex")},random=function(){var a=new Uint8Array(24);return(0,_getRandomValues["default"])(a),a.join("")},SocketService=/*#__PURE__*/function(){function a(b,c){(0,_classCallCheck2["default"])(this,a),this.plugin=b,this.timeout=c,this.uuid=null,this.socket=null,this.connected=!1,this.paired=!1,this.openRequests=[],this.pairingPromise=null,this.eventHandlers={},this.appkey=_StorageService["default"].getAppKey(),this.appkey||(this.appkey="appkey:"+random())}return(0,_createClass2["default"])(a,[{key:"addEventHandler",value:function addEventHandler(a,b){b||(b="app"),this.eventHandlers[b]=a}},{key:"removeEventHandler",value:function removeEventHandler(a){a||(a="app"),delete this.eventHandlers[a]}},{key:"link",value:function link(){var a=this,b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;return this.uuid=b,Promise.race([new Promise(function(b){return setTimeout(function(){a.connected||(b(!1),a.socket&&(a.socket.close(),a.socket=null))},a.timeout)}),new Promise(/*#__PURE__*/function(){var b=(0,_asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function b(d){var e,f,g,h,j,k;return _regenerator["default"].wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return e=function(){a.socket.onmessage=function(a){// Handshaking/Upgrading
if(-1===a.data.indexOf("42/scatter"))return!1;// Real message
var f=JSON.parse(a.data.replace("42/scatter,","")),g=(0,_slicedToArray2["default"])(f,2),h=g[0],i=g[1];return"paired"===h?b(i):"rekey"===h?c():"api"===h?d(i):"event"===h?e(i):void 0};var b=function(b){if(a.paired=b,a.paired){var c=_StorageService["default"].getAppKey(),d=-1<a.appkey.indexOf("appkey:")?sha256(a.appkey):a.appkey;c&&c===d||(_StorageService["default"].setAppKey(d),a.appkey=_StorageService["default"].getAppKey())}a.pairingPromise.resolve(b)},c=function(){a.appkey="appkey:"+random(),a.send("rekeyed",{data:{appkey:a.appkey,origin:a.getOrigin()},plugin:a.plugin})},d=function(b){var c=a.openRequests.find(function(a){return a.id===b.id});if(c){a.openRequests=a.openRequests.filter(function(a){return a.id!==b.id});var d="object"===(0,_typeof2["default"])(b.result)&&null!==b.result&&b.result.hasOwnProperty("isError");d?c.reject(b.result):c.resolve(b.result)}},e=function(b){var c=b.event,d=b.payload;Object.keys(a.eventHandlers).length&&Object.keys(a.eventHandlers).map(function(b){a.eventHandlers[b](c,d)})}},f=function(a,b){return c?c:b?"local.get-scatter.com:".concat(a):"127.0.0.1:".concat(a)},b.next=4,(0,_asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function a(){var b,d,e,g;return _regenerator["default"].wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!c){a.next=2;break}return a.abrupt("return",[50005]);case 2:b=function(a,b){return fetch(a).then(function(a){return a.text()}).then(function(a){return b("scatter"===a)})["catch"](function(){return b(!1)})},d=50005,e=[],(0,_toConsumableArray2["default"])([,,,,,].keys()).map(function(a){var c=d+1500*a;return Promise.all([b("https://"+f(c+1,!0),function(a){return a?e.push(c+1):null}),b("http://"+f(c,!1),function(a){return a?e.push(c):null})])}),g=0;case 7:if(!(50>g)){a.next=15;break}if(!e.length){a.next=10;break}return a.abrupt("break",15);case 10:return a.next=12,new Promise(function(a){return setTimeout(function(){return a(!0)},2)});case 12:g++,a.next=7;break;case 15:return a.abrupt("return",e.length?e.sort(function(c,a){// Always try to use SSL first.
return a%2?c%2?0:-1:1}):/* BACKWARDS COMPAT */[50006,50005]);case 16:case"end":return a.stop();}},a)}))();case 4:g=b.sent,h=function(a){var b,c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;c||(b=new Promise(function(a){return c=a}));var d=!(a%2),e=f(a,d),g=d?"wss://":"ws://",h="".concat(g).concat(e).concat(suffix),i=new _isomorphicWs["default"](h);return i.onerror=function(){return c(!1)},i.onopen=function(){return c(i)},b},j=0;case 7:if(!(j<g.length)){b.next=21;break}return b.next=10,h(g[j]);case 10:if(k=b.sent,!k){b.next=18;break}return a.socket=k,a.send(),a.connected=!0,a.pair(!0).then(function(){return d(!0)}),e(),b.abrupt("break",21);case 18:j++,b.next=7;break;case 21:case"end":return b.stop();}},b)}));return function(){return b.apply(this,arguments)}}())])}},{key:"isConnected",value:function isConnected(){return this.connected}},{key:"isPaired",value:function isPaired(){return this.paired}},{key:"disconnect",value:function disconnect(){return console.log("disconnect"),this.socket&&this.socket.close(),!0}},{key:"sendApiRequest",value:function sendApiRequest(a){var b=this;return new Promise(function(c,d){return"identityFromPermissions"!==a.type||b.paired?void b.pair().then(function(){if(!b.paired)return d({code:"not_paired",message:"The user did not allow this app to connect to their Scatter"});// Request ID used for resolving promises
a.id=random(),a.appkey=b.appkey,a.nonce=_StorageService["default"].getNonce()||0;// Next nonce used to authenticate the next request
var e=random();a.nextNonce=sha256(e),_StorageService["default"].setNonce(e),a.hasOwnProperty("payload")&&!a.payload.hasOwnProperty("origin")&&(a.payload.origin=b.getOrigin()),b.openRequests.push(Object.assign(a,{resolve:c,reject:d})),b.send("api",{data:a,plugin:b.plugin})}):c(!1)})}},{key:"pair",value:function pair(){var a=this,b=!!(0<arguments.length&&void 0!==arguments[0])&&arguments[0];return new Promise(function(c,d){a.pairingPromise={resolve:c,reject:d},a.send("pair",{data:{appkey:a.appkey,origin:a.getOrigin(),passthrough:b},plugin:a.plugin})})}},{key:"send",value:function send(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;null===a&&null===b?this.socket.send("40/scatter"):this.socket.send("42/scatter,"+JSON.stringify([a,Object.assign(b,{device:_Device["default"],uuid:this.uuid})]))}},{key:"getOrigin",value:function getOrigin(){return a.getOriginOrPlugin(this.plugin)}}],[{key:"getOriginOrPlugin",value:function getOriginOrPlugin(a){var b;return b="undefined"==typeof location?a:location.hasOwnProperty("hostname")&&location.hostname.length&&"localhost"!==location.hostname?location.hostname:a,"www."===b.substr(0,4)&&(b=b.replace("www.","")),b}}]),a}();exports["default"]=SocketService;