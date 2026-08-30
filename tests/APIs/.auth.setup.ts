import { test as setup, expect } from '@playwright/test';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.waitForURL('**/dashboard/index');

  // Save session cookies and local storage
  await page.context().storageState({ path: authFile });
});