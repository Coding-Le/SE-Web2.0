var start_flag = false;
var cheat_flag = false;
var maze = document.getElementById("maze");
var start_block = document.getElementById("start_block");
var path = document.getElementsByClassName("path");
var path5 = document.getElementById("path5");
var end_box = document.getElementById("end_block");
var block = document.getElementsByClassName("block");
var message = document.getElementById("message");
var layout = document.getElementById("layout");
var top_outer = document.getElementById("start-box");
var bottom_outer = document.getElementById("end-box");
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
 	start_block.onmousemove = function(e) {
 		start_flag = true;
 		cheat_flag = true;
 		message.innerHTML = '<br />';
 		for (i = 0; i < block.length; i++) {
			if (block[i].className.match('change')) {
			block[i].className = block[i].className.replace(' change', "" ); 
			}
		}
 	}
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
	layout.onmousemove = function() {
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
			message.textContent = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!"
			cheat_flag = false;
			start_flag = false;
		}
	}
 }