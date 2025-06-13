import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiCalendar, FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get("https://url-shortner-zc4s.onrender.com/api/shorturl/logout", {
        withCredentials: true,
      });
      setUser(null); // clear user state on frontend
      navigate("/login")
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://url-shortner-zc4s.onrender.com/user/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, [location]);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!user) return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="animate-pulse rounded-full h-12 w-12 bg-indigo-500"></div>
    </div>
  );

  return (<>
    <div className="flex flex-col md:flex-row min-h-screen">

      <div className="w-full md:w-[20vw] bg-gray-200">
        <div className="flex flex-col gap-6 mt-10 p-4 items-center text-black">
          <div className="flex items-center gap-2 hover:bg-gray-300 px-5 py-2 rounded-full cursor-pointer">
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
            <p className="font-bold text-xl">Analytics</p>
          </div>
          <div className="flex items-center gap-2  hover:bg-gray-300 px-5 py-2 rounded-full">
        
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
        <div className="container mx-auto px-4 py-6">

    
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
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="font-medium text-gray-900">{user.name}</p>
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