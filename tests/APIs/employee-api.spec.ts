import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.use({ storageState: '.auth/user.json' });

test.describe('Employee API', () => {

    test('GET all employees in directory', async ({ request }) => {
        const response = await request.get(
            'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees',
            {
                params: {
                    limit: 0,
                    offset: 0
                }
            }
        
        );

        expect(response.status()).toBe(200);
        const body = await response.json();
        const totalEmployees = body.meta.total;
        expect(body.data.length).toBe(totalEmployees);
        console.log(`Total employees in directory: ${totalEmployees}`);

    // });

    test('GET employee by Emp Number', async ({ request }) => {
        const empNumber = 195; 
        const response = await request.get(
          
          `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/${empNumber}`,
        );
        // expect(response.status()).toBe(200);
        const body = await response.json();
        console.log(body);
        expect(body.data).toBeDefined();
        expect(body.data.empNumber).toBe(empNumber);
        console.log(`Employee details for empNumber ${empNumber}:`, body.data);
    })

    test('Create a new employee', async ({ request }) => {
        const employeeId = String(Date.now()).slice(-8);
    
        const newEmployeeData = {
            lastName: "Johnson",
            firstName: "Testing",
            middleName: "Smith",
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
        
        // await expect(response.status()).toBe(200);
        const body = await response.json();
        await expect(body.data.employeeId).toBe(newEmployeeData.employeeId);
        const empNumber = body.data.empNumber;
        console.log('STATUS:', response.status());
        console.log('STATUS TEXT:', response.statusText());
        console.log('HEADERS:', await response.headers());
        console.log('BODY:', await response.text());
        console.log('New employee created with empNumber:', empNumber);


        const impagePath = path.resolve('./test-data/employee.png');
        const imageBuffer = fs.readFileSync(impagePath);
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
                    empPicture: 
                    {
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
    });
});