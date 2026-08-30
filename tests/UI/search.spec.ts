import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Menu Search', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

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