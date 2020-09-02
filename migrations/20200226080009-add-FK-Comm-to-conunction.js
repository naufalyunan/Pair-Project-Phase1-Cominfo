'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.addConstraint('CommodityTraders', {
    type: 'foreign key',
    name: 'fkey_CommodityId',
    fields :['CommodityId'],
    references: { //Required field
      table: 'Commodities',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.removeContraint('CommodityTraders','fkey_CommodityId')
  }
};
