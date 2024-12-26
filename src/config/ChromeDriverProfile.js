const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

// Phương thức mở Chrome với idProfile và URL
const openChrome = async (idProfile, url) => {
    const options = new chrome.Options();
    const userDataDir = path.join(
        '/Users/m1lt43/Library/Application Support/Google/Chrome'
    );

    // Cấu hình Chrome Options
    options.addArguments(`user-data-dir=${userDataDir}`);
    options.addArguments(`profile-directory=Profile ${idProfile}`);
    options.setChromeBinaryPath(
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    );

    let driver;
    try {
        // Tạo WebDriver
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

        // Mở URL
        await driver.get(url);
        console.log(`Trang web "${url}" đã tải thành công trên Profile ${idProfile}:`, await driver.getTitle());
    } catch (error) {
        console.error(`Lỗi xảy ra với Profile ${idProfile} và URL "${url}":`, error);
    } finally {
        if (driver) {
            await driver.quit();
            console.log(`Trình duyệt Profile ${idProfile} đã được đóng.`);
        }
    }
};

// Xuất phương thức
module.exports = { openChrome };
