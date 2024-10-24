import express from "express";

import {

  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import {verifyToken,verifyUser,verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router();



router.put("/:id", verifyUser,updateUser);

router.delete("/:id",verifyUser, deleteUser);

router.get("/:id",verifyUser, getUser);
router.get("/", getUsers);

export default router;
