angular.module("ui.bootstrap.timepicker",[]).constant("uibTimepickerConfig",{hourStep:1,minuteStep:1,secondStep:1,showMeridian:!0,showSeconds:!1,meridians:null,readonlyInput:!1,mousewheel:!0,arrowkeys:!0,showSpinners:!0,templateUrl:"uib/template/timepicker/timepicker.html"}).controller("UibTimepickerController",["$scope","$element","$attrs","$parse","$log","$locale","uibTimepickerConfig",function(e,n,i,t,r,o,u){function s(){var n=+e.hours,i=e.showMeridian?n>0&&13>n:n>=0&&24>n;return i&&""!==e.hours?(e.showMeridian&&(12===n&&(n=0),e.meridian===S[1]&&(n+=12)),n):void 0}function a(){var n=+e.minutes,i=n>=0&&60>n;return i&&""!==e.minutes?n:void 0}function c(){var n=+e.seconds;return n>=0&&60>n?n:void 0}function l(e,n){return null===e?"":angular.isDefined(e)&&e.toString().length<2&&!n?"0"+e:e.toString()}function d(e){p(),D.$setViewValue(new Date($)),f(e)}function p(){D.$setValidity("time",!0),e.invalidHours=!1,e.invalidMinutes=!1,e.invalidSeconds=!1}function f(n){if(D.$modelValue){var i=$.getHours(),t=$.getMinutes(),r=$.getSeconds();e.showMeridian&&(i=0===i||12===i?12:i%12),e.hours="h"===n?i:l(i,!M),"m"!==n&&(e.minutes=l(t)),e.meridian=$.getHours()<12?S[0]:S[1],"s"!==n&&(e.seconds=l(r)),e.meridian=$.getHours()<12?S[0]:S[1]}else e.hours=null,e.minutes=null,e.seconds=null,e.meridian=S[0]}function h(e){$=v($,e),d()}function m(e,n){return v(e,60*n)}function v(e,n){var i=new Date(e.getTime()+1e3*n),t=new Date(e);return t.setHours(i.getHours(),i.getMinutes(),i.getSeconds()),t}function w(){return(null===e.hours||""===e.hours)&&(null===e.minutes||""===e.minutes)&&(!e.showSeconds||e.showSeconds&&(null===e.seconds||""===e.seconds))}var $=new Date,g=[],D={$setViewValue:angular.noop},S=angular.isDefined(i.meridians)?e.$parent.$eval(i.meridians):u.meridians||o.DATETIME_FORMATS.AMPMS,M=angular.isDefined(i.padHours)?e.$parent.$eval(i.padHours):!0;e.tabindex=angular.isDefined(i.tabindex)?i.tabindex:0,n.removeAttr("tabindex"),this.init=function(n,t){D=n,D.$render=this.render,D.$formatters.unshift(function(e){return e?new Date(e):null});var r=t.eq(0),o=t.eq(1),s=t.eq(2),a=angular.isDefined(i.mousewheel)?e.$parent.$eval(i.mousewheel):u.mousewheel;a&&this.setupMousewheelEvents(r,o,s);var c=angular.isDefined(i.arrowkeys)?e.$parent.$eval(i.arrowkeys):u.arrowkeys;c&&this.setupArrowkeyEvents(r,o,s),e.readonlyInput=angular.isDefined(i.readonlyInput)?e.$parent.$eval(i.readonlyInput):u.readonlyInput,this.setupInputEvents(r,o,s)};var y=u.hourStep;i.hourStep&&g.push(e.$parent.$watch(t(i.hourStep),function(e){y=+e}));var b=u.minuteStep;i.minuteStep&&g.push(e.$parent.$watch(t(i.minuteStep),function(e){b=+e}));var H;g.push(e.$parent.$watch(t(i.min),function(e){var n=new Date(e);H=isNaN(n)?void 0:n}));var k;g.push(e.$parent.$watch(t(i.max),function(e){var n=new Date(e);k=isNaN(n)?void 0:n}));var T=!1;i.ngDisabled&&g.push(e.$parent.$watch(t(i.ngDisabled),function(e){T=e})),e.noIncrementHours=function(){var e=m($,60*y);return T||e>k||$>e&&H>e},e.noDecrementHours=function(){var e=m($,60*-y);return T||H>e||e>$&&e>k},e.noIncrementMinutes=function(){var e=m($,b);return T||e>k||$>e&&H>e},e.noDecrementMinutes=function(){var e=m($,-b);return T||H>e||e>$&&e>k},e.noIncrementSeconds=function(){var e=v($,I);return T||e>k||$>e&&H>e},e.noDecrementSeconds=function(){var e=v($,-I);return T||H>e||e>$&&e>k},e.noToggleMeridian=function(){return $.getHours()<12?T||m($,720)>k:T||m($,-720)<H};var I=u.secondStep;i.secondStep&&g.push(e.$parent.$watch(t(i.secondStep),function(e){I=+e})),e.showSeconds=u.showSeconds,i.showSeconds&&g.push(e.$parent.$watch(t(i.showSeconds),function(n){e.showSeconds=!!n})),e.showMeridian=u.showMeridian,i.showMeridian&&g.push(e.$parent.$watch(t(i.showMeridian),function(n){if(e.showMeridian=!!n,D.$error.time){var i=s(),t=a();angular.isDefined(i)&&angular.isDefined(t)&&($.setHours(i),d())}else f()})),this.setupMousewheelEvents=function(n,i,t){var r=function(e){e.originalEvent&&(e=e.originalEvent);var n=e.wheelDelta?e.wheelDelta:-e.deltaY;return e.detail||n>0};n.bind("mousewheel wheel",function(n){T||e.$apply(r(n)?e.incrementHours():e.decrementHours()),n.preventDefault()}),i.bind("mousewheel wheel",function(n){T||e.$apply(r(n)?e.incrementMinutes():e.decrementMinutes()),n.preventDefault()}),t.bind("mousewheel wheel",function(n){T||e.$apply(r(n)?e.incrementSeconds():e.decrementSeconds()),n.preventDefault()})},this.setupArrowkeyEvents=function(n,i,t){n.bind("keydown",function(n){T||(38===n.which?(n.preventDefault(),e.incrementHours(),e.$apply()):40===n.which&&(n.preventDefault(),e.decrementHours(),e.$apply()))}),i.bind("keydown",function(n){T||(38===n.which?(n.preventDefault(),e.incrementMinutes(),e.$apply()):40===n.which&&(n.preventDefault(),e.decrementMinutes(),e.$apply()))}),t.bind("keydown",function(n){T||(38===n.which?(n.preventDefault(),e.incrementSeconds(),e.$apply()):40===n.which&&(n.preventDefault(),e.decrementSeconds(),e.$apply()))})},this.setupInputEvents=function(n,i,t){if(e.readonlyInput)return e.updateHours=angular.noop,e.updateMinutes=angular.noop,void(e.updateSeconds=angular.noop);var r=function(n,i,t){D.$setViewValue(null),D.$setValidity("time",!1),angular.isDefined(n)&&(e.invalidHours=n),angular.isDefined(i)&&(e.invalidMinutes=i),angular.isDefined(t)&&(e.invalidSeconds=t)};e.updateHours=function(){var e=s(),n=a();D.$setDirty(),angular.isDefined(e)&&angular.isDefined(n)?($.setHours(e),$.setMinutes(n),H>$||$>k?r(!0):d("h")):r(!0)},n.bind("blur",function(n){D.$setTouched(),w()?p():null===e.hours||""===e.hours?r(!0):!e.invalidHours&&e.hours<10&&e.$apply(function(){e.hours=l(e.hours,!M)})}),e.updateMinutes=function(){var e=a(),n=s();D.$setDirty(),angular.isDefined(e)&&angular.isDefined(n)?($.setHours(n),$.setMinutes(e),H>$||$>k?r(void 0,!0):d("m")):r(void 0,!0)},i.bind("blur",function(n){D.$setTouched(),w()?p():null===e.minutes?r(void 0,!0):!e.invalidMinutes&&e.minutes<10&&e.$apply(function(){e.minutes=l(e.minutes)})}),e.updateSeconds=function(){var e=c();D.$setDirty(),angular.isDefined(e)?($.setSeconds(e),d("s")):r(void 0,void 0,!0)},t.bind("blur",function(n){w()?p():!e.invalidSeconds&&e.seconds<10&&e.$apply(function(){e.seconds=l(e.seconds)})})},this.render=function(){var n=D.$viewValue;isNaN(n)?(D.$setValidity("time",!1),r.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')):(n&&($=n),H>$||$>k?(D.$setValidity("time",!1),e.invalidHours=!0,e.invalidMinutes=!0):p(),f())},e.showSpinners=angular.isDefined(i.showSpinners)?e.$parent.$eval(i.showSpinners):u.showSpinners,e.incrementHours=function(){e.noIncrementHours()||h(60*y*60)},e.decrementHours=function(){e.noDecrementHours()||h(60*-y*60)},e.incrementMinutes=function(){e.noIncrementMinutes()||h(60*b)},e.decrementMinutes=function(){e.noDecrementMinutes()||h(60*-b)},e.incrementSeconds=function(){e.noIncrementSeconds()||h(I)},e.decrementSeconds=function(){e.noDecrementSeconds()||h(-I)},e.toggleMeridian=function(){var n=a(),i=s();e.noToggleMeridian()||(angular.isDefined(n)&&angular.isDefined(i)?h(720*($.getHours()<12?60:-60)):e.meridian=e.meridian===S[0]?S[1]:S[0])},e.blur=function(){D.$setTouched()},e.$on("$destroy",function(){for(;g.length;)g.shift()()})}]).directive("uibTimepicker",["uibTimepickerConfig",function(e){return{require:["uibTimepicker","?^ngModel"],controller:"UibTimepickerController",controllerAs:"timepicker",replace:!0,scope:{},templateUrl:function(n,i){return i.templateUrl||e.templateUrl},link:function(e,n,i,t){var r=t[0],o=t[1];o&&r.init(o,n.find("input"))}}}]);