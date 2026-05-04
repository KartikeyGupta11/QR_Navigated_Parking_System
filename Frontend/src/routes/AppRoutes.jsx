import { BrowserRouter, Routes, Route } from "react-router-dom";
import Entry from "../pages/Entry";
import Exit from "../pages/Exit";
import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Success from "../pages/Success";
import Dashboard from "../pages/admin/Dashboard";
import Sessions from "../pages/admin/Sessions";
import Slots from "../pages/admin/Slots";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entry" element={<Entry />} />
        <Route path="/exit" element={<Exit />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/sessions" element={<Sessions />} />
        <Route path="/admin/slots" element={<Slots />} />
      </Routes>
    </BrowserRouter>
  );
}
