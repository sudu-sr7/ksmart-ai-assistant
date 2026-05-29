const dropdown =
  document.getElementById(
    'serviceDropdown'
  );

const messageInput =
  document.getElementById(
    'message'
  );

// Load services
async function loadServices() {

  try {

    const response =
      await fetch('/services');

    const services =
      await response.json();

    services.forEach(service => {

      const option =
        document.createElement(
          'option'
        );

      option.value =
        service.Service;

      option.textContent =
        `${service.Service} (${service.Category})`;

      dropdown.appendChild(option);
    });

  } catch (error) {

    console.error(error);
  }
}

// Autofill textarea
dropdown.addEventListener(
  'change',
  () => {

    const selected =
      dropdown.value;

    if (selected) {

      messageInput.value =
        `How to apply for ${selected}?`;
    }
  }
);

async function sendMessage() {

  const responseDiv =
    document.getElementById(
      'response'
    );

  const message =
    messageInput.value.trim();

  if (!message) return;

  responseDiv.innerHTML = `
    <div class="thinking">
      Thinking...
    </div>
  `;

  try {

    const response =
      await fetch('/chat', {

        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body: JSON.stringify({
          message
        })
      });

    const data =
      await response.text();

    const formatted =
      marked.parse(data);

    responseDiv.innerHTML = `
      <div class="ai-message">
        ${formatted}
      </div>
    `;

  } catch (error) {

    console.error(error);

    responseDiv.innerHTML = `
      <div class="error">
        Error connecting to server
      </div>
    `;
  }
}

loadServices();