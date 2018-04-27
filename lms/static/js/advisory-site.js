(function(require) {
    'use strict';
    require(['edx-ui-toolkit/js/utils/html-utils'], function(HtmlUtils) {
        function addSlider() {
            var isMobileResolution = $(window).width() < 768,
                sliderExists = $('.advisory-list').hasClass('slick-slider');
            $('.advisory-list').toggleClass('slidable', isMobileResolution);
            if (isMobileResolution) {
                if (!sliderExists) {
                    $('.advisory-list').find('.advisory-list-item').removeClass('col col-4');
                    $('.slidable').slick({
                        nextArrow: '<i class="fa fa-angle-right"></i>',
                        prevArrow: '<i class="fa fa-angle-left"></i>'
                    });
                }
            } else {
                HtmlUtils.setHtml('.advisory-container', HtmlUtils.HTML($('#advisory-content').html()));
            }
        }


        $(function() {
            HtmlUtils.setHtml('.advisory-container', HtmlUtils.HTML($('#advisory-content').html()));
            addSlider();
        });

        $(window).resize(function() {
            addSlider();
        });
    });
}).call(this, require || RequireJS.require);
