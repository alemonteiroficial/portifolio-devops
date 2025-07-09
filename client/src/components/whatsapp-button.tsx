import { useState } from 'react';
import { Button } from '@/components/ui/button';
import WhatsappModal from './whatsapp-modal';

export default function WhatsAppButton() {
  const [whatsappModal, setWhatsappModal] = useState({
    isOpen: false,
    plan: '',
    planName: ''
  });

  const handleWhatsAppClick = () => {
    setWhatsappModal({
      isOpen: true,
      plan: 'atendimento',
      planName: 'Atendimento Geral'
    });
  };

  const closeWhatsappModal = () => {
    setWhatsappModal({
      isOpen: false,
      plan: '',
      planName: ''
    });
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* WhatsApp Button */}
        <Button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-2xl hover:scale-110 hover:from-green-600 hover:to-green-700 transition-all duration-300 animate-pulse"
        >
          <i className="fab fa-whatsapp text-lg sm:text-xl"></i>
        </Button>
      </div>

      <WhatsappModal
        isOpen={whatsappModal.isOpen}
        onClose={closeWhatsappModal}
        plan={whatsappModal.plan}
        planName={whatsappModal.planName}
      />
    </>
  );
}