const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DATATYPES.INTEGER,
      primaryKey: true,
    },
    product_id: {
      type: DATATYPES.INTEGER,
    },
    tag_id: {
      type: DATATYPES.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
