//use checker to check your error message
window.onload = function() {
    var inputArea = document.getElementsByTagName("input");
    var errorArea = document.getElementsByClassName("error");

    for (var i = 0; i < 6; ++i) {
        inputArea[i].onblur = (function(index) {
            return function() {
                if (!this.value) {
                    errorArea[index].textContent = nullMessage[this.name];
                } else if ((index != 2 && !regExp[this.name].test(this.value)) ||
                    (index == 2 && this.value != inputArea[1].value)) {
                    errorArea[index].textContent = errorMessage[this.name];
                } else {
                    errorArea[index].textContent = "";
                    if (index == 1 || index == 2) {
                        if (inputArea[1].value == inputArea[2].value) {
                            errorArea[1].textContent = errorArea[2].textContent = "";
                        }
                    }
                }
            };
        })(i);
    }
    // reset
    inputArea[6].onclick = function() {
        for (var i = 0; i < 6; ++i) {
            inputArea[i].value = "";
            errorArea[i].textContent = "";
        }
    };
    // submission judgement
    inputArea[7].onclick = function() {
        for (var i = 0; i < 6; ++i) {
            if (!!errorArea[i].textContent) return false;
        }
        return true;
    };
}