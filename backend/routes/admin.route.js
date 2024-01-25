import  express  from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { gettotalListing } from "../controllers/Admin.controller.js";



const router = express.Router();

router.get('/listing' , verifyToken , gettotalListing);


export default router;