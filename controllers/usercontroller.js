import { UserModel, ContactModel } from "../models/user.js";
// import transporter from '../config/email.js'
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


    static submitContactForm = async (req, res) => {
        try {
          console.log('Contact request body:', req.body);
          console.log('Authorized user:', req.user); // Check if you see user._id
      
          const { name, email, phone, message } = req.body;
          const userId = req.user._id;
      
          if (!name || !email || !phone || !message) {
            return res.send({ status: 'failed', message: 'All fields are required' });
          }
      
          const contact = new ContactModel({ name, email, phone, message, userId });
          const savedContact = await contact.save();
          console.log('Saved contact:', savedContact);
      
          res.send({ status: 'success', message: 'Message sent successfully' });
        } catch (error) {
          console.error('Error submitting contact form:', error);
          res.send({ status: 'failed', message: 'Failed to submit message' });
        }
      };
      
      // 🔹 Retrieve User Contact Messages
    static getUserContacts = async (req, res) => {
        try {
            const userId = req.user._id;  // Get user ID from auth middleware
            const contacts = await ContactModel.find({ userId }).sort({ createdAt: -1 });
            res.send({ "status": "success", "contacts": contacts });

        } catch (error) {
            console.error("Error retrieving contact messages:", error);
            res.send({ "status": "failed", "message": "Unable to retrieve contact messages" });
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

}

export default UserController;