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
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      afterFind: function(result, options, fn){
        if(result.length === 0){
          throw new Error('Username is wrong!')
        } else {
          return result
        }
      }
    },
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