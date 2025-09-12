import React, { useEffect, useState } from "react";
import { setup2FA } from "../service/authApi";

const TwoFa = ({onSetupComplete}) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState({});
  const copyClipBoard = async () => {
    await navigator.clipboard.writeText(response.secret);
    setMessage("secret copied to Clipboard");
   
  };
  const fetchQRCode = async () => {
    const { data } = await setup2FA();
    setResponse(data);
  };
  useEffect(() => {
    fetchQRCode();
  }, []);
  return (
    <div className="bg-white rounded-xl max-w-sm w-full mx-auto shadow-md p-8">
      <h2 className="text-center text-2xl font-bold tracking-tight text-gray-800">
        Setup Two Factor Authentication
      </h2>

      <p className="text-center text-sm text-gray-500 mt-2">
        Scan the QR code below with your authenticator app
      </p>
      <div className="flex justify-center items-center">
        <img src={response.qrCode} alt="2FA QR Code" className="" />
      </div>
      <div className="text-sm text-center text-g">Enter the Code</div>
      <div className="m-2">
        {message && <p className="text-sm  text-green-600 m-2 text-center">{message}</p>}
        <input
          readOnly
          defaultValue=""
          value={response.secret}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={copyClipBoard}
        />
      </div>

      <button
        type="submit"
        className="p-2 bg-black text-white rounded-md w-full hover:bg-gray-800 transition-colors"
      >
        Continue to Verification
      </button>
    </div>
  );
};

export default TwoFa;
