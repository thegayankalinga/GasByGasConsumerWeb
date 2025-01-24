import { useState, useEffect } from "react";
import axios from "axios";

const TokenDetails = () => {
  const [tokens, setTokens] = useState([]);

  const fetchTokens = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tokens");
      setTokens(response.data);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Token Details</h2>
      <table className="mt-4 w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Token ID</th>
            <th className="p-2 border">Details</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.id}>
              <td className="p-2 border">{token.id}</td>
              <td className="p-2 border">{token.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenDetails;
