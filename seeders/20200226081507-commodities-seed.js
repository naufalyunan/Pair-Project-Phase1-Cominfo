'use strict';
const fs = require('fs')
const commodities = JSON.parse(fs.readFileSync('./commodities.json','utf8'))
commodities.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Commodities', commodities, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Commodities', null, {});
  }
};
