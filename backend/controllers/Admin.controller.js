import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Report  from "../models/report.model.js";

export const gettotalListing = async (req, res , next) => {
    
    try{
    
        const listing = await Listing.find();


        if(!listing)
        {
            return next(errorHandler(401 , "listing not found"));
        }

        res.status(200).json(listing);    }
    catch(error)
    {
        next(error);
    }
}

export const getUsers = async (req, res , next)=>{
    try
    {
        const user = await User.find();

        if(!user)
          return next(errorHandler(401, "user not found"));
          
        res.status(200).json(user);
        
    }
    catch(error)
    {
        next(error);
    }
   
}

export const DeleteUser = async (req , res , next)=>{

    try{
           await User.findByIdAndDelete(req.params.id);
           res.clearCookie("access_token");
           res.status(200).json("user succsessfully deleted");
    }


    catch(error)
    {
        next(error);
    }
}

export const delelteListing = async (req, res, next) =>{

    try{

        const listing = await Listing.findById(req.params.id);

        if(!listing)
        {
            return next(errorHandler(404, "Listing not found"));
        }


        await Listing.findByIdAndDelete(req.params.id);

        res.status(200).json("Listing succesfully deleted");
    }
    catch(error)
    {
        next(error);
    }
}

export const getReports = async (req, res , next)=>{
    try
    {
        const report = await Report.find();

        if(!report)
          return next(errorHandler(401, "reports not found"));
          
        res.status(200).json(report);
        
    }
    catch(error)
    {
        next(error);
    }
   
}

export const deleteReport = async (req, res, next)=>{
    try{

         const report = await Report.findById(req.params.id);

         if(!report)
           return next(errorHandler(401 , "report not found"))

         await Report.findByIdAndDelete(req.params.id);

         res.status(200).json("report succesffuly deleted");
    }
    catch(error)
    {
        next(error);
    }
}
