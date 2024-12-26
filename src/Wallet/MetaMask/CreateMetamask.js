const { Builder, By, Key, until } = require('selenium-webdriver');
const { Actions, Button } = require('selenium-webdriver/lib/input');

const fs = require('fs');
const chrome = require('selenium-webdriver/chrome');

async function createMeta() {
  const metamaskExtension = './MetaMask_Chrome.crx';
  const chromeOptions = new chrome.Options();
  ;chromeOptions.addArguments('--start-maximized');
    // chromeOptions.addArguments('--headless', '--disable-software-rasterizer');
  chromeOptions.addExtensions(metamaskExtension);
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();
    // await driver.sleep(3000);
  const actions = new Actions(driver);
  try {
    await driver.get(
      'chrome-extension://klckdfagioecjhjhekhgpnpbfdmlkdep/home.html#onboarding/welcome'
    );

    switchtab(1, driver);

    await driver.sleep(3000);
    // await driver.wait(
    //   until.elementLocated(
    //     By.xpath('/html/body/div[1]/div/div[2]/div/div/div/ul/li[1]/div/input')
                
    //   ),
    //   10000
    // );

    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/ul/li[1]/div/input')
      )
      .click();
    await driver.sleep(500);
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/ul/li[2]/button')
      )
      .click();
    await driver.sleep(500);
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div/button[1]')
      )
      .click();
    //
    const passwordRD = generateRandomPassword(8);
    const getInputPass1 = await driver.findElement(
      By.xpath(
        '/html/body/div[1]/div/div[2]/div/div/div/div[2]/form/div[1]/label/input'
      )
    );
    getInputPass1.click();
    getInputPass1.sendKeys(passwordRD);
    const getInputPass2 = await driver.findElement(
      By.xpath(
        '/html/body/div[1]/div/div[2]/div/div/div/div[2]/form/div[2]/label/input'
      )
    );
    getInputPass2.click();
    getInputPass2.sendKeys(passwordRD);
    await driver
      .findElement(
        By.xpath(
          '/html/body/div[1]/div/div[2]/div/div/div/div[2]/form/div[3]/label/input'
        )
      )
      .click();
    await driver.sleep(500);
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div[2]/form/button')
      )
      .click();
    await driver.sleep(1000);
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div[2]/button[2]')
      )
      .click();
    await driver.sleep(500);
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div[6]/button')
      )
      .click();
    const keyList = [];
    for (let i = 0; i < 12; i++) {
      const key = await driver.findElement(
        By.xpath(
          `/html/body/div[1]/div/div[2]/div/div/div/div[5]/div/div[${
            i + 1
          }]/div[2]`
        )
      );
      keyList.push(await key.getText());
    }
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div[6]/div/button')
      )
      .click();
    await driver.sleep(1000);
    for (let i = 0; i < 12; i++) {
      const keyInput = await driver.findElement(
        By.xpath(
          `/html/body/div[1]/div/div[2]/div/div/div/div[4]/div/div[${
            i + 1
          }]/div[2]`
        )
      );
      if ((await keyInput.getText()) == '') {
        const inputKey = await driver.findElement(
          By.xpath(
            `/html/body/div[1]/div/div[2]/div/div/div/div[4]/div/div[${
              i + 1
            }]/div[2]/input`
          )
        );
        await inputKey.sendKeys(keyList[i]);
      }
      // console.log(await keyInput.getText());
    }
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div[5]/button')
      )
      .click();
    await driver.sleep(100);
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div[2]/button')
      )
      .click();
    await driver.sleep(100);
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div[2]/button')
      )
      .click();
    await driver.sleep(100);
    await driver
      .findElement(
        By.xpath('/html/body/div[1]/div/div[2]/div/div/div/div[2]/button')
      )
      .click();
    await driver.sleep(100);
    await driver
      .findElement(
        By.xpath('/html/body/div[2]/div/div/section/div[2]/div/div[1]/button')
      )
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('/html/body/div[3]/div[3]/div/section/div[1]/div[2]/button')
      )
    );
    // Close the MetaMask extension popup
    await driver
      .findElement(
        By.xpath('/html/body/div[3]/div[3]/div/section/div[1]/div[2]/button')
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
      .sendKeys(passwordRD);
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

    const outputTxt = `${keyList.join('-')} | ${passwordRD} | ${privateKeys}`;
    await fsOuput(`${outputTxt}\n`);
  } catch (err) {
    console.log(err);
    // await driver.quit();
  } finally {
    console.log('done');
    // await driver.quit();
  }
}

// async function switchtab(tabIndex, driver) {
// 	const savetab = await driver.getAllWindowHandles();
// 	await driver.switchTo().window(savetab[tabIndex]);  }
async function switchtab(tabIndex, driver) {
  const savetab = await driver.getAllWindowHandles();
  console.log(savetab); 
  if (tabIndex >= 0 && tabIndex < savetab.length) {
    await driver.switchTo().window(savetab[tabIndex]); // Lựa chọn tab theo index
  } else {
    console.error("Tab index is out of range");
  }
}

function generateRandomPassword(length) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function fsOuput(data) {
  fs.appendFile('keyout.txt', data, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('done');
    }
  });
}

createMeta();
