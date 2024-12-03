import React, { useState } from "react";
import { Globe, CheckCircle, X } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Tooltip } from "@/components/ui/Tooltip";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { Select } from "@/components/ui/Select";
import { SocialLoginButton } from "@/components/auth/SocialLoginButton";
import { Modal } from "@/components/ui/Modal";

const DemoPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Página de Demostración</h1>

      <Card variant="hover">
        <h2 className="text-xl font-semibold mb-3">Componente de Tarjeta</h2>
        <p>Esta es una tarjeta con variante hover. Pasa el mouse sobre mí para ver el efecto de sombra.</p>
      </Card>

      <div className="flex items-center space-x-4">
        <Tooltip content="Este es un tooltip de ejemplo">
          <Badge variant="success">Tooltip Hover</Badge>
        </Tooltip>
        
        <Badge variant="warning">Advertencia</Badge>
        <Badge variant="error">Error</Badge>
      </div>

      <Alert 
        variant="success" 
        title="Operación Exitosa" 
        className="max-w-md"
      >
        Tu solicitud ha sido procesada correctamente.
      </Alert>

      <Select 
        label="Selecciona tu país"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        error={!selectedCountry ? "Por favor, selecciona un país" : undefined}
      >
        <option value="">Selecciona un país</option>
        <option value="mx">México</option>
        <option value="ar">Argentina</option>
        <option value="cl">Chile</option>
      </Select>

      <div className="mt-4">
        <SocialLoginButton 
          icon={Globe} 
          provider="Google" 
          onClick={handleModalToggle}
        />
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
        <Card className="p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Registro</h2>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input 
                id="email" 
                type="email" 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                placeholder="tu-email@ejemplo.com" 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input 
                id="password" 
                type="password" 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                placeholder="********" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Registrarse
            </button>
          </form>
        </Card>
      </Modal>
    </div>
  );
};

export default DemoPage;
