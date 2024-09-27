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
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { manageUserRole, getAllUsers,deleteUser } from "../controllers/admin.controller.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)


router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"),updateUserAvatar)



// Google Auth routes
router.get('/auth/google',verifyJWT, passport.authenticate('google', { scope: ['profile', 'email'] })); // Added Google auth initiation route

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), async (req, res) => {
    try {
        const token = jwt.sign({ _id: req.user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        res.cookie('accessToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });

        // Update the user's avatar
        const avatarUrl = req.user.avatar; // Changed to use req.user.avatar
        await User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl }, { new: true });

        res.redirect(`${process.env.FRONTEND_URL}/login-success`); // Updated redirect URL
    } catch (error) {
        console.error("Error during Google authentication:", error);
        res.redirect(`${process.env.FRONTEND_URL}/login-error`); // Updated redirect URL
    }
});


// Admin routes
router.patch('/users/:id/role', verifyJWT, authorizeRoles('admin'), manageUserRole);
router.get('/users', verifyJWT, authorizeRoles('admin'), getAllUsers);
router.delete('/users/:id', verifyJWT, authorizeRoles('admin'), deleteUser);


export default router