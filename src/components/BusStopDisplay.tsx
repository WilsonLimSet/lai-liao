"use client";

import { useState, useEffect, useCallback } from "react";
import { BusStopData } from "@/lib/types";
import { fetchBusArrivals } from "@/lib/api";
import BusServiceCard from "./BusServiceCard";

interface Props {
  busStopCode: string;
  busStopName: string;
  onSettings?: () => void;
  compact?: boolean;
}

export default function BusStopDisplay({ busStopCode, busStopName, onSettings }: Props) {
  const [data, setData] = useState<BusStopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchBusArrivals(busStopCode);
      setData(result);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, [busStopCode]);

  useEffect(() => {
    fetchData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [fetchData]);

  // Sort services by bus number
  const sortedServices = data?.services?.slice().sort((a, b) => {
    // Extract numeric part for proper sorting (e.g., "2" before "10", "10A" after "10")
    const aNum = parseInt(a.no.replace(/\D/g, "")) || 0;
    const bNum = parseInt(b.no.replace(/\D/g, "")) || 0;
    if (aNum !== bNum) return aNum - bNum;
    // If same number, sort by suffix (e.g., "10" before "10A")
    return a.no.localeCompare(b.no);
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{busStopCode}</h1>
          <p className="text-gray-400 text-sm md:text-base">{busStopName}</p>
        </div>
        <button
          onClick={onSettings}
          className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          aria-label="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

      {/* Bus Services */}
      <main className="space-y-3">
        {loading && !data && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-white"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-xl p-4 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchData}
              className="mt-3 px-4 py-2 bg-red-800 hover:bg-red-700 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {sortedServices?.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-12">
            No buses arriving at this stop
          </div>
        )}

        {sortedServices?.map((service) => (
          <BusServiceCard key={service.no} service={service} />
        ))}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            {lastUpdated && `Updated ${lastUpdated.toLocaleTimeString()}`}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Auto-refresh
          </span>
        </div>
      </footer>
    </div>
  );
}
