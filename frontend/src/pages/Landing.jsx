import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AudienceSplit from "../components/AudienceSplit";
import Footer from "../components/Footer";

function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <AudienceSplit />
      <Footer />
    </div>
  );
}

export default Landing;