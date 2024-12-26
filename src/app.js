// app.js
const express = require('express');
const { Builder, By, Key, until } = require('selenium-webdriver');
const app = express();
const port = 3000;

app.get('/run-selenium', async (req, res) => {
	let driver = await new Builder().forBrowser('chrome').build();

	try {
		// Chạy một số hành động Selenium (ví dụ: tìm kiếm trên Google)
		await driver.get('https://www.google.com');
		let searchBox = await driver.findElement(By.name('q'));
		await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);
		await driver.wait(until.titleContains('Selenium WebDriver'), 10000);

		res.send('Selenium Script Run Completed!');
	} catch (err) {
		console.error(err);
		res.status(500).send('Error occurred!');
	} finally {
		await driver.quit();
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
