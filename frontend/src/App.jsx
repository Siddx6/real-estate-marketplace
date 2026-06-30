import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Browse from "./pages/Browse";
import PropertyDetail from "./pages/PropertyDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/properties" element={<Browse />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />
    </Routes>
  );
}

export default App;