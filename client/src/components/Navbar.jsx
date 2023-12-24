import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, setUser, login } from "../../redux/slices/authSlice";
import { useEffect } from "react";


const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await axios.get("http://localhost:5000/api/logout", {
      withCredentials: true,
    });
    const data = await res.data;
    if (data.success) {
      toast.success(data.message);
      dispatch(logout());
    }
  };

  const checkUser = async () => {
    const res = await axios.get("http://localhost:5000/api/checkUser", {
      withCredentials: true,
    });
    const data = await res.data;
    if (data.success) {
      dispatch(login());
      dispatch(setUser(data.user));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <nav className="flex justify-between bg-white  px-3 md:px-4 lg:px-5 mb-10 py-4 shadow-md">
      <Link to="/" className="TITLE-TEXT text-xl font-bold text-red-500">
        HomeChef
      </Link>
      <div className="flex gap-3 text-md justify-center items-center text-gray-600">
        <Link to="/about" className="hover:text-black">
          About
        </Link>
        {isAuth && (
          <Link to="/favourites" className="hover:text-black">
            Favourites
          </Link>
        )}
        {isAuth ? (
          <li className="hover:text-black list-none" onClick={handleLogout}>
            Logout
          </li>
        ) : (
          <Link to="/login" className="hover:text-black">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
