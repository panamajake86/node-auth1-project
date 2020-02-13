const router = require('express').Router();

const Users = require('./users-model');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch( err => res.send({ message: 'Could not get those credentials please try again later.', err }));
});

module.exports = router;