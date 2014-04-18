$(document).ready(function() {
  /* slider js */
  
  // aperture slider
  $( "#f_slider" ).slider({ 
    animate: "slow", // or "fast"
    max: 32,
    min: 1.2,
    step: 0.2,
    value: 3.5,
    slide: function(event, ui) {                        
      $("#f_amount").val(ui.value);                
    } 
  });
  // shutter speed slider
  $( "#s_slider" ).slider({ 
    animate: "slow", // or "fast"
    max: 30,
    min: 0.00025, // 1/4000
    step: 0.5,
    value: 1,
    slide: function(event, ui) {                        
      $("#s_amount").val(ui.value + ' s');                
    }
  });// end slider js

  // lock button js
  $( "button#i_lock" ).click(function() {
    if ($( "i#i_icon" ).hasClass("fa fa-unlock-alt fa-2x") && $( "#iso_select" ).prop("disabled", false)) { //disable selector
      $( "i#i_icon" ).removeClass("fa fa-unlock-alt fa-2x");
      $( "i#i_icon" ).addClass("fa fa-lock fa-2x");
      $( "#iso_select" ).prop("disabled", "disabled");
    } else { //enable selector
      $( "i#i_icon" ).removeClass("fa fa-lock fa-2x");
      $( "i#i_icon" ).addClass("fa fa-unlock-alt fa-2x");
      $( "#iso_select" ).prop("disabled", false);
    }
  });
  $( "button#f_lock" ).click(function() {
    if ($( "i#f_icon" ).hasClass("fa fa-unlock-alt fa-2x") && $( "#f_slider" ).slider( "enable" )) { // lock the slider
      $( "i#f_icon" ).removeClass("fa fa-unlock-alt fa-2x");
      $( "i#f_icon" ).addClass("fa fa-lock fa-2x");
      $( "#f_slider" ).slider( "disable" );
      //$( "#f_amount" ).prop("readonly", true);
    } else { // unlock the slider
      $( "i#f_icon" ).removeClass("fa fa-lock fa-2x");
      $( "i#f_icon" ).addClass("fa fa-unlock-alt fa-2x");
      $( "#f_slider" ).slider( "enable" );
      //$( "#f_amount" ).prop("readonly", false);
    }
  });
  $( "button#s_lock" ).click(function() {
    if ($( "i#s_icon" ).hasClass("fa fa-unlock-alt fa-2x") && $( "#s_slider" ).slider( "enable" )) { // lock the slider
      $( "i#s_icon" ).removeClass("fa fa-unlock-alt fa-2x");
      $( "i#s_icon" ).addClass("fa fa-lock fa-2x");
      $( "#s_slider" ).slider( "disable" );
      //$( "#s_amount" ).prop("readonly", true);
    } else { //unlock the slider
      $( "i#s_icon" ).removeClass("fa fa-lock fa-2x");
      $( "i#s_icon" ).addClass("fa fa-unlock-alt fa-2x");
      $( "#s_slider" ).slider( "enable" );
      //$( "#s_amount" ).prop("readonly", false);
    }
  });//end lock button js
}); // end document js