// afterlogin.js — simple tab logic, sample data, search and favorites
document.addEventListener('DOMContentLoaded', () => {
	const tabs = Array.from(document.querySelectorAll('.tab-btn'));
	const panels = Array.from(document.querySelectorAll('.tab-panel'));

	function activateTab(tabName) {
		tabs.forEach(t => t.dataset.tab === tabName ? t.classList.add('active') : t.classList.remove('active'));
		panels.forEach(p => p.id === tabName ? p.classList.add('active') : p.classList.remove('active'));
	}

	tabs.forEach(t => t.addEventListener('click', () => activateTab(t.dataset.tab)));

	// Load product data from local front-end DB (fallback for backend)
	let sampleProducts = [];

	const houssamDishesSample = [
		{ id: 'h1', name: "Bowl énergisant", author: 'Houssam' },
		{ id: 'h2', name: "Salade protéinée", author: 'Houssam' }
	];

	const productsEl = document.getElementById('products');
	const favoritesEl = document.getElementById('favorites');
	const myDishesEl = document.getElementById('myDishes');
	const houssamEl = document.getElementById('houssamDishes');

	// Plate builder state
	const plateThumbnails = document.getElementById('plateThumbnails');
	const plateInfo = document.getElementById('plateInfo');
	const prepareBtn = document.getElementById('prepareMealBtn');
	const clearPlateBtn = document.getElementById('clearPlateBtn');
	const prepareStatus = document.getElementById('prepareStatus');
	const preparedDishEl = document.getElementById('preparedDish');
	let currentPlate = [];

	let favorites = JSON.parse(localStorage.getItem('mm:favorites') || '[]');
	let myDishes = JSON.parse(localStorage.getItem('mm:mydishes') || '[]');

	function renderCards(list, container, options = {}) {
		container.innerHTML = '';
		list.forEach(item => {
			const card = document.createElement('article');
			card.className = 'card';
			// If this container is the favorites list, render a richer card with photo(s)
			if (container && container.id === 'favorites') {
				let imageHtml = '';
				if (item.image) {
					imageHtml = `<div class="fav-image"><img src="${item.image}" alt="${item.name}"></div>`;
				} else if (item.ingredients && Array.isArray(item.ingredients) && item.ingredients.length > 0) {
					// try to map ingredient names to available sampleProducts images
					const thumbs = item.ingredients.slice(0,4).map(ingName => {
						const found = sampleProducts.find(p => p.name.toLowerCase() === String(ingName).toLowerCase());
						return found && found.image ? `<img src="${found.image}" alt="${found.name}" title="${found.name}">` : '';
					}).join('');
					imageHtml = `<div class="fav-image fav-canvas">${thumbs}</div>`;
				} else {
					imageHtml = `<div class="fav-image"><img src="../assets/img/png.png" alt="placeholder"></div>`; // fallback placeholder
				}

				card.innerHTML = `
					<div style="display:flex;gap:0.9rem;align-items:center">
						${imageHtml}
						<div class="card-body">
							<h4 class="card-title">${item.name}</h4>
							${item.kcal ? `<p class="muted">${item.kcal} kcal</p>` : ''}
							${item.totals ? `<p class="muted">Calories totales: <strong>${Math.round(item.totals.kcal)}</strong></p>` : ''}
						</div>
					</div>
					<div class="card-actions">
						<button class="btn small" data-id="${item.id}" onclick="alert('Ouvrir le plat : ${item.name}')">Voir</button>
						<button class="btn small" data-id="${item.id}">Retirer</button>
					</div>
				`;
			} else {
				card.innerHTML = `
					<div style="display:flex;gap:0.75rem;align-items:center">
					  <img src="${item.image || ''}" alt="${item.name}" style="width:72px;height:72px;object-fit:cover;border-radius:8px;border:1px solid rgba(0,0,0,0.06)">
					  <div class="card-body">
						<h4 class="card-title">${item.name}</h4>
						${item.kcal ? `<p class="muted">${item.kcal} kcal</p>` : ''}
					  </div>
					</div>
					<div class="card-actions">
						<button class="btn small add-to-plate" data-id="${item.id}">Ajouter à l'assiette</button>
						<button class="btn small add-fav" data-id="${item.id}">Favoris</button>
					</div>
				`;
			}
			container.appendChild(card);
		});
	}

	function renderAll() {
		renderCards(sampleProducts, productsEl);
		renderCards(favorites, favoritesEl);
		if (myDishesEl) renderCards(myDishes, myDishesEl);
		renderCards(houssamDishesSample, houssamEl);
		renderPlatePreview();
	}

	// delegate actions (add to favorites / add to plate)
	document.body.addEventListener('click', (e) => {
		if (e.target.matches('.add-fav')) {
			const id = e.target.dataset.id;
			const found = sampleProducts.find(p => String(p.id) === String(id)) || houssamDishesSample.find(p => String(p.id) === String(id)) || myDishes.find(p => String(p.id) === String(id));
			if (found) {
				if (!favorites.find(f => f.id === found.id)) {
					favorites.push(found);
					localStorage.setItem('mm:favorites', JSON.stringify(favorites));
					renderAll();
				}
			}
		}

		if (e.target.matches('.add-to-plate')) {
			const id = e.target.dataset.id;
			const found = sampleProducts.find(p => String(p.id) === String(id));
			if (found) {
				addToPlate(found);
			}
		}

		if (e.target.matches('.plate-remove')) {
			const id = e.target.dataset.id;
			removeFromPlate(id);
		}
	});

	// create dish
	const createForm = document.getElementById('createForm');
	createForm && createForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = document.getElementById('dishName').value.trim();
		const ingredients = document.getElementById('dishIngredients').value.trim();
		if (!name) return alert('Donnez un nom au plat');
		const dish = { id: 'my_' + Date.now(), name, ingredients };
		myDishes.unshift(dish);
		localStorage.setItem('mm:mydishes', JSON.stringify(myDishes));
		document.getElementById('dishName').value = '';
		document.getElementById('dishIngredients').value = '';
		renderAll();
		activateTab('creer');
	});

	// reset create
	const resetBtn = document.getElementById('resetCreate');
	resetBtn && resetBtn.addEventListener('click', () => {
		document.getElementById('dishName').value = '';
		document.getElementById('dishIngredients').value = '';
	});

	// houssam search
	const houssamSearch = document.getElementById('houssamSearch');
	houssamSearch && houssamSearch.addEventListener('input', () => {
		const q = houssamSearch.value.trim().toLowerCase();
		const filtered = houssamDishesSample.filter(d => d.name.toLowerCase().includes(q));
		renderCards(filtered, houssamEl);
	});

	// global search: switch to supermarket and filter
	const globalSearch = document.getElementById('globalSearch');
	globalSearch && globalSearch.addEventListener('input', () => {
		const q = globalSearch.value.trim().toLowerCase();
		activateTab('supermarche');
		const filtered = sampleProducts.filter(p => p.name.toLowerCase().includes(q));
		renderCards(filtered, productsEl);
	});

	// Plate builder functions
	function addToPlate(item) {
		if (currentPlate.find(i => i.id === item.id)) return;
		currentPlate.push(item);
		renderPlatePreview();
	}

	function removeFromPlate(id) {
		currentPlate = currentPlate.filter(i => i.id !== id);
		renderPlatePreview();
	}

	function renderPlatePreview() {
		plateThumbnails.innerHTML = '';
		if (currentPlate.length === 0) {
			plateInfo.textContent = 'Aucun aliment sélectionné';
			return;
		}
		plateInfo.textContent = `${currentPlate.length} aliment(s) dans l'assiette`;
		currentPlate.forEach(item => {
			const thumb = document.createElement('div');
			thumb.className = 'plate-thumb';
			thumb.innerHTML = `
				<img src="${item.image || ''}" alt="${item.name}" title="${item.name}">
				<button class="plate-remove" data-id="${item.id}" aria-label="Retirer ${item.name}">&times;</button>
			`;
			plateThumbnails.appendChild(thumb);
		});
	}

	// Prepare meal animation + calculation
	prepareBtn && prepareBtn.addEventListener('click', async () => {
		if (currentPlate.length === 0) return alert('Sélectionnez d\'abord des aliments pour préparer le plat.');
		// show progress
		prepareStatus.innerHTML = `<div class="prep-overlay"><div class="prep-spinner"></div><div class="prep-text">Préparation en cours...</div></div>`;
		// simulate async processing (2s)
		await new Promise(r => setTimeout(r, 1800));
		prepareStatus.innerHTML = '';
		// compute totals
		const totals = currentPlate.reduce((acc, it) => {
			acc.kcal += (it.kcal || 0);
			acc.protein += (it.protein || 0);
			acc.carbs += (it.carbs || 0);
			acc.fat += (it.fat || 0);
			return acc;
		}, { kcal: 0, protein: 0, carbs: 0, fat: 0 });

		// generate a simple composed dish card
		preparedDishEl.innerHTML = `
			<div class="card">
				<div style="display:flex;gap:1rem;align-items:center">
					<div class="dish-canvas">
						${currentPlate.map(it => `<img src="${it.image || ''}" alt="${it.name}" title="${it.name}">`).join('')}
					</div>
					<div style="flex:1">
						<h3>Plat préparé</h3>
						<p class="muted">${currentPlate.map(it => it.name).join(' · ')}</p>
						<ul class="muted" style="margin:0.5rem 0;padding-left:1rem">
							<li>Calories totales: <strong>${Math.round(totals.kcal)} kcal</strong></li>
							<li>Protéines: <strong>${(totals.protein).toFixed(1)} g</strong></li>
							<li>Glucides: <strong>${(totals.carbs).toFixed(1)} g</strong></li>
							<li>Lipides: <strong>${(totals.fat).toFixed(1)} g</strong></li>
						</ul>
					</div>
				</div>
			</div>
		`;

		// Optionally save to myDishes
		const dish = { id: 'plate_' + Date.now(), name: 'Plat personnalisé', ingredients: currentPlate.map(i => i.name), totals };
		myDishes.unshift(dish);
		localStorage.setItem('mm:mydishes', JSON.stringify(myDishes));
		renderAll();
	});

	clearPlateBtn && clearPlateBtn.addEventListener('click', () => {
		currentPlate = [];
		renderPlatePreview();
		preparedDishEl.innerHTML = '';
	});

	// load ingredients DB then initial render
	fetch('../assets/db/ingredients.json')
		.then(r => r.json())
		.then(data => {
			sampleProducts = data;
			renderAll();
		})
		.catch(err => {
			console.warn('Could not load local DB, falling back to samples', err);
			sampleProducts = [
				{ id: 1, name: 'Pomme', kcal: 52 },
				{ id: 2, name: 'Poulet (100g)', kcal: 239 },
			];
			renderAll();
		});
});

