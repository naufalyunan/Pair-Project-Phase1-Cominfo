'use strict';
module.exports = (sequelize, DataTypes) => {

  class Trader extends sequelize.Sequelize.Model {}

  Trader.init({
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Trader' // We need to choose the model name
  });
  Trader.associate = function(models) {
    // associations can be defined here
    Trader.hasMany(models.CommodityTrader)
  };
  return Trader;
};