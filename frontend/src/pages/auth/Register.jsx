import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      return alert("All fields are required");
    }

    try {
      const data = await registerUser(form);

      // ✅ OTP flow
      if (data.email) {
        navigate("/verify-otp", {
          state: { email: data.email },
        });
      } else {
        alert(data.message || "Register failed");
      }

    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-6 rounded-xl w-80 shadow-lg">

        <h2 className="text-xl mb-4 text-center font-semibold">
          Create Account
        </h2>

        {/* NAME */}
        <input
          placeholder="Name"
          value={form.name}
          className="w-full mb-3 p-2 rounded bg-slate-700 text-white outline-none"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={form.email}
          className="w-full mb-3 p-2 rounded bg-slate-700 text-white outline-none"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="w-full mb-4 p-2 rounded bg-slate-700 text-white outline-none"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

      </div>
    </div>
  );
};

export default Register;