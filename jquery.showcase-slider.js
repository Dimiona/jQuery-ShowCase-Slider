/**
 * Showcase Slider is a jQuery slider plugin
 * 
 * @name: Showcase Slider
 * @type: jQuery
 * @author: (c) Tibor Pintér (Dimiona)
 * @version: 0.1.0
 * @developed: jQuery 1.10.2
 */
/**
 * Descriptions:
 * 
 */
;(function($){
    var isSlideChanging = false;
    $.fn.scSlider = function(options){

        var base = this;
        
        base.$el = $(this);
        base.el = this;
        base.scSlider = {};

        var scSliderData = base.$el.data("scSlider");
        
        base.scSlider.init = function(){
            //var options = {};

            base.scSlider.to = null;

            //options.sliderID = base.scSlider._uniq(6);
            base.scSlider.options = $.extend({},$.fn.scSlider.defaultOptions, options);

            if(base.scSlider.options.interval <= base.scSlider.options.duration){
                base.scSlider.options.interval = 5000;
            }

            if(base.scSlider.options.navigaton == true){
                if(!base.$el.find('.next').length){
                    base.$el.find('ul.slides').after('<div class="next"></div>');
                }
                if(!base.$el.find('.prev').length){
                    base.$el.find('ul.slides').after('<div class="prev"></div>');
                }

                base.$el.find('.next').on('click', function(){
                    if(isSlideChanging){ console.log('return false'); return false; }
                    isSlideChanging = true;
                    console.log('clicked next');

                    clearTimeout(base.scSlider.to);
                    var $list = base.$el.find("ul.slides > li");
                    var nextElement = ((base.scSlider.options.index+1) > ($list.length-1) ? 0 : (base.scSlider.options.index+1));
                    base.scSlider.slideshow(nextElement);
                });

                base.$el.find('.prev').on('click', function(){
                    if(isSlideChanging){ console.log('return false'); return false; }
                    isSlideChanging = true;
                    console.log('clicked prev');

                    clearTimeout(base.scSlider.to);
                    var $list = base.$el.find("ul.slides > li");
                    var prevElement = ((base.scSlider.options.index-1) < 0 ? ($list.length-1) : (base.scSlider.options.index-1));
                    base.scSlider.slideshow(prevElement);
                });
            }

            if(base.scSlider.options.pager == true){
                var $nav = base.$el.find('nav');
                if(!$nav.length){
                    base.$el.find('ul.slides').after('<nav class="showcase-pager"></nav>');
                    $nav = base.$el.find('nav');
                }

                $nav.html('');
                for(var i=0;i<=(base.$el.find("ul.slides > li").length-1);i++){
                    $nav.append('<span></span>');
                }
                $nav.find('span').eq(0).addClass('active');
            }

            base.scSlider.options.browser = base.scSlider._getBrowser();

            base.scSlider.slideshow();
        };

        base.scSlider.slideshow = function(navigatedTo){
            var $list = base.$el.find("ul.slides > li"),
                nextOne = (base.scSlider.options.index >= ($list.length-1) ? 0 : (base.scSlider.options.index+1)),
                transformsCount = (base.scSlider.transforms.length-1),
                cssTransformKey = base.scSlider.options.browser+"-transform";

            if(typeof navigatedTo != 'undefined'){
                nextOne = navigatedTo;
            }

            var currentElement = $list.eq(base.scSlider.options.index).css('opacity',1);
            var nextElement = $list.eq(nextOne).css('dispay','none').css('opacity',0).css(cssTransformKey, base.scSlider.transforms[(Math.floor(Math.random() * (transformsCount)) + 1)]);

            base.scSlider.to = setTimeout(function(){
                currentElement.css('opacity',0).css(cssTransformKey, base.scSlider.transforms[(Math.floor(Math.random() * (transformsCount)) + 1)]);
                base.$el.find('nav span.active').removeClass('active');
                base.$el.find('nav span').eq(nextOne).addClass('active');
                setTimeout(function(){
                    currentElement.css('dispay','none');
                    nextElement.css("display","list-item").css('opacity',1).css(cssTransformKey,""); //rotate(0) translate(0, 0) scale(1)

                    base.scSlider.options.index = (base.scSlider.options.index >= ($list.length-1) ? 0 : (base.scSlider.options.index+1));
                    clearTimeout(base.scSlider.to);
                    setTimeout(base.scSlider.slideshow,base.scSlider.options.duration);
                
                    if(typeof navigatedTo == 'undefined'){
                        isSlideChanging = false;
                    }
                },base.scSlider.options.duration);
            },(typeof navigatedTo == 'undefined' ? base.scSlider.options.interval : 0));
        }

        base.scSlider.transforms = [
            "translate(-50%, -90%) scale(0.8)", // Top left Zoom (+opacity 0)
            "translate(50%, -90%) scale(0.8)", // Top right Zoom (+opacity 0)
            "translate(-50%, 90%) scale(0.8)", // Bottom left Zoom (+opacity 0)
            "translate(50%, 90%) scale(0.8)", // Bottom right Zoom (+opacity 0)
            "rotate(90deg) translate(-200%, -90%) scale(0.8)", // Top left Rotate
            "rotate(-90deg) translate(200%, -90%) scale(0.8)", // Top right Rotate
            "rotate(-90deg) translate(-200%, -90%) scale(0.8)", // Bottom left Rotate
            "rotate(90deg) translate(200%, -90%) scale(0.8)" // Bottom right Rotate
        ];

        base.scSlider._getBrowser = function(){
            if(/mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase())){
                return 'moz';
            }else if(/webkit/.test(navigator.userAgent.toLowerCase())){
                return 'webkit';
            }else if(/opera/.test(navigator.userAgent.toLowerCase())){
                return 'o';
            }else if(/msie/.test(navigator.userAgent.toLowerCase())){
                return 'ms';
            }else{
                return null;
            }
        }

        base.scSlider._uniq = function(s){
            var n;
            if (typeof(s) == 'number' && s === parseInt(s, 10)){
                s = Array(s + 1).join('x');
            }
            return s.replace(/x/g, function(){
                var n = Math.round(Math.random() * 61) + 48;
                n = n > 57 ? (n + 7 > 90 ? n + 13 : n + 7) : n;
                return String.fromCharCode(n);
            });
        }

        return this.each(function() {
            base.$el.data("scSlider", base.scSlider);
            base.scSlider.init();
        });
    };
    
    $.fn.scSlider.defaultOptions = {
        interval : 5000,
        duration : 1500,
        autoplay : true,
        index : 0,
        navigaton : true,
        pager : false
    };
    
})(jQuery);