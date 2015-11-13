var maze = document.getElementById("maze");
var start = document.getElementById("start");
var path = document.getElementsByClassName("path");
var path4 = document.getElementById("path4");
var path5 = document.getElementById("path5");
var end_box = document.getElementById("end");
var block = document.getElementsByClassName("block");
var message = document.getElementById("message");
var container = document.getElementById("container");
var top_outer = document.getElementById("start-box");
var bottom_outer = document.getElementById("end-box");
// window.onload = function() {
// 	var onway = false;
// 	var to_end = false;
// 	var game_end = function() {
// 		onway = false;
// 		to_end = false;
// 	}
// 	start.onmousemove = function() {
// 		onway = true;
// 		message.innerHTML = '<br />';
// 	}
// 	var i;
// 	for (i = 0; i < block.length; i++) {
// 		block[i].onmousemove = function(e) {
// 			if (onway === true) {
// 				game_end(); 
// 				this.className += ' ' + 'change';
// 				message.textContent = 'You Lose';
// 			}
// 		}
// 	}
// 	container.onmousemove = function() {
// 		for (i = 0; i < block.length; i++) {
// 			if (block[i].className.match('change')) {
// 			block[i].className = block[i].className.replace(' change', "" ); 
// 			}
// 		}
// 	}
// 	maze.onmousemove = function() {
// 		event.stopPropagation();
// 	}
// 	path4.onmousemove = function() {
// 		to_end = false;
// 	}
// 	path5.onmousemove = function() {
// 		to_end = true;
// 	}
// 	end_box.onmouseover = function() {
// 		if (to_end === true && onway === true) {
// 			message.textContent = "You Win";
// 			game_end();
// 		} else if ((to_end === false && onway === true) || (to_end === false && onway === false)) {
// 			message.textContent = "Don`t cheat, you should start form the 'S' and move to the 'E' inside the maze!"
// 			game_end();
// 		}
// 	}
// }
// mazeWidth = 500;
// mazeHeight = 300;
// maze.style.display = "none";
// canvas = document.createElement("canvas");  
// playground.appendChild(canvas);
// canvas.id = "myCanvas";
// canvas.setAttribute('width',mazeWidth); 
// canvas.setAttribute('height',mazeHeight);
// ctx = canvas.getContext("2d");
// document.onreadystatechange = function() {
// 	ctx.drawImage(maze,0,0); 
// }
 window.onload = function() {
 	var start_flag = false;
 	var cheat_flag = false;
 	start.onmousemove = function(e) {
 		start_flag = true;
 		cheat_flag = true;
 		message.innerHTML = '<br />';
 		for (i = 0; i < block.length; i++) {
			if (block[i].className.match('change')) {
			block[i].className = block[i].className.replace(' change', "" ); 
			}
		}
 	}
 	var i;
 	for (i = 0; i < block.length; i++) {
		block[i].onmousemove = function(e) {
			if (start_flag === true) {
				this.className += ' ' + 'change';
				message.textContent = 'You Lose';
				start_flag = false;
				cheat_flag = false;
			}
		}
	}
	for (i = 0; i < 4; i++) {
		path[i].onmousemove = function() {
			cheat_flag = true;
		}		
	}
	path5.onmousemove = function() {
		cheat_flag = false;
	}
	container.onmousemove = function() {
		// x = e.pageX - maze.offsetLeft;
 	// 	y = e.pageY - maze.offsetTop;
		for (i = 0; i < block.length; i++) {
			if (block[i].className.match('change')) {
			block[i].className = block[i].className.replace(' change', "" ); 
			}
		}
	}
	// if (y > 320 || y < -20) {
	// 	start_flag = false;
	// }
	maze.onmousemove = function() {
		event.stopPropagation();
	}
	end_box.onmouseover = function() {
		if (start_flag === true && cheat_flag == false) {
			message.textContent = "You Win";
			start_flag = false;
		} else  if (cheat_flag == true) {
			message.textContent = "Don`t cheat, you should start form the 'S' and move to the 'E' inside the maze!"
			cheat_flag = false;
			start_flag = false;
		}
	}
 }