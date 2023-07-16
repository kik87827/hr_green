if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
var HGREEN = HGREEN || {};
HGREEN = {
	/* 페이지 로드함수 */
	init : function(){
		var funcThis = this;
		$(function(){
			if(touchstart){
				$("html").addClass("touchmode");
			}else{
				$("html").removeClass("touchmode");
			}
			funcThis.dimLayerControl();
		});
		$(window).on("load",function(){
		});
	},
	
	dimLayerControl : function(){
		var thisUI = this;
		$(document).on("click",".btn_layerclose , .closetrigger",function(){
			thisUI.dimLayerHide($(this).parents(".dimlayer_z"));
		});
	},
	dimLayerShow : function(target,callback){
		$(function(){
			action(target,callback);
		});
		function action(target,callback){
			var $target = $(target),
				$t_layer_td = null,
				$t_layer_tit_low = null,
				$t_layer_tit_low_height = 0,
				$t_layer_td_cssptd = 0,
				$t_layer_td_csspbd = 0,
				$t_btn_lysm_w = null,
				$t_btn_lysm_w_height = 0,
				$t_layer_cont = null,
				$t_layer_box = null,
				$t_layer_box_height = 0;
			
			$(".dimlayer_z").hide();
			$target.show();
			setTimeout(function(){
				$t_layer_td = $target.find(".dimlayer_td");
				$t_layer_td_cssptd = $t_layer_td.length ? parseInt($t_layer_td.css("padding-top")) : 0;
				$t_layer_td_csspbd = $t_layer_td.length ? parseInt($t_layer_td.css("padding-bottom")) : 0;
				$t_layer_box = $target.find(".layer_box");
				$t_layer_box_height = $t_layer_box.length ? $t_layer_box.outerHeight() : 0;
				
				boxHeight();
				
				if($t_layer_box_height+$t_layer_td_cssptd+$t_layer_td_csspbd > $(window).height()){
					$("html,body").addClass("touchDis");
				}
				$(window).on("resize",function(){
					boxHeight();
				});
				if(callback){
					callback();
				}
			},50);
			
			function boxHeight(){
				$t_layer_tit_low = $target.find(".layer_tit_low");
				$t_layer_tit_low_height = $t_layer_tit_low.length ? $t_layer_tit_low.outerHeight() : 0;
				$t_btn_lysm_w = $target.find(".btn_lysm_w");
				$t_btn_lysm_w_height = $t_btn_lysm_w.length ? $t_btn_lysm_w.outerHeight() : 0;
				$t_layer_cont = $target.find(".layer_cont");
				$t_layer_cont.css("max-height",$(window).height() - ($t_layer_td_cssptd+$t_layer_td_csspbd+$t_btn_lysm_w_height+$t_layer_tit_low_height));
			}
		}
		function getScrollBarWidth() {
		    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
		        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		    $outer.remove();
		    return 100 - widthWithScroll;
		};
	},
	dimLayerHide : function(target){
		$(function(){
			action(target);
		});
		
		function action(target){
			var $target = $(target);
			$(".dimlayer_z").hide();
			$target.hide();
			$("html,body").removeClass("touchDis");
		}
	},
	sctabFunc : function(){
		var $sctab_z = $(".sctab_z");
		$sctab_z.each(function(){
			var $t_sctab_z = $(this),
				$t_sccont_w = $(".sccont_w",$t_sctab_z),
				$t_sccont = $(".sccont",$t_sctab_z),
				$t_sctab_td = $(".sctab_td",$t_sctab_z);
			$t_sctab_td.on("click",function(e){
				var $this = $(this),
					$t_target = $($this.attr("href"));
				e.preventDefault();
				$t_sctab_td.removeClass("active");
				$this.addClass("active");
				if($t_target.length){
					$t_sccont.hide();
					$t_target.show();
				}
			});
		});
	},
	setVh : function(){
		const header_zone = document.querySelector(".header_zone");
		let header_zone_height = header_zone !== null ? header_zone.getBoundingClientRect().height : 0;
		const full_field_type = document.querySelector(".full_field_type");
		function action(){
			full_field_type.style.height = window.innerHeight - header_zone_height + "px";
		}
		action();
		window.addEventListener('resize', action);
	}
};
HGREEN.init();