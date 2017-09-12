exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    url: 'http://eatertain_me.surge.sh/',
    title: 'Eatertain.Me',
    }
  ];

  return knex('sites').del()
    .then(() => {
      return knex('sites').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('sites_id_seq', (SELECT MAX(id) FROM sites))");
    });
};
