import {type Locator, type Page} from '@playwright/test';

export class LeavePage {
  readonly page: Page;
  readonly applyTab: Locator;
  readonly myLeaveTab: Locator;
  readonly entitlementsTab: Locator;
  readonly reportsTab: Locator;
  readonly configureTab: Locator;
  readonly leaveListTab: Locator;
  readonly assignLeaveTab: Locator;
  readonly addEntitlementsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.applyTab = page.getByRole('link', {name: 'Apply'});
    this.myLeaveTab = page.getByRole('link', {name: 'My Leave'});
    this.entitlementsTab = page.locator("//span[normalize-space()='Entitlements']");
    this.reportsTab = page.getByRole('link', {name: 'Reports'});
    this.configureTab = page.getByRole('link', {name: 'Configure'});
    this.leaveListTab = page.getByRole('link', {name: 'Leave List'});
    this.assignLeaveTab = page.getByRole('link', {name: 'Assign Leave'});
    this.addEntitlementsButton = page.getByRole('menuitem', {name: 'Add Entitlements'});
  }

  async navigateToApplyTab() {
    await this.applyTab.click();
  }

  async navigateToMyLeaveTab() {
    await this.myLeaveTab.click();
  } 

  async navigateToEntitlementsTab() {
    await this.entitlementsTab.click();
  }

  async clickAddEntitlementsButton() {
    await this.addEntitlementsButton.click();
  }

  async navigateToReportsTab() {
    await this.reportsTab.click();
  }

  async navigateToConfigureTab() {
    await this.configureTab.click();
  }

  async navigateToLeaveListTab() {
    await this.leaveListTab.click();
  }

    async navigateToAssignLeaveTab() {
    await this.assignLeaveTab.click();
  }

}