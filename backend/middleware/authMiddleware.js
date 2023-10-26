const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const protect = asyncHandler(async(req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        try {
            const decoded = jwt.decode(token, process.env.JWT_SECRET)
            req.user = await prisma.user.findUnique({
                where: {
                    id: decoded.userId
                },
                select: {
                    id: true,
                    email: true
                }
            })
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Unauthorized, invalid token')
        }
    } else {
        res.status(401)
        throw new Error('Unauthorized, no token')
    }
})

module.exports = { protect }