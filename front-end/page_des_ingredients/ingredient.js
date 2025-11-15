// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const ingredientInput = document.getElementById('ingredientInput');
const addBtn = document.getElementById('addBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const addFromHistoryBtn = document.getElementById('addFromHistoryBtn');
const ingredientsList = document.getElementById('ingredientsList');
const emptyState = document.getElementById('emptyState');
const ingredientCount = document.getElementById('ingredientCount');
const historyModal = document.getElementById('historyModal');
const closeHistoryModal = document.getElementById('closeHistoryModal');
const historyList = document.getElementById('historyList');
const emptyHistory = document.getElementById('emptyHistory');
const addSelectedFromHistory = document.getElementById('addSelectedFromHistory');
const toast = document.getElementById('toast');
const suggestions = document.getElementById('suggestions');
const popularGrid = document.getElementById('popularGrid');

// State
let currentIngredients = [];
let ingredientHistory = [];

// Expanded ingredient database with images and icons
const ingredientDatabase = {
    // Viandes
    'poulet': { icon: 'fa-drumstick-bite', category: 'Viande', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&q=80' },
    'bœuf': { icon: 'fa-drumstick-bite', category: 'Viande', image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=200&q=80' },
    'porc': { icon: 'fa-drumstick-bite', category: 'Viande', image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=200&q=80' },
    'agneau': { icon: 'fa-drumstick-bite', category: 'Viande', image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=200&q=80' },
    'dinde': { icon: 'fa-drumstick-bite', category: 'Viande', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&q=80' },
    'saumon': { icon: 'fa-fish', category: 'Poisson', image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=200&q=80' },
    'thon': { icon: 'fa-fish', category: 'Poisson', image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=200&q=80' },
    'cabillaud': { icon: 'fa-fish', category: 'Poisson', image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=200&q=80' },
    'crevettes': { icon: 'fa-fish', category: 'Poisson', image: 'https://images.unsplash.com/photo-1588200908342-23b585c7d6d0?w=200&q=80' },
    'œufs': { icon: 'fa-egg', category: 'Protéine', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&q=80' },
    
    // Légumes
    'épinards': { icon: 'fa-leaf', category: 'Légume', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&q=80' },
    'brocoli': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200&q=80' },
    'carottes': { icon: 'fa-carrot', category: 'Légume', image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=200&q=80' },
    'tomates': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1546094097-88c6a97e5c3c?w=200&q=80' },
    'poivrons': { icon: 'fa-pepper-hot', category: 'Légume', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&q=80' },
    'oignons': { icon: 'fa-ring', category: 'Légume', image: 'https://images.unsplash.com/photo-1618512496249-c5f44ea18d44?w=200&q=80' },
    'ail': { icon: 'fa-ring', category: 'Légume', image: 'https://images.unsplash.com/photo-1604977049386-f427ff55fd89?w=200&q=80' },
    'courgettes': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=200&q=80' },
    'aubergines': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1604977049386-f427ff55fd89?w=200&q=80' },
    'champignons': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=200&q=80' },
    'haricots verts': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1598371839691-f3ec29f8f595?w=200&q=80' },
    'petits pois': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200&q=80' },
    'chou-fleur': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200&q=80' },
    'chou': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200&q=80' },
    'salade': { icon: 'fa-leaf', category: 'Légume', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&q=80' },
    'concombre': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1604977049386-f427ff55fd89?w=200&q=80' },
    'patates douces': { icon: 'fa-cube', category: 'Légume', image: 'https://images.unsplash.com/photo-1601296200636-b5e76922e1d1?w=200&q=80' },
    'pommes de terre': { icon: 'fa-cube', category: 'Légume', image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=200&q=80' },
    'maïs': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200&q=80' },
    'asperges': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200&q=80' },
    'céleri': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200&q=80' },
    'navet': { icon: 'fa-seedling', category: 'Légume', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200&q=80' },
    
    // Fruits
    'avocat': { icon: 'fa-seedling', category: 'Fruit', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&q=80' },
    'bananes': { icon: 'fa-banana', category: 'Fruit', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&q=80' },
    'pommes': { icon: 'fa-apple-whole', category: 'Fruit', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=200&q=80' },
    'oranges': { icon: 'fa-circle', category: 'Fruit', image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=200&q=80' },
    'fraises': { icon: 'fa-seedling', category: 'Fruit', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&q=80' },
    'myrtilles': { icon: 'fa-seedling', category: 'Fruit', image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&q=80' },
    'framboises': { icon: 'fa-seedling', category: 'Fruit', image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=200&q=80' },
    'mangues': { icon: 'fa-seedling', category: 'Fruit', image: 'https://images.unsplash.com/photo-1605027990122-93cd03803842?w=200&q=80' },
    'ananas': { icon: 'fa-seedling', category: 'Fruit', image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=200&q=80' },
    'raisins': { icon: 'fa-seedling', category: 'Fruit', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&q=80' },
    'citron': { icon: 'fa-circle', category: 'Fruit', image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=200&q=80' },
    'lime': { icon: 'fa-circle', category: 'Fruit', image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=200&q=80' },
    
    // Céréales & Féculents
    'riz': { icon: 'fa-bowl-food', category: 'Céréale', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=200&q=80' },
    'quinoa': { icon: 'fa-bowl-food', category: 'Céréale', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=200&q=80' },
    'pâtes': { icon: 'fa-bowl-food', category: 'Céréale', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&q=80' },
    'pain': { icon: 'fa-bread-slice', category: 'Céréale', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80' },
    'flocons d\'avoine': { icon: 'fa-bowl-food', category: 'Céréale', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=80' },
    'boulgour': { icon: 'fa-bowl-food', category: 'Céréale', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=200&q=80' },
    'couscous': { icon: 'fa-bowl-food', category: 'Céréale', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=200&q=80' },
    'lentilles': { icon: 'fa-seedling', category: 'Légumineuse', image: 'https://images.unsplash.com/photo-1598371839691-f3ec29f8f595?w=200&q=80' },
    'haricots rouges': { icon: 'fa-seedling', category: 'Légumineuse', image: 'https://images.unsplash.com/photo-1598371839691-f3ec29f8f595?w=200&q=80' },
    'pois chiches': { icon: 'fa-seedling', category: 'Légumineuse', image: 'https://images.unsplash.com/photo-1598371839691-f3ec29f8f595?w=200&q=80' },
    'haricots noirs': { icon: 'fa-seedling', category: 'Légumineuse', image: 'https://images.unsplash.com/photo-1598371839691-f3ec29f8f595?w=200&q=80' },
    
    // Produits laitiers
    'fromage': { icon: 'fa-cheese', category: 'Laitier', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&q=80' },
    'yaourt': { icon: 'fa-bottle-water', category: 'Laitier', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&q=80' },
    'lait': { icon: 'fa-bottle-water', category: 'Laitier', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&q=80' },
    'beurre': { icon: 'fa-butter', category: 'Laitier', image: 'https://images.unsplash.com/photo-1589985270826-4b7fe135a9c4?w=200&q=80' },
    'fromage blanc': { icon: 'fa-cheese', category: 'Laitier', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&q=80' },
    'crème': { icon: 'fa-bottle-water', category: 'Laitier', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&q=80' },
    'mozzarella': { icon: 'fa-cheese', category: 'Laitier', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&q=80' },
    'feta': { icon: 'fa-cheese', category: 'Laitier', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&q=80' },
    
    // Noix & Graines
    'noix': { icon: 'fa-circle', category: 'Noix', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&q=80' },
    'amandes': { icon: 'fa-circle', category: 'Noix', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&q=80' },
    'noix de cajou': { icon: 'fa-circle', category: 'Noix', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&q=80' },
    'noisettes': { icon: 'fa-circle', category: 'Noix', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&q=80' },
    'graines de chia': { icon: 'fa-circle', category: 'Graines', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&q=80' },
    'graines de lin': { icon: 'fa-circle', category: 'Graines', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&q=80' },
    'graines de tournesol': { icon: 'fa-circle', category: 'Graines', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&q=80' },
    'pistaches': { icon: 'fa-circle', category: 'Noix', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&q=80' },
    
    // Huiles & Condiments
    'huile d\'olive': { icon: 'fa-flask', category: 'Condiment', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80' },
    'huile de coco': { icon: 'fa-flask', category: 'Condiment', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80' },
    'vinaigre': { icon: 'fa-flask', category: 'Condiment', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80' },
    'miel': { icon: 'fa-droplet', category: 'Condiment', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&q=80' },
    'moutarde': { icon: 'fa-flask', category: 'Condiment', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80' },
    'sauce soja': { icon: 'fa-flask', category: 'Condiment', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80' },
    'sel': { icon: 'fa-cube', category: 'Condiment', image: 'https://images.unsplash.com/photo-1608039829570-3c67d70fd789?w=200&q=80' },
    'poivre': { icon: 'fa-pepper-hot', category: 'Condiment', image: 'https://images.unsplash.com/photo-1608039829570-3c67d70fd789?w=200&q=80' },
    'curry': { icon: 'fa-pepper-hot', category: 'Épice', image: 'https://images.unsplash.com/photo-1608039829570-3c67d70fd789?w=200&q=80' },
    'paprika': { icon: 'fa-pepper-hot', category: 'Épice', image: 'https://images.unsplash.com/photo-1608039829570-3c67d70fd789?w=200&q=80' },
    'cumin': { icon: 'fa-pepper-hot', category: 'Épice', image: 'https://images.unsplash.com/photo-1608039829570-3c67d70fd789?w=200&q=80' },
    'cannelle': { icon: 'fa-pepper-hot', category: 'Épice', image: 'https://images.unsplash.com/photo-1608039829570-3c67d70fd789?w=200&q=80' },
    'gingembre': { icon: 'fa-pepper-hot', category: 'Épice', image: 'https://images.unsplash.com/photo-1608039829570-3c67d70fd789?w=200&q=80' },
    'curcuma': { icon: 'fa-pepper-hot', category: 'Épice', image: 'https://images.unsplash.com/photo-1608039829570-3c67d70fd789?w=200&q=80' },
    
    // Herbes
    'basilic': { icon: 'fa-leaf', category: 'Herbe', image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=200&q=80' },
    'persil': { icon: 'fa-leaf', category: 'Herbe', image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=200&q=80' },
    'coriandre': { icon: 'fa-leaf', category: 'Herbe', image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=200&q=80' },
    'thym': { icon: 'fa-leaf', category: 'Herbe', image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=200&q=80' },
    'romarin': { icon: 'fa-leaf', category: 'Herbe', image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=200&q=80' },
    'origan': { icon: 'fa-leaf', category: 'Herbe', image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=200&q=80' },
    'menthe': { icon: 'fa-leaf', category: 'Herbe', image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=200&q=80' },
    'ciboulette': { icon: 'fa-leaf', category: 'Herbe', image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=200&q=80' },
};

// Common ingredients list (all keys from database)
const commonIngredients = Object.keys(ingredientDatabase);

// Get ingredient info
function getIngredientInfo(name) {
    const normalized = name.toLowerCase().trim();
    return ingredientDatabase[normalized] || {
        icon: 'fa-circle',
        category: 'Autre',
        image: null
    };
}

// Initialize
function init() {
    loadIngredients();
    loadHistory();
    initTheme();
    renderPopularIngredients();
    renderIngredients();
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
    
    if (themeToggle) {
        themeToggle.style.transition = 'transform 0.3s ease';
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }

    showToast(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé 🌙`, 'success');
}

// Render Popular Ingredients
function renderPopularIngredients() {
    // Get top 24 popular ingredients
    const popular = commonIngredients.slice(0, 24);
    
    popularGrid.innerHTML = popular.map(ingredient => {
        const info = getIngredientInfo(ingredient);
        const isAdded = currentIngredients.includes(ingredient);
        
        return `
            <div class="popular-item ${isAdded ? 'added' : ''}" onclick="addIngredient('${ingredient}')">
                ${info.image ? 
                    `<img src="${info.image}" alt="${ingredient}" class="popular-item-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                    ''
                }
                <div class="popular-item-icon" style="${info.image ? 'display: none;' : ''}">
                    <i class="fas ${info.icon}"></i>
                </div>
                <div class="popular-item-name">${ingredient}</div>
            </div>
        `;
    }).join('');
}

// Load and Save Ingredients
function loadIngredients() {
    const saved = localStorage.getItem('ingredients');
    currentIngredients = saved ? JSON.parse(saved) : [];
}

function saveIngredients() {
    localStorage.setItem('ingredients', JSON.stringify(currentIngredients));
}

// Load and Save History
function loadHistory() {
    const saved = localStorage.getItem('ingredientHistory');
    ingredientHistory = saved ? JSON.parse(saved) : [];
}

function saveHistory() {
    localStorage.setItem('ingredientHistory', JSON.stringify(ingredientHistory));
}

function addToHistory(ingredient) {
    const normalized = ingredient.toLowerCase().trim();
    if (!ingredientHistory.includes(normalized)) {
        ingredientHistory.unshift(normalized);
        if (ingredientHistory.length > 50) {
            ingredientHistory = ingredientHistory.slice(0, 50);
        }
        saveHistory();
    }
}

// Add Ingredient
function addIngredient(name) {
    const normalized = name.toLowerCase().trim();
    
    if (!normalized) {
        showToast('Veuillez entrer un ingrédient', 'error');
        return;
    }

    if (currentIngredients.includes(normalized)) {
        showToast('Cet ingrédient est déjà dans la liste', 'error');
        return;
    }

    currentIngredients.push(normalized);
    addToHistory(normalized);
    saveIngredients();
    renderIngredients();
    renderPopularIngredients();
    ingredientInput.value = '';
    suggestions.classList.remove('show');
    
    showToast(`"${name}" ajouté avec succès! ✅`, 'success');
}

// Remove Ingredient
function removeIngredient(name) {
    currentIngredients = currentIngredients.filter(ing => ing !== name);
    saveIngredients();
    renderIngredients();
    renderPopularIngredients();
    showToast(`"${name}" supprimé`, 'success');
}

// Clear All Ingredients
function clearAllIngredients() {
    if (currentIngredients.length === 0) {
        showToast('Aucun ingrédient à supprimer', 'error');
        return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer tous les ingrédients ?')) {
        currentIngredients = [];
        saveIngredients();
        renderIngredients();
        renderPopularIngredients();
        showToast('Tous les ingrédients ont été supprimés', 'success');
    }
}

// Render Ingredients
function renderIngredients() {
    ingredientCount.textContent = `(${currentIngredients.length})`;
    
    if (currentIngredients.length === 0) {
        emptyState.style.display = 'block';
        ingredientsList.innerHTML = '';
        ingredientsList.appendChild(emptyState);
        return;
    }

    emptyState.style.display = 'none';
    ingredientsList.innerHTML = '';

    currentIngredients.forEach(ingredient => {
        const info = getIngredientInfo(ingredient);
        const item = document.createElement('div');
        item.className = 'ingredient-item';
        item.innerHTML = `
            ${info.image ? 
                `<img src="${info.image}" alt="${ingredient}" class="ingredient-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                ''
            }
            <div class="ingredient-icon" style="${info.image ? 'display: none;' : ''}">
                <i class="fas ${info.icon}"></i>
            </div>
            <div class="ingredient-info">
                <span class="ingredient-name">${ingredient}</span>
                <span class="ingredient-category">${info.category}</span>
            </div>
            <button class="ingredient-remove" onclick="removeIngredient('${ingredient}')" aria-label="Supprimer ${ingredient}">
                <i class="fas fa-times"></i>
            </button>
        `;
        ingredientsList.appendChild(item);
    });
}

// Show History Modal
function showHistoryModal() {
    renderHistory();
    historyModal.classList.add('show');
}

function closeHistoryModalHandler() {
    historyModal.classList.remove('show');
    document.querySelectorAll('.history-item input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.closest('.history-item').classList.remove('selected');
    });
}

function renderHistory() {
    if (ingredientHistory.length === 0) {
        emptyHistory.style.display = 'block';
        historyList.innerHTML = '';
        historyList.appendChild(emptyHistory);
        return;
    }

    emptyHistory.style.display = 'none';
    historyList.innerHTML = '';

    const availableHistory = ingredientHistory.filter(ing => !currentIngredients.includes(ing));

    if (availableHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-check-circle"></i>
                <p>Tous les ingrédients de l'historique sont déjà ajoutés</p>
            </div>
        `;
        return;
    }

    availableHistory.forEach(ingredient => {
        const info = getIngredientInfo(ingredient);
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <input type="checkbox" id="hist-${ingredient}" value="${ingredient}">
            <div class="popular-item-icon" style="width: 30px; height: 30px; font-size: 1rem;">
                <i class="fas ${info.icon}"></i>
            </div>
            <label for="hist-${ingredient}" class="history-item-label">${ingredient}</label>
        `;

        const checkbox = item.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            item.classList.toggle('selected', checkbox.checked);
        });

        historyList.appendChild(item);
    });
}

function addSelectedFromHistoryHandler() {
    const selected = Array.from(document.querySelectorAll('.history-item input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    if (selected.length === 0) {
        showToast('Veuillez sélectionner au moins un ingrédient', 'error');
        return;
    }

    selected.forEach(ingredient => {
        if (!currentIngredients.includes(ingredient)) {
            currentIngredients.push(ingredient);
        }
    });

    saveIngredients();
    renderIngredients();
    renderPopularIngredients();
    closeHistoryModalHandler();
    showToast(`${selected.length} ingrédient(s) ajouté(s) depuis l'historique! ✅`, 'success');
}

// Input Suggestions
function showSuggestions() {
    const value = ingredientInput.value.toLowerCase().trim();
    
    if (value.length < 2) {
        suggestions.classList.remove('show');
        return;
    }

    const filtered = commonIngredients.filter(ing => 
        ing.toLowerCase().includes(value) && 
        !currentIngredients.includes(ing.toLowerCase())
    ).slice(0, 5);

    if (filtered.length === 0) {
        suggestions.classList.remove('show');
        return;
    }

    suggestions.innerHTML = filtered.map(ing => {
        const info = getIngredientInfo(ing);
        return `
            <div class="suggestion-item" onclick="selectSuggestion('${ing}')">
                <div class="suggestion-icon">
                    <i class="fas ${info.icon}"></i>
                </div>
                <span>${ing}</span>
            </div>
        `;
    }).join('');

    suggestions.classList.add('show');
}

function selectSuggestion(ingredient) {
    ingredientInput.value = ingredient;
    suggestions.classList.remove('show');
    addIngredient(ingredient);
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
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    addBtn.addEventListener('click', () => {
        addIngredient(ingredientInput.value);
    });

    ingredientInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addIngredient(ingredientInput.value);
        }
    });

    ingredientInput.addEventListener('input', showSuggestions);

    clearAllBtn.addEventListener('click', clearAllIngredients);

    addFromHistoryBtn.addEventListener('click', showHistoryModal);
    closeHistoryModal.addEventListener('click', closeHistoryModalHandler);
    addSelectedFromHistory.addEventListener('click', addSelectedFromHistoryHandler);

    historyModal.addEventListener('click', (e) => {
        if (e.target === historyModal) {
            closeHistoryModalHandler();
        }
    });

    document.addEventListener('click', (e) => {
        if (!inputSection.contains(e.target)) {
            suggestions.classList.remove('show');
        }
    });
}

// Make functions global for onclick handlers
window.removeIngredient = removeIngredient;
window.selectSuggestion = selectSuggestion;
window.addIngredient = addIngredient;

// Get input section for outside click detection
const inputSection = document.querySelector('.input-section');

// Initialize on load
window.addEventListener('DOMContentLoaded', init);