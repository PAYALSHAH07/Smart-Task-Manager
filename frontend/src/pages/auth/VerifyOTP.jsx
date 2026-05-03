import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // 📩 email from register page
  const email = location.state?.email;

  const handleVerify = async () => {
    if (!otp) return alert("Enter OTP");

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.token) {
        login(data); // save user + token
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid OTP");
      }

    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-6 rounded-xl w-80 shadow-lg">

        <h2 className="text-xl font-bold mb-2 text-center">
          Verify OTP
        </h2>

        <p className="text-sm text-slate-400 text-center mb-4">
          Enter OTP sent to your email
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-slate-700 text-white outline-none"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
        >
          Verify
        </button>

      </div>
    </div>
  );
};

export default VerifyOTP;