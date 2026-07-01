import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaBell,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const guestMenu = [
  { name: "Home", path: "/" },
  { name: "Plans", path: "/plans" },
  { name: "Products", path: "/products" },
  { name: "Login", path: "/login" },
];

const customerMenu = [
  { name: "Home", path: "/" },
  { name: "Plans", path: "/plans" },
  { name: "Products", path: "/products" },
  { name: "Dashboard", path: "/dashboard" },
];

const customerMore = [
  { name: "Cart", path: "/cart" },
  { name: "My Orders", path: "/my-orders" },
  { name: "Payment History", path: "/payment-history" },
  { name: "My Subscription", path: "/my-subscription" },
  { name: "My Deliveries", path: "/my-deliveries" },
];

const adminMenu = [
  { name: "Dashboard", path: "/admin" },
  { name: "Customers", path: "/customers" },
  { name: "Orders", path: "/orders" },
  { name: "Deliveries", path: "/deliveries" },
];

const adminMore = [
  { name: "Products", path: "/admin-products" },
  { name: "Plans", path: "/admin-plans" },
  { name: "Subscriptions", path: "/subscriptions" },
  { name: "Payments", path: "/payments" },
  { name: "Reports", path: "/reports" },
  { name: "Analytics", path: "/analytics" },
  { name: "Manage Staff", path: "/manage-staff" },
  { name: "Settings", path: "/settings" },
];

const subAdminMore = [
  { name: "Products", path: "/admin-products" },
  { name: "Plans", path: "/admin-plans" },
  { name: "Subscriptions", path: "/subscriptions" },
  { name: "Payments", path: "/payments" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings" },
];

const deliveryMenu = [
  { name: "Dashboard", path: "/delivery" },
  { name: "Assigned", path: "/assigned-deliveries" },
  { name: "History", path: "/delivery-history" },
];

const deliveryMore = [
  { name: "Profile", path: "/profile" },
];

function Navbar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotification();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-green-600 text-white shadow"
        : "text-gray-700 hover:bg-green-100 hover:text-green-700"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
    setMoreOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* ================= LOGO ================= */}

        <Link
          to={
            user?.role === "admin" ||
            user?.role === "subadmin"
              ? "/admin"
              : user?.role === "delivery"
              ? "/delivery"
              : "/"
          }
          className="text-2xl font-bold text-green-600 flex items-center gap-2"
        >
          🥬 <span>Bushel</span>
        </Link>

{/* ================= DESKTOP MENU ================= */}

<div className="hidden lg:flex items-center gap-2 flex-1 mx-6">

  {/* ================= GUEST ================= */}

  {!user &&
    guestMenu.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={navLinkClass}
      >
        {item.name}
      </NavLink>
    ))}

  {/* ================= CUSTOMER ================= */}

  {user?.role === "user" && (
    <>

      {customerMenu.map((item) => (

        <NavLink
          key={item.path}
          to={item.path}
          className={navLinkClass}
        >
          {item.name}
        </NavLink>

      ))}

      <div className="relative">

        <button
          onClick={() => setMoreOpen(!moreOpen)}
          className="px-3 py-2 rounded-lg hover:bg-green-100 hover:text-green-700 flex items-center gap-2"
        >
          More
          <FaChevronDown className="text-xs" />
        </button>

        {moreOpen && (

          <div className="absolute top-12 left-0 w-60 bg-white rounded-xl shadow-xl border py-2 z-50">

            {customerMore.map((item) => (

              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "hover:bg-green-50"
                  }`
                }
                onClick={() => setMoreOpen(false)}
              >
                {item.name}
              </NavLink>

            ))}

          </div>

        )}

      </div>

      <NavLink
        to="/notifications"
        className="relative p-2 rounded-lg hover:bg-green-100"
      >
        <FaBell size={18} />

        {unreadCount > 0 && (

          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">

            {unreadCount}

          </span>

        )}

      </NavLink>

    </>
  )}
  {/* ================= ADMIN & SUB ADMIN ================= */}

{(user?.role === "admin" || user?.role === "subadmin") && (
  <>
    {adminMenu.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={navLinkClass}
      >
        {item.name}
      </NavLink>
    ))}

    <div className="relative">

      <button
        onClick={() => setMoreOpen(!moreOpen)}
        className="px-3 py-2 rounded-lg hover:bg-green-100 hover:text-green-700 flex items-center gap-2"
      >
        More
        <FaChevronDown className="text-xs" />
      </button>

      {moreOpen && (
        <div className="absolute top-12 left-0 w-64 bg-white rounded-xl shadow-xl border py-2 z-50">

          {(user.role === "admin"
            ? adminMore
            : subAdminMore).map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMoreOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "hover:bg-green-50"
                }`
              }
            >
              {item.name}
            </NavLink>

          ))}

        </div>
      )}

    </div>

    <NavLink
      to="/notifications"
      className="relative p-2 rounded-lg hover:bg-green-100"
    >
      <FaBell size={18} />

      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </NavLink>
  </>
)}

  {/* ================= USER INFO ================= */}

  {user && (

    <div className="ml-auto flex items-center gap-3">

      <span className="font-semibold text-green-600">

        {user.name}

      </span>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>

  )}

</div>

        {/* ================= HAMBURGER ================= */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>
            {/* ================= MOBILE MENU ================= */}

      {menuOpen && (

        <div className="lg:hidden bg-white border-t shadow-md">

          <div className="flex flex-col p-4 space-y-4">

            {/* ================= GUEST ================= */}

            {!user && (
              <>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>

                <Link to="/plans" onClick={() => setMenuOpen(false)}>
                  Plans
                </Link>

                <Link to="/products" onClick={() => setMenuOpen(false)}>
                  Products
                </Link>

                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </>
            )}

            {/* ================= CUSTOMER ================= */}
{user?.role === "user" && (
  <>
    {customerMenu.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => setMenuOpen(false)}
        className={navLinkClass}
      >
        {item.name}
      </NavLink>
    ))}

    <div className="border rounded-lg p-2 mt-2">

      <p className="font-semibold text-green-600 mb-2">
        More
      </p>

      {customerMore.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={() => setMenuOpen(false)}
          className={navLinkClass}
        >
          {item.name}
        </NavLink>
      ))}

    </div>

    <NavLink
      to="/notifications"
      onClick={() => setMenuOpen(false)}
      className={navLinkClass}
    >
      Notifications ({unreadCount})
    </NavLink>
  </>
)}
    {/* ================= ADMIN & SUB ADMIN ================= */}
{(user?.role === "admin" || user?.role === "subadmin") && (
  <>
    {adminMenu.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => setMenuOpen(false)}
        className={navLinkClass}
      >
        {item.name}
      </NavLink>
    ))}

    <div className="border rounded-lg p-2 mt-2">

      <p className="font-semibold text-green-600 mb-2">
        More
      </p>

      {(user.role === "admin"
        ? adminMore
        : subAdminMore
      ).map((item) => (

        <NavLink
          key={item.path}
          to={item.path}
          onClick={() => setMenuOpen(false)}
          className={navLinkClass}
        >
          {item.name}
        </NavLink>

      ))}

    </div>

    <NavLink
      to="/notifications"
      onClick={() => setMenuOpen(false)}
      className={navLinkClass}
    >
      Notifications ({unreadCount})
    </NavLink>
  </>
)}
   {/* ================= DELIVERY BOY ================= */}

{user?.role === "delivery" && (
  <>
    {deliveryMenu.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => setMenuOpen(false)}
        className={navLinkClass}
      >
        {item.name}
      </NavLink>
    ))}

    <div className="border rounded-lg p-2 mt-2">

      <p className="font-semibold text-green-600 mb-2">
        More
      </p>

      {deliveryMore.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={() => setMenuOpen(false)}
          className={navLinkClass}
        >
          {item.name}
        </NavLink>
      ))}

    </div>

    <NavLink
      to="/notifications"
      onClick={() => setMenuOpen(false)}
      className={navLinkClass}
    >
      Notifications ({unreadCount})
    </NavLink>
  </>
)}
            {/* ================= USER INFO ================= */}

            {user && (

              <div className="border-t pt-3">

                <p className="text-green-600 font-semibold mb-3">

                  {user.name}

                </p>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                >
                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </nav>

  );

}

export default Navbar;