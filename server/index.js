require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const corc = require('cors')


const PORT = process.env.PORT || 5000

const app = express()
app.use(corc())
app.use(express.json())



const start = async () => {
    try {
        console.log('Попытка подключения к базе данных...');
        await sequelize.authenticate()
        console.log('Подключение к базе данных успешно.');

        console.log('Синхронизация базы данных...');
        await sequelize.sync()
        console.log('Синхронизация базы данных успешно.');
        app.listen(PORT, () => console.log('Server started on port ' + PORT))    
    } catch (e) {
        console.log(e)
    }
}


start()