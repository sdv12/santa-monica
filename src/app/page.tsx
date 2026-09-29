import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ComoReservar } from "@/components/landing/ComoReservar";
import { LaCasa } from "@/components/landing/LaCasa";
import { Disponibilidad } from "@/components/landing/Disponibilidad";
import { ComoLlegar } from "@/components/landing/ComoLlegar";
import { Publicidad } from "@/components/landing/Publicidad";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <ComoReservar />
        <LaCasa />
        <Disponibilidad />
        <ComoLlegar />
        <Publicidad />
      </main>
      <Footer />
    </>
  );
}
