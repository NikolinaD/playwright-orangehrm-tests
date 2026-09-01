import { test, expect } from '@playwright/test';
import { AddEmployeePage } from '../../pages/AddEmployeePage';

test.describe('Add Employee', () => {
    test.beforeEach(async ({ page }) => {
         await page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList'
    );
    
    });

    test('Add Employee', async ({ page }) => {
        const addEmployeePage = new AddEmployeePage(page);
        const dynamicEmployeeId = Math.floor(10000 + Math.random() * 90000).toString(); 
        await page.getByRole('link', { name: 'PIM' }).click();
        await page.getByRole('link', { name: 'Add Employee' }).click();
        await addEmployeePage.fillEmployeeDetails('John', 'Doe', 'Smith', dynamicEmployeeId);
        await addEmployeePage.fileUpload('test-data/employee.png');
        await addEmployeePage.saveEmployee();

        await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('John');
        await expect(page.getByRole('textbox', { name: 'Middle Name' })).toHaveValue('Doe');
        await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue('Smith');
    

    });
    });