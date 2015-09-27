$(function () {
    $('.example-tooltips').tooltip();
    $('.example-left-tooltip').tooltip({'trigger': 'manual'});
    $('.example-left-tooltip').tooltip('show');

    $('.example-popovers').popover();
    $('.example-left-popover').popover({'trigger': 'click'});
    $('.example-left-popover').popover('show'); 
});