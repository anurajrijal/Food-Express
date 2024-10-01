import { Food } from "../models/food.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Add new Food item
const addFood = asyncHandler(async (req, res) => {
    const { name, price, category, cookTime, description } = req.body;

    // Validate required fields
    if (!name || !price || !cookTime || !description || !category) {
        throw new ApiError(400, 'All fields are required');
    }

    // Check if a file was uploaded
    if (!req.file) {
        throw new ApiError(400, 'Food image is required');
    }

    // Upload image to Cloudinary
    const result = await uploadOnCloudinary(req.file.path);
    if (!result) {
        throw new ApiError(500, 'Failed to upload image to Cloudinary');
    }

    // Create a new food item
    const food = await Food.create({
        name,
        price,
        cookTime,
        fimage: result.secure_url,
        description,
        category,
    });

    // Clean up local file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
        success: true,
        message: "Food created successfully",
        data: food,
    });
});

// Update Food Item
const updateFoodItem = asyncHandler(async (req, res) => {
    const foodId = req.params.id;

    // Validate ID
    const food = await Food.findById(foodId);
    if (!food) {
        throw new ApiError(404, 'Food item not found');
    }

    const updateData = { ...req.body };

    if (req.file) {
        const imageResponse = await uploadOnCloudinary(req.file.path);
        if (imageResponse) {
            updateData.fimage = imageResponse.secure_url; // Update with Cloudinary URL
        }
    }

    const updatedFoodItem = await Food.findByIdAndUpdate(foodId, updateData, { new: true });
    res.status(200).json({
        success: true,
        message: "Food item updated successfully",
        data: updatedFoodItem,
    });
});

// Delete food item by ID
const deleteFood = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find the food item by ID
    const food = await Food.findById(id);
    if (!food) {
        throw new ApiError(404, 'Food item not found');
    }

    // Delete the food item
    await food.remove();

    res.status(200).json({
        success: true,
        message: 'Food item deleted successfully',
    });
});

// Get All Food Items
const getAllFoodItems = asyncHandler(async (req, res) => {
    const foodItems = await Food.find();
    res.status(200).json({
        success: true,
        data: foodItems,
    });
});

export {
    addFood,
    updateFoodItem,
    deleteFood,
    getAllFoodItems,
};
