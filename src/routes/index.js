
const siteRouter = require('./site');
const loginRouter   = require('./login');

function route(app) {
    app.use('/login', loginRouter);

    app.use('/', siteRouter);
}

module.exports = route;
