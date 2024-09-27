import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Retrieve token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        // Log the token to ensure it's received
        console.log("Token received:", token);

        // If no token is found, throw an unauthorized error
        if (!token) {
            console.log("No token found");
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify the token using the secret key
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            console.log("Error during token verification:", error);
            if (error.name === 'TokenExpiredError') {
                throw new ApiError(401, "Token has expired");
            } else {
                throw new ApiError(401, "Invalid access token");
            }
        }

        // Log the decoded token
        console.log("Decoded token:", decodedToken);

        // Fetch the user based on the token's user ID, excluding password and refreshToken fields
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        // If the user is not found, throw an error
        if (!user) {
            console.log("User not found for the provided token");
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach the user to the request object
        req.user = user;

        // Log the user data
        console.log("Authenticated user:", req.user);

        // Call the next middleware
        next();
    } catch (error) {
        // Log any caught error and throw an unauthorized error with the message
        console.error("Error in verifyJWT middleware:", error.message);
        throw new ApiError(401, error?.message || "Unauthorized request");
    }
});
