/*  
	[/dCode] 
	Author: Justin D Goldman
*/

(function($){
    
    
    
    
    
    
    /* ==== LOGIN === */

	
$("#signinButton").click(function(){
     var user = $("#user").val();
     var pass = $("#pass").val();
  
    $.ajax({
         url: "xhr/login.php",
         type: "post",
         dataType: "json",
         data: {
            username: user,
            password: pass 
            },
            success: function(response){
                console.log("test user");
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign("admin.html");
                };
            }
    });
});
  

  /* ===== LOGOUT ====*/
    
    $("#signout").click(function(e){
        e.preventDefault;
        $.get("xhr/logout.php", function(){
           window.location.assign("index.html"); 
            
        })
        
    });
    
    
    
    /*============ REGISTER ==========*/
    
    $("#signup").on("click", function(){
        var firstname = $("#firstname").val(),        
            lastname = $("#lastname").val(),   
            username = $("#username").val(),   
            email = $("#email").val(),   
            password = $("#password").val(),
            phone = $("#phone").val(),
            city = $("#city").val(),
            state =  $("#state").val(),
            zipcode = $("#zipcode").val();
        
        console.log(firstname + " " + lastname + " " + username + " " + email + " " + password);
        
        $.ajax({
            url: "xhr/register.php",
            type: "post",
            dataType: "json",
            data: {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password,
                phone: phone,
                city: city,
                state: state,
                zipcode: zipcode
                },
           success: function(response){
                if (response.error){
                    alert(response.error);
                }else{
                  window.location.assign("admin.html");  
                }  
           }
           
        });
    });
    
   /* ======== DISPLAY USER INFO IN ADMIN DASH =========*/    
    $.getJSON("xhr/get_user.php", function(data){
        var username = data.user.user_n;
           $("#user_welcome_name").append(data.user.user_n);
     });

        

    
    
    
    
    
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
	
		

    
    /* ================= TOOLTIP ==================== */
    
    $(".masterTooltip").hover(function(){
           //Mouse over code    
            var title = $(this).attr("title");//set var to title attr
            $(this).data("tipText", title).removeAttr("title");
            $('<p class="tooltip"></p>') //remove and put into tooltip paragraph
                .text(title) //find title and append it to body and fade in
                .appendTo("body")
                .fadeIn("slow");
    }, function() {
        //Hover out code
        $(this).attr("title", $(this).data("tipText"));
        $(".tooltip").remove(); //removes tooltip text
    }).mouseover(function(e){
        var mousex = e.pageX + 20; //Get x coordinates of mouse
        var mousey = e.pageY + 10; //Get y coordinates of mouse
        $(".tooltip")
        .css({ top: mousey, left: mousex}) //set css for tooltip placement
    });
    
    
    /* ================= MODAL ==================== */
    
    $(".modalClick").on("click", function(e){
       e.preventDefault();//prevents default action
        //find overlay, fadein, then find modal and fade in
        $("#overlay").fadeIn().find("#modal").fadeIn();  
        
    });
    
    $(".close").on("click", function(e){
        e.preventDefault();//prevents default action
        //find overlay, fadeout, then find modal and fade out
        $("#overlay").fadeOut().find("#modal").fadeOut();
    });
    
    /* ============ FADING STATUS OPTION =========== */
    
    $(".mystatus").mouseover(function(){
        //date status icon to half transp. when hover
        $(this).fadeTo(100, .5);
    });
    $(".mystatus").mouseout(function(){
        //change back to full on leave
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
        //set attr to roll over button
       $(this).attr("src", "images/sign_out_button_roll.png");
            }, function() {
        //when leaving set attr to default state
        $(this).attr("src", "images/sign_out_button.png");
    });
	
    
    /* ======= SIGN UP BUTTON HOVER ======= */
    
    $("#signup").hover(function(){
        //set attr to roll over button
       $(this).attr("src", "../images/signup_button_roll.png");
            }, function() {
        //when leaving set attr to default state
        $(this).attr("src", "/images/signup_button.png");
    });
    
    
    
    
    

    
    
    //$("#selectable").selectable();
   // $("#projectStatus").buttonset();
    
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/
		
		

	
})(jQuery); // end private scope




