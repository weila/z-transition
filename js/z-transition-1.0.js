(function ($) {
$.fn.zFrameAnimate = function(options){
/***默认的选项值***<Default option arguments!>***/
    var property = $.extend({
        'action': 'click',
        'style': 'preserve-3d',
        'origin': 'center',
        'perspective': '1000px',
        'perspectiveOrigin': 'center',
        'backfaceVisibility': 'visible',
        'transition':{
            'property': 'all',
            'duration': '.6s',
            'function': 'linear',
            'delay': '0'
        },
        'transform':{
            'translateZ': '',
            'translateY': '',
            'translateX': '',
            'translate3d': '',
            'translate': '',
            'scaleZ': '',
            'scaleY': '',
            'scaleX': '',
            'scale3d': '',
            'scale': '',
            'rotateZ': '',
            'rotateY': '',
            'rotateX': '',
            'rotate3d': '',
            'rotate': '',
            'skewY': '',
            'skewX': '',
            'skew': ''},
        'css':{
            'backgroundColor': '',
            'backgroundPosition': '',
            'borderBottomColor': '',
            'borderBottomWidth': '',
            'borderLeftColor': '',
            'borderLeftWidth': '',
            'borderRightColor': '',
            'borderRightWidth': '',
            'borderTopColor': '',
            'borderTopWidth': '',
            'bottom': '',
            'clip': '',
            'color': '',
            'fontSize': '',
            'fontWeight': '',
            'height': '',
            'left': '',
            'letterSpacing': '',
            'lineHeight': '',
            'marginBottom': '',
            'marginLeft': '',
            'marginRight': '',
            'marginTop': '',
            'maxHeight': '',
            'maxWidth': '',
            'minHeight': '',
            'minWidth': '',
            'opacity': '',
            'outlineColor': '',
            'outlineWidth': '',
            'paddingBottom': '',
            'paddingLeft': '',
            'paddingRight': '',
            'paddingTop': '',
            'right': '',
            'textIndent': '',
            'textShadow': '',
            'top': '',
            'verticalAlign': '',
            'visibility': '',
            'width': '',
            'wordSpacing': '',
            'zIndex': ''
        }
    }, options);
    var property = jQuery.extend(property,options);

/***Object.assign()方法polyfill函数***<Object.assign()'s polyfill>***/
    var oAssignPollyFill = function(){
    if (!Object.assign) {
      Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target, firstSource) {
          'use strict';
          if (target === undefined || target === null) {
            throw new TypeError('Cannot convert first argument to object');
          }

          var to = Object(target);
          for (var i = 1; i < arguments.length; i++) {
            var nextSource = arguments[i];
            if (nextSource === undefined || nextSource === null) {
              continue;
            }
            nextSource = Object(nextSource);

            var keysArray = Object.keys(Object(nextSource));
            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
              var nextKey = keysArray[nextIndex];
              var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
              if (desc !== undefined && desc.enumerable) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
          return to;
        }
      });
    }
    }

    return this.each(function(){
    var $this = $(this);

    $(document).ready(function(){
/******初始化元素状态***<Initial the object status>***/
        $($this).addClass("transition");
        var initArg = {"transition-property":property.transition.property,"transition-duration":property.transition.duration,"transition-timing-function":property.transition.function,"transition-delay":property.transition.delay,"transform-style":property.style,"transform-origin":property.origin,"perspective":property.perspective,"perspective-origin":property.perspectiveOrigin,"backface-visibility":property.backfaceVisibility};
        var initWkArg = {"-webkit-transition-property":property.transition.property,"-webkit-transition-duration":property.transition.duration,"-webkit-transition-timing-function":property.transition.function,"-webkit-transition-delay":property.transition.delay,"-webkit-transition-style":property.style,"-webkit-transform-origin":property.origin,"-webkit-perspective":property.perspective,"-webkit-perspective-origin":property.perspectiveOrigin,"-webkit-backface-visibility":property.backfaceVisibility};
        $(".z-frame .transition").css(initArg);
        $(".z-frame .transition").css(initWkArg);
    });
/******获得触发的事件类型***<Get the trigger event>***/
    if(property.action=="hover"){
        $($this).on("mouseenter",function(){
            playScript($this);
        });
        $($this).on("mouseleave",function(){
            resetScript($this);
        });
    }else if(property.action=="click"){
        $($this).on("click",function(){
            playScript($this);
        });
    }

/******Object.assign()是ES6方法，运行polyfill函数支持safari***<run polyfill because Object.assign() is a ES6 function>***/
        oAssignPollyFill();

/******运行“剧本”函数***<run <playScript>function>***/
/******1.取自定义参数值***<1.get custom argument>***/
/******2.转换字符串***<2.key-value pair transform to string>***/
/******3.整理字符串***<3.modify string>***/
/******4.拼接对象***<4.assign object>***/
/******5.设置style属性***<5.set style attribute>***/
    var playScript = function($this){
        var transformItem = property.transform;
        var cssItem = property.css;

/******删除null键值对***<Delete key-value pair which the value is of type Null & "">***/
//console.log("Before:", JSON.stringify(transform, null, 2));
//        Object.keys(transformItem).forEach(function(key) {
//          var value = transformItem[key];
//          if (value === "" || value === null) {
//            delete transformItem[key];
//          }
//        });
//console.log("After:", JSON.stringify(transform, null, 2));

/******将transform参数中键值对转换成字符串，以便修改成style能识别的内容***<{transform} key-value pair transform to a string for html style recognition>***/
        var transformList = JSON.stringify(property.transform);
        var cssList = property.css;
/******正则表达式重新整理字符串***<using regular expression edit string>***/
        transformList = transformList.replace(/\":\"/g,"(").replace(/\",/g,") ").replace(/\"/g,"").replace(/{/g,"").replace(/}/g,")");
/******拼接对象***<assign object>***/
        var transformObj = {'transform': transformList};
        var webkitTransformObj = {'-webkit-transform': transformList};
        var playlist = Object.assign(transformObj,webkitTransformObj,cssList);

        $($this).css(playlist);
    }

/******针对hover, focus等事件做一个复位的方法***<reset for the event such as hover, focus and so on>***/
var cssReset = {
       'backgroundColor': '',
       'backgroundPosition': '',
       'borderBottomColor': '',
       'borderBottomWidth': '',
       'borderLeftColor': '',
       'borderLeftWidth': '',
       'borderRightColor': '',
       'borderRightWidth': '',
       'borderTopColor': '',
       'borderTopWidth': '',
       'bottom': '',
       'clip': '',
       'color': '',
       'fontSize': '',
       'fontWeight': '',
       'height': '',
       'left': '',
       'letterSpacing': '',
       'lineHeight': '',
       'marginBottom': '',
       'marginLeft': '',
       'marginRight': '',
       'marginTop': '',
       'maxHeight': '',
       'maxWidth': '',
       'minHeight': '',
       'minWidth': '',
       'opacity': '',
       'outlineColor': '',
       'outlineWidth': '',
       'paddingBottom': '',
       'paddingLeft': '',
       'paddingRight': '',
       'paddingTop': '',
       'right': '',
       'textIndent': '',
       'textShadow': '',
       'top': '',
       'verticalAlign': '',
       'visibility': '',
       'width': '',
       'wordSpacing': '',
       'zIndex': ''
    };

    var resetTransform = {"transform":"none","-webkit-transform":"none"};
    var resetObj = Object.assign(resetTransform, cssReset);
    var resetScript = function($this){
        $($this).css(resetObj);
    }
});
}
})(jQuery);