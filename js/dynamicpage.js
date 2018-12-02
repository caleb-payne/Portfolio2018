/*================================================*/
/*====  Thanks to Chris Coyier on CSS-Tricks  ====*/
/*====   Dynamic Page / Replacing Content     ====*/
/*================================================*/


//when document is ready
$(function() {

    var newHash      = "",
        $mainContent = $("#content-shell"),
        $pageWrap    = $("#content-area"),
        baseHeight   = 0,
        $el;
        
    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();
    
    $("*").delegate(".shasta", "click", function() {
        window.location.hash = $(this).attr("href");        
        return false;
    });
    
  
    /*=========================================*/
    /*===  HANDLER FOR FUTURE HASH CHANGES  ===*/
    /*=========================================*/
    
    $(window).bind('hashchange', function(event){
    
        newHash = window.location.hash.substring(1);
        
        console.log('new hash detected: ' + newHash);
        
        if (newHash) {
            $mainContent
                .find("#ca-wrapper")
                .fadeOut(200, function() {
                
                    //****** deals with adding and removing "selected" classes on lm-item list 
                    //****** would be better to get target of click event!!!
                    $('.lm-item').removeClass('selected-project');
                    $('.lm-item a[href=\"' + newHash + '\"]').parent().addClass('selected-project');
                
                
                    //****** this chunk is for loading the new content and fading shit in
                    $mainContent.hide().load(newHash + " #ca-wrapper", function() {
                        $mainContent.delay(40).fadeIn(200, function() {
                            
                            $pageWrap.animate({
                                height: baseHeight + $mainContent.height() + "px"
                            });
                        });
                    });
                });
            
            console.log('new shit loaded');
        }
    });
    
    
    //fire it once at startup? nah.
    //$(window).trigger('hashchange');
    
    
    
    /*=========================================*/
    /*====       INITIAL PAGE SETUP        ====*/
    /*=========================================*/
    
    //initial page setup
    newHash = window.location.hash.substring(1);
    $('.lm-item').removeClass('selected-project');
    $('.lm-item a[href=\"' + newHash + '\"]').parent().addClass('selected-project');
    
    console.log('page setup: hash loaded');
    
    $mainContent.hide().load(newHash + " #ca-wrapper", function(){
        
        $mainContent.fadeIn(200);
    });
    
    
   
    
    
}); //end of page ready block!!!! nothing past here
