import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LandingRolePrompt = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "user") {
      navigate("/book-appointment");
    } else if (role === "artist") {
      navigate("/artist-panel");
    }
  }, [role, navigate]);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-xl mb-4 font-bold">Are you a user or tattoo artist?</h1>
      <button onClick={() => setRole("user")} className="mb-2 bg-pink-500 px-4 py-2 text-white rounded">
        I am a User
      </button>
      <button onClick={() => setRole("artist")} className="bg-blue-500 px-4 py-2 text-white rounded">
        I am a Tattoo Artist
      </button>
    </div>
  );
};

export default LandingRolePrompt;