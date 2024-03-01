import React from 'react'

export default function Search() {

  const onChange = ()=>{

  }

  const handleChange = ()=>{

  }
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
      <form className='flex flex-col gap-6'>
        <div className='flex items-center gap-2'>
          <label className='whitespace-nowrap'> Search Term:</label>
          <input type="text" id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full'></input>
        </div>

        <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type: </label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='all' 
                                className='w-5' 
                                // onChange={handleChange} checked={sidebardata.type === 'all'}
                                 />
                            <span>Rent & Sell</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' 
                                className='w-5' 
                                // onChange={handleChange} checked={sidebardata.type === 'rent'} 
                                />
                            <span>Rent</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='sell' 
                                className='w-5'
                                // onChange={handleChange} checked={sidebardata.type === 'sell'} 
                                />
                            <span>Sell</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' 
                                className='w-5'
                                // onChange={handleChange} checked={sidebardata.offer}
                                 />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities: </label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' 
                                className='w-5' 
                                // onChange={handleChange} checked={sidebardata.parking}
                                 />
                            <span>Parking</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' 
                                className='w-5'
                                // onChange={handleChange} checked={sidebardata.furnished}
                                 />
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort: </label>
                        <select onChange={handleChange} id='sort_order'
                            defaultValue={'created_at_desc'} className='border rounded-lg p-2'>
                            <option value='regularPrice_desc'>Price High to Low</option>
                            <option value='regularPrice_asc'>Price Low to High</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>

                    <div className='flex items-center gap-3'>
                        <label className='whitespace-nowrap font-semibold'>Address: </label>
                        <input type='text' id='address' placeholder='Enter Address' 
                            className='border rounded-lg p-2 w-full' 
                            // value={sidebardata.address}
                            onChange={handleChange}/>
                    </div>

                    <button className='bg-slate-700 text-white rounded-lg p-2 hover:opacity-95'>
                        Search
                    </button>
      </form>
      </div>
      <div className=''>
                <h1 className='text-2xl font-semibold border-b p-3 text-slate-700 mt-1'>Listing Results: </h1>

          </div>
    </div>
  )
}

