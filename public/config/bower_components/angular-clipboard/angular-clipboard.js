!function(e,o){"function"==typeof define&&define.amd?define(["angular"],o):"object"==typeof module&&module.exports?module.exports=o(require("angular")):e.angularClipboard=o(e.angular)}(this,function(e){return e.module("angular-clipboard",[]).factory("clipboard",["$document",function(e){function o(o){var t=e[0].createElement("textarea");return t.style.position="absolute",t.style.left="-10000px",t.textContent=o,t}function t(o){try{e[0].body.style.webkitUserSelect="initial";var t=e[0].getSelection();if(t.removeAllRanges(),o.select(),!e[0].execCommand("copy"))throw"failure copy";t.removeAllRanges()}finally{e[0].body.style.webkitUserSelect=""}}function n(n){var r=o(n);e[0].body.appendChild(r),t(r),e[0].body.removeChild(r)}return{copyText:n}}]).directive("clipboard",["clipboard",function(o){return{restrict:"A",scope:{onCopied:"&",onError:"&",text:"="},link:function(t,n){console.log(n),n.on("click",function(n){try{o.copyText(t.text),e.isFunction(t.onCopied)&&t.$evalAsync(t.onCopied())}catch(r){e.isFunction(t.onError)&&t.$evalAsync(t.onError({err:r}))}})}}}])});