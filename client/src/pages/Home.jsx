import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { logoutUser } from "../service/authApi";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useSession();
  const handleLogout = async () => {
    try {
      const { data } = await logoutUser();
      logout(data);
      navigate("/login");
    } catch (error) {
      console.log("The error is :", error.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center max-w-md mx-auto gap-5">
      <h2 className="text-4xl font-bold text-center tracking-tight">
        Welcome,{user.username}
      </h2>
      <p>You have successfully logged in and verified your 2FA</p>
      <button
        onClick={handleLogout}
        className="p-3 bg-black text-white rounded-md w-full hover:bg-gray-800 transition-colors"
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
