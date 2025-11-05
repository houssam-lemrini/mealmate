const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});

// Toggle password visibility
function bindPasswordToggles() {
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      }
    });
  });
}

// Password strength meter (simple heuristic)
function bindPasswordStrength() {
  const pwd = document.getElementById('signupPassword');
  const bar = document.getElementById('passwordStrengthBar');
  const label = document.getElementById('passwordStrengthLabel');
  if (!pwd || !bar || !label) return;

  function evaluateStrength(value) {
    let score = 0;
    if (value.length >= 6) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    if (value.length >= 10) score++;
    return Math.min(score, 5);
  }

  function setStrength(score) {
    const width = (score / 5) * 100;
    bar.style.setProperty('--strength-width', width + '%');
    bar.style.position = 'relative';
    bar.style.setProperty('--strength-color', score <= 2 ? '#ef4444' : (score === 3 ? '#f59e0b' : '#10b981'));
    // update pseudo via inline child
    bar.style.background = 'linear-gradient(90deg, var(--strength-color) 0%, var(--strength-color) ' + width + '%, #e5e7eb ' + width + '%, #e5e7eb 100%)';
    label.textContent = score <= 2 ? 'Faible' : (score === 3 ? 'Moyen' : 'Fort');
  }

  pwd.addEventListener('input', () => setStrength(evaluateStrength(pwd.value)));
  setStrength(0);
}

// Confirm password match
function bindConfirmMatch() {
  const pwd = document.getElementById('signupPassword');
  const confirm = document.getElementById('signupConfirm');
  const error = document.getElementById('signupError');
  if (!pwd || !confirm || !error) return;
  function check() {
    if (confirm.value && pwd.value !== confirm.value) {
      error.textContent = 'Les mots de passe ne correspondent pas.';
    } else {
      error.textContent = '';
    }
  }
  pwd.addEventListener('input', check);
  confirm.addEventListener('input', check);
}

// Loading state on submit (demo only)
function bindFormLoading() {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn.solid');
      const error = form.querySelector('.error-text');
      if (btn) {
        btn.classList.add('loading');
        setTimeout(() => {
          btn.classList.remove('loading');
          if (error) error.textContent = '';
          // Place actual submission here
        }, 900);
      }
    });
  });
}

// Init
bindPasswordToggles();
bindPasswordStrength();
bindConfirmMatch();
bindFormLoading();
bindForgotPassword();