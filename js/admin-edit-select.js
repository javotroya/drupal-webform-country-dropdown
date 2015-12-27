(function($){
    Drupal.behaviors.editSelect = {};
    Drupal.behaviors.editSelect.attach = function(context) {
        $('#edit-dropdown-options-dropdown-you-need-us').on('click', function(){
            if ($(this).is(':checked')) {
                $('#edit-extra-aslist').attr('checked', true);
                $('.form-item-extra-empty-option').show();
            }
        })
    }
})(jQuery);