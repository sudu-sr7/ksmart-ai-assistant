const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function askAI(
  userMessage,
  procedureData
) {

  const serviceName =
    procedureData?.Service ||
    'Unknown Service';

  const category =
    procedureData?.Category ||
    'General';

  const module =
    procedureData?.Module ||
    'Government Service';

  const prompt = `
You are an official Kerala KSMART AI Assistant.

Official Portal:
https://ksmart.lsgkerala.gov.in

Service Details:

Service:
${serviceName}

Category:
${category}

Module:
${module}

User Question:
${userMessage}

Rules:

- All services belong to Kerala KSMART
- Always direct users to the KSMART Portal
- Portal URL: https://ksmart.lsgkerala.gov.in
- Never invent government websites
- Never mention Civil Registration Department website
- Never create fake links
- Use markdown formatting
- Use headings
- Use bullet points
- Provide practical step-by-step guidance
- Mention required documents if applicable
- Mention fees only if known
- Mention processing time only if known
- Be concise and professional
`;

  try {

    const response =
      await client.chat.completions.create({

        model: 'gpt-4o-mini',

        messages: [

          {
            role: 'system',
            content: `
You are the Kerala KSMART AI Assistant.

Important Instructions:

- All services are accessed through KSMART.
- Official Portal:
  https://ksmart.lsgkerala.gov.in
- Never invent external websites.
- Never provide fake URLs.
- Always direct users to KSMART Portal.
- Give clear step-by-step instructions.
- Use markdown formatting.
`
          },

          {
            role: 'user',
            content: prompt
          }

        ],

        temperature: 0.2
      });

    return response
      .choices[0]
      .message
      .content;

  } catch (error) {

    console.error(error);

    return `
# Error

Unable to generate a response at the moment.

Please try again later.
`;
  }
}

module.exports = askAI;