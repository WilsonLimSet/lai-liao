"use client";

import { useState, useEffect, useCallback } from "react";
import { BusStopData } from "@/lib/types";
import { fetchBusArrivals } from "@/lib/api";
import BusServiceCard from "./BusServiceCard";

interface Props {
  busStopCode: string;
  busStopName: string;
}

export default function BusStopPanel({ busStopCode, busStopName }: Props) {
  const [data, setData] = useState<BusStopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchBusArrivals(busStopCode);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
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
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold">{busStopCode}</h2>
        <p className="text-gray-400 text-sm">{busStopName}</p>
      </div>

      {/* Bus Services */}
      <div className="flex-1 overflow-y-auto space-y-2 pb-16">
        {loading && !data && (
          <div className="flex items-center justify-center h-32">
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

        {sortedServices?.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-8">
            No buses arriving
          </div>
        )}

        {sortedServices?.map((service) => (
          <BusServiceCard key={service.no} service={service} />
        ))}
      </div>
    </div>
  );
}
