import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listingitem from "../components/listingItem";

export default function Search() {
  const [sidebardata, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    address: "",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // console.log(listing);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const addressFromUrl = urlParams.get("address");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      addressFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        address: addressFromUrl || "",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListing = async () => {
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);

      const data = await res.json();
      if(data.length > 4)
        setShowMore(true);

    else
       setShowMore(false);

      setListings(data);
      setLoading(false);
    };

    fetchListing();
  }, [location.search]);

  const navigate = useNavigate();

  // console.log(sidebardata);
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSideBarData({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === "address") {
      setSideBarData({ ...sidebardata, address: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSideBarData({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSideBarData({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("address", sidebardata.address);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async ()=>{
    const numberListings = listings.length;
    const startIndex = numberListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();

    if(data.length < 6){
        setShowMore(false);
    }

    setListings([...listings, ...data]);
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap"> Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              onChange={handleChange}
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            ></input>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent & Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sell"}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>

            <div className="flex gap-2">
              <input
              
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort: </label>
            <select
              onChange={handleChange}
              id="sort_order"
              defaultValue={"created_at_desc"}
              className="border rounded-lg p-2"
            >
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="regularPrice_asc">Price Low to High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="whitespace-nowrap font-semibold">Address: </label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              className="border rounded-lg p-2 w-full"
              value={sidebardata.address}
              onChange={handleChange}
            />
          </div>

          <button className="bg-slate-700 text-white rounded-lg p-2 hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-2xl font-semibold border-b p-3 text-slate-700 mt-1">
          Listing Results:{" "}
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700 p-3">No listing Found</p>
          )}
          {loading && (
            <p className="text-xl text-center text-slate-700 w-full">
              Loading....
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <Listingitem key={listing._id} listing={listing}></Listingitem>
            ))}

          
        </div>
        {showMore && (
                <button onClick = {onShowMoreClick} className="text-xl w-full text-center hover:underline">Show more</button> 
            )}
      </div>
    </div>
  );
}
