const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler')

const categoryController = {
    getCategories: asyncHandler(async (req, res) => {
        try {
            const categories = await prisma.category.findMany()
            return res.status(201).json(categories);
        } catch (error) {
            console.log(error)
            return res.status(500).json('Something went wrong')
        }
    })
}

module.exports = categoryController