import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CareGiverProfilePage: React.FC = () => {
 

  return (
    <div
    style={{backgroundColor: 'white'}}
    className="flex flex-col items-center justify-center min-h-screen py-2"
  >
      <h1>Perfil del Cuidador
      </h1>
      <Link href="/caregiver-profiles" className='text-blue-500'>
        Volver a los Cuidadores
      </Link>
    </div>
  );
};

export default CareGiverProfilePage;
