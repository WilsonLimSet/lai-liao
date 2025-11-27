"use client";

import { useState, useEffect } from "react";
import BusStopPanel from "@/components/BusStopPanel";
import SettingsPanel from "@/components/SettingsPanel";
import { SavedBusStop } from "@/lib/types";

const DEFAULT_BUS_STOPS: [SavedBusStop | null, SavedBusStop | null] = [
  null,
  null,
];

const STORAGE_KEY = "sg-bus-timing-stops";

export default function Home() {
  const [busStops, setBusStops] = useState<[SavedBusStop | null, SavedBusStop | null]>(DEFAULT_BUS_STOPS);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Load saved bus stops from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBusStops([parsed[0] || DEFAULT_BUS_STOPS[0], parsed[1] || null]);
      } catch {
        // Use default if parsing fails
      }
    }
    setIsLoaded(true);
  }, []);

  // Update timestamp every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Save bus stops to localStorage
  const handleSaveStops = (stops: [SavedBusStop | null, SavedBusStop | null]) => {
    setBusStops(stops);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stops));
    setShowSettings(false);
  };

  // Don't render until we've loaded from localStorage to prevent flash
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-white"></div>
      </div>
    );
  }

  // Show settings if no bus stop configured or user requested
  if (showSettings || busStops[0] === null) {
    return (
      <SettingsPanel
        busStops={busStops}
        onSave={handleSaveStops}
        onClose={() => setShowSettings(false)}
        isFirstTime={busStops[0] === null}
      />
    );
  }

  const hasTwoStops = busStops[1] !== null;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      {/* Header with settings button */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-medium text-gray-400">Lai Liao</h1>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          aria-label="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </header>

      {/* Bus Stop Panels */}
      <main className={`grid gap-4 md:gap-6 ${hasTwoStops ? "grid-cols-2" : "grid-cols-1"}`}>
        <BusStopPanel
          busStopCode={busStops[0].code}
          busStopName={busStops[0].name}
        />
        {hasTwoStops && busStops[1] && (
          <BusStopPanel
            busStopCode={busStops[1].code}
            busStopName={busStops[1].name}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Updated {lastUpdated.toLocaleTimeString()}</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Auto-refresh
          </span>
        </div>
      </footer>
    </div>
  );
}
