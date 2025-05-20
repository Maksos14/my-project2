const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketPc = sequelize.define('basket_pc', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    basketId: { type: DataTypes.INTEGER, allowNull: false },
    pcId: { type: DataTypes.INTEGER, allowNull: false },
});

Basket.hasMany(BasketPc, { foreignKey: 'basketId' });
BasketPc.belongsTo(Basket, { foreignKey: 'basketId' });

module.exports = { 
    Basket,
    BasketPc 
    
}
