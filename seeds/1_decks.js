
exports.seed = function(knex, Promise) {
  const initialData = {
    Addition: {
      title: 'Addition',
      questions: [
        {
          question: '4 + 5',
          answer: 9
        },
        {
          question: '6 + 2',
          answer: 8
        }
      ]
    },
    Subtraction: {
      title: 'Subtraction',
      questions: [
        {
          question: '9 - 5',
          answer: 4
        },
        {
          question: '8 - 2',
          answer: 6
        }
      ]
    }
  };

  return knex('decks').del()
    .then(() => {
      return knex('decks').insert(initialData);})
    .then(() => {
      return knex.raw("SELECT setval('decks_id_seq', (SELECT MAX(id) FROM decks))");
    });
};
