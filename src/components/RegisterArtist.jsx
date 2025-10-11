import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const RegisterArtist = () => {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    state: "",
    city: "",
    photoUrl: "",
    socialMediaLink: ""
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/artist/register`, form);
      alert("Registered successfully!");
      navigate(`/artist-panel/${form.contact}`);
    } catch (err) {
      console.error("Registration error:", err);
      alert("Failed to register. Check contact number or try again.");
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gradient-to-br from-white via-gray-100 to-gray-200 p-8 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          ✍️ Registration
        </h2>

        {form.photoUrl && (
          <div className="flex justify-center">
            <img
              src={form.photoUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-pink-500 shadow-md"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Aarav Singh"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Contact Number</label>
          <input
            type="tel"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
            placeholder="e.g. 9876543210"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
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

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Photo URL</label>
          <input
            type="url"
            name="photoUrl"
            value={form.photoUrl}
            onChange={handleChange}
            placeholder="Link to your profile image"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700">Social Media Link</label>
          <input
            type="url"
            name="socialMediaLink"
            value={form.socialMediaLink}
            onChange={handleChange}
            placeholder="e.g. https://instagram.com/yourhandle"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-pink-600 hover:bg-pink-700 font-semibold rounded-lg transition-all shadow-md"
        >
          Register Artist
        </button>
      </form>
  );
};

export default RegisterArtist;
