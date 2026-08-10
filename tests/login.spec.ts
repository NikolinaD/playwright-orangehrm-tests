import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'admin123';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });


  test('Valid login', async ({page}) => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(
    page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });


    test('Invalid login - empty username', async ({page}) => {
    await loginPage.login('', VALID_PASSWORD);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toHaveText('Required');
});

test('Invalid login - empty password', async ({page}) => {
    await loginPage.login(VALID_USERNAME, '');
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toHaveText('Required');
  });

  test ('Invalid login - incorrect username', async ({page}) => {
    await loginPage.login('invalid_user', VALID_PASSWORD);
    await expect(loginPage.errorMessageText).toHaveText('Invalid credentials');
  });

  test('Invalid login - incorrect password', async ({page}) => {
    await loginPage.login(VALID_USERNAME, 'invalid_password');
    await expect(loginPage.errorMessageText).toHaveText('Invalid credentials');
  });
});
