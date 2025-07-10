import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiCalendar, FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [newName, setNewName] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/shorturl/logout", {
        withCredentials: true,
      });
      setUser(null); // clear user state on frontend
      navigate("/login")
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleEdit = async (e) => {
    try {
      setNewName(true)
      setName(name)
      if (!name) {
        return toast.error("Enter name")
      }

      await axios.put("http://localhost:3000/api/shorturl/edituser", {
        name,
      }, {
        withCredentials: true
      })
      setNewName(false)
      toast.success("User updated successfully")
    } catch (error) {
      console.log(error);
      console.log("failed to update user")
    }
  }


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, [location, handleEdit]);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!user) return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="animate-pulse rounded-full h-12 w-12 bg-indigo-500"></div>
    </div>
  );

  return (<>
    <div className="flex flex-col md:flex-row min-h-screen">

      <div className="w-full md:w-[20vw] bg-gray-200 mt-12">
        <div className="flex flex-col gap-6 mt-10 p-4 items-center text-black">
          <div className="flex items-center gap-2 hover:bg-gray-300 px-5 py-2 rounded-full cursor-pointer">
            <img src="src/assets/home.png" alt="home" />
            <p
              className="cursor-pointer font-bold text-xl"
              onClick={() => navigate("/")}
            >
              Home
            </p>
          </div>

          <div
            className="flex items-center gap-2 hover:bg-gray-300 px-5 py-2 rounded-full cursor-pointer"
            onClick={() => navigate("/analytics")}
          >
            <img
              className="w-5 h-5"
              src="src/assets/analytics.png"
              alt="Analytics Icon"
            />
            <p className="font-bold text-xl">Analytics</p>
          </div>
          <div className="flex items-center gap-2  hover:bg-gray-300 px-5 py-2 rounded-full">
            <img src="src/assets/logout.png" alt="" />
            <p
              className="cursor-pointer text-red-500 font-bold text-xl"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        </div>
      </div>


      <div className="w-full md:w-[80vw] bg-gray-100">
        <div className="container mx-auto px-4 py-6 mt-20">


          <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300">

            <div className="p-6 bg-indigo-500 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-indigo-100">{user.email}</p>
                </div>
              </div>
            </div>


            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 mr-4">
                    <FiUser size={20} />
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>

                      {newName ? (
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 mt-1"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{user.name}</p>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (newName) {
                          handleEdit();
                        } else {
                          setNewName(true);
                          setName(user.name);
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded"
                    >
                      {newName ? "Save" : "Edit"}
                    </button>
                  </div>
                </div>


                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 mr-4">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 mr-4">
                    <FiCalendar size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                    <p className="font-medium text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Profile;