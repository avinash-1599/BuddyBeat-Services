import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";

const socket = createSocketConnection();

const AppointmentChatRoom = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    // 1. Join room
    socket.emit("joinAppointmentSession", sessionId);

    // 2. Fetch chat history
    axios.get(`${BASE_URL}/appointment/chat/${sessionId}`)
      .then(res => setMessages(res.data));

    // 3. Register contact
    axios.get(`${BASE_URL}/appointment/${sessionId}`)
      .then(res => {
        const contactNumber = res.data.contactNumber;
        if (contactNumber) socket.emit("registerContact", contactNumber);
      });

    // 4. Listen for new messages
    const handleNewMsg = (msg) => {
      setMessages(prev => [...prev, msg]);
    };

    socket.on("receiveAppointmentMessage", handleNewMsg);

    return () => {
      socket.off("receiveAppointmentMessage", handleNewMsg);
    };
  }, [sessionId]);

  const sendMessage = () => {
    socket.emit("sendAppointmentMessage", {
      sessionId,
      from: "user",
      message: input,
      price,
    });

    setInput("");
    setPrice("");
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="h-64 overflow-y-auto bg-white p-2 border rounded mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <div className="text-xs text-gray-500">{msg.from === "user" ? msg.userName || "User" : "Artist"}</div>
            <div className="bg-gray-100 text-black p-2 rounded">
              {msg.message}
              {msg.price && <div className="text-sm text-pink-600">₹{msg.price}</div>}
            </div>
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message" className="w-full text-black mb-2 p-2 border rounded" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="₹ Price" type="number" className="w-full text-black mb-2 p-2 border rounded" />
      <button onClick={sendMessage} className="bg-pink-500 text-white w-full py-2 rounded">Send</button>
    </div>
  );
};

export default AppointmentChatRoom;
