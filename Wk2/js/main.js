/*  
	Your Project Title
	Author: You
*/

(function($){
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};
	
	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/
    
    /* ================= TOOLTIP ==================== */
    
    $(".masterTooltip").hover(function(){
           //Mouse over code    
            var title = $(this).attr("title");
            $(this).data("tipText", title).removeAttr("title");
            $('<p class="tooltip"></p>')
                .text(title)
                .appendTo("body")
                .fadeIn("slow");
    }, function() {
        //Hover out code
        $(this).attr("title", $(this).data("tipText"));
        $(".tooltip").remove();
    }).mouseover(function(e){
        var mousex = e.pageX + 20; //Get x coordinates of mouse
        var mousey = e.pageY + 10; //Get y coordinates of mouse
        $(".tooltip")
        .css({ top: mousey, left: mousex})
    });
    
    
    /* ================= MODAL ==================== */
    
    $(".modalClick").on("click", function(e){
       e.preventDefault();
        $("#overlay").fadeIn().find("#modal").fadeIn();  
    });
    
    $(".close").on("click", function(e){
        e.preventDefault();
        $("#overlay").fadeOut().find("#modal").fadeOut();
    });
    
    /* ============ FADING STATUS OPTION =========== */
    
    $(".mystatus").mouseover(function(){
        $(this).fadeTo(100, .5);
    });
    $(".mystatus").mouseout(function(){
        $(this).fadeTo(100, 1);
    });
    
    
    /* ========== ACCORDION =========== */
    
    
$("ul.tabs").each(function(){
    //keeping track of tabs
    //which tab is active
    var $active,
        $content,
        $links = $(this).find("a");
    //if location.hash equals link use as active tab
    //if not use first link as active tab
    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
    $active.addClass("active");

    $content = $($active[0].hash);

    //Hide rest of content
    $links.not($active).each(function (){
        $(this.hash).hide();
    });

    //bind click event handler
    $(this).on("click", "a", function(e){
        //make the old tab inactive
        $active.removeClass("active");
        $content.hide();


        //update var with new link + content
        $active = $(this);
        $content = $(this.hash);

        //Make tab active
        $active.addClass("active");
        $content.show();

        //prevent the anchors default click action
        e.preventDefault(); 
    });
});
    
    
    
    
    
    
    
    
    
    
    
    
      /* ======= SIGN IN & SIGNOUT BUTTON HOVER ======= */
    
    $("#signout").hover(function(){
       $(this).attr("src", "../images/sign_out_button_roll.png");
            }, function() {
        $(this).attr("src", "../images/sign_out_button.png");
    });
	
    
    /* ======= SIGN UP BUTTON HOVER ======= */
    
    $("#signup").hover(function(){
       $(this).attr("src", "../images/signup_button_roll.png");
            }, function() {
        $(this).attr("src", "../images/signup_button.png");
    });
    
    
    /* ======= LOGIN BUTTON HOVER ======= */
    $("#signinButton").hover(function(){
       $(this).attr("src", "../images/submit_button_roll.png");
            }, function() {
        $(this).attr("src", "../images/submit_button.png");
    });
    
    
    
    
    $("#selectable").selectable();
    $("#projectStatus").buttonset();
    
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/
		
		

	
})(jQuery); // end private scope




