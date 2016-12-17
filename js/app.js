// This file is a suggested starting place for your code.
// Note the reference that includes it in the index.html file.

/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers and logic of your application.



"use strict";


var slides = [];
var slidesData = [];
var currentID;
var cart = [];
var myPhotoBrowserPopupDark 
var product_info
var user = false

var toolbarT = '<div class="toolbar tabbar">\
    <div class="toolbar-inner">\
        <a href="#" class="link photo-browser-prev">\
            <i class="fa fa-chevron-left"></i>\
        </a>\
        <a href="#" class="link photo-browser-next">\
            <i class="fa fa-chevron-right"></i>\
        </a>\
    </div>\
</div>';


var cartItem = function(){
        this.product = ''
        this.qty = 1
        this.pack = ''
        this.um = ''
        this.mis = ''
        this.id = 0
        this.image = ''
        this.price = 0
}
 
$(document).ready ( function(){
    myApp.modalTitle = settings[0].name 
    $('.app-logo').attr('src',settings[0].logo)
    $('body').delegate ( '.login-screen' , 'click' , function(){
        myApp.closeModal()
    })
   
    $('body').delegate ( '#btn-home' , 'click' , function(){
        activate_subpage('#home')
        myApp.closePanel()  
    })

    
   $('body').delegate ( '#btn-menu' , 'click' , function(){
        myApp.openPanel('right')
    })
    
    $('body').delegate ( '.btn-info' , 'click' , function(){
        myApp.popup('.popup-info');
    })

    $('body').delegate ( '.btn-cart' , 'click' , function(){
        myApp.closePanel()
        doRenderCart()
        activate_subpage('#cart')
    })
    
    
    $('body').delegate ( '.btn-add-to-cart' , 'click' , function(){
        if ( sessionStorage.getItem('moodshopper-cart') ){
            cart = JSON.parse(sessionStorage.getItem('moodshopper-cart'))
        } 
        
        var obj = new cartItem()
        obj.product = slidesData[currentID].product_name
        obj.qty = 1
        obj.pack = slidesData[currentID].product_package
        obj.um = slidesData[currentID].product_um
        obj.mis = slidesData[currentID].product_qty
        obj.id = slidesData[currentID].product_id
        obj.image = slidesData[currentID].product_image_url
        obj.price = slidesData[currentID].product_price
        obj.discount = slidesData[currentID].product_discount
        if ( slidesData[currentID].product_discount != 0 ){
            obj.price = slidesData[currentID].product_discount
        }
        cart.push ( obj )
        sessionStorage.setItem('moodshopper-cart',JSON.stringify(cart))
        
        $('.speed-dial').removeClass('speed-dial-opened')
         myApp.addNotification({
            closeOnClick: true,
            closeIcon: false,
            hold:2000,
            title: 'Shopping Cart',
            message: 'Product has been added to cart'
        })
        myApp.confirm("Goto cart?",settings[0].name,function(){
            myPhotoBrowserPopupDark.close()
            doRenderCart()
            activate_subpage('#cart')
        })
        
        console.log ( cart );
    })
    
    $('body').delegate ( '.btn-qty-add' , 'click' , function(){
        doAddItemQty($(this).data('id'))
    })

    $('body').delegate ( '.btn-qty-minus' , 'click' , function(){
        doMinusItemQty($(this).data('id'))
    })  
    
     $('body').delegate ( '.btn-remove-item' , 'click' , function(){
        doRemoveCartItem($(this).data('id'))
    })      
    
    $('body').delegate ( '.btn-coupon' , 'click' , function(){
        doCoupon()
    })
    
    $('body').delegate ( '.btn-order-shipment' , 'click' , function(){
        activate_subpage("#shipment")
    })
    
    $('body').delegate ( '.btn-pay-order' , 'click' , function(){
        if ( !user ){
            activate_subpage("#login")
        }
    })
    
    $('body').delegate ( '.btn-close-panel' , 'click' , function(){
        myApp.closePanel()
    })
    doCategories(categories)
    
    $('body').delegate('.swiper-slide-categories' , 'click' , function(){
         if ( $(this).data('id') > categories.length ){
            var i = 0;
        } else {
            var i = $(this).data('id');
        }
        console.log ( categories[i].id )
        console.log ( categories[i].name )
        doGetProducts( categories[i].id )
    })

})

function doCategories(categories){
    myApp.showPreloader('attendere')
    var attiva = "swiper-slide-active swiper-active";
    var n = 0;
    $.each ( categories , function ( key , value ){
        swiperCat.appendSlide ( '<div class="swiper-slide swiper-slide-categories ' + attiva + '" data-id="' + n + '"><img src="' + value.image + '" class="splash-center" style="width:100%;height:auto"></div>' )
        attiva = ''
        n++
    })
    $('.slide-tile').html ( categories[0].name )
    swiperCat.slideNext()
    myApp.hidePreloader()
}

function doProducts(id){
    var attiva = "swiper-slide-active swiper-active";
    $.each ( products , function ( key , value ){
        if ( value.product-category-id == id ){
            swiperProducts.appendSlide ( '<div class="swiper-slide ' + attiva + '"><img src="' + value.product-image-url + '" class="splash-center" style="height:80%;width:auto;"><div class="slide-caption">' + value.product-name  + '</div>' )
            attiva = ''
        }
    })
    mainView.hideNavbar()
    activate_subpage("#products") 
    swiperProducts.slideNext()
}

function doGetProducts(id){
    
    slides = [];
    slidesData = [];

    $.each ( products , function ( key , product) {
        
        if ( product.product_category_id == id ){

            var prodotto = product.product_name;
            var sconto = product.product_discount;
            
            slides.push ( { 'url' : product.product_image_url , 'caption' : prodotto  });
            
            slidesData.push( product );
        }
    });

    
        myPhotoBrowserPopupDark = myApp.photoBrowser({
            photos: slides,
            zoom: true,
            maxZoom: 1,
            minZoom: 3,
            lazyLoadingInPrevNext: true,
            theme: 'dark',
            backLinkText: 'Back',
            toolbar: true,
            type: 'standalone',
            preventClicks: true,
            ofText: '/',
            toolbarTemplate: toolbarT,
            loop: true,
            onSlideChangeEnd: function ( swiper ){
                $('.floating-prezzo').removeClass('hidden')
                var i = 0
                if ( swiper.activeIndex > slides.length ){
                    i = 0;
                } else {
                    if ( swiper.activeIndex > 0 ){
                        i = swiper.activeIndex-1;    
                    } else {
                        i = slides.length-1
                    }
                }
                currentID = i;
                $('.prezzo-item').html ( "&euro; " + slidesData[i].product_price.toFixed(2) )
                $('.popup-content').html('<p><h3>' + slidesData[i].product_name + '</h3><p>' + slidesData[i].product_qty  + ' ' + slidesData[i].product_package + ' '  + slidesData[i].product_um + '</p>' + slidesData[i].product_description + '</p>')
            },
            onClose: function (swiper){
                $('.floating-prezzo').addClass('hidden')
                $('.floating-info').addClass('hidden')
                $('.speed-dial').removeClass('speed-dial-opened')
            }
            
        });
    $('.floating-prezzo').removeClass('hidden')
    $('.floating-info').removeClass('hidden')
    $('.prezzo-item').html ( "&euro; " + slidesData[0].product_price.toFixed(2) )            
    myPhotoBrowserPopupDark.open();
    
}

function doRenderCart (){
    $('#cart-items').html('');
    var n = 0;
    var items = JSON.parse ( sessionStorage.getItem('moodshopper-cart') );
    var totale = 0;
    var qty = 0
    var sconto = settings[0].discount
    var order_sconto = 0
    
    $.each ( items , function ( key , value ){
        totale += value.qty*value.price
        qty += value.qty
        $('#cart-items').append ( '\
            <li class="swipeout table-items">\
                <div class="swipeout-content item-content ">\
                    <div class="item-media">\
                           <span class="badge item-qty_' + n + '" data-qty="' + value.qty + '" data-price="' + value.price + '" style="font-size:1.2em">' + value.qty + '</span>\
                    </div>\
                    <div class="item-inner">\
                        <div class="item-title" style="width:50%"><span style="font-size:1.3em">' + value.product + '</span></div>\
                        <div class="item-after"><span class="item-total_' + n + '" style="font-size:1.2em">' + (value.price*value.qty).toFixed(2) + '</span></div>\
                    </div>\
                </div>\
                <div class="swipeout-actions-right item-content">\
                <a href="#" class="item-title cart-btn link btn-qty-add" data-id="' + n + '" data-qty="' + value.qty + '"><span class="fa fa-plus"></span></a>\
                <a href="#" class="item-title cart-btn link btn-qty-minus" data-id="' + n + '" data-qty="' + value.qty + '"><span class="fa fa-minus"></span></a>\
                <a href="#" class="item-title cart-btn link btn-remove-item" data-id="' + n + '"><span class="fa fa-trash"></span></a>\
                </div>\
            </li>\
        ');
        n++;
    });
    var spedizione = Math.ceil(qty/6)*8
    var order_total = totale + spedizione
    if ( sconto > 0 ){
        order_sconto = (totale*sconto)/100
        order_total = totale - order_sconto + spedizione
    }
    $('#cart-items').append ( '\
        <li class="cart-totals">\
                <div class="swipeout-content item-content ">\
                    <div class="item-inner">\
                        <div class="item-title" style="width:50%"><span style="font-size:1.3em">TOTAL</span></div>\
                        <div class="item-after"><span class="badge cart-total" style="font-size:1.2em">' + totale.toFixed(2) + '</span></div>\
                    </div>\
                </div>\
        </li>\
        <li class="cart-totals">\
                <div class="swipeout-content item-content ">\
                    <div class="item-inner">\
                        <div class="item-title" style="width:50%"><span style="font-size:1.3em">SHIPPING</span></div>\
                        <div class="item-after"><span class="badge cart-spedizione"  style="font-size:1.2em">' + spedizione.toFixed(2) + '</span></div>\
                    </div>\
                </div>\
        </li>\
        <li class="cart-totals">\
                <div class="swipeout-content item-content ">\
                    <div class="item-inner">\
                        <div class="item-title"><span class="button button-flat button-fill btn-coupon" style="font-size:1.3em">COUPON</span></div>\
                        <div class="item-after"><span class="badge cart-coupon" style="font-size:1.2em">' + order_sconto.toFixed(2) + '</span></div>\
                    </div>\
                </div>\
        </li>\
        <li class="cart-totals">\
                <div class="swipeout-content item-content ">\
                    <div class="item-inner">\
                        <div class="item-title" style="width:50%"><span style="font-size:1.3em">TOTAL ' + settings[0].currency + '</span></div>\
                        <div class="item-after"><span class="badge order-total" style="font-size:1.4em">' + order_total.toFixed(2) + '</span></div>\
                    </div>\
                </div>\
        </li>\
    ');
    if ( sconto > 0 ){
        $('#cart-items').append ( '\
            <li class="cart-totals">\
                <div class="swipeout-content item-content ">\
                    <div class="item-inner">\
                    ' + sconto + '% discount on all orders\
                    </div>\
                </div>\
            </li>\
        ')
    }
    $('#cart-items').append('\
        <li class="cart-pay">\
                <div class="item-content ">\
                    <div class="item-inner">\
                        <div class="item-title" style="width:100%;text-align:center"><span class="button button-flat button-fill btn-order-shipment" style="font-size:1.3em">BUY    </span></div>\
                    </div>\
                </div>\
        </li>\
    ')

}

function doAddItemQty(id){
    cart = JSON.parse(sessionStorage.getItem('moodshopper-cart'))
    var qty = parseInt(cart[id].qty)
    qty++
    cart[id].qty = qty
    sessionStorage.setItem('moodshopper-cart',JSON.stringify(cart))
    doRenderCart()
}

function doMinusItemQty(id){
    cart = JSON.parse(sessionStorage.getItem('moodshopper-cart'))
    var qty = parseInt(cart[id].qty)
    if ( qty > 1 ){
        qty--
        cart[id].qty = qty
        sessionStorage.setItem('moodshopper-cart',JSON.stringify(cart))
        doRenderCart()
    }
}

function doRemoveCartItem(id){
    cart = JSON.parse(sessionStorage.getItem('moodshopper-cart'))
    cart.splice(id,1)
    sessionStorage.setItem('moodshopper-cart',JSON.stringify(cart))
    doRenderCart()
}


function doCoupon(){
    myApp.prompt ( "Inserisci il codice coupon" , function(coupon){
        myApp.alert("Coupon inserito " + coupon)
    })
}

function doAbout(){
    /*console.log ('create swiper about')
    var attiva = "swiper-slide-active swiper-active";
    var n = 0;
    $.each ( about , function ( key , value ){
        swiperAbout.appendSlide ( '<div class="swiper-slide-content swiper-slide  ' + attiva + '" data-id="' + n + '"><img src="' + value.url + '" class="splash-center" style="width:100%;height:auto"></div>' )
        attiva = ''
        n++
    })
    swiperAbout.slideNext()*/  
    myApp.closePanel()
}