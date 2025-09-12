import React from "react";
import TwoFa from "../components/TwoFa";
import { useNavigate } from "react-router-dom";

const Setup2FA = () => {
  const navigate = useNavigate();
  const handleSetupComplete = () => {
    navigate("/verify-2fa");
  };

  return (
    <>
      <TwoFa onSetupComplete={handleSetupComplete} />
    </>
  );
};

export default Setup2FA;
