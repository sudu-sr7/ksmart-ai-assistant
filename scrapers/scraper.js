const { chromium } = require('playwright');

async function scrapeServices() {

  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto(
    'https://ksmart.lsgkerala.gov.in'
  );

  await page.waitForTimeout(5000);

  const services = await page.evaluate(() => {

    const links = document.querySelectorAll('a');

    return Array.from(links)
      .filter(link => link.innerText.trim())
      .map(link => ({
        name: link.innerText.trim(),
        url: link.href
      }));
  });

  console.log(services);

  await browser.close();

  return services;
}

module.exports = scrapeServices;