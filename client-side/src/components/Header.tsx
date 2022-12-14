import { NavLink, useLocation } from "react-router-dom";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import Cookie from "universal-cookie";
const cookie = new Cookie();

const Header = () => {
  let isAuth = cookie.get("accessToken");
  useLocation();
  return (
    <nav className="flex justify-between items-center h-[70px] px-5 shadow-md bg-slate-700 text-white">
      <span
        className="font-bold text-gray-700 rounded-full bg-white text-center p-3"
        style={{ fontSize: "10px" }}
      >
        Task 4
      </span>
      <span className="flex">
        {!isAuth ? (
          <>
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive
                  ? "text-white mr-2 font-bold flex items-center"
                  : "text-stone-300 mr-2 flex items-center"
              }
            >
              <FaSignInAlt className="mr-2" />
              Login
            </NavLink>
            <NavLink
              to={"/register"}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-bold mr-2 flex items-center"
                  : "text-stone-300 mr-2 flex items-center"
              }
            >
              <FaUser className="mr-2" />
              Register
            </NavLink>
          </>
        ) : (
          <NavLink
            to={"/login"}
            onClick={() => cookie.remove("accessToken")}
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold mr-2 flex items-center"
                : "text-stone-300 mr-2 flex items-center"
            }
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </NavLink>
        )}
      </span>
    </nav>
  );
};

export default Header;
