import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getUsersForSidebar} from "../contollers/message.contoller.js";


const router = express.router(); 

router.get("/user",protectRoute, getUsersForSidebar);



export default router;
