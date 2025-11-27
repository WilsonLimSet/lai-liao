import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Lai Liao | Free Singapore Bus Timing Display",
  description:
    "Lai Liao is a free, open-source Singapore bus arrival display. Perfect for repurposing old iPads as a dedicated bus timing screen at home.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to timings
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">Lai Liao!</h1>
      <p className="text-xl text-gray-400 mb-8">
        来了 - &quot;Come already!&quot; in Singlish
      </p>

      <section className="space-y-6 text-gray-300">
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">What is this?</h2>
          <p>
            Lai Liao is a free, open-source bus arrival display for Singapore.
            It shows real-time bus timings from LTA and auto-refreshes every minute.
          </p>
          <p className="mt-3">
            No ads, no tracking, no login required. Just wifi.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            Perfect for old iPads
          </h2>
          <p className="mb-3">
            Got an old iPad collecting dust? Turn it into a dedicated bus timing
            display! Mount it near your door and always know when to leave for
            the bus stop.
          </p>
          <div className="bg-gray-900 rounded-xl p-4 space-y-2 text-sm">
            <p className="font-medium text-white">iPad setup tips:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-400">
              <li>Go to Settings → Display & Brightness → Auto-Lock → Never</li>
              <li>Open buslailiao.com in Safari</li>
              <li>Tap Share → Add to Home Screen</li>
              <li>Open from Home Screen for fullscreen mode</li>
              <li>Optional: Enable Guided Access to lock to this app</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Open Source</h2>
          <p>
            Lai Liao is completely free and open source. Check out the code,
            report issues, or contribute on{" "}
            <a
              href="https://github.com/WilsonLimSet/lai-liao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Data Source</h2>
          <p>
            Bus arrival data comes from{" "}
            <a
              href="https://datamall.lta.gov.sg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              LTA DataMall
            </a>{" "}
            via the{" "}
            <a
              href="https://github.com/cheeaun/arrivelah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              arrivelah
            </a>{" "}
            API by Chee Aun.
          </p>
        </div>
      </section>

      <footer className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>
          Made with love in Singapore by{" "}
          <a
            href="https://www.wilsonlimset.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            wilsonlimset
          </a>
        </p>
      </footer>
    </div>
  );
}
