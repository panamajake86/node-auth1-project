const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    const data = req.body;
    const hash = bcrypt.hashSync(data.password, 12);
    data.password = hash;

    Users.add(data)
        .then(reg => {
            res.status(201).json(reg);
        })        
        .catch(err => {
        res.status(500).json({ message: 'Could not process request, please try again later.', err });
    })
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(log => {
            if (log && bcrypt.compareSync(password, log.password)) {
              req.session.loggedin = true;
                res.status(200).json({ message: `Welcome ${log.username}!` });
            } else {
                res.status(401).json({ message: 'You shall not pass!' });
            }
        })
        .catch (err => {
        res.status(500).json({ message: 'You shall not pass!', err });
    });

});

router.delete('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).send('we thought you was a toad!');
        } else {
          res.send('I am the paterfamilias');
        }
      });
    } else {
      res.end();
    }
  });

module.exports = router;