$(function() {
  $('#post-form').submit( function(e) {
    var outarea = $('#viewout #code-post pre');
    var viewarea = $('#viewout #view-post');

    var form_data = $(this).serializeArray();
    var form_hash = {};
    form_data.forEach(function(elem) {
        form_hash[elem['name']] = elem['value'];
    });

    var code = "";


    outarea.text(code);
    viewarea.html(code);
    return false;
  });
});