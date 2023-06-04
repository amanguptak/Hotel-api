import express from "express";

import {

  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import {verifyToken,verifyUser,verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router();
// router.get("/checkAuthentication", verifyToken,(req, res, next) => {
//     res.send("hello user You are now logged in")
// })

// router.get("/checkUser/:id", verifyUser,(req, res, next) => {
//     res.send("hello user You are logged in and You can delete Your account") 
// })
// router.get("/checkAdmin/:id", verifyAdmin,(req, res, next) => {
//     res.send("hello Admin You are logged in and You can delete Your account") 
// })


router.put("/:id", verifyUser,updateUser);

router.delete("/:id",verifyUser, deleteUser);

router.get("/:id",verifyUser, getUser);
router.get("/",verifyAdmin, getUsers);

export default router;
