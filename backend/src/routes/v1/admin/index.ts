import { Router } from "express";
import { addUser } from "../../../controllers/admin/addUser.controller";
import { login } from "../../../controllers/admin/login.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { AUTH_ROLES } from "../../../utils/roles";
import { addEvent } from "../../../controllers/admin/addEvent.controller";
import { addCoins } from "../../../controllers/admin/addCoins.controller";
import { getUsers } from "../../../controllers/admin/getUsers.controller";
import {
  deleteEvent,
  modifyEvent,
} from "../../../controllers/admin/modifyEvent.controller";
import { changeQR } from "../../../controllers/admin/changeQR.controller";
import { checkAuth } from "../../../controllers/admin/checkAuth.controller";
import { handleRefreshAccessToken } from "../../../utils/handleRefreshToken";
import { createadmin } from "../../../controllers/admin/createadmin.controller";
import { handleLogout } from "../../../controllers/handleLogout.controller";
import { getAllEvents } from "../../../controllers/admin/getAllEvents.controller";
import upload from "../../../middlewares/fileUpload.middleware";
import { fileToS3, S3PATHS } from "../../../middlewares/fileToS3.middleware";
import { playerProfileUpload } from "../../../controllers/admin/playerProfileUpload.controller";
import { deleteProfileImg } from "../../../controllers/admin/deleteProfileImg.controller";
import { transactions } from "../../../controllers/admin/transactions.controller";

const router = Router();

// GET ENDPOINTS
// -----------------
router.route("/users").get(authMiddleware(AUTH_ROLES.ADMIN), getUsers);
router.route("/check-auth").get(authMiddleware(AUTH_ROLES.ADMIN), checkAuth);
router.route("/all-events").get(authMiddleware(AUTH_ROLES.ADMIN), getAllEvents);
router
  .route("/transactions")
  .get(authMiddleware(AUTH_ROLES.ADMIN), transactions);

// POST ENDPOINTS
// -----------------
router.route("/login").post(login);
router
  .route("/logout")
  .post(authMiddleware(AUTH_ROLES.ADMIN), handleLogout(AUTH_ROLES.ADMIN));
router.route("/refresh-token").post(handleRefreshAccessToken(AUTH_ROLES.ADMIN));
router.route("/add-user").post(authMiddleware(AUTH_ROLES.ADMIN), addUser);
router.route("/add-event").post(authMiddleware(AUTH_ROLES.ADMIN), addEvent);
router.route("/add-coins").post(authMiddleware(AUTH_ROLES.ADMIN), addCoins);
router
  .route("/modify-event")
  .post(authMiddleware(AUTH_ROLES.ADMIN), modifyEvent);
router
  .route("/delete-event")
  .post(authMiddleware(AUTH_ROLES.ADMIN), deleteEvent);
router
  .route("/change-qr")
  .post(
    authMiddleware(AUTH_ROLES.ADMIN),
    upload.single("qr"),
    fileToS3(S3PATHS.QR),
    changeQR
  );

router
  .route("/upload-profile")
  .post(
    authMiddleware(AUTH_ROLES.ADMIN),
    upload.single("playerImg"),
    fileToS3(S3PATHS.PLAYER_IMG),
    playerProfileUpload
  );

router
  .route("/delete-profile")
  .post(authMiddleware(AUTH_ROLES.ADMIN), deleteProfileImg);

// temporary routes
// router.route("/create-admin").post(createadmin);

export default router;
