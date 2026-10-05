import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ComoReservar } from "@/components/landing/ComoReservar";
import { LaCasa } from "@/components/landing/LaCasa";
import { Galeria } from "@/components/landing/Galeria";
import { Testimonios } from "@/components/landing/Testimonios";
import { Disponibilidad } from "@/components/landing/Disponibilidad";
import { FAQ } from "@/components/landing/FAQ";
import { GuiaLocal } from "@/components/landing/GuiaLocal";
import { ComoLlegar } from "@/components/landing/ComoLlegar";
import { Publicidad } from "@/components/landing/Publicidad";
import { Footer } from "@/components/landing/Footer";
import { ContactoFijo } from "@/components/ui/ContactoFijo";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <ComoReservar />
        <LaCasa />
        <Galeria />
        <Testimonios />
        <Disponibilidad />
        <FAQ />
        <GuiaLocal />
        <ComoLlegar />
        <Publicidad />
      </main>
      <Footer />
      <ContactoFijo />
    </>
  );
}
