import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import AppointmentChatRoom from "./AppointmentChatRoom";
import SHA256 from "crypto-js/sha256";
import { createSocketConnection } from "../utils/socket";

const socket = createSocketConnection();

const CreateAppointment = () => {
  const [form, setForm] = useState({ userName: "", contactNumber: "", tattooDesignUrl: "", size: "", location: "", state: "", city: "", artistContact: "", date: "" });

  const [ sessionId, setSessionId] = useState(null);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (form.contactNumber) {
      socket.emit("registerContact", form.contactNumber);
    }
  }, [form.contactNumber, sessionId]);  

  const data = useSelector((state) => state.appointment);
  const showForm = data.showForm;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    useEffect(() => {
    const fetchStates = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/states`);
            setStates(response.data);
        } catch (error) {
            console.error("Error fetching states:", error);
            alert("Failed to load states. Please try again later.");
        }
    };
    const fetchCities = async (state) => {
        try {
            const response = await axios.get(`${BASE_URL}/districts/${state}`);
            setCities(response.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
            alert("Failed to load cities. Please try again later.");
        }
    };
    fetchStates();
    if (form.state) {
        fetchCities(form.state);
    }
    }, [form.state]);

    useEffect(() => {
        const fetchArtists = async () => {
          if (!form.state || !form.city) return;
          try {
            const res = await axios.get(`${BASE_URL}/artist/filteredArtists`, {
              params: { state: form.state, city: form.city }
            });
            setArtists(res.data);
          } catch (error) {
            console.error("Error fetching artists:", error);
            setArtists([]);
          }
        };
        fetchArtists();
      }, [form.state, form.city]);
      

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const sessionId = SHA256(form.artistContact).toString();
        setSessionId(sessionId);
        form.sessionId = sessionId;
        if (!form.userName || !form.contactNumber || !form.tattooDesignUrl || !form.size || !form.location || !form.date) {
            alert("Please fill in all fields.");
            return;
        }
        await axios.post(`${BASE_URL}/appointment/create`, form);
        socket.emit("registerContact", form.artistContact);
        socket.emit("registerContact", form.contactNumber);
        
    } catch(err){
        console.error("Error creating appointment:", err);
        alert("Failed to create appointment. Please try again.");
    }
  };

  return (
    <>
    { !sessionId ? (showForm && <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gradient-to-br from-white via-gray-100 to-gray-200 p-8 rounded-2xl shadow-lg space-y-2"
        >
        <h2 className="text-2xl font-extrabold text-gray-800 text-center">📅 Book Your Tattoo Appointment</h2>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
            name="userName"
            onChange={handleChange}
            placeholder="Enter your name here"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
            name="contactNumber"
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tattoo Design Image URL</label>
            <input
            name="tattooDesignUrl"
            onChange={handleChange}
            placeholder="Paste image URL here"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tattoo Size</label>
            <input
                name="size"
                onChange={handleChange}
                placeholder="e.g., Small / Medium / 6x6 in"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                required
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
            <input
                name="location"
                onChange={handleChange}
                placeholder="Enter your city or area"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                required
            />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
            name="state"
            value={form.state || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
            >
            <option value="" disabled hidden>-- Select State --</option>
            {states.map((state) => (
                <option key={state.name} value={state.name}>{state.name}</option>
            ))}
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City / District</label>
            <select
            name="city"
            value={form.city || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
            >
            <option value="" disabled hidden>-- Select City --</option>
            {cities.map((c, i) => (
                <option key={i} value={c.name}>{c.name}</option>
            ))}
            </select>
        </div>
        </div>

        <div className="mb-4">
        <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1">
            Select Tattoo Artist
        </label>
        <select
            name="artistContact"
            value={form.artistContact}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
        >
            <option value="" disabled hidden>-- Choose an artist --</option>
            {artists.map((artist) => (
            <option key={artist.contact} value={artist.contact}>
                {artist.name} ({artist.contact})
            </option>
            ))}
        </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
            <input
            name="date"
            type="date"
            onChange={handleChange}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
            />
        </div>

        <div className="text-center pt-4">
            <button
            type="submit"
            className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 transition text-white font-bold py-2 px-6 rounded-full shadow-md"
            >
            Confirm Appointment
            </button>
        </div>
        </form>) : 
            sessionId && (
                <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Appointment Chat Room</h2>
                    <AppointmentChatRoom sessionId={sessionId} />
                </div>
            )
        }
        </>
  );
};

export default CreateAppointment;
