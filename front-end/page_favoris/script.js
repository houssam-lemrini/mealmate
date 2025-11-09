
// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const sortSelect = document.getElementById('sortSelect');
const favoritesGrid = document.getElementById('favoritesGrid');
const emptyState = document.getElementById('emptyState');
const favoritesCount = document.getElementById('favoritesCount');
const totalFavorites = document.getElementById('totalFavorites');
const totalCalories = document.getElementById('totalCalories');
const avgProtein = document.getElementById('avgProtein');
const mealModal = document.getElementById('mealModal');
const closeMealModal = document.getElementById('closeMealModal');
const modalMealName = document.getElementById('modalMealName');
const modalMealBody = document.getElementById('modalMealBody');
const toast = document.getElementById('toast');

// State
let favorites = [];
let filteredFavorites = [];
let currentSort = 'date';

// Sample meal database with images
const mealDatabase = {
    salmon: {
        id: 'salmon',
        name: "Saumon Teriyaki",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
        calories: 420,
        protein: 35,
        carbs: 28,
        fat: 18,
        prepTime: 15,
        cookTime: 20,
        servings: 2,
        category: "Poisson",
        videoId: "jWTLDFZ-9D4",
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
        id: 'chicken',
        name: "Poulet BBQ",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80",
        calories: 380,
        protein: 42,
        carbs: 22,
        fat: 12,
        prepTime: 10,
        cookTime: 25,
        servings: 2,
        category: "Viande",
        videoId: "zzN5bhc5_PQ",
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
        id: 'veggie',
        name: "Bowl Végétarien",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
        calories: 350,
        protein: 18,
        carbs: 45,
        fat: 10,
        prepTime: 10,
        cookTime: 15,
        servings: 2,
        category: "Végétarien",
        videoId: "jHY9-Q4E_XE",
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
    },
    pasta: {
        id: 'pasta',
        name: "Pâtes aux Légumes",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80",
        calories: 450,
        protein: 15,
        carbs: 65,
        fat: 12,
        prepTime: 10,
        cookTime: 20,
        servings: 2,
        category: "Végétarien",
        ingredients: [
            "200g de pâtes",
            "2 courgettes",
            "1 poivron rouge",
            "2 tomates",
            "2 gousses d'ail",
            "Huile d'olive",
            "Basilic frais",
            "Sel et poivre"
        ],
        instructions: [
            "Faites cuire les pâtes selon les instructions.",
            "Coupez les légumes en dés.",
            "Faites revenir l'ail dans l'huile d'olive.",
            "Ajoutez les légumes et faites cuire 10 minutes.",
            "Mélangez avec les pâtes et le basilic.",
            "Servez chaud."
        ]
    },
    beef: {
        id: 'beef',
        name: "Steak et Légumes",
        image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&q=80",
        calories: 520,
        protein: 45,
        carbs: 25,
        fat: 22,
        prepTime: 15,
        cookTime: 25,
        servings: 2,
        category: "Viande",
        ingredients: [
            "2 steaks (200g chacun)",
            "300g de brocoli",
            "200g de carottes",
            "Huile d'olive",
            "Ail",
            "Sel et poivre"
        ],
        instructions: [
            "Salez et poivrez les steaks.",
            "Faites cuire les steaks à votre goût.",
            "Faites cuire les légumes à la vapeur.",
            "Servez ensemble."
        ]
    }
};

// Initialize
function init() {
    loadFavorites();
    initTheme();
    renderFavorites();
    updateStats();
    setupEventListeners();
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeToggle.style.transition = 'transform 0.3s ease';
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);

    showToast(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé 🌙`, 'success');
}

// Load and Save Favorites
function loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
        favorites = JSON.parse(saved);
    } else {
        // Add sample favorites if none exist
        favorites = [
            { mealId: 'salmon', dateAdded: new Date().toISOString() },
            { mealId: 'chicken', dateAdded: new Date().toISOString() },
            { mealId: 'veggie', dateAdded: new Date().toISOString() }
        ];
        saveFavorites();
    }
    filteredFavorites = [...favorites];
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Get meal data
function getMealData(mealId) {
    return mealDatabase[mealId] || null;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Aujourd'hui";
    if (diffDays === 2) return "Hier";
    if (diffDays <= 7) return `Il y a ${diffDays - 1} jours`;
    
    return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
}

// Render Favorites
function renderFavorites() {
    favoritesCount.textContent = `(${filteredFavorites.length})`;
    
    if (filteredFavorites.length === 0) {
        emptyState.style.display = 'block';
        favoritesGrid.innerHTML = '';
        favoritesGrid.appendChild(emptyState);
        return;
    }

    emptyState.style.display = 'none';
    favoritesGrid.innerHTML = '';

    filteredFavorites.forEach((favorite, index) => {
        const meal = getMealData(favorite.mealId);
        if (!meal) return;

        const card = document.createElement('div');
        card.className = 'meal-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="meal-image-container">
                <img src="${meal.image}" alt="${meal.name}" class="meal-image" onerror="this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80'">
                <div class="meal-overlay"></div>
                <button class="meal-remove-btn" onclick="removeFavorite('${favorite.mealId}')" aria-label="Supprimer ${meal.name}">
                    <i class="fas fa-trash"></i>
                </button>
                <div class="meal-badge">
                    <i class="fas fa-fire"></i>
                    ${meal.calories} cal
                </div>
            </div>
            <div class="meal-content">
                <div class="meal-header">
                    <h3 class="meal-name" onclick="showMealDetails('${favorite.mealId}')">${meal.name}</h3>
                    <div class="meal-date">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(favorite.dateAdded)}
                    </div>
                </div>
                <div class="meal-stats">
                    <div class="meal-stat">
                        <span class="meal-stat-value">${meal.calories}</span>
                        <span class="meal-stat-label">Calories</span>
                    </div>
                    <div class="meal-stat">
                        <span class="meal-stat-value">${meal.protein}g</span>
                        <span class="meal-stat-label">Protéines</span>
                    </div>
                    <div class="meal-stat">
                        <span class="meal-stat-value">${meal.carbs}g</span>
                        <span class="meal-stat-label">Glucides</span>
                    </div>
                </div>
                <div class="meal-macros">
                    <span class="macro-badge">
                        <i class="fas fa-dumbbell"></i> ${meal.protein}g P
                    </span>
                    <span class="macro-badge carbs">
                        <i class="fas fa-bread-slice"></i> ${meal.carbs}g C
                    </span>
                    <span class="macro-badge fat">
                        <i class="fas fa-tint"></i> ${meal.fat}g F
                    </span>
                </div>
            </div>
        `;
        favoritesGrid.appendChild(card);
    });
}

// Remove Favorite
function removeFavorite(mealId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce favori ?')) {
        favorites = favorites.filter(fav => fav.mealId !== mealId);
        saveFavorites();
        filterAndSort();
        updateStats();
        showToast('Favori supprimé', 'success');
    }
}

// Search
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query) {
        clearSearch.style.display = 'flex';
    } else {
        clearSearch.style.display = 'none';
    }
    
    filterAndSort();
}

function clearSearchInput() {
    searchInput.value = '';
    clearSearch.style.display = 'none';
    filterAndSort();
}

// Sort
function handleSort() {
    currentSort = sortSelect.value;
    filterAndSort();
}

function filterAndSort() {
    const query = searchInput.value.toLowerCase().trim();
    
    // Filter
    filteredFavorites = favorites.filter(favorite => {
        const meal = getMealData(favorite.mealId);
        if (!meal) return false;
        
        if (query) {
            return meal.name.toLowerCase().includes(query) ||
                   meal.category.toLowerCase().includes(query);
        }
        return true;
    });
    
    // Sort
    filteredFavorites.sort((a, b) => {
        const mealA = getMealData(a.mealId);
        const mealB = getMealData(b.mealId);
        
        switch (currentSort) {
            case 'name':
                return mealA.name.localeCompare(mealB.name);
            case 'calories-asc':
                return mealA.calories - mealB.calories;
            case 'calories-desc':
                return mealB.calories - mealA.calories;
            case 'protein':
                return mealB.protein - mealA.protein;
            case 'date':
            default:
                return new Date(b.dateAdded) - new Date(a.dateAdded);
        }
    });
    
    renderFavorites();
}

// Update Stats
function updateStats() {
    totalFavorites.textContent = favorites.length;
    
    const totalCal = favorites.reduce((sum, fav) => {
        const meal = getMealData(fav.mealId);
        return sum + (meal ? meal.calories : 0);
    }, 0);
    totalCalories.textContent = totalCal;
    
    const totalProtein = favorites.reduce((sum, fav) => {
        const meal = getMealData(fav.mealId);
        return sum + (meal ? meal.protein : 0);
    }, 0);
    const avgProt = favorites.length > 0 ? Math.round(totalProtein / favorites.length) : 0;
    avgProtein.textContent = `${avgProt}g`;
}

// Show Meal Details
function showMealDetails(mealId) {
    const meal = getMealData(mealId);
    if (!meal) return;
    
    modalMealName.textContent = meal.name;
    modalMealBody.innerHTML = `
        <div class="meal-detail-image">
            <img src="${meal.image}" alt="${meal.name}" onerror="this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80'">
        </div>
        <div class="meal-detail-stats">
            <div class="detail-stat">
                <i class="fas fa-fire"></i>
                <span>${meal.calories} calories</span>
            </div>
            <div class="detail-stat">
                <i class="fas fa-dumbbell"></i>
                <span>${meal.protein}g Protéines</span>
            </div>
            <div class="detail-stat">
                <i class="fas fa-bread-slice"></i>
                <span>${meal.carbs}g Glucides</span>
            </div>
            <div class="detail-stat">
                <i class="fas fa-tint"></i>
                <span>${meal.fat}g Lipides</span>
            </div>
            <div class="detail-stat">
                <i class="fas fa-clock"></i>
                <span>${meal.prepTime + meal.cookTime} min</span>
            </div>
            <div class="detail-stat">
                <i class="fas fa-users"></i>
                <span>${meal.servings} portions</span>
            </div>
        </div>
        <div class="meal-detail-section">
            <h3><i class="fas fa-list-ul"></i> Ingrédients</h3>
            <ul class="ingredients-list-detail">
                ${meal.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
        <div class="meal-detail-section">
            <h3><i class="fas fa-tasks"></i> Instructions</h3>
            <ol class="instructions-list-detail">
                ${meal.instructions.map(inst => `<li>${inst}</li>`).join('')}
            </ol>
        </div>
        ${meal.videoId ? `
            <div class="meal-detail-section">
                <h3><i class="fas fa-video"></i> Vidéo</h3>
                <div class="video-container">
                    <iframe 
                        src="https://www.youtube.com/embed/${meal.videoId}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        ` : ''}
    `;
    
    mealModal.classList.add('show');
}

function closeMealModalHandler() {
    mealModal.classList.remove('show');
}

// Toast Notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Event Listeners
function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
    
    searchInput.addEventListener('input', handleSearch);
    clearSearch.addEventListener('click', clearSearchInput);
    sortSelect.addEventListener('change', handleSort);
    
    closeMealModal.addEventListener('click', closeMealModalHandler);
    
    mealModal.addEventListener('click', (e) => {
        if (e.target === mealModal) {
            closeMealModalHandler();
        }
    });
}

// Make functions global
window.removeFavorite = removeFavorite;
window.showMealDetails = showMealDetails;

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
