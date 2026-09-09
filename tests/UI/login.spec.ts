import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'admin123';

test.use({ storageState: { cookies: [], origins: [] } });


test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });


  test('Valid login @UI @smoke', async ({page}) => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(
    page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });


    test('Invalid login - empty username @UI @smoke', async ({page}) => {
    await loginPage.login('', VALID_PASSWORD);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toHaveText('Required');
});

test('Invalid login - empty password @UI @smoke', async ({page}) => {
    await loginPage.login(VALID_USERNAME, '');
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toHaveText('Required');
  });

  test ('Invalid login - incorrect username @UI @smoke', async ({page}) => {
    await loginPage.login('invalid_user', VALID_PASSWORD);
    await expect(loginPage.errorMessageText).toHaveText('Invalid credentials');
  });

  test('Invalid login - incorrect password @UI @smoke', async ({page}) => {
    await loginPage.login(VALID_USERNAME, 'invalid_password');
    await expect(loginPage.errorMessageText).toHaveText('Invalid credentials');
  });
});
