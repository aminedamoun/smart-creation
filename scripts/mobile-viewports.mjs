import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "/tmp/mobile-folds";
mkdirSync(OUT, { recursive: true });

const pages = [
  { url: "/", name: "home" },
  { url: "/about", name: "about" },
  { url: "/business-centers", name: "centres" },
  { url: "/business-centers/smart-founders", name: "centre-detail" },
  { url: "/insights", name: "insights" },
  { url: "/contact", name: "contact" },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
});
for (const pg of pages) {
  const page = await ctx.newPage();
  await page.goto(`http://localhost:3000${pg.url}`, {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(800);

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = 844;
  const folds = Math.min(6, Math.ceil(total / vh));
  for (let i = 0; i < folds; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * vh);
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `${OUT}/${pg.name}-fold${i + 1}.png`,
      fullPage: false,
    });
  }
  console.log(`${pg.name}: ${folds} folds (page ${total}px tall)`);
  await page.close();
}
await ctx.close();
await browser.close();
