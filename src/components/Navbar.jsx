import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const navClass = ({ isActive }) =>
    isActive ? "font-bold text-black" : "font-semibold text-gray-700";

  const Links = (
    <>
      {user ? (
        <>
          <li>
            <NavLink to="/app" end className={navClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/find-partners" className={navClass}>
              Find Partners
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/create-profile" className={navClass}>
              Create Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/my-connections" className={navClass}>
              My Connections
            </NavLink>
          </li>
          <li>
            <NavLink to="/app/profile" className={navClass}>
              Profile
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login" className={navClass}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={navClass}>
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 border-b sticky top-0 z-50 container mx-auto">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[999] mt-3 w-56 p-2 shadow border"
          >
            {Links}

            {/* Mobile logout */}
            {user && (
              <li className="mt-1">
                <button onClick={handleLogout} className="font-semibold text-red-600">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to={user ? "/app" : "/"} className="btn btn-ghost text-xl font-extrabold">
          Study<span className="text-gray-500">Mate</span>
        </Link>
      </div>

      {/* CENTER (Desktop menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end">
        {user ? (
          <button
            onClick={handleLogout}
            className="btn bg-black text-white hover:bg-black hover:opacity-90"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn bg-black text-white hover:bg-black hover:opacity-90">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
