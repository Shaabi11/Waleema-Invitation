document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // 1. COUNTDOWN TIMER LOGIC
  // ==========================================
  const eventDate = new Date("November 12, 2026 00:00:00").getTime();

  const timerInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (distance < 0) {
      clearInterval(timerInterval);
      const countdownEl = document.getElementById("countdown");
      if (countdownEl) countdownEl.innerHTML = "The Event Has Begun!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
    if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
  }, 1000);


  // ==========================================
  // 2. RSVP & SPREADSHEET LOGIC
  // ==========================================
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbywRwQIpTCbR0EFz_wuTHPhAJlY7jJfVIDsJKfEKXkdICEVSZWE1Q1uIImHjrNI5rH0gg/exec";
  const rsvpForm = document.getElementById('rsvp-form');
  const confirmationBox = document.getElementById('rsvp-confirmation');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('guest-name');
      const statusInput = document.getElementById('rsvp-status');

      if (!nameInput || !statusInput) return;

      const nameVal = nameInput.value.trim();
      const statusVal = statusInput.value;

      if (!nameVal || !statusVal) return;

      // 1. Send data to Google Sheet endpoint asynchronously
      try {
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: nameVal,
            status: statusVal
          })
        });
      } catch (err) {
        console.log("Sheet submission error:", err);
      }

      // 2. Display confirmation message
      if (confirmationBox) {
        if (statusVal === 'attending') {
          confirmationBox.innerHTML = `✨ <strong>Thank you, ${nameVal}!</strong><br>We are delighted to receive your confirmation and look forward to celebrating with you!`;
        } else if (statusVal === 'maybe') {
          confirmationBox.innerHTML = `✨ <strong>Thank you, ${nameVal}!</strong><br>We hope you will be able to join us. We look forward to your update!`;
        } else {
          confirmationBox.innerHTML = `✨ <strong>Thank you, ${nameVal}!</strong><br>We deeply appreciate your warm wishes and blessings from afar.`;
        }
        
        // Unhide confirmation box
        confirmationBox.classList.remove('hidden');
        confirmationBox.style.display = 'block';
      }

      // 3. Hide the form
      rsvpForm.style.display = 'none';
    });
  }
});
