const express = require('express');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const {
	checkAndClick,
	callOptionFull,
	findElementByXpath,
	numberOfRows,
} = require('/Users/m1lt43/Desktop/autoDanhGiaGiangVien/AutoReviewer/src/main.js');
const app = express();
const port = 3000;

// Hàm thực hiện đăng nhập và thao tác trên trang
async function rateSelenium(username, password) {
	// Configure Chrome options for headless mode
	const options = new chrome.Options();
	options.addArguments('--headless');
	options.addArguments('--disable-gpu');
	options.addArguments('--no-sandbox');
	options.addArguments('--disable-dev-shm-usage');

	let driver = await new Builder()
		.forBrowser('chrome')
		.setChromeOptions(options)
		.build();

	try {
		await driver.get('https://thongtindaotao.sgu.edu.vn#/');

		const useNameField = await findElementByXpath(
			driver,
			'/html/body/app-root/div/div/div[2]/div/div/div/div/div[1]/form/div/div[1]/input',
		);

		const passWordField = await findElementByXpath(
			driver,
			'/html/body/app-root/div/div/div[2]/div/div/div/div/div[1]/form/div/div[2]/input',
		);

		// Nhập thông tin tài khoản và mật khẩu
		await useNameField.sendKeys(username);
		await passWordField.sendKeys(password);

		// Tìm và nhấn nút đăng nhập
		const loginButton = await findElementByXpath(
			driver,
			'/html/body/app-root/div/div/div[2]/div/div/div/div/div[4]/button',
		);
		await loginButton.click();
		await driver.sleep(3000);
		try {
			console.log('Đăng nhập thành công!');

			await driver.sleep(4000);

			await checkAndClick(driver);
			await driver.sleep(4000);
			for (let i = 2; i < numberOfRows; i++) {
				let xpath = `/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-dgmain/div/div[2]/div/div/table/tbody/tr[2]/td[2]/div/table/tbody/tr[${i}]`;

				const getCheckBox = await findElementByXpath(driver, xpath);
				await getCheckBox.click();
				let checkModal = await findElementByXpath(
					driver,
					'/html/body/modal-container/div[2]/div',
				);
				if (checkModal) {
					let indenfity = await findElementByXpath(
						driver,
						'/html/body/modal-container/div[2]/div/app-msgbox/div[3]/button[1]',
					);
					await indenfity.click();
					driver.sleep(3000);
					await callCode(driver);
					driver.sleep(3000);
				} else {
					await callCode(driver);
					driver.sleep(3000);
				}

				// let rateAgain = await findElementByXpath(
				// 	driver,
				// 	'/html/body/modal-container/div[2]/div/app-msgbox/div[3]/button[1]',
				// );
				// await rateAgain.click();
			}

			// Định nghĩa route cho việc đăng nhập

			async function callCode(driver) {
				try {
					await driver.executeScript(
						'document.body.style.transform = "scale(0.5)"; document.body.style.transformOrigin = "0 0";',
					);
					console.log('Đã thay đổi tỷ lệ trang web.');
				} catch (error) {
					console.error('Lỗi khi thay đổi tỷ lệ trang web:', error);
				}
				await driver.sleep(3000);
				await callOptionFull(driver);
				await driver.sleep(4000);
				let textOption = await findElementByXpath(
					driver,
					'/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[8]/app-child-ksdg-khac/div/div/div/div/div/div/app-kieu-dg-chuoi/div/div/div/textarea',
				);
				let currentvalue = await textOption.getAttribute('value');
				if (!currentvalue || currentvalue.trim() == '') {
					await textOption.sendKeys('Em Không có ý kiến!');
				}

				await driver.sleep(2000);
				let submit = await findElementByXpath(
					driver,
					'/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[3]/button[2]',
				);

				// await driver.executeScript(
				// 	'arguments[0].scrollIntoView(true);',
				// 	submit,
				// );
				await driver.sleep(2000);
				await submit.click();
			}
		} catch (loginError) {}
	} catch (error) {
	} finally {
		// await driver.quit();
	}
}
app.get('/run-selenium/:username/:password', async (req, res) => {
	const { username, password } = req.params;

	try {
		await rateSelenium(username, password);
		res.send('Đã thực hiện thao tác với Selenium thành công!');
	} catch (error) {
		res.status(500).send('Đã xảy ra lỗi khi thực hiện thao tác!');
	}
});

// Khởi động server
app.listen(port, () => {
	console.log(`Server đang chạy tại http://localhost:${port}`);
});
