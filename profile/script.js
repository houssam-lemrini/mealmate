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

// Recipe data
const recipes = {
    salmon: {
        name: "Saumon Teriyaki",
        calories: 420,
        protein: 35,
        carbs: 28,
        fat: 18,
        prepTime: 15,
        cookTime: 20,
        servings: 2,
        videoId: "jWTLDFZ-9D4", // Replace with actual YouTube video ID
        ingredients: [
            "2 filets de saumon (200g chacun)",
            "4 cuillères à soupe de sauce teriyaki",
            "2 cuillères à soupe de miel",
            "2 gousses d'ail, hachées",
            "1 cuillère à soupe de gingembre frais, râpé",
            "2 cuillères à soupe d'huile d'olive",
            "200g de riz brun cuit",
            "200g de brocoli, coupé en fleurettes",
            "1 cuillère à soupe de graines de sésame",
            "Ciboulette fraîche pour garnir"
        ],
        instructions: [
            "Mélangez la sauce teriyaki, le miel, l'ail et le gingembre dans un bol.",
            "Marinez les filets de saumon dans la moitié de la sauce pendant 10 minutes.",
            "Faites chauffer l'huile dans une grande poêle à feu moyen-vif.",
            "Faites cuire le saumon pendant 4-5 minutes de chaque côté jusqu'à ce qu'il soit bien cuit.",
            "Ajoutez le reste de la sauce et laissez mijoter 2 minutes.",
            "Pendant ce temps, faites cuire le brocoli à la vapeur pendant 5 minutes.",
            "Servez le saumon sur le riz avec le brocoli, saupoudrez de graines de sésame et de ciboulette."
        ]
    },
    chicken: {
        name: "Poulet BBQ",
        calories: 380,
        protein: 42,
        carbs: 22,
        fat: 12,
        prepTime: 10,
        cookTime: 25,
        servings: 2,
        videoId: "z2u6Uy5kQjg", // Replace with actual YouTube video ID
        ingredients: [
            "2 filets de poulet (150g chacun)",
            "4 cuillères à soupe de sauce BBQ",
            "1 cuillère à soupe de vinaigre de cidre",
            "1 cuillère à café de paprika",
            "1 cuillère à café d'ail en poudre",
            "200g de patates douces, coupées en cubes",
            "150g de haricots verts",
            "2 cuillères à soupe d'huile d'olive",
            "Sel et poivre"
        ],
        instructions: [
            "Préchauffez le four à 200°C.",
            "Mélangez la sauce BBQ, le vinaigre, le paprika et l'ail en poudre.",
            "Badigeonnez les filets de poulet avec la moitié de la sauce.",
            "Placez les patates douces sur une plaque et arrosez d'huile d'olive.",
            "Faites cuire au four pendant 20 minutes, retournez le poulet à mi-cuisson.",
            "Ajoutez les haricots verts et faites cuire 5 minutes de plus.",
            "Servez chaud avec le reste de la sauce BBQ."
        ]
    },
    veggie: {
        name: "Bowl Végétarien",
        calories: 350,
        protein: 18,
        carbs: 45,
        fat: 10,
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        videoId: "jHY9-Q4E_XE", // Replace with actual YouTube video ID
        ingredients: [
            "150g de quinoa cuit",
            "200g de pois chiches en conserve, égouttés",
            "1 avocat, tranché",
            "100g de chou rouge, émincé",
            "100g de carottes râpées",
            "50g de noix, hachées",
            "2 cuillères à soupe d'huile d'olive",
            "Jus d'un citron",
            "1 cuillère à café de miel",
            "Sel et poivre",
            "Feuilles de coriandre fraîche"
        ],
        instructions: [
            "Rincez et égouttez les pois chiches, puis faites-les rôtir au four à 200°C pendant 15 minutes.",
            "Préparez la vinaigrette en mélangeant l'huile d'olive, le jus de citron et le miel.",
            "Divisez le quinoa cuit dans deux bols.",
            "Ajoutez les pois chiches rôtis, l'avocat, le chou rouge et les carottes.",
            "Saupoudrez de noix et de coriandre.",
            "Arrosez de vinaigrette et servez immédiatement."
        ]
    }
};

// Initialize Charts
function initializeCharts() {
    // Weight History Chart
    const weightCtx = document.getElementById('weightChart');
    if (weightCtx) {
        new Chart(weightCtx, {
            type: 'line',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7'],
                datasets: [{
                    label: 'Poids (kg)',
                    data: [91, 90.6, 90.4, 90.1, 89.8, 89.5, 89.2],
                    borderColor: '#3066BE',
                    backgroundColor: 'rgba(48, 102, 190, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#FAA916',
                    pointBorderColor: '#3066BE',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Macro Distribution Chart
    const macroCtx = document.getElementById('macroChart');
    if (macroCtx) {
        new Chart(macroCtx, {
            type: 'doughnut',
            data: {
                labels: ['Protéines', 'Glucides', 'Lipides'],
                datasets: [{
                    data: [98, 244, 65],
                    backgroundColor: ['#3066BE', '#FAA916', '#10b981'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 15, font: { size: 12 } }
                    }
                }
            }
        });
    }

    // Weekly Calories Chart
    const caloriesCtx = document.getElementById('caloriesChart');
    if (caloriesCtx) {
        new Chart(caloriesCtx, {
            type: 'bar',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                datasets: [{
                    label: 'Calories consommées',
                    data: [1850, 1920, 1950, 1980, 1950, 2100, 1880],
                    backgroundColor: 'rgba(48, 102, 190, 0.6)',
                    borderColor: '#3066BE',
                    borderWidth: 2,
                    borderRadius: 8
                }, {
                    label: 'Objectif',
                    data: [1950, 1950, 1950, 1950, 1950, 1950, 1950],
                    backgroundColor: 'rgba(250, 169, 22, 0.3)',
                    borderColor: '#FAA916',
                    borderWidth: 2,
                    borderRadius: 8,
                    type: 'line',
                    tension: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 15, font: { size: 12 } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Meal Prep Progress Chart
    const mealPrepCtx = document.getElementById('mealPrepChart');
    if (mealPrepCtx) {
        new Chart(mealPrepCtx, {
            type: 'radar',
            data: {
                labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
                datasets: [{
                    label: 'Repas préparés',
                    data: [18, 21, 24, 24],
                    backgroundColor: 'rgba(48, 102, 190, 0.2)',
                    borderColor: '#3066BE',
                    borderWidth: 3,
                    pointBackgroundColor: '#FAA916',
                    pointBorderColor: '#3066BE',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    }
                }
            }
        });
    }
}

// Recipe Modal Functions
function openRecipeModal(recipeId) {
    const recipe = recipes[recipeId];
    if (!recipe) return;

    const modal = document.getElementById('recipeModal');
    const modalBody = document.getElementById('recipeModalBody');

    modalBody.innerHTML = `
        <div class="recipe-header">
            <h2>${recipe.name}</h2>
            <div class="recipe-meta">
                <div class="recipe-meta-item">
                    <i class="fas fa-fire"></i>
                    <span>${recipe.calories} cal</span>
                </div>
                <div class="recipe-meta-item">
                    <i class="fas fa-dumbbell"></i>
                    <span>${recipe.protein}g Protéines</span>
                </div>
                <div class="recipe-meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${recipe.prepTime + recipe.cookTime} min</span>
                </div>
                <div class="recipe-meta-item">
                    <i class="fas fa-users"></i>
                    <span>${recipe.servings} portions</span>
                </div>
            </div>
        </div>
        
        <div class="recipe-video-section">
            <div class="recipe-video-container">
                <iframe 
                    src="https://www.youtube.com/embed/${recipe.videoId}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>

        <div class="recipe-ingredients">
            <h3><i class="fas fa-list-ul"></i> Ingrédients</h3>
            <ul class="ingredients-list">
                ${recipe.ingredients.map(ing => `
                    <li class="ingredient-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${ing}</span>
                    </li>
                `).join('')}
            </ul>
        </div>

        <div class="recipe-instructions">
            <h3><i class="fas fa-tasks"></i> Instructions</h3>
            <ol class="instructions-list">
                ${recipe.instructions.map(inst => `
                    <li class="instruction-item">
                        <p>${inst}</p>
                    </li>
                `).join('')}
            </ol>
        </div>
    `;

    modal.classList.add('active');
}

function closeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    modal.classList.remove('active');
}

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    animateStreak();
    animateProgressRing();
    animateMealPrepStats();
    animateCalorieBar();
    initializeCharts();

    // Événements
    themeToggle.addEventListener('click', toggleTheme);
    viewDetailsBtn.addEventListener('click', handleViewDetails);

    // Recipe card clicks
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            const recipeId = card.getAttribute('data-recipe');
            if (recipeId) {
                openRecipeModal(recipeId);
            }
        });
    });

    // Recipe modal close
    const recipeCloseBtn = document.getElementById('recipeCloseBtn');
    const recipeModal = document.getElementById('recipeModal');
    
    if (recipeCloseBtn) {
        recipeCloseBtn.addEventListener('click', closeRecipeModal);
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === recipeModal) {
            closeRecipeModal();
        }
    });
});
