import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "cloudinary"

export const getUsersForSidebar = async (req,res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUser);

    }catch(error){
        console.log("Error uin getUsersForSideBar; ", error.message);
        res.status(500).json({error: "Internal servor error"});

    }
};

export const getMessages = async(req,res) => {

    try{
        const { id:userToChatId } = req.params
        const senderId = req.user.id;

        const messages = await Message.find({
            $or:[
                {senderId:senderId,recieverId:userToChatId},
                {senderId:userToChatId,recieverId:senderId}
            ]
        })

        res.status(200).json(messages);


    }catch (error){
        console.log("Error uin getMessages; ", error.message);
        res.status(500).json({error: "Internal servor error"});


    };

};

export const sendMessage = async (req,res) => {

    try{
        const {text, image} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user.id;

        let imageUrl;
        if (image){
            //upload to cloudinary
            const uploadResposne = await cloudinary.uploader.upload(image);
            imageUrl = uploadResposne.secure_url;

        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();

        // realtime(socket.io)


        res.status(201).json(newMessage)


    }catch(error){
        console.log("Error in sendMessage; ", error.message);
        res.status(500).json({error: "Internal servor error"});


    };

};