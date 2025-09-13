import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reset2FA, verify2FA } from "../service/authApi";

const TwoFAVerification = ({ onVerify, onReset }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleTokenVerification = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verify2FA(otp);
      onVerify(data);
    
    } catch (error) {
      setOtp("");
      console.log("The error is:", error.message);
      setError("Invalid OTP");
    }
  };

  const handleReset = async () => {
    try {
      const { data } = await reset2FA();
      onReset(data);
      
    } catch (error) {
      console.log("The error is:", error.message);
      setError("Reset Unsuccessful")
    }
  };

  return (
    <div className="bg-white rounded-xl max-w-sm w-full mx-auto shadow-md p-8">
      <h2 className="text-center text-2xl font-bold tracking-tight text-gray-800">
        Validate TOTP
      </h2>

      <p className="text-center text-sm text-gray-500 mt-2">
        Please enter 6-digit Time based OTP to verify 2FA authentication
      </p>

      <form
        onSubmit={handleTokenVerification}
        className="flex flex-col mt-6 gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="TOTP" className="text-sm font-medium text-gray-600">
            TOTP
          </label>
          <input
            id="totp"
            type="text"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
       

        <button
          type="submit"
          className="p-3 bg-black text-white rounded-md w-full hover:bg-gray-800 transition-colors"
        >
          Verify
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="p-3 bg-gray-600/60 text-white rounded-md w-full hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default TwoFAVerification;
