function resetAll() {
    var buttons = $('.button'),
        unreads = $('.unread'),
        resultBall = $('#info-bar'),
        resultLabel = $('.page');
    buttons.toggleClass('waiting', false);
    unreads.hide();
    unreads.text('');
    resultBall.toggleClass('waiting', true);
    resultLabel.text('');
}

function numberButtonClick(index) {
    var buttons = $('.button'),
        button = buttons.eq(index),
        unread = $('.unread', button);
    if (button.hasClass('waiting') || unread.text() === '…') {
        return;
    }
    unread.show();
    unread.text('…');
    $.get('/', function (data) {
        if (!unread.is(':visible')) {
            return;
        }
        unread.text(data);
        button.toggleClass('waiting', true);
        if ($('.button.waiting').length === 5) {
            $('#info-bar').toggleClass('waiting', false);
            resultBallClick();
        }
    });
}

function resultBallClick() {
    var resultBall = $('#info-bar');
    if (resultBall.hasClass('waiting')) {
        return;
    }
    var sum = 0;
    for (var i = 0; i < 5; ++i) {
        sum += parseInt($('.unread').eq(i).text());
    }
    $('.page').text(sum.toString());
    resultBall.toggleClass('waiting', true);
}

$(window).load(function () {
    $('#button').mouseleave(resetAll);
    $('.apb').click(function () {
        var rnd = [0, 1, 2, 3, 4], i, tmp, r, apb = ['A', 'B', 'C', 'D', 'E'];
        for (i = 4; i > 0; --i) {
            r = Math.floor(Math.random() * (i));
            tmp = rnd[r];
            rnd[r] = rnd[i];
            rnd[i] = tmp;
        }
        $('.page').text(apb[rnd[0]] + apb[rnd[1]] + apb[rnd[2]] + apb[rnd[3]] + apb[rnd[4]]);
        for (i = 0; i < 5; ++i) {
            numberButtonClick(rnd[i]);
        }
    });
    resetAll();
});