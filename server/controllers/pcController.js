const uuid = require('uuid')
const path = require('path')
const {Pc, PcInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class PcController {
    async create(req, res, next){
        try{
        const {name, price, brandId, typeId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))


        if (info){
            info = JSON.parse(info)
            info.array.forEach(i => 
                PcInfo.create({
                    title: i.title,
                    description: pc.id
                })
            );
        }
  


        const pc = await Pc.create({name, price, img: fileName})

        return res.json(pc)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    } 




    async getAll(req, res){
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 12
        let offset = page * limit - limit
        let pcs;
        pcs = await Pc.findAndCountAll({limit, offset})
        return res.json(pcs)
    }

    async getOne(req, res){
        try {
            const { id } = req.params;
    
            // Проверяем корректность ID
            if (!id || isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID' });
            }
    
            // Ищем объект Pc в базе данных
            const pc = await Pc.findOne({
                where: { id },
                include: [{ model: PcInfo, as: 'pc_infos' }] // Связь с моделью PcInfo
            });
    
            // Проверяем, найден ли объект
            if (!pc) {
                return res.status(404).json({ message: 'PC not found' });
            }
    
            // Возвращаем найденный объект в формате JSON
            return res.json(pc);
    
        } catch (error) {
            // Логируем ошибку для диагностики
            console.error('Error fetching PC:', error);
            return res.status(500).json({ message: 'Internal server error' });
            console.error('Error details: ', error)
        }
    }
    
}


module.exports = new PcController()