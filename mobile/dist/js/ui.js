if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/

document.addEventListener("DOMContentLoaded", function() {
  commonInit();
  
});

$(function(){
  dimLayerControl();
  actog();
  dataToggleFunc();
  fixedBottom();
});

function fixedBottom(){
  const btn_bottomlayer_wrap = document.querySelector(".btn_bottomlayer_wrap");
  const page_wrap = document.querySelector(".page_wrap");
  action();
  window.addEventListener("resize",()=>{
    action();
  });
  function action(){
    if(btn_bottomlayer_wrap !== null){
      page_wrap.style.paddingBottom = btn_bottomlayer_wrap.getBoundingClientRect().height + "px";
    }
  }
}

function scrollTable(){
  const data_tb_z = document.querySelectorAll(".data_tb_z");
  if(data_tb_z.length===0){return;}
  action();
  window.addEventListener("resize",()=>{
    action();
  });
  function action(){
    data_tb_z.forEach((element)=>{
      const thisObj = element;
      let datarow = thisObj.getAttribute("data-scrollrow");
      const thisHead = thisObj.querySelector(".define_thead");
      const thisBody = thisObj.querySelector(".define_tbody");
      const targetRow = thisBody.querySelectorAll("tr")[datarow];
      let scrollWid = getScrollBarWidth();
      if(targetRow !== undefined && thisHead !== null){
        thisBody.style.maxHeight = targetRow.offsetTop + "px";
        thisHead.style.paddingRight = `${scrollWid}px`;
      }
    });
  }
}

function getScrollBarWidth() {
	let outerDivitem = document.createElement('div');
  let innerDivitem = document.createElement('div');
  let getWidth = 0;
  outerDivitem.setAttribute("style",`width: 100px; overflow:scroll; height:100px;outline:1px solid red`)
  document.body.append(outerDivitem);
  outerDivitem.append(innerDivitem);
  innerDivitem.setAttribute("style",`width: 100%;height:110%;`)
  getWidth = innerDivitem.getBoundingClientRect().width;
  outerDivitem.remove();
  return 100 - getWidth;
};

function commonInit() {
  var touchstart = "ontouchstart" in window;
  var userAgent = navigator.userAgent.toLowerCase();
  var checkitem = [];
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf('samsung') > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }

  commonLayout();

  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}


function commonLayout() {
  // mobile total
  function mbTotal() {
    var touchstart = "ontouchstart" in window;
    var btn_mobile_menu = document.querySelector(".btn_mobile_menu"),
      mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
      mainmenu_dim = document.querySelector(".mainmenu_dim"),
      btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
      domHtml = document.querySelector("html"),
      domBody = document.querySelector("body");

    // init 
    if (mobile_mainmenu_zone === null) {
      return;
    }
    btn_mobile_menu.addEventListener("click", function(e) {
      e.preventDefault();
      totalOpen();
    }, false);
    btn_mbmenuclose.addEventListener("click", function(e) {
      e.preventDefault();
      totalClose();
    }, false);
    mainmenu_dim.addEventListener("click", function(e) {
      e.preventDefault();
      totalClose();
    }, false);

    function totalOpen() {
      mobile_mainmenu_zone.classList.add("active")
      setTimeout(function() {
        mobile_mainmenu_zone.classList.add("motion");
        if (touchstart) {
          domBody.setAttribute("data-scr", window.pageYOffset);
          domBody.style.marginTop = -window.pageYOffset + "px";
          domHtml.classList.add("touchDis");
        }
      }, 30);
    }

    function totalClose() {
      mobile_mainmenu_zone.classList.remove("motion");
      setTimeout(function() {
        mobile_mainmenu_zone.classList.remove("active");
        domHtml.classList.remove("touchDis");
        domBody.style.marginTop = 0;
        window.scrollTo(0, parseInt(domBody.getAttribute("data-scr")));
      }, 500);
    }
  }
  mbTotal();
}


function dimLayerControl(){
		var objThis = this,
			$modal = $(".dlayer_w");
		if($modal.length===0){return;}
		$modal.on("click",".dlayer_bg , .btn_dlayerclose,.closetrigger",function(e){
			var $this = $(this),
				$t_p = $this.parents(".dlayer_w");
			e.preventDefault();
			objThis.dimLayerHide({ 'target' : $t_p});
		});
}
function dimLayerShow(option){
  var touchIs = "ontouchstart" in window,
    $modal = null,
    $target = null;
  
  $(function(){
    $modal = $(".dlayer_w");
    
    $target = $(option.target);
    
    if($modal.length===0){return;}
    $modal.removeClass("active");
    $target.addClass("active");
    
    $(".page_wrap").css({"z-index":0});
    heightcheck();
    if("openCallback" in option){
      option.openCallback();
    }
    function heightcheck(){
      if(touchIs){
        console.log($(window).scrollTop());
        $("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()}).append($target);
        $("html").addClass("touchDis");
      }
    }
  });
}
function dimLayerHide(option){
  var touchIs = "ontouchstart" in window,
      $modal = null,
      $target = null;
    
  $(function(){
    $modal = $(".dlayer_w");
    $target = $(option.target);
    $target.removeClass("active");
    $(".page_wrap").css({"z-index":""});
    $("html,body").removeClass("touchDis");
    scrollEnd();
    
    if("closeCallback" in option){
      option.closeCallback();
    }
    
    function scrollEnd(){
      if(touchIs){
        $("body").css({"margin-top":0});
        window.scrollTo(0,Number($("body").data("data-scr")));
      }
    }
  });
}

function dataToggleFunc(){
  $(document).on("click","[data-toggle]", function(e){
    e.preventDefault();
    var this_obj = $(this),
        this_obj_target = $(this_obj.attr("data-toggle"));
    
    this_obj.toggleClass("active");
    this_obj_target.toggleClass("d_active");
  });
}

function actog(){
  $(document).on("click",".btn_acitem",function(e){
    var $this = $(this),
      $t_p = $this.parents(".acitem_w"),
      $t_t = $this.next(".accont_w");
  //	if($this.hasClass("type2")){return;}
    if($(e.target).parents(".acitin").length){return;}
    if($t_p.length){
      $t_p.toggleClass("active");
    }
  });
  /*
  $(document).on("click",".acitemh_in",function(){
    var $this = $(this),
      $t_p = $this.parents(".acitem_w"),
      $t_t = $t_p.find(".accont_w");
    if($t_p.length){
      $t_p.toggleClass("active");
    }
  });*/
  $(document).on("click",".btn_like , .like_type",function(){
    var $this = $(this);
    $this.toggleClass("active");
  });
}


function tabUITab(target){
  const target_ui = document.querySelector(target);
	const tabmenu_box = target_ui.querySelectorAll(".tabmenu_box");
	const tabmenu_cont = target_ui.querySelectorAll(".tabmenu_cont_wrap .tabmenu_cont");
	let tabmenu_box_active = Array.from(tabmenu_box).filter(item => item.classList.contains("active"))[0];
	let tabmenu_cont_active = Array.from(tabmenu_cont).filter(item => item.classList.contains("active"))[0];
	tabmenu_box.forEach((item)=>{
		item.addEventListener("click",(e)=>{
			e.preventDefault();
			const targetItem = e.currentTarget;
			const targetItemDom = document.querySelector(targetItem.getAttribute("href"));
			if(tabmenu_box_active){
				tabmenu_box_active.classList.remove("active");
			}
			if(tabmenu_cont_active){
				tabmenu_cont_active.classList.remove("active");
			}
			if(!!targetItemDom){
				targetItemDom.classList.add("active");
				tabmenu_cont_active = targetItemDom;
			}
			targetItem.classList.add("active");
			tabmenu_box_active = targetItem;
		});
	});
}

function toggleFunc(){
  const toggleBtn = document.querySelectorAll("[data-target]");
  if(!!toggleBtn){
    toggleBtn.forEach((item)=>{
      item.addEventListener("click",(e)=>{
        e.preventDefault();
        const eBtn = e.currentTarget;
        const eTarget = document.querySelector(eBtn.getAttribute("data-target"));
        if(!!eTarget){
          eTarget.classList.toggle("active");
        }
      });
    });
  }
}

function mainTailTabFunc(){
  const mc_tailtab = document.querySelectorAll(".mc_tailtab");
	const mc_tailtab_cont = document.querySelectorAll(".mc_tailmenu_controw .mc_tailtab_cont");
	let mc_tailtab_active = Array.from(mc_tailtab).filter(item => item.classList.contains("active"))[0];
	let mc_tailtab_cont_active = Array.from(mc_tailtab_cont).filter(item => item.classList.contains("active"))[0];
  let widowInitWidth = window.innerWidth;
	
  // init
  heightDefine(mc_tailtab_cont_active);
  

  //event
  window.addEventListener("resize",()=>{
    if(widowInitWidth !== window.innerWidth){
      heightDefine(mc_tailtab_cont_active);
    }
    widowInitWidth = window.innerWidth;
  });
  
  mc_tailtab.forEach((item)=>{
		item.addEventListener("click",(e)=>{
			e.preventDefault();
			const targetItem = e.currentTarget;
			const targetItemDom = document.querySelector(targetItem.getAttribute("href"));
			if(mc_tailtab_active){
				mc_tailtab_active.classList.remove("active");
			}
			if(mc_tailtab_cont_active){
				mc_tailtab_cont_active.classList.remove("active");
			}
			if(!!targetItemDom){
				targetItemDom.classList.add("active");
        heightDefine(targetItemDom);
				mc_tailtab_cont_active = targetItemDom;
			}
			targetItem.classList.add("active");
			mc_tailtab_active = targetItem;
		});
	});

  function heightDefine(target){
    const targetCont = target.querySelector(".tailtab_fxcont");
    const targetMenuLi = target.querySelectorAll(".tailtab_menu_list > li")[5];
    if(!!targetMenuLi){
      targetCont.style.maxHeight = targetMenuLi.offsetTop + 'px';
    }
  }
}


function profileListToggle(){
  const profile_toggle_item = document.querySelectorAll(".profile_toggle_item");
  if(!!profile_toggle_item){
    profile_toggle_item.forEach((item)=>{
      const thisItem = item;
      const thisItemBar = thisItem.querySelector(".profile_toggle_bar");
      const thisItemTail = thisItem.querySelector(".profile_toggle_tail");
      thisItemBar.addEventListener("click",(e)=>{
        if(!!e.target.closest(".profile_control_btn_list")){
          return;
        }
        thisItem.classList.toggle("active");
      });
    })
  }
}