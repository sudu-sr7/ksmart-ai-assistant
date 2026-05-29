function extractFees(text) {

  const feeRegex = /₹\s?\d+/g;

  const matches = text.match(feeRegex);

  return matches ? matches[0] : 'Unknown';
}

function extractTimeline(text) {

  const timelineRegex =
    /(\d+\s?(working days|days))/i;

  const match = text.match(timelineRegex);

  return match ? match[0] : 'Unknown';
}

function extractDocuments(text) {

  const possibleDocs = [
    'Aadhaar',
    'Address Proof',
    'Witness',
    'Birth Certificate',
    'Marriage Proof',
    'ID Proof',
    'Passport',
    'Ration Card'
  ];

  return possibleDocs.filter(doc =>
    text.toLowerCase().includes(
      doc.toLowerCase()
    )
  );
}

function extractPortal(text) {

  const urlRegex =
    /(https?:\/\/[^\s]+)/g;

  const matches = text.match(urlRegex);

  return matches ? matches[0] : 'Unknown';
}

function parseServiceData(rawText) {

  return {
    documents: extractDocuments(rawText),
    fees: extractFees(rawText),
    timeline: extractTimeline(rawText),
    portal: extractPortal(rawText)
  };
}

module.exports = parseServiceData;