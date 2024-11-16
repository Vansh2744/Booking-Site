import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

function SignupPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/user/signup", user);
      console.log(res);
      
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <Toaster/>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-slate-400 items-center gap-7 sm:gap-10 pb-12 sm:pb-20 w-[260px] h-[430px] sm:h-[580px] sm:w-[600px] rounded-lg sm:rounded-xl sm:shadow-xl sm:shadow-black shadow-lg shadow-black">
        <img
          src="profile.jpg"
          className="rounded-full w-[60px] sm:w-[80px] mt-5 sm:mt-10 shadow-md shadow-black"
        />
        <div>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            autoComplete="off"
            className="w-[230px] sm:w-[450px] py-1 px-2 sm:py-2 sm:px-3 sm:text-[18px] focus:outline-none rounded-lg focus:shadow-xl shadow-black"
          />
        </div>
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
            type="text"
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
          Signup
        </button>
        <p className="text-orange-600 font-bold text-sm sm:font-extrabold sm:text-lg">
          Already have an account?{" "}
          <Link className="text-violet-800" to="/">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
