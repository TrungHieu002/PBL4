const handleLogin = require('../method/handleLogin');

let checkedLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let userData = await handleLogin.handleUserLogin(username, password);
    if (userData.errCode !== 0) {
        res.render('home', {
            error: [
                userData.errMessage
            ]
        })
    } else {
        req.session.user =
        {
            name: userData.user.name,
            username: userData.user.username,
            phone: userData.user.phone,
            address: userData.user.address,
            email : userData.user.email
        }
        res.redirect(`/`);
    }
}

let logout = function(req, res){
    req.session.destroy();
    res.redirect(`/`);
}

module.exports = {
    checkedLogin: checkedLogin,
    logout: logout
}