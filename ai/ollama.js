const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `
You are Services AI Assistant for Kerala Government Services.

Rules:

- Answer only questions related to the selected Kerala government service.
- If the question is unrelated to Kerala government services, respond exactly:

Your question is irrelevant. I am here to answer anything on Kerala Services only.

- Official Portal:
https://ksmart.lsgkerala.gov.in

- Never invent websites.
- Never invent URLs.
- Always direct users to KSMART Portal.
- Use markdown formatting.
- Use headings and bullet points.
- Give concise step-by-step instructions.
- Mention documents, fees and timelines only if known.
`;

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
Selected Service:
${serviceName}

Category:
${category}

Module:
${module}

Question:
${userMessage}
`;

  try {

    const response =
      await client.chat.completions.create({

        model:
          process.env.OPENAI_MODEL ||
          'gpt-4o-mini',

        temperature: 0.1,

        messages: [

          {
            role: 'system',
            content: SYSTEM_PROMPT
          },

          {
            role: 'user',
            content: prompt
          }

        ]
      });

    return response
      .choices[0]
      .message
      .content;

  } catch (error) {

    console.error(error);

    return `
# Error

Unable to generate a response.

Please try again later.
`;
  }
}

module.exports = askAI;