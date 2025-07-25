import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

const socket = createSocketConnection();

const ArtistPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState(""); // get from incoming message
  const { artistContact } = useParams();

  useEffect(() => {
    if (!artistContact) return;

    socket.emit("registerContact", artistContact);

    const handleReceive = (msg) => {
      console.log("Received message:", msg);
      setNotifications((prev) => [...prev, msg]);
      if (msg.sessionId) setSessionId(msg.sessionId); // grab sessionId for reply
    };

    socket.on("receiveAppointmentMessage", handleReceive);

    return () => {
      socket.off("receiveAppointmentMessage", handleReceive);
    };
  }, [artistContact]);

  const sendReply = () => {
    if (!message || !sessionId) return alert("Session or message missing!");
    socket.emit("sendAppointmentMessage", {
      sessionId,
      message,
      from: "artist",
      price: "", // Optional
    });
    setMessage("");
  };

  if (!artistContact) {
    return <p className="text-red-600 text-center">Artist contact missing.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🎨 Live Notification Panel</h2>

        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet.</p>
        ) : (
          <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {notifications.map((msg, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="text-lg font-semibold">{msg.message}</p>
                {msg.price && <p className="text-pink-600">💰 ₹{msg.price}</p>}
                <p className="text-sm text-gray-500 mt-1">From: {msg.from === "user" ? msg.userName || "User" : "Artist"}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Reply to User</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
            rows="3"
            placeholder="Type your reply here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            onClick={sendReply}
            className="mt-3 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition"
          >
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistPanel;
