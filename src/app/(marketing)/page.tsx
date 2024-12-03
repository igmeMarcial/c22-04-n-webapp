import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import React from "react";

function page() {
  return (
    <>
      <HeroSection />
      <section className="hero">
        <h2>Encuentra al mejor cuidador</h2>
        <p>Conecta con personas apasionadas por cuidar a tu mascota.</p>
      </section>
      <section className="features">
        <h2>¿Por qué elegirnos?</h2>
        <p>
          Ofrecemos cuidadores confiables, con experiencia y pasión por los
          animales.
        </p>
      </section>
      <section className="about">
        <h2>¡Conoce más sobre nosotros!</h2>
        <p>
          Nuestro equipo trabaja día a día para garantizar el mejor cuidado para
          tus mascotas. ¡Únete a nuestra comunidad!
        </p>
      </section>
      <Footer />
    </>
  );
}

export default page;
