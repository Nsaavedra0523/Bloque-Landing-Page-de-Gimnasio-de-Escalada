/* ---------- Menú móvil ---------- */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
burger.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
  burger.textContent = open ? '✕' : '☰';
});
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  drawer.classList.remove('open');
  burger.setAttribute('aria-expanded','false');
  burger.textContent = '☰';
}));

/* ---------- Validación del formulario ---------- */
const form = document.getElementById('signupForm');
const rules = {
  name:  { el:'f-name',  test: v => v.trim().length >= 3, msg:'Escribe tu nombre completo.' },
  email: { el:'f-email', test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg:'Escribe un correo válido, por ejemplo nombre@correo.com.' },
  day:   { el:'f-day',   test: v => v !== '', msg:'Elige el día que te queda mejor.' },
};
function validateField(id){
  const rule = rules[id];
  const input = document.getElementById(id);
  const field = document.getElementById(rule.el);
  const ok = rule.test(input.value);
  field.classList.toggle('invalid', !ok);
  field.querySelector('.msg').textContent = ok ? '' : rule.msg;
  return ok;
}
Object.keys(rules).forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener('blur', () => validateField(id));
  input.addEventListener('input', () => {
    const field = document.getElementById(rules[id].el);
    if(field.classList.contains('invalid')) validateField(id);
  });
});
form.addEventListener('submit', e => {
  e.preventDefault();
  const results = Object.keys(rules).map(validateField);
  if(results.includes(false)){
    document.querySelector('.field.invalid input, .field.invalid select')?.focus();
    return;
  }
  const name = document.getElementById('name').value.trim().split(' ')[0];
  document.getElementById('formZone').innerHTML = `
    <div class="ok">
      <strong>Listo, ${name}</strong>
      <p>Recibimos tu solicitud. Te escribimos al correo registrado en menos de 24 horas para confirmar el horario exacto de tu clase.</p>
    </div>`;
});
