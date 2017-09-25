exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    username: 'senbenito',
    hashed_password: '$2a$10$RwAVIjNsWi0JZGGszVsuZePcGbkeqkIdXw6Fh532ki7vAhg2Q4opm',
    admin: true
    },
  ];

  return knex('users').del()
    .then(() => {
      return knex('users').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
