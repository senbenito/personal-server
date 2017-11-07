exports.seed = function(knex, Promise) {

  let data = [
    {id: 1,
    url: 'empty',
    title: "n/a",
    description: "",
    userid: "",
    password: ""},

    {id: 2,
    url: 'https://senbenito.surge.sh/',
    title: "Let's meet Shannon!",
    description: "This was my precourse website before g[49]. I used MadLibs' format to create a simple HTML form with some Javascript interactivity. I leave this here as a reminder of where I started...",
    userid: "",
    password: ""},


    {id: 3,
    url: 'https://eatertain_me.surge.sh/',
    title: 'Eatertain.Me',
    description: "This was my Q1 project for g[49] which technically, only added in a third-party API to the basic HTML / CSS / JS pattern, but the results are MUCH better than before gSchool!",
    userid: "",
    password: ""},

    {id: 4,
    url: 'https://drinking-buddies.herokuapp.com/',
    title: 'Drinking Buddies',
    description: "A group-project for Q2, this was my first full-stack application serving up a complex PostgreSQL database of cocktail ingredients, measures and methods via a hardened Express server to allow users to connect and share profiles.",
    userid: "Shotgun",
    password: "cocktailpassword"},

    {id: 5,
    url: 'https://wry-noise.herokuapp.com/',
    title: 'Dreaddit',
    description: "This full-stack Angular application was created entirely through pair-programming with the hilariously talented Zach Passarelli. I had such an amazing time discovering the joys of tackling a problem together and taking a theme to a ridiculous level.",
    userid: "",
    password: ""},

    {id: 6,
    url: 'https://checkout-vr.surge.sh/',
    title:'Checkout VR',
    description: "Another group-project, for Q3 we created a Unity-powered virtual reality wildlife donation experience that sends a JSON object to a connected tablet running our React Native app for payment processing via Stripe. Reality Garage on Pearl Street Mall is installing our software in kiosks across Colorado!",
    userid: "",
    password: ""},

    {id: 7,
    url: 'https://serene-capstone.herokuapp.com/',
    title:'Serene',
    description: "My g[49] Capstone and first experience developing for an external client, I delivered a wellness platform MVP consisting of a React progressive web application serving a proprietary GIS and Fitbit OAuth2 database integration allowing Serene to secure seed-funding.",
    userid: "Shotgun",
    password: "password"},

  ];

  return knex('sites').del()
    .then(() => {
      return knex('sites').insert(data);})
    .then(() => {
      return knex.raw("SELECT setval('sites_id_seq', (SELECT MAX(id) FROM sites))");
    });
};
