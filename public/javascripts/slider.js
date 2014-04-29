$(document).ready(function() {
  /* slider js */

  /* Typical one-half-stop f-number scale */
  var fRange = [0.70, 0.84, 1.0, 1.2, 1.4, 1.7, 2, 2.4, 2.8, 3.3, 4, 4.8, 5.6, 6.7, 8, 9.5, 11, 13, 16, 19, 22, 27, 32];

  // aperture slider
  $( "#f_slider" ).slider({ 
    animate: "slow", // or "fast"
    max: fRange.length - 1,
    min: 0,
    value: 7,
    slide: function(event, ui) {                        
      $("#f_amount").val('f/' + fRange[ui.value]);                      
    } 
  });

  /* agreed standards for shutter speeds */
  var sRange = [1/1000, 1/500, 1/250, 1/125, 1/60, 1/30, 1/15, 1/8, 1/4, 1/2, 1];
  var sRangeStr = ['1/1000', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15', '1/8', '1/4', '1/2', '1'];

  // shutter speed slider
  $( "#s_slider" ).slider({ 
    animate: "slow", // or "fast"
    max: sRange.length - 1,
    min: 0,
    value: 3,
    slide: function(event, ui) {                    
      $("#s_amount").val(sRangeStr[ui.value] + ' s');           
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