angular.module("ui.bootstrap.demo").controller("PaginationDemoCtrl",function(e,t){e.totalItems=64,e.currentPage=4,e.setPage=function(t){e.currentPage=t},e.pageChanged=function(){t.log("Page changed to: "+e.currentPage)},e.maxSize=5,e.bigTotalItems=175,e.bigCurrentPage=1});