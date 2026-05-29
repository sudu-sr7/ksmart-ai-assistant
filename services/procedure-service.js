const fs = require('fs');

const path = require('path');

function normalize(text) {

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

function calculateScore(userText, serviceText) {

  if (!serviceText) return 0;

  const userWords =
    normalize(userText).split(' ');

  const serviceWords =
    normalize(serviceText).split(' ');

  let score = 0;

  for (const word of serviceWords) {

    if (userWords.includes(word)) {
      score++;
    }
  }

  return score;
}

function getAllServices() {

  const servicesPath = path.join(
    __dirname,
    '..',
    'services.json'
  );

  return JSON.parse(
    fs.readFileSync(
      servicesPath,
      'utf-8'
    )
  );
}

function findProcedure(userMessage) {

  const services =
    getAllServices();

  let bestMatch = null;

  let highestScore = 0;

  for (const service of services) {

    const score = calculateScore(

      userMessage,

      // IMPORTANT FIX
      service.Service
    );

    if (score > highestScore) {

      highestScore = score;

      bestMatch = service;
    }
  }

  if (bestMatch) {

    console.log(
      'BEST MATCH:',
      bestMatch.Service
    );

    return bestMatch;
  }

  console.log('NO MATCH FOUND');

  return null;
}

module.exports = findProcedure;