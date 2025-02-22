import { Router } from "express";
import { login } from "../../../controllers/user/login.controller";
import {
  getAllEvents,
  getOngoingEvents,
} from "../../../controllers/user/getEvents.controller";
import { getCurrentUser } from "../../../controllers/user/getCurrentUser.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { AUTH_ROLES } from "../../../utils/roles";
import { getSingleEvent } from "../../../controllers/user/getSingleEvent.controller";
import { handleRefreshAccessToken } from "../../../utils/handleRefreshToken";
import { handleLogout } from "../../../controllers/handleLogout.controller";
import { initiateBet } from "../../../controllers/user/bet.controller";
import { getAlerts } from "../../../controllers/user/alerts.controller";
import { transactions } from "../../../controllers/user/transactions.controller";

const router = Router();

// GET ENDPOINTS
// ----------------
router.route("/events").get(authMiddleware(AUTH_ROLES.USER), getAllEvents);
router
  .route("/ongoing-events")
  .get(authMiddleware(AUTH_ROLES.USER), getOngoingEvents);
router.route("/get-user").get(authMiddleware(AUTH_ROLES.USER), getCurrentUser);
router.route("/event/:id").get(authMiddleware(AUTH_ROLES.USER), getSingleEvent);

router.route("/alerts").get(authMiddleware(AUTH_ROLES.USER), getAlerts);

router
  .route("/transactions")
  .get(authMiddleware(AUTH_ROLES.USER), transactions);

// POST ENDPOINTS
// ----------------
router.route("/login").post(login);
router
  .route("/logout")
  .post(authMiddleware(AUTH_ROLES.USER), handleLogout(AUTH_ROLES.USER));
router.route("/refresh-token").post(handleRefreshAccessToken(AUTH_ROLES.USER));

router
  .route("/initiate-bet")
  .post(authMiddleware(AUTH_ROLES.USER), initiateBet);

export default router;
