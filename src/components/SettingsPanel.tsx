"use client";

import { useState } from "react";
import Link from "next/link";
import { SavedBusStop } from "@/lib/types";
import { useTheme } from "@/lib/theme";

interface BusStopInfo {
  code: string;
  name: string;
}

// Your nearby stops
const NEARBY_STOPS: BusStopInfo[] = [
  { code: "13051", name: "Opp Valley Pt" },
  { code: "13059", name: "Valley Pt" },
];

interface Props {
  busStops: [SavedBusStop | null, SavedBusStop | null];
  onSave: (stops: [SavedBusStop | null, SavedBusStop | null]) => void;
  onClose: () => void;
  isFirstTime?: boolean;
}

export default function SettingsPanel({ busStops, onSave, onClose, isFirstTime }: Props) {
  const [stop1Code, setStop1Code] = useState(busStops[0]?.code || "");
  const [stop1Name, setStop1Name] = useState(busStops[0]?.name || "");
  const [stop2Code, setStop2Code] = useState(busStops[1]?.code || "");
  const [stop2Name, setStop2Name] = useState(busStops[1]?.name || "");
  const [showStop2, setShowStop2] = useState(busStops[1] !== null);
  const [activeStop, setActiveStop] = useState<1 | 2>(1);
  const { theme, toggleTheme } = useTheme();

  const handleSelectStop = (stop: BusStopInfo) => {
    if (activeStop === 1) {
      setStop1Code(stop.code);
      setStop1Name(stop.name);
    } else {
      setStop2Code(stop.code);
      setStop2Name(stop.name);
    }
  };

  const handleSave = () => {
    if (!stop1Code.trim()) return;

    const newStops: [SavedBusStop | null, SavedBusStop | null] = [
      { code: stop1Code.trim(), name: stop1Name.trim() || `Bus Stop ${stop1Code.trim()}` },
      showStop2 && stop2Code.trim()
        ? { code: stop2Code.trim(), name: stop2Name.trim() || `Bus Stop ${stop2Code.trim()}` }
        : null,
    ];
    onSave(newStops);
  };

  const handleRemoveStop2 = () => {
    setShowStop2(false);
    setStop2Code("");
    setStop2Name("");
    setActiveStop(1);
  };

  return (
    <div className="fixed inset-0 bg-theme-primary z-50 overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {isFirstTime ? "Welcome to Lai Liao" : "Settings"}
            </h1>
            {isFirstTime && (
              <p className="text-theme-secondary text-sm mt-1">
                Enter your bus stop code to get started
              </p>
            )}
          </div>
          {!isFirstTime && (
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-theme-secondary hover:opacity-80 transition-colors border border-theme"
              aria-label="Close"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </header>

        {/* Bus Stop 1 */}
        <section className="mb-6">
          <h2 className="text-sm uppercase tracking-wide text-theme-secondary mb-3">
            Bus Stop {showStop2 ? "1 (Left)" : ""}
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              value={stop1Code}
              onChange={(e) => setStop1Code(e.target.value)}
              onFocus={() => setActiveStop(1)}
              placeholder="Bus stop code (e.g., 13051)"
              className={`w-full bg-theme-secondary border rounded-xl px-4 py-3 text-theme-primary placeholder-gray-500 focus:outline-none ${
                activeStop === 1 ? "border-blue-500" : "border-theme"
              }`}
              maxLength={5}
            />
            <input
              type="text"
              value={stop1Name}
              onChange={(e) => setStop1Name(e.target.value)}
              onFocus={() => setActiveStop(1)}
              placeholder="Name (optional)"
              className={`w-full bg-theme-secondary border rounded-xl px-4 py-3 text-theme-primary placeholder-gray-500 focus:outline-none ${
                activeStop === 1 ? "border-blue-500" : "border-theme"
              }`}
            />
          </div>
        </section>

        {/* Bus Stop 2 */}
        {showStop2 ? (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm uppercase tracking-wide text-theme-secondary">
                Bus Stop 2 (Right)
              </h2>
              <button
                onClick={handleRemoveStop2}
                className="text-red-500 hover:text-red-400 text-sm transition-colors"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={stop2Code}
                onChange={(e) => setStop2Code(e.target.value)}
                onFocus={() => setActiveStop(2)}
                placeholder="Bus stop code (e.g., 13059)"
                className={`w-full bg-theme-secondary border rounded-xl px-4 py-3 text-theme-primary placeholder-gray-500 focus:outline-none ${
                  activeStop === 2 ? "border-blue-500" : "border-theme"
                }`}
                maxLength={5}
              />
              <input
                type="text"
                value={stop2Name}
                onChange={(e) => setStop2Name(e.target.value)}
                onFocus={() => setActiveStop(2)}
                placeholder="Name (optional)"
                className={`w-full bg-theme-secondary border rounded-xl px-4 py-3 text-theme-primary placeholder-gray-500 focus:outline-none ${
                  activeStop === 2 ? "border-blue-500" : "border-theme"
                }`}
              />
            </div>
          </section>
        ) : (
          <section className="mb-6">
            <button
              onClick={() => {
                setShowStop2(true);
                setActiveStop(2);
              }}
              className="w-full border-2 border-dashed border-theme hover:opacity-80 rounded-xl px-4 py-4 text-theme-secondary transition-colors flex items-center justify-center gap-2"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add another bus stop
            </button>
          </section>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!stop1Code.trim()}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-theme-secondary disabled:text-theme-secondary disabled:border disabled:border-theme rounded-xl px-4 py-3 font-medium transition-colors mb-8 text-white"
        >
          {isFirstTime ? "Get Started" : "Save Settings"}
        </button>

        {/* Theme Toggle */}
        <section className="mb-8">
          <h2 className="text-sm uppercase tracking-wide text-theme-secondary mb-3">
            Appearance
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => theme !== "light" && toggleTheme()}
              className={`flex-1 py-3 px-4 rounded-xl border transition-colors ${
                theme === "light"
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-theme-secondary border-theme text-theme-secondary"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => theme !== "dark" && toggleTheme()}
              className={`flex-1 py-3 px-4 rounded-xl border transition-colors ${
                theme === "dark"
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-theme-secondary border-theme text-theme-secondary"
              }`}
            >
              Dark
            </button>
          </div>
        </section>

        {/* Quick Select Stops */}
        <section>
          <h2 className="text-sm uppercase tracking-wide text-theme-secondary mb-3">
            Quick Select {showStop2 && `(for Stop ${activeStop})`}
          </h2>
          <div className="space-y-2">
            {NEARBY_STOPS.map((stop) => (
              <button
                key={stop.code}
                onClick={() => handleSelectStop(stop)}
                className="w-full text-left bg-theme-secondary hover:opacity-80 rounded-xl p-4 border border-theme transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium text-theme-primary">{stop.name}</div>
                  <div className="text-theme-secondary font-mono">{stop.code}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Info */}
        <section className="mt-8 pt-8 border-t border-theme text-center">
          <p className="text-xs text-theme-secondary mb-4">
            Find your bus stop code on the bus stop pole or Google Maps
          </p>
          <Link
            href="/about"
            className="text-blue-500 hover:underline text-sm"
          >
            About Lai Liao
          </Link>
        </section>
      </div>
    </div>
  );
}
