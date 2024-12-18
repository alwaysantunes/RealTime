import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const{fullName,email,password} = req.body 
    try {

        if (!fullName|| !email || !password){
            return res.status(400).json({message: "all fields must be filled"});
        }

        if (password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const user = await User.findOne({email}) 

        if (user) return res.status(400).json({message: "email already exists"})


       const salt = await bcrypt.genSalt(10) 
       const hashedPassword = await bcrypt.hash(password,salt)   

       const newUser = new User ({
        fullName,
        email,
        password: hashedPassword,
       })

       if (newUser){
        //jwt token
        generateToken(newUser._id,res)
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });

       } else {
        res.status(400).json({message: "invalid user data"})
       }

    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({message:"Internal sever error"});

    }
}

export const login =  async(req, res) => {
  const{email,password} =  req.body

  try {
    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({message:"invalid credentials"});
    }

    const isPasswordCorrect =await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect){
        return res.status(400).json({message:"invalid credentials"});
    }

    generateToken(user._id,res)
    res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,})

  }catch (error) {
    console.log("error in login controller", error.message);
    return res.status(500).json({message:"internal error"});


  }







}

export const logout = (req, res) => {
    res.send("logout route" )
}