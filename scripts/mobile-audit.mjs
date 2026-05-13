import { chromium, devices } from "playwright";
import { mkdirSync } from "fs";

const OUT = "/tmp/mobile-shots";
mkdirSync(OUT, { recursive: true });

const pages = [
  { url: "/", name: "home" },
  { url: "/about", name: "about" },
  { url: "/business-centers", name: "centres" },
  { url: "/business-centers/smart-founders", name: "centre-detail" },
  { url: "/insights", name: "insights" },
  { url: "/contact", name: "contact" },
];

const viewports = [
  { name: "iphone-se", width: 375, height: 667 },
  { name: "iphone-14", width: 390, height: 844 },
  { name: "ipad", width: 768, height: 1024 },
];

const issues = [];

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.width < 768,
    hasTouch: vp.width < 768,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
  });
  for (const pg of pages) {
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errs.push("console: " + m.text());
    });
    try {
      await page.goto(`http://localhost:3000${pg.url}`, {
        waitUntil: "networkidle",
        timeout: 30000,
      });
      // Wait a beat for animations
      await page.waitForTimeout(700);

      // Detect horizontal overflow
      const overflow = await page.evaluate(() => {
        const docW = document.documentElement.clientWidth;
        const offenders = [];
        document.querySelectorAll("*").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > docW + 1 && r.width < docW * 2) {
            const tag = el.tagName.toLowerCase();
            const id = el.id ? `#${el.id}` : "";
            const cls = el.className && typeof el.className === "string"
              ? `.${el.className.split(" ").slice(0, 3).join(".")}`
              : "";
            offenders.push({
              sel: `${tag}${id}${cls}`,
              right: Math.round(r.right),
              width: Math.round(r.width),
              docW,
            });
          }
        });
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: docW,
          horizontalScroll: document.documentElement.scrollWidth > docW,
          offenders: offenders.slice(0, 6),
        };
      });

      const fname = `${OUT}/${vp.name}-${pg.name}.png`;
      await page.screenshot({ path: fname, fullPage: true });

      issues.push({
        viewport: vp.name,
        page: pg.name,
        ...overflow,
        errs,
      });
      console.log(
        `[${vp.name}] ${pg.name} scroll=${overflow.scrollWidth}/${overflow.clientWidth}` +
          (overflow.horizontalScroll ? " ⚠️ HORIZONTAL OVERFLOW" : "") +
          (errs.length ? ` errs=${errs.length}` : ""),
      );
    } catch (e) {
      issues.push({
        viewport: vp.name,
        page: pg.name,
        error: e.message,
      });
      console.log(`[${vp.name}] ${pg.name} FAILED: ${e.message}`);
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close();

console.log("\n--- detailed ---");
for (const r of issues) {
  if (r.horizontalScroll || (r.errs && r.errs.length) || r.error) {
    console.log(`\n${r.viewport} / ${r.page}`);
    if (r.horizontalScroll) {
      console.log(`  scroll ${r.scrollWidth} > client ${r.clientWidth}`);
      r.offenders.forEach((o) =>
        console.log(`  • ${o.sel} right=${o.right} w=${o.width}`),
      );
    }
    if (r.errs && r.errs.length) r.errs.forEach((e) => console.log("  " + e));
    if (r.error) console.log(`  error: ${r.error}`);
  }
}
