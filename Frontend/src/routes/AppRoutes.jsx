import { BrowserRouter, Routes, Route } from "react-router-dom";
import Entry from "../pages/Entry";
import Exit from "../pages/Exit";
import Home from "../pages/Home";
import Payment from "../pages/Payment";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/entry" element={<Entry />}></Route>
        <Route path="/exit" element={<Exit />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
