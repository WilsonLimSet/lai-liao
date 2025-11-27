"use client";

import { useState, useEffect, useCallback } from "react";
import { BusStopData } from "@/lib/types";
import { fetchBusArrivals } from "@/lib/api";
import BusServiceCard from "./BusServiceCard";

interface Props {
  busStopCode: string;
  busStopName: string;
}

// Check if current time is during no-bus hours (1:00 AM - 5:30 AM)
function isNoBusHours(): boolean {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const timeInMinutes = hours * 60 + minutes;

  // 1:00 AM = 60 minutes, 5:30 AM = 330 minutes
  return timeInMinutes >= 60 && timeInMinutes < 330;
}

export default function BusStopPanel({ busStopCode, busStopName }: Props) {
  const [data, setData] = useState<BusStopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    // Skip API calls during no-bus hours
    if (isNoBusHours()) {
      setIsNightMode(true);
      setLoading(false);
      return;
    }

    setIsNightMode(false);
    setIsRefreshing(true);
    try {
      const result = await fetchBusArrivals(busStopCode);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
      // Brief flash for refresh indicator
      setTimeout(() => setIsRefreshing(false), 300);
    }
  }, [busStopCode]);

  useEffect(() => {
    fetchData();
    // Refresh every 60 seconds - arrivelah caches for 15s anyway
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Sort services by bus number
  const sortedServices = data?.services?.slice().sort((a, b) => {
    const aNum = parseInt(a.no.replace(/\D/g, "")) || 0;
    const bNum = parseInt(b.no.replace(/\D/g, "")) || 0;
    if (aNum !== bNum) return aNum - bNum;
    return a.no.localeCompare(b.no);
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-2 flex items-center gap-2">
        <h2 className="text-xl font-bold">{busStopName}</h2>
        <span
          className={`w-2 h-2 rounded-full bg-green-500 transition-opacity duration-300 ${
            isRefreshing ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Bus Services - fill available space */}
      <div className="flex-1 flex flex-col gap-2 min-h-0">
        {loading && !data && (
          <div className="flex items-center justify-center flex-1">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-700 border-t-white"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-xl p-3 text-center">
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={fetchData}
              className="mt-2 px-3 py-1 bg-red-800 hover:bg-red-700 rounded-lg text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {isNightMode && (
          <div className="text-center text-gray-500 flex-1 flex items-center justify-center flex-col gap-2">
            <span className="text-2xl">No bus service</span>
            <span className="text-sm">1:00 AM - 5:30 AM</span>
          </div>
        )}

        {!isNightMode && sortedServices?.length === 0 && !loading && (
          <div className="text-center text-gray-500 flex-1 flex items-center justify-center">
            No buses arriving
          </div>
        )}

        {!isNightMode && sortedServices?.map((service) => (
          <div key={service.no} className="flex-1 min-h-0">
            <BusServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  );
}
