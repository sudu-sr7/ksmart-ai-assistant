function detectIntent(message) {

  const text = message.toLowerCase();

  const keywords = [
    'birth',
    'death',
    'marriage',
    'certificate',
    'registration',
    'apply',
    'document',
    'fees',
    'correction',
    'download'
  ];

  const matched = keywords.some(word =>
    text.includes(word)
  );

  return matched
    ? 'service_query'
    : 'unknown';
}

module.exports = detectIntent;