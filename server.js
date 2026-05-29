require('dotenv').config();

const express = require('express');

const cors = require('cors');

const path = require('path');

const fs = require('fs');

const chatRoutes = require('./routes/chat');

const app = express();

app.use(cors());

app.use(express.json());

// Serve frontend
app.use(express.static(
  path.join(__dirname, 'public')
));

// Chat routes
app.use(chatRoutes);

// Load all services
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

    console.error(error);

    res.status(500).json({
      error:
        'Failed to load services'
    });
  }
});

// Open frontend
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