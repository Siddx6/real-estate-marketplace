import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Browse from "./pages/Browse";
import PropertyDetail from "./pages/PropertyDetail";
import PostProperty from "./pages/PostProperty";
import OwnerDashboard from "./pages/OwnerDashboard";
import Wishlist from "./pages/Wishlist";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/properties" element={<Browse />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />
      <Route path="/post-property" element={<PostProperty />} />
      <Route path="/dashboard" element={<OwnerDashboard />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;