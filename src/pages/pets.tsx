import React from "react";
import PetsList from "../components/PetsList";
import PetDetails from "../components/PetDetails";


const PetsPage: React.FC = () => {
  return (
    <div>
      <h1>Pets Page</h1>
      <PetsList />

      <h1>Pets con ID 1</h1>
      <PetDetails />


    </div>
  );
};

export default PetsPage;
