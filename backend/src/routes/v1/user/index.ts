import { Router } from "express";
import { login } from "../../../controllers/user/login.controller";
import { getEvents } from "../../../controllers/user/getEvents.controller";
import { getCurrentUser } from "../../../controllers/user/getCurrentUser.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { AUTH_ROLES } from "../../../utils/roles";
import { getSingleEvent } from "../../../controllers/user/getSingleEvent.controller";

const router = Router();

// GET ENDPOINTS
// ----------------
router.route("/events").get(getEvents);
router.route("/get-user").get(authMiddleware(AUTH_ROLES.USER), getCurrentUser);
router.route("/event/:id").get(getSingleEvent);

// POST ENDPOINTS
// ----------------
router.route("/login").post(login);

export default router;
