import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'admin123';
const menuButton = '//span[@class="oxd-userdropdown-tab"]';
const logoutButton = '//a[text()="Logout"]';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Logout', async ({ page }) => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
    await page.locator(menuButton).click();
    await page.locator(logoutButton).click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  });
});