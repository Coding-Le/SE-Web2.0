var http = require('http');
var fs = require('fs');
var qs = require('querystring');
http.createServer(myfunc).listen(8000);


function myfunc(request, response) {
	var pathname = require('url').parse(request.url).pathname;
	var query = require('url').parse(request.url).query;
	if (query && query.match(/username=/)) {
		var newhtml = '';
		var json_content = '';
		json_content = fs.readFileSync('database/data.json', 'utf-8');
		if (json_content == '') json_content = "[]";
		json_content = JSON.parse(json_content);
		var exist = false;
		for (var i = 0; i < json_content.length; i++) {
			if (json_content[i].username == query.substr(9)) {     //get username
				exist = true;
				break;
			}
		}
		response.writeHead(200, {'Content-Type':'text/html;charset = utf-8'});
		if (!exist) {
			newhtml = fs.readFileSync('register/register.html', 'utf-8');
		} else {
			newhtml = fs.readFileSync('status/status.html', 'utf-8');
			newhtml = newhtml.replace('用户名', '用户名:' + json_content[i].username).replace('学号', '学号:' + json_content[i].number).replace('电话', '电话:' + json_content[i].phoneNumber).replace('邮箱', '邮箱:' + json_content[i].email);
		}
		response.end(newhtml);
	} else if (pathname == '/') {
		response.writeHead(200,{'Content-Type':'text/html'});
		fs.readFile('register/register.html', 'utf-8', function(err, data) {
			if (err) {
				throw err;
			}
			response.write(data);
			response.end();
		});
	} else if (pathname.match(/register\.css/)) {
		response.writeHead(200,{'Content-Type':'text/css'});
		fs.readFile('register/register.css', 'utf-8', function(err, data) {
			if (err) throw err;
			response.write(data);
			response.end();
		});
	} else if (pathname.match(/register\.js/)) {
		response.writeHead(200,{'Content-Type':'text/javascript'});
		fs.readFile('register/register.js', 'utf-8', function(err, data) {
			if (err) throw err;
			response.write(data);
			response.end();
		});
	} else if (pathname.match(/jquery\.js/)) {
		response.writeHead(200,{'Content-Type':'text/javascript'});
		fs.readFile('register/jquery.js', 'utf-8', function(err, data) {
			if (err) throw err;
			response.write(data);
			response.end();
		});
	} else if (pathname == '/post') {
		var content = '';
		var htmlContent = '';
		var text = '';
		text = fs.readFileSync('database/data.json', 'utf-8');
		request.on('data', function(data) {
			content += data;
		});
		request.on('end', function() {
			content = qs.parse(content);
			if (text == '') text = "[]";
			text = JSON.parse(text);
			var exist = '';
			for (var i = 0; i < text.length; i++) {
				for (var name in text[i]) {
					if (text[i].hasOwnProperty(name)) {
						if (text[i][name] == content[name]) {
							exist = name;
							break;
						}
					}
				}
				if (exist != '') break;
			}
			response.writeHead(200, {'Content-Type':'text/html;charset = utf-8'});
			if (exist != '') {
				htmlContent = fs.readFileSync('register/register.html', 'utf-8');
				if (exist.match(/username/)) {
					exist = "The username has already exist!"
				} else if (exist.match(/phoneNumber/)) {
					exist = "The phone number has already exist!"
				} else if (exist.match(/number/)) {
					exist = "The id number has already exist!"
				} else if (exist.match(/email/)) {
					exist = "The email address has already exist!"
				}
				htmlContent = htmlContent.replace('Please input your information', exist);
			} else {
				text.push(content);
				fs.writeFile('database/data.json', JSON.stringify(text), function(err) {
					if (err) throw err;
				});
				htmlContent = fs.readFileSync('status/status.html', 'utf-8');
				htmlContent = htmlContent.replace('用户名', '用户名:' + content.username).replace('学号', '学号:' + content.number).replace('电话', '电话:' + content.phoneNumber).replace('邮箱', '邮箱:' + content.email);
			}
			response.end(htmlContent);
		});
	} else if (pathname.match(/status\.css/)) {
		response.writeHead(200, {'Content-Type':'text/css;charset = utf-8'});
		fs.readFile('status/status.css', 'utf-8', function(err, data) {
			if (err) throw err;
			response.end(data);
		});
	} else if (pathname.match(/background3\.png/)) {
		response.writeHead(200,{'Content-Type':'image/png'});
		fs.readFile('img/background3.png', 'binary', function(err, data) {
			if (err) throw err;
			response.write(data,'binary');
			response.end();
		});
	} else if (pathname.match(/background2\.jpg/)) {
		response.writeHead(200,{'Content-Type':'image/jpg'});
		fs.readFile('img/background2.jpg', 'binary', function(err, data) {
			if (err) throw err;
			response.write(data,'binary');
			response.end();
		});
	} else {
		response.end();
	}
}