const db = require('../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById
};

function find() {
    return db('users')
     .select('id', 'username')
};

function findBy(filter) {
    return db('users')
      .where(filter);
};

function add (data) {
    return db('users')
      .insert(data, 'id')
      .then(ids => {
          const [id] = ids;
          return findById(id);
      });
};

function findById(id) {
    return db('users')
      .select('id', 'username')
      .where({ id })
      .first();
}