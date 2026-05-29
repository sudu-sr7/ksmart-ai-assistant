const express = require('express');

const router = express.Router();

const askAI = require('../ai/ollama');

const detectIntent = require('../services/intent-detector');

const findProcedure = require('../services/procedure-service');

router.post('/chat', async (req, res) => {

  try {

    const { message } = req.body;

    if (!message || typeof message !== 'string') {

      return res.status(400).json({
        response: 'Invalid message'
      });
    }

    console.log('User Message:', message);

    // STEP 1: Detect intent
    const intent = await detectIntent(message);

    console.log('Detected Intent:', intent);

    // STEP 2: Find matching procedure/service
    const procedureData = await findProcedure(message);

    console.log(
      'Procedure Found:',
      procedureData?.Service || 'None'
    );

    // STEP 3: Ask OpenAI using procedure data
    const aiResponse = await askAI(
      message,
      procedureData
    );

    // return res.json({
    //   intent,
    //   procedure: procedureData?.service || null,
    //   response: aiResponse
    // });

    return res.type('text/markdown').send(aiResponse);

  } catch (error) {

    console.error('CHAT ERROR:', error);

    return res.status(500).json({
      response:
        error.message ||
        'Internal Server Error'
    });
  }
});

module.exports = router;