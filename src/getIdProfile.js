const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

async function openHandle(profileId) {
    const options = new chrome.Options();

    // Đường dẫn thư mục profile của Chrome (user-data-dir)
    const userDataDir = path.join(
        '/Users/m1lt43/Library/Application Support/Google/Chrome'
    );
    options.addArguments(`user-data-dir=${userDataDir}`);
    options.addArguments(`profile-directory=Profile ${profileId}`);

    // Các tùy chọn bổ sung để tránh lỗi trên hệ điều hành macOS
    options.addArguments('--no-sandbox'); // Chạy trong chế độ an toàn
    options.addArguments('--disable-dev-shm-usage'); // Giải phóng bộ nhớ dùng chung
    options.addArguments('--disable-gpu'); // Tắt GPU (nếu không cần thiết)
    options.addArguments('--disable-software-rasterizer'); // Vô hiệu hóa phần mềm Rasterizer
    options.addArguments('--remote-debugging-port=9222'); // Cổng gỡ lỗi từ xa
    // options.addArguments('--headless'); // Chế độ không giao diện (tùy chỉnh khi kiểm tra)

    // Đường dẫn tới Chrome (nếu cần chỉ định)
    options.setChromeBinaryPath('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');


    // Khởi tạo WebDriver
    let driver;
    try {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        console.log('ChromeDriver đã được khởi động thành công.');

        // Điều hướng tới Google
        await driver.get('https://google.com');
        console.log('Trang web đã tải thành công:', await driver.getTitle());
    } catch (error) {
        console.error(
            'Lỗi xảy ra trong quá trình khởi chạy hoặc điều hướng:',
            error.message
        );
        console.error('Chi tiết lỗi:', error.stack);  // In ra stack trace để dễ dàng debug
    } finally {
        // Đóng trình duyệt sau khi hoàn thành
        if (driver) {
            // await driver.quit();
            // console.log('Trình duyệt đã được đóng.');
        }
    }
}

// Gọi hàm với ID của profile
openHandle('112').catch((err) =>
    console.error('Lỗi ngoài ý muốn khi chạy hàm openHandle:', err)
);
