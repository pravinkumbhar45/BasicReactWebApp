import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h2 className="font-bold text-xl">React Admin</h2>

      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="hover:text-yellow-400">
          Dashboard
        </Link>

        <Link to="/users" className="hover:text-yellow-400">
          Users
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
