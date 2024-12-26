const { openChrome } = require('../config/ChromeDriverProfile');
const { By,until } = require('selenium-webdriver');
const fs = require('fs');

// Hàm kiểm tra tài khoản
async function checkAccount(email, password, idProfile) {
    const xpathEmail = '/html/body/div[1]/div[1]/div[2]/c-wiz/div/div[2]/div/div/div[1]/form/span/section/div/div/div[1]/div/div[1]/div/div[1]/input';
    const xpathPassword = "/html/body/div[1]/div[1]/div[2]/c-wiz/div/div[2]/div/div/div/form/span/section[2]/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/div[1]/input";
    const xpathNext = '/html/body/div[1]/div[1]/div[2]/c-wiz/div/div[3]/div/div[1]/div/div/button/span';

    let driver;

    try {
        // Mở Chrome với idProfile
        driver = await openChrome(idProfile, 'https://accounts.google.com/');
        
        await driver.manage().setTimeouts({ implicit: 10000 });
        // Nhập email
        const emailField = await driver.findElement(By.xpath(xpathEmail));
        console.log(`Found email field for: ${email}`);
        await emailField.click();
        await emailField.sendKeys(email);
        await driver.sleep(1000);

        // Click nút Tiếp theo
        const continueBtn = await driver.findElement(By.xpath(xpathNext));
        await continueBtn.click();
        console.log('Clicked next button, waiting for password field...');
        await driver.sleep(3000);
        await driver.wait(
            until.elementLocated(
              By.xpath(xpathPassword)
                      
            ),
            10000
          );
        // Nhập password
        const passwordField = await driver.findElement(By.xpath(xpathPassword));
        await passwordField.click();
        await passwordField.sendKeys(password);
        // await driver.sleep(3000);

        console.log(`Email: ${email} - Login successful with Profile ID: ${idProfile}`);
    } catch (error) {
        console.error(`Error checking account: Email: ${email}, Profile ID: ${idProfile}`, error);
    } finally {
        if (driver) {
            await driver.sleep(1000); // Thêm thời gian dừng nếu cần
            await driver.quit();
            console.log(`Browser closed for Profile ID: ${idProfile}`);
        }
    }
}

// Hàm đọc file JSON và kiểm tra từng tài khoản
fs.readFile('../data/emailAccount.json', 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    let accounts;
    try {
        accounts = JSON.parse(data);
    } catch (parseError) {
        console.error('Error parsing the JSON file:', parseError);
        return;
    }

    for (const account of accounts) {
        const { email, password, idProfile } = account;
            if(idProfile) {
        if (email && password) {
            console.log(`Processing account: Email: ${email}, Profile: ${idProfile}`);
            await checkAccount(email, password, idProfile);
            console.log(`Completed processing for Profile: ${idProfile}`);
        } else {
            console.log('Account missing email, password, or idProfile:', account);
        }
    }
}
});
