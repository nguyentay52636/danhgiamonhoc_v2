const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

// const chromeDriverPath = '/opt/homebrew/bin/chromedriver'; // Đảm bảo đường dẫn đúng
const ListIdChrome = [
    "23",
    "24",
    "25",
    "26",
    "27",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37"
  ];
  
async function openHandle(profileId) {
    const options = new chrome.Options();
    const userDataDir = path.join(
        '/Users/m1lt43/Library/Application Support/Google/Chrome'
    );
    options.addArguments(`user-data-dir=${userDataDir}`);
    options.addArguments(`profile-directory=Profile ${profileId}`);
    // options.addArguments("--no-sandbox");
    // options.addArguments("--disable-dev-shm-usage");
    // options.addArguments("--remote-debugging-port=9222");

    options.setChromeBinaryPath(
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    );;
    let  driver;
    try {
         driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();  // Bỏ qua ChromeService
        await driver.get('https://google.com');
        console.log('Trang web đã tải thành công:', await driver.getTitle());
    } catch (error) {
        console.error('Lỗi xảy ra trong quá trình khởi chạy hoặc điều hướng:', error);
    } finally {
        if (driver) {
            await driver.quit();
            console.log('Trình duyệt đã được đóng.');
        }
    }
}

async function runSequentially() {
    for (const id of ListIdChrome) {
        console.log(`Đang mở profile với ID: ${id}`);
        await openHandle(id);
        console.log(`Hoàn thành mở profile với ID: ${id}`);
    }
}
runSequentially().catch((err) =>
    console.error('Lỗi ngoài ý muốn khi chạy chương trình:', err)
);