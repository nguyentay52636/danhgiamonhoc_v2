const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Hàm tạo driver
const buildDriver = async (browser = 'chrome') => {
    const options = new chrome.Options();
    
    // Setup Chrome Options
    options.addArguments(
        "--disable-blink-features=AutomationControlled",
        "--disable-web-security",
        "--disable-popup-blocking",
        "--disable-features=IsolateOrigins,site-per-process",
        "--ignore-certificate-errors",
        "--allow-running-insecure-content",
        "--start-maximized"
    );

    // Các tùy chọn bổ sung
    options.set('excludeSwitches', ['enable-automation']);
    options.set('useAutomationExtension', false);

    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build(); // Khởi tạo WebDriver cho Chrome
    return driver;
};

module.exports = { buildDriver };
