exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    url: 'https://senbenito.surge.sh/',
    title: "Let's meet Shannon!"},

    {id: 2,
    url: 'https://utopian-locket.surge.sh/',
    title: 'Pyrate Personality Test'},

    {id: 3,
    url: 'https://eatertain_me.surge.sh/',
    title: 'Eatertain.Me'},

    {id: 4,
    url: 'https://drinking-buddies.herokuapp.com/',
    title: 'Drinking Buddies'},

    {id: 5,
    url: 'https://wry-noise.herokuapp.com/',
    title: 'Dreaddit'},

    {id: 6,
    url: 'https://musicator.surge.sh/',
    title: 'Musicator'},

    {id: 7,
    url: 'https://checkout-vr.surge.sh/',
    title:'Checkout VR'},

    {id: 8,
    url: 'https://serene-capstone.herokuapp.com/',
    title:'Serene'},

  ];

  return knex('sites').del()
    .then(() => {
      return knex('sites').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('sites_id_seq', (SELECT MAX(id) FROM sites))");
    });
};
