'use strict';
module.exports = (sequelize, DataTypes) => {
  class Commodity extends sequelize.Sequelize.Model {}

  Commodity.init({
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: DataTypes.STRING
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Commodity' // We need to choose the model name
  });
  Commodity.associate = function(models) {
    // associations can be defined here
    Commodity.hasMany(models.CommodityTrader)

  };
  return Commodity;
};