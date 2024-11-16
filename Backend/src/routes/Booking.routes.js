import {Router} from "express";
import {createBooking} from "../controllers/Booking.controllers.js";

const router = Router();

router.route("/booking/:userId/:productId/:quantity").post(createBooking);

export default router