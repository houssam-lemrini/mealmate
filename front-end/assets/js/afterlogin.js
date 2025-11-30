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
		if (!container) return;
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
							${item.description ? `<p class="muted" style="font-size:0.9rem;">${item.description}</p>` : ''}
						</div>
					</div>
					<div class="card-actions">
						<button class="btn small" data-id="${item.id}" onclick="alert('Ouvrir le plat : ${item.name}')">Voir</button>
						<button class="btn small remove-fav" data-id="${item.id}">Retirer</button>
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

		if (e.target.matches('.remove-fav')) {
			const id = e.target.dataset.id;
			favorites = favorites.filter(f => f.id !== id);
			localStorage.setItem('mm:favorites', JSON.stringify(favorites));
			renderAll();
		}
	});

	// houssam search
	const houssamSearch = document.getElementById('houssamSearch');
	houssamSearch && houssamSearch.addEventListener('input', () => {
		const q = houssamSearch.value.trim().toLowerCase();
		const filtered = houssamDishesSample.filter(d => d.name.toLowerCase().includes(q));
		renderCards(filtered, houssamEl);
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
		if (!plateThumbnails || !plateInfo) return;
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

	// Prepare meal animation + calculation with AI
	prepareBtn && prepareBtn.addEventListener('click', async () => {
		if (currentPlate.length === 0) return alert('Sélectionnez d\'abord des aliments pour préparer le plat.');
		
		// show progress
		prepareStatus.innerHTML = `<div class="prep-overlay"><div class="prep-spinner"></div><div class="prep-text">L'IA génère votre repas...</div></div>`;
		prepareBtn.disabled = true;
		
		try {
			// Extract ingredient names
			const ingredientNames = currentPlate.map(item => item.name);
			
			// Call AI API (adjust URL if your backend runs on different port)
			const backendUrl = 'http://localhost:8000'; // Change if needed
			const response = await fetch(`${backendUrl}/api/meals/generate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ingredients: ingredientNames })
			});
			
			if (!response.ok) {
				const errorData = await response.json().catch(() => ({ detail: 'Erreur inconnue' }));
				throw new Error(errorData.detail || `Erreur HTTP: ${response.status}`);
			}
			
			const data = await response.json();
			const meal = data.meal;
			
			// Clear status
			prepareStatus.innerHTML = '';
			prepareBtn.disabled = false;
			
			// Display AI-generated meal
			preparedDishEl.innerHTML = `
				<div class="card" style="margin-top: 1rem; padding: 1.5rem;">
					<div style="display: flex; gap: 1.5rem; align-items: flex-start; flex-wrap: wrap;">
						<div style="flex-shrink: 0;">
							<img src="${meal.image_url}" alt="${meal.name}" 
								 style="width: 100%; max-width: 300px; height: 200px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
						</div>
						<div style="flex: 1; min-width: 300px;">
							<h3 style="margin-top: 0; color: var(--color-primary, #4CAF50); font-size: 1.5rem;">${meal.name}</h3>
							<p class="muted" style="margin: 0.75rem 0; line-height: 1.6;">${meal.description}</p>
							
							<div style="margin: 1.25rem 0;">
								<h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--color-primary, #4CAF50);">📝 Instructions de préparation:</h4>
								<ol style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
									${meal.instructions.map((step, idx) => `<li style="margin-bottom: 0.75rem;">${step}</li>`).join('')}
								</ol>
							</div>
							
							${meal.estimated_nutrition ? `
								<div style="margin-top: 1.25rem; padding: 1rem; background: rgba(76, 175, 80, 0.05); border-radius: 8px; border-left: 4px solid var(--color-primary, #4CAF50);">
									<h4 style="font-size: 1rem; margin-bottom: 0.75rem; color: var(--color-primary, #4CAF50);">🍎 Valeurs nutritionnelles estimées:</h4>
									<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
										<div><strong>Calories:</strong> ${Math.round(meal.estimated_nutrition.kcal)} kcal</div>
										<div><strong>Protéines:</strong> ${meal.estimated_nutrition.protein.toFixed(1)} g</div>
										<div><strong>Glucides:</strong> ${meal.estimated_nutrition.carbs.toFixed(1)} g</div>
										<div><strong>Lipides:</strong> ${meal.estimated_nutrition.fat.toFixed(1)} g</div>
									</div>
								</div>
							` : ''}
							
							<div style="margin-top: 1.25rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
								<button class="btn" onclick="addAIMealToFavorites('${meal.name.replace(/'/g, "\\'")}', ${JSON.stringify(meal).replace(/'/g, "\\'")})">
									<i class="fa-solid fa-heart"></i> Ajouter aux favoris
								</button>
								<button class="btn transparent" onclick="clearAIMeal()">
									<i class="fa-solid fa-xmark"></i> Fermer
								</button>
							</div>
						</div>
					</div>
				</div>
			`;
			
			// Optionally save to myDishes
			const dish = {
				id: 'ai_' + Date.now(),
				name: meal.name,
				description: meal.description,
				instructions: meal.instructions,
				image: meal.image_url,
				ingredients: ingredientNames,
				totals: meal.estimated_nutrition || {},
				ai_generated: true
			};
			myDishes.unshift(dish);
			localStorage.setItem('mm:mydishes', JSON.stringify(myDishes));
			renderAll();
			
		} catch (error) {
			console.error('Error generating meal:', error);
			prepareStatus.innerHTML = `<div style="color: #d32f2f; padding: 0.75rem; background: rgba(211, 47, 47, 0.1); border-radius: 8px; margin-top: 0.5rem;">❌ Erreur: ${error.message}</div>`;
			prepareBtn.disabled = false;
		}
	});

	clearPlateBtn && clearPlateBtn.addEventListener('click', () => {
		currentPlate = [];
		renderPlatePreview();
		preparedDishEl.innerHTML = '';
	});

	// Helper function to add AI meal to favorites
	window.addAIMealToFavorites = function(mealName, mealData) {
		const favorite = {
			id: 'fav_ai_' + Date.now(),
			name: mealName,
			image: mealData.image_url,
			description: mealData.description,
			instructions: mealData.instructions,
			totals: mealData.estimated_nutrition || {},
			ai_generated: true
		};
		
		if (!favorites.find(f => f.name === mealName && f.ai_generated)) {
			favorites.push(favorite);
			localStorage.setItem('mm:favorites', JSON.stringify(favorites));
			renderAll();
			alert('Repas ajouté aux favoris! ✅');
		} else {
			alert('Ce repas est déjà dans vos favoris!');
		}
	};

	// Helper function to clear AI meal display
	window.clearAIMeal = function() {
		preparedDishEl.innerHTML = '';
	};

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