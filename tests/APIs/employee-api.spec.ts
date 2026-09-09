import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Employee API', () => {


    test('Create and get a new employee @api @regression', async ({ request }) => {
        const employeeId = String(Date.now()).slice(-8);

        const newEmployeeData = {
            lastName: 'Johnson',
            firstName: 'Testing',
            middleName: 'Smith',
            employeeId: employeeId,
            empPicture: null,
        };

        const response = await request.post(
            'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
                data: newEmployeeData
            }
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.data.employeeId).toBe(newEmployeeData.employeeId);

        const empNumber = body.data.empNumber;

        console.log('Created employee:', body);
        console.log('New employee empNumber:', empNumber);

        const imagePath = path.resolve('./test-data/employee.png');
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        const imageSize = imageBuffer.length;

        const pictureResponse = await request.put(
            `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${empNumber}/picture`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
                data: {
                    empPicture: {
                        name: 'employee.png',
                        type: 'image/png',
                        base64: base64Image,
                        size: imageSize
                    }
                }
            }
        );

        expect(pictureResponse.status()).toBe(200);

        const pictureBody = await pictureResponse.json();
        console.log('Employee picture uploaded successfully:', pictureBody);

        const getResponse = await request.get(`https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${empNumber}`)
        expect (getResponse.status()).toBe(200);

        const getBody = await getResponse.json();
        console.log('Get employee', getBody);

        expect (getBody.data).toBeDefined();
        expect (getBody.data.empNumber).toBe(empNumber);
        expect (getBody.data.employeeId).toBe(employeeId);


        //Update the employee
        const updatedEmployeeData = {
            lastName: 'JohnsonUpdated',
            firstName: 'TestingUpdated',
            middleName: 'SmithUpdated',
        };
         const updateResponse = await request.put(
            `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${empNumber}/personal-details`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
                data: updatedEmployeeData
            }
        );

        console.log('Update employee response:', updateResponse.status());
        console.log('Update employee response body:', await updateResponse.text());
        expect(updateResponse.status()).toBe(200);

        const getUpdatedResponse = await request.get(`https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${empNumber}/personal-details`);
        expect(getUpdatedResponse.status()).toBe(200);

        const getUpdatedBody = await getUpdatedResponse.json();
        console.log('Get updated employee', getUpdatedBody);

        expect(getUpdatedBody.data.firstName).toBe('TestingUpdated');
        expect(getUpdatedBody.data.lastName).toBe('JohnsonUpdated');
        expect(getUpdatedBody.data.middleName).toBe('SmithUpdated');
    

        //Delete the employee
        const deletedEmpployee = 
        {
           "ids": [empNumber]
        }
        const deleteResponse = await request.delete(`https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees`, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            data: deletedEmpployee
        });
        expect(deleteResponse.status()).toBe(200);
      
    });
            
});
