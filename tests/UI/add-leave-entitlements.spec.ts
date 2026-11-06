import {test, expect} from '@playwright/test';
import {LeavePage} from '../../pages/LeavePage';
import {AddEntitlementsPage} from '../../pages/AddEntitlementsPage';



test.describe('Add Leave Entitlement Tests', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });
  let leavePage: LeavePage;
  let addEntitlementsPage: AddEntitlementsPage;

  test.beforeEach(async ({ page }) => {
    leavePage = new LeavePage(page);
    addEntitlementsPage = new AddEntitlementsPage(page);
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveModule');
  });

  test('Add Leave Entitlement for Individual Employee @UI @regression', async ({ page }) => {
    await leavePage.navigateToEntitlementsTab();
    await leavePage.clickAddEntitlementsButton();
    await addEntitlementsPage.enterEmployeeName('Emily  Jones');
    await addEntitlementsPage.enterEntitlement('10');
    await addEntitlementsPage.selectLeaveType('CAN - Bereavement');
    await addEntitlementsPage.selectLeavePeriod('2020-01-01 - 2020-31-12');
    await addEntitlementsPage.clickIndividualEmployeeRadioButton();
    await addEntitlementsPage.clickSaveButton();
    await page.getByRole('button', {name: 'Confirm'}).click(); 

    await expect(page.getByText('Successfully Saved', { exact: true })).toBeVisible();

    });

  test('Add Leave Entitlement for Multiple Employees @UI @regression', async ({ page }) => {        
    await leavePage.navigateToEntitlementsTab();
    await leavePage.clickAddEntitlementsButton();
    await addEntitlementsPage.selectLeaveType('CAN - Bereavement');
    await addEntitlementsPage.selectLeavePeriod('2020-01-01 - 2020-31-12');
    await addEntitlementsPage.enterEntitlement('10');
    await addEntitlementsPage.clickMultipleEmployeesRadioButton();
    await addEntitlementsPage.selectLocation('Texas R&D');
    await addEntitlementsPage.selectSubUnit('Engineering');
    await addEntitlementsPage.clickSaveButton();
    await page.getByRole('button', {name: 'Confirm'}).click();

    const resultMessage = page.getByText(/^Entitlement added to \d+ employees?$/);
    await expect(resultMessage).toBeVisible();

  });   

});