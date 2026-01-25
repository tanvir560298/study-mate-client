import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = false; 

  const linkStyle = ({ isActive }) => ({
    marginRight: "12px",
    fontWeight: isActive ? "700" : "400",
    textDecoration: "none",
  });

  return (
    <nav style={{ padding: "12px 16px", borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: "16px", fontWeight: "800", textDecoration: "none" }}>
        StudyMate
      </Link>

      <NavLink to="/" style={linkStyle} end>
        Home
      </NavLink>

      <NavLink to="/find-partners" style={linkStyle}>
        Find Partners
      </NavLink>

      {isLoggedIn ? (
        <>
          <NavLink to="/create-profile" style={linkStyle}>
            Create Partner Profile
          </NavLink>
          <NavLink to="/my-connections" style={linkStyle}>
            My Connections
          </NavLink>
          <NavLink to="/profile" style={linkStyle}>
            Profile
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login" style={linkStyle}>
            Login
          </NavLink>
          <NavLink to="/register" style={linkStyle}>
            Register
          </NavLink>
        </>
      )}
    </nav>
  );
}
