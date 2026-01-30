import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("token", "mytoken123");
      navigate("/dashboard");
    } else {
      alert("Invalid Login ❌\nTry: admin@gmail.com / 1234");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold">
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Demo: <b>admin@gmail.com</b> / <b>1234</b>
        </p>
      </div>
    </div>
  );
}
