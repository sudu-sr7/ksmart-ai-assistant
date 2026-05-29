const dropdown =
  document.getElementById(
    'serviceDropdown'
  );

const messageInput =
  document.getElementById(
    'message'
  );

const responseDiv =
  document.getElementById(
    'response'
  );

// Render Backend URL
const API_URL =
  'https://services-ai-assistant.onrender.com/';

// Load services into dropdown
async function loadServices() {

  try {

    const response =
      await fetch(
        `${API_URL}/services`
      );

    const services =
      await response.json();

    dropdown.innerHTML =
      '<option value="">Select a Government Service</option>';

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

    console.error(
      'Service Load Error:',
      error
    );

    dropdown.innerHTML =
      '<option>Error Loading Services</option>';
  }
}

// Autofill textarea when service selected
const askBtn =
  document.getElementById(
    'askBtn'
  );

dropdown.addEventListener(
  'change',
  () => {

    const selected =
      dropdown.value;

    if (selected) {

      messageInput.value =
        `How to apply for ${selected}?`;

      askBtn.disabled =
        false;

    } else {

      messageInput.value =
        '';

      askBtn.disabled =
        true;
    }
  }
);

// Send question
async function sendMessage() {

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
      await fetch(
        `${API_URL}/chat`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({
            message
          })
        }
      );

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

    console.error(
      'Chat Error:',
      error
    );

    responseDiv.innerHTML = `
      <div class="error">
        Error connecting to server
      </div>
    `;
  }
}

// Load services when page opens
loadServices();