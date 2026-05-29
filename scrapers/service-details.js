const { chromium } = require('playwright');

async function scrapeServiceDetails(url) {

  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForTimeout(5000);

  const data = await page.evaluate(() => {

    return {
      title: document.querySelector('h1')?.innerText,
      text: document.body.innerText
    };
  });

  await browser.close();

  return data;
}

module.exports = scrapeServiceDetails;