import  express  from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { gettotalListing , getUsers , DeleteUser, delelteListing , getReports , deleteReport } from "../controllers/Admin.controller.js";



const router = express.Router();

router.get('/listing' , verifyToken , gettotalListing);
router.get('/users' , verifyToken , getUsers);
router.delete('/delete/:id'  , DeleteUser);
router.delete('/listing/delete/:id' , delelteListing);
router.delete('/report/delete/:id' , deleteReport);
router.get('/report' , verifyToken ,  getReports);

export default router;