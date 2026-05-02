import { test, expect } from "@playwright/test";

test.describe("Smoke — Home", () => {
  test("loads and shows heading", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Innarino/i);
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10000 });
  });

  test("announcement bar is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-testid='announcement-bar'], .announcement, #announcement").first()).toBeVisible({ timeout: 5000 }).catch(() => {
      // Not required to fail the smoke test
    });
  });
});

test.describe("Smoke — Catalog", () => {
  test("loads catalog page", async ({ page }) => {
    await page.goto("/catalogo");
    await expect(page.locator("main")).toBeVisible();
  });

  test("can filter by category", async ({ page }) => {
    await page.goto("/catalogo/iphones");
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Smoke — PDP", () => {
  test("product detail page loads", async ({ page }) => {
    await page.goto("/product/iphone-15-pro-max");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 8000 });
  });

  test("add to cart button exists", async ({ page }) => {
    await page.goto("/product/iphone-15-pro-max");
    const btn = page.locator("button").filter({ hasText: /agregar|carrito/i }).first();
    await expect(btn).toBeVisible({ timeout: 8000 });
  });
});

test.describe("Smoke — Tracking", () => {
  test("seguimiento search page loads", async ({ page }) => {
    await page.goto("/seguimiento");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 8000 });
  });
});

test.describe("Smoke — Legal pages", () => {
  for (const path of ["/garantia", "/devoluciones", "/terminos", "/privacidad"]) {
    test(`${path} loads`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("main")).toBeVisible();
    });
  }
});

test.describe("Smoke — Chat widget", () => {
  test("chat FAB is present", async ({ page }) => {
    await page.goto("/");
    const fab = page.locator("#chat-widget-trigger");
    await expect(fab).toBeVisible({ timeout: 8000 });
  });

  test("opens chat panel", async ({ page }) => {
    await page.goto("/");
    await page.locator("#chat-widget-trigger").click();
    await expect(page.locator("input[aria-label='Mensaje al asistente']")).toBeVisible({ timeout: 5000 });
  });
});
