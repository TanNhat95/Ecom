const User = require('../model/User.js');
const bcrypt = require('bcrypt');

const userController = {
    getAllUser: async(req,res)=>{
        try {
            User.find({})
            .then(user=>res.json(user))
            .catch(error=>console.error(error))
        } catch (err) {
            console.error(err)
        }
    },
    deleteUser: async(req,res)=>{
        try {
            // const user = await User.findByIdAndDelete(req.params.id)
            const user = await User.findById(req.params.id);
            res.json('Detele successfully')
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = userController;