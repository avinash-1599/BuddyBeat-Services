import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchAppointments = async () => {
    try {
      const data = await axios.get(`${BASE_URL}/artist/isArtist/${userId}`, { withCredentials: true });
      console.log("User artist status:", data.data);
      let appointment_url;
      if (data.data.isArtist) {
        appointment_url = `/appointments/artist/${userId}`;
      } else {
        appointment_url = `/appointments/user/${userId}`;
      }

      const response = await axios.get(`${BASE_URL}`+appointment_url, { withCredentials: true });
      console.log("Fetched appointments:", response.data);
      setAppointments(response.data);
    } catch (err) {
      console.error("Error fetching appointments:-", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  };

  const thStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#333",
    color: "white"
  };

  const tdStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd"
  };

  const buttonStyle = {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer"
  };

  const buttonHoverStyle = {
    backgroundColor: "#ff3333"
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
      <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>My Appointments</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Customer Name</th>
              <th style={thStyle}>Customer Contact</th>
              <th style={thStyle}>Artist Name</th>
              <th style={thStyle}>Artist Contact</th>
              <th style={thStyle}>Tattoo Design</th>
              <th style={thStyle}>Tattoo Size</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td style={tdStyle}>{appointment.userName}</td>
                <td style={tdStyle}>{appointment.contactNumber}</td>
                <td style={tdStyle}>{appointment.artistName}</td>
                <td style={tdStyle}>{appointment.artistContact}</td>
                <td style={tdStyle}>
                  <a
                    href={appointment.tattoo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#007bff", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                  >
                    View Design
                  </a>
                </td>
                <td style={tdStyle}>{appointment.tattoo.size}</td>
                <td style={tdStyle}>${appointment.price}</td>
                <td style={tdStyle}>
                  <button
                    style={buttonStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAppointments;
