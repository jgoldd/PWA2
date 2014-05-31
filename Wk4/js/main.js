/*  
	[/dCode] 
	Author: Justin D Goldman
*/

(function($){
    
    
    
    
    
    
    /* =============================== LOGIN =============================== */

	
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
  

    /* ============================================= LOGOUT =========================================*/
    
    $("#signout").click(function(e){
        e.preventDefault;
        $.get("xhr/logout.php", function(){
           window.location.assign("index.html"); 
            
        })
        
    });
    
    
    
    /*============================================= REGISTER ===============================================*/
    
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
    
   /* ======================================= DISPLAY USER INFO IN ADMIN DASH =======================================*/    
    
    
    $.getJSON("xhr/get_user.php", function(data){
        var username = data.user.user_n;
           $("#user_welcome_name").append(data.user.user_n);
     });

        

    
    
    
    
    
	/*
	============================================ APPLICATION FUNCTIONS	=================================================*/
	
	
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
	
	

	/* 	========================================= SET UP FOR INIT ========================================================*/
		
		
	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
	
		

    
    /* ============================================= TOOLTIP ========================================================= */
    
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
    
    
    /* ============================================ MODAL ================================================ */
    
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
    
    /* ============================================== FADING STATUS OPTION ========================================== */
    
    $(".mystatus").mouseover(function(){
        //date status icon to half transp. when hover
        $(this).fadeTo(100, .5);
    });
    $(".mystatus").mouseout(function(){
        //change back to full on leave
        $(this).fadeTo(100, 1);
    });
    
    
    /* ====================================================== ACCORDION ===================================== */
    
    
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
    
    /* =========================================== PROJECTS BUTTON ================================================ */
    
    
    $("#viewProjects").on("click", function(e){
        e.preventDefault();
        window.location.assign("questions.html");
    });
    
    
            /* ====================================================== NEW PROJECTS ===================================== */
    
    
    $(".addProjectModal").on("click", function(e) {
        e.preventDefault();
        var projName = $("#projectName").val(),
            projDesc = $("#tags").val(),
            projDue = $("#datepicker").val(),
            status = $("#status input:checked").val();
        
        
        $.ajax({
            url: "xhr/new_project.php",
            type: "post",
            dataType: "json",
            data: {
                projectName: projName,
                projectDescription: projDesc,
                dueDate: projDue,
                status: status
                
            },
            success: function(response){
                console.log("testing");
                
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign("questions.html");
                };  
            }
        });
    });
    
    
    
     /* =========================================== GET PROJECTS ================================================ */
    
    var projects = function(){
        
        $.ajax({
            url: "xhr/get_projects.php",
            type: "get",
            dataType: "json",
            success: function(response){
                if(response.error){
                    console.log(response.error);  
                }else{
                
                
                    for(var i=0, j=response.projects.length; i < j; i++){
                        var result = response.projects[i];
                        console.log(response.projects[i]);
                        
                        $(".projects_list").append(
                           "<div id='proj' class='ui-state-default'><div id='proj_box'>" +
                            "<div id='projResQ'>" +  "Question: "  + "</div>" + "<div id='projResQv'>" + result.projectName +  "</div> <br>" +
                            "<div id='projResTag'>" + "Question tags: "  + "</div>" + "<div id='projResTagv'>" + result.projectDescription + "</div> <br>" + "<div id='projResId'>" + "Question ID: " + "</div>"  + "<div id='projResIdv'>" + result.id + "</div> <br>" + "</div> <br>" +
                            "<div id='delete_box'>" + "<input type='button' projectid='" + result.id +"' class='editbtn' width='72px' height='26px'>Edit</input>" + "<input type='button' projectid='" + result.id +"' class='deletebtn' width='72px' height='26px'></input>" + "</div></div></br><br><br>" 
                    
                            
                       );
                 
                    };
                $(".deletebtn").on("click", function(e){
                        console.log("test delete");
                        var pid = $(this).attr("projectid"); //FIND PROJECT ID IN ATTR 

                    $.ajax({
                        url: "xhr/delete_project.php",
                        data: {
                            projectID: pid // set projectid to pid
                        },
                        type: "post",
                        dataType: "json",
                        success: function(response){
                            console.log("testing for success");
                            
                            if(response.error) {
                                alert(response.error);
                                
                            }else{
                         
                        window.location.assign("questions.html");
                            };
                        }
                    });
                });
                 
                /*TESTING ***************************    
                    
                    
                    
                $(".editbtn").on("click", function(e){
            console.log("test edit");
            var pid = $(this).attr("projectid"); //FIND PROJECT ID IN ATTR 
        var projName = $("#projectName").val(),
            projDesc = $("#tags").val(),
            projDue = $("#datepicker").val(),
            status = $("#status input:checked").val();

        $.ajax({
            url: "xhr/update_project.php",
            data: {
                projectID: pid, // set projectid to pid
                projectName: projName,
                projectDescription: projDesc,
                dueDate: projDue,
                status: status
                
            },
            type: "post",
            dataType: "json",
            success: function(response){
                console.log("testing for success");

                if(response.error) {
                    alert(response.error);

                }else{

            window.location.assign("questions_edit.html");
                };
            }
        });
    });

                    
                    
                TESTING  */
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                
             };
            }
         });          
   };    
            
                    //End Delete
        

    
            
          projects();

    

      
        
        
    /* ===================================== DATE PICKER ====================================================== */
    
    
    $( "#datepicker" ).datepicker();

      /* ===================================== AUTOCOMPLETE TAGS ====================================================== */
 
var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "CSS",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "HTML",
        "Java",
        "JavaScript",
        "jQuery",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];
    function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
 
    $( "#tags" )
      // don't navigate away from the field on tab when selecting an item
      .bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).data( "ui-autocomplete" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            availableTags, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });
    
  
     /* ===================================== STATE AUTOCOMPLETE ====================================================== */
      
    
    
    var stateList= [
    "Alabama",  
	"Alaska",  
	"Arizona",  
	"Arkansas",  
	"California",  
	"Colorado",  
	"Connecticut",  
	"Delaware",  
	"District Of Columbia",  
	"Florida",  
	"Georgia",  
	"Hawaii",  
	"Idaho",  
    "Illinois",  
	"Indiana",  
	"Iowa",  
	"Kansas",  
	"Kentucky",  
	"Louisiana",  
	"Maine",  
	"Maryland",  
	"Massachusetts",  
	"Michigan",  
	"Minnesota",  
	"Mississippi",  
	"Missouri",  
	"Montana",
    "Nebraska",
	"Nevada",
	"New Hampshire",
    "New Jersey",
	"New Mexico",
	"New York",
	"North Carolina",
	"North Dakota",
	"Ohio",  
	"Oklahoma",  
	"Oregon",  
	"Pennsylvania",  
	"Rhode Island",  
	"South Carolina",  
	"South Dakota",
	"Tennessee",  
	"Texas",  
	"Utah",  
	"Vermont",  
	"Virginia",  
	"Washington",  
	"West Virginia",  
	"Wisconsin",  
	"Wyoming"
    ];
   $( "#state" ).autocomplete({
      source: stateList
    });
     /* ===================================== SIGNUP CTA BUTTON ====================================================== */
    
    
    
    $("#signupcta").on("click", function(e){
        e.preventDefault();
        window.location.assign("register.html");
    });
	
    /* ===================================== VIEW PROJECTS ====================================================== */   
    
    
    $("#projects_view").on("click", function(e){
        e.preventDefault();
        window.location.assign("questions.html");
    });
    

    
    
	/*	
	==================================================== SORTABLE ===================================================*/
    
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    
    
    
	/*	
	==================================================== END EVENTS ===================================================*/
		
		

	
})(jQuery); // end private scope




