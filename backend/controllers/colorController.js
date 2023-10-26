const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler')

const categoryController = {
    getColors: asyncHandler(async (req, res) => {
        try {
            const colors = await prisma.color.findMany()
            return res.status(201).json(colors);
        } catch (error) {
            console.log(error)
            return res.status(500).json('Something went wrong')
        }
    })
}

module.exports = categoryController