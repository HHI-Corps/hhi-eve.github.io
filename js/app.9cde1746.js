(function(e){function t(t){for(var r,i,c=t[0],s=t[1],l=t[2],u=0,m=[];u<c.length;u++)i=c[u],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&m.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(t);while(m.length)m.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},o=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d0c8f69":"49361a0a"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var o,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=i(e);var l=new Error;o=function(t){s.onerror=s.onload=null,clearTimeout(u);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}a[e]=void 0}};var u=setTimeout((function(){o({type:"timeout",target:s})}),12e4);s.onerror=s.onload=o,document.head.appendChild(s)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var d=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r="uid",a="username",o="email",i=n("2b0e"),c=n("43f9"),s=n.n(c),l=(n("51de"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page-container"},[n("md-app",{attrs:{"md-waterfall":"","md-mode":"fixed"}},[n("md-app-toolbar",{staticClass:"md-primary"},[n("span",{staticClass:"md-title"},[e._v("EVE 军团系统")]),e.active?n("span",{staticClass:"md-toolbar-section-begin"},[n("md-button",{on:{click:function(t){return e.goto("/")}}},[e._v("首页")]),n("md-button",{on:{click:function(t){return e.goto("/chars")}}},[e._v("角色管理")]),n("md-button",[e._v("数据中心")])],1):e._e(),e.active?n("span",{staticClass:"md-toolbar-section-end"},[e._v(" "+e._s(e.username)+" ")]):n("span",{staticClass:"md-toolbar-section-end"},[n("md-button",{on:{click:function(t){e.showLoginDialog=!0}}},[e._v("登录")]),n("md-button",[e._v("注册")])],1)]),n("md-app-content",[n("router-view")],1)],1),n("md-dialog",{attrs:{"md-active":e.showLoginDialog},on:{"update:mdActive":function(t){e.showLoginDialog=t},"update:md-active":function(t){e.showLoginDialog=t}}},[n("md-dialog-title",[e._v("登录")]),n("div",{staticStyle:{margin:"10px"}},[n("md-field",[n("label",[e._v("用户名")]),n("md-input",{model:{value:e.loginUserName,callback:function(t){e.loginUserName=t},expression:"loginUserName"}})],1),n("md-field",[n("label",[e._v("密码")]),n("md-input",{attrs:{type:"password"},model:{value:e.loginPassword,callback:function(t){e.loginPassword=t},expression:"loginPassword"}})],1),n("label",[e._v(e._s(e.loginMessage))])],1),n("md-dialog-actions",[n("md-button",{staticClass:"md-primary",on:{click:function(t){return e.handleLogin()}}},[e._v("登录")]),n("md-button",{staticClass:"md-primary",on:{click:function(t){e.showLoginDialog=!1}}},[e._v("取消")])],1)],1)],1)}),u=[],d=(n("96cf"),n("1da1")),m=n("5530"),p=n("2f62"),f=(n("d3b7"),n("bc3a")),g=n.n(f),h=n("c695"),v=n.n(h),b=function(){return{active:!1}},w={uid:function(){return v.a.toNumber(localStorage.getItem(r))},username:function(){return localStorage.getItem(a)}},_={login:function(e,t){var n=e.commit;n("changeState",!0),localStorage.setItem(r,t.id),localStorage.setItem(a,t.username),localStorage.setItem(o,t.email)},logout:function(e){var t=e.commit;t("changeState",!1)}},y={changeState:function(e,t){e.active=t}},S={namespaced:!0,state:b,getters:w,actions:_,mutations:y};i["default"].use(p["a"]);var k=!1,j=new p["a"].Store({modules:{loginState:S},strict:k}),O=j,x=n("8c4f"),C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[e._v(" 欢迎光临！ ")])},P=[],L={name:"Home",components:{}},E=L,I=n("2877"),M=Object(I["a"])(E,C,P,!1,null,null,null),R=M.exports,D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("md-table",{attrs:{"md-card":""},scopedSlots:e._u([{key:"md-table-row",fn:function(t){var r=t.item;return n("md-table-row",{},[n("md-table-cell",{attrs:{"md-label":"#","md-numeric":""}},[e._v(e._s(r.char_id))]),n("md-table-cell",{attrs:{"md-label":"角色名"}},[e._v(e._s(r.name))]),n("md-table-cell",{attrs:{"md-label":"ISK"}},[e._v(e._s(r.isk))]),n("md-table-cell",{attrs:{"md-label":"更新时间"}},[e._v(e._s(r.update_time))]),n("md-table-cell",{attrs:{"md-label":"操作"}})],1)}}]),model:{value:e.chars,callback:function(t){e.chars=t},expression:"chars"}},[n("md-table-toolbar",[n("h1",{staticClass:"md-title"},[e._v("角色列表")])])],1)],1)},T=[],$={data:function(){return{chars:[]}},computed:{uid:function(){this.$store.loginState.uid()}},mounted:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,z();case 3:t=e.sent,this.chars=t.data,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(){return e.apply(this,arguments)}return t}()},N=$,U=Object(I["a"])(N,D,T,!1,null,null,null),A=U.exports;i["default"].use(x["a"]);var H=[{path:"/",name:"Home",component:R},{path:"/register",name:"Register",component:function(){return n.e("chunk-2d0c8f69").then(n.bind(null,"56b4"))}},{path:"/chars",name:"Characters",component:A}],J=new x["a"]({routes:H}),q=J;g.a.defaults.withCredentials=!0;var F={baseURL:"https://hhi-eve-backend.herokuapp.com/api",method:"POST",withCredentials:!0},G=g.a.create(F);function K(e,t){return V.apply(this,arguments)}function V(){return V=Object(d["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",G({url:"/user/login",data:{username:t,passhash:n}}));case 1:case"end":return e.stop()}}),e)}))),V.apply(this,arguments)}function z(e){return void 0===e&&(e=""),G({method:"GET",url:"/char/by-id/"+e})}G.interceptors.response.use((function(e){return console.log("interceptor::"+e.status),e}),(function(e){if(console.log("interceptor::error::"+e),401!==e.response.status)return Promise.reject(e);console.log("need logout"),O.dispatch("loginState/logout"),q.push("/")}));var B={components:{Characters:A},data:function(){return{showLoginDialog:!1,loginUserName:"",loginPassword:"",loginMessage:""}},computed:Object(m["a"])({},Object(p["d"])({active:function(e){return e.loginState.active}}),{},Object(p["c"])("loginState",{username:"username"})),methods:Object(m["a"])({goto:function(e){this.$router.push(e)},handleLogin:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,K(e.loginUserName,e.loginPassword);case 3:n=t.sent,e.login(n.data.data),e.showLoginDialog=!1,e.$router.push("/chars"),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),e.loginMessage=t.t0.response.data.error;case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()}},Object(p["b"])("loginState",["login","logout"])),mounted:function(){var e={id:localStorage.getItem(r),username:localStorage.getItem(a),email:localStorage.getItem(o)};void 0!==e.id&&this.login(e)}},Q=B,W=(n("5c0b"),Object(I["a"])(Q,l,u,!1,null,null,null)),X=W.exports;i["default"].config.productionTip=!1,i["default"].use(s.a),i["default"].material.locale.dateFormat="yyyy-MM-dd",new i["default"]({router:q,render:function(e){return e(X)},store:O}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),a=n.n(r);a.a},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.9cde1746.js.map