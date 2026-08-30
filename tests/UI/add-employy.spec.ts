import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AddEmployeePage } from '../../pages/AddEmployeePage';

test.describe('Add Employee', () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('Admin', 'admin123');
    });

    test('Add Employee', async ({ page }) => {
        const addEmployeePage = new AddEmployeePage(page);
        const dynamicEmployeeId = Math.floor(10000 + Math.random() * 90000).toString(); 
        await page.getByRole('link', { name: 'PIM' }).click();
        await page.getByRole('link', { name: 'Add Employee' }).click();
        await addEmployeePage.fillEmployeeDetails('John', 'Doe', 'Smith', dynamicEmployeeId);
        await addEmployeePage.fileUpload('test-data/employee.png');
        await addEmployeePage.saveEmployee();

        await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('John');
        await expect(page.getByRole('textbox', { name: 'Middle Name' })).toHaveValue('Doe');
        await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue('Smith');
    

    });
    });