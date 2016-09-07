(function ($) {
$.fn.zFrameAnimate = function(options){
/***默认的选项值***<Default option arguments!>***/
    var property = $.extend({
        'action': 'click',
        'toggler': 'self',/******设置toggler初始状态，用户没有设定toggler和starter的情况下，toggler起作用<initial toggler value, if neither 'toggler' nor 'starter' has a custom value, toggle works!>***/
        'starter': '',
        'reseter': '',
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
        'transform':{},
        'css':{}
    }, options);

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

/******创建有控制权的对象***<creat a controller object>***/
    var commander;
    var commanderToggler = property.toggler;
    var starter;
    var commanderStarter = property.starter;

    if (commanderStarter == "self"){
        $starter = jQuery.extend({}, $this);
    }else if(commanderStarter !="" && property.toggler != null){
        $starter = $(commanderStarter);
    }

    if (commanderToggler == "self"){
        $commander = jQuery.extend({}, $this);
    }else if(commanderToggler !="" && property.toggler != null){
        $commander = $(commanderToggler);
    }

/******获得触发的事件类型***<Get the event>***/
/******事件绑定***<event is binded on a controller>***/
/******先判断starter，没有自定义值再判断toggler,两个都没有采用toggle初始值<Determine 'starter' value first, then determine 'toggler', if neither 'starter' nor 'toggler' has a custom value, 'toggler' initial value works!>***/
if(commanderStarter !="" && commanderStarter != null){
    var togglerStatus = 0;
    if(property.action=="hover"){
        $($starter).on("mouseenter",function(){
            playScript($this);
        });
        $($starter).on("mouseleave",function(){
            resetScript($this);
        });
    }else if(property.action=="focus"){
        $($starter).on("focusin",function(){
            playScript($this);
        });
        $($starter).on("focusout",function(){
            resetScript($this);
        });
    }else if(property.action=="click"){
        $($starter).on("click",function(){
            if(togglerStatus == 0){
                playScript($this);
                togglerStatus = 1;
            }else{
                resetScript($this);
                togglerStatus = 0;
            }
        });
    }else if(property.action=="dblclick"){
        $($starter).on("dblclick",function(){
            if(togglerStatus == 0){
                playScript($this);
                togglerStatus = 1;
            }else{
                resetScript($this);
                togglerStatus = 0;
            }
        });
    }else if(property.action=="mousemove"){
        $(window).on("mousemove",function(){
            playScript($this);
        });
    }else if(property.action=="change"){
        $($starter).on("change",function(){
            playScript($this);
        });
    }else if(property.action=="load"){
        $(window).load(function(){
            playScript($this);
        });
    }else if(property.action=="scroll"){
            $(window).scroll(function (){
                playScript($this);
            });
    }else{
        alert("The action: '" + property.action + "' is not supported!");
    }
}else if(commanderToggler !="" && commanderToggler != null){
    var togglerStatus = 0;
    if(property.action=="hover"){
        $($commander).on("mouseenter",function(){
            playScript($this);
        });
        $($commander).on("mouseleave",function(){
            resetScript($this);
        });
    }else if(property.action=="focus"){
        $($commander).on("focusin",function(){
            playScript($this);
        });
        $($commander).on("focusout",function(){
            resetScript($this);
        });
    }else if(property.action=="click"){
        $($commander).on("click",function(){
            if(togglerStatus == 0){
                playScript($this);
                togglerStatus = 1;
            }else{
                resetScript($this);
                togglerStatus = 0;
            }
        });
    }else if(property.action=="dblclick"){
        $($commander).on("dblclick",function(){
            if(togglerStatus == 0){
                playScript($this);
                togglerStatus = 1;
            }else{
                resetScript($this);
                togglerStatus = 0;
            }
        });
    }else if(property.action=="mousemove"){
        $(window).on("mousemove",function(){
            playScript($this);
        });
    }else if(property.action=="change"){
        $($commander).on("change",function(){
            playScript($this);
        });
    }else if(property.action=="load"){
        $(window).load(function(){
            playScript($this);
        });
    }else if(property.action=="scroll"){
            $(window).scroll(function (){
                playScript($this);
            });
    }else{
        alert("The action: '" + property.action + "' is not supported!");
    }
}
/******创建复位的对象***<creat a reset object>***/
    var reseterButton;
    var reseterName = property.reseter;
    if(reseterName != "" && reseterName != null){
        $reseterButton = $(reseterName);
        $($reseterButton).on("click",function(){
            resetScript($this);
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
    var resetScript = function($this){
    /******完整复制一个css对象并删除其值***clone the css object include it's child object and delete value***/
    var cssItem = jQuery.extend(true, {}, property.css);
    //console.log("Before:", JSON.stringify(cssItem, null, 2));
            Object.keys(cssItem).forEach(function(key) {
              var value = cssItem[key];
              if (value !== "" || value !== null) {
                cssItem[key] = "";
              }
            });
    //console.log("After:", JSON.stringify(cssItem, null, 2));
        var cssReset = cssItem;
        var resetTransform = {"transform":"none","-webkit-transform":"none"};
        var resetObj = Object.assign(resetTransform, cssReset);

        $($this).css(resetObj);
    }
});
}
})(jQuery);