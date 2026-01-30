import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { getUsers, addUser, updateUser, deleteUser } from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editId, setEditId] = useState(null);

  // Search + Pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  // Fetch users
  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data.slice(0, 20));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / limit);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredUsers.slice(start, start + limit);
  }, [filteredUsers, page]);

  // Reset page on search
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please enter Name and Email");
      return;
    }

    if (editId) {
      await updateUser(editId, { name, email });

      setUsers(users.map((u) => (u.id === editId ? { ...u, name, email } : u)));
      setEditId(null);
    } else {
      const res = await addUser({ name, email });

      setUsers([...users, { ...res.data, id: users.length + 101 }]);
    }

    setName("");
    setEmail("");
  };

  // Delete
  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  // Edit
  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Users CRUD (API) ✅</h2>

        {/* Search */}
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <input
            type="text"
            placeholder="Search user by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-full md:w-[320px]"
          />

          <p className="text-gray-600">
            Showing <b>{filteredUsers.length}</b> users
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-2xl shadow-md flex flex-col md:flex-row gap-3 mb-6"
        >
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg flex-1"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg flex-1"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
            {editId ? "Update" : "Add"}
          </button>
        </form>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No users found ❌
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-lg bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} / {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-lg bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
