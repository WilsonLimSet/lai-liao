export interface BusArrival {
  time: string;
  duration_ms: number;
  load: "SEA" | "SDA" | "LSD" | "";
  feature: string;
  type: "SD" | "DD" | "BD";
  lat: number;
  lng: number;
}

export interface BusService {
  no: string;
  operator: string;
  next: BusArrival;
  next2?: BusArrival;
  next3?: BusArrival;
}

export interface BusStopData {
  services: BusService[];
}

export interface SavedBusStop {
  code: string;
  name: string;
  services?: string[]; // Optional: filter specific services
}

export type LoadType = "SEA" | "SDA" | "LSD" | "";

export const LOAD_LABELS: Record<LoadType, { label: string; color: string }> = {
  SEA: { label: "Seats Available", color: "text-green-400" },
  SDA: { label: "Standing Available", color: "text-yellow-400" },
  LSD: { label: "Limited Standing", color: "text-red-400" },
  "": { label: "Unknown", color: "text-gray-500" },
};
