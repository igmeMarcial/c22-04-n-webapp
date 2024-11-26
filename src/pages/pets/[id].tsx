import React, { useEffect, useState } from 'react';
import PetDetails from '@/components/PetDetails';
import Link from 'next/link';

const PetDetailsPage: React.FC = () => {
 

  return (
    <div>
      <h1>Detalles de la Mascota</h1>
        <PetDetails />
      <Link href="/pets" className='text-blue-500'>
        Volver a las Mascotas
      </Link>
    </div>
  );
};

export default PetDetailsPage;
