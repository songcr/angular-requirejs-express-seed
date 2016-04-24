angular.module("ui.bootstrap.modal",["ui.bootstrap.stackedMap","ui.bootstrap.position"]).factory("$$multiMap",function(){return{createNew:function(){var e={};return{entries:function(){return Object.keys(e).map(function(n){return{key:n,value:e[n]}})},get:function(n){return e[n]},hasKey:function(n){return!!e[n]},keys:function(){return Object.keys(e)},put:function(n,t){e[n]||(e[n]=[]),e[n].push(t)},remove:function(n,t){var o=e[n];if(o){var r=o.indexOf(t);-1!==r&&o.splice(r,1),o.length||delete e[n]}}}}}}).provider("$uibResolve",function(){var e=this;this.resolver=null,this.setResolver=function(e){this.resolver=e},this.$get=["$injector","$q",function(n,t){var o=e.resolver?n.get(e.resolver):null;return{resolve:function(e,r,a,l){if(o)return o.resolve(e,r,a,l);var i=[];return angular.forEach(e,function(e){angular.isFunction(e)||angular.isArray(e)?i.push(t.resolve(n.invoke(e))):angular.isString(e)?i.push(t.resolve(n.get(e))):i.push(t.resolve(e))}),t.all(i).then(function(n){var t={},o=0;return angular.forEach(e,function(e,r){t[r]=n[o++]}),t})}}}]}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(e,n,t){function o(n,o,r){r.modalInClass&&(e.addClass(o,r.modalInClass),n.$on(t.NOW_CLOSING_EVENT,function(t,a){var l=a();n.modalOptions.animation?e.removeClass(o,r.modalInClass).then(l):l()}))}return{replace:!0,templateUrl:"uib/template/modal/backdrop.html",compile:function(e,n){return e.addClass(n.backdropClass),o}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animateCss","$document",function(e,n,t,o){return{scope:{index:"@"},replace:!0,transclude:!0,templateUrl:function(e,n){return n.templateUrl||"uib/template/modal/window.html"},link:function(r,a,l){a.addClass(l.windowClass||""),a.addClass(l.windowTopClass||""),r.size=l.size,r.close=function(n){var t=e.getTop();t&&t.value.backdrop&&"static"!==t.value.backdrop&&n.target===n.currentTarget&&(n.preventDefault(),n.stopPropagation(),e.dismiss(t.key,"backdrop click"))},a.on("click",r.close),r.$isRendered=!0;var i=n.defer();l.$observe("modalRender",function(e){"true"===e&&i.resolve()}),i.promise.then(function(){var i=null;l.modalInClass&&(i=t(a,{addClass:l.modalInClass}).start(),r.$on(e.NOW_CLOSING_EVENT,function(e,n){var o=n();t(a,{removeClass:l.modalInClass}).start().then(o)})),n.when(i).then(function(){var n=e.getTop();if(n&&e.modalRendered(n.key),!o[0].activeElement||!a[0].contains(o[0].activeElement)){var t=a[0].querySelector("[autofocus]");t?t.focus():a[0].focus()}})})}}}]).directive("uibModalAnimationClass",function(){return{compile:function(e,n){n.modalAnimation&&e.addClass(n.uibModalAnimationClass)}}}).directive("uibModalTransclude",function(){return{link:function(e,n,t,o,r){r(e.$parent,function(e){n.empty(),n.append(e)})}}}).factory("$uibModalStack",["$animate","$animateCss","$document","$compile","$rootScope","$q","$$multiMap","$$stackedMap","$uibPosition",function(e,n,t,o,r,a,l,i,s){function d(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function u(){for(var e=-1,n=k.keys(),t=0;t<n.length;t++)k.get(n[t]).value.backdrop&&(e=t);return e>-1&&E>e&&(e=E),e}function c(e,n){var t=k.get(e).value,o=t.appendTo;k.remove(e),T=k.top(),T&&(E=parseInt(T.value.modalDomEl.attr("index"),10)),m(t.modalDomEl,t.modalScope,function(){var n=t.openedClass||w;C.remove(n,e),o.toggleClass(n,C.hasKey(n)),$&&$.heightOverflow&&$.scrollbarWidth&&($.originalRight?o.css({paddingRight:$.originalRight+"px"}):o.css({paddingRight:""}),$=null),p(!0)},t.closedDeferred),f(),n&&n.focus?n.focus():o.focus&&o.focus()}function p(e){var n;k.length()>0&&(n=k.top().value,n.modalDomEl.toggleClass(n.windowTopClass||"",e))}function f(){if(b&&-1===u()){var e=g;m(b,g,function(){e=null}),b=void 0,g=void 0}}function m(n,t,o,r){function l(){l.done||(l.done=!0,e.leave(n).then(function(){n.remove(),r&&r.resolve()}),t.$destroy(),o&&o())}var i,s=null,d=function(){return i||(i=a.defer(),s=i.promise),function(){i.resolve()}};return t.$broadcast(y.NOW_CLOSING_EVENT,d),a.when(s).then(l)}function v(e){if(e.isDefaultPrevented())return e;var n=k.top();if(n)switch(e.which){case 27:n.value.keyboard&&(e.preventDefault(),r.$apply(function(){y.dismiss(n.key,"escape key press")}));break;case 9:var t=y.loadFocusElementList(n),o=!1;e.shiftKey?(y.isFocusInFirstItem(e,t)||y.isModalFocused(e,n))&&(o=y.focusLastFocusableElement(t)):y.isFocusInLastItem(e,t)&&(o=y.focusFirstFocusableElement(t)),o&&(e.preventDefault(),e.stopPropagation())}}function h(e,n,t){return!e.value.modalScope.$broadcast("modal.closing",n,t).defaultPrevented}var b,g,$,w="modal-open",k=i.createNew(),C=l.createNew(),y={NOW_CLOSING_EVENT:"modal.stack.now-closing"},E=0,T=null,D="a[href], area[href], input:not([disabled]), button:not([disabled]),select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]";return r.$watch(u,function(e){g&&(g.index=e)}),t.on("keydown",v),r.$on("$destroy",function(){t.off("keydown",v)}),y.open=function(n,a){var l=t[0].activeElement,i=a.openedClass||w;p(!1),T=k.top(),k.add(n,{deferred:a.deferred,renderDeferred:a.renderDeferred,closedDeferred:a.closedDeferred,modalScope:a.scope,backdrop:a.backdrop,keyboard:a.keyboard,openedClass:a.openedClass,windowTopClass:a.windowTopClass,animation:a.animation,appendTo:a.appendTo}),C.put(i,n);var d=a.appendTo,c=u();if(!d.length)throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");c>=0&&!b&&(g=r.$new(!0),g.modalOptions=a,g.index=c,b=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>'),b.attr("backdrop-class",a.backdropClass),a.animation&&b.attr("modal-animation","true"),o(b)(g),e.enter(b,d)),E=T?parseInt(T.value.modalDomEl.attr("index"),10)+1:0;var f=angular.element('<div uib-modal-window="modal-window"></div>');f.attr({"template-url":a.windowTemplateUrl,"window-class":a.windowClass,"window-top-class":a.windowTopClass,size:a.size,index:E,animate:"animate"}).html(a.content),a.animation&&f.attr("modal-animation","true"),$=s.scrollbarPadding(d),$.heightOverflow&&$.scrollbarWidth&&d.css({paddingRight:$.right+"px"}),d.addClass(i),e.enter(o(f)(a.scope),d),k.top().value.modalDomEl=f,k.top().value.modalOpener=l},y.close=function(e,n){var t=k.get(e);return t&&h(t,n,!0)?(t.value.modalScope.$$uibDestructionScheduled=!0,t.value.deferred.resolve(n),c(e,t.value.modalOpener),!0):!t},y.dismiss=function(e,n){var t=k.get(e);return t&&h(t,n,!1)?(t.value.modalScope.$$uibDestructionScheduled=!0,t.value.deferred.reject(n),c(e,t.value.modalOpener),!0):!t},y.dismissAll=function(e){for(var n=this.getTop();n&&this.dismiss(n.key,e);)n=this.getTop()},y.getTop=function(){return k.top()},y.modalRendered=function(e){var n=k.get(e);n&&n.value.renderDeferred.resolve()},y.focusFirstFocusableElement=function(e){return e.length>0?(e[0].focus(),!0):!1},y.focusLastFocusableElement=function(e){return e.length>0?(e[e.length-1].focus(),!0):!1},y.isModalFocused=function(e,n){if(e&&n){var t=n.value.modalDomEl;if(t&&t.length)return(e.target||e.srcElement)===t[0]}return!1},y.isFocusInFirstItem=function(e,n){return n.length>0?(e.target||e.srcElement)===n[0]:!1},y.isFocusInLastItem=function(e,n){return n.length>0?(e.target||e.srcElement)===n[n.length-1]:!1},y.loadFocusElementList=function(e){if(e){var n=e.value.modalDomEl;if(n&&n.length){var t=n[0].querySelectorAll(D);return t?Array.prototype.filter.call(t,function(e){return d(e)}):t}}},y}]).provider("$uibModal",function(){var e={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$rootScope","$q","$document","$templateRequest","$controller","$uibResolve","$uibModalStack",function(n,t,o,r,a,l,i){function s(e){return e.template?t.when(e.template):r(angular.isFunction(e.templateUrl)?e.templateUrl():e.templateUrl)}var d={},u=null;return d.getPromiseChain=function(){return u},d.open=function(r){function d(){return b}var c=t.defer(),p=t.defer(),f=t.defer(),m=t.defer(),v={result:c.promise,opened:p.promise,closed:f.promise,rendered:m.promise,close:function(e){return i.close(v,e)},dismiss:function(e){return i.dismiss(v,e)}};if(r=angular.extend({},e.options,r),r.resolve=r.resolve||{},r.appendTo=r.appendTo||o.find("body").eq(0),!r.template&&!r.templateUrl)throw new Error("One of template or templateUrl options is required.");var h,b=t.all([s(r),l.resolve(r.resolve,{},null,null)]);return h=u=t.all([u]).then(d,d).then(function(e){var t=r.scope||n,o=t.$new();o.$close=v.close,o.$dismiss=v.dismiss,o.$on("$destroy",function(){o.$$uibDestructionScheduled||o.$dismiss("$uibUnscheduledDestruction")});var l,s,d={};r.controller&&(d.$scope=o,d.$uibModalInstance=v,angular.forEach(e[1],function(e,n){d[n]=e}),s=a(r.controller,d,!0),r.controllerAs?(l=s.instance,r.bindToController&&(l.$close=o.$close,l.$dismiss=o.$dismiss,angular.extend(l,t)),l=s(),o[r.controllerAs]=l):l=s(),angular.isFunction(l.$onInit)&&l.$onInit()),i.open(v,{scope:o,deferred:c,renderDeferred:m,closedDeferred:f,content:e[0],animation:r.animation,backdrop:r.backdrop,keyboard:r.keyboard,backdropClass:r.backdropClass,windowTopClass:r.windowTopClass,windowClass:r.windowClass,windowTemplateUrl:r.windowTemplateUrl,size:r.size,openedClass:r.openedClass,appendTo:r.appendTo}),p.resolve(!0)},function(e){p.reject(e),c.reject(e)})["finally"](function(){u===h&&(u=null)}),v},d}]};return e});