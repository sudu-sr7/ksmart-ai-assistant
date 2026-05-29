require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const chatRoutes = require('./routes/chat');

const app = express();

// Enable CORS for Netlify frontend
app.use(
  cors({
    origin: '*'
  })
);

app.use(express.json());

// Serve frontend files
app.use(
  express.static(
    path.join(__dirname, 'public')
  )
);

// Chat routes
app.use(chatRoutes);

// Services API
app.get('/services', (req, res) => {

  try {

    const services = JSON.parse(

      fs.readFileSync(
        path.join(
          __dirname,
          'services.json'
        ),
        'utf-8'
      )
    );

    res.json(services);

  } catch (error) {

    console.error(
      'Services Error:',
      error
    );

    res.status(500).json({
      error:
        'Failed to load services'
    });
  }
});

// Health check route
app.get('/health', (req, res) => {

  res.json({
    status: 'OK',
    service:
      'KSMART AI Assistant'
  });
});

// Frontend route
app.get('/', (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      'public',
      'index.html'
    )
  );
});

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});