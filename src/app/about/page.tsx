import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Lai Liao | Singapore Bus Timing Display",
  description:
    "Lai Liao is a free, open-source Singapore bus arrival display. Perfect for repurposing old iPads as a dedicated bus timing screen at home.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary p-6 md:p-12 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-theme-secondary hover:text-theme-primary mb-8 transition-colors"
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
        <p className="text-xl text-theme-secondary mb-8">
          来了 - &quot;Come already!&quot;
        </p>

        <section className="space-y-6 text-theme-secondary flex-1">
        <div>
          <h2 className="text-xl font-semibold text-theme-primary mb-3">What is this?</h2>
          <p>
            Lai Liao is a free, open-source bus arrival display for Singapore.
            It shows real-time bus timings from LTA and auto-refreshes every minute.
          </p>
          <p className="mt-3">
            No ads, no tracking, no login required. Just wifi.
          </p>
          <p className="mt-3 text-sm italic">
            Note: This tool is designed specifically for Singapore local buses and only works with Singapore bus stop codes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-theme-primary mb-3">
            Perfect for old iPads
          </h2>
          <p className="mb-3">
            Got an old iPad collecting dust? Turn it into a dedicated bus timing
            display! Mount it near your door and always know when to leave for
            the bus stop.
          </p>
          <div className="bg-theme-secondary border border-theme rounded-xl p-4 space-y-2 text-sm">
            <p className="font-medium text-theme-primary">iPad setup tips:</p>
            <ol className="list-decimal list-inside space-y-1 text-theme-secondary">
              <li>Go to Settings → Display & Brightness → Auto-Lock → Never</li>
              <li>Open buslailiao.com in Safari or Chrome</li>
              <li>Tap Share → Add to Home Screen</li>
              <li>Open from Home Screen for fullscreen mode</li>
              <li>Optional: Enable Guided Access to lock to this app</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-theme-primary mb-3">Open Source</h2>
          <p>
            Lai Liao is completely free and open source. Check out the code,
            report issues, or contribute on{" "}
            <a
              href="https://github.com/WilsonLimSet/lai-liao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-theme-primary mb-3">Data Source</h2>
          <p>
            Bus arrival data comes from{" "}
            <a
              href="https://datamall.lta.gov.sg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LTA DataMall
            </a>{" "}
            via the{" "}
            <a
              href="https://github.com/cheeaun/arrivelah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              arrivelah
            </a>{" "}
            API by Chee Aun.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-theme-primary mb-3">Inspiration</h2>
          <p>
            Lai Liao was inspired by{" "}
            <a
              href="https://busaunty.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Bus Aunty
            </a>
            . Check them out too!
          </p>
        </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-theme text-center text-theme-secondary text-sm">
          <p>Made with love in Singapore</p>
          <a
            href="https://www.wilsonlimset.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-1 inline-block"
          >
            wilsonlimset
          </a>
        </footer>
      </div>
    </div>
  );
}
