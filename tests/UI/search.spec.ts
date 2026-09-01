import { test, expect } from '@playwright/test';

test.describe('Menu Search', () => {
  test.beforeEach(async ({ page }) => {
         await page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
    );
  });

  test('Search by name', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/);
    const menuSearch = page.getByPlaceholder('Search');
    await menuSearch.fill('Leave');
    await expect(
      page.locator('.oxd-main-menu-item--name')
    ).toHaveText('Leave');
  });

    test('Search by name and click', async ({ page }) => {
    
    await expect(page).toHaveURL(/dashboard/);
    const menuSearch = page.getByPlaceholder('Search');
    await menuSearch.fill('PIM');
    const menuItem = page.locator('.oxd-main-menu-item--name');
    await expect(menuItem).toHaveText('PIM');
    menuItem.click();
    await expect(page).toHaveURL(/pim\/viewEmployeeList/);
  });

});