window.onload = function() {
	gameground = document.getElementById("gameground");
	var input_array = document.createDocumentFragment();

	for (var i = 0; i < 60; i++) {
		var hole = document.createElement('input');
		hole.type = "radio";
		hole.disabled = true;
		hole.className = "holes";
		input_array.appendChild(hole);
		hole.addEventListener('click', handle);
	}
	gameground.appendChild(input_array);

	var start_button = document.getElementById("my_start");
	var score = document.getElementById("score");
	var time = document.getElementById("time");
	var status = document.getElementById("status");
	var holes = document.getElementsByClassName('holes');
	var start_flag = false;
	var timer = null;
	var random = Math.floor(Math.random()*(59+1));
	var cur_hole = holes[random];

	start_button.onclick = function (e) {
		if (start_flag == false) {
			start_flag = true;
			if (time.value == '0') {
				time.value =  "30";
				score.value = '0';
				cur_hole.checked = 'checked';
				status.value = "Playing";
			}
			status.value = "Playing";
			cur_hole.checked = 'checked';
			for (var i = 0; i < holes.length; i++) {
				holes[i].disabled = false;
			}
			timer = setInterval(time_interval,1000);
		} else {
			clearTimeout(timer);
			start_flag = false;
			status.value = "Pause";
			for (var i = 0; i < holes.length; i++) {
				holes[i].disabled = true;
			}
		}
	}
	function time_interval() {
		if (time.value == '0') {
			clearTimeout(timer);
			start_flag = false;
			status.value = 'Game Over';
			cur_hole.checked = false;
			for (var i = 0; i < holes.length; i++) {
				holes[i].disabled = true;
			}
			alert('Game Over! \n Your Score is :' + score.value);
		} else  {
			time.value = parseInt(time.value)-1;
		}
	}
	function handle (e) {
		if (e.target != cur_hole) {
			score.value = (parseInt(score.value) > 0) ? (parseInt(score.value)-1) : 0;
			e.target.checked = false;
		} else {
			e.target.checked = false;
			e.target.style.backgroundColor = 'white';
			score.value = parseInt(score.value) +1;
			random = Math.floor(Math.random()*(59+1));
			cur_hole = holes[random];
			cur_hole.checked = 'checked';
			cur_hole.style.backgroundColor = 'blue';
		}
	}
}

