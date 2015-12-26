//model
module.exports = function(db) {
    var check = require('../public/javascripts/checker');
    var crypto = require('crypto');

    //TLS/SSL MD5
    var md5 = function(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    };

    //database
    var users = db.collection('users');

    var userManager = {
        // promise
        checkData : function(userData) {
            // check the form validity
            var c = check(userData);
            return new Promise(function(reslove, reject) {
                users.find({$or:[{username:userData.username}, {id:userData.id},
                {phone:userData.phone}, {email:userData.email}]}).toArray(function(err, docs) {
                    if(err) reject(err);
                    else reslove(docs);
                });
            }).then(function(result) {
                if (result.length) {
                    for (var i = 0; i < result.length; ++i) {
                        if (result[i].username == userData.username)
                            c.error.nameError = "The username has been used.";
                        if (result[i].phone == userData.phone)
                            c.error.phoneError = "The phone nums have been used.";
                        if (result[i].id == userData.id)
                            c.error.idError = "The id has been used.";
                        if (result[i].email == userData.email)
                            c.error.emailError = "The email has been used.";
                    }
                    c.isOk = false;
                }
                return c;
            });
        },

        // use the encrypted data to fill database
        addUser : function(userData) {
            userData.password = md5(userData.password);
            users.insert(userData);
        },

        findUser : function(userData) {
            var result = { user : {},
                           error : {usernameError:"", passwordError:""},
                           isOk : false };
            return users.findOne({username:userData.username})
            .then(function(user) {
                if (!!user) {
                    if (md5(userData.password) == user.password) {
                        result.isOk = true;
                        result.user = user;
                    } else {
                        result.error.passwordError = "The password is error";
                    }
                } else {
                    result.error.usernameError = "The username is not registed";
                }
                return result;
            });
        }
    };

    return userManager;
}