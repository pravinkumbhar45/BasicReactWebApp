import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard ✅</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-3xl font-bold mt-2 text-blue-600">20</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold">Active Sessions</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">1</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold">Status</h3>
            <p className="text-3xl font-bold mt-2 text-purple-600">Live</p>
          </div>
        </div>
      </div>
    </>
  );
}
