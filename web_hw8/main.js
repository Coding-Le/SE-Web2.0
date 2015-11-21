window.onload =  function() {
	var my_button = document.getElementById("my_button");
	var gameground = document.getElementById("gameground");
	var choose = document.getElementById("choose");
	var arrayselect = new Array('adult','childhood');
	var img = document.createDocumentFragment();
	var  isStart = false;
	var blank_pos = 16;
	var index = 1;
	for (var i = 1; i <= 16; i++) {
		var img_block = document.createElement('img');
		img_block.src = "adult/"+i.toString()+".gif";
		img_block.className = "img_fragment";
		img.tag_id = i;
		img.appendChild(img_block);
		img_block.addEventListener('click', response);
	}
	gameground.appendChild(img);
	var img_blocks = document.getElementsByClassName("img_fragment");
	var blank_img = img_blocks[blank_pos-1];
	blank_img.id = "blank";
	function response (e) {
		if (isStart) {
		for (var i = 0; i < 16; i++) {
			if (e.target == img_blocks[i]) {
				var index = i+1;
			}
		}
		if (isAdjacency(index, blank_pos)) {
			// var temp_id =  img_blocks[index-1].tag_id;
			// img_blocks[index-1].tag_id = img_blocks[blank_pos-1].tag_id;
			// img_blocks[blank_pos-1].tag_id =  temp_id;
			// img_blocks[index-1].src = ("picture/"+img_blocks[index-1].tag_id.toString()+".gif");
			//  img_blocks[blank_pos-1].src = ("picture/"+img_blocks[blank_pos-1].tag_id.toString()+".gif");
			 img_blocks[index-1].id = "blank";
			 img_blocks[blank_pos-1].id = "";
			var temp = img_blocks[index-1].src;
			img_blocks[index-1].src = img_blocks[blank_pos-1].src;
			img_blocks[blank_pos-1].src = temp;
			 blank_pos = index;
			 blank_img = img_blocks[blank_pos-1];
			 for (var j = 1; j <= 16; j++) {
			 	var temp1 = "childhood/"+j.toString()+".gif";
			 	var temp2 = "adult/"+j.toString()+".gif";
			 	if (img_blocks[j-1].src != temp1 && img_blocks[j-1].src != temp2 ) {
			 		break;
			 	}
			 }
			 if (j == 17) {
			 	alert("You Win!");
			 	isStart = false;
			 }
			// img_blocks[blank_pos-1] = document.createElement("picture/"+img_blocks[blank_pos-1].tag_id.toString()+".gif");
		}
	}
	}
	function createSelect(name, str) {
		var _select = document.createElement("select");  
            		// var firstOption = document.createElement("option");  
            		// firstOption.value = "------select------";  
            		// firstOption.text = "------请选择------";  
            		// _select.appendChild(firstOption);  
            		for ( i = 0; i < str.length; i++) {
                		var _option = document.createElement("option");  
                		_option.value = str[i];
                		_option.text = str[i];
                		if (name == str[i]){  
                    			_option.selected = "true";  
                		}  
                		_option.id = i;
                		_select.appendChild(_option); 
            		} 
            		return _select;  
        	}
        	choose.appendChild(createSelect('adult', arrayselect));
	var isAdjacency = function(pos1, pos2) {
		if (pos1 == pos2+1 || pos1 == pos2-1 || pos1 == pos2+4 || pos1 == pos2-4) {
			return true;
		} else {
			return false;
		}
	}
	choose.onchange = function() {
		if (index == 2) {
			for (var i = 1; i <= 16; i++) {
				img_blocks[i-1].src = "adult/"+i.toString()+".gif";
				img_blocks[i-1].id = "";
			}
			index = 1;
		} else if (index== 1) {
			for (var i = 1; i <= 16; i++) {
				img_blocks[i-1].src = "childhood/"+i.toString()+".gif";
				img_blocks[i-1].id = "";
			}
			index = 2;
		} else {
			return;
		}
		isStart = false;
		blank_pos = 16;
		blank_img = img_blocks[blank_pos-1];
		blank_img.id = "blank";
	}
	my_button.onclick = function() {
		isStart = true;
		for (var i = 0; i < 15; i++) {
			var random_num = parseInt(15*Math.random());
			var temp = img_blocks[i].src;
			img_blocks[i].src = img_blocks[random_num].src;
			img_blocks[random_num].src = temp;
			 if (i+1 == blank_pos) {
			 	img_blocks[random_num].id = "blank";
			 	img_blocks[i].id = "";
			 	blank_pos = random_num+1;
			 } else if (blank_pos == random_num+1) {
			 	img_blocks[random_num].id = "";
			 	img_blocks[i].id = "blank";
			 	blank_pos = i+1;
			 }
		}
		blank_img = img_blocks[blank_pos-1];
	}
}