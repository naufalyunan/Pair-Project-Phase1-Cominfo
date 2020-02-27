'use strict';
module.exports = (sequelize, DataTypes) => {
  class CommodityTrader extends sequelize.Sequelize.Model {
    static getAverage(arrays){
      let sum = arrays.reduce((a, b) => a + b, 0)
      let average = sum/arrays.length
      return average
    }
  }

  CommodityTrader.init({
    // Model attributes are defined here
    CommodityId: DataTypes.INTEGER,
    TraderId: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    date: DataTypes.DATE,
    location: DataTypes.STRING
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'CommodityTrader' // We need to choose the model name
  });
  CommodityTrader.associate = function(models) {
    // associations can be defined here
    CommodityTrader.belongsTo(models.Trader)
    CommodityTrader.belongsTo(models.Commodity)
  };
  return CommodityTrader;
};