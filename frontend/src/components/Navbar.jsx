import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("https://url-shortner-zc4s.onrender.com/api/shorturl/current", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [location]);

  const handleLogout = async () => {
    try {
      await axios.post("https://url-shortner-zc4s.onrender.com/api/shorturl/logout", {}, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 pl-6 flex justify-between shadow-lg">
      <div className="text-white text-3xl font-extrabold tracking-wide">🔗 URL Shortener</div>
      <div className="flex gap-6 items-center">
        {!user ? (
          <>
            <Link to="/login">
              <button className="text-white font-semibold text-lg hover:bg-white hover:text-indigo-700 px-5 py-1 rounded-full duration-200 ease-in-out hover:scale-105">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white text-indigo-700 font-semibold text-lg px-5 py-1 rounded-full duration-200 ease-in-out hover:scale-105">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/about">
              <p className="text-white font-semibold text-xl mr-10 hover:bg-violet-700 px-3 py-1 rounded-full text-center">About</p>
            </Link>
            <p className="text-white hidden md:block text-lg">Hi, {user.name}</p>
            <Link to="/profile">
              <button className="bg-white text-indigo-700 font-bold cursor-pointer text-2xl w-10 h-10 flex items-center justify-center rounded-full duration-200 hover:scale-105">
                {user.name.charAt(0).toUpperCase()}
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="text-white border border-white px-3 py-1 rounded-full hover:bg-white hover:text-indigo-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
