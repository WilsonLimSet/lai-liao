import { BusStopData } from "./types";

// Using arrivelah - a free open-source wrapper for LTA DataMall
const ARRIVELAH_API = "https://arrivelah2.busrouter.sg";

export async function fetchBusArrivals(busStopCode: string): Promise<BusStopData> {
  const response = await fetch(`${ARRIVELAH_API}/?id=${busStopCode}`, {
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bus arrivals: ${response.statusText}`);
  }

  return response.json();
}

// Bus stop search using a free API
export interface BusStopInfo {
  BusStopCode: string;
  RoadName: string;
  Description: string;
  Latitude: number;
  Longitude: number;
}

// Static list of popular bus stops for quick access
export const POPULAR_BUS_STOPS: BusStopInfo[] = [
  { BusStopCode: "01012", RoadName: "Victoria St", Description: "Hotel & Penang Lane", Latitude: 1.29684, Longitude: 103.85253 },
  { BusStopCode: "01013", RoadName: "Victoria St", Description: "St. Joseph's Ch", Latitude: 1.29770, Longitude: 103.85340 },
  { BusStopCode: "01019", RoadName: "Victoria St", Description: "Bras Basah Complex", Latitude: 1.29698, Longitude: 103.85302 },
  { BusStopCode: "02049", RoadName: "Upper Pickering St", Description: "Hong Lim Pk", Latitude: 1.28362, Longitude: 103.84731 },
  { BusStopCode: "03011", RoadName: "Tras St", Description: "Opp Amara Hotel", Latitude: 1.27502, Longitude: 103.84630 },
  { BusStopCode: "04111", RoadName: "Telok Blangah Rd", Description: "Telok Blangah Stn Exit A", Latitude: 1.27048, Longitude: 103.80969 },
  { BusStopCode: "08057", RoadName: "Orchard Rd", Description: "Royal Thai Embassy", Latitude: 1.30636, Longitude: 103.82925 },
  { BusStopCode: "08138", RoadName: "Orchard Rd", Description: "Opp Mandarin Orchard", Latitude: 1.30399, Longitude: 103.83608 },
  { BusStopCode: "10009", RoadName: "Bukit Timah Rd", Description: "Newton Stn Exit B", Latitude: 1.31220, Longitude: 103.83839 },
  { BusStopCode: "11009", RoadName: "Thomson Rd", Description: "Opp Goldhill Plaza", Latitude: 1.31936, Longitude: 103.84113 },
];
