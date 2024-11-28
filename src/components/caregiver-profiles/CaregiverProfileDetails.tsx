import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface CaregiverProfile {
  id: number;
  userId: string;
  experience: string | null;
  description: string | null;
  coverage_radius_KM: number;
  verified: number;
  verification_date: string | null;
  average_rating: number;
  total_reviews: number;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  };
}

const CaregiverProfileDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Obtener el id desde la query de la URL
  const [profile, setProfile] = useState<CaregiverProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Si id no está disponible, no hacer el fetch

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/caregiver-profiles/${id}`); // Usar el id desde la URL
        if (!response.ok) {
          throw new Error('CaregiverProfile not found');
        }
        const data: CaregiverProfile = await response.json();
        setProfile(data);
      } catch (err) {
        setError('Error fetching caregiver profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Caregiver profile not found</div>;
  }

  return (
    <div className="min-w-full bg-white border border-gray-300 p-4">
      <h1 className="text-xl font-bold">Detalles del Cuidador</h1>
      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Usuario ID:</strong> {profile.userId}</p>
      <p><strong>Experiencia:</strong> {profile.experience || 'N/A'}</p>
      <p><strong>Descripción:</strong> {profile.description || 'N/A'}</p>
      <p><strong>Radio de cobertura (KM):</strong> {profile.coverage_radius_KM}</p>
      <p><strong>Verificado:</strong> {profile.verified ? 'Sí' : 'No'}</p>
      <p><strong>Fecha de verificación:</strong> {profile.verification_date || 'N/A'}</p>
      <p><strong>Calificación promedio:</strong> {profile.average_rating}</p>
      <p><strong>Total de reseñas:</strong> {profile.total_reviews}</p>

      <h2 className="text-lg font-semibold mt-4">Detalles del Usuario</h2>
      <p><strong>ID:</strong> {profile.user.id}</p>
      <p><strong>Nombre:</strong> {profile.user.name}</p>
      <p><strong>Email:</strong> {profile.user.email}</p>
      <p><strong>Teléfono:</strong> {profile.user.phone || 'N/A'}</p>
    </div>
  );
};

export default CaregiverProfileDetails;
