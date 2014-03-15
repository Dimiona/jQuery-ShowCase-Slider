jQuery-ShowCase-Slider
======================
HTML:
-----
<div id="showcase-slider" class="showcase-container">
    <div class="chartbg"></div>
    <ul class="slides">
        <li>
            <article class="clearfix">SOME CONTENT GOES HERE..</article>
        </li>
        <li>
            <article class="clearfix">..AND HERE</article>
        </li>
    </ul>
</div>
-----

JAVASCRIPT:
-----------
<script>
    (function($){
        $(document).ready(function(){
            $('.showcase-container').scSlider();
        });
    })(jQuery);
</script>