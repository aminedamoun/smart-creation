import { chromium } from "playwright";

const pages = ["/", "/about", "/business-centers/smart-founders", "/contact"];
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

for (const url of pages) {
  const page = await ctx.newPage();
  await page.goto(`http://localhost:3000${url}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const result = await page.evaluate(() => {
    const docW = document.documentElement.clientWidth;
    const out = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      // We only care about ROOT offenders: elements wider than viewport whose
      // parent is NOT also wider than viewport. That isolates the culprit.
      if (r.right > docW + 1 && r.width < docW * 2.5) {
        const parent = el.parentElement;
        const pr = parent ? parent.getBoundingClientRect() : null;
        const parentOverflows = pr ? pr.right > docW + 1 : false;
        if (!parentOverflows) {
          const tag = el.tagName.toLowerCase();
          const id = el.id ? `#${el.id}` : "";
          const cls = (typeof el.className === "string" ? el.className : "")
            .split(" ")
            .filter(Boolean)
            .slice(0, 4)
            .join(".");
          out.push({
            sel: `${tag}${id}${cls ? "." + cls : ""}`,
            right: Math.round(r.right),
            left: Math.round(r.left),
            width: Math.round(r.width),
          });
        }
      }
    });
    return { docW, offenders: out };
  });

  console.log(`\n${url}  viewport=${result.docW}`);
  for (const o of result.offenders) {
    console.log(`  [${o.left} → ${o.right}, w=${o.width}]  ${o.sel}`);
  }
  await page.close();
}
await ctx.close();
await browser.close();
