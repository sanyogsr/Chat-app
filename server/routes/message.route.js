const router = require("express").Router();
import { getMessages,addMessages } from "../controllers/messageController";

router.post("/getmsg",getMessages);
router.post("/addmsg",addMessages);


module.exports =router;