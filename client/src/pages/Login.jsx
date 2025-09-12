import React from "react";
import { Form, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useSession } from "../context/SessionContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useSession();
  const handleLoginSuccess = (userData) => {
    console.log("The logged in userdata:", userData);
    login(userData);
    if (!userData.isMfaActive) {
      navigate("/setup-2fa");
    }
    else{
      navigate('/verify/2fa')
    }
  };
  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Login;
