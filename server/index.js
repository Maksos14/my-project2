require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddlewear')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)



app.use(errorHandler)


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