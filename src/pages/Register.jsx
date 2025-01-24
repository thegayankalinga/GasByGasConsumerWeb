import  { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
    nic: "",
    phoneNumber: "",
    consumerType: "0", // Default to personal
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!formData.nic.trim()) newErrors.nic = "NIC is required.";
    else if (!/^\d{9}[Vv]$|^\d{12}$/.test(formData.nic))
      newErrors.nic = "Invalid NIC format.";

    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number must be 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5173/api/register", formData);
      alert("Registration successful!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`shadow appearance-none border ${
              errors.fullName ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs italic">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`shadow appearance-none border ${
              errors.address ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs italic">{errors.address}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`shadow appearance-none border ${
              errors.city ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700`}
          />
          {errors.city && (
            <p className="text-red-500 text-xs italic">{errors.city}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`shadow appearance-none border ${
              errors.email ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`shadow appearance-none border ${
              errors.password ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`shadow appearance-none border ${
              errors.confirmPassword ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            NIC
          </label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleInputChange}
            className={`shadow appearance-none border ${
              errors.nic ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700`}
          />
          {errors.nic && (
            <p className="text-red-500 text-xs italic">{errors.nic}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={`shadow appearance-none border ${
              errors.phoneNumber ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Consumer Type
          </label>
          <select
            name="consumerType"
            value={formData.consumerType}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="0">Personal</option>
            <option value="1">Business</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
