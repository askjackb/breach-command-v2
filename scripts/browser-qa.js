import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl"],
});
const errors = [];
for (const [name, width, height] of [
  ["desktop", 1440, 900],
  ["portrait", 393, 852],
  ["landscape", 852, 393],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    isMobile: name !== "desktop",
    hasTouch: name !== "desktop",
  });
  page.on("pageerror", (e) => errors.push(name + ": " + e.message));
  await page.goto("http://localhost:5174");
  await page.locator("#start").click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `artifacts/${name}.png` });
  const state = await page.evaluate(() => window.breach.state);
  if (state.structures !== 3) throw Error("Initial structures missing");
  await page.getByRole("button", { name: "Mining rig" }).click();
  const point = await page.evaluate(() => window.breach.project(8.23, 0));
  await page.locator("#world").click({ position: point });
  await page.getByRole("button", { name: "Construct", exact: true }).click();
  await page.waitForTimeout(500);
  const built = await page.evaluate(() => window.breach.state.structures);
  if (built !== 4) throw Error("Construction did not create mine: " + built);
  await page.getByRole("button", { name: "Signals", exact: true }).click();
  await page.getByRole("button", { name: "Overdrive", exact: true }).click();
  await page.getByRole("button", { name: "Commander", exact: true }).click();
  await page.locator("#tree").waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Commander", exact: true }).click();
  await page.screenshot({ path: `artifacts/${name}.png` });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  if (overflow) throw Error(name + " horizontal overflow");
  console.log(name, JSON.stringify(state));
  await page.close();
}
await browser.close();
if (errors.length) throw Error(errors.join("\n"));
console.log("Browser QA passed without page errors");
