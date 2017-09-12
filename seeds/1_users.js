exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    username: 'senbenito',
    hashed_password: '$2a$06$/RHAD2z3kA3Ab1ivk3BiSeFpNKNiF0UdhbOSv4d299rTGEF17Gyb6'
    },
  ];

  return knex('users').del()
    .then(() => {
      return knex('users').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
