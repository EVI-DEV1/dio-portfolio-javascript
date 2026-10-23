'use strict';
const grid = document.querySelector('#grid');
const status = document.querySelector('#status');
const retry = document.querySelector('#retry');
const filters = [...document.querySelectorAll('[data-filter]')];
let projects = [];
let currentFilter = 'Todos';
let loading = false;
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function safeUrl(value) {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
  catch { return null; }
}
function render() {
  grid.replaceChildren();
  const visible = projects.filter(p => currentFilter === 'Todos' || p.category === currentFilter);
  visible.forEach(project => {
    const card = el('article', 'card');
    const art = el('div', `project-art ${['pokedex','mesa','ritmo'].includes(project.visual) ? project.visual : ''}`);
    art.setAttribute('aria-hidden', 'true');
    art.append(el('strong', '', project.label));
    const body = el('div', 'card-body');
    body.append(el('span','category',project.category), el('h3','',project.name), el('p','',project.description));
    const url = safeUrl(project.url);
    if (url) {
      const link = el('a','','Ver repositório');
      link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Ver repositório de ${project.name} (nova aba)`);
      link.append(el('span','','↗')); body.append(link);
    }
    card.append(art,body); grid.append(card);
  });
  status.textContent = `${visible.length} ${visible.length === 1 ? 'projeto' : 'projetos'} ${currentFilter === 'Todos' ? 'disponíveis' : 'em ' + currentFilter}.`;
}
async function loadProfile() {
  if (loading) return;
  loading = true; retry.hidden = true; status.textContent = 'Carregando projetos…';
  filters.forEach(button => { button.disabled = true; });
  try {
    const response = await fetch('./data/profile.json');
    if (!response.ok) throw new Error('Resposta inválida');
    const data = await response.json();
    if (!Array.isArray(data.projects) || !Array.isArray(data.skills)) throw new Error('Dados inválidos');
    document.querySelector('#nome').textContent = data.name;
    document.querySelector('#cargo').textContent = data.role;
    document.querySelector('#bio').textContent = data.bio;
    document.querySelector('#skills').replaceChildren(...data.skills.map(skill => el('li','',skill)));
    projects = data.projects; render();
  } catch {
    status.textContent = 'Não foi possível carregar os projetos. Verifique a conexão e tente novamente.';
    retry.hidden = false;
  } finally {
    loading = false; filters.forEach(button => { button.disabled = projects.length === 0; });
  }
}
filters.forEach(button => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  render();
}));
document.querySelectorAll('.trigger').forEach(button => button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(open));
  document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
  button.querySelector('span').textContent = open ? '−' : '+';
}));
retry.addEventListener('click', loadProfile);
loadProfile();
