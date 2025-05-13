const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketPc = sequelize.define('basket_pc', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    basketId: { type: DataTypes.INTEGER, allowNull: false },
    pcId: { type: DataTypes.INTEGER, allowNull: false },
});

const Pc = sequelize.define('pc', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const PcInfo = sequelize.define('pc_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketPc, { foreignKey: 'basketId' });
BasketPc.belongsTo(Basket, { foreignKey: 'basketId' });

Pc.hasMany(BasketPc)
BasketPc.belongsTo(Pc)

User.hasMany(Rating)
Rating.belongsTo(User)

Pc.hasMany(Rating)
Rating.belongsTo(Pc)

Pc.hasMany(PcInfo)
PcInfo.belongsTo(Pc)




module.exports = {
    User,
    Basket,
    BasketPc,
    Pc,
    Rating,
    PcInfo
}