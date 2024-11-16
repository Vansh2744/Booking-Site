import { Router } from "express";
import { signup, login, getProfile } from "../controllers/User.controllers.js";
import UserAuth from "../middlewares/User.middlewares.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getProfile").get(UserAuth, getProfile);

export default router;
