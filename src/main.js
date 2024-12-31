const { Builder, By, Key, until } = require('selenium-webdriver');
const readline = require('readline');
const numberOfRows = 10;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Hàm hỏi và trả về thông tin nhập vào từ người dùng
function askQuestion(query) {
	return new Promise((resolve) => rl.question(query, resolve));
}

// Hàm chung để tìm phần tử và trả về nó
async function findElementByXpath(driver, xpath) {
	const element = await driver.wait(
		until.elementLocated(By.xpath(xpath)),
		10000,
	);
	return element;
}

// (async function openSelenium() {
// 	const userName = await askQuestion('Nhập tên tài khoản: ');
// 	const password = await askQuestion('Nhập mật khẩu: ');
// 	rl.close();

// 	let driver = await new Builder().forBrowser('chrome').build();

// 	try {
// 		await driver.get('https://thongtindaotao.sgu.edu.vn#/');
// 		// options.addArguments('--force-device-scale-factor=0.5');
// 		// options.addArguments('--start-maximized');  await driver.executeScript('document.body.style.transform = "scale(0.5)"; document.body.style.transformOrigin = "0 0";');

// 		const useNameField = await findElementByXpath(
// 			driver,
// 			'/html/body/app-root/div/div/div[2]/div/div/div/div/div[1]/form/div/div[1]/input',
// 		);

// 		const passWordField = await findElementByXpath(
// 			driver,
// 			'/html/body/app-root/div/div/div[2]/div/div/div/div/div[1]/form/div/div[2]/input',
// 		);

// 		// Nhập thông tin tài khoản và mật khẩu
// 		await useNameField.sendKeys(userName);
// 		await passWordField.sendKeys(password);

// 		// Tìm và nhấn nút đăng nhập
// 		const loginButton = await findElementByXpath(
// 			driver,
// 			'/html/body/app-root/div/div/div[2]/div/div/div/div/div[4]/button',
// 		);
// 		await loginButton.click();
// 		await driver.sleep(3000);

// 		// Chờ trang chuyển hướng thành công
// 		try {
// 			// await driver.wait(until.titleContains('Trang chủ'), 10000);

// 			console.log('Đăng nhập thành công!');

// 			await driver.sleep(4000);

// 			let category = await findElementByXpath(
// 				driver,
// 				'/html/body/app-root/div/div/div/div[1]/div/div/div[2]/app-right/app-chucnang/div/div[2]/ul[7]/li/div[1]',
// 			);
// 			await category.click();
// 			await driver.sleep(3000);
// 			// await getFullRating(driver);
// 			for (let i = 2; i < numberOfRows; i++) {
// 				let xpath = `/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-dgmain/div/div[2]/div/div/table/tbody/tr[2]/td[2]/div/table/tbody/tr[${i}]`;

// 				const getCheckBox = await findElementByXpath(driver, xpath);
// 				await getCheckBox.click();
// 				let rateAgain = await findElementByXpath(
// 					driver,
// 					'/html/body/modal-container/div[2]/div/app-msgbox/div[3]/button[1]',
// 				);
// 				await rateAgain.click();
// 				driver.sleep(3000);

// 				try {
// 					await driver.executeScript(
// 						'document.body.style.transform = "scale(0.5)"; document.body.style.transformOrigin = "0 0";',
// 					);
// 					console.log('Đã thay đổi tỷ lệ trang web.');
// 				} catch (error) {
// 					console.error('Lỗi khi thay đổi tỷ lệ trang web:', error);
// 				}
// 				await driver.sleep(3000);
// 				await callOptionFull(driver);
// 				await driver.sleep(4000);
// 				let textOption = await findElementByXpath(
// 					driver,
// 					'/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[8]/app-child-ksdg-khac/div/div/div/div/div/div/app-kieu-dg-chuoi/div/div/div/textarea',
// 				);
// 				await textOption.sendKeys('Em Không có ý kiến!');
// 				await driver.sleep(4000);
// 				let submit = await findElementByXpath(
// 					driver,
// 					'/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[3]/button[2]',
// 				);

// 				// await driver.executeScript(
// 				// 	'arguments[0].scrollIntoView(true);',
// 				// 	submit,
// 				// );
// 				await driver.sleep(2000);
// 				await submit.click();
// 			}
// 		} catch (loginError) {}
// 	} catch (error) {
// 	} finally {
// 		// await driver.quit();
// 	}
// })();

async function callOptionFull(driver) {
	try {
		console.log('Bắt đầu thực thi callOptionFull...');

		// Vòng lặp cho div[2] TC1
		for (let i = 1; i <= 3; i++) {
			try {
				let xpath = `/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[2]/app-child-ksdg-thangdo/div[3]/div/table/tbody[${i}]/tr/td[7]/input`;
				let inputs = await findElementByXpath(driver, xpath);
				await inputs.click();
				console.log(`Đã click vào div[2], dòng ${i}.`);
			} catch (error) {
				console.error(`Lỗi khi xử lý div[2], dòng ${i}:`, error);
			}
		}

		// Vòng lặp cho div[3] TC2
		for (let i = 1; i <= 3; i++) {
			try {
				let xpath = `/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[3]/app-child-ksdg-thangdo/div[2]/div/table/tbody[${i}]/tr/td[7]/input`;
				let inputs = await findElementByXpath(driver, xpath);
				await inputs.click();
				console.log(`Đã click vào div[3], dòng ${i}.`);
			} catch (error) {
				console.error(`Lỗi khi xử lý div[3], dòng ${i}:`, error);
			}
		}

		// Vòng lặp cho div[4] TC3
		for (let i = 1; i <= 4; i++) {
			try {
				let xpath = `/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[4]/app-child-ksdg-thangdo/div[2]/div/table/tbody[${i}]/tr/td[7]/input`;
				let inputs = await findElementByXpath(driver, xpath);
				await inputs.click();
				console.log(`Đã click vào div[4], dòng ${i}.`);
			} catch (error) {
				console.error(`Lỗi khi xử lý div[4], dòng ${i}:`, error);
			}
		}

		// Vòng lặp cho div[5] TC4
		for (let i = 1; i <= 2; i++) {
			try {
				let xpath = `/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[5]/app-child-ksdg-thangdo/div[2]/div/table/tbody[${i}]/tr/td[7]/input`;

				let inputs = await findElementByXpath(driver, xpath);
				await inputs.click();
				console.log(`Đã click vào div[5], dòng ${i}.`);
			} catch (error) {
				console.error(`Lỗi khi xử lý div[5], dòng ${i}:`, error);
			}
		}

		// Vòng lặp cho div[6]
		for (let i = 1; i <= 6; i++) {
			try {
				let xpath = `/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[6]/app-child-ksdg-thangdo/div[2]/div/table/tbody[${i}]/tr/td[7]/input`;
				let inputs = await findElementByXpath(driver, xpath);
				await inputs.click();
				console.log(`Đã click vào div[6], dòng ${i}.`);
			} catch (error) {
				console.error(`Lỗi khi xử lý div[6], dòng ${i}:`, error);
			}
		}

		// Xử lý phần tử đặc biệt
		try {
			let xpthOne = await findElementByXpath(
				driver,
				'/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-ksdg-cauhoi/div/div[2]/div/div[7]/app-child-ksdg-thangdo/div[2]/div/table/tbody/tr/td[7]/input',
			);
			await xpthOne.click();
			console.log('Đã click vào phần tử đặc biệt trong div[7].');
		} catch (error) {
			console.error('Lỗi khi xử lý phần tử đặc biệt trong div[7]:', error);
		}

		console.log('Hoàn thành callOptionFull.');
	} catch (error) {
		console.error('Lỗi trong callOptionFull:', error);
	}
}

async function checkAndClick(driver) {
	console.log('Starting the checkAndClick process...');

	for (let i = 1; i <= 9; i++) {
		try {
			console.log(`Processing element at index ${i}...`);

			const xpath = `/html/body/app-root/div/div/div/div[1]/div/div/div[2]/app-right/app-chucnang/div/div[2]/ul[${i}]/li/div[1]/a[1]`;

			const element = await findElementByXpath(driver, xpath);

			if (!element) {
				console.log(
					`No element found at index ${i}. Skipping to the next index.`,
				);
				continue;
			}

			const title = await element.getAttribute('title');

			if (title === 'Khảo sát đánh giá') {
				await element.click();
				console.log('Click successful! Exiting the loop.');
				break;
			} else {
				console.log(`Title does not match. Skipping element at index ${i}.`);
			}
		} catch (error) {
			console.error(`Error while processing element at index ${i}:`, error);
		}
	}

	console.log('Completed the checkAndClick process.');
}

module.exports = {
	checkAndClick,
	numberOfRows,
	callOptionFull,
	findElementByXpath,
};
