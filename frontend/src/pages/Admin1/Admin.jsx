import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  const [listing, setListing] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({});
  const [report , setReport] = useState({});

  useEffect(() => {
    const findlisting = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/admin/listing");
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
        }
        setListing(data);
        console.log(listing);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    const findusers = async () => {
      try {
        const res = await fetch("/api/admin/users");

        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
        }

        setUsers(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    const findreports = async () => {
      try {
        const res = await fetch("/api/admin/report");

        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
        }

        setReport(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    findreports();
    findlisting();
    findusers();
  
  }, []);

  return (
    <main>
      <div className="text-5xl text-center p-3"> Home Page</div>
      <div className="flex flex-wrap gap-4 ml-5 my-5 cursor-pointer hover:opacity-95 item-center    ">
        <div className="h-[300px] w-[300px] shadow-md font-bold bg-slate-200 border text-black-700 flex flex-col rounded-lg text-center p-3 ">
          <h1 className="text-3xl">listings</h1>
          <p className="p-5 text-2xl"> Total no of listings </p>
          {loading ? (
            "loading...."
          ) : (
            <span className="bg-red-700 w-[50px] text-3xl self-center rounded-lg p-2">
              {Object.keys(listing).length}
            </span>
          )}

          <p>{error}</p>

          <Link to="/Listings">
            <button className="w-full bg-slate-700 text-sm my-5 text-white rounded-lg p-3 uppercase hover:opacity-95  disabled-opacity-80">
              Show Listings
            </button>
          </Link>{" "}
        </div>
        <div className="h-[300px] w-[300px] shadow-md font-bold bg-slate-200 border text-black-700 flex flex-col rounded-lg text-center p-3 ">
          <h1 className="text-3xl">Users</h1>
          <p className="p-5 text-2xl">Total no of Users</p>

          {loading ? ( "loading...") : (
  <span className="bg-red-700 w-[50px] text-3xl self-center rounded-lg p-2">
  {Object.keys(users).length-1}
</span>

          )}
        
          <Link to="/Users">
            <button className="w-full bg-slate-700 text-sm my-5 text-white rounded-lg p-3 uppercase hover:opacity-95  disabled-opacity-80">
              Show Users
            </button>
          </Link>
        </div>

        <div className="h-[300px] w-[300px] shadow-md font-bold bg-slate-200 border text-black-700 flex flex-col rounded-lg text-center p-3 ">
          <h1 className="text-3xl">Reports</h1>
          <p className="p-5 text-2xl">Total no of Reports</p>

          {loading ? ("loading...") : (
 <span className="bg-red-700 w-[50px] text-3xl self-center rounded-lg p-2">
 {Object.keys(report).length}
</span>
          )}
         
          <Link to="/Report">
            <button className="w-full bg-slate-700 text-sm my-5 text-white rounded-lg p-3 uppercase hover:opacity-95  disabled-opacity-80">
              Show Reports
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
