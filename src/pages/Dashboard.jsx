import  { useState, useEffect } from "react";
import axios from "axios";
import RequestNewTokenForm from "./RequestNewTokenForm";


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tokens, setTokens] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showRequestTokenModal, setShowRequestTokenModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Mock user info - Replace with real user data from backend or localStorage
    setUserName("John Doe");
    setUserEmail("johndoe@example.com");

    // Fetch tokens and notifications
    fetchTokens();
    fetchNotifications();
  }, []);

  const fetchTokens = async () => {
    try {
      const response = await axios.get(`https://lmu-backend-service-usr-gvhgbybtezdxdfdk.southeastasia-01.azurewebsites.net/api/gastoken`);
      setTokens(response.data);
    } catch (err) {
      console.error("Error fetching tokens", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`/GetNotifications`);
      setNotifications(response.data);
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  const handleDeleteToken = async (tokenId) => {
    if (window.confirm("Are you sure you want to delete this token?")) {
      try {
        await axios.delete(`/DeleteGasToken/${tokenId}`);
        fetchTokens(); // Refresh token list
      } catch (err) {
        console.error("Error deleting token", err);
      }
    }
  };

  const handlePayment = (token) => {
    alert(`Processing payment for Token ID: ${token.tokenId} (LKR ${token.total})`);
    // Implement the payment logic here
  };

  const handleEditToken = (token) => {
    alert(`Editing Token ID: ${token.tokenId}`);
    // Open a modal with pre-filled values for editing
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-700 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li
            className={`cursor-pointer py-2 px-4 rounded-lg ${
              activeTab === "dashboard" ? "bg-blue-900" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`cursor-pointer py-2 px-4 rounded-lg ${
              activeTab === "tokens" ? "bg-blue-900" : ""
            }`}
            onClick={() => setActiveTab("tokens")}
          >
            Tokens
          </li>
          <li
            className={`cursor-pointer py-2 px-4 rounded-lg ${
              activeTab === "notifications" ? "bg-blue-900" : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Welcome, {userName} ({userEmail})
          </h1>
          <button
            onClick={() => setShowRequestTokenModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Request New Token
          </button>
        </div>

        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <p>This is the main dashboard.</p>
            {/* Add other dashboard statistics here */}
          </div>
        )}

        {activeTab === "tokens" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Tokens</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Token ID</th>
                  <th className="border border-gray-300 px-4 py-2">Outlet</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Total</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token) => (
                  <tr key={token.tokenId}>
                    <td className="border border-gray-300 px-4 py-2">{token.tokenId}</td>
                    <td className="border border-gray-300 px-4 py-2">{token.outlet}</td>
                    <td className="border border-gray-300 px-4 py-2">{token.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">LKR {token.total}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handlePayment(token)}
                        className="bg-green-600 text-white px-2 py-1 rounded-lg mr-2"
                      >
                        Payment
                      </button>
                      <button
                        onClick={() => handleEditToken(token)}
                        className="bg-yellow-600 text-white px-2 py-1 rounded-lg mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteToken(token.tokenId)}
                        className="bg-red-600 text-white px-2 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id} className="mb-2">
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Request New Token Modal */}
      {showRequestTokenModal && (
        <RequestNewTokenForm
          onClose={() => setShowRequestTokenModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
