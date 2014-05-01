/*
 * Lib
 * slider.js
 */

$(document).ready(function() {
  /* Typical one-half-stop f-number scale(wikipedia) */
  var sRange = [960, 480, 240, 120, 60, 30, 15, 8, 4, 2, 1, 1/2, 1/4, 1/8, 1/15, 1/30, 1/60, 1/125, 1/250, 1/500, 1/1000, 1/2000, 1/4000, 1/8000, 1/15000, 1/30000, 1/60000];
  var sRangeStr = ['960', '480', '240', '120', '60', '30', '15', '8', '4', '2', '1', '1/2', '1/4', '1/8', '1/15', '1/30', '1/60', '1/125', '1/250', '1/500', '1/1000', '1/2000', '1/4000', '1/8000', '1/15000', '1/30000', '1/60000'];
  var fRange = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32];
  var aperture = $('#f_amount').data('aperture'); 
  var shutter = $('#s_amount').data('shutter');
  var iso = $('#iso_select').data('iso');
  var fPosition;
  var sPosition;
  var fChange = false;
  var sChange = false;

  /* iso value */
  $('#iso_select').val(iso);

  /* aperture slider */
  $( "#f_slider" ).slider({
    animate: "slow", // or "fast"
    max: fRange.length - 1,
    min: 0,
    create: function(event, ui) {
      fPosition = fRange.indexOf(aperture);
      $('#f_slider').slider("option", "value", fPosition);
    },
    slide: function(event, ui) {                        
      $("#f_amount").val('f/' + fRange[ui.value]);
    },
    change: function(event, ui) {
      if(sChange) {
        // do nothing
        sChange = false;
      } else {
        fChange = true;
        var value = $("#f_slider").slider("option", "value");

        if(fPosition < value) 
        { //increasing aperture value
          var shutter = $("#s_slider").slider("option", "value");
          shutter = shutter - (value - fPosition);
          $("#s_slider").slider("option", "value", shutter);
          $("#s_amount").val(sRangeStr[shutter] + ' s');
        }
        else if(fPosition > value) 
        { //decreasing aperture value
          var shutter = $("#s_slider").slider("option", "value");
          shutter = shutter + (fPosition - value);
          $("#s_slider").slider("option", "value", shutter);
          $("#s_amount").val(sRangeStr[shutter] + ' s');
        } 
        else 
        {
          console.log("equal");
        }

        fPosition = value;
      }
    }
  });
  
  /* shutter speed slider */
  $( "#s_slider" ).slider({ 
    animate: "slow", // or "fast"
    max: sRange.length - 1,
    min: 0,
    create: function(event, ui) {
      sPosition = sRange.indexOf(shutter);
      $('#s_slider').slider("option", "value", sPosition);
    },
    slide: function(event, ui) {                    
      $("#s_amount").val(sRangeStr[ui.value] + ' s');           
    },
    change: function(event, ui) {
      if(fChange) {
        //do nothing
        fChange = false;
      } else {
        sChange = true;
        var value = $("#s_slider").slider("option", "value");

        if(sPosition < value) 
        { //decreasing shutter value
          var aperture = $("#f_slider").slider("option", "value");
          aperture = aperture + (sPosition - value);

          if(fRange[aperture] === undefined) {
            $('#main_content').css('background-color', '#ff0000');
          } else {
            $('#main_content').css('background-color', '#ffffff');
          }

          $("#f_slider").slider("option", "value", aperture);
          $("#f_amount").val('f/' + fRange[aperture]);
        }
        else if(sPosition > value) 
        { //decreasing shutter value
          var aperture = $("#f_slider").slider("option", "value");
          aperture = aperture - (value - sPosition);

          if(fRange[aperture] === undefined) {
            $('#main_content').css('background-color', '#ff0000');
          } else {
            $('#main_content').css('background-color', '#ffffff');
          }

          $("#f_slider").slider("option", "value", aperture);
          $("#f_amount").val('f/' + fRange[aperture]);
        } 
        else 
        {
          console.log("equal");
        }
        sPosition = value;
      }
    }
  });

  /* lock button js */
  $( "button#i_lock" ).click(function() { //disable selector
    if ($( "i#i_icon" ).hasClass("fa fa-unlock-alt fa-2x") && $( "#iso_select" ).prop("disabled", false)) {
      $( "i#i_icon" ).removeClass("fa fa-unlock-alt fa-2x");
      $( "i#i_icon" ).addClass("fa fa-lock fa-2x");
      $( "#iso_select" ).prop("disabled", "disabled");
    } else { //enable selector
      $( "i#i_icon" ).removeClass("fa fa-lock fa-2x");
      $( "i#i_icon" ).addClass("fa fa-unlock-alt fa-2x");
      $( "#iso_select" ).prop("disabled", false);
    }
  });
  $( "button#f_lock" ).click(function() { // lock the slider
    if ($( "i#f_icon" ).hasClass("fa fa-unlock-alt fa-2x") && $( "#f_slider" ).slider( "enable" )) {
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
  $( "button#s_lock" ).click(function() { // lock the slider
    if ($( "i#s_icon" ).hasClass("fa fa-unlock-alt fa-2x") && $( "#s_slider" ).slider( "enable" )) {
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

//var fRange = [0.70, 0.84, 1.0, 1.2, 1.4, 1.7, 2, 2.4, 2.8, 3.3, 4, 4.8, 5.6, 6.7, 8, 9.5, 11, 13, 16, 19, 22, 27, 32];
/* agreed standards for shutter speeds(wikipedia) */
//var sRange = [1/1000, 1/500, 1/250, 1/125, 1/60, 1/32, 1/15, 1/8, 1/4, 1/2, 1];
//var sRangeStr = ['1/1000', '1/500', '1/250', '1/125', '1/60', '1/32', '1/15', '1/8', '1/4', '1/2', '1'];