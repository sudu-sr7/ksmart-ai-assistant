const scrapeServices =
  require('./scraper');

const scrapeServiceDetails =
  require('./service-details');

const parseServiceData =
  require('./parser');

const saveJSON =
  require('../utils/save-json');

async function main() {

  const services =
    await scrapeServices();

  for (const service of services.slice(0, 5)) {

    try {

      console.log(
        `Scraping ${service.name}`
      );

      const rawData =
        await scrapeServiceDetails(
          service.url
        );

      const parsed =
        parseServiceData(rawData.text);

      const finalData = {
        service: service.name,
        portal: service.url,
        rawText: rawData.text,
        ...parsed
      };

      saveJSON(
        service.name,
        finalData
      );

    } catch (error) {

      console.error(error);
    }
  }
}

main();