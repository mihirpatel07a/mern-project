import React, { useEffect, useState } from 'react'


export default function Listings() {

    const [userListings , setUserListings] = useState([]);

 useEffect(()=> {
    
    const fetchListings = async ()=> {

        try{
            const res = await fetch('/api/admin/listing');
            const data = await res.json();
            if (data.success === false) {
               console.log(data.message);
               return;
            }

            setUserListings(data);
        }
        catch(error)
        {
            console.log(error);
        }
       
  
       
    }

    fetchListings();

 }, [])

 const handleDeletelisting =  async (listingId)=>{
    try{
        const res = await fetch(`/api/admin/listing/delete/${listingId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
  
        if(data.success === false){
          console.log(data.message);
          return;
        }
  
        // Get all listing except one which has listingId
        setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
      } 
      catch(error){
        console.log(error.message);
      }
 }

  return (
    <main>
      <div className="text-5xl text-center p-3"> Listings</div>
      <div className="my-3 flex flex-col gap-4">
        <div className=" h-[100px] w-[600px] self-center ">
          {userListings.map((listing) => (
            <div
              key={listing._id} // Fix: Use user._id instead of listing._id
              className="border rounded-lg p-3 flex justify-between items-center my-4"
            >
              <img
                src={listing. imageUrls[0]}
                alt="user avatar"
                className="h-16 w-16 object-contain"
              />
              <p className='text-2xl font-semibold text-slate-700'>{listing.name}</p>

              <button 
                    className="text-red-700 uppercase"
                    onClick={ ()=>  handleDeletelisting(listing._id)}
                  >
                    Delete
                  </button>
            </div>
          ))}
        </div>
      </div>

</main>
  )
}
