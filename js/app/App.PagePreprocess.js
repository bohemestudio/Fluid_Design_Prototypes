/*
* Author: Miguel ARG
* http://bohemestudio.com
* Date: Aug 2013
*/

var App =  App || {};

App.PagePreprocess = (function () {

        var resizeTabsFullHeight = function(){

            var $viewport = jQuery(window);
            var windowHeight = $viewport.height();
            var windowWidth = $viewport.width();

            jQuery('.tab').each(function(){
                jQuery(this).height(windowHeight);

                centerContent(windowWidth, windowHeight, jQuery(this).find('.content'));

                var $youtubeBackground = jQuery(this).find('.youtube-background iframe');
                $youtubeBackground.height(windowHeight);
                // $youtubeBackground.width(windowWidth - 15);
                $youtubeBackground.width(windowWidth);

            });

        };

        var viewportResize = function(){

            var $viewportHeight = jQuery(window);

            $viewportHeight.resize(function() {
                resizeTabsFullHeight();
            });
        };

        var backgroundVideo = function(){
           // $('#tab1').tubular({videoId: 'd3mnjntYFDo'}); // where idOfYourVideo is the YouTube ID.
        };

        var centerContent = function(windowWidth, windowHeight, $contentTab){



            var contentTabWidth = $contentTab.width();
            var contentTabHeight = $contentTab.height();


            var positionLeft = parseInt(windowWidth/2, 10) - parseInt(contentTabWidth/2, 10);
            var positionTop = parseInt(windowHeight/2, 10) - parseInt(contentTabHeight/2, 10);

            $contentTab.css("position", "absolute");
            $contentTab.css("top", positionTop);
            $contentTab.css("left", positionLeft);


        };


    var init = function() {
        //initiate the module
        resizeTabsFullHeight();
        viewportResize();
        backgroundVideo();
    };

    return {
        init:init
    };

}());