const { Builder, By, Key, until } = require('selenium-webdriver');
const { Actions, Button } = require('selenium-webdriver/lib/input');
const fs = require('fs');
const clipboardy = require('clipboardy'); 
const chrome = require('selenium-webdriver/chrome');
const path = require('path');  // Required for handling paths
const keyList = [];
async function createMeta() {
  const metamaskExtension = './MetaMask_Chrome.crx';
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments('--start-maximized');

  // chromeOptions.addArguments('--headless', '--disable-software-rasterizer');
  chromeOptions.addExtensions(metamaskExtension);
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

  const actions = new Actions(driver);
  try {
    await driver.get(
      'chrome-extension://klckdfagioecjhjhekhgpnpbfdmlkdep/home.html#onboarding/welcome'
    );

    switchtab(1, driver);

    await driver.sleep(3000);
    await switchtab(1, driver);

    await driver.sleep(2000);

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
    await driver.sleep(2000);

    const passwordRD = generateRandomPassword(8);
    const getInputPass1 = await driver.findElement(
      By.xpath(
        '/html/body/div[1]/div/div[2]/div/div/div/div[2]/form/div[1]/label/input'
      )
    );
    await driver.sleep(500);
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

  
    for (let i = 0; i < 12; i++) {
      const key = await driver.findElement(
        By.xpath(
          `/html/body/div[1]/div/div[2]/div/div/div/div[5]/div/div[${
            i + 1
          }]/div[2]`
        )
      );
      // console.log(await key.getText());
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
    
    await driver.sleep(3000);
    await driver.findElement(By.xpath('/html/body/div[3]/div[3]/div/section/div/button[1]')).click()
    await driver.sleep(2000);
    const btnGetContact = await driver.findElement(By.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/button'))
    await btnGetContact.click()
    await driver.sleep(3000);
    const contactClipboard = clipboardy.readSync();
    
    console.log('Dữ liệu từ clipboard:', contactClipboard);
    
    // const contactWallet = await driver
    // .findElement(By.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div/button/span[1]/span'))
    // .getText();


    const outputTxt = `${keyList.join(' ')} | ${passwordRD} | ${contactClipboard}`;
    await fsOutput(outputTxt, 'keyout.txt');

    let accountMetamask = { 
      seedPhrases: keyList.toString().replace(/,/g, ' '),
      password: passwordRD,
      contactWallet: contactClipboard,
    }
    await saveDataToJSON(accountMetamask, 'accountMetamask.json');

    
  } catch (err) {
    console.log(err);
  } finally {
    console.log('done');
  }
}

async function switchtab(tabIndex, driver) {
  try {
    await driver.sleep(2000); // Wait for tabs to load
    const handles = await driver.getAllWindowHandles();
    if (handles.length <= tabIndex) {
      console.error(`Tab index ${tabIndex} is not available. Total tabs: ${handles.length}`);
      return;
    }
    await driver.switchTo().window(handles[tabIndex]);
  } catch (error) {
    throw error;
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

const fsOutput = async (data, filename) => {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      await fs.promises.mkdir(dataDir, { recursive: true });
    }
    await fs.promises.appendFile(filePath, `${data}\n`);
    console.log('Data saved!');
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

async function saveDataToJSON(data, filename) {
  const jsonData = JSON.stringify(data); 
  const filePath = path.join(__dirname, 'data', filename);
  
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true }); 
  }

  try {
    fs.writeFileSync(filePath, jsonData, 'utf8');
    console.log(`Data saved to JSON: ${filePath}`);
  } catch (error) {
    console.error('Error writing to JSON file:', error);
  }
}
// (async () => {
//   const testKeyList = ['word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8', 'word9', 'word10', 'word11', 'word12'];
//   const testPassword = 'Test123!';
//   const testPrivateKey = '0xABCDEF1234567890';
//   const outputTxt = `${testKeyList.join('-')} | ${testPassword} | ${testPrivateKey}`;

//   console.log('Testing fsOuput...');
//   await fsOuput(outputTxt);

//   console.log('Testing saveDataToJSON...');
//   const testAccount = { listkey:testKeyList, seedPhrases: testPrivateKey, password: testPassword };
//   await saveDataToJSON(testAccount, 'testAccount.json');
// })();

createMeta();
