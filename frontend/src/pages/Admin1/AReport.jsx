import React, { useEffect, useState } from "react";

export default function AReport() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/admin/report");
        const data = await res.json();

        if (!res.ok) {
          // Handle non-successful response
          setError(data.message || "Failed to fetch reports");
        } else {
          setReports(data);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        setError("Failed to fetch reports");
      }
    };

    fetchReports();
  }, []);



  const handleDeleteReport = async (reportId)=>{

     try{

        const res = await fetch(`/api/admin/report/delete/${reportId}`, {
          method : "DELETE",
        })

        const data = await res.json();

        if(data.success == false)
        {
           console.log(data.message);
        }
     }
     catch(error)
     {
      console.log(error.message);
     }
  }
  

  return (
    <main>
      <div className="text-5xl text-center p-3">Reports</div>
      <div className="my-3 flex flex-col gap-4">
        {error ? (
          <div className="text-red-700">{error}</div>
        ) : (

          
          <div className="self-center w-[1100px]">
            {reports.map((report) => (
              <div
                key={report._id}
                className="border rounded-lg p-3 flex justify-between items-center my-4"
              >
                <p className="text-2xl font-semibold text-slate-700">
                  {report.userId}
                </p>
                <span className="text-2xl font-semibold text-slate-700">
                  {report.listingid}
                </span>
                <p className="text-2xl font-semibold text-slate-700">
                  {report.userRef}
                </p>
                <p className="text-2xl font-semibold text-slate-700">
                  {report.message}
                </p>
                <button
                  className="text-red-700 uppercase"
                  onClick={() => handleDeleteReport(report._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
