$(function() {
  $('#word').keyup(function(e){
    var text = $(this).val();
    var n = text.split(" ");
    text = n[n.length - 1];

    var limit = 5;

    if(e.which != 32 && e.which != 38 && e.which != 40 && e.which != 13){
      if(text != ''){
        $.ajax({
          url: 'words/',
          method: 'GET',
          data:{search:text, start:0, end:limit},
          dataType: 'json',
          success:function(data){
            var result = "";
            $('#info').html("Total Result: " + data.total + "");
            //Pagination
            var pagination = '<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            var pages = Math.trunc(data.total/limit);
            for(i = 0; i < pages; i++){
              if(i==0)
                  pagination += '<li class="active"><a href="#page='+(i+1)+'">'+(i+1)+'</a></li>';
              else
                pagination += '<li><a href="#page='+(i+1)+'">'+(i+1)+'</a></li>';
            }
            pagination += '<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
            //Suggestions
            for(i = 0; i < data.results.length; i++){
              count = i + 1
              if(i == 0)
                result += '<a href="#' + data.results[i] + '" class="list-group-item active"><strong><span>'+ count + '.</span> ' + data.results[i]+'</strong></a>'
              else
                result += '<a href="#' + data.results[i] + '" class="list-group-item"><strong><span>'+ count + '.</span> ' + data.results[i]+'</strong></a>'
            }
            $('#suggestions').html(result);
            if(data.total>limit)
              $('#pagination ul').html(pagination);
            else
              $('#pagination ul').html('');
          }
        });
      }else{
        $('#suggestions').html('');
        $('#info').html("");
        $('#pagination ul').html('');
        //if backspace
        if(e.keyCode == 8){
          var str = $("#result").text().trim();
          str = str.substring(0, str.lastIndexOf(" "));
          $("#result").html(str + " ");
        }
      }
    }else if(e.which == 32){

    }
  });
});

$(function(){
  $('#suggestions').on('click', 'a', function(){
    var text = $(this).attr('href');
    text = text.substring(1, text.length);
    // $('#result').append(text + " ");
    $('#result').html(text);
    // $('#word').val("");
    $('#word').focus();
  });
});

$(function(){
  $('#bttn_clear_all').click(function(){
    $("#result").html('');
    $("#word").html('');
  });

  $(window).on('hashchange', function() {
    hash = location.hash.replace(/^#/, "" );
    page = hash.split('=')[1];

    var text = $('#word').val();
    var n = text.split(" ");
    text = n[n.length - 1];

    var limit = 5;

    $.ajax({
      url: 'words/',
      method: 'GET',
      data:{search:text, start:page, end:limit+parseInt(page)},
      dataType: 'json',
      success:function(data){
        var result = "";
        $('#info').html("Total Result: " + data.total + "");
        //Pagination
        var pagination = '<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
        var pages = Math.trunc(data.total/limit);
        for(i = 0; i < pages; i++){
          if(i == parseInt(page)-1)
              pagination += '<li class="active"><a href="#page='+(i+1)+'">'+(i+1)+'</a></li>';
          else
            pagination += '<li><a href="#page='+(i+1)+'">'+(i+1)+'</a></li>';
        }
        pagination += '<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
        //Suggestions
        for(i = 0; i < data.results.length; i++){
          count = i + 1
          if(i == 0)
            result += '<a href="#' + data.results[i] + '" class="list-group-item active"><strong><span>'+ count + '.</span> ' + data.results[i]+'</strong></a>'
          else
            result += '<a href="#' + data.results[i] + '" class="list-group-item"><strong><span>'+ count + '.</span> ' + data.results[i]+'</strong></a>'
        }
        $('#suggestions').html(result);
        if(data.total>limit)
          $('#pagination ul').html(pagination);
        else
          $('#pagination ul').html('');
      }
    });
  });
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 13:
        case 32:
          var text = $(".list-group-item.active").attr('href');
          text = text.substring(1, text.length);
          $('#result').append(text + " ");
          // $('#word').val("");
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
