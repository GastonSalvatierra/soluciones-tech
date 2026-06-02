import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import Services3D from "@/components/Services3D";
import About3D from "@/components/About3D";
import CtaBanner from "@/components/CtaBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";
import LiveDemo from "@/components/LiveDemo";

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      <Hero3D />
      <Services3D />
      <LiveDemo />
      <TechStack />
      <About3D />
      <CtaBanner />
      <Contact />
      <Footer />
    </main>
  );
}
