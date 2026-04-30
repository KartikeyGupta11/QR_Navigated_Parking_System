import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="Top-center"></Toaster>
      <AppRoutes />
    </>
  );
}

export default App;
