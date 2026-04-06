import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "phone", size: { width: 390, height: 844 } },
  { name: "tablet", size: { width: 768, height: 1024 } },
] as const;

async function gotoAndSettle(page: Page, path: string) {
  await page.goto(path, { waitUntil: "networkidle" });
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );

  expect(overflow).toBeLessThanOrEqual(1);
}

async function expectFooterFullWidth(page: Page) {
  const footerMetrics = await page.locator("footer").evaluate((element) => {
    const rect = element.getBoundingClientRect();

    return {
      left: rect.left,
      rightGap: window.innerWidth - rect.right,
    };
  });

  expect(footerMetrics.left).toBeLessThanOrEqual(2);
  expect(footerMetrics.rightGap).toBeLessThanOrEqual(2);
}

for (const viewport of viewports) {
  test.describe(`${viewport.name} responsive smoke`, () => {
    test.use({ viewport: viewport.size });

    test("homepage keeps its layout stable and mobile navigation works", async ({ page }) => {
      await gotoAndSettle(page, "/");

      await expectNoHorizontalOverflow(page);
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: /sleep guidance for people who want a better night/i,
        }),
      ).toBeVisible();
      await expect(page.locator("#newsletter")).toBeVisible();
      await expect(page.locator("main img").first()).toBeVisible();

      const menuButton = page.getByRole("button", { name: /open site navigation/i });
      await menuButton.click();

      const navSheet = page.locator('[data-slot="sheet-content"]');
      await expect(navSheet).toBeVisible();

      await navSheet.getByRole("link", { name: "Methodology" }).click();
      await expect(page).toHaveURL(/\/methodology$/);

      await gotoAndSettle(page, "/");
      await menuButton.click();
      await page.locator('[data-slot="sheet-close"]').click();
      await expect(navSheet).toBeHidden();
      await expectFooterFullWidth(page);
    });

    test("empty category state stays compact and footer accordion remains usable", async ({ page }) => {
      await gotoAndSettle(page, "/sleep-products");

      await expectNoHorizontalOverflow(page);
      await expect(page.getByRole("heading", { level: 1, name: "Sleep Products" })).toBeVisible();
      await expect(page.getByRole("link", { name: /request the next topic/i })).toBeVisible();
      await expect(page.locator("main img").first()).toBeVisible();

      const footer = page.locator("footer");
      const footerSections = footer.getByRole("button", { name: "Sections" });
      await footer.scrollIntoViewIfNeeded();
      await expectFooterFullWidth(page);
      await footerSections.click();
      await expect(footerSections).toHaveAttribute("data-state", "open");
    });

    test("article page keeps comparison cards and mobile toc usable", async ({ page }) => {
      await gotoAndSettle(page, "/snoring/best-mouthguards-for-snoring-2025");

      await expectNoHorizontalOverflow(page);
      await expect(
        page.getByRole("heading", { level: 1, name: /best mouthguards for snoring in 2025/i }),
      ).toBeVisible();
      await expect(page.getByRole("link", { name: "View details" }).first()).toBeVisible();
      await expect(page.locator("main img").first()).toBeVisible();

      const mobileToc = page.locator("details").filter({ hasText: "Article guide" }).first();
      await mobileToc.locator("summary").click();
      await expect(page.getByRole("link", { name: "How to decide between them" })).toBeVisible();

      await page.getByRole("heading", { name: /related pages inside the same editorial system/i }).scrollIntoViewIfNeeded();
      await expect(page.locator("main img").nth(1)).toBeVisible();
    });
  });
}
