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
router.get('/auth/google/callback', passport.authenticate('google'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not found." });
        }

        const token = jwt.sign(
            { _id: req.user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        res.cookie('accessToken', token, { httpOnly: true });

        // Update the user's avatar
        const avatarUrl = req.user.photos[0].value; // Get the avatar URL from Google profile
        await User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl }, { new: true });

        // Redirect to the frontend application
        res.redirect('http://localhost:5173/');
    } catch (error) {
        console.error("Error during Google authentication:", error);
        res.status(500).json({ message: "Authentication failed." });
    }
});


// Admin routes
router.patch('/users/:id/role', verifyJWT, authorizeRoles('admin'), manageUserRole);
router.get('/users', verifyJWT, authorizeRoles('admin'), getAllUsers);
router.delete('/users/:id', verifyJWT, authorizeRoles('admin'), deleteUser);


export default router