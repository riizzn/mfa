import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { SessionProvider } from "./context/SessionContext.jsx";

function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full">
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </div>
    </main>
  );
}

export default App;
