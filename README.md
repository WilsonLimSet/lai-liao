# Lai Liao - Singapore Bus Timings

Free, open-source real-time bus arrival display for Singapore.

**Live site:** [buslailiao.com](https://buslailiao.com)

## What is this?

"Lai Liao" (来了) means "coming already" in Singlish. This app shows real-time bus arrival times from LTA, perfect for:

- Repurposing an old iPad as a dedicated bus timing display
- Mounting near your door so you always know when to leave
- Checking bus timings for both sides of the street

## Features

- Real-time bus arrivals from LTA DataMall
- Support for 2 bus stops side by side
- Auto-refresh every 60 seconds
- Dark mode optimized for always-on displays
- Works as a PWA (add to home screen)
- No ads, no login, completely free

## iPad Setup

1. Set Auto-Lock to "Never" in Settings → Display & Brightness
2. Open buslailiao.com in Safari
3. Tap Share → Add to Home Screen
4. Open from Home Screen for fullscreen mode
5. Optional: Enable Guided Access to lock to this app

## Run Locally

```bash
git clone https://github.com/WilsonLimSet/lai-liao.git
cd lai-liao
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 14
- Tailwind CSS
- [arrivelah](https://github.com/cheeaun/arrivelah) API (wraps LTA DataMall)
- Vercel

## License

MIT
