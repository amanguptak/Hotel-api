import express from "express";
import {verifyAdmin} from "../utils/verifyToken.js"

import {
    createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
const router = express.Router();
router.post("/",verifyAdmin ,createHotel);
router.put("/:id",verifyAdmin, updateHotel);

router.delete("/:id",verifyAdmin, deleteHotel);

router.get("/find/:id", getHotel);
router.get("/", getHotels);
router.get("/countByCity", getHotels);
router.get("/countByType", getHotels);

export default router;
