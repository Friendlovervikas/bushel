import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-green-700 text-white p-5">

      <h1 className="text-3xl font-bold mb-8">
        Bushel Admin
      </h1>

      <div className="flex flex-col gap-4">

        <Link to="/admin">
          Dashboard
        </Link>

        <Link to="/customers">
          Customers
        </Link>

        <Link to="/orders">
          Orders
        </Link>

        <Link to="/analytics">
          Analytics
        </Link>

        <Link to="/settings">
          Settings
        </Link>
        
   <Link
  to="/manage-staff"
  className="hover:text-yellow-300 transition"
>
  👨‍💼 Manage Staff
</Link>

      </div>

    </div>
  );
}

export default Sidebar;