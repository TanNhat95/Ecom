const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler')

const categoryController = {
    getSizes: asyncHandler(async (req, res) => {
        try {
            const sizes = await prisma.size.findMany()
            return res.status(201).json(sizes);
        } catch (error) {
            console.log(error)
            return res.status(500).json('Something went wrong')
        }
    })
}

module.exports = categoryController