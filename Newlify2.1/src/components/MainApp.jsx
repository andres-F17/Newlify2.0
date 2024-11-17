import React, { useState } from 'react';
import { Bell, CreditCard, History, LogOut, Plus, Send, Wallet } from 'lucide-react';
import Button from '@components/Button';
import Card from '@components/Card';
import TransactionHistory from '@components/TransactionHistory';
import TransactionModal from '@components/TransactionModal';
import { useAuth } from '@context/AuthContext';

export default function MainApp({ onLogout }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('movements');
  const [modalOpen, setModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(null);

  const handleActionClick = (type) => {
    setTransactionType(type);
    setModalOpen(true);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 min-h-screen bg-neutral-light">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Bienvenido, {user.name}</h2>
            <p className="text-neutral-dark">Tu billetera digital</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Bell size={20} /></Button>
            <Button variant="outline" onClick={onLogout}><LogOut size={20} /></Button>
          </div>
        </div>

        <div className="text-center mb-4 bg-primary p-6 rounded-lg">
          <p className="text-white opacity-80">Balance Disponible</p>
          <h2 className="text-4xl font-bold text-white">${user.saldo.toLocaleString()}</h2>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Send, label: "Enviar", action: () => handleActionClick('transfer') },
            { icon: Plus, label: "Recargar", action: () => handleActionClick('deposit') },
            { icon: CreditCard, label: "Pagar", action: () => handleActionClick('payment') },
            { icon: Wallet, label: "Retirar", action: () => handleActionClick('withdrawal') },
          ].map(({ icon: Icon, label, action }, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="flex flex-col items-center p-2 hover:bg-primary-light hover:text-white transition-colors"
              onClick={action}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{label}</span>
            </Button>
          ))}
        </div>
      </Card>

      <div>
        <div className="flex mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'movements' ? 'bg-primary text-white' : 'bg-white text-neutral-dark'} rounded-l-lg transition-colors`}
            onClick={() => setActiveTab('movements')}
          >
            Movimientos
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'cards' ? 'bg-primary text-white' : 'bg-white text-neutral-dark'} rounded-r-lg transition-colors`}
            onClick={() => setActiveTab('cards')}
          >
            Tarjetas
          </button>
        </div>

        {activeTab === 'movements' && <TransactionHistory />}

        {activeTab === 'cards' && (
          <Card>
            <h3 className="text-lg font-semibold text-primary mb-4">Mis Tarjetas</h3>
            <div className="space-y-4">
              {[
                { tipo: "débito", numero: "4111", expira: "01/25" },
                { tipo: "crédito", numero: "5222", expira: "03/26" }
              ].map((card, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-primary to-primary-light text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Tarjeta {card.tipo}</p>
                      <p className="opacity-80">**** **** **** {card.numero}</p>
                    </div>
                    <CreditCard size={24} className="text-white" />
                  </div>
                  <p className="text-sm opacity-80 mt-2">Expira: {card.expira}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={transactionType}
      />
    </div>
  );
}