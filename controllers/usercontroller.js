import UserModel from '../models/user.js'
import transporter from '../config/email.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController{
    static userReg = async(req,res)=>
    {
        const {name,email,pass,pass_cnf,tc}=req.body;
        const exist=await UserModel.findOne({email:email})
        if(exist){
            res.send({"status":"failed","message":"Email already exists"})
        }
        else{
            if(name && email && pass && pass_cnf && tc)
            {
                if(pass===pass_cnf)
                {
                    try{
                        const salt=await bcrypt.genSalt(10)
                        const hashPass= await bcrypt.hash(pass,salt)
                        const doc= new UserModel({
                            name:name,
                            email:email,
                            pass:hashPass,
                            tc:tc
                        })
                    await doc.save()

                    const saved_user=await UserModel.findOne({email:email})
                    const token=jwt.sign({userID:saved_user._id},
                    process.env.JWT_SECRET,{expiresIn:'5d'})

                    res.status(201).send({"status":"success","message":"Registered successfully","token":token})
                }
                    catch(error)
                    {
                        res.send({"status":"failed","message":"Unable to register User"})
                    }

                }
                else
                {
                    res.send({"status":"failed","message":"Password doesn't match"})
                }
            }
            else
            {
                res.send({"status":"failed","message":"All fields are required"})
            }
        }
    }

    static userLog = async (req, res) => {
        try {
            const { email, pass } = req.body;
            console.log("Request body:", req.body);
    
            if (email && pass) {
                const exist = await UserModel.findOne({ email: email });
                console.log("User found:", exist);
    
                if (exist != null) {
                    const isMatch = await bcrypt.compare(pass, exist.pass);
                    console.log("Password match:", isMatch);
    
                    if (isMatch) {
                        const token = jwt.sign({ userID: exist._id }, process.env.JWT_SECRET, { expiresIn: '5d' });
                        res.send({ "status": "success", "message": "Login Successful", "token": token });
                    } else {
                        res.send({ "status": "failed", "message": "User Email or password incorrect" });
                    }
                } else {
                    res.send({ "status": "failed", "message": "User not registered" });
                }
            } else {
                res.send({ "status": "failed", "message": "All fields are required" });
            }
        } catch (error) {
            console.error("Error during login:", error); // Log the error
            res.send({ "status": "failed", "message": "Unable to login" });
        }
    }

    static changePass = async(req,res)=>{
        const {pass,pass_cnf}=req.body
        if(pass && pass_cnf)
        {
            if(pass!==pass_cnf)
            {
                res.send({"status":"failed","message":"Password doesn't match"})
            }
            else
            {
                const salt = await bcrypt.genSalt(10)
                const hashPass= await bcrypt.hash(pass,salt)
                await UserModel.findByIdAndUpdate(req.user._id, { $set: {
                    pass: hashPass}})
                res.send({"status":"Success","message":"Password changed successfully"})
            }
        }
        else
        {
            res.send({"status":"failed","message":"All fields are required"})
        }
    }

    static loggedUser =async(req,res)=>{
        res.send({"user":req.user})
    }

    static passReset = async(req,res)=>{
         const {email}= req.body
         if(email)
         {
            const user= await UserModel.findOne({email: email})
            if(user) {
                const secret = user._id + process.env.JWT_SECRET
                const token=jwt.sign({userID: user._id},secret,{expiresIn:'15m'})
                const link =`http://127.0.0.1.3000/api/user/reset/${user._id}/${token}`
                console.log(link)

                let info = await transporter.sendMail({
                    from:process.env.EMAIL_FROM,
                    to: user.email,
                    subject: "RizzBlog - password reset link",
                    html: `<a href =${link}> Click Here</a> to reset your password`
                })
                res.send({"status":"Success", "message":"Password reset mail sent successfully","info":info})
            }
            else{
                res.send({"status":"failed", "message":"Email doesn't exist"})
            }
         }
         else
         {
            res.send({"status":"failed", "message":"Email field is required"})
         }
    }
    static userPassReset = async(req,res)=>{
        const {pass,pass_cnf}=req.body
        const {id,token} = req.params
        const user= await UserModel.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET
        try{
            jwt.verify(token,new_secret)
            if(pass && pass_cnf)
            {
                if(pass!==pass_cnf)
                {
                    res.send({"status":"failed", "message":"Incorrect password"})
                }
                else{
                    const salt = await bcrypt.genSalt(10)
                    const hashPass= await bcrypt.hash(pass,salt)
                    await UserModel.findByIdAndUpdate(user._id, { $set: {
                        pass: hashPass}})
                    res.send({"status":"Success","message":"Password reset successfully"})
                    }
            }
            else{
                res.send({"status":"failed", "message":"All fields are required"})
            }
        }
        catch(error)
        {
            res.send({"status":"failed", "message":"Invalid Token"})
        }
    }


}

export default UserController;