# MealMate - GitHub Backlog & Milestones

## 📋 Instructions pour créer les Milestones et Issues

### Méthode 1: Via l'interface GitHub
1. Allez dans votre repository GitHub
2. Cliquez sur "Issues" → "Milestones"
3. Créez chaque milestone avec les dates et descriptions ci-dessous
4. Créez les issues et assignez-les aux milestones correspondants

### Méthode 2: Via GitHub CLI
```bash
# Créer un milestone
gh milestone create "Milestone 1: MVP Core Features" --due-date "2024-12-31" --description "..."

# Créer une issue
gh issue create --title "US-001: User Registration" --body-file issue_template.md --milestone "Milestone 1"
```

---

## 🎯 MILESTONES

### Milestone 1: MVP Core Features
**Due Date**: 2024-12-31  
**Description**: Fonctionnalités essentielles pour le MVP - Authentification, Génération de repas AI, Gestion des ingrédients

**Issues**: US-001, US-002, US-005, US-006, US-009, US-010, US-011, US-013, US-014, US-028

---

### Milestone 2: User Experience & Profile
**Due Date**: 2025-01-31  
**Description**: Amélioration de l'expérience utilisateur, gestion du profil, et tracking nutritionnel de base

**Issues**: US-003, US-004, US-007, US-012, US-015, US-017, US-018, US-019, US-020, US-027

---

### Milestone 3: Advanced Features
**Due Date**: 2025-02-28  
**Description**: Fonctionnalités avancées - Statistiques, Meal Prep, Gamification

**Issues**: US-008, US-016, US-021, US-022, US-025, US-029, US-030

---

### Milestone 4: Backend & API Improvements
**Due Date**: 2025-03-31  
**Description**: Améliorations backend, sécurité, et intégration complète

**Issues**: US-031, US-032, US-033, US-034

---

### Milestone 5: Meal Planning & Social
**Due Date**: 2025-04-30  
**Description**: Planification de repas, listes de courses, partage social

**Issues**: US-023, US-024, US-026

---

### Milestone 6: Testing & Quality
**Due Date**: 2025-05-31  
**Description**: Tests complets, qualité du code, documentation

**Issues**: US-035, US-036, US-037

---

## 📝 ISSUES TEMPLATES

### Epic 1: User Authentication & Profile Management

#### US-001: User Registration
**Milestone**: Milestone 1  
**Labels**: `enhancement`, `authentication`, `high-priority`  
**Story Points**: 3

**Description**:
En tant qu'utilisateur non inscrit, je veux pouvoir créer un compte avec un nom d'utilisateur, un email et un mot de passe, afin d'accéder aux fonctionnalités personnalisées de l'application.

**Acceptance Criteria**:
- [ ] L'utilisateur peut entrer un nom d'utilisateur (minimum 3 caractères), un email valide, et un mot de passe (minimum 6 caractères)
- [ ] La confirmation du mot de passe doit correspondre
- [ ] Un indicateur de force du mot de passe affiche un retour visuel
- [ ] Message de succès affiché après l'inscription
- [ ] Gestion des erreurs pour emails/noms d'utilisateur en double
- [ ] Redirection vers la page de connexion après inscription réussie

**Technical Notes**:
- Backend: Endpoint `/signup` dans `routes_auth.py`
- Frontend: Formulaire dans `login/index.html`
- Validation: Pydantic schemas pour validation

---

#### US-002: User Login
**Milestone**: Milestone 1  
**Labels**: `enhancement`, `authentication`, `high-priority`  
**Story Points**: 2

**Description**:
En tant qu'utilisateur inscrit, je veux pouvoir me connecter avec mes identifiants, afin d'accéder à mon compte et à mes données personnelles.

**Acceptance Criteria**:
- [ ] L'utilisateur peut se connecter avec nom d'utilisateur/email et mot de passe
- [ ] Option "Se souvenir de moi" fonctionne
- [ ] Redirection vers le dashboard après connexion réussie
- [ ] Message d'erreur pour identifiants invalides
- [ ] Toggle pour afficher/masquer le mot de passe

**Technical Notes**:
- Backend: Endpoint `/signin` dans `routes_auth.py`
- Frontend: Formulaire dans `login/index.html`
- Session: Gérer la session utilisateur après connexion

---

#### US-003: Password Recovery
**Milestone**: Milestone 2  
**Labels**: `enhancement`, `authentication`, `medium-priority`  
**Story Points**: 5

**Description**:
En tant qu'utilisateur, je veux pouvoir réinitialiser mon mot de passe si je l'ai oublié, afin de retrouver l'accès à mon compte.

**Acceptance Criteria**:
- [ ] Lien "Mot de passe oublié" sur la page de connexion
- [ ] L'utilisateur peut entrer son email pour recevoir un lien de réinitialisation
- [ ] Le lien de réinitialisation expire après 24 heures
- [ ] L'utilisateur peut définir un nouveau mot de passe via le lien
- [ ] Email de réinitialisation envoyé (via service email)

**Technical Notes**:
- Backend: Nouveaux endpoints `/forgot-password` et `/reset-password`
- Frontend: Page `forgot-pass/index.html` à compléter
- Email: Intégrer service d'envoi d'emails (SendGrid, SMTP, etc.)

---

#### US-004: Profile Management
**Milestone**: Milestone 2  
**Labels**: `enhancement`, `profile`, `medium-priority`  
**Story Points**: 3

**Description**:
En tant qu'utilisateur connecté, je veux pouvoir visualiser et modifier les informations de mon profil, afin de garder mes données à jour.

**Acceptance Criteria**:
- [ ] Visualiser le profil avec nom d'utilisateur, email, avatar
- [ ] Modifier le nom d'utilisateur et l'email
- [ ] Uploader/changer la photo de profil
- [ ] Sauvegarder les modifications avec validation
- [ ] Message de confirmation après modification

**Technical Notes**:
- Backend: Endpoint `/api/users/profile` (GET, PUT)
- Frontend: Page `profile/index.html` à compléter
- Storage: Gérer l'upload d'images (Supabase Storage ou autre)

---

### Epic 2: Ingredient Selection & Management

#### US-005: Add Ingredients
**Milestone**: Milestone 1  
**Labels**: `feature`, `ingredients`, `high-priority`  
**Story Points**: 3

**Description**:
En tant qu'utilisateur, je veux pouvoir ajouter les ingrédients que j'ai disponibles, afin de générer des suggestions de repas personnalisées.

**Acceptance Criteria**:
- [ ] Rechercher/taper le nom d'un ingrédient
- [ ] Suggestions d'autocomplétion apparaissent
- [ ] Cliquer sur les ingrédients populaires pour les ajouter
- [ ] Ajouter depuis l'historique des ingrédients
- [ ] Feedback visuel quand un ingrédient est ajouté
- [ ] Maximum 20 ingrédients par session

**Technical Notes**:
- Frontend: Page `page_des_ingredients/index.html` (déjà partiellement implémentée)
- Backend: Optionnel - API pour suggestions d'ingrédients
- Storage: LocalStorage actuellement, migrer vers backend

---

#### US-006: Remove Ingredients
**Milestone**: Milestone 1  
**Labels**: `feature`, `ingredients`, `high-priority`  
**Story Points**: 1

**Description**:
En tant qu'utilisateur, je veux pouvoir supprimer des ingrédients de ma liste, afin de mettre à jour mes ingrédients disponibles.

**Acceptance Criteria**:
- [ ] Supprimer des ingrédients individuels
- [ ] Bouton "Tout effacer" avec confirmation
- [ ] Liste mise à jour immédiatement
- [ ] Compteur mis à jour automatiquement

**Technical Notes**:
- Frontend: Déjà implémenté dans `ingredient.js`
- Améliorer: Confirmation avant suppression

---

#### US-007: Ingredient History
**Milestone**: Milestone 2  
**Labels**: `enhancement`, `ingredients`, `medium-priority`  
**Story Points**: 2

**Description**:
En tant qu'utilisateur, je veux voir mes ingrédients précédemment utilisés, afin de pouvoir les ajouter rapidement à nouveau.

**Acceptance Criteria**:
- [ ] Modal d'historique affiche les 50 derniers ingrédients
- [ ] Sélectionner plusieurs ingrédients depuis l'historique
- [ ] Ajouter les ingrédients sélectionnés à la liste actuelle
- [ ] Historique persiste entre les sessions

**Technical Notes**:
- Frontend: Déjà partiellement implémenté dans `ingredient.js`
- Backend: Sauvegarder l'historique dans la base de données

---

#### US-008: Ingredient Categories
**Milestone**: Milestone 3  
**Labels**: `enhancement`, `ingredients`, `low-priority`  
**Story Points**: 2

**Description**:
En tant qu'utilisateur, je veux voir les ingrédients organisés par catégorie, afin de trouver facilement les ingrédients.

**Acceptance Criteria**:
- [ ] Ingrédients groupés par catégorie (Viande, Légumes, Fruits, etc.)
- [ ] Icônes/couleurs pour chaque catégorie
- [ ] Filtrer par catégorie
- [ ] Catégorie affichée sur les cartes d'ingrédients

**Technical Notes**:
- Frontend: Déjà partiellement implémenté (catégories dans `ingredientDatabase`)
- Améliorer: Filtres par catégorie

---

### Epic 3: AI Meal Generation

#### US-009: Generate Meal from Ingredients
**Milestone**: Milestone 1  
**Labels**: `feature`, `ai`, `high-priority`  
**Story Points**: 5

**Description**:
En tant qu'utilisateur, je veux générer une suggestion de repas à partir de mes ingrédients, afin de savoir quoi cuisiner.

**Acceptance Criteria**:
- [ ] Cliquer sur "Générer un repas" avec au moins 1 ingrédient
- [ ] Indicateur de chargement pendant la génération
- [ ] Afficher le repas avec: nom, description, instructions, nutrition, image
- [ ] Gestion des erreurs si l'API échoue
- [ ] Fallback vers génération locale si API indisponible

**Technical Notes**:
- Backend: Endpoint `/api/meals/generate` (déjà implémenté)
- Frontend: Intégration dans `afterlogin.js` (déjà partiellement implémentée)
- AI: Service `ai_meal_service.py` utilise Google Gemini

---

#### US-010: View Meal Instructions
**Milestone**: Milestone 1  
**Labels**: `feature`, `meals`, `high-priority`  
**Story Points**: 1

**Description**:
En tant qu'utilisateur, je veux voir les instructions de cuisson détaillées, afin de pouvoir préparer le repas.

**Acceptance Criteria**:
- [ ] Instructions étape par étape affichées
- [ ] Instructions numérotées et claires
- [ ] Instructions en français
- [ ] Format facile à lire

**Technical Notes**:
- Déjà implémenté dans la réponse de l'API
- Améliorer: Formatage et présentation

---

#### US-011: View Meal Nutrition
**Milestone**: Milestone 1  
**Labels**: `feature`, `nutrition`, `high-priority`  
**Story Points**: 2

**Description**:
En tant qu'utilisateur, je veux voir les informations nutritionnelles des repas générés, afin de suivre mon apport.

**Acceptance Criteria**:
- [ ] Afficher les calories (kcal)
- [ ] Afficher les macros: protéines, glucides, lipides (en grammes)
- [ ] Nutrition affichée clairement
- [ ] Peut être ajouté au suivi quotidien

**Technical Notes**:
- Déjà implémenté dans `estimated_nutrition` de l'API
- Améliorer: Intégration avec le tracking nutritionnel

---

#### US-012: Generate Multiple Meal Options
**Milestone**: Milestone 2  
**Labels**: `enhancement`, `ai`, `medium-priority`  
**Story Points**: 5

**Description**:
En tant qu'utilisateur, je veux voir plusieurs suggestions de repas, afin d'avoir de la variété.

**Acceptance Criteria**:
- [ ] Générer 3-5 options de repas à la fois
- [ ] Afficher comme cartes avec aperçu
- [ ] L'utilisateur peut sélectionner le repas préféré
- [ ] Chaque repas a des détails complets

**Technical Notes**:
- Backend: Modifier `/api/meals/generate` pour accepter paramètre `count`
- Frontend: Afficher plusieurs cartes de repas

---

### Epic 4: Meal Favorites & Management

#### US-013: Save Meal to Favorites
**Milestone**: Milestone 1  
**Labels**: `feature`, `favorites`, `high-priority`  
**Story Points**: 2

**Description**:
En tant qu'utilisateur, je veux sauvegarder les repas générés dans mes favoris, afin d'y accéder plus tard.

**Acceptance Criteria**:
- [ ] Bouton "Sauvegarder dans les favoris" sur la carte de repas
- [ ] Message de confirmation quand sauvegardé
- [ ] Repas apparaît dans la page des favoris
- [ ] Prévention des doublons

**Technical Notes**:
- Backend: Endpoint `/api/meals/favorites` (POST)
- Frontend: Bouton sur les cartes de repas
- Database: Table `favorite_meals` dans Supabase

---

#### US-014: View Favorites
**Milestone**: Milestone 1  
**Labels**: `feature`, `favorites`, `high-priority`  
**Story Points**: 2

**Description**:
En tant qu'utilisateur, je veux voir tous mes repas favoris sauvegardés, afin d'y accéder rapidement.

**Acceptance Criteria**:
- [ ] Page des favoris affiche tous les repas sauvegardés
- [ ] Cartes de repas montrent nom, image, nutrition
- [ ] Cliquer pour voir les détails complets
- [ ] État vide quand aucun favori

**Technical Notes**:
- Frontend: Page `page_favoris/index.html` (déjà créée)
- Backend: Endpoint `/api/meals/favorites` (GET)
- Améliorer: Récupérer depuis la base de données

---

#### US-015: Search Favorites
**Milestone**: Milestone 2  
**Labels**: `enhancement`, `favorites`, `medium-priority`  
**Story Points**: 2

**Description**:
En tant qu'utilisateur, je veux rechercher dans mes repas favoris, afin de trouver des repas spécifiques rapidement.

**Acceptance Criteria**:
- [ ] Barre de recherche filtre par nom de repas
- [ ] Filtrage en temps réel pendant la saisie
- [ ] Bouton pour effacer la recherche
- [ ] Résultats mis à jour instantanément

**Technical Notes**:
- Frontend: Déjà partiellement implémenté dans `page_favoris/script.js`
- Améliorer: Recherche côté serveur pour grandes listes

---

#### US-016: Sort Favorites
**Milestone**: Milestone 3  
**Labels**: `enhancement`, `favorites`, `low-priority`  
**Story Points**: 2

**Description**:
En tant qu'utilisateur, je veux trier mes favoris selon différents critères, afin de les organiser.

**Acceptance Criteria**:
- [ ] Trier par: date d'ajout, nom (A-Z), calories (croissant/décroissant), protéines
- [ ] Sélecteur dropdown
- [ ] Résultats réorganisés immédiatement

**Technical Notes**:
- Frontend: Déjà partiellement implémenté dans `page_favoris/index.html`
- Améliorer: Logique de tri

---

#### US-017: Remove from Favorites
**Milestone**: Milestone 2  
**Labels**: `feature`, `favorites`, `medium-priority`  
**Story Points**: 1

**Description**:
En tant qu'utilisateur, je veux supprimer des repas de mes favoris, afin de gérer ma liste.

**Acceptance Criteria**:
- [ ] Bouton supprimer sur chaque carte de favori
- [ ] Confirmation avant suppression
- [ ] Repas retiré de la liste immédiatement
- [ ] Compteur mis à jour

**Technical Notes**:
- Backend: Endpoint `/api/meals/favorites/{meal_id}` (DELETE)
- Frontend: Bouton sur les cartes

---

### Epic 5: Nutrition Tracking

#### US-018: Daily Calorie Tracking
**Milestone**: Milestone 2  
**Labels**: `feature`, `nutrition`, `high-priority`  
**Story Points**: 5

**Description**:
En tant qu'utilisateur, je veux suivre mon apport calorique quotidien, afin d'atteindre mes objectifs.

**Acceptance Criteria**:
- [ ] Définir un objectif calorique quotidien
- [ ] Enregistrer les repas avec leurs calories
- [ ] Barre de progression montre le progrès quotidien
- [ ] Indicateur visuel (vert/jaune/rouge)

**Technical Notes**:
- Backend: Endpoints pour tracking nutritionnel
- Frontend: Dashboard dans `profile/index.html`
- Database: Table `daily_nutrition` dans Supabase

---

#### US-019: Macro Tracking
**Milestone**: Milestone 2  
**Labels**: `feature`, `nutrition`, `high-priority`  
**Story Points**: 5

**Description**:
En tant qu'utilisateur, je veux suivre les protéines, glucides et lipides, afin d'équilibrer ma nutrition.

**Acceptance Criteria**:
- [ ] Afficher les totaux quotidiens pour protéines, glucides, lipides
- [ ] Barres de progression pour chaque macro
- [ ] Définir des objectifs de macros
- [ ] Pourcentage de l'objectif atteint

**Technical Notes**:
- Backend: Calcul des macros depuis les repas
- Frontend: Graphiques dans le profil
- Charts: Utiliser Chart.js (déjà inclus)

---

#### US-020: Weight Tracking
**Milestone**: Milestone 2  
**Labels**: `feature`, `profile`, `high-priority`  
**Story Points**: 5

**Description**:
En tant qu'utilisateur, je veux enregistrer mon poids au fil du temps, afin de suivre ma progression.

**Acceptance Criteria**:
- [ ] Ajouter une entrée de poids avec date
- [ ] Voir l'historique du poids en graphique
- [ ] Définir un objectif de poids
- [ ] Pourcentage de progression vers l'objectif
- [ ] Visualisation de progression (anneau/graphique)

**Technical Notes**:
- Backend: Endpoint `/api/users/weight` (POST, GET)
- Frontend: Section dans `profile/index.html` (déjà créée)
- Database: Table `weight_entries` dans Supabase

---

#### US-021: Nutrition Statistics
**Milestone**: Milestone 3  
**Labels**: `enhancement`, `nutrition`, `medium-priority`  
**Story Points**: 8

**Description**:
En tant qu'utilisateur, je veux voir des statistiques et graphiques nutritionnels, afin d'analyser ma progression.

**Acceptance Criteria**:
- [ ] Graphiques de calories hebdomadaires/mensuels
- [ ] Graphique en camembert de répartition des macros
- [ ] Graphique de tendance du poids
- [ ] Moyennes quotidiennes de macros
- [ ] Option d'export des données

**Technical Notes**:
- Frontend: Charts dans `profile/index.html` (déjà créés)
- Backend: Endpoints pour statistiques agrégées
- Charts: Chart.js pour visualisations

---

### Epic 6: Meal Prep & Planning

#### US-022: Meal Prep Streak
**Milestone**: Milestone 3  
**Labels**: `enhancement`, `gamification`, `medium-priority`  
**Story Points**: 3

**Description**:
En tant qu'utilisateur, je veux suivre ma série de meal prep, afin de rester motivé.

**Acceptance Criteria**:
- [ ] Compteur de série (jours/semaines consécutifs)
- [ ] Indicateur visuel de série
- [ ] Série réinitialisée si manquée
- [ ] Badges pour jalons (7 jours, 30 jours, etc.)

**Technical Notes**:
- Backend: Calcul de la série basé sur les repas préparés
- Frontend: Affichage dans `profile/index.html` (déjà créé)
- Database: Suivre les dates de meal prep

---

#### US-023: Weekly Meal Planning
**Milestone**: Milestone 5  
**Labels**: `feature`, `planning`, `low-priority`  
**Story Points**: 8

**Description**:
En tant qu'utilisateur, je veux planifier les repas de la semaine, afin de meal prep efficacement.

**Acceptance Criteria**:
- [ ] Vue calendrier pour la semaine
- [ ] Ajouter des repas à des jours spécifiques
- [ ] Glisser-déposer des repas
- [ ] Génération de liste de courses
- [ ] Imprimer/exporter le plan de repas

**Technical Notes**:
- Frontend: Nouvelle page ou section
- Backend: Endpoints pour meal planning
- Database: Table `meal_plans` dans Supabase

---

#### US-024: Shopping List Generation
**Milestone**: Milestone 5  
**Labels**: `feature`, `planning`, `low-priority`  
**Story Points**: 5

**Description**:
En tant qu'utilisateur, je veux générer une liste de courses depuis mon plan de repas, afin de savoir quoi acheter.

**Acceptance Criteria**:
- [ ] Générer liste depuis les repas sélectionnés
- [ ] Grouper les ingrédients par catégorie
- [ ] Cocher les articles achetés
- [ ] Exporter en texte/PDF

**Technical Notes**:
- Backend: Algorithme de regroupement d'ingrédients
- Frontend: Page de liste de courses
- Export: Bibliothèque pour génération PDF

---

### Epic 7: Social & Gamification

#### US-025: Achievement Badges
**Milestone**: Milestone 3  
**Labels**: `enhancement`, `gamification`, `low-priority`  
**Story Points**: 3

**Description**:
En tant qu'utilisateur, je veux gagner des badges pour les jalons, afin de rester motivé.

**Acceptance Criteria**:
- [ ] Badges pour: séries, semaines de meal prep, objectifs de perte de poids
- [ ] Affichage des badges sur le profil
- [ ] Notification quand badge gagné
- [ ] Descriptions des badges

**Technical Notes**:
- Backend: Système de badges et règles
- Frontend: Section badges dans profil (déjà créée)
- Database: Table `user_badges` dans Supabase

---

#### US-026: Share Meals
**Milestone**: Milestone 5  
**Labels**: `feature`, `social`, `low-priority`  
**Story Points**: 3

**Description**:
En tant qu'utilisateur, je veux partager mes repas favoris, afin que d'autres puissent les essayer.

**Acceptance Criteria**:
- [ ] Bouton partager sur les cartes de repas
- [ ] Générer lien partageable
- [ ] Options de partage sur réseaux sociaux
- [ ] Partager par email

**Technical Notes**:
- Frontend: Boutons de partage
- Backend: Génération de liens uniques
- Intégration: APIs de partage social

---

### Epic 8: UI/UX Enhancements

#### US-027: Dark Mode
**Milestone**: Milestone 2  
**Labels**: `enhancement`, `ui`, `medium-priority`  
**Story Points**: 3

**Description**:
En tant qu'utilisateur, je veux basculer entre thèmes clair et sombre, afin d'utiliser l'app confortablement.

**Acceptance Criteria**:
- [ ] Bouton de bascule de thème
- [ ] Préférence sauvegardée dans localStorage
- [ ] Transition fluide entre thèmes
- [ ] Toutes les pages supportent les deux thèmes

**Technical Notes**:
- Frontend: Déjà partiellement implémenté dans plusieurs pages
- Améliorer: Cohérence sur toutes les pages
- CSS: Variables CSS pour thèmes

---

#### US-028: Responsive Design
**Milestone**: Milestone 1  
**Labels**: `enhancement`, `ui`, `high-priority`  
**Story Points**: 5

**Description**:
En tant qu'utilisateur, je veux utiliser l'app sur mobile, afin d'y accéder partout.

**Acceptance Criteria**:
- [ ] Layout adapté mobile
- [ ] Boutons adaptés au tactile
- [ ] Grilles responsives
- [ ] Menu de navigation mobile
- [ ] Testé sur iOS et Android

**Technical Notes**:
- CSS: Media queries pour responsive
- Frontend: Améliorer toutes les pages
- Testing: Tester sur différents appareils

---

#### US-029: Loading States
**Milestone**: Milestone 3  
**Labels**: `enhancement`, `ui`, `medium-priority`  
**Story Points**: 2

**Description**:
En tant qu'utilisateur, je veux voir des indicateurs de chargement, afin de savoir que l'app fonctionne.

**Acceptance Criteria**:
- [ ] Spinner pendant les appels API
- [ ] Indicateurs de progression
- [ ] Skeleton screens pour chargement de contenu
- [ ] Messages d'erreur clairs

**Technical Notes**:
- Frontend: Composants de chargement réutilisables
- Améliorer: États de chargement partout

---

#### US-030: Accessibility
**Milestone**: Milestone 3  
**Labels**: `enhancement`, `accessibility`, `medium-priority`  
**Story Points**: 5

**Description**:
En tant qu'utilisateur avec handicaps, je veux utiliser l'app avec des lecteurs d'écran, afin d'accéder à toutes les fonctionnalités.

**Acceptance Criteria**:
- [ ] Labels ARIA sur éléments interactifs
- [ ] Support de navigation au clavier
- [ ] Contraste de couleurs conforme WCAG
- [ ] Texte alternatif pour images

**Technical Notes**:
- HTML: Ajouter attributs ARIA
- CSS: Vérifier contraste
- Testing: Tests avec lecteurs d'écran

---

### Epic 9: Backend & API Improvements

#### US-031: JWT Authentication
**Milestone**: Milestone 4  
**Labels**: `enhancement`, `backend`, `high-priority`  
**Story Points**: 5

**Description**:
En tant que développeur, je veux implémenter JWT pour l'authentification, afin que les sessions soient sécurisées et sans état.

**Acceptance Criteria**:
- [ ] Tokens JWT émis à la connexion
- [ ] Mécanisme de rafraîchissement de token
- [ ] Stockage sécurisé des tokens
- [ ] Gestion de l'expiration des tokens

**Technical Notes**:
- Backend: Utiliser `python-jose` pour JWT
- Frontend: Stocker token dans localStorage/sessionStorage
- Security: Refresh tokens pour sécurité

---

#### US-032: Meal Persistence
**Milestone**: Milestone 4  
**Labels**: `enhancement`, `backend`, `high-priority`  
**Story Points**: 5

**Description**:
En tant qu'utilisateur, je veux que mes repas soient sauvegardés en base, afin qu'ils persistent entre appareils.

**Acceptance Criteria**:
- [ ] Sauvegarder repas générés en base
- [ ] Lier repas au compte utilisateur
- [ ] Synchroniser favoris entre appareils
- [ ] Suivi de l'historique des repas

**Technical Notes**:
- Database: Table `meals` dans Supabase
- Backend: Endpoints CRUD pour repas
- Frontend: Synchroniser avec backend

---

#### US-033: User Preferences API
**Milestone**: Milestone 4  
**Labels**: `enhancement`, `backend`, `medium-priority`  
**Story Points**: 3

**Description**:
En tant qu'utilisateur, je veux sauvegarder mes préférences, afin qu'elles soient mémorisées.

**Acceptance Criteria**:
- [ ] Endpoints API pour préférences
- [ ] Sauvegarder objectifs calories/macros
- [ ] Restrictions alimentaires (végétarien, végan, etc.)
- [ ] Gestion des allergies

**Technical Notes**:
- Database: Table `user_preferences` dans Supabase
- Backend: Endpoints GET/PUT pour préférences
- Frontend: Formulaire de préférences

---

#### US-034: Rate Limiting
**Milestone**: Milestone 4  
**Labels**: `enhancement`, `backend`, `medium-priority`  
**Story Points**: 3

**Description**:
En tant que développeur, je veux implémenter le rate limiting, afin de protéger le service contre les abus.

**Acceptance Criteria**:
- [ ] Limites de taux sur génération de repas
- [ ] Limites différentes pour authentifié vs anonyme
- [ ] Messages d'erreur clairs quand limite dépassée
- [ ] Mécanisme de réinitialisation

**Technical Notes**:
- Backend: Utiliser `slowapi` ou middleware FastAPI
- Configuration: Limites par endpoint
- Monitoring: Logger les dépassements

---

### Epic 10: Testing & Quality

#### US-035: Unit Tests
**Milestone**: Milestone 6  
**Labels**: `testing`, `quality`, `medium-priority`  
**Story Points**: 8

**Description**:
En tant que développeur, je veux écrire des tests unitaires pour les services backend, afin de maintenir la qualité du code.

**Acceptance Criteria**:
- [ ] Tests pour service de génération de repas
- [ ] Tests pour service utilisateur
- [ ] Tests pour authentification
- [ ] Couverture de code minimum 80%

**Technical Notes**:
- Framework: `pytest` pour tests Python
- Coverage: `pytest-cov` pour couverture
- CI/CD: Intégrer dans pipeline

---

#### US-036: Integration Tests
**Milestone**: Milestone 6  
**Labels**: `testing`, `quality`, `medium-priority`  
**Story Points**: 5

**Description**:
En tant que développeur, je veux écrire des tests d'intégration pour les endpoints API, afin que l'API fonctionne correctement.

**Acceptance Criteria**:
- [ ] Tests pour tous les endpoints API
- [ ] Tests des flux d'authentification
- [ ] Tests des scénarios d'erreur
- [ ] Intégration CI/CD

**Technical Notes**:
- Framework: `pytest` avec `httpx` pour requêtes
- Database: Base de test séparée
- CI/CD: Tests automatiques

---

#### US-037: E2E Tests
**Milestone**: Milestone 6  
**Labels**: `testing`, `quality`, `low-priority`  
**Story Points**: 8

**Description**:
En tant que développeur, je veux écrire des tests end-to-end, afin que les flux utilisateur fonctionnent correctement.

**Acceptance Criteria**:
- [ ] Tests des parcours utilisateur complets
- [ ] Test du flux de génération de repas
- [ ] Test de gestion des favoris
- [ ] Exécution automatisée des tests

**Technical Notes**:
- Framework: Playwright ou Cypress
- Scenarios: Parcours utilisateur critiques
- CI/CD: Tests E2E dans pipeline

---

## 📊 Summary

**Total Issues**: 37  
**Total Story Points**: 150

**By Priority**:
- High Priority: 10 issues (45 points)
- Medium Priority: 15 issues (68 points)
- Low Priority: 12 issues (37 points)

**By Milestone**:
- Milestone 1 (MVP): 10 issues (45 points)
- Milestone 2 (UX & Profile): 10 issues (38 points)
- Milestone 3 (Advanced): 7 issues (30 points)
- Milestone 4 (Backend): 4 issues (16 points)
- Milestone 5 (Planning & Social): 3 issues (16 points)
- Milestone 6 (Testing): 3 issues (21 points)

---

## 🏷️ Labels Recommandés

Créer ces labels dans GitHub:
- `enhancement` - Nouvelles fonctionnalités
- `feature` - Fonctionnalités principales
- `bug` - Corrections de bugs
- `authentication` - Authentification
- `ai` - Fonctionnalités AI
- `nutrition` - Suivi nutritionnel
- `ingredients` - Gestion ingrédients
- `favorites` - Favoris
- `profile` - Profil utilisateur
- `ui` - Interface utilisateur
- `backend` - Backend/API
- `testing` - Tests
- `quality` - Qualité du code
- `high-priority` - Priorité haute
- `medium-priority` - Priorité moyenne
- `low-priority` - Priorité basse
- `gamification` - Gamification
- `social` - Fonctionnalités sociales
- `planning` - Planification
- `accessibility` - Accessibilité

---

## 🚀 Quick Start Guide

1. **Créer les Milestones**:
   - Aller dans Issues → Milestones
   - Créer chaque milestone avec les dates et descriptions

2. **Créer les Labels**:
   - Aller dans Issues → Labels
   - Créer tous les labels listés ci-dessus

3. **Créer les Issues**:
   - Pour chaque US, créer une issue avec:
     - Titre: "US-XXX: [Titre]"
     - Description: Copier depuis ce document
     - Labels: Assigner les labels appropriés
     - Milestone: Assigner au milestone correspondant
     - Story Points: Ajouter dans la description ou utiliser un plugin

4. **Organiser le Board**:
   - Créer un Project Board dans GitHub
   - Colonnes: Backlog, To Do, In Progress, Review, Done
   - Ajouter les issues au board

---

**Note**: Ce document peut être utilisé comme référence pour créer tous les milestones et issues dans GitHub. Vous pouvez aussi l'importer directement si vous utilisez des outils comme GitHub CLI ou des scripts d'automatisation.
