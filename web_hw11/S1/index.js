function resetAll() {
    var buttons = $('.button'),
        unread_arr = $('.unread');
    buttons.toggleClass('waiting', false);
    unread_arr.hide();
    unread_arr.text('');
    $('#info-bar').toggleClass('waiting', true);
    $('.page').text('');
}

function numberButtonClick(index) {
    var buttons = $('.button'),
        button = buttons.eq(index),
        unread = $('.unread', button);
    if (button.hasClass('waiting') || unread.text() === '…') {
        return;
    }
    buttons.toggleClass('waiting', true);
    button.toggleClass('waiting', false);
    unread.show();
    unread.text('…');
    $.get('/', function (data) {
        unread.text(data);
        buttons.each(function (i) {
            buttons.eq(i).toggleClass('waiting', $('.unread', buttons.eq(i)).is(':visible'));
        });
        if ($('.unread:visible').length === 5) {
            $('#info-bar').toggleClass('waiting', false);
        }
    });
}

function resultBallClick() {
    if ($('#info-bar').hasClass('waiting')) {
        return;
    }
    var sum = 0;
    for (var i = 0; i < 5; ++i) {
        sum += parseInt($('.unread').eq(i).text());
    }
    $('.page').text(sum.toString());
    $('#info-bar').toggleClass('waiting', true);
}

$(window).load(function () {
    $('.button').each(function (index) {
        $('.button').eq(index).click(function () {
            numberButtonClick(index);
        });
    });
    $('#button').mouseleave(resetAll);
    $('#info-bar').click(resultBallClick);
    resetAll();
});



