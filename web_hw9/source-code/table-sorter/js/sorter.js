var sort_arr = [];
var toggle = 1;
var table;

ascend = function(a,b) {
    return a > b;
}
    
descend = function(a,b){
    return b > a;
}

sort  =  function(tem_index)  {
    for (i = 0; i < sort_arr.length; i++){
        var temp = sort_arr[i];
        $(table+" tbody tr").each(function() {
            var thisText = $(this).children("td:eq("+tem_index+")").text();
            if(thisText == temp){
                $(table+" tbody").append($(this));
            }
        });
    }
    $("table tr").removeClass("even");
    $("table tr:even").addClass("even");
}

//点击时执行的函数
respond = function(tem_index) {
    sort_arr = [];
    $(table+" tbody tr").each(function() {
        var tdCont = $(this).children("td:eq("+tem_index+")").text();
        sort_arr.push(tdCont);
    });
    $("th").removeClass("hover");
    $(".logo").hide();
}

window.onload = function() {
    $("th").append("<p class='logo acsend'><img src='./img/ascend.png'/></p>");
    $("th").append("<p class='logo decsend'><img src='./img/descend.png'/></p>");
    $(".logo").hide();
    $("table tr:even").removeClass().addClass("even");

    $("th").click(function(){
        table = "#"+$(this).parent().parent().parent().attr('id');
        respond($(this).index());
        $(this).addClass("hover");
        if (toggle== 1) {
            sort_arr.sort(ascend);
            $(this).children(".acsend").show();
            toggle = 0;
        } else {
            sort_arr.sort(descend);
            $(this).children(".decsend").show();
            toggle = 1;
        }
        sort($(this).index());
    })  
}