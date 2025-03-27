import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getUsersForSidebar} from "../contollers/message.contoller.js";
import { getMessages } from "../contollers/message.contoller.js";
import { sendMessage } from "../contollers/message.contoller.js";

const router = express.Router(); 

router.get("/user",protectRoute, getUsersForSidebar);
router.get("/:id",protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);


export default router;
