import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'

var checkAuth = async(req,res,next)=>{
    let token
    const {authorization}= req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try{
            token=authorization.split(' ')[1]

            const {userID}=jwt.verify(token,process.env.JWT_SECRET)

            req.user = await UserModel.findById(userID).select('-pass')
            next()
        }
        catch(error)
        {
            res.status(401).send({"status":"failed","message":"Unauthorized user"})
        }
    }
    if(!token)
    {
        res.status(401).send({"status":"failed","message":"Unauthorized user/No Token"})
    }
}

export default checkAuth;