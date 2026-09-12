import Navbar from "@/components/sections/Navbar";
import HeroVideo from "@/components/sections/HeroVideo";
import Servicios from "@/components/sections/Servicios";
import Bots from "@/components/sections/Bots";
import Proceso from "@/components/sections/Proceso";
import Portfolio from "@/components/sections/Portfolio";
import Testimonios from "@/components/sections/Testimonios";
import Contacto from "@/components/sections/Contacto";
import Footer from "@/components/sections/Footer";
import StackFlow from "@/components/shared/StackFlow";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroVideo />
        <StackFlow
          panels={[
            { id: "servicios", node: <Servicios /> },
            { id: "bots", node: <Bots /> },
            { id: "proceso", node: <Proceso /> },
            { id: "portfolio", node: <Portfolio /> },
            { id: "testimonios", node: <Testimonios /> },
            { id: "contacto", node: <Contacto /> },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}