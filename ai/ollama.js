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

Provide clear step-by-step guidance.

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
- Use markdown formatting
- Use bullet points
- Use headings
- Be concise
- Give practical instructions
`;

  try {

    const response =
      await client.chat.completions.create({

        model: 'gpt-4o-mini',

        messages: [
          {
            role: 'system',
            content:
              'You are a Kerala government service assistant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],

        temperature: 0.3
      });

    return response
      .choices[0]
      .message
      .content;

  } catch (error) {

    console.error(error);

    return 'AI Error';
  }
}

module.exports = askAI;