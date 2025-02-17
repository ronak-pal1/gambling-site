import { Router } from "express";
import { addUser } from "../../../controllers/admin/addUser.controller";
import { login } from "../../../controllers/admin/login.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { AUTH_ROLES } from "../../../utils/roles";
import { addEvent } from "../../../controllers/admin/addEvent.controller";
import { addCoins } from "../../../controllers/admin/addCoins.controller";
import { getUsers } from "../../../controllers/admin/getUsers.controller";

const router = Router();

// GET ENDPOINTS
// -----------------
router.route("/users").get(getUsers);

// POST ENDPOINTS
// -----------------
router.route("/login").post(login);
router.route("/add-user").post(addUser);
router.route("/add-event").post(addEvent);
router.route("/add-coins").post(addCoins);

export default router;
