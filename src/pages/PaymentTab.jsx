import  { useState, useEffect } from "react";
import axios from "axios";

const PaymentTab = () => {
  const [payments, setPayments] = useState([]);
  const [amount, setAmount] = useState("");

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handlePayment = async () => {
    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setMonth(today.getMonth() + 1); // Add one month

    try {
      await axios.post("http://localhost:5000/api/payments", {
        amount,
        date: nextDate.toISOString().split("T")[0], // YYYY-MM-DD format
      });
      alert("Payment successful!");
      fetchPayments();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Payments</h2>
      <div className="mt-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handlePayment}
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
        >
          Pay
        </button>
      </div>
      <table className="mt-4 w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="p-2 border">{payment.amount}</td>
              <td className="p-2 border">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTab;
