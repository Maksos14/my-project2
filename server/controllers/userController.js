const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        console.log("Пришёл запрос на /api/registration:", req.body);
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Некорретный email или пароль '))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user  = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token, userId: user.id})
    }

    async check(req, res, next) {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        console.log("🔥 USER DATA FROM REQUEST:", req.user); 
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        return next(ApiError.internal('Ошибка сервера'));
    }
}

}

module.exports = new UserController();
