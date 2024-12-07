import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import React from "react";

function page() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />

      <Footer />
    </>
  );
}

export default page;
