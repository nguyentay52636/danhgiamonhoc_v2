const { Builder, By, Key } = require('selenium-webdriver');
const { Actions, Button } = require('selenium-webdriver/lib/input');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

// MetaMask seed phrases and password
const MNEMONIC =
  'security curve swallow few tilt attract donor tuition matter place spoon major'.split(
    ' '
  );
const PASSWORD = 'Tay52636';

(async function createMetaMaskWallet() {
  // Thiết lập tùy chọn cho trình duyệt Chrome và tiện ích mở rộng
  const extensionPath = './MetaMask_Chrome.crx';

  // Thiết lập tùy chọn cho trình duyệt Chrome
  const chromeOptions = new chrome.Options();
  chromeOptions.addExtensions(extensionPath);

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

  const actions = new Actions(driver);
  try {
    await driver.get(
      'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html'
    );
    switchTab(1, driver);

    // Wait for MetaMask extension to load (you may need to adjust the waiting time)
    await driver.sleep(5000);
    // Fix "Message: unknown error: Runtime.callFunctionOn threw exception: Error: LavaMoat"
    // Wait for elements and click them as needed
    await driver
      .findElement(
        By.className('check-box onboarding__terms-checkbox far fa-square')
      )
      .click(); // Agree to TOS

    await driver.sleep(500);
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/ul/li[3]/button')
      )
      .click(); // Import
    await driver.sleep(500);
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div/button[2]')
      )
      .click(); // No thanks
    await driver.sleep(500);

    // Locate mnemonic box and input seed phrases
    // for (const word of MNEMONIC) {
    //   for (let i = 0; i < 12; i++) {
    //     await driver
    //       .findElement(By.id(`import-srp__srp-word-${i}`))
    //       .sendKeys(word);
    //   }
    // }
    for (let i = 0; i < 12; i++) {
      await driver
        .findElement(By.id(`import-srp__srp-word-${i}`))
        .sendKeys(MNEMONIC[i]);
    }
    await driver.sleep(500);

    // Confirm and enter password
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div[4]/div/button')
      )
      .click(); // Confirm
    await driver
      .findElement(
        By.xpath(
          '/html/body/div[1]/div/div[2]/div/div/div/div[2]/form/div[1]/label/input'
        )
      )
      .sendKeys(PASSWORD); // Enter password
    await driver
      .findElement(
        By.xpath(
          '/html/body/div[1]/div/div[2]/div/div/div/div[2]/form/div[2]/label/input'
        )
      )
      .sendKeys(PASSWORD); // Enter password twice
    await driver.sleep(500);
    await driver
      .findElement(
        By.xpath(
          '/html/body/div[1]/div/div[2]/div/div/div/div[2]/form/div[3]/label/input'
        )
      )
      .click(); // I understand
    await driver
      .findElement(
        By.xpath(
          '//*[@id="app-content"]/div/div[2]/div/div/div/div[2]/form/button'
        )
      )
      .click(); // Import my wallet
    await driver.sleep(500);

    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div[2]/button')
      )
      .click(); // Got it
    await driver.sleep(500);

    const buttonNext = await driver.findElement(
      By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div[2]/button')
    );
    await buttonNext.click(); // Next page
    await driver.sleep(1000);

    // await driver
    //   .findElement(
    //     By.xpath('/html/body/div[1]/div/div/2]/div/div/div/div[2]/button')
    //   )
    //   .click();
    await buttonNext.click(); // Done
    await driver.sleep(1000);

    // Close the MetaMask extension popup
    await driver
      .findElement(
        By.xpath('/html/body/div[2]/div/div/section/div[1]/div/button/span')
      )
      .click();

    // Capture private key and seed phrases
    await driver.sleep(1000);
    const menuPopUp = await driver.findElement(
      By.className(
        'mm-box mm-button-icon mm-button-icon--size-sm mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-icon-default mm-box--background-color-transparent mm-box--rounded-lg'
      )
    );
    await menuPopUp.click();
    await driver
      .findElement(By.xpath('//*[@id="popover-content"]/div[2]/button[1]'))
      .click();
    await driver
      .findElement(
        By.xpath('/html/body/div[3]/div[3]/div/section/div[2]/button')
      )
      .click();
    await driver
      .findElement(By.xpath('//*[@id="account-details-authenticate"]'))
      .sendKeys(PASSWORD);
    await driver
      .findElement(
        By.xpath('/html/body/div[3]/div[3]/div/section/div[5]/button[2]')
      )
      .click();
    await driver.sleep(1000);
    const holdToPrivateKey = await driver.findElement(
      By.xpath('/html/body/div[3]/div[3]/div/section/div[2]/button')
    );
    await actions
      .move({ x: 0, y: 0, duration: 0 }) // Di chuyển chuột đến tọa độ (0, 0) để đảm bảo không có trạng thái trước đó
      .move({ origin: holdToPrivateKey }) // Di chuyển chuột đến phần tử cụ thể
      .press(Button.LEFT) // Nhấn chuột trái
      .pause(2000) // Giữ chuột trong 2 giây (hoặc thời gian bạn mong muốn)
      .release(Button.LEFT) // Thả chuột
      .perform(); // Thực hiện chuỗi hành động
    // const privateKeys = await privateKeysElement.getText();

    const privateKeys = await driver
      .findElement(By.xpath('/html/body/div[3]/div[3]/div/section/div[3]/p'))
      .getText();
    await driver
      .findElement(By.xpath('/html/body/div[3]/div[3]/div/section/button'))
      .click();
    // await driver.sleep(1000);

    // const seedPhrasesElement = await driver.findElement(
    //   By.xpath('//div[contains text(), "Seed Phrase")]/following-sibling::div')
    // );
    const seedPhrases = await MNEMONIC.join(' ');

    // Save private key and seed phrases to a file
    const dataToWrite = `Private Key: ${privateKeys}\nSeed Phrases: ${seedPhrases}`;
    output(dataToWrite + '\n', 'outputmeta.txt');
    console.log('MetaMask wallet created and configured successfully.');
  } finally {
    // Close the browser window
    await driver.quit();
  }
})();
async function switchTab(index, driver) {
  const windowHandles = await driver.getAllWindowHandles();
  await driver.switchTo().window(windowHandles[index]);
}
function output(data, fileName) {
  const fs = require('fs'); // Module hệ thống tệp

  // Tên tệp bạn muốn thêm dữ liệu vào
  //   const fileName = 'output.txt';

  // Sử dụng phương thức appendFile để thêm nội dung vào tệp
  fs.appendFile(fileName, data, (err) => {
    if (err) {
      console.error('Lỗi khi thêm dữ liệu vào tệp:', err);
    } else {
      console.log(`Đã thêm thành công dữ liệu vào tệp ${fileName}`);
    }
  });
}
