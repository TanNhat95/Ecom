const User = require('../model/User.js');
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const generateToken = require('../util/generateToken.js')

const userController = {
    //@desc Auth user/set token
    //@route POST /api/user/auth
    //@access PUBLIC
    authUser: asyncHandler(async(req, res) => {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            res.status(401)
            throw new Error('Invalid email or password')
        }

        const validPassword = await bcrypt.compare(
            password,
            user.hashedPassword
        )

        if(!validPassword){
            res.status(404).json({message: 'Wrong password !!!'})
        }

        if(user&&validPassword){
            generateToken(res, user.id)
            res.status(201).json({email: email, message: 'Login successfully'})
        }

    }),

    //@desc Register a user
    //@route POST /api/user
    //@access PUBLIC
    registerUser: asyncHandler(async(req, res) => {
        const { email, password } = req.body
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password,salt);

        const userExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (userExist) {
            res.status(400)
            throw new Error('User already exist')
        }

        const user = await prisma.user.create({
            data: {
                email: email,
                hashedPassword: hashed
            }
        })

        if (user) {
            generateToken(res, user.id)
            res.status(201).json({email, message: 'Register user is completed'})
        } else {
            res.status(400)
            throw new Error('Invalid user')
        }
    }),

    //@desc Register a user
    //@route POST /api/user/logout
    //@access PUBLIC
    logoutUser: asyncHandler(async(req, res) => {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })

        res.status(200).json({message: 'Logout successfully'})
    }),

    //@desc Get user profile
    //@route GET /api/user/profile
    //@access PRIVATE
    getUserProfile: asyncHandler(async(req, res) => {
        const user = {
            id: req.user.id,
            email: req.user.email
        }
        res.status(200).json(user)
    }),

    //@desc Update user profile
    //@route PUT /api/user/profile
    //@access PRIVATE
    updateUserProfile: asyncHandler(async(req, res) => {
        const user = await prisma.user.findUnique({
            where: {
                email: req.user.email
            }
        })

        if (user && req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,salt);
            user.hashedPassword = hashed
            await prisma.user.update({
                where: {
                    email: user.email
                },
                data: {
                    hashedPassword: user.hashedPassword
                }
            })
        }
        res.status(200).json({message: 'Update completed'})
    }),
}

module.exports = userController;