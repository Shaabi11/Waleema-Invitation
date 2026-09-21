// Target Date: November 12, 2026, 18:00:00 (Dinner Time)
const targetDate = new Date('November 13, 2026 18:00:00').getTime();

// Countdown Timer Functionality
function updateTimer() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    document.getElementById('days').innerText = '00';
    document.getElementById('hours').innerText = '00';
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById('days').innerText = String(days).padStart(2, '0');
  document.getElementById('hours').innerText = String(hours).padStart(2, '0');
  document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
  document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Update timer every second
setInterval(updateTimer, 1000);
updateTimer();


// Ambient Gold Particles Canvas Animation
const canvas = document.getElementById('ambient-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.6 + 0.2,
    speedY: Math.random() * 0.4 + 0.1,
    speedX: (Math.random() - 0.5) * 0.3
  }));

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < 0) {
        p.y = height;
        p.x = Math.random() * width;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(197, 160, 89, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#c5a059';
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}


// Google Apps Script Web App Endpoint
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbywRwQIpTCbR0EFz_wuTHPhAJlY7jJfVIDsJKfEKXkdICEVSZWE1Q1uIImHjrNI5rH0gg/exec";

// Dynamic RSVP Handler - Transmits to Sheet & Shows Confirmation
const rsvpForm = document.getElementById('rsvp-form');
const confirmationDiv = document.getElementById('rsvp-confirmation');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const guestName = document.getElementById('guest-name').value.trim();
    const attendanceStatus = document.getElementById('attendance-status').value;

    if (!guestName || !attendanceStatus) return;

    // Send Data to Google Sheet
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: guestName,
        status: attendanceStatus
      })
    });

    let responseMessage = "";

    if (attendanceStatus === "Joyfully Accepts") {
      responseMessage = `Mubarak, ${guestName}! We are so excited and looking forward to celebrating this special day with you! Your presence will mean the world to us. See you soon! 🌸✨`;
    } else {
      responseMessage = `JazakAllah Khair, ${guestName}! We completely understand and deeply appreciate your warm wishes and prayers. May Allah bless you, and we hope to see you if you can make it! 🤲✨`;
    }

    // Set custom message text
    confirmationDiv.innerText = responseMessage;

    // Hide the entire RSVP form (inputs + submit button)
    rsvpForm.style.display = 'none';

    // Show the confirmation message
    confirmationDiv.classList.remove('hidden');
  });
}
