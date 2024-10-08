import { Router } from "express";
import passport from "passport";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { manageUserRole, getAllUsers, deleteUser } from "../controllers/admin.controller.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { User } from "../models/user.model.js";
const router = Router();

// User routes
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

// Google Auth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { session: false }), async (req, res) => {
  try {
    // Find or create a user with the Google profile information
    let user = await User.findOne({ googleId: req.user.user.googleId });

    if (!user) {
      user = new User({
        username: req.user.displayName,
        email: req.user.emails[0].value,
        avatar: req.user.photos[0].value,
        googleId: req.user.googleId,
      });
      await user.save();
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Set the access token as an HTTP-only cookie
    res.cookie('token', accessToken, {
      httpOnly: false, // Protect the cookie from being accessed by JavaScript
      sameSite: 'lax', // Control the same-site cookie policy
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    // Optionally set the refresh token in a cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    });

    // Redirect to the frontend homepage after successful login
    res.redirect('http://localhost:5173/');
  } catch (error) {
    console.error('Google callback error:', error);
    res.status(500).json({ message: 'Authentication failed.' });
  }
});

// Admin routes
router.patch('/users/:id/role', verifyJWT, authorizeRoles('admin'), manageUserRole);
router.get('/users', verifyJWT, authorizeRoles('admin'), getAllUsers);
router.delete('/users/:id', verifyJWT, authorizeRoles('admin'), deleteUser);



export default router;
