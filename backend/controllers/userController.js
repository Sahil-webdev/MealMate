import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import validator from "validator"


const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message: "User doesn't exists"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success: false, message: "Invalid Credentails"});
        }

        const token = createToken(user._id);
        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        //checking that user already exists or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false, message: "User Already Exists"});
        }

        //validating email and strong password

        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please enter a valid email"});
        }

        if(password.length<8){
            return res.json({success:false, message: "Please enter strong password"})
        }

        //Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()

        //generate the token by using jsonwebtoken
        const token = createToken(user._id)
        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({message: error.message});
    }
}


export { loginUser, registerUser }