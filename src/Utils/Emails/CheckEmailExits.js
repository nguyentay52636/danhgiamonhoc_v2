const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { buildDriver } = require('../../config/webdriver');

// Hàm kiểm tra tài khoản
async function checkAccount(email, password) {
    const xpathEmail = '/html/body/div[1]/div[1]/div[2]/c-wiz/div/div[2]/div/div/div[1]/form/span/section/div/div/div[1]/div/div[1]/div/div[1]/input';
    const xpathPassword = "/html/body/div[1]/div[1]/div[2]/c-wiz/div/div[2]/div/div/div/form/span/section[2]/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/div[1]/input";
    const xpathNext = '/html/body/div[1]/div[1]/div[2]/c-wiz/div/div[3]/div/div[1]/div/div/button/span';

    const driver = await buildDriver(); 
    try {
        // Truy cập trang đăng nhập (ví dụ Gmail)
        await driver.get('https://accounts.google.com/');

        // Tìm trường nhập email và nhập vào
        const emailField = await driver.findElement(By.xpath(xpathEmail));
        await emailField.click();
        await emailField.sendKeys(email);
        await driver.sleep(1000)
        const continueBtn = await driver.findElement(By.xpath(xpathNext));
        await continueBtn.click();
        await driver.sleep(3000)
        const passwordField = await driver.findElement(By.xpath(xpathPassword));
        await passwordField.click();
        await passwordField.sendKeys(password);
        await driver.sleep(3000)

        console.log('Email and password are correct');
    } catch (error) {
        console.log('Email or password is incorrect');
    } finally {
        await driver.quit(); 
    }
}
const fs = require('fs');

async function runSequentialChecks() {
    const data = fs.readFileSync('../../data/email.json', 'utf8');
    const accounts = JSON.parse(data);

    for (const account of accounts) {
        if (account.email && account.password) {
            console.log(`Checking account: ${account.email}`);
            await checkAccount(account.email, account.password); // Chờ kiểm tra xong trước khi chuyển sang tài khoản khác
        } else {
            console.log('Account missing email or password');
        }
    }
}

runSequentialChecks();
