
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// mange user
const manageUserRole= asyncHandler(async(req,res)=>{
    const {role} = req.body;
    const userId= req.params.id;


    // check if the new role is valid
    const validRoles= ["admin","user"]
    if(!validRoles.includes(role)){
        throw new ApiError(400, "Invalid role");
    }
    //update the user role
    const user = await user.findByIdAndUpdate(userId,{role},{new:true});
    if(!user){
        throw new ApiError(404,"User not found");
    }
    res.status(200).json({
        success: true,
        data: user
    });
})
// get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password -refreshToken'); // Exclude sensitive data
    res.status(200).json(new ApiResponse(200, users,""));
});

//delete a user

const deleteUser= asyncHandler(async(req,res)=>{
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(204).json(new ApiResponse(200,"user deleted"));
})

export {manageUserRole,
    getAllUsers,
    deleteUser
}