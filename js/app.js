var App = App || {};

App.Misc = function() {
    var privateMethod = function() {};
    var publicMethod = function() {};
    var init = function() {};
    return {
        init: init,
        publicMethod: publicMethod
    };
}();

var App = App || {};

App.PagePreprocess = function() {
    var resizeTabsFullHeight = function() {
        var $viewport = jQuery(window);
        var windowHeight = $viewport.height();
        var windowWidth = $viewport.width();
        jQuery(".tab").each(function() {
            jQuery(this).height(windowHeight);
            centerContent(windowWidth, windowHeight, jQuery(this).find(".content"));
            var $youtubeBackground = jQuery(this).find(".youtube-background iframe");
            $youtubeBackground.height(windowHeight);
            $youtubeBackground.width(windowWidth);
        });
    };
    var viewportResize = function() {
        var $viewportHeight = jQuery(window);
        $viewportHeight.resize(function() {
            resizeTabsFullHeight();
        });
    };
    var backgroundVideo = function() {};
    var centerContent = function(windowWidth, windowHeight, $contentTab) {
        var contentTabWidth = $contentTab.width();
        var contentTabHeight = $contentTab.height();
        var positionLeft = parseInt(windowWidth / 2, 10) - parseInt(contentTabWidth / 2, 10);
        var positionTop = parseInt(windowHeight / 2, 10) - parseInt(contentTabHeight / 2, 10);
        $contentTab.css("position", "absolute");
        $contentTab.css("top", positionTop);
        $contentTab.css("left", positionLeft);
    };
    var init = function() {
        resizeTabsFullHeight();
        viewportResize();
        backgroundVideo();
    };
    return {
        init: init
    };
}();

var App = App || {};

App.TabNav = function() {
    var scrollToTab = function() {
        jQuery(".tab-nav a").click(function(e) {
            e.preventDefault();
            var selectedTab = jQuery(this).attr("href");
            console.log("SCROLL TO: ", selectedTab);
            $("html,body").scrollTo(selectedTab, selectedTab);
        });
    };
    var removeCurrentTab = function() {
        jQuery(".tab").each(function() {
            var $thisTab = jQuery(this);
            var thisTabClass = $thisTab.attr("class");
            var thisTabNewClass = thisTabClass.replace("current", "");
            jQuery(this).removeClass().addClass(thisTabNewClass);
        });
    };
    var tabWaypoint = function() {
        jQuery(".tab").waypoint(function(direction) {
            removeCurrentTab();
            var $currentTab = jQuery(this);
            $currentTab.addClass("current");
            var currentTabClass = $currentTab.attr("class");
            if (currentTabClass.indexOf("first-tab") >= 0) {
                jQuery(".tab-arrow-nav .prev").hide();
            } else if (currentTabClass.indexOf("last-tab") >= 0) {
                jQuery(".tab-arrow-nav .next").hide();
                jQuery(".tab-arrow-nav .prev").show();
            } else {
                jQuery(".tab-arrow-nav a").show();
            }
        });
        var $window = jQuery(window);
        $window.scroll(function() {
            if ($window.scrollTop() === 0) {
                removeCurrentTab();
                jQuery("#tab1").addClass("current");
                jQuery(".tab-arrow-nav .prev").hide();
            }
        });
    };
    var getNextTab = function() {
        var currentTabId = jQuery(".current").attr("id");
        var currentTabIndex = currentTabId.replace("tab", "");
        var nextTabIndex = ++currentTabIndex;
        var nextTabId = "#tab" + nextTabIndex;
        return nextTabId;
    };
    var getPrevTab = function() {
        var currentTabId = jQuery(".current").attr("id");
        var currentTabIndex = currentTabId.replace("tab", "");
        var prevTabIndex = --currentTabIndex;
        var prevTabId = "#tab" + prevTabIndex;
        return prevTabId;
    };
    var arrowNavigationTab = function() {
        jQuery(".tab-arrow-nav a").click(function(e) {
            var $selectedLink = jQuery(this);
            var scrollToThis = 0;
            if ($selectedLink.attr("class") == "next") {
                var nextTabId = getNextTab();
                scrollToThis = jQuery(nextTabId).offset().top;
                jQuery("html, body").animate({
                    scrollTop: scrollToThis
                }, "slow");
            } else if ($selectedLink.attr("class") == "prev") {
                var prevTabId = getPrevTab();
                scrollToThis = jQuery(prevTabId).offset().top - 1;
                jQuery("html, body").animate({
                    scrollTop: scrollToThis
                }, "slow");
            }
            e.preventDefault();
        });
    };
    var init = function() {
        arrowNavigationTab();
        tabWaypoint();
    };
    return {
        init: init,
        scrollToTab: scrollToTab
    };
}();

var App = App || {};

App.settings = {
    aSetting: true
};

App.init = function() {
    var router = {
        all: [ App.PagePreprocess.init ],
        index: [],
        product: [ App.TabNav.init, App.TabNav.scrollToTab ]
    };
    var currentPage = jQuery("body").attr("data-page");
    var modules = router.all;
    if (router[currentPage]) modules = modules.concat(router[currentPage]);
    jQuery.each(modules, function(index, module) {
        module.call();
    });
};

jQuery(function() {
    App.init();
});
//@ sourceMappingURL=app.map