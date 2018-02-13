(function($) {
  $.fn.selectplus = function() {
    return this.each(function() {
      var fieldname = 'selectplus';
      var addbtn = $('.add-page-button');
      var container = $('.field-selectplus');
      var selectWithAdd = $('.selectplus-content');

      container.hide();

      addbtn.unbind('click').on('click', function(e) {
         e.preventDefault();
         selectWithAdd.toggle();
         container.toggle();
      });


      container.on('click', '.save-button', function(e) {

        container.removeClass('error');
        $('.error-message').remove();
        var fields = container.find('input');
        var uid = container.find('input').first().val();

        if(uid == '') {
          alert('The first field may not be empty');
        }
        $.fn.ajaxSelectplus(fieldname, fields, container, selectWithAdd);
        return false;
      });

    });

  };

  // Ajax function
  $.fn.ajaxSelectplus = function(fieldname, fields, container, selectWithAdd) {
    item = {}
    fields.each(function() {

     item[$( this ).attr('name')] = $(this).val();
    });

    var blueprintFieldname = $('.select-with-add').data('fieldname');
    var selectbox = $('.select-with-add').find('select');
    var baseURL = window.location.href.replace(/(\/edit.*)/g, '/field') + '/' + blueprintFieldname + '/' + fieldname;

    var data = item;
    $.ajax({
      contentType: "application/json; charset=utf-8",
      url: baseURL + '/selectplus',
      type: 'POST',
      data: data,
      dataType: "json",
      success: function(response) {
        if(response.class == 'error') {

          container.prepend('<span class="error-message">'+response.message+'</span>').addClass(response.class);
        }

        if(response.class == 'success') {

          //container.before(response.message);//.addClass(response.class);

          setTimeout(function () {
              container.hide();
          }, 0);
          selectWithAdd.show();
          selectbox.append('<option value="'+response.uid+'" selected>'+response.title +'</option>');

        }
      }
    });
  };

})(jQuery);
