import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login, register } from "../service/authApi";

const LoginForm = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(name, password);
      setMessage(data.message);
      setName("");
      setPassword("");
      setError("");
      onLoginSuccess(data);
    } catch (error) {
      console.log("The error is", error.message);
      setName("");
      setPassword("");
      setError("Login error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      } else {
        const { data } = await register(name, password);

        setMessage(data.message);
        setIsRegister(false);
        setName("");
        setPassword("");
        setConfirmPassword("");
        setError("");
      }
    } catch (error) {
      console.log("The error is :", error.message);
      setName("");
      setPassword("");
      setConfirmPassword("");
      setError("Something went wrong during user registration");
    }
  };
  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
    setError("");
    setMessage("");
  };

  return (
    <div className="bg-white rounded-xl max-w-sm w-full mx-auto shadow-md p-8">
      <h2 className="text-center text-2xl font-bold tracking-tight text-gray-800">
        {isRegister ? "Create Account" : "Login"}
      </h2>

      <p className="text-center text-sm text-gray-500 mt-2">
        {isRegister
          ? "Looks like you are new here!"
          : "We are glad to see you again!"}
      </p>

      <form
        onSubmit={isRegister ? handleRegister : handleLogin}
        className="flex flex-col mt-6 gap-4"
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Username"
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {isRegister ? (
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your Password"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        ) : null}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && (
          <p className="text-green-500 text-sm text-center">{message}</p>
        )}

        <button
          type="submit"
          className="p-3 bg-black text-white rounded-md w-full hover:bg-gray-800 transition-colors"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <p className="text-xs text-center mt-4 text-gray-600">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link
          to=""
          onClick={handleRegisterToggle}
          className="text-black font-medium hover:underline"
        >
          {isRegister ? "Login" : "Create Account"}
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
