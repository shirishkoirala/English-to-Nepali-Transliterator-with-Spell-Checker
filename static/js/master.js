/* keyCodes
    Space         = 32
    BackSpace     = 8
    Up Arrow      = 38
    Down Arrow    = 40
    Enter         = 13
*/
var total_page = 0;
var limit = 5;

$('document').ready(function(){
  $('#word').focus();
});

$(function() {
  $('#word').keyup(function(e){
    var text = $(this).val();
    var n = text.split(" ");
    text = n[n.length - 1];

    if(e.which != 32 && e.which != 38 && e.which != 40 && e.which != 13){
      if(text != ''){
        $.ajax({
          url: 'words/',
          method: 'POST',
          data:{search:text, start:0, end:limit},
          dataType: 'json',
          success:function(data){
            var result = "";
            $('#info').html("Total Result: " + data.total + "");
            //Pagination
            var pagination = '<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            var pages = Math.trunc(data.total/limit);
            total_page = pages;
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
        if(e.which == 8){
          var str = $("#result").text().trim();
          str = str.substring(0, str.lastIndexOf(" "));
          $("#result").html(str + " ");
        }
      }
    }else if(e.which == 8){
      $('#suggestions').html('');
      $('#info').html("");
      $('#pagination ul').html('');
      $('#result').html('');
      // var str = $("#result").text().trim();
      // str = str.substring(0, str.lastIndexOf(" "));
      // $("#result").html(str + " ");
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
    // console.log('Page:' + page + ';Limit:'+limit+';Start:'+(limit*parseInt(page))+';End:'+((limit*parseInt(page))+limit));
    $.ajax({
      url: 'words/',
      method: 'POST',
      data:{search:text, start:limit*parseInt(page), end:(limit*parseInt(page))+limit},
      dataType: 'json',
      success:function(data){
        var result = "";
        $('#info').html("Total Result: " + data.total + "");
        //Pagination
        var pagination = '<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
        var pages = Math.trunc(data.total/limit);
        total_page = pages;
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
          var unicode = $('#result').html().trim();
          var unicode_last_word = unicode.substring(unicode.lastIndexOf(' '), unicode.length);

          var ascii = $('#word').val().trim();
          var ascii_last_word = ascii.substring(ascii.lastIndexOf(' '), ascii.length);

          var text = $(".list-group-item.active").attr('href');
          text = text.substring(1, text.length);

          if(unicode_last_word.trim() != text.trim()){
            $('#result').append(text + " ");
            $('#word').focus();
            $('#suggestions').html('');
            $('#info').html("");
            $('#word').val($('#word').val()+" ");
          }else{
            $('#word').val($('#word').val()+" ");
            $('#word').focus();
            $('#suggestions').html('');
            $('#info').html("");
          }
          $.ajax({
            url: 'dict/',
            method: 'POST',
            data:{'ascii':ascii_last_word, 'unicode':text},
            dataType: 'json',
            success:function(data){

            }
          });
        case 38: // up
        var selected = $(".list-group-item.active");
        $('.list-group-item.active').removeClass('active');
        if(selected.prev().length == 0){
          selected.siblings().first().addClass('active');
          if(location.hash != ''){
            hash = location.hash.replace(/^#/, "" );
            page = hash.split('=')[1];
            page = parseInt(page) - 1;
            if(page >= 1){
              location.hash = '#page='+page;
            }
          }else{
            selected.siblings().first().addClass('active');
          }
        }else{
          selected.prev().addClass("active");
        }
        break;

        case 40: // down
          var selected = $(".list-group-item.active");
          $(".list-group-item.active").removeClass("active");
          if (selected.next().length == 0) {
              if(location.hash == ''){
                  location.hash = '#page=2';
              }else{
                hash = location.hash.replace(/^#/, "" );
                page = hash.split('=')[1];
                page = parseInt(page) + 1;
                if(page <= total_page)
                  location.hash = '#page='+page;
                // else
                  //selected.siblings().last().addClass("active");
              }
          } else {
              selected.next().addClass("active");
          }
        break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
