import  { useState, useEffect } from "react";
import axios from "axios";

const NoticesTab = () => {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notices");
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Notices</h2>
      <ul className="mt-4">
        {notices.map((notice) => (
          <li key={notice.id} className="p-2 border-b">
            {notice.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticesTab;
