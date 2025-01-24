import  { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// import API_BASE_URL from "../config";

const RequestNewTokenForm = ({ onClose }) => {
  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [total, setTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const GAS_PRICE = 4000;

  useEffect(() => {
    // Fetch outlet list from backend
    const fetchOutlets = async () => {
      try {
        const response = await axios.get(`https://lmu-backend-service-usr-gvhgbybtezdxdfdk.southeastasia-01.azurewebsites.net/api/outlet`);
        setOutlets(response.data);
      } catch (error) {
        console.error("Error fetching outlets:", error);
        setErrorMessage("Failed to load outlets. Please try again later.");
      }
    };

    // Calculate delivery date (2 weeks from today)
    const calculateDeliveryDate = () => {
      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 14);
      setDeliveryDate(deliveryDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    };

    fetchOutlets();
    calculateDeliveryDate();
  }, []);

  useEffect(() => {
    // Update the total cost whenever quantity changes
    setTotal(quantity * GAS_PRICE);
  }, [quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOutlet) {
      setErrorMessage("Please select an outlet.");
      return;
    }

    try {
      const tokenPayload = {
        outlet: selectedOutlet,
        quantity,
        total,
        deliveryDate,
      };

      const response = await axios.post(`https://lmu-backend-service-usr-gvhgbybtezdxdfdk.southeastasia-01.azurewebsites.net/api/gastoken?ouletID=1&consumerEmail=bg15407@gmail.com`, tokenPayload);

      if (response.status === 200 || response.status === 201) {
        alert("Token successfully created!");
        onClose(); // Close the modal after successful submission
      }
    } catch (error) {
      console.error("Error creating token:", error);
      setErrorMessage("Failed to create token. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Request New Token</h2>
        <form onSubmit={handleSubmit}>
          {/* Outlet Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Outlet
            </label>
            <select
              value={selectedOutlet}
              onChange={(e) => setSelectedOutlet(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">-- Select Outlet --</option>
              {outlets.map((outlet) => (
                <option key={outlet.id} value={outlet.name}>
                  {outlet.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Delivery Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Delivery Date
            </label>
            <input
              type="text"
              value={deliveryDate}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          {/* Total Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Total (LKR)
            </label>
            <input
              type="text"
              value={total}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

RequestNewTokenForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default RequestNewTokenForm;
