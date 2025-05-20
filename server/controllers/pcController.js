const uuid = require('uuid');
const path = require('path');
const { Pc, PcInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class PcController {
    async create(req, res, next) {
        try {
            let { name, price, info } = req.body;
            const { img } = req.files;

            const fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const pc = await Pc.create({ name, price, img: fileName });

            if (info) {
                info = JSON.parse(info);
                info.forEach(i => {
                    PcInfo.create({
                        title: i.title,
                        description: i.description,
                        pcId: pc.id
                    });
                });
            }

            return res.json(pc);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            let { limit, page } = req.query;
            page = page || 1;
            limit = limit || 12;
            let offset = (page - 1) * limit;

            const pcs = await Pc.findAndCountAll({ limit, offset });
            return res.json(pcs);
        } catch (e) {
            return res.status(500).json({ message: 'Ошибка при получении списка ПК' });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({ message: 'Некорректный ID' });
            }

            const pc = await Pc.findOne({
                where: { id },
                include: [{ model: PcInfo, as: 'info' }]
            });

            if (!pc) {
                return res.status(404).json({ message: 'ПК не найден' });
            }

            return res.json(pc);
        } catch (error) {
            console.error('Ошибка при получении ПК:', error);
            return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
        }
    }
}

module.exports = new PcController();