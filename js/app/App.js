/*
* Author: Miguel ARG
* http://bohemestudio.com
* Date: Aug 2013
*/

var App = App || {};


App.settings = {
    aSetting: true
};


App.init = function() {

    var router = {
        all: [
            App.PagePreprocess.init
        ],
        index: [
            //module methods to run on page "index"
        ],

        product: [
            App.TabNav.init,
            App.TabNav.scrollToTab
        ]
    };


    var currentPage = jQuery('body').attr('data-page');

    var modules = router.all;

    if(router[currentPage])
        modules = modules.concat(router[currentPage]);

    jQuery.each(modules, function(index, module) {
        module.call();

    });


};


jQuery(function() {
    App.init();
});
