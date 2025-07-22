"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const stats = {
    totalRevenue: 2847.50,
    totalDrops: 12,
    totalUnlocks: 847,
    avgUnlocksPerDrop: 70.6,
    totalFans: 1247,
    engagementRate: 23.4
  };

  const chartData = {
    revenue: [120, 180, 240, 320, 280, 350, 420],
    unlocks: [45, 67, 89, 123, 98, 156, 189],
    fans: [12, 18, 25, 34, 28, 42, 51]
  };

  const topDrops = [
    { id: 1, title: "Summer Vibes Collection", revenue: 847.50, unlocks: 156, date: "2024-01-15" },
    { id: 2, title: "Behind the Scenes", revenue: 623.20, unlocks: 98, date: "2024-01-12" },
    { id: 3, title: "Exclusive Interview", revenue: 445.80, unlocks: 67, date: "2024-01-10" }
  ];

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
              Analytics
            </h1>
          </div>
        </div>
      </motion.div>

      <div className="max-w-md mx-auto pb-24">
        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4"
        >
          <div className="flex space-x-2 bg-gray-800/50 rounded-xl p-1">
            {['7d', '30d', '90d', '1y'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-orange-400 to-purple-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Key Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-4 mb-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl font-black text-white mb-1">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">
                Total Revenue
              </div>
            </div>
            <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl font-black text-white mb-1">
                {stats.totalUnlocks.toLocaleString()}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">
                Total Unlocks
              </div>
            </div>
            <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl font-black text-white mb-1">
                {stats.totalFans.toLocaleString()}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">
                Total Fans
              </div>
            </div>
            <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl font-black text-white mb-1">
                {stats.engagementRate}%
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">
                Engagement
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 mb-6"
        >
          <div className="glass-premium rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-white uppercase tracking-wider">
                Performance
              </h3>
              <div className="flex space-x-2">
                {['revenue', 'unlocks', 'fans'].map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                      selectedMetric === metric
                        ? 'bg-gradient-to-r from-orange-400 to-purple-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Simple Chart Visualization */}
            <div className="h-32 flex items-end justify-between space-x-1">
              {chartData[selectedMetric as keyof typeof chartData].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-orange-400 to-purple-500 rounded-t-sm transition-all duration-500"
                    style={{ height: `${(value / Math.max(...chartData[selectedMetric as keyof typeof chartData])) * 100}%` }}
                  />
                  <div className="text-xs text-gray-400 mt-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top Performing Drops */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-4"
        >
          <h3 className="font-black text-white uppercase tracking-wider mb-4">
            Top Performing Drops
          </h3>
          <div className="space-y-3">
            {topDrops.map((drop, index) => (
              <motion.div
                key={drop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass-premium rounded-xl p-4 border border-gray-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white text-sm">
                    {drop.title}
                  </h4>
                  <span className="text-orange-400 font-bold">
                    ${drop.revenue}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{drop.unlocks} unlocks</span>
                  <span>{new Date(drop.date).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 