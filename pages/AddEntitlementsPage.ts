import {type Locator, type Page} from '@playwright/test';

export class AddEntitlementsPage {
  readonly page: Page;
  readonly employeeNameInput: Locator;
  readonly leaveTypeDropdown: Locator
  readonly leavePeriodDropdown: Locator;
  readonly entitlementInput: Locator;
  readonly individualEmployeeRadioButton: Locator;
  readonly multipleEmployeesRadioButton: Locator;
  readonly Location: Locator;
  readonly subUnit: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeNameInput = page.getByPlaceholder('Type for hints...');
    this.leaveTypeDropdown = page.getByRole('combobox', { name: 'Leave Type' });
    this.leavePeriodDropdown = page.getByRole('combobox', { name: 'Leave Period' });
    this.entitlementInput = page.locator("//label[normalize-space()='Entitlement']/following::input[1]")
    this.individualEmployeeRadioButton = page.locator('//label[text()="Individual Employee"]');
    this.multipleEmployeesRadioButton = page.locator('//label[text()="Multiple Employees"]');
    this.Location = page.getByRole('combobox', { name: 'Location' });
    this.subUnit = page.getByRole('combobox', { name: 'Sub Unit' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async enterEmployeeName(employeeName: string) {
    const employeeNameInput = this.employeeNameInput;
    await employeeNameInput.fill(employeeName);
    await this.page.getByRole('option', { name: employeeName }).click();

  }

  async selectLeaveType(leaveType: string) {
    const leaveTypeDropdown = this.page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Leave Type' })
    .locator('.oxd-select-text');

    await leaveTypeDropdown.click();

    await this.page
      .locator('.oxd-select-option')
      .filter({ hasText: leaveType })
      .click(); 
  }

  async selectLeavePeriod(leavePeriod: string) {
    const leavePeriodDropdown = this.page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Leave Period' })
    .locator('.oxd-select-text');

    await leavePeriodDropdown.click();

    await this.page
      .locator('.oxd-select-option')
      .filter({ hasText: leavePeriod })
      .click();
  }

  async enterEntitlement(entitlement: string) {
    await this.entitlementInput.fill(entitlement);
  }

  async clickIndividualEmployeeRadioButton() {
    await this.individualEmployeeRadioButton.click();
  }

  async clickMultipleEmployeesRadioButton() {
    await this.multipleEmployeesRadioButton.click();
  }

  async selectLocation(location: string) {
    const locationDropdown = this.page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Location' })
    .locator('.oxd-select-text');

    await locationDropdown.click();
   
   const options = this.page.locator('.oxd-select-option');
        
  }

  async selectSubUnit(subUnit: string) {
    const subUnitDropdown = this.page
    .locator('.oxd-input-group')
    .filter({ hasText: 'Sub Unit' })
    .locator('.oxd-select-text'); 

    await subUnitDropdown.click();

    await this.page
      .locator('.oxd-select-option')
      .filter({ hasText: subUnit })
      .click();
  }

  async clickSaveButton() {
    await this.saveButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }
}