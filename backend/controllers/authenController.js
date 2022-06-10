const User = require('../model/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let refreshTokens = [];
const authenController = {
    createAccessToken:(user)=>{
        return jwt.sign({
            id:user.id,
            admin:user.admin
        },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "20s"}
        );
    },
    createRefreshToken:(user)=>{
      return jwt.sign({
        id:user.id,
        admin:user.admin
    },
        process.env.JWT_REFRESH_KEY,
        {expiresIn: "365d"}
    );
    },
    registerUser: async(req,res)=>{
        try {
            console.log(req.body)
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,salt);
            //create user
            const newUser = await new User({
                username: req.body.username,
                password:hashed,
            });
            //save
            const user = await newUser.save();
            res.json(user);
        } catch (err) {
            console.error(err)
        }
    },
    loginUser: async(req,res)=>{
        try {
            const user = await User.findOne({username:req.body.username});
            if(!user){
                res.status(404).json('Wrong username !!!')
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword){
                res.status(404).json('Wrong password !!!')
            }
            if(user&&validPassword){
                const accessToken = authenController.createAccessToken(user);
                const refreshToken = authenController.createRefreshToken(user);
                refreshTokens.push(refreshToken); //fake add redis
                res.cookie("refreshToken",refreshToken ,{
                    httpOnly:true,
                    secure:false,
                    path:"/",
                    sameSite:"strict"
                })
                const {password,...others} = user._doc
                res.json({...others,accessToken})
            }
        } catch (err) {
            console.error(err)
        }
    },
    refreshToken: async(req,res)=>{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("You're not authenticated");
        if(!refreshTokens) return res.status(403).json("RefreshToken is not valid")
        jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY,(err,user)=>{
            if(err) 
                console.error(err)
            refreshTokens = refreshTokens.filter(token=>token!==refreshToken);
            //create new
            const newAccessToken = authenController.createAccessToken(user);
            const newRefreshToken = authenController.createRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken",newRefreshToken ,{
                httpOnly:true,
                secure:false,
                path:"/",
                sameSite:"strict"
            });
            res.status(200).json({accessToken : newAccessToken});
        })
    },
    //logout
    userLogout: async(req,res)=>{
        res.clearCookie("refreshToken");
        refreshTokens.filter(token=>token!==req.cookies.refreshToken);
        res.json("Log out")
    }
}


module.exports = authenController;