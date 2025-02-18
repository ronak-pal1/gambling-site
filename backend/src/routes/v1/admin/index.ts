import { Router } from "express";
import { addUser } from "../../../controllers/admin/addUser.controller";
import { login } from "../../../controllers/admin/login.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { AUTH_ROLES } from "../../../utils/roles";
import { addEvent } from "../../../controllers/admin/addEvent.controller";
import { addCoins } from "../../../controllers/admin/addCoins.controller";
import { getUsers } from "../../../controllers/admin/getUsers.controller";
import { modifyEvent } from "../../../controllers/admin/modifyEvent.controller";
import { changeQR } from "../../../controllers/admin/changeQR.controller";
import { checkAuth } from "../../../controllers/admin/checkAuth.controller";
import { handleRefreshAccessToken } from "../../../utils/handleRefreshToken";
import { createadmin } from "../../../controllers/admin/createadmin.controller";
import { handleLogout } from "../../../controllers/handleLogout.controller";

const router = Router();

// GET ENDPOINTS
// -----------------
router.route("/users").get(getUsers);
router.route("/check-auth").get(authMiddleware(AUTH_ROLES.ADMIN), checkAuth);

// POST ENDPOINTS
// -----------------
router.route("/login").post(login);
router
  .route("/logout")
  .post(authMiddleware(AUTH_ROLES.ADMIN), handleLogout(AUTH_ROLES.ADMIN));
router.route("/refresh-token").post(handleRefreshAccessToken(AUTH_ROLES.ADMIN));
router.route("/add-user").post(addUser);
router.route("/add-event").post(addEvent);
router.route("/add-coins").post(addCoins);
router.route("/modify-event").post(modifyEvent);
router.route("/change-qr").post(changeQR);

// temporary routes
// router.route("/create-admin").post(createadmin);

export default router;
