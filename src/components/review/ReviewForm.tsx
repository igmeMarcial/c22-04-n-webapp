import React, { useState } from 'react';

interface ReviewFormProps {
  bookingID: string; // ID de la reserva
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookingID }) => {
  const [formData, setFormData] = useState({
    rating: 0, // Calificación (1-5)
    comment: '', // Comentario de la reseña
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const parsedValue =
      type === 'number' ? Number(value) : type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
        
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingID, ...formData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error creating review');
      }

      setSuccess('Review submitted successfully!');
      setFormData({
        rating: 0,
        comment: '',
        isAnonymous: false,
      });
    } catch (err: any) {
      setError(err.message || 'Error submitting review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold">Deja una reseña</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div>
        <label htmlFor="rating" className="block text-sm font-medium">
          Calificación
        </label>
        <select
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        >
          <option value="">Selecciona una calificación</option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value} estrella{value > 1 && 's'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium">
          Comentario
        </label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Enviando...' : 'Enviar reseña'}
      </button>
    </form>
  );
};

export default ReviewForm;
