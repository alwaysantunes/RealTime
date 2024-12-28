import User from "../models/user.model.js";

export const getUsersForSidebar = async (req,res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id: {$ne:loggedInUserId}})

    }catch(error){

    }
};