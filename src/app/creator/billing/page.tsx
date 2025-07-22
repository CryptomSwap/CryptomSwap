"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCard, setShowAddCard] = useState(false);
  const [editingCard, setEditingCard] = useState<string | null>(null);

  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const accountBalance = 2847.50;
  const pendingPayouts = 1247.30;

  const paymentMethods = [
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      cardholderName: 'John Doe',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '8888',
      cardholderName: 'John Doe',
      expiryDate: '08/26',
      isDefault: false
    }
  ];

  const payoutHistory = [
    { id: 1, amount: 847.50, date: '2024-01-15', status: 'completed', method: 'Bank Transfer' },
    { id: 2, amount: 623.20, date: '2024-01-08', status: 'completed', method: 'Bank Transfer' },
    { id: 3, amount: 445.80, date: '2024-01-01', status: 'pending', method: 'Bank Transfer' }
  ];

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle card submission logic here
    setShowAddCard(false);
    setEditingCard(null);
    setCardForm({
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
      city: '',
      zipCode: '',
      country: ''
    });
  };

  const getCardIcon = (type: string) => {
    return type === 'visa' ? '💳' : '💳';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950" style={{ fontFamily: 'Aeonik, system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800"
      >
        <div className="flex items-center justify-between p-4 max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <BackButton />
            <h1 className="font-black text-xl text-white uppercase tracking-wider">
              Billing
            </h1>
          </div>
        </div>
      </motion.div>

      <div className="max-w-md mx-auto pb-24">
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4"
        >
          <div className="flex space-x-2 bg-gray-800/50 rounded-xl p-1">
            {['overview', 'payment methods', 'payouts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-400 to-purple-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 space-y-6"
          >
            {/* Balance Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
                <div className="text-2xl font-black text-white mb-1">
                  ${accountBalance.toLocaleString()}
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">
                  Available Balance
                </div>
              </div>
              <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
                <div className="text-2xl font-black text-white mb-1">
                  ${pendingPayouts.toLocaleString()}
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">
                  Pending Payout
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
              <h3 className="font-black text-white uppercase tracking-wider mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-orange-400 to-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105">
                  Request Payout
                </button>
                <button 
                  onClick={() => setActiveTab('payment methods')}
                  className="w-full bg-gray-800/50 text-white font-medium py-3 px-4 rounded-lg border border-gray-700 hover:border-orange-400 transition-all duration-300"
                >
                  Manage Payment Methods
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'payment methods' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 space-y-6"
          >
            {/* Existing Cards */}
            <div className="space-y-3">
              {paymentMethods.map((card) => (
                <div key={card.id} className="glass-premium rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getCardIcon(card.type)}</span>
                      <div>
                        <div className="font-bold text-white">
                          {card.type.toUpperCase()} •••• {card.last4}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {card.cardholderName} • Expires {card.expiryDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {card.isDefault && (
                        <span className="bg-orange-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                          DEFAULT
                        </span>
                      )}
                      <button
                        onClick={() => setEditingCard(card.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        ✏️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Card Button */}
            <button
              onClick={() => setShowAddCard(true)}
              className="w-full glass-premium rounded-xl p-4 border border-gray-700/50 border-dashed hover:border-orange-400 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">+</div>
                <div className="font-bold text-white">Add Payment Method</div>
              </div>
            </button>

            {/* Add/Edit Card Form */}
            {showAddCard && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-premium rounded-xl p-4 border border-gray-700/50"
              >
                <h3 className="font-black text-white uppercase tracking-wider mb-4">
                  Add Payment Method
                </h3>
                <form onSubmit={handleCardSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardForm.cardNumber}
                      onChange={(e) => setCardForm({...cardForm, cardNumber: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardForm.expiryDate}
                        onChange={(e) => setCardForm({...cardForm, expiryDate: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardForm.cvv}
                        onChange={(e) => setCardForm({...cardForm, cvv: e.target.value})}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardForm.cardholderName}
                      onChange={(e) => setCardForm({...cardForm, cardholderName: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-orange-400 to-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Save Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddCard(false)}
                      className="flex-1 bg-gray-800/50 text-white font-medium py-3 px-4 rounded-lg border border-gray-700 hover:border-orange-400 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Payouts Tab */}
        {activeTab === 'payouts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 space-y-6"
          >
            <div className="space-y-3">
              {payoutHistory.map((payout) => (
                <div key={payout.id} className="glass-premium rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-bold text-white">
                        ${payout.amount.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {payout.method} • {new Date(payout.date).toLocaleDateString()}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      payout.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {payout.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 