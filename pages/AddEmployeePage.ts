import { type Page, type Locator } from '@playwright/test'; 

export class AddEmployeePage {
 readonly page: Page; 
 readonly firstNameInput: Locator; 
 readonly middleNameInput: Locator; 
 readonly lastNameInput: Locator; 
 readonly employeeIdInput: Locator;
 readonly fileUploadInput: Locator;
 readonly saveButton: Locator;


constructor(page: Page) {
    this.page = page; 
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.middleNameInput = page.getByPlaceholder('Middle Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.employeeIdInput = page.getByRole('textbox').nth(4);
    this.fileUploadInput = page.locator('input[type="file"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
}

async fillEmployeeDetails(firstName: string, middleName: string, lastName: string, employeeId: string) {
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.fill(employeeId);
}

async fileUpload(filePath: string) {
   await this.fileUploadInput.setInputFiles(filePath);
}

async saveEmployee() {
    await this.saveButton.click();
}


}
