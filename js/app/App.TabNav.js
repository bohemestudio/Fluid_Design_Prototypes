/*
* Author: Miguel ARG
* http://bohemestudio.com
* Date: Aug 2013
*/

var App =  App || {};

App.TabNav = (function () {

    var scrollToTab = function(){
        jQuery('.tab-nav a').click(function(e){

            e.preventDefault();
            var selectedTab = jQuery(this).attr('href');
            console.log("SCROLL TO: ",selectedTab);
            $('html,body').scrollTo(selectedTab, selectedTab);
        });
    };

/*
    var stickNavOnTop = function(){

        var $window = jQuery(window);

        $window.scroll(function(){

            var $tabsMenu = jQuery('.tabs-menu');

            var windowScrolled = $window.scrollTop();
            var tabNavPosition =  $tabsMenu.offset().top;
            console.log(windowScrolled,tabNavPosition  );

            if (windowScrolled >= (tabNavPosition-20) ){
                console.log("Almost on top!");
                 $tabsMenu.addClass("stick");

            } else if (windowScrolled <= 370){
                console.log("Scrolling up");
                $tabsMenu.removeClass().addClass("tabs-menu");
            }

        });
    };
*/

    var removeCurrentTab = function(){
        jQuery('.tab').each(function(){

            var $thisTab = jQuery(this);

            var thisTabClass = $thisTab.attr("class");
            var thisTabNewClass = thisTabClass.replace("current", "");
            jQuery(this).removeClass().addClass(thisTabNewClass);
        });
    };


    var tabWaypoint = function(){

        jQuery('.tab').waypoint(function(direction) {
          removeCurrentTab();

          var $currentTab = jQuery(this);

          $currentTab.addClass('current');

          //Check if is first-tab or last-tab
          var currentTabClass = $currentTab.attr("class");

          if( currentTabClass.indexOf("first-tab") >= 0 ){
            //Display NAV arrow links
            jQuery(".tab-arrow-nav .prev").hide();


          }else if(currentTabClass.indexOf("last-tab") >= 0 ){
            //Hide NEXT link
            jQuery(".tab-arrow-nav .next").hide();
            jQuery(".tab-arrow-nav .prev").show();
          } else{
            //Display NAV arrow links
            jQuery(".tab-arrow-nav a").show();

          }

        });


        //Default
        var $window = jQuery(window);
        $window.scroll(function(){
            if($window.scrollTop() === 0){

                removeCurrentTab();
                jQuery("#tab1").addClass("current");

                //Hide PREV link
                jQuery(".tab-arrow-nav .prev").hide();
            }
        });
    };

    //Get the next tab
    var getNextTab = function(){
        var currentTabId = jQuery(".current").attr("id");
        var currentTabIndex = currentTabId.replace('tab','');

        var nextTabIndex = ++currentTabIndex;
        var nextTabId = "#tab"+nextTabIndex;

        return nextTabId;
    };

    //Get the prev tab
    var getPrevTab = function(){
        var currentTabId = jQuery(".current").attr("id");
        var currentTabIndex = currentTabId.replace('tab','');

        var prevTabIndex = --currentTabIndex;
        var prevTabId = "#tab"+prevTabIndex;

        return prevTabId;


    };


    var arrowNavigationTab = function(){
        jQuery(".tab-arrow-nav a").click(function(e){

            var $selectedLink = jQuery(this);
            var scrollToThis = 0;


            if ($selectedLink.attr("class") == "next"){
                //scrollTo the next one
                //console.log("go to next");
                var nextTabId = getNextTab();

                scrollToThis = jQuery(nextTabId).offset().top ;

                //Scroll to this layer
                jQuery('html, body').animate({scrollTop: scrollToThis}, 'slow');


            } else if ($selectedLink.attr("class") == "prev"){
                //scrollTo the prev one
                //console.log("go to prev");
                var prevTabId = getPrevTab();

                //Added -1 to update the current tab with waypoint
                scrollToThis = jQuery(prevTabId).offset().top - 1;

                //Scroll to this layer
                jQuery('html, body').animate({scrollTop: scrollToThis}, 'slow');

            }

            e.preventDefault();
        });

    };

    var init = function() {
        //initiate the module
        //stickNavOnTop();
        arrowNavigationTab();
        tabWaypoint();
    };

    return {
        init:init,
        scrollToTab:scrollToTab
    };

}());