import React, { useEffect, useState } from "react"

export default function Admin() {

    const [listing, setListing] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const findlisting = async () => {
            setLoading(true);

            try {
                const res = await fetch('/api/admin/listing');
                const data = await res.json();

                setListing(data);
                console.log(listing);

                if (data.success === false) {
                    setError(data.message);
                }
            } catch (error) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        }

        findlisting();
    }, [])

    return (
        <main>
            <div className="text-5xl text-center p-3"> Home Page</div>
            <div className="flex gap-4 ml-5 my-5 cursor-pointer hover:opacity-95 item-center    ">
                <div className="h-[300px] w-[300px] shadow-md font-bold bg-slate-200 border text-black-700 flex flex-col rounded-lg text-center p-3 ">
                    <h1 className="text-3xl">listings</h1>
                    <p className="p-5 text-2xl"> Total no of listings  </p>
                    <span className="bg-red-700 w-9 item-center">{Object.keys(listing).length}</span>
                    <button>Show listing</button>
                </div>
                <div className="h-[300px] w-[300px] shadow-md font-bold bg-slate-200 border text-red-700 flex flex-col rounded-lg text-center p-3 ">
                    <h1>listings</h1>
                </div>
            </div>
        </main>
    )
}
