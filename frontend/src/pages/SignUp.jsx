import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // This function keeps track of information of user
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  // This function submits the form
  const handleSubmit = async (e) => {
    // Prevent the refreshing when we submit the form
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Convert response to JSON
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?
              <a
                href="/sign-in"
                title=""
                className="font-medium text-black ml-1 transition-all duration-200 hover:underline"
              >
                Sign In
              </a>
            </p>
            <form onSubmit={handleSubmit} method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    username
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Name"
                      id="username"
                      onChange={handleChange}
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("Username is Required")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("Email is Required")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                </div>

                {/* <div>
                  <label
                    htmlFor="mobile"
                    className="text-base font-medium text-gray-900"
                  >
                    Contact no
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Mobile"
                      id="contactno"
                      onChange={handleChange}
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("Contact No is Required")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                </div> */}

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>

                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("Password is Required")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    {loading ? "Loading..." : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path strokeLinejoin="round" />{" "}
                  </svg>
                </span>
                Sign up with Google
              </button>
              {error && <p className="text-red-500 mt-5">{error}</p>}
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-4/5 w-4/5 mt-10 pt-10  rounded-md object-cover"
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
