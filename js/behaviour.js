$(document).ready(function(){

    console.log('jQuery is all good');
  
/*====================================================*/
/*====            GLOBAL VARIABLES                ====*/
/*====================================================*/
    
    
    //****** global menu
    var gmBtnX = $('.gm-btn .close-x');
    var gmBtnSp = $('.gm-btn span');
    
    var logoBox = $('#logo-box');
    
    //****** mobile global menu
    var mobileGlobalMenu = $('#mobile-global-menu');
    var mobileLogoBtn = $('#mobile-logo-button');
    var mobilePaginationUl = $('#mobile-pagination-ul');
    var mobileCloseBtn = $('#mobile-close-button');
    var mobileHomeBtn = $('#mobile-home-button');
    
    var dot1 = $('#dot-1');
    var dot2 = $('#dot-2');
    var dot3 = $('#dot-3');
    
    //****** local menu
    var lmFrame = $('#local-menu-frame');
    var lmInsert = $('#local-menu-insert');
    var lmList = $('.lm-list');
    var lmLineBoi = $('.lm-line-boi');
    var lmItem = $('.lm-item');
    
    var projAnch = $('.proj-anchor');
    
    //****** content area
    var contArea = $('#content-area');
    var contShell = $('#content-shell');
    var contWrap = $('#ca-wrapper');
    

    var opsGate = true; //'once per session'
    

/*====================================================*/
/*====                 PAGE SETUP                 ====*/
/*====================================================*/
    
    var windWidth = $(window).width();
    var windHeight = $(window).height();
    
    var prevWidth = windWidth;
    var prevHeight = windHeight;
    
    var fragileMenu = false;
    
    var mobilePageNum = 1;
    
    var isMobile = true;
    
    resizeResponse();
    
    localStorage.clear();
    
   
/*====================================================*/
/*====                 FUNCTIONS                  ====*/
/*====================================================*/
    
    //****** for expanding or collapsing local menu
    function toggleLocalMenu(expand, targo) {
        
        if (expand) {
            
            $('.gm-btn').removeClass('gm-active');
        
            //****** get button, ie the parent
            var tarPar = targo.parent();

            //****** get name of button pressed
            var btnName = tarPar.attr('data-btn-name');
            console.log('clicked: ' + btnName); //testing
            
            //****** add active gm class
            tarPar.addClass('gm-active');
            
            $('#global-menu').removeClass('thicc');
            $('#global-menu').addClass('thinn');
            
            //$('#global-menu').css({'width': 150, 'padding-left': 0});

            //****** show correct content
            lmInsert.hide();
            lmList.removeClass('lm-current');
            $('#lm-'+btnName).addClass('lm-current');
            
            sessionStorage.setItem('openPane', btnName);

            //****** expand local menu
            lmFrame.removeClass('lm-collapsed');
            lmFrame.addClass('lm-expanded');

            //****** bring in the insert
            lmInsert.css({
                'opacity': '0',
                'display': 'block'
            });

            lmInsert.animate({
                opacity: 1
            }, 300);
            
            $('.lm-title').fadeIn(200).css({'right': '8px', 'color': 'rgba(222,222,222,1)'});

            lmLineBoi.css('left','24px');

            //****** narrow content area
            contArea.removeClass('ca-full');
            contArea.addClass('ca-narrow');
            
            //****** fade in that good good
            if (btnName == "work") {
                
                lmItem.show();
                
                lmItem.each(function(index) {
                    
                    $(this).delay(200*index);
                    $(this).children().each(function(index){
                        
                        $(this).delay(120*index).fadeIn(400);
                        
                    });
                });                    
            }
                    
            
        } else if (!expand) {
            
            //****** collapse local menu
            lmFrame.removeClass('lm-expanded');
            lmFrame.addClass('lm-collapsed');
            lmLineBoi.css('left','-24px');

            $('.gm-btn').removeClass('gm-active');
            
            $('#global-menu').removeClass('thinn');
            $('#global-menu').addClass('thicc');

            //****** widen content area
            contArea.removeClass('ca-narrow');
            contArea.addClass('ca-full');
            
            //****** hide some shit
            lmItem.fadeOut(400);
            lmItem.children().fadeOut(200);
            
            $('.lm-title').css({'right': '-20px','color': 'rgba(222,222,222,0)'}).fadeOut(200, function(){
                
                $('.lm-title').css({'right': '160px',});
                
            });    
        } 
        
    } //end of toggleLocalMenu() function
                  
                  
    
    //****** for dealing with window resizing
    function resizeResponse() {
        
        prevWidth = windWidth;
        prevHeight = windHeight;
        
        windWidth = $(window).width();
        windHeight = $(window).height();
        
        //will add more here later
        //responsive-type shit and all that
        
        console.log('window has been resized to ' + windWidth + ', ' + windHeight);
        
        /*
        
        //this will tell roughly what kind of device it is
        if (windWidth > 400 && opsGate == true) {
        
            window.localStorage.setItem('device','big');
            opsGate = false;
        }
        
        */
        
        //this fixes the height thing but now there's a lag
        contArea.css('height', windHeight);
        
        
        if (windWidth <= 400) {isMobile = true}
        else {isMobile = false}
        
        if (windWidth <= 1060) {
                 
            if (prevWidth > 1060) {
                
                //this needs an "if mobile" aspect to it
                //toggleLocalMenu(false);  
            }
            
            fragileMenu = true;   
            
        } else {fragileMenu = false} 
        
        
    }
    
    
    function toggleMobileMenu(crack){
        
        if (crack){
            
            mobileGlobalMenu.addClass('cracked-open');
            mobilePaginationUl.addClass('fuck-yeah-spread-it');
            
            //fadeOut logo button
            mobileLogoBtn.fadeOut(120);
            
            //fadeIn other shit
            mobileHomeBtn.fadeIn(120);
            mobileCloseBtn.fadeIn(120);
            
            lmFrame.removeClass('lm-collapsed');
            lmFrame.addClass('lm-expanded');
              
            
        } else if (!crack) {
            
            mobileGlobalMenu.removeClass('cracked-open');
            mobilePaginationUl.removeClass('fuck-yeah-spread-it');
            
            //fadeIn logo button
            mobileLogoBtn.fadeIn(120);
            
            mobileHomeBtn.fadeOut(120);
            mobileCloseBtn.fadeOut(120);
            
            lmFrame.removeClass('lm-expanded');
            lmFrame.addClass('lm-collapsed');
        }   
    }
    
    

/*====================================================*/
/*====              EVENT HANDLERS                ====*/
/*====================================================*/
    
    
    //****** clicked the 'x' in global menu
    gmBtnX.click(function(event){
        
        toggleLocalMenu(false, $(event.target));   
    });
                    
    
    //****** clicked a <span> in global menu
    gmBtnSp.click(function(event){
        
       toggleLocalMenu(true, $(event.target));
    });
    
    
    //****** clicked the logo home button
    logoBox.click(function(){
        
        toggleLocalMenu(false);
    });
    
    
    
    $('.shasta').click(function(){
        
        if (fragileMenu == true) {
            
            toggleLocalMenu(false);
        }
    });
    
    
    mobileLogoBtn.click(function(){
        
        toggleMobileMenu(true);
    });
    
    mobileCloseBtn.click(function(){
       
        toggleMobileMenu(false);
    });
    
    
    //****** resized the window with timer for performance
    var resizeTimer = null;
    $(window).resize(function(){

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
 
            resizeResponse();

        }, 60); //this is how long(ms) to ignore additional resizing

    }).trigger('click');
    
    
    
    
    
    
    
    
    
    
    
    //****** END OF JQUERY READY BLOCK -- STOP HERE
});