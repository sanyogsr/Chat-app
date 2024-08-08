const router = require("express").Router();
const { getMessages,addMessages } = require("../controllers/messageController");

router.post("/getmsg",getMessages);
router.post("/addmsg",addMessages);


module.exports =router;