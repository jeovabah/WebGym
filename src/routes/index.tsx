import {
  Route,
  Routes,
} from "react-router-dom";
import Privacidade from "../pages/Privacidade";
import Home from "../pages/Home";

export default function Router() {
  return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/privacidade" element={<Privacidade />} />
      </Routes>
  );
}