//-----------------------------------------------------------------
//　kv
//-----------------------------------------------------------------



$(window).on('load', function(){




setTimeout( function() {
$('.home .home_kv .title .line span').animate({"bottom": "0"}, 900,'easeInOutQuad');
}, 1 );



setTimeout( function() {
$('.load_icon').animate({"top": "0px","opacity": "0"}, 900,'easeInOutQuart');
}, 1600 );



setTimeout( function() {
$('.home .navi_contact').animate({"opacity": "1","top": "0"}, 1200,'easeInOutQuart');
$('.home .site_logo').animate({"opacity": "1","top": "0"}, 1200,'easeInOutQuart');
$('.home .home_kv .enter').animate({"opacity": "1","bottom": "0"}, 1200,'easeInOutQuart');
$('.home .site_logo').animate({"opacity": "1"}, 900,'easeInOutQuart');
}, 1800 );



//カテゴリトップ

setTimeout( function() {
$('.home_kv .cate_title span.title_s').addClass('load');
}, 1200 );

setTimeout( function() {
$('.home_kv .title .title_xl .line span').animate({"bottom": "0"}, 900,'easeInOutQuad');
$('.home_kv .title .title_s .line span').animate({"bottom": "0"}, 900,'easeInOutQuad');
}, 1400 );

//カテゴリトップ









//スマホ切り分け




var w = $(window).width();

if(w > 770){

setTimeout( function() {
$('.home .home_kv .title').animate({"bottom": "154px"}, 1200,'easeInOutQuart');
}, 1600 );


} else if(w < 769) {


setTimeout( function() {
$('.home .home_kv .title').animate({"bottom": "100px"}, 1200,'easeInOutQuart');
}, 1600 );

setTimeout( function() {
$('.home .toggle').animate({"top": "0"}, 1200,'easeInOutQuart');
}, 1800 );


}
















setTimeout( function() {
$('.kv01').removeClass("blur");
$('.kv01').animate({"opacity": "1"}, 1400,'easeOutQuad');
$('.kv_list01').css({transform:'scale(1)'}).animate({scale:'1.03'},5000,'easeOutSine');
}, 2000 );







setTimeout( function() {
    setTimeout('rect()'); 
}, 2900 );


});




function rect() {


setTimeout( function() {
$('.kv01').addClass("blur");
$('.kv01').animate({"opacity": "1"}, 1000,'easeOutQuad');
}, 5000 );



setTimeout( function() {
$('.kv02').removeClass("blur");
$('.kv02').animate({"opacity": "1"}, 1000,'easeOutQuad');
$('.kv_list02').css({transform:'scale(1)'}).animate({scale:'1.03'},5000,'easeOutSine');
$('.kv_list03').css({transform:'scale(1)'}).animate({scale:'1'},10,'');
}, 6500 );



setTimeout( function() {
$('.kv01').css("z-index","10");
$('.kv02').css("z-index","20");
}, 7000 );

setTimeout( function() {
$('.kv02').addClass("blur");
$('.kv02').animate({"opacity": "1"}, 1000,'easeOutQuad');
}, 12000 );



setTimeout( function() {
$('.kv03').removeClass("blur");
$('.kv03').animate({"opacity": "1"}, 1000,'easeOutQuad');
$('.kv_list03').css({transform:'scale(1)'}).animate({scale:'1.03'},5000,'easeOutSine');
$('.kv_list01').css({transform:'scale(1)'}).animate({scale:'1'},10,'');
}, 13500 );


setTimeout( function() {
$('.kv02').css("z-index","10");
$('.kv03').css("z-index","20");
}, 14000 );


setTimeout( function() {
$('.kv03').addClass("blur");
$('.kv03').animate({"opacity": "1"}, 1000,'easeOutQuad');
}, 19000 );


setTimeout( function() {
$('.kv01').removeClass("blur");
$('.kv01').animate({"opacity": "1"}, 1000,'easeOutQuad');
$('.kv_list01').css({transform:'scale(1)'}).animate({scale:'1.03'},5000,'easeOutSine');
$('.kv_list02').css({transform:'scale(1)'}).animate({scale:'1'},10,'');
}, 20500 );

setTimeout( function() {
$('.kv03').css("z-index","10");
$('.kv01').css("z-index","20");
}, 21999 );

setTimeout('rect()', 22000); 
}