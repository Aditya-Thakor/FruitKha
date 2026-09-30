
$(function(){
    
   $(window).on("scroll", function(){
    if( $(this).scrollTop()>50){
       $("nav").addClass("bg-black");
    
        $("nav").addClass("navfx");
    }
    else{
        $("nav").removeClass("bg-black");
        $("nav").removeClass("navfx");
    }
   });
    
});