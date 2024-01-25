import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";


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