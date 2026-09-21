// Google Apps Script Web App Endpoint
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbywRwQIpTCbR0EFz_wuTHPhAJlY7jJfVIDsJKfEKXkdICEVSZWE1Q1uIImHjrNI5rH0gg/exec";

document.getElementById('rsvp-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nameInput = document.getElementById('guest-name').value.trim();
  const statusInput = document.getElementById('rsvp-status').value;
  const confirmationBox = document.getElementById('rsvp-confirmation');
  const formElement = document.getElementById('rsvp-form');

  if (!nameInput || !statusInput) return;

  // Send Data to Google Sheet
  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameInput,
      status: statusInput
    })
  });

  // Display Custom Warm Confirmation Message
  if (statusInput === 'attending') {
    confirmationBox.innerHTML = `✨ <strong>Thank you, ${nameInput}!</strong><br>We are delighted to receive your confirmation and look forward to celebrating with you!`;
  } else if (statusInput === 'maybe') {
    confirmationBox.innerHTML = `✨ <strong>Thank you, ${nameInput}!</strong><br>We hope you will be able to join us. We look forward to your update!`;
  } else {
    confirmationBox.innerHTML = `✨ <strong>Thank you, ${nameInput}!</strong><br>We deeply appreciate your warm wishes and blessings from afar.`;
  }

  // Hide the form and display confirmation message
  formElement.classList.add('hidden');
  confirmationBox.classList.remove('hidden');
});
