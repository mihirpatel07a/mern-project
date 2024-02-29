import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Report({ listing }) {
  const [landlord, setLandLord] = useState(false);
  const [formdata, setFormData] = useState("");
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState("");
  const [report, setReport] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandLord();
  }, [listing.userRef]);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/user/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (data.success == false) {
        console.log(data.message);
      }

      setDisplay(data);
      setReport(true);
      <Link to="/"></Link>;
    } catch (error) {
      console.log(error);
    }
  };

  

  const onChange = (e) => {
    setFormData({
      ...formdata,
      message: e.target.value,
      userRef: landlord.username,
      listingid: listing.name,
      userid: currentUser.username,
    });

    setMessage(e.target.value);
  };

  console.log(formdata);

  // console.log(message);

  return (
    <>
      {landlord && !report && (
        <div className="flex flex-col gap-2 mt-3">
          <p>
            Listing owner is{" "}
            <span className="font-semibold">{landlord.username}</span> for
            lsiting{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>

        
            <textarea
              placeholder="Enter Your Message Here..."
              name="message"
              id="message"
              cols="53"
              rows="3"
              className="border rounded-lg p-3"
              value={message}
              onChange={onChange}
            ></textarea>
     
         

          <button
            className="bg-slate-700 text-center text-white p-3 uppercase rounded-lg hover:opacity-95"
            onClick={handleSubmit}
          >
            Send Message
          </button>


          
        </div>
      )}
       {display && (
            <>
              <p>{display.message}</p>
            </>
          )}
    </>
  );
}
