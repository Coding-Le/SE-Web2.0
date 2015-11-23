var blank_position = left_of_blank = right_of_blank = over_of_blank = down_of_blank = 0;
var local = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var start_time = start_steps = 0;

function judgenum (num) {
	if (num >=1 && num <= 16) return true;
	return false;
}

//获取距离左边的left值
function get_left_distance(s, e) {
 	if (s < e) {
 		if (s==1 || s==5 || s==9 || s==13) return 89;
 		if (s==2 || s==6 || s==10 || s== 14) return 178;
 		return 267;
 	} else {
 		if (s==2 || s==6 || s==10 || s== 14) return 0;
 		if (s==3 || s==7 || s==11 || s== 15) return 89;
 		return 178;
 	}
}

//获取距离上边的top值
function get_top_distance(s, e) {
	if (s < e) {
		if (s==1 || s==2 || s==3 || s==4) return 89;
		if (s==5 || s==6 || s==7 || s==8) return 178;
		return 267;
	} else {
		if (s==5 || s==6 || s==7 || s==8) return 0;
		if (s==9 || s== 10 || s==11 || s==12) return 89;
		return 178;
	}
}

//设置每一块点击响应的移动函数。
function moving() {
	for (var i = 1; i <= 16;  ++i) {
		if ((i == blank_position-1 && judgenum(blank_position-1))
			|| (i == blank_position+1 && judgenum(blank_position+1))
			|| (i == blank_position-4 && judgenum(blank_position-4))
			|| (i == blank_position+4 &&  judgenum(blank_position+4))) {
			var getid = local[i-1];
			var real_id = "position_" + getid;
			document.getElementById(real_id).onclick=function() {
				var temp = this.id.substring(9);
				var x = parseInt(temp);
				for (var j = 0; j < 16; j++) {
					if (local[j] == x) {
						var id = j+1;
						break;
					}
				}

				//从左边移动
				if (id == blank_position-1) {
					left_of_blank = blank_position-1;
					var left_distance = get_left_distance(id, blank_position) + "px";
					var blank_distance = (get_left_distance(id, blank_position)-89) + "px"
					this.style.left = left_distance;
					document.getElementById("position_16").style.left =blank_distance;
					var temp = local[blank_position-1];
					local[blank_position-1] = local[id-1];
					local[id-1] = temp;
					blank_position = left_of_blank;
					check_win();
					moving();
				}

				//从右边移动
				if (id == blank_position+1) {
					right_of_blank = blank_position+1;
					var left_distance = get_left_distance(id, blank_position) + "px";
					var blank_distance = (get_left_distance(id, blank_position)+89) + "px"
					this.style.left = left_distance;
					document.getElementById("position_16").style.left =blank_distance;
					var temp = local[blank_position-1];
					local[blank_position-1] = local[id-1];
					local[id-1] = temp;
					blank_position = right_of_blank;
					check_win();
					moving();
				}

				//从上方移动
				if (id == blank_position-4) {
					over_of_blank = blank_position-4;
					var top_distance = get_top_distance(id, blank_position) + "px";
					var blank_distance = (get_top_distance(id, blank_position)-89) + "px"
					this.style.top = top_distance;
					document.getElementById("position_16").style.top =blank_distance;
					var temp = local[blank_position-1];
					local[blank_position-1] = local[id-1];
					local[id-1] = temp;
					blank_position = over_of_blank;
					check_win();
					moving();
				}

				//从下方移动
				if (id == blank_position+4) {
					down_of_blank = blank_position+4;
					var top_distance = get_top_distance(id, blank_position) + "px";
					var blank_distance = (get_top_distance(id, blank_position)+89) + "px"
					this.style.top = top_distance;
					document.getElementById("position_16").style.top =blank_distance;
					var temp = local[blank_position-1];
					local[blank_position-1] = local[id-1];
					local[id-1] = temp;
					blank_position = down_of_blank;
					check_win();
					moving();
				}

				start_steps += 1;
				document.getElementById("steps_count").value = start_steps;
			}
		}
	}	
}

//产生随机分布
function random_change(i, j, k) {
	var temp = "position_" + i;
	var left = j+"px";
	var top = k+"px";
	document.getElementById(temp).style.left = left;
	document.getElementById(temp).style.top = top;
}

function add_second() {
	start_time +=1;
	document.getElementById("time_count").value = start_time+" s";
}

function count_time() {
	timer = setInterval(add_second, 1000);
}

//游戏开始的设置
function start_game() {
	var first_begin = 0;
	document.getElementById("start_button").onclick=function() {
		document.getElementById("tips_show").innerText = "Playing";
		if (first_begin != 0) clearInterval(timer);
		start_time = 0;
		document.getElementById("time_count").value="0 s";
		document.getElementById("steps_count").value="0";
		var i = 0;
		var random_num=Math.ceil((Math.random()*1000000))%16;
		var random_add = 1;
		while (16%random_add == 0 || random_add%2 ==0) {
			random_add=Math.ceil((Math.random()*1000000))%16;
		}
		for (var top=0; top < 268; top+=89) {
			for (var left=0; left< 268; left+=89, random_num+=random_add, i++) {
				random_num %= 16;
				random_change(random_num+1,left,top);
				local[i]=random_num+1;
				if (local[i] == 16) blank_position = i+1;
			}
		}
		first_begin = 1;
		count_time();
		moving();
	}
}

//改变游戏中拼图的背景图片
function changeBackground() {
	document.getElementById("change_background").onclick =function() {
		document.getElementById("tips_show").innerText = "Game stop, you can change the background to restart";
		for (var i = 1; i <= 10; ++i) {
			var temp = "background_" + i;
			document.getElementById(temp).className = "changed_show";
		}
		start_time = start_steps = 0;
		document.getElementById("time_count").value="0 s";
		document.getElementById("steps_count").value="0";
		clearInterval(timer);
	}

	//从background_1到background_10循环10次改变className
	for (var t = 1; t <= 10; ++t) {
		var temp_id="background_"+t;
		document.getElementById(temp_id).onclick=function() {
			document.getElementById("tips_show").innerText = "Move to 'start' to restart";
			var idd = this.id.substring(11);
			for (var i = 1; i <= 15; ++i) {
				var temp = "position_"+i;
				document.getElementById(temp).className="changed_game_area"+idd;
			}
			for (var i = 1; i <= 10; ++i) {
				var temp = "background_" + i;
				document.getElementById(temp).className = "backgroundclass";
			}
			var i = 0;
			var random_num = 0;
			for (var top=0; top < 268; top+=89) {
				for (var left=0; left< 268; left+=89, i++) {
					random_change(random_num+1,left,top);
					local[i]=random_num+1;
					if (local[i] == 16) blank_position = i+1;
					random_num++;
				}
			}
		}
	}
}

//判断是否胜利。
function check_win() {
	var judge = true;
	for (var i=0; i<16; ++i) {
		if (local[0] != i+1) {
			judge = false;
			break;
		}
	}
	if(judge) {
		document.getElementById("tips_show").innerText ="You win!";
	}
}

window.onload = function() {
	start_game();
	changeBackground();
}