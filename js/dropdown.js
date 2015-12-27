(function ($) {
    Drupal.behaviors.webform_country_dropdown = {
        attach: function (context, settings) {
            var stateDropdownContainer = $('.state-ajax-dropdown-container');
            var stateTextContainer = $('.state-ajax-textfield-container');
            var stateDropdown = $('.state-ajax-dropdown');
            var stateTextfield = $('.state-ajax-textfield');
            stateTextContainer.hide();
            $('body').on('change', '.country-ajax-dropdown', function () {
                var country = $(this).val();
                if (stateDropdownContainer.css('display') == 'block') {
                    stateDropdownContainer.fadeTo('fast',0.5);
                }
                else {
                    stateTextContainer.fadeTo('fast',0.5);
                }
                $.get(Drupal.absoluteUrl('get-country-states/') + country, null, updateStates);
                return false;
            });

            var updateStates = function (response) {
                $('label[for=edit-submitted-state]').html(response.label)
                if (response.dropdown) {
                    stateDropdownContainer.show();
                    stateTextContainer.hide();
                    stateTextfield.val('')
                        .removeAttr('required')
                        .attr('disabled', 'disabled');
                    stateDropdown.html('')
                        .attr('required', 'required')
                        .removeAttr('disabled')
                        .append("<option>" + Drupal.t('- Select -') + "</option>")
                        .next('span').show();
                    $.each(response.options, function (key, value) {
                        stateDropdown.append("<option value='" + key + "'>" + value + "</option>");
                    });
                    stateDropdownContainer.fadeTo('fast',1);
                }
                else {
                    stateTextContainer.show();
                    stateDropdownContainer.hide();
                    stateDropdown.html('')
                        .removeAttr('required')
                        .attr('disabled', 'disabled')
                        .append("<option>" + Drupal.t('- Select -') + "</option>");
                    stateTextfield.attr('required', true).
                        removeAttr('disabled');
                    stateTextContainer.fadeTo('fast',1);
                }
            }

        }
    };
})(jQuery);
