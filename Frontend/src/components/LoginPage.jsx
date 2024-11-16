import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/user/login", user);
      toast.success(res.data.message);
      navigate("/home");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <Toaster/>
      <form
        onSubmit={handleSubmit}
        name="loginForm"
        className="flex flex-col bg-slate-400 items-center gap-7 sm:gap-10 pb-12 sm:pb-20 w-[260px] h-[360px] sm:h-[500px] sm:w-[600px] rounded-lg sm:rounded-xl sm:shadow-xl sm:shadow-black shadow-lg shadow-black">
        <img
          src="profile.jpg"
          className="rounded-full w-[60px] sm:w-[80px] mt-5 sm:mt-10 shadow-md shadow-black"
        />
        <div>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="off"
            className="w-[230px] sm:w-[450px] py-1 px-2 sm:py-2 sm:px-3 sm:text-[18px] focus:outline-none rounded-lg focus:shadow-xl shadow-black"
          />
        </div>
        <div>
          <input
            type="password" // Changed to password type
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="off"
            className="w-[230px] sm:w-[450px] py-1 px-2 sm:py-2 sm:px-3 sm:text-[18px] focus:outline-none rounded-lg focus:shadow-xl shadow-black"
          />
        </div>
        <button
          type="submit"
          className="mt-10 bg-violet-900 py-1 sm:py-2 w-[150px] sm:w-[350px] rounded-lg font-semibold sm:font-bold text-white hover:bg-violet-800">
          Login
        </button>
        <p className="text-orange-600 font-bold sm:font-extrabold text-sm sm:text-lg">Don&apos;t have an account? <Link className="text-violet-800" to="/signup">Signup</Link></p>
      </form>
    </div>
  );
}

export default LoginPage;
