$(function() {
  $('#word').keyup(function(e){
    var text = $(this).val();
    if(e.which != 13 && e.which != 38 && e.which != 40){
      if(text != ''){
        $.ajax({
          url: 'words/',
          method: 'GET',
          data:{search:text},
          dataType: 'json',
          success:function(data){
            var result = "";
            $('#info').html("Total Result: " + data.length + "");
            for(i = 0; i < data.length; i++){
              count = i + 1
              if(i == 0)
                result += '<a href="#'+data[i]+'" class="list-group-item active"><strong><span>'+ count + '.</span> ' + data[i]+'</strong></a>'
              else
                result += '<a href="#'+data[i]+'" class="list-group-item"><strong><span>'+ count + '.</span> ' + data[i]+'</strong></a>'
            }
            $('#suggestions').html(result);
          }
        });
      }else{
        $('#suggestions').html('');
        $('#info').html("");
        if(e.keyCode == 8){
          var str = $("#result").text().trim();
          str = str.substring(0, str.lastIndexOf(" "));
          $("#result").html(str + " ");
        }
      }
    }else if(e.which == 13){
      // var text = $('#suggestions a:first-child').attr('href');
      // text = text.substring(1, text.length);
      // $('#word').val("");
      // $('#result').append(text + " ");
      // $('#suggestions').html("");
      // $('#info').html("");
    }
  });
});

$(function(){
  $('#suggestions').on('click', 'a', function(){
    var text = $(this).attr('href');
    text = text.substring(1, text.length);
    $('#result').append(text + " ");
    $('#word').val("");
    $('#word').focus();
  });
});

$(function(){
  $('#bttn_clear_all').click(function(){
    $("#result").html('');
  });
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 13:
          var text = $(".list-group-item.active").attr('href');
          text = text.substring(1, text.length);
          $('#result').append(text + " ");
          $('#word').val("");
          $('#word').focus();
          $('#suggestions').html('');
          $('#info').html("");
        case 38: // up
        var selected = $(".list-group-item.active");
        $('.list-group-item.active').removeClass('active');
        if(selected.prev().length == 0){
          selected.siblings().last.addClass('active');
        }else{
          selected.prev().addClass("active");
        }
        break;

        case 40: // down
          var selected = $(".list-group-item.active");
          $(".list-group-item.active").removeClass("active");
          if (selected.next().length == 0) {
              selected.siblings().first().addClass("active");
          } else {
              selected.next().addClass("active");
          }
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
