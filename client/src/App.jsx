import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";

function App() {
  return (
    <main className=" min-h-screen flex items-center justify-center p-4">
      <div  className="w-full ">
        <RouterProvider router={router} />
      </div>
    </main>
  );
}

export default App;
