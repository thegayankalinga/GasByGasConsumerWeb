import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      console.log(formData);
      const response = await axios.post("https://lmu-backend-service-usr-gvhgbybtezdxdfdk.southeastasia-01.azurewebsites.net/api/account/login", formData);
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch {
      // Remove 'error' if not used
      alert("Login failed. Please check your credentials.");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mt-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mt-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
