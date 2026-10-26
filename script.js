// API pública: https://dragonball-api.com/
const API = 'https://dragonball-api.com/api/characters';
const $ = id => document.getElementById(id);
let forms = [], selected = 0, character = null;
const clean = value => value === null || value === undefined || value === '' ? 'No disponible' : String(value);

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`No se pudo consultar la API (${response.status}).`);
  return response.json();
}

async function search(name) {
  $('status').textContent = 'Buscando personaje...';
  $('panel').hidden = true;
  try {
    // El endpoint con filtro devuelve un arreglo; el detalle incluye transformaciones.
    const result = await fetchJSON(`${API}?name=${encodeURIComponent(name)}`);
    const matches = Array.isArray(result) ? result : (result.items || []);
    if (!matches.length) throw new Error('No se encontró ese personaje. Probá con Goku, Vegeta o Gohan.');
    const exact = matches.find(p => p.name.toLowerCase() === name.toLowerCase()) || matches[0];
    character = await fetchJSON(`${API}/${exact.id}`);
    forms = [{name:'Forma base',image:character.image,ki:character.ki},...(character.transformations || [])];
    selected = 0;
    $('characterName').textContent = character.name;
    $('description').textContent = character.description || 'Explorá las transformaciones de este personaje.';
    $('race').textContent = clean(character.race);
    $('maxKi').textContent = clean(character.maxKi);
    $('affiliation').textContent = clean(character.affiliation);
    $('panel').hidden = false;
    $('status').textContent = `${forms.length} forma(s) disponibles para ${character.name}.`;
    render(false);
  } catch (error) {
    $('status').textContent = error.message + ' Revisá tu conexión a Internet.';
  }
}

function render(animate = true) {
  const form = forms[selected];
  $('formName').textContent = form.name;
  $('ki').textContent = clean(form.ki);
  $('counter').textContent = `Forma ${selected + 1} de ${forms.length}`;
  $('prev').disabled = selected === 0;
  $('next').disabled = selected === forms.length - 1;
  $('next').textContent = selected === forms.length - 1 ? '⚡ PODER MÁXIMO' : '⚡ TRANSFORMAR';
  const art = $('art');
  art.classList.remove('power');
  void art.offsetWidth;
  if (animate) art.classList.add('power');
  $('characterImage').src = form.image || character.image;
  $('characterImage').alt = `${character.name}: ${form.name}`;
  $('forms').replaceChildren();
  forms.forEach((item, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = item.name;
    button.className = i === selected ? 'active' : '';
    button.addEventListener('click', () => { selected = i; render(); });
    $('forms').appendChild(button);
  });
}

$('searchForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = $('searchInput').value.trim();
  if (name) search(name);
});
$('prev').addEventListener('click', () => { if (selected > 0) { selected--; render(); } });
$('next').addEventListener('click', () => { if (selected < forms.length - 1) { selected++; render(); } });
$('searchInput').value = 'Goku';
search('Goku');
