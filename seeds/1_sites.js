exports.seed = function(knex, Promise) {

  let data = [

    {id: 8,
    url: 'https://serene-green.herokuapp.com/',
    title:'Serene'},

    {id: 7,
    url: 'https://checkout-vr.surge.sh/',
    title:'Checkout VR'},

    {id: 6,
    url: 'https://musicator.surge.sh/',
    title: 'Musicator'},

    {id: 5,
    url: 'https://wry-noise.herokuapp.com/',
    title: 'Dreaddit'},

    {id: 4,
    url: 'https://drinking-buddies.herokuapp.com/',
    title: 'Drinking Buddies'},

    {id: 3,
    url: 'https://eatertain_me.surge.sh/',
    title: 'Eatertain.Me'},

    {id: 2,
    url: 'https://utopian-locket.surge.sh/',
    title: 'Pyrate Personality Test'},

    {id: 1,
    url: 'https://senbenito.surge.sh/',
    title: "Let's meet Shannon!"},

  ];

  return knex('sites').del()
    .then(() => {
      return knex('sites').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('sites_id_seq', (SELECT MAX(id) FROM sites))");
    });
};
