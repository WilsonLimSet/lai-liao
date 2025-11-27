"use client";

import { BusService, BusArrival, LOAD_LABELS, LoadType } from "@/lib/types";

interface Props {
  service: BusService;
}

function formatArrivalTime(arrival: BusArrival | undefined): {
  text: string;
  isArriving: boolean;
  minutes: number;
} {
  if (!arrival || !arrival.time) {
    return { text: "-", isArriving: false, minutes: -1 };
  }

  const minutes = Math.floor(arrival.duration_ms / 60000);

  if (minutes <= 0) {
    return { text: "Arr", isArriving: true, minutes: 0 };
  }

  if (minutes === 1) {
    return { text: "1", isArriving: true, minutes: 1 };
  }

  return { text: `${minutes}`, isArriving: false, minutes };
}

function LoadIndicator({ load }: { load: LoadType }) {
  const config = LOAD_LABELS[load] || LOAD_LABELS[""];

  return (
    <div className={`text-xs ${config.color} opacity-80`}>
      {load === "SEA" && "●"}
      {load === "SDA" && "◐"}
      {load === "LSD" && "○"}
    </div>
  );
}

function BusTypeIndicator({ type }: { type: string }) {
  const labels: Record<string, string> = {
    DD: "DD",
    BD: "BD",
    SD: "",
  };

  if (!labels[type]) return null;

  return (
    <span className="text-xs text-gray-500 ml-1">{labels[type]}</span>
  );
}

function ArrivalTime({ arrival, isPrimary }: { arrival: BusArrival | undefined; isPrimary?: boolean }) {
  const { text, isArriving, minutes } = formatArrivalTime(arrival);

  if (text === "-") {
    return <span className="text-theme-secondary">-</span>;
  }

  return (
    <div className="flex flex-col items-center">
      <span
        className={`
          ${isPrimary ? "text-4xl font-bold" : "text-2xl font-medium"}
          ${isArriving ? "text-green-500" : "text-theme-primary"}
          ${isArriving && isPrimary ? "animate-pulse-subtle" : ""}
        `}
      >
        {text}
      </span>
      {arrival && (
        <div className="flex items-center gap-1 mt-1">
          <LoadIndicator load={arrival.load} />
          <BusTypeIndicator type={arrival.type} />
        </div>
      )}
    </div>
  );
}

export default function BusServiceCard({ service }: Props) {
  return (
    <div className="bg-theme-card rounded-2xl p-3 flex items-center border border-theme h-full">
      {/* Bus Number */}
      <div className="w-20 flex-shrink-0">
        <div className="text-2xl font-bold text-theme-primary">{service.no}</div>
      </div>

      {/* Arrival Times */}
      <div className="flex-1 flex items-center justify-end gap-6">
        <ArrivalTime arrival={service.next} isPrimary />
        <ArrivalTime arrival={service.next2} />
        <ArrivalTime arrival={service.next3} />
        <span className="text-gray-600 text-sm w-8">min</span>
      </div>
    </div>
  );
}
