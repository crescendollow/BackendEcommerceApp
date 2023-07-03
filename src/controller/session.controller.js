const { COOKIE_USER}=  require("../config/config");
const { DtoUser } = require("../dao/DTOs/dtoUsers");


const sessionLogin = async (req,res)=>{
    res
    .cookie(COOKIE_USER, req.user.token, { maxAge: 300000, httpOnly: true })
    .send( req.user )
}

const loginRegister = async (req,res)=>{
        res.send(req.user) 
}  


const getCurrent = (req, res)=>{
    newUser = DtoUser(req.user)
    res.send(newUser) 
}  

module.exports={
    sessionLogin,
    loginRegister,
    getCurrent
}