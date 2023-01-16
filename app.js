const app = require('./server');

app.use('/', require('./src/routers/ jewelryRoutes'))

module.exports = app;