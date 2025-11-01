// Éléments du DOM
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const viewDetailsBtn = document.getElementById('viewDetailsBtn');
const streakCounter = document.getElementById('streakCounter');
const progressCircle = document.getElementById('progressCircle');

// Initialisation du thème
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
}

// Basculement du thème
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animation du bouton
    themeToggle.style.transition = 'transform 0.3s ease';
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);

    showNotification(`Switched to ${newTheme} mode 🌙`);
}

// Animation de la série (streak)
function animateStreak() {
    const streakElement = streakCounter.querySelector('.streak-count');
    const currentStreak = parseInt(streakElement.textContent);
    
    // Animation de compteur
    let count = 0;
    const increment = currentStreak / 20;
    
    const counter = setInterval(() => {
        count += increment;
        if (count >= currentStreak) {
            streakElement.textContent = currentStreak;
            clearInterval(counter);
        } else {
            streakElement.textContent = Math.floor(count);
        }
    }, 50);
}

// Animation du cercle de progression
function animateProgressRing() {
    const startWeight = 91;
    const currentWeight = 90;
    const goalWeight = 79;

    const totalToLose = startWeight - goalWeight;
    const lostNow = startWeight - currentWeight;
    const percent = (lostNow / totalToLose) * 100;

    const circumference = 339.3;
    const offset = circumference - (percent / 100) * circumference;

    const circle = document.getElementById("progressCircle");
    const percentText = document.getElementById("progressPercent");
    const currentWeightText = document.getElementById("currentWeight");

    circle.style.transition = "stroke-dashoffset 1.5s ease";
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 400);

    // Animate numeric % display
    let display = 0;
    const update = setInterval(() => {
        if (display < percent) {
            display++;
            percentText.textContent = `${display}%`;
        } else {
            percentText.textContent = `${percent.toFixed(0)}%`;
            clearInterval(update);
        }
    }, 25);

    // Add glowing pulse when fully animated
    setTimeout(() => {
        circle.style.filter = "drop-shadow(0 0 15px rgba(48, 102, 190, 0.7))";
    }, 1500);
}

// Animation du bouton "Voir les détails"
function handleViewDetails() {
    viewDetailsBtn.style.transform = 'scale(0.95)';
    viewDetailsBtn.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
        viewDetailsBtn.style.transform = 'scale(1)';
    }, 150);
}

// Notification simple
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 25px;
        right: 25px;
        background: #FAA916;
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(250, 169, 22, 0.3);
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.4s ease;
        z-index: 9999;
        font-family: "Poppins", sans-serif;
    `;
    
    document.body.appendChild(notification);

    // Animation d'apparition
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 50);

    // Disparition automatique
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-10px)';
        setTimeout(() => notification.remove(), 400);
    }, 2500);
}

// === Popup Modal Logic ===
const detailsModal = document.getElementById('detailsModal');
const closeModal = document.getElementById('closeModal');
const viewDetails = document.getElementById('viewDetailsBtn');

viewDetails.addEventListener('click', () => {
    detailsModal.classList.add('active');
    showNotification("Affichage des détails du profil...");
});

closeModal.addEventListener('click', () => {
    detailsModal.classList.remove('active');
});

// Fermer la popup en cliquant en dehors
window.addEventListener('click', (e) => {
    if (e.target === detailsModal) detailsModal.classList.remove('active');
});

// === Simple Weight History Chart ===
function loadChart() {
  const ctx = document.getElementById('weightChart').getContext('2d');
  if (window.weightChart) window.weightChart.destroy(); // prevent duplicate

  window.weightChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      datasets: [{
        label: 'Poids (kg)',
        data: [91, 90.6, 90.4, 90.1, 89.8, 89.5, 89.2],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.1)',
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#10b981'
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: false, grid: { color: 'rgba(0,0,0,0.05)' } },
        x: { grid: { display: false } }
      },
      plugins: { legend: { display: false } },
      responsive: true,
    }
  });
}
document.querySelector('.history-text p:nth-child(3)').innerHTML =
  `<strong>Perte totale :</strong> ${(91 - 89.2).toFixed(1)} kg en 7 jours 🥳`;

// Animate meal prep stats
function animateMealPrepStats() {
    const timeSaved = document.getElementById('timeSaved');
    const moneySaved = document.getElementById('moneySaved');
    const goalsHit = document.getElementById('goalsHit');
    const mealsPrepped = document.getElementById('mealsPrepped');
    const mealPrepStreak = document.getElementById('mealPrepStreak');

    // Animate time saved
    animateValue(timeSaved, 0, 8.5, 1500, 1);
    
    // Animate money saved
    animateValue(moneySaved, 0, 127, 1500, 0);
    
    // Animate goals hit
    animateValue(goalsHit, 0, 94, 1500, 0);
    
    // Animate meals prepped
    animateValue(mealsPrepped, 0, 24, 1500, 0);
    
    // Animate meal prep streak
    animateValue(mealPrepStreak, 0, 12, 1500, 0);
}

function animateValue(element, start, end, duration, decimals) {
    const startTime = performance.now();
    const range = end - start;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (range * progress);
        
        if (decimals > 0) {
            element.textContent = current.toFixed(decimals);
        } else {
            element.textContent = Math.floor(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (decimals > 0) {
                element.textContent = end.toFixed(decimals);
            } else {
                element.textContent = end;
            }
        }
    }
    
    requestAnimationFrame(update);
}

// Animate calorie progress bar
function animateCalorieBar() {
    const progressBar = document.querySelector('.calorie-progress');
    const totalCalories = 1950;
    const consumedCalories = 1520;
    const percentage = (consumedCalories / totalCalories) * 100;
    
    setTimeout(() => {
        progressBar.style.width = percentage + '%';
    }, 500);
}

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    animateStreak();
    animateProgressRing();
    animateMealPrepStats();
    animateCalorieBar();

    // Événements
    themeToggle.addEventListener('click', toggleTheme);
    viewDetailsBtn.addEventListener('click', handleViewDetails);

    // Add click handlers for recipe cards
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            const recipeName = card.querySelector('.recipe-name').textContent;
            showNotification(`Ouverture de ${recipeName}...`);
        });
    });
});
