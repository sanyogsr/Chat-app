const router = require("express").Router();
import { login, register,logout,setAvatar,getAllUsers,} from "../controllers/userController";
router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setAvatar/:id", setAvatar);
router.get("/logout/:id",logout);


module.exports = router;