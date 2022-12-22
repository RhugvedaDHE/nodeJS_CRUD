const auth = require('./auth.routes');
const user = require('./user.routes');
const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/hello', (req, res) => {
        res.status(200).send({ message: "HEYYYYYY"});
    });
    
    app.get('/per', function(req, res) {
        res.send('stats');
    })

    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
};