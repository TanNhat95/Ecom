const User = require('../model/User.js');

const userController = {
    getAllUser: async(req,res)=>{
        try {
            const user = await User.find()  
            res.json(user);
        } catch (err) {
            res.json(err)
        }
    },
    deleteUser: async(req,res)=>{
        try {
            // const user = await User.findByIdAndDelete(req.params.id)
            const user = await User.findById(req.params.id);
            res.json('Detele successfully')
        } catch (err) {
            res.json(err)
        }
    }
}

module.exports = userController;