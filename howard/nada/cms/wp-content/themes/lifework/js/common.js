
jQuery(document).ready(function(){
  $('.global_navi li.navi_about').addClass('load');
  $('.global_navi li.navi_project').addClass('load');
  $('.global_navi li.navi_solution').addClass('load');
  $('.loading').animate({"opacity": "0"}, 600,'easeOutCubic');
});

$(window).on('load', function(){
  $('.global_navi li.navi_about').removeClass('load');
  $('.global_navi li.navi_project').removeClass('load');
  $('.global_navi li.navi_solution').removeClass('load');
  
});





//-----------------------------------------------------------------
//　画面遷移
//-----------------------------------------------------------------





 
 window.addEventListener("pageshow", function(event){
  if (event.persisted) {
    // ここにキャッシュ有効時の処理を書く
    
    window.location.reload();
  }
});




$(function(){
$("a").on('click', function(){
   var linkUrl = $(this).attr('href');
   var linktype = $(this).attr('target');

 if ( linkUrl.indexOf('#') == -1 && linktype !== '_blank'
 // && e.metaKey || e.altKey || e.shiftKey || e.which > 1
 ){
	event.preventDefault();


	$('.loading').css("display","block");
	$('.link_fade').animate({"opacity": "1"}, 600,'easeOutCubic');
	   function action() {
     location.href = linkUrl;
 
     // ここにリンク先への移動直後に実行する内容を記述
     //  （ページ内アンカーリンクなど画面が遷移しない場合に）
   }
   setTimeout(action,600);
   
   }
   
 });
});






//-----------------------------------------------------------------
//　スマホのハンバーガの動き
//-----------------------------------------------------------------








//スマホのハンバーガの動き

$(document).ready(function(){


$(function(){
$(".toggle").on("click", function() {




$(this).toggleClass("active");
$("#menu").toggleClass("visible");
});



});




});

//-----------------------------------------------------------------
//　スクロールエフェクト
//-----------------------------------------------------------------


$(window).on('load', function(){

$('.load_img').each(function(){
var imgPos = $(this).offset().top;    
var scroll = $(window).scrollTop();
var windowHeight = $(window).height();
if (scroll > imgPos - windowHeight + 0){

$(this).addClass('load');

} 
});
});




$(window).scroll(function (){

$('.load_img').each(function(){
var imgPos = $(this).offset().top;    
var scroll = $(window).scrollTop();
var windowHeight = $(window).height();
if (scroll > imgPos - windowHeight + 100){

$(this).addClass('load');

} 
});
});







$(window).scroll(function (){

$('.solution li .img').each(function(){
var imgPos2 = $(this).offset().top;    
var scroll2 = $(window).scrollTop();
var windowHeight2 = $(window).height();
if (scroll2 > imgPos2 - windowHeight2 + 100){

$(this).find('img').animate({"width": "100%","opacity": "1",}, 300,'easeOutQuint');






} 
});
});




//-----------------------------------------------------------------
//　ページトップボタン
//-----------------------------------------------------------------


$(function() {
$(window).scroll(function () {
var ss = $(this).scrollTop();
var mm = 600;
if(ss > mm) {

$("#pagetopicon").addClass('visible');
} else if(ss < mm) {
$("#pagetopicon").removeClass('visible');
}
});
});



//-----------------------------------------------------------------
//　スムーススクロール
//-----------------------------------------------------------------


$(function(){
	$('a[href^="#"]').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});





//-----------------------------------------------------------------
//　高さ揃える
//-----------------------------------------------------------------

$(function() {
    $('.matchHeight').matchHeight();
});


$(function() {
    $('.matchHeight02').matchHeight();
});























//-----------------------------------------------------------------
//　スクロールアクション
//-----------------------------------------------------------------



$(window).scroll(function (){


$('header').each(function(){
var imgPos = $(this).offset().top;    
var scroll = $(window).scrollTop();
var windowHeight = $(window).height();
if (scroll > 200){

$(this).addClass('hp');


} else {
$(this).removeClass('hp');	
}
});




$('header').each(function(){
var imgPos = $(this).offset().top;    
var scroll = $(window).scrollTop();
var windowHeight = $(window).height();
if (scroll > 600){

$(this).addClass('hp2');


} else {
$(this).removeClass('hp2');	
}
});



$('header').each(function(){
var imgPos = $(this).offset().top;    
var scroll = $(window).scrollTop();
var windowHeight = $(window).height();
if (scroll > 1000){

$(this).addClass('hm');


} else {
$(this).removeClass('hm');	
}
});




$('.slide_title').each(function(){
var imgPos = $(this).offset().top;    
var scroll = $(window).scrollTop();
var windowHeight = $(window).height();
if (scroll > imgPos - windowHeight + 100){

$(this).find(".line .inner").delay(100).animate({
"bottom": "0"
}, {duration: 1200, easing: 'easeInOutQuart',})


} 
});





$('.fadetext').each(function(){
var imgPos = $(this).offset().top;    
var scroll = $(window).scrollTop();
var windowHeight = $(window).height();
if (scroll > imgPos - windowHeight){

$(this).delay(600).animate({
"opacity": "1"
}, {duration: 1200, easing: 'easeInOutQuart',})


} 
});





$('.fadeimg').each(function(){
var imgPos = $(this).offset().top;    
var scroll = $(window).scrollTop();
var windowHeight = $(window).height();
if (scroll > imgPos - windowHeight){

$(this).find(".cover").delay(100).animate({
"height": "0"
}, {duration: 1200, easing: 'easeInOutQuart',})


} 
});



});