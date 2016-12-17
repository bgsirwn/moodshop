/*global Framework7, Dom7 */
// Initialize your app
var myApp = new Framework7({
    modalTitle : settings.name,
    material: true,
    notificationCloseButtonText: ''
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

var swiperCat = new Swiper('.swiper-categories', {
    pagination:'.swiper-categories .swiper-pagination',
    preloadImages: false,
    lazyLoading: false,
    loop: true,
    direction: 'horizontal',
    initialSlide: 0,
    autoHeight: true
});

swiperCat.on('onClickIndex',function(){
        if ( this.activeIndex > categories.length ){
            var i = 0;
        } else {
            var i = swiper.activeIndex-1;
        }
        console.log ( i )
        console.log ( categories[i].id_categoria )
        console.log ( categories[i].categoria )
        doGetProducts( categories[i].id_categoria )
})

swiperCat.on('onSlideChangeEnd',function(swiper){
        if ( swiper.activeIndex > categories.length ){
            var i = 0;
        } else {
            if ( swiper.activeIndex < 1 ){
                var i = categories.length - 1;    
            } else {
                var i = swiper.activeIndex-1;
            }
        }
        console.log ( categories )
        console.log ( swiper.activeIndex )
        $('.slide-title').html ( categories[i].name )
})

var swiperProducts = myApp.swiper('.swiper-products', {
    pagination:'.swiper-products .swiper-pagination',
    preloadImages: true,
    lazyLoading: false,
    loop: true,
    effect: 'fade',
    direction: 'horizontal',
    onClick: function ( swiper , event ){
        console.log ( swiper.activeIndex )
    },
    onClose : function(swiper){
        $('.speed-dial').removeClass('speed-dial-opened')
    }
});


