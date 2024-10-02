import { Router } from 'express';
import { 
    addFood, 
    updateFoodItem, 
    deleteFood, 
    getAllFoodItems 
} from '../controllers/food.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const foodRouter = Router();

foodRouter.post('/addfood', verifyJWT, authorizeRoles('admin'), upload.single('fimage'), addFood);
foodRouter.patch('/updatefood/:id', verifyJWT, authorizeRoles('admin'), upload.single('fimage'), updateFoodItem);
foodRouter.delete('/deletefood/:id', verifyJWT, authorizeRoles('admin'), deleteFood);
foodRouter.get('/getallfood', getAllFoodItems);

export default foodRouter;
