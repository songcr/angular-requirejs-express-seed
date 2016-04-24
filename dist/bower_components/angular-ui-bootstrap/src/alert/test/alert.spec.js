describe("uib-alert",function(){function e(){return o(s)(a),a.$digest(),s.find(".alert")}function t(e){return s.find(".close").eq(e)}function l(e){return s.find("div[ng-transclude] span").eq(e)}var s,a,o,i,r;beforeEach(module("ui.bootstrap.alert")),beforeEach(module("uib/template/alert/alert.html")),beforeEach(inject(function(e,t,l,n){a=e,o=t,i=l,r=n,s=angular.element('<div><uib-alert ng-repeat="alert in alerts" type="{{alert.type}}"close="removeAlert($index)">{{alert.msg}}</uib-alert></div>'),a.alerts=[{msg:"foo",type:"success"},{msg:"bar",type:"error"},{msg:"baz"}]})),it("should expose the controller to the view",function(){i.put("uib/template/alert/alert.html","<div>{{alert.text}}</div>"),s=o("<uib-alert></uib-alert>")(a),a.$digest();var e=s.controller("uib-alert");expect(e).toBeDefined(),e.text="foo",a.$digest(),expect(s.html()).toBe("foo")}),it("should support custom templates",function(){i.put("foo/bar.html","<div>baz</div>"),s=o('<uib-alert template-url="foo/bar.html"></uib-alert>')(a),a.$digest(),expect(s.html()).toBe("baz")}),it("should generate alerts using ng-repeat",function(){var t=e();expect(t.length).toEqual(3)}),it("should use correct classes for different alert types",function(){var t=e();expect(t.eq(0)).toHaveClass("alert-success"),expect(t.eq(1)).toHaveClass("alert-error"),expect(t.eq(2)).toHaveClass("alert-warning")}),it("should respect alert type binding",function(){var t=e();expect(t.eq(0)).toHaveClass("alert-success"),a.alerts[0].type="error",a.$digest(),expect(t.eq(0)).toHaveClass("alert-error")}),it("should show the alert content",function(){for(var t=e(),s=0,o=t.length;o>s;s++)expect(l(s).text()).toBe(a.alerts[s].msg)}),it("should show close buttons and have the dismissible class",function(){for(var l=e(),s=0,a=l.length;a>s;s++)expect(t(s).css("display")).not.toBe("none"),expect(l.eq(s)).toHaveClass("alert-dismissible")}),it("should fire callback when closed",function(){e();a.$apply(function(){a.removeAlert=jasmine.createSpy()}),expect(t(0).css("display")).not.toBe("none"),t(1).click(),expect(a.removeAlert).toHaveBeenCalledWith(1)}),it("should not show close button and have the dismissible class if no close callback specified",function(){s=o("<uib-alert>No close</uib-alert>")(a),a.$digest(),expect(t(0)).toBeHidden(),expect(s).not.toHaveClass("alert-dismissible")}),it("should be possible to add additional classes for alert",function(){var e=o('<uib-alert class="alert-block" type="info">Default alert!</uib-alert>')(a);a.$digest(),expect(e).toHaveClass("alert-block"),expect(e).toHaveClass("alert-info")}),it("should close automatically if dismiss-on-timeout is defined on the element",function(){a.removeAlert=jasmine.createSpy(),o('<uib-alert close="removeAlert()" dismiss-on-timeout="500">Default alert!</uib-alert>')(a),a.$digest(),r.flush(),expect(a.removeAlert).toHaveBeenCalled()}),it("should not close immediately with a dynamic dismiss-on-timeout",function(){a.removeAlert=jasmine.createSpy(),a.dismissTime=500,o('<uib-alert close="removeAlert()" dismiss-on-timeout="{{dismissTime}}">Default alert!</uib-alert>')(a),a.$digest(),r.flush(100),expect(a.removeAlert).not.toHaveBeenCalled(),r.flush(500),expect(a.removeAlert).toHaveBeenCalled()})});