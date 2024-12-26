require('dotenv').config();
const { Builder, By } = require('selenium-webdriver');
const axios = require('axios');

const TWO_CAPTCHA_API_KEY = process.env.TWO_CAPTCHA_API_KEY;

async function solveReCaptchaWith2Captcha() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        // Bước 1: Mở trang web chứa reCAPTCHA
        const pageUrl = 'https://www.google.com/recaptcha/api2/demo'; // Trang demo reCAPTCHA
        await driver.get(pageUrl);

        // Bước 2: Lấy sitekey từ trang web (data-sitekey)
        const iframe = await driver.findElement(By.css('iframe[title="reCAPTCHA"]'));
        const siteKey = await iframe.getAttribute('src').then((src) => {
            const urlParams = new URLSearchParams(src.split('?')[1]);
            return urlParams.get('k');
        });

        console.log('Sitekey:', siteKey);

        // Bước 3: Gửi yêu cầu đến 2Captcha để giải reCAPTCHA
        const captchaResponse = await axios.get('http://2captcha.com/in.php', {
            params: {
                key: TWO_CAPTCHA_API_KEY,
                method: 'userrecaptcha',
                googlekey: siteKey,
                pageurl: pageUrl,
                json: 1
            }
        });

        if (captchaResponse.data.status !== 1) {
            console.error('Lỗi gửi CAPTCHA:', captchaResponse.data.request);
            return;
        }

        const captchaId = captchaResponse.data.request;
        console.log('Đã gửi CAPTCHA, ID:', captchaId);

        // Bước 4: Kiểm tra kết quả giải CAPTCHA
        let token = null;
        while (!token) {
            console.log('Đang chờ kết quả...');
            const result = await axios.get('http://2captcha.com/res.php', {
                params: {
                    key: TWO_CAPTCHA_API_KEY,
                    action: 'get',
                    id: captchaId,
                    json: 1
                }
            });

            if (result.data.status === 1) {
                token = result.data.request;
                console.log('CAPTCHA giải thành công:', token);
            } else if (result.data.request !== 'CAPCHA_NOT_READY') {
                console.error('Lỗi giải CAPTCHA:', result.data.request);
                return;
            }

            // Đợi 5 giây trước khi kiểm tra lại
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }

        // Bước 5: Chèn token vào reCAPTCHA và gửi form
        await driver.executeScript(`
            document.getElementById("g-recaptcha-response").innerHTML = "${token}";
        `);
        console.log('Token đã được chèn vào reCAPTCHA.');

        // Nhấn nút submit (trong trang demo, không có form thực)
        await driver.findElement(By.id('recaptcha-demo-submit')).click();
        console.log('Hoàn tất reCAPTCHA.');

        // Kiểm tra trạng thái
        await driver.sleep(5000); // Chờ kiểm tra kết quả
    } catch (error) {
        console.error('Lỗi xảy ra:', error.message);
    } finally {
        await driver.quit();
    }
}

solveReCaptchaWith2Captcha();
