import expess from 'express';
import { test, updateUser, deleteUser , getUserListing , getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = expess.Router();

// Getting the information
router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listing/:id' , verifyToken  , getUserListing);
router.get('/:id' , verifyToken , getUser);
export default router;