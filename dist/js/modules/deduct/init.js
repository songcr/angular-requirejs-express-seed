define(["angular","js/config","js/modules/deduct/controllers/deductController","js/modules/deduct/services/deductService"],function(e,r,t,n){"use strict";var u=e.module("rwmgt.deduct",["ui.grid","ui.grid.pagination"]);return u.controller("deductController",t),u.service("deductService",n),u.filter("mapShoppingType",function(){var e={1:"升级",2:"消费",3:"充值"};return function(r){return r?e[r]:""}}),u.filter("mapPayflag",function(){var e={0:"未提现",1:"等待确认",2:"已支付",3:"拒绝支付"};return function(r){return r||0===r?e[r]:""}}),u});