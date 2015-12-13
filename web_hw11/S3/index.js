var indexs = 0;
function resetAll() {
    var buttons = $('.button'),
        unread_arr = $('.unread');
    buttons.toggleClass('waiting', false);
    unread_arr.hide();
    unread_arr.text('');
    $('#info-bar').toggleClass('waiting', true);
    $('.page').text('');
    indexs = 0;
}

function numberButtonClick(index) {
    var buttons = $('.button'),
        button = buttons.eq(index),
        unread = $('.unread', button);
    buttons.toggleClass('waiting', true);
    button.toggleClass('waiting', false);
    unread.show();
    unread.text('…');
    $.get('/', function (data) {
        unread.text(data);
        indexs++;
        buttons.each(function (i) {
            buttons.eq(i).toggleClass('waiting', $('.unread', buttons.eq(i)).is(':visible'));
        });
        if (indexs >= 5) {
            resultBallClick();
        }
        // if ($('.unread:visible').length === 5) {
        //     resultBallClick();
        // }
    });
    if (index <= 4) {
        numberButtonClick(index+1);
    }
}

function resultBallClick() {
    var sum = 0;
    for (var i = 0; i < 5; ++i) {
        sum += parseInt($('.unread').eq(i).text());
    }
    $('.page').text(sum.toString());
    $('#info-bar').toggleClass('waiting', true);
}

$(window).load(function () {
    $('.apb').click(function () {
        numberButtonClick(0);
    });
    $('#button').mouseleave(resetAll);
    resetAll();
});


